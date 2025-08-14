"use client";

import { useState } from "react";
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
import {
  Eye,
  EyeOff,
  Lock,
  Phone,
  Calendar,
  ImageIcon,
  Loader2,
  CheckCircle2,
  X,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { SignupData } from "@/lib/types";

const stepTwoSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one number")
      .regex(
        /^(?=.*[@$!%*?&])/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNo: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
    age: z
      .number()
      .min(18, "Must be at least 18 years old")
      .max(100, "Please enter a valid age")
      .optional(),
    profileImageUrl: z
      .string()
      .url("Please enter a valid URL")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type StepTwoFormData = z.infer<typeof stepTwoSchema>;

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[a-z]/, text: "One lowercase letter" },
  { regex: /[A-Z]/, text: "One uppercase letter" },
  { regex: /\d/, text: "One number" },
  { regex: /[@$!%*?&]/, text: "One special character" },
];

interface StepTwoFormProps {
  data: Partial<SignupData>;
  onComplete: (data: Partial<SignupData>) => void;
}

export function ProfileDetailsForm({ data, onComplete }: StepTwoFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      password: data.password || "",
      confirmPassword: data.confirmPassword || "",
      phoneNo: data.phoneNo || "",
      age: data.age,
      profileImageUrl: data.profileImageUrl || "",
    },
    mode: "onChange",
  });

  const password = form.watch("password");
  const profileImageUrl = form.watch("profileImageUrl");

  const onSubmit = async (formData: StepTwoFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Process the complete signup data
      const completeData = {
        ...data,
        ...formData,
        age: formData.age ? Number(formData.age) : undefined,
        profileImageUrl:
          formData.profileImageUrl === ""
            ? undefined
            : formData.profileImageUrl,
      };

      console.log("\n\nComplete Signup Data:", completeData, "\n\n");

      // In real implementation:
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: completeData.email,
      //     name: completeData.name,
      //     passwordHash: completeData.password,
      //     phoneNo: completeData.phoneNo,
      //     age: completeData.age,
      //     profileImgUrl: completeData.profileImageUrl,
      //   }),
      // })

      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );
      onComplete(formData);

      // Redirect to next step or dashboard
      // router.push('/signup/success')
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
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
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...field}
                      className="h-12 pl-10 pr-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff
                          className="h-5 w-5"
                          style={{ color: "var(--neutral-400)" }}
                        />
                      ) : (
                        <Eye
                          className="h-5 w-5"
                          style={{ color: "var(--neutral-400)" }}
                        />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage
                  className="text-sm"
                  style={{ color: "var(--error-500)" }}
                />

                {/* Password Requirements */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-3 bg-neutral-50 rounded-lg border"
                  >
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: "var(--neutral-700)" }}
                    >
                      Password Requirements:
                    </p>
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => {
                        const isValid = req.regex.test(password);
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            {isValid ? (
                              <CheckCircle2 className="h-3 w-3 text-success-500" />
                            ) : (
                              <X className="h-3 w-3 text-error-500" />
                            )}
                            <span
                              className={`text-xs ${
                                isValid ? "text-success-600" : "text-error-600"
                              }`}
                            >
                              {req.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...field}
                      className="h-12 pl-10 pr-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className="h-5 w-5"
                          style={{ color: "var(--neutral-400)" }}
                        />
                      ) : (
                        <Eye
                          className="h-5 w-5"
                          style={{ color: "var(--neutral-400)" }}
                        />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage
                  className="text-sm"
                  style={{ color: "var(--error-500)" }}
                />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
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
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
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

          {/* Age Field */}
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
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                      style={{ color: "var(--neutral-400)" }}
                    />
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      {...field}
                      className="h-12 pl-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                      disabled={isLoading}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
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

          {/* Profile Image URL Field */}
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
                    <div className="relative">
                      <ImageIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                        style={{ color: "var(--neutral-400)" }}
                      />
                      <Input
                        type="url"
                        placeholder="https://example.com/your-photo.jpg"
                        {...field}
                        className="h-12 pl-10 text-base border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                        disabled={isLoading}
                      />
                    </div>
                    {profileImageUrl && (
                      <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg border">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={profileImageUrl || "/placeholder.svg"}
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
                          <ImageIcon className="w-6 h-6 text-neutral-400 hidden" />
                        </div>
                        <div className="text-sm text-neutral-600">
                          Profile image preview
                        </div>
                      </div>
                    )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <CheckCircle className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
