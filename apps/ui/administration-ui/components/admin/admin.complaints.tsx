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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Send, Loader2, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { toast } from "sonner"

const complaintSchema = z.object({
  againstType: z.string().min(1, "Please select who you're filing against"),
  againstPerson: z.string().min(1, "Please select the person"),
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  priority: z.string().min(1, "Please select priority level"),
})

type ComplaintFormData = z.infer<typeof complaintSchema>

interface PreviousComplaint {
  id: string
  title: string
  againstType: string
  againstPerson: string
  category: string
  status: "pending" | "investigating" | "resolved" | "dismissed"
  createdAt: string
  priority: "low" | "medium" | "high"
}

const mockComplaints: PreviousComplaint[] = [
  {
    id: "1",
    title: "Unprofessional behavior during team meeting",
    againstType: "admin",
    againstPerson: "Jane Smith",
    category: "Behavior",
    status: "investigating",
    createdAt: "2024-01-20T10:30:00Z",
    priority: "medium",
  },
  {
    id: "2",
    title: "Employee repeatedly late for assigned rides",
    againstType: "employee",
    againstPerson: "Mike Johnson",
    category: "Punctuality",
    status: "resolved",
    createdAt: "2024-01-18T14:15:00Z",
    priority: "low",
  },
]

export function AdminComplaints() {
  const [isLoading, setIsLoading] = useState(false)
  const [previousComplaints] = useState<PreviousComplaint[]>(mockComplaints)

  const form = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      againstType: "",
      againstPerson: "",
      category: "",
      title: "",
      description: "",
      priority: "",
    },
  })

  const againstType = form.watch("againstType")

  const onSubmit = async (data: ComplaintFormData) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation:
      // const response = await fetch('/api/complaints/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      toast.success("Complaint filed successfully and escalated to SuperAdmin")
      form.reset()
    } catch (error) {
      toast.error("Failed to file complaint. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-700"
      case "investigating":
        return "bg-primary-100 text-primary-700"
      case "resolved":
        return "bg-success-100 text-success-700"
      case "dismissed":
        return "bg-neutral-100 text-neutral-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-error-100 text-error-700"
      case "medium":
        return "bg-warning-100 text-warning-700"
      case "low":
        return "bg-success-100 text-success-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <AlertTriangle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "dismissed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
          File Complaints
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Report issues with other admins or employees to SuperAdmin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Form */}
        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle>New Complaint</CardTitle>
            <CardDescription>File a complaint that will be escalated to SuperAdmin for review</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="againstType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Filing Against
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Another Admin</SelectItem>
                          <SelectItem value="employee">Employee</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {againstType && (
                  <FormField
                    control={form.control}
                    name="againstPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          Select Person
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select person" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {againstType === "admin" ? (
                              <>
                                <SelectItem value="jane-smith">Jane Smith - Operations Admin</SelectItem>
                                <SelectItem value="tom-wilson">Tom Wilson - Transport Admin</SelectItem>
                                <SelectItem value="lisa-brown">Lisa Brown - HR Admin</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="mike-johnson">Mike Johnson - Engineering</SelectItem>
                                <SelectItem value="sarah-davis">Sarah Davis - Marketing</SelectItem>
                                <SelectItem value="alex-chen">Alex Chen - Sales</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Category
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="behavior">Unprofessional Behavior</SelectItem>
                          <SelectItem value="punctuality">Punctuality Issues</SelectItem>
                          <SelectItem value="communication">Poor Communication</SelectItem>
                          <SelectItem value="discrimination">Discrimination</SelectItem>
                          <SelectItem value="harassment">Harassment</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Priority Level
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - Minor issue</SelectItem>
                          <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                          <SelectItem value="high">High - Urgent attention needed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Complaint Title
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Brief summary of the issue" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Detailed Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide detailed information about the incident, including dates, times, and any witnesses..."
                          {...field}
                          className="min-h-[120px] resize-none"
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
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Filing Complaint...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        File Complaint
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Previous Complaints */}
        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle>My Previous Complaints</CardTitle>
            <CardDescription>Track the status of your filed complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {previousComplaints.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-3" />
                  <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                    No complaints filed yet
                  </p>
                </div>
              ) : (
                previousComplaints.map((complaint) => (
                  <motion.div
                    key={complaint.id}
                    className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm" style={{ color: "var(--neutral-900)" }}>
                        {complaint.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(complaint.status)}>
                          {getStatusIcon(complaint.status)}
                          <span className="ml-1">{complaint.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority}</Badge>
                      </div>
                    </div>
                    <div className="text-xs mb-2" style={{ color: "var(--neutral-600)" }}>
                      Against: {complaint.againstPerson} ({complaint.againstType}) • Category: {complaint.category}
                    </div>
                    <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                      Filed on {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
