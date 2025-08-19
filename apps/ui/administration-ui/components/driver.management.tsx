"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Car, Phone, MapPin, Search, MessageCircle, Star, Navigation } from "lucide-react"

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  vehicle: {
    type: string
    model: string
    plateNumber: string
    color: string
  }
  status: "available" | "busy" | "offline"
  location: string
  rating: number
  totalRides: number
  completedToday: number
  experience: string
  joinedDate: string
  currentRide?: {
    employee: string
    destination: string
    eta: string
  }
}

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Robert Johnson",
    email: "robert.j@riderota.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: {
      type: "Sedan",
      model: "Toyota Camry 2022",
      plateNumber: "ABC-123",
      color: "Silver",
    },
    status: "available",
    location: "Downtown Area",
    rating: 4.8,
    totalRides: 342,
    completedToday: 8,
    experience: "3-5 years",
    joinedDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.g@riderota.com",
    phone: "+1 (555) 234-5678",
    vehicle: {
      type: "SUV",
      model: "Honda CR-V 2023",
      plateNumber: "XYZ-789",
      color: "Black",
    },
    status: "busy",
    location: "Airport Terminal",
    rating: 4.9,
    totalRides: 456,
    completedToday: 12,
    experience: "5-10 years",
    joinedDate: "2023-03-20",
    currentRide: {
      employee: "Sarah Johnson",
      destination: "Main Office",
      eta: "15 min",
    },
  },
  {
    id: "3",
    name: "David Chen",
    email: "david.c@riderota.com",
    phone: "+1 (555) 345-6789",
    vehicle: {
      type: "Hatchback",
      model: "Hyundai i20 2021",
      plateNumber: "DEF-456",
      color: "Blue",
    },
    status: "offline",
    location: "Residential Area",
    rating: 4.6,
    totalRides: 234,
    completedToday: 0,
    experience: "1-2 years",
    joinedDate: "2023-09-10",
  },
]

export function DriverManagement() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || driver.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success-100 text-success-700"
      case "busy":
        return "bg-warning-100 text-warning-700"
      case "offline":
        return "bg-neutral-100 text-neutral-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <div className="w-2 h-2 bg-success-500 rounded-full"></div>
      case "busy":
        return <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
      case "offline":
        return <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
      default:
        return <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
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
          Driver Management
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          View and manage available drivers for ride allocation
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Drivers", value: drivers.length, color: "var(--primary-600)" },
          {
            label: "Available",
            value: drivers.filter((d) => d.status === "available").length,
            color: "var(--success-600)",
          },
          {
            label: "Currently Busy",
            value: drivers.filter((d) => d.status === "busy").length,
            color: "var(--warning-600)",
          },
          {
            label: "Offline",
            value: drivers.filter((d) => d.status === "offline").length,
            color: "var(--neutral-600)",
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
              <CardTitle>All Drivers</CardTitle>
              <CardDescription>{filteredDrivers.length} drivers found</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search drivers..."
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
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDrivers.map((driver) => (
              <motion.div
                key={driver.id}
                className="border border-neutral-200 rounded-lg p-6 hover:bg-neutral-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                      <AvatarFallback>
                        {driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: "var(--neutral-900)" }}>
                        {driver.name}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                        {driver.email}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium" style={{ color: "var(--neutral-700)" }}>
                          {driver.rating}
                        </span>
                        <span className="text-xs" style={{ color: "var(--neutral-500)" }}>
                          ({driver.totalRides} rides)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(driver.status)}>
                    {getStatusIcon(driver.status)}
                    <span className="ml-1">{driver.status}</span>
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-primary-600" />
                    <span className="text-sm" style={{ color: "var(--neutral-700)" }}>
                      {driver.vehicle.model} • {driver.vehicle.color} • {driver.vehicle.plateNumber}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary-600" />
                    <span className="text-sm" style={{ color: "var(--neutral-700)" }}>
                      {driver.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-accent-600" />
                    <span className="text-sm" style={{ color: "var(--neutral-700)" }}>
                      {driver.phone}
                    </span>
                  </div>
                </div>

                {driver.currentRide && (
                  <div className="mb-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <Navigation className="h-4 w-4 text-warning-600" />
                      <span className="text-sm font-medium text-warning-700">Current Ride</span>
                    </div>
                    <p className="text-sm text-warning-700">
                      Transporting {driver.currentRide.employee} to {driver.currentRide.destination}
                    </p>
                    <p className="text-xs text-warning-600">ETA: {driver.currentRide.eta}</p>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm mb-4">
                  <div>
                    <span style={{ color: "var(--neutral-500)" }}>Today: </span>
                    <span className="font-medium" style={{ color: "var(--neutral-900)" }}>
                      {driver.completedToday} rides
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "var(--neutral-500)" }}>Experience: </span>
                    <span className="font-medium" style={{ color: "var(--neutral-900)" }}>
                      {driver.experience}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  {driver.status === "available" && (
                    <Button size="sm" className="flex-1 bg-primary-gradient">
                      <Navigation className="h-4 w-4 mr-1" />
                      Assign Ride
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
