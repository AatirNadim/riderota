"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Car, Clock, TrendingUp, CheckCircle, AlertTriangle, MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AdminStatsData {
  totalEmployees: number
  activeDrivers: number
  pendingRequests: number
  completedRidesToday: number
  activeRides: number
  queuedAllocations: number
  myAllocationsToday: number
  successRate: number
}

export function AdminStats() {
  const [stats, setStats] = useState<AdminStatsData>({
    totalEmployees: 0,
    activeDrivers: 0,
    pendingRequests: 0,
    completedRidesToday: 0,
    activeRides: 0,
    queuedAllocations: 0,
    myAllocationsToday: 0,
    successRate: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setStats({
          totalEmployees: 342,
          activeDrivers: 28,
          pendingRequests: 12,
          completedRidesToday: 89,
          activeRides: 15,
          queuedAllocations: 8,
          myAllocationsToday: 23,
          successRate: 94.2,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Real-time updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        completedRidesToday: prev.completedRidesToday + Math.floor(Math.random() * 2),
        activeRides: Math.max(0, prev.activeRides + (Math.random() > 0.6 ? 1 : -1)),
        pendingRequests: Math.max(0, prev.pendingRequests + (Math.random() > 0.7 ? 1 : -1)),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const primaryStats = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      color: "var(--primary-600)",
      bgColor: "var(--primary-50)",
      description: "Under my management",
    },
    {
      title: "Active Drivers",
      value: stats.activeDrivers,
      icon: Car,
      color: "var(--secondary-600)",
      bgColor: "var(--secondary-50)",
      description: "Available for allocation",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      icon: Clock,
      color: "var(--warning-600)",
      bgColor: "var(--warning-50)",
      description: "Awaiting allocation",
      isRealTime: true,
    },
    {
      title: "My Allocations Today",
      value: stats.myAllocationsToday,
      icon: UserCheck,
      color: "var(--success-600)",
      bgColor: "var(--success-50)",
      description: "Successfully allocated",
    },
  ]

  const performanceStats = [
    {
      title: "Completed Rides Today",
      value: stats.completedRidesToday,
      icon: CheckCircle,
      color: "var(--success-600)",
      bgColor: "var(--success-50)",
      description: "Successfully completed",
      isRealTime: true,
    },
    {
      title: "Active Rides",
      value: stats.activeRides,
      icon: MapPin,
      color: "var(--primary-600)",
      bgColor: "var(--primary-50)",
      description: "Currently in progress",
      isRealTime: true,
    },
    {
      title: "Queued Allocations",
      value: stats.queuedAllocations,
      icon: AlertTriangle,
      color: "var(--warning-600)",
      bgColor: "var(--warning-50)",
      description: "Waiting for processing",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: "var(--success-600)",
      bgColor: "var(--success-50)",
      description: "Last 30 days",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-custom">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-neutral-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Primary Statistics */}
      <div>
        <motion.h2 className="text-2xl font-bold mb-6" style={{ color: "var(--neutral-900)" }} variants={itemVariants}>
          Overview Statistics
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryStats.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className="border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium" style={{ color: "var(--neutral-600)" }}>
                          {card.title}
                        </p>
                        {card.isRealTime && <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-3xl font-bold mt-2" style={{ color: "var(--neutral-900)" }}>
                        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--neutral-500)" }}>
                        {card.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: card.bgColor }}>
                      <card.icon className="h-6 w-6" style={{ color: card.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <motion.h2 className="text-2xl font-bold mb-6" style={{ color: "var(--neutral-900)" }} variants={itemVariants}>
          Performance Metrics
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className="border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium" style={{ color: "var(--neutral-600)" }}>
                          {card.title}
                        </p>
                        {card.isRealTime && <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-3xl font-bold mt-2" style={{ color: "var(--neutral-900)" }}>
                        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--neutral-500)" }}>
                        {card.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: card.bgColor }}>
                      <card.icon className="h-6 w-6" style={{ color: card.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom">
            <CardHeader>
              <CardTitle style={{ color: "var(--neutral-900)" }}>Today's Performance</CardTitle>
              <CardDescription>Your allocation efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--neutral-600)" }}>Allocation Success Rate</span>
                  <span style={{ color: "var(--neutral-900)" }}>{stats.successRate}%</span>
                </div>
                <Progress value={stats.successRate} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--neutral-600)" }}>Response Time</span>
                  <span style={{ color: "var(--neutral-900)" }}>96.8%</span>
                </div>
                <Progress value={96.8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: "var(--neutral-600)" }}>Employee Satisfaction</span>
                  <span style={{ color: "var(--neutral-900)" }}>92.1%</span>
                </div>
                <Progress value={92.1} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom">
            <CardHeader>
              <CardTitle style={{ color: "var(--neutral-900)" }}>Recent Activity</CardTitle>
              <CardDescription>Latest allocation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Allocated ride", employee: "Sarah Johnson", time: "2 min ago", status: "success" },
                  { action: "Driver assigned", employee: "Mike Davis", time: "5 min ago", status: "success" },
                  { action: "Request pending", employee: "Lisa Wilson", time: "8 min ago", status: "pending" },
                  { action: "Ride completed", employee: "John Smith", time: "12 min ago", status: "success" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "success" ? "bg-success-500" : "bg-warning-500"
                        }`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "var(--neutral-900)" }}>
                          {activity.action}
                        </p>
                        <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                          {activity.employee}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs" style={{ color: "var(--neutral-500)" }}>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
