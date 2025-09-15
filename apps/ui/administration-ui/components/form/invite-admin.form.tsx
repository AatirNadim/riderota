"use client";

import { useRef, useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, User, Phone, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useInviteUser } from "@/lib/queries/auth.queries";
import { UserRole } from "@/lib/types";

const inviteAdminSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  // name: z.string().min(2, "Name must be at least 2 characters"),
  // phoneNo: z.string().min(10, "Phone number must be at least 10 digits"),
  // department: z.string().min(1, "Please select a department"),
  // permissions: z.string().min(1, "Please select permission level"),
  welcomeMessage: z.string().optional(),
});

type InviteAdminFormData = z.infer<typeof inviteAdminSchema>;

export function InviteAdminForm({ tenantSlug }: { tenantSlug: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    mutateAsync: inviteUser,
    isError,
    isIdle,
    isPending,
  } = useInviteUser();

  const form = useForm<InviteAdminFormData>({
    resolver: zodResolver(inviteAdminSchema),
    defaultValues: {
      email: "",
      // name: "",
      // phoneNo: "",
      // department: "",
      // permissions: "",
      welcomeMessage: "",
    },
  });

  const onSubmit = async (data: InviteAdminFormData) => {
    setIsLoading(true);
    console.log("Submitting admin invitation with data:", data);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation:
      // const response = await fetch('/api/admin/invite', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      console.log("Admin invitation data:", {
        ...data,
        userType: UserRole.ADMIN,
        tenantSlug,
      });

      await inviteUser({ ...data, userType: UserRole.ADMIN, tenantSlug });
      toast.success(`Admin invitation sent to ${data.email}`);
      form.reset();
    } catch (error) {
      toast.error("Failed to send invitation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      placeholder="admin@company.com"
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

          {/* <FormField
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
                    <Input placeholder="John Doe" {...field} className="pl-10" disabled={isLoading} />
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
                    <Input placeholder="+1 (555) 123-4567" {...field} className="pl-10" disabled={isLoading} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permissions"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                  Permission Level
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select permission level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full">Full Access - Can manage all users and rides</SelectItem>
                    <SelectItem value="limited">Limited Access - Can manage rides only</SelectItem>
                    <SelectItem value="readonly">Read Only - Can view reports and statistics</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="text-sm font-medium"
                style={{ color: "var(--neutral-700)" }}
              >
                Welcome Message{" "}
                <span className="text-neutral-400">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a personal welcome message for the new admin..."
                  {...field}
                  className="min-h-[100px] resize-none"
                  disabled={isLoading}
                />
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
            onClick={() =>
              console.log(
                "Submitting admin invitation with data:",
                form.getValues()
              )
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Invitation...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Admin Invitation
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
