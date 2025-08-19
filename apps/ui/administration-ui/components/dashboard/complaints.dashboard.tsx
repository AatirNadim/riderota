"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquareWarning, Clock, CheckCircle, X, Eye } from "lucide-react"
import { toast } from "sonner"

interface Complaint {
  id: string
  title: string
  description: string
  complainant: {
    name: string
    email: string
    role: string
    avatar?: string
  }
  against: {
    name: string
    email: string
    role: string
  }
  status: "pending" | "investigating" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high"
  createdAt: string
  category: string
}

const mockComplaints: Complaint[] = [
  {
    id: "1",
    title: "Driver was rude and unprofessional",
    description:
      "The driver was using inappropriate language and was very rude during the entire ride. This made me very uncomfortable.",
    complainant: {
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "employee",
    },
    against: {
      name: "Mike Wilson",
      email: "mike.w@company.com",
      role: "driver",
    },
    status: "pending",
    priority: "high",
    createdAt: "2024-01-20T10:30:00Z",
    category: "Behavior",
  },
  {
    id: "2",
    title: "Late pickup without notification",
    description:
      "Driver arrived 30 minutes late without any prior notification. This caused me to miss an important meeting.",
    complainant: {
      name: "John Davis",
      email: "john.d@company.com",
      role: "employee",
    },
    against: {
      name: "Lisa Brown",
      email: "lisa.b@company.com",
      role: "driver",
    },
    status: "investigating",
    priority: "medium",
    createdAt: "2024-01-19T14:15:00Z",
    category: "Punctuality",
  },
  {
    id: "3",
    title: "Vehicle was not clean",
    description: "The car interior was dirty with food crumbs and stains on the seats. Very unprofessional.",
    complainant: {
      name: "Emma Wilson",
      email: "emma.w@company.com",
      role: "employee",
    },
    against: {
      name: "Tom Anderson",
      email: "tom.a@company.com",
      role: "driver",
    },
    status: "resolved",
    priority: "low",
    createdAt: "2024-01-18T09:45:00Z",
    category: "Vehicle Condition",
  },
]

export function ComplaintsDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredComplaints = complaints.filter(
    (complaint) => selectedStatus === "all" || complaint.status === selectedStatus,
  )

  const handleResolveComplaint = (id: string) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === id ? { ...complaint, status: "resolved" as const } : complaint)),
    )
    toast.success("Complaint marked as resolved")
  }

  const handleDismissComplaint = (id: string) => {
    setComplaints(
      complaints.map((complaint) => (complaint.id === id ? { ...complaint, status: "dismissed" as const } : complaint)),
    )
    toast.success("Complaint dismissed")
  }

  const handleInvestigateComplaint = (id: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "investigating" as const } : complaint,
      ),
    )
    toast.success("Investigation started")
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
        return <Eye className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "dismissed":
        return <X className="h-4 w-4" />
      default:
        return <MessageSquareWarning className="h-4 w-4" />
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
          Complaints Dashboard
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Review and manage user complaints
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Complaints", value: complaints.length, color: "var(--primary-600)" },
          {
            label: "Pending",
            value: complaints.filter((c) => c.status === "pending").length,
            color: "var(--warning-600)",
          },
          {
            label: "Investigating",
            value: complaints.filter((c) => c.status === "investigating").length,
            color: "var(--primary-600)",
          },
          {
            label: "Resolved",
            value: complaints.filter((c) => c.status === "resolved").length,
            color: "var(--success-600)",
          },
        ].map((stat, index) => (
          <Card key={index} className="border-0 shadow-custom">
            <CardContent className="p-4">
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: "var(--neutral-600)" }}>
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-custom">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Complaints</CardTitle>
              <CardDescription>{filteredComplaints.length} complaints found</CardDescription>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <motion.div
                key={complaint.id}
                className="border border-neutral-200 rounded-lg p-6 hover:bg-neutral-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg" style={{ color: "var(--neutral-900)" }}>
                        {complaint.title}
                      </h3>
                      <Badge className={getStatusColor(complaint.status)}>
                        {getStatusIcon(complaint.status)}
                        <span className="ml-1">{complaint.status}</span>
                      </Badge>
                      <Badge className={getPriorityColor(complaint.priority)}>{complaint.priority} priority</Badge>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--neutral-600)" }}>
                      {complaint.description}
                    </p>
                    <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                      Category: {complaint.category} • {new Date(complaint.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--neutral-500)" }}>
                        Complainant
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={complaint.complainant.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {complaint.complainant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--neutral-900)" }}>
                            {complaint.complainant.name}
                          </p>
                          <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                            {complaint.complainant.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--neutral-500)" }}>
                        Against
                      </p>
                      <div className="mt-1">
                        <p className="text-sm font-medium" style={{ color: "var(--neutral-900)" }}>
                          {complaint.against.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                          {complaint.against.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {complaint.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleInvestigateComplaint(complaint.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolveComplaint(complaint.id)}
                        className="bg-success-600 hover:bg-success-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDismissComplaint(complaint.id)}
                        className="text-error-600 border-error-600 hover:bg-error-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  )}

                  {complaint.status === "investigating" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleResolveComplaint(complaint.id)}
                        className="bg-success-600 hover:bg-success-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDismissComplaint(complaint.id)}
                        className="text-error-600 border-error-600 hover:bg-error-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
