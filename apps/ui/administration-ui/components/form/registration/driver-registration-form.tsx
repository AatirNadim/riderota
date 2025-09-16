"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { register, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Car,
  Building,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { useOnboardUser } from "@/lib/queries/auth.queries";
import { components } from "@riderota/utils";
import { UserRole } from "@/lib/types";

const driverRegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
    // dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    licenseNumber: z.string().min(5, "License number is required"),
    // licenseExpiry: z.string().min(1, "License expiry date is required"),
    // vehicleType: z.string().min(1, "Please select a vehicle type"),
    vehicleMake: z.string().min(2, "Vehicle make is required"),
    vehicleModel: z.string().min(2, "Vehicle model is required"),
    capacity: z.number().min(1, "Vehicle capacity is required").max(7),
    vehicleYear: z.string().min(4, "Vehicle year is required"),
    vehicleColor: z.string().min(2, "Vehicle color is required"),
    vehiclePlate: z.string().min(3, "License plate is required"),
    // emergencyContact: z
    //   .string()
    //   .min(10, "Emergency contact must be at least 10 digits"),
    // emergencyContactName: z
    //   .string()
    //   .min(2, "Emergency contact name is required"),
    // experience: z.string().min(1, "Please select your experience level"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type DriverRegistrationData = z.infer<typeof driverRegistrationSchema>;

interface DriverRegistrationFormProps {
  inviteData: {
    email: string;
    tenantName: string;
    tenantSlug: string;
    invitedBy: string;
    expiresAt: string;
  };
  onSuccess: (userData: any) => void;
  tenantSlug: string;
}

export function DriverRegistrationForm({
  inviteData,
  onSuccess,
  tenantSlug,
}: DriverRegistrationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    mutateAsync: onboardUser,
    isPending,
    isIdle,
    isError,
  } = useOnboardUser();

  const form = useForm<DriverRegistrationData>({
    resolver: zodResolver(driverRegistrationSchema),
    defaultValues: {
      name: "",
      phoneNo: "",
      // dateOfBirth: "",
      address: "",
      licenseNumber: "",
      // licenseExpiry: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      vehiclePlate: "",
      capacity: 0,
      // emergencyContact: "",
      // emergencyContactName: "",
      // experience: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: DriverRegistrationData) => {
    try {
      setIsLoading(true);

      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const userData: components["schemas"]["DriverCreatePayload"] = {
        email: "driver@gmail.com",
        role: UserRole.DRIVER,
        tenantSlug,
        name: data.name,
        phoneNo: data.phoneNo,
        password: data.password,
        vehicleDetails: {
          color: data.vehicleColor,
          make: data.vehicleMake,
          capacity: data.capacity,
          model: data.vehicleModel,
          licensePlate: data.vehiclePlate,
        },
      };

      console.log("Onboarding driver with data:", userData);

      const res = await onboardUser(userData);
      toast.success("Registration completed successfully!");

      onSuccess(userData);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-custom border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto"
            >
              <Car className="w-8 h-8 text-white" />
            </motion.div>

            <div>
              <CardTitle
                className="text-2xl font-bold"
                style={{ color: "var(--neutral-900)" }}
              >
                Complete Your Driver Registration
              </CardTitle>
              <CardDescription className="text-base mt-2">
                You've been invited to join{" "}
                <span className="font-semibold text-primary-600">
                  {inviteData.tenantName}
                </span>{" "}
                as a Driver
              </CardDescription>
            </div>

            <div className="bg-primary-50 rounded-lg p-4 text-left">
              <div className="flex items-center space-x-3 mb-2">
                <Mail className="w-4 h-4 text-primary-600" />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Email: {inviteData.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-primary-600" />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--neutral-700)" }}
                >
                  Invited by: {inviteData.invitedBy}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <Input
                                placeholder="+1 (555) 123-4567"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <Input type="date" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                            <Textarea
                              placeholder="Enter your full address"
                              className="pl-10 min-h-[80px]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* License Information */}
                <div className="space-y-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    License Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="licenseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <Input
                                placeholder="DL123456789"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="licenseExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Expiry Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <Input type="date" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>

                  {/* <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Driving Experience</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Vehicle Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleMake"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Make</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Toyota, Honda, Ford"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Model</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Camry, Civic, Focus"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seating Capacity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 4"
                              {...field}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                if (!isNaN(value)) {
                                  field.onChange(value);
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="vehicleYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2020" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehicleColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., White, Black, Silver"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vehiclePlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                {/* <div className="space-y-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Emergency Contact
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Contact person name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <Input
                                placeholder="+1 (555) 987-6543"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div> */}

                {/* Password */}
                <div className="space-y-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Account Security
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 text-neutral-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-neutral-400" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="w-4 h-4 text-neutral-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-neutral-400" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                    onClick={() => {
                      console.log(
                        "Submitting form with data:",
                        form.getValues()
                      );
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
