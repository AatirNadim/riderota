"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Save, Loader2, Camera, Calendar, Building } from "lucide-react"
import { toast } from "sonner"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  profileImageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function AdminProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Smith",
      email: "john.smith@company.com",
      phoneNo: "+1 (555) 123-4567",
      department: "Operations",
      address: "456 Admin Street, Business District, BD 67890",
      profileImageUrl: "",
    },
  })

  const profileImageUrl = form.watch("profileImageUrl")

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation:
      // const response = await fetch('/api/admin/profile/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--neutral-900)" }}>
          Profile Settings
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Update your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Your current admin profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImageUrl || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="text-xl">JS</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg" style={{ color: "var(--neutral-900)" }}>
                  John Smith
                </h3>
                <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                  Operations Admin
                </p>
                <Badge className="mt-2 bg-success-100 text-success-700">Active</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                    Joined
                  </p>
                  <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                    March 15, 2023
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-neutral-400" />
                <div>
                  <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                    Department
                  </p>
                  <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                    Operations
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3" style={{ color: "var(--neutral-900)" }}>
                Quick Stats
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary-600">156</div>
                  <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                    Allocations Today
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-success-600">94.2%</div>
                  <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="border-0 shadow-custom lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                              className="pl-10"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input placeholder="Enter your email" {...field} className="pl-10" disabled={isLoading} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                              className="pl-10"
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Department
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input
                              placeholder="Enter your department"
                              {...field}
                              className="pl-10"
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
                    name="profileImageUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Profile Image URL <span className="text-neutral-400">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <Input
                              placeholder="https://example.com/image.jpg"
                              {...field}
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                          <Textarea
                            placeholder="Enter your complete address"
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

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating Profile...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
