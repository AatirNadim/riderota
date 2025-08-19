"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, MapPin, User, Car, CheckCircle, AlertTriangle, RefreshCw, Phone } from "lucide-react"
import { toast } from "sonner"

interface QueuedAllocation {
  id: string
  employee: {
    name: string
    department: string
    avatar?: string
    phone: string
  }
  driver: {
    name: string
    avatar?: string
    vehicle: string
    phone: string
  }
  pickup: {
    location: string
    time: string
  }
  dropoff: {
    location: string
  }
  status: "queued" | "notified" | "confirmed" | "in-progress" | "completed" | "failed"
  queuedAt: string
  estimatedStart: string
  priority: "low" | "medium" | "high"
  progress: number
}

const mockQueue: QueuedAllocation[] = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
    },
    driver: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      vehicle: "Toyota Camry",
      phone: "+1 (555) 234-5678",
    },
    pickup: {
      location: "Main Office, Building A",
      time: "09:00 AM",
    },
    dropoff: {
      location: "Client Meeting - Downtown Plaza",
    },
    status: "in-progress",
    queuedAt: "2024-01-22T08:30:00Z",
    estimatedStart: "2024-01-22T09:00:00Z",
    priority: "high",
    progress: 65,
  },
  {
    id: "2",
    employee: {
      name: "Mike Davis",
      department: "Sales",
      phone: "+1 (555) 345-6789",
    },
    driver: {
      name: "David Chen",
      vehicle: "Hyundai i20",
      phone: "+1 (555) 456-7890",
    },
    pickup: {
      location: "Home - Residential Area",
      time: "08:30 AM",
    },
    dropoff: {
      location: "Main Office, Building B",
    },
    status: "confirmed",
    queuedAt: "2024-01-22T08:15:00Z",
    estimatedStart: "2024-01-22T08:30:00Z",
    priority: "medium",
    progress: 25,
  },
  {
    id: "3",
    employee: {
      name: "Lisa Wilson",
      department: "Marketing",
      phone: "+1 (555) 567-8901",
    },
    driver: {
      name: "Maria Garcia",
      vehicle: "Honda CR-V",
      phone: "+1 (555) 678-9012",
    },
    pickup: {
      location: "Airport Terminal 2",
      time: "02:30 PM",
    },
    dropoff: {
      location: "Main Office, Building A",
    },
    status: "notified",
    queuedAt: "2024-01-22T08:45:00Z",
    estimatedStart: "2024-01-22T14:30:00Z",
    priority: "high",
    progress: 10,
  },
]

export function AllocationQueue() {
  const [queue, setQueue] = useState<QueuedAllocation[]>(mockQueue)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simulate real-time progress updates
    const interval = setInterval(() => {
      setQueue((prevQueue) =>
        prevQueue.map((allocation) => {
          if (allocation.status === "in-progress" && allocation.progress < 100) {
            const newProgress = Math.min(allocation.progress + Math.random() * 5, 100)
            const newStatus = newProgress >= 100 ? "completed" : allocation.status
            return { ...allocation, progress: newProgress, status: newStatus as any }
          }
          return allocation
        }),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefreshQueue = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Queue refreshed successfully")
    } catch (error) {
      toast.error("Failed to refresh queue")
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRetryAllocation = (id: string) => {
    setQueue(
      queue.map((allocation) =>
        allocation.id === id ? { ...allocation, status: "queued" as const, progress: 0 } : allocation,
      ),
    )
    toast.success("Allocation retry initiated")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "queued":
        return "bg-neutral-100 text-neutral-700"
      case "notified":
        return "bg-primary-100 text-primary-700"
      case "confirmed":
        return "bg-warning-100 text-warning-700"
      case "in-progress":
        return "bg-secondary-100 text-secondary-700"
      case "completed":
        return "bg-success-100 text-success-700"
      case "failed":
        return "bg-error-100 text-error-700"
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
      case "queued":
        return <Clock className="h-4 w-4" />
      case "notified":
        return <AlertTriangle className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Car className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <AlertTriangle className="h-4 w-4" />
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--neutral-900)" }}>
            Allocation Queue
          </h2>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Monitor and manage queued ride allocations
          </p>
        </div>
        <Button onClick={handleRefreshQueue} disabled={isRefreshing} variant="outline" className="bg-transparent">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Queued", value: queue.length, color: "var(--primary-600)" },
          {
            label: "In Progress",
            value: queue.filter((q) => q.status === "in-progress").length,
            color: "var(--secondary-600)",
          },
          {
            label: "Confirmed",
            value: queue.filter((q) => q.status === "confirmed").length,
            color: "var(--warning-600)",
          },
          {
            label: "Completed",
            value: queue.filter((q) => q.status === "completed").length,
            color: "var(--success-600)",
          },
          {
            label: "Failed",
            value: queue.filter((q) => q.status === "failed").length,
            color: "var(--error-600)",
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
          <CardTitle>Queue Status</CardTitle>
          <CardDescription>Real-time allocation progress and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {queue.map((allocation) => (
              <motion.div
                key={allocation.id}
                className="border border-neutral-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(allocation.status)}>
                      {getStatusIcon(allocation.status)}
                      <span className="ml-1">{allocation.status.replace("-", " ")}</span>
                    </Badge>
                    <Badge className={getPriorityColor(allocation.priority)}>{allocation.priority} priority</Badge>
                  </div>
                  <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                    Queued {new Date(allocation.queuedAt).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  {/* Employee Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center space-x-2" style={{ color: "var(--neutral-900)" }}>
                      <User className="h-4 w-4" />
                      <span>Employee</span>
                    </h4>
                    <div className="flex items-center space-x-3 ml-6">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={allocation.employee.avatar || "/placeholder.svg"}
                          alt={allocation.employee.name}
                        />
                        <AvatarFallback className="text-xs">
                          {allocation.employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm" style={{ color: "var(--neutral-900)" }}>
                          {allocation.employee.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--neutral-600)" }}>
                          {allocation.employee.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center space-x-2" style={{ color: "var(--neutral-900)" }}>
                      <Car className="h-4 w-4" />
                      <span>Driver</span>
                    </h4>
                    <div className="flex items-center space-x-3 ml-6">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={allocation.driver.avatar || "/placeholder.svg"}
                          alt={allocation.driver.name}
                        />
                        <AvatarFallback className="text-xs">
                          {allocation.driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm" style={{ color: "var(--neutral-900)" }}>
                          {allocation.driver.name}
                        </p>
                        <p className="text-xs" style={{ color: "var(--neutral-600)" }}>
                          {allocation.driver.vehicle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-success-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Pickup
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {allocation.pickup.location}
                    </p>
                    <p className="text-xs ml-6" style={{ color: "var(--neutral-500)" }}>
                      Scheduled: {allocation.pickup.time}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-error-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Dropoff
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {allocation.dropoff.location}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                {allocation.status === "in-progress" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--neutral-600)" }}>Progress</span>
                      <span style={{ color: "var(--neutral-900)" }}>{Math.round(allocation.progress)}%</span>
                    </div>
                    <Progress value={allocation.progress} className="h-2" />
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Employee
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Driver
                    </Button>
                  </div>
                  {allocation.status === "failed" && (
                    <Button
                      size="sm"
                      onClick={() => handleRetryAllocation(allocation.id)}
                      className="bg-primary-gradient"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Retry
                    </Button>
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
