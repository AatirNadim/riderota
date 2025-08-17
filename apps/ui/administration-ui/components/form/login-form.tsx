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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Car,
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  Loader2,
  Info,
} from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real implementation:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      // const result = await response.json()

      // Simulate different user types for demo
      const userTypes = ["superadmin", "admin", "driver", "employee"];
      const randomUserType =
        userTypes[Math.floor(Math.random() * userTypes.length)];

      if (randomUserType !== "superadmin") {
        // Simulate non-superadmin login attempt
        throw new Error(
          `Access denied. User type: ${randomUserType}. Only superadmins can access this portal.`
        );
      }

      toast.success("Login successful! Welcome back.");

      // Redirect to dashboard
      // router.push('/dashboard')
    } catch (error: any) {
      if (error.userType) {
        toast.error(error);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
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
          <h1 className="text-[var(--neutral-900)] text-3xl font-bold mb-2 text-shadow-md">
            Welcome Back
          </h1>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Sign in to your SuperAdmin account
          </p>
        </motion.div>

        {/* Access Notice */}
        <motion.div className="mb-6" variants={itemVariants}>
          <Alert className="border-primary-200 bg-primary-50">
            <Info className="h-4 w-4 text-primary-600" />
            <AlertDescription
              className="text-sm"
              style={{ color: "var(--primary-700)" }}
            >
              <strong>SuperAdmin Portal:</strong> Only superadmins can access
              this login page. Admins should use their respective tenant login
              portals at{" "}
              <span className="font-mono text-xs">
                your-org.riderota.com/admin/login
              </span>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Login Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle
                className="text-xl"
                style={{ color: "var(--neutral-900)" }}
              >
                SuperAdmin Login
              </CardTitle>
              <CardDescription className="text-base">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                              placeholder="Enter your password"
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
                      </FormItem>
                    )}
                  />

                  {/* Forgot Password Link */}
                  <div className="text-right" title="Feature not implemented">
                    <Link
                      href="/login"
                      className="text-sm text-primary-600 hover:text-primary-700 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        // toast.error("Feature not implemented yet");
                      }}
                    >
                      Forgot your password?
                    </Link>
                  </div>

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
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <LogIn className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
            {`Don't`} have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary-600 hover:text-primary-700 underline"
            >
              Create one here
            </Link>
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--neutral-500)" }}>
            Need help? Contact our{" "}
            <Link
              href="/support"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              support team
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
