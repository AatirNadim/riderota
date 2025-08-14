"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Car,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { components } from "@riderota/utils";

const signupSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RequiredSignUpPayloadType =
  components["schemas"]["SuperadminCreatePayload"];

type SignupFormData = z.infer<typeof signupSchema>;

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[a-z]/, text: "One lowercase letter" },
  { regex: /[A-Z]/, text: "One uppercase letter" },
  { regex: /\d/, text: "One number" },
  { regex: /[@$!%*?&]/, text: "One special character" },
];

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = form.watch("password");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("\n\nForm Data:", data, "\n\n");


      const payload: RequiredSignUpPayloadType = {
        email: data.email,
        name: data.name,
        passwordHash: data.password, // to be hashed from the beginning
        phoneNo: data.phoneNo || null,
        age: data.age || null,
        profileImgUrl: data.profileImgUrl || null,

      }

      // In real implementation:
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: data.name,
      //     email: data.email,
      //     password: data.password
      //   }),
      // })

      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );

      // Redirect to next step or dashboard
      // router.push('/signup/profile')
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--primary-300)" }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--secondary-300)" }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-primary-gradient rounded-xl shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-gradient">
              RideRota
            </span>
          </div>
          <h1
            // style={{ color: "" }}
            className="text-[var(--neutral-900)] text-3xl font-bold mb-2"
          >
            Create Your Account
          </h1>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Start managing your {`organization's`} transportation
          </p>
        </motion.div>

        {/* Signup Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle
                className="text-xl"
                style={{ color: "var(--neutral-900)" }}
              >
                SuperAdmin Registration
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your details to get started with RideRota
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                                        isValid
                                          ? "text-success-600"
                                          : "text-error-600"
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
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Terms and Privacy */}
                  <div className="text-center">
                    <p
                      className="text-xs"
                      style={{ color: "var(--neutral-500)" }}
                    >
                      By creating an account, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary-600 hover:text-primary-700 underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary-600 hover:text-primary-700 underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:text-primary-700 underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignupForm;
