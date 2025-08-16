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
import { ArrowLeft, Loader2, Building, MapPin, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { SignupData } from "@/lib/types";

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
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Organization Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      placeholder="Enter your organization name"
                      {...field}
                      className="h-11 pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
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
                onClick={onBack}
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
