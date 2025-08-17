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
  ArrowLeft,
  Loader2,
  Building,
  MapPin,
  ImageIcon,
  Info,
  Search,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { SignupData } from "@/lib/types";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { checkWhetherTenantSlugExists } from "@/lib/queries/tenant.queries";

import { generateSlugUtil } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  tenantName: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(50, "Organization name must be less than 50 characters"),
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

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"available" | "taken" | null>(
    null
  );
  const [checkedSlug, setCheckedSlug] = useState<string>("");

  const tenantName = form.watch("tenantName");

  // const {
  //   data: slugData,
  //   isFetching,
  //   isError,
  //   refetch: slugRefetch,
  // } = useCheckWhetherTenantSlugExists(
  //   generateSlugFromName(form.getValues("tenantName") || "")
  // );

  const {
    data,
    isFetching,
    isError,
    error,
    refetch: slugRefetch,
  } = useQuery({
    queryKey: [tenantName],
    queryFn: () =>
      checkWhetherTenantSlugExists(generateSlugUtil(tenantName)),
    enabled: false,
  });

  const checkSlugAvailability = async () => {
    const tenantName = form.getValues("tenantName");
    if (!tenantName || tenantName.length < 2) {
      toast.error("Please enter an organization name first");
      return;
    }

    const slug = generateSlugUtil(tenantName);
    setIsCheckingSlug(true);
    setCheckedSlug(slug);

    try {
      // Simulate API call to check slug availability

      // await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = slugRefetch();

      console.log("slug refetch to check validity", res);

      // In real implementation:
      // const response = await fetch('/api/tenant/check-slug', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ slug }),
      // })
      // const { exists } = await response.json()

      // Simulate random availability for demo
      // const exists = Math.random() > 0.6;
      // setSlugStatus(exists ? "taken" : "available");

      // if (exists) {
      //   toast.error("This organization name is already taken");
      // } else {
      //   toast.success("Organization name is available!");
      // }
    } catch (error) {
      toast.error("Failed to check availability. Please try again.");
      setSlugStatus(null);
    } finally {
      setIsCheckingSlug(false);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      // Simulate API call for tenant creation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process values
      const processedValues = {
        ...values,
        tenantImageUrl:
          values.tenantImageUrl === "" ? undefined : values.tenantImageUrl,
      };

      // In real implementation, this would create the tenant and redirect to the tenant subdomain
      // const response = await fetch('/api/tenant/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, ...processedValues }),
      // })

      toast.success("Organization created successfully!");
    } catch (error) {
      toast.error("Failed to create organization. Please try again.");
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
                  Organization Name
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
                        <h4 className="font-medium text-sm">
                          Organization Slug
                        </h4>
                        <p className="text-xs text-neutral-600">
                          A unique slug will be created from your organization
                          name. This slug will be used to create your subdomain
                          (e.g., your-org.riderota.com) and must be unique
                          across all organizations.
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
                          placeholder="Enter your organization name"
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
                              ? "This organization name is available!"
                              : "This organization name is already taken"}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Organization Logo URL{" "}
                  <span className="text-neutral-400">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="https://example.com/your-logo.png"
                        {...field}
                        className="h-11 pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {field.value && (
                      <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="w-12 h-12 rounded-lg bg-neutral-200 flex items-center justify-center overflow-hidden">
                          {field.value ? (
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Organization logo preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                          ) : null}
                          <Building className="w-6 h-6 text-neutral-400 hidden" />
                        </div>
                        <div className="text-sm text-neutral-600">
                          Organization logo preview
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
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
            <motion.div
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
            </motion.div>
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Organization...
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
