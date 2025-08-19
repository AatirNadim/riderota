"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface AllocationMatch {
  employee: {
    id: string
    name: string
    department: string
    avatar?: string
    pickup: string
    dropoff: string
    time: string
    priority: "low" | "medium" | "high"
  }
  suggestedDrivers: {
    id: string
    name: string
    avatar?: string
    vehicle: string
    location: string
    distance: string
    eta: string
    rating: number
    matchScore: number
  }[]
}

const mockAllocations: AllocationMatch[] = [
  {
    employee: {
      id: "1",
      name: "Sarah Johnson",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40",
      pickup: "Main Office, Building A",
      dropoff: "Client Meeting - Downtown Plaza",
      time: "09:00 AM",
      priority: "high",
    },
    suggestedDrivers: [
      {
        id: "1",
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        vehicle: "Toyota Camry",
        location: "Downtown Area",
        distance: "0.8 km",
        eta: "3 min",
        rating: 4.8,
        matchScore: 95,
      },
      {
        id: "2",
        name: "Maria Garcia",
        vehicle: "Honda CR-V",
        location: "Business District",
        distance: "1.2 km",
        eta: "5 min",
        rating: 4.9,
        matchScore: 88,
      },
    ],
  },
  {
    employee: {
      id: "2",
      name: "Mike Davis",
      department: "Sales",
      pickup: "Home - Residential Area",
      dropoff: "Main Office, Building B",
      time: "08:30 AM",
      priority: "medium",
    },
    suggestedDrivers: [
      {
        id: "3",
        name: "David Chen",
        vehicle: "Hyundai i20",
        location: "Residential Area",
        distance: "0.5 km",
        eta: "2 min",
        rating: 4.6,
        matchScore: 92,
      },
    ],
  },
]

export function RideAllocation() {
  const [allocations, setAllocations] = useState<AllocationMatch[]>(mockAllocations)
  const [selectedDrivers, setSelectedDrivers] = useState<{ [key: string]: string }>({})

  const handleDriverSelect = (employeeId: string, driverId: string) => {
    setSelectedDrivers((prev) => ({
      ...prev,
      [employeeId]: driverId,
    }))
  }

  const handleAllocateRide = (employeeId: string) => {
    const driverId = selectedDrivers[employeeId]
    if (!driverId) {
      toast.error("Please select a driver first")
      return
    }

    // Remove the allocation from the list
    setAllocations(allocations.filter((allocation) => allocation.employee.id !== employeeId))
    setSelectedDrivers((prev) => {
      const newState = { ...prev }
      delete newState[employeeId]
      return newState
    })

    toast.success("Ride allocated successfully and added to queue")
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

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-success-600"
    if (score >= 80) return "text-warning-600"
    return "text-error-600"
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
          Ride Allocation
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Match employees with the best available drivers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-custom">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary-600">{allocations.length}</div>
            <div className="text-sm" style={{ color: "var(--neutral-600)" }}>
              Pending Allocations
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success-600">
              {allocations.reduce((acc, allocation) => acc + allocation.suggestedDrivers.length, 0)}
            </div>
            <div className="text-sm" style={{ color: "var(--neutral-600)" }}>
              Available Drivers
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-custom">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning-600">{Object.keys(selectedDrivers).length}</div>
            <div className="text-sm" style={{ color: "var(--neutral-600)" }}>
              Ready to Allocate
            </div>
          </CardContent>
        </Card>
      </div>

      {allocations.length === 0 ? (
        <Card className="border-0 shadow-custom">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-16 w-16 text-success-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--neutral-900)" }}>
              All Caught Up!
            </h3>
            <p style={{ color: "var(--neutral-600)" }}>
              No pending ride allocations at the moment. New requests will appear here automatically.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {allocations.map((allocation) => (
            <Card key={allocation.employee.id} className="border-0 shadow-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={allocation.employee.avatar || "/placeholder.svg"}
                        alt={allocation.employee.name}
                      />
                      <AvatarFallback>
                        {allocation.employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{allocation.employee.name}</CardTitle>
                      <CardDescription>{allocation.employee.department}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(allocation.employee.priority)}>
                      {allocation.employee.priority} priority
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm" style={{ color: "var(--neutral-600)" }}>
                      <Clock className="h-4 w-4" />
                      {allocation.employee.time}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Route Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-success-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Pickup Location
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {allocation.employee.pickup}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-error-600" />
                      <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                        Dropoff Location
                      </span>
                    </div>
                    <p className="text-sm ml-6" style={{ color: "var(--neutral-900)" }}>
                      {allocation.employee.dropoff}
                    </p>
                  </div>
                </div>

                {/* Driver Selection */}
                <div className="space-y-4">
                  <h4 className="font-semibold" style={{ color: "var(--neutral-900)" }}>
                    Suggested Drivers ({allocation.suggestedDrivers.length} available)
                  </h4>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {allocation.suggestedDrivers.map((driver) => (
                      <motion.div
                        key={driver.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedDrivers[allocation.employee.id] === driver.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                        onClick={() => handleDriverSelect(allocation.employee.id, driver.id)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                              <AvatarFallback className="text-xs">
                                {driver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm" style={{ color: "var(--neutral-900)" }}>
                                {driver.name}
                              </p>
                              <p className="text-xs" style={{ color: "var(--neutral-600)" }}>
                                {driver.vehicle}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${getMatchScoreColor(driver.matchScore)}`}>
                              {driver.matchScore}% match
                            </div>
                            <div className="text-xs" style={{ color: "var(--neutral-500)" }}>
                              ★ {driver.rating}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span style={{ color: "var(--neutral-500)" }}>Location: </span>
                            <span style={{ color: "var(--neutral-700)" }}>{driver.location}</span>
                          </div>
                          <div>
                            <span style={{ color: "var(--neutral-500)" }}>Distance: </span>
                            <span style={{ color: "var(--neutral-700)" }}>{driver.distance}</span>
                          </div>
                          <div>
                            <span style={{ color: "var(--neutral-500)" }}>ETA: </span>
                            <span style={{ color: "var(--neutral-700)" }}>{driver.eta}</span>
                          </div>
                          <div>
                            <span style={{ color: "var(--neutral-500)" }}>Rating: </span>
                            <span style={{ color: "var(--neutral-700)" }}>★ {driver.rating}</span>
                          </div>
                        </div>

                        {selectedDrivers[allocation.employee.id] === driver.id && (
                          <div className="mt-3 flex items-center space-x-2 text-primary-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Selected</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Skip for Now
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAllocateRide(allocation.employee.id)}
                      disabled={!selectedDrivers[allocation.employee.id]}
                      className="bg-primary-gradient"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Allocate Ride
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  )
}
