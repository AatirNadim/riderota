"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Building,
  MapPin,
  Info,
  Search,
  Check,
  X,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  checkWhetherTenantSlugExists,
  useCreateTenant,
} from "@/lib/queries/tenant.queries";

import { generateSlugUtil, uploadAssetToCloudinary } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useUserStore } from "@/store/user.store";
import { useTenantStore } from "@/store/tenant.store";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  tenantName: z
    .string()
    .min(2, "Tenant name must be at least 2 characters")
    .max(50, "Tenant name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/,
      "Name must be alphanumeric with single spaces between words."
    ),
  tenantImageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  officeName: z
    .string()
    .min(2, "Office name must be at least 2 characters")
    .max(50, "Office name must be less than 50 characters"),
  officeLocation: z
    .string()
    .min(10, "Office location must be at least 10 characters")
    .max(200, "Office location must be less than 200 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function TenantDetailsForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tenantName: "",
      tenantImageUrl: "",
      officeName: "",
      officeLocation: "",
    },
  });

  const [isLoading] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"available" | "taken" | null>(
    null
  );
  const [checkedSlug, setCheckedSlug] = useState<string>("");

  const tenantName = form.watch("tenantName");

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { updateUserData } = useUserStore();

  const { updateTenantData } = useTenantStore();

  const { isFetching: slugValidating, refetch: slugRefetch } = useQuery({
    queryKey: [tenantName],
    queryFn: async () =>
      checkWhetherTenantSlugExists(await generateSlugUtil(tenantName)),
    enabled: false,
  });

  const {
    mutateAsync: createTenant,
    isPending: isCreatingTenant,
    isError: isCreatingError,
    error: createError,
  } = useCreateTenant();

  const checkSlugAvailability = async () => {
    const isValid = await form.trigger("tenantName");
    if (!isValid) {
      toast.error("Please fix the errors in the tenant name.");
      return;
    }

    const tenantName = form.getValues("tenantName");
    if (!tenantName || tenantName.length < 2) {
      toast.error("Please enter a tenant name first");
      return;
    }

    const slug = await generateSlugUtil(tenantName);
    setIsCheckingSlug(true);
    setCheckedSlug(slug);

    try {
      const res = await slugRefetch();

      if (res.data?.exists) setSlugStatus("taken");
      else setSlugStatus("available");

      console.log("slug refetch to check validity", res);
    } catch (error) {
      toast.error("Failed to check availability. Please try again.");
      console.error("Slug availability check error:", error);
      setSlugStatus(null);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file.");
    }
    if (file.size > 4 * 1024 * 1024) {
      // 4MB limit
      return toast.error("Image size must be less than 4MB.");
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    let base64Image: string | null = null;

    reader.onload = async () => {
      base64Image = reader.result as string;
      if (!base64Image) {
        setIsUploading(false);
        return toast.error("Could not process the image. Please try again.");
      }

      // send the path of the file
      try {
        const assetUrl = await uploadAssetToCloudinary(base64Image);
        console.log("Uploaded Image URL:", assetUrl);
        form.setValue("tenantImageUrl", assetUrl, {
          shouldValidate: true,
        });

        setIsUploading(false);

        toast.success("Image uploaded successfully!");
      } catch (error) {
        setIsUploading(false);
        console.error("Image upload error:", error);
        return toast.error("Failed to upload image. Please try again.");
      }
    };
  };

  const onSubmit = async (values: FormData) => {
    try {
      if (checkedSlug.length < 2) {
        toast.error(
          "Please enter a valid tenant name and make sure to test its availability."
        );
        return;
      }
      const processedValues = {
        ...values,
        tenantImageUrl:
          values.tenantImageUrl === "" ? undefined : values.tenantImageUrl,
      };

      console.log("Processed Tenant Data:", processedValues, checkedSlug);

      const res = await createTenant({
        name: processedValues.tenantName,
        slug: checkedSlug,
        office_location: processedValues.officeLocation,
        office_name: processedValues.officeName,
      });

      updateTenantData(res);

      updateUserData({
        tenantSlug: checkedSlug,
      });

      toast.success("User data updated successfully!");

      toast.success("Tenant created successfully!");
      
      const newUrl = `${window.location.protocol}//${checkedSlug}.riderota.com/superadmin/console`;
      window.location.assign(newUrl);
    } catch (error) {
      toast.error("Failed to create tenant. Please try again.");
      console.error("Tenant creation error:", error);
    } finally {
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="tenantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium flex items-center gap-2"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Tenant Name
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        disabled={isLoading || isCheckingSlug}
                      >
                        <Info className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4" side="top">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Tenant Slug</h4>
                        <p className="text-xs text-neutral-600">
                          A unique slug will be created from your tenant name.
                          This slug will be used to create your subdomain (e.g.,
                          your-org.riderota.com) and must be unique across all
                          organizations.
                        </p>
                        <div className="text-xs text-neutral-500">
                          Special characters and spaces will be converted to
                          hyphens.
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                          placeholder="Enter your tenant name"
                          {...field}
                          className="h-11 pl-10"
                          disabled={isLoading || isCheckingSlug}
                          onChange={(e) => {
                            field.onChange(e);
                            // Reset slug status when name changes
                            if (
                              slugStatus &&
                              checkedSlug !==
                                e.target.value
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                            ) {
                              setSlugStatus(null);
                              setCheckedSlug("");
                            }
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={checkSlugAvailability}
                        disabled={
                          isLoading ||
                          isCheckingSlug ||
                          !field.value ||
                          field.value.length < 2
                        }
                        className="h-11 px-4 whitespace-nowrap bg-transparent"
                      >
                        {isCheckingSlug ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Checking...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Check Availability
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Slug Status Display */}
                    {slugStatus && checkedSlug && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-2 p-3 rounded-lg border ${
                          slugStatus === "available"
                            ? "bg-success-50 border-success-200"
                            : "bg-error-50 border-error-200"
                        }`}
                      >
                        {slugStatus === "available" ? (
                          <Check className="h-4 w-4 text-success-600" />
                        ) : (
                          <X className="h-4 w-4 text-error-600" />
                        )}
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${
                              slugStatus === "available"
                                ? "text-success-700"
                                : "text-error-700"
                            }`}
                          >
                            {checkedSlug}.riderota.com
                          </div>
                          <div
                            className={`text-xs ${
                              slugStatus === "available"
                                ? "text-success-600"
                                : "text-error-600"
                            }`}
                          >
                            {slugStatus === "available"
                              ? "This tenant name is available!"
                              : "This tenant name is already taken"}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                {!slugStatus && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--neutral-500)" }}
                  >
                    This will be used to create your subdomain:{" "}
                    {field.value
                      ? `${field.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")}.riderota.com`
                      : "your-org.riderota.com"}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tenantImageUrl"
            render={() => (
              <FormItem className="flex flex-col items-center">
                <FormLabel className="text-sm font-medium text-neutral-700">
                  Tenant Logo (Optional)
                </FormLabel>
                <FormControl>
                  <div className="relative mt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/png, image/jpeg, image/gif"
                      disabled={isUploading}
                    />
                    <div
                      className="w-28 h-28 rounded-full bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
                      ) : imagePreview ? (
                        <Image
                          src={imagePreview}
                          alt="Profile preview"
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Camera className="h-8 w-8 text-neutral-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage
                  className="text-sm"
                  style={{ color: "var(--error-500)" }}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="officeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Office Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      placeholder="Main Office, Headquarters, etc."
                      {...field}
                      className="h-11 pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="officeLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Office Location
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Textarea
                      placeholder="Enter the complete office address"
                      {...field}
                      className="min-h-[80px] resize-none pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4 pt-4">
            {/* <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 bg-transparent"
                // onClick={onBack}
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div> */}
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300 font-bold"
                disabled={
                  isLoading ||
                  isUploading ||
                  // !form.formState.isValid ||
                  slugValidating
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Tenant...
                  </>
                ) : (
                  <>Complete Setup</>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
