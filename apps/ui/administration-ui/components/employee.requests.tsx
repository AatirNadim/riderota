"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Clock, MapPin, Calendar, Search, CheckCircle, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface EmployeeRequest {
  id: string
  employee: {
    name: string
    email: string
    department: string
    avatar?: string
  }
  pickup: {
    location: string
    time: string
    date: string
  }
  dropoff: {
    location: string
  }
  priority: "low" | "medium" | "high"
  status: "pending" | "assigned" | "completed" | "cancelled"
  requestedAt: string
  notes?: string
  estimatedDuration: number
}

const mockRequests: EmployeeRequest[] = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    pickup: {
      location: "Main Office, Building A",
      time: "09:00 AM",
      date: "2024-01-22",
    },
    dropoff: {
      location: "Client Meeting - Downtown Plaza",
    },
    priority: "high",
    status: "pending",
    requestedAt: "2024-01-21T14:30:00Z",
    notes: "Important client presentation, please ensure punctuality",
    estimatedDuration: 45,
  },
  {
    id: "2",
    employee: {
      name: "Mike Davis",
      email: "mike.d@company.com",
      department: "Sales",
    },
    pickup: {
      location: "Home - Residential Area",
      time: "08:30 AM",
      date: "2024-01-22",
    },
    dropoff: {
      location: "Main Office, Building B",
    },
    priority: "medium",
    status: "pending",
    requestedAt: "2024-01-21T16:15:00Z",
    estimatedDuration: 30,
  },
  {
    id: "3",
    employee: {
      name: "Lisa Wilson",
      email: "lisa.w@company.com",
      department: "Marketing",
    },
    pickup: {
      location: "Airport Terminal 2",
      time: "02:30 PM",
      date: "2024-01-22",
    },
    dropoff: {
      location: "Main Office, Building A",
    },
    priority: "high",
    status: "assigned",
    requestedAt: "2024-01-21T10:45:00Z",
    notes: "Flight arrival, may be delayed",
    estimatedDuration: 60,
  },
]

export function EmployeeRequests() {
  const [requests, setRequests] = useState<EmployeeRequest[]>(mockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.pickup.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.dropoff.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || request.priority === selectedPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleApproveRequest = (id: string) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "assigned" as const } : request)))
    toast.success("Request approved and queued for allocation")
  }

  const handleRejectRequest = (id: string) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, status: "cancelled" as const } : request)))
    toast.success("Request rejected")
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning-100 text-warning-700"
      case "assigned":
        return "bg-primary-100 text-primary-700"
      case "completed":
        return "bg-success-100 text-success-700"
      case "cancelled":
        return "bg-error-100 text-error-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "assigned":
        return <CheckCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
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
          Employee Requests
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Review and manage employee ride requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Requests", value: requests.length, color: "var(--primary-600)" },
          {
            label: "Pending",
            value: requests.filter((r) => r.status === "pending").length,
            color: "var(--warning-600)",
          },
          {
            label: "Assigned",
            value: requests.filter((r) => r.status === "assigned").length,
            color: "var(--primary-600)",
          },
          {
            label: "Completed Today",
            value: requests.filter((r) => r.status === "completed").length,
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
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>All Requests</CardTitle>
              <CardDescription>{filteredRequests.length} requests found</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                className="border border-neutral-200 rounded-lg p-6 hover:bg-neutral-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar>
                      <AvatarImage src={request.employee.avatar || "/placeholder.svg"} alt={request.employee.name} />
                      <AvatarFallback>
                        {request.employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg" style={{ color: "var(--neutral-900)" }}>
                          {request.employee.name}
                        </h3>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>{request.priority} priority</Badge>
                      </div>
                      <p className="text-sm mb-1" style={{ color: "var(--neutral-600)" }}>
                        {request.employee.department} • {request.employee.email}
                      </p>
                      <div className="text-xs mb-3" style={{ color: "var(--neutral-500)" }}>
                        Requested {new Date(request.requestedAt).toLocaleString()} • Est. {request.estimatedDuration}{" "}
                        min
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-success-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Pickup
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {request.pickup.location}
                    </p>
                    <div className="flex items-center space-x-4 ml-6">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-neutral-400" />
                        <span className="text-xs" style={{ color: "var(--neutral-500)" }}>
                          {new Date(request.pickup.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-neutral-400" />
                        <span className="text-xs" style={{ color: "var(--neutral-500)" }}>
                          {request.pickup.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-error-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Dropoff
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {request.dropoff.location}
                    </p>
                  </div>
                </div>

                {request.notes && (
                  <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                    <p className="text-sm" style={{ color: "var(--neutral-700)" }}>
                      <strong>Notes:</strong> {request.notes}
                    </p>
                  </div>
                )}

                {request.status === "pending" && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectRequest(request.id)}
                      className="text-error-600 border-error-600 hover:bg-error-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveRequest(request.id)}
                      className="bg-success-600 hover:bg-success-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve & Queue
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
