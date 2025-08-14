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
import { ArrowRight, ArrowLeft, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { SignupData } from "@/lib/types";

const formSchema = z.object({
  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
  age: z
    .number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Please enter a valid age")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
  profileImageUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileDetailsFormProps {
  data: Partial<SignupData>;
  onNext: (data: Partial<SignupData>) => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function ProfileDetailsForm({
  data,
  onNext,
  onBack,
  isLoading,
  setIsLoading,
}: ProfileDetailsFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNo: data.phoneNo || "",
      age: data.age || "",
      address: data.address || "",
      profileImageUrl: data.profileImageUrl || "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    try {
      // Simulate API call for profile update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Convert empty string age to undefined
      const processedValues = {
        ...values,
        age: values.age === "" ? undefined : Number(values.age),
        profileImageUrl:
          values.profileImageUrl === "" ? undefined : values.profileImageUrl,
      };

      toast.success("Profile details updated!");
      onNext(processedValues);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
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
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    {...field}
                    className="h-11"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Age <span className="text-neutral-400">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    {...field}
                    className="h-11"
                    disabled={isLoading}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your complete address"
                    {...field}
                    className="min-h-[80px] resize-none"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profileImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Profile Image URL{" "}
                  <span className="text-neutral-400">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <Input
                      placeholder="https://example.com/your-photo.jpg"
                      {...field}
                      className="h-11"
                      disabled={isLoading}
                    />
                    {field.value && (
                      <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                          {field.value ? (
                            <img
                              src={field.value || "/placeholder.svg"}
                              alt="Profile preview"
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
                          <User className="w-6 h-6 text-neutral-400 hidden" />
                        </div>
                        <div className="text-sm text-neutral-600">
                          Profile image preview
                        </div>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--neutral-500)" }}
                >
                  You can add a profile image URL or upload one later
                </p>
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
                    Updating...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
