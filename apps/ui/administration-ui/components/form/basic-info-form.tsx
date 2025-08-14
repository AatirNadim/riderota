"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input} from "@/components/ui/input"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { SignupData } from "../superadmin-signup"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
})

type FormData = z.infer<typeof formSchema>

interface BasicInfoFormProps {
  data: Partial<SignupData>
  onNext: (data: Partial<SignupData>) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function BasicInfoForm({ data, onNext, isLoading, setIsLoading }: BasicInfoFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      password: data.password || "",
    },
  })

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)
    try {
      // Simulate API call for basic signup
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In real implementation, this would call your signup API
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // })

      toast.success("Account created successfully!")
      onNext(values)
    } catch (error) {
      toast.error("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} className="h-11" disabled={isLoading} />
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
                  <Input
                    type="email"
                    placeholder="Enter your email address"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...field}
                      className="h-11 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" style={{ color: "var(--neutral-400)" }} />
                      ) : (
                        <Eye className="h-4 w-4" style={{ color: "var(--neutral-400)" }} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                <p className="text-xs mt-1" style={{ color: "var(--neutral-500)" }}>
                  Must contain at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </FormItem>
            )}
          />

          <motion.div className="pt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}
