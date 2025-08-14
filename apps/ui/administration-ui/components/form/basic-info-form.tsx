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
import { User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { SignupData } from "@/lib/types";

const stepOneSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

type StepOneFormData = z.infer<typeof stepOneSchema>;

interface StepOneFormProps {
  data: Partial<SignupData>;
  onNext: (data: Partial<SignupData>) => void;
}

export function BasicInfoForm({ data, onNext }: StepOneFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: StepOneFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call to check if email exists
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // In real implementation, check if email already exists
      // const response = await fetch('/api/auth/check-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email }),
      // })

      toast.success("Basic information saved!");
      onNext(formData);
    } catch (error) {
      toast.error("Failed to validate information. Please try again.");
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
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="h-12 pl-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage
                  className="text-sm"
                  style={{ color: "var(--error-500)" }}
                />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="h-12 pl-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage
                  className="text-sm"
                  style={{ color: "var(--error-500)" }}
                />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <motion.div
            className="pt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full h-12 bg-primary-gradient hover:shadow-custom-hover text-white text-base font-semibold transition-all duration-300"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
