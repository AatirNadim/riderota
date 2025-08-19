"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Car, MapPin, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface StatsData {
  totalUsers: number
  admins: number
  drivers: number
  employees: number
  ridesCompletedToday: number
  activeRides: number
  pendingComplaints: number
  systemUptime: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    admins: 0,
    drivers: 0,
    employees: 0,
    ridesCompletedToday: 0,
    activeRides: 0,
    pendingComplaints: 0,
    systemUptime: 99.9,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with potential race condition handling
    const fetchStats = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate real-time data
        setStats({
          totalUsers: 1247,
          admins: 12,
          drivers: 89,
          employees: 1146,
          ridesCompletedToday: 156,
          activeRides: 23,
          pendingComplaints: 3,
          systemUptime: 99.9,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Set up real-time updates for rides completed today
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        ridesCompletedToday: prev.ridesCompletedToday + Math.floor(Math.random() * 3),
        activeRides: Math.max(0, prev.activeRides + (Math.random() > 0.5 ? 1 : -1)),
      }))
    }, 30000) // Update every 30 seconds

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

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "var(--primary-600)",
      bgColor: "var(--primary-50)",
      description: "All registered users",
    },
    {
      title: "Admins",
      value: stats.admins,
      icon: UserCheck,
      color: "var(--secondary-600)",
      bgColor: "var(--secondary-50)",
      description: "Active administrators",
    },
    {
      title: "Drivers",
      value: stats.drivers,
      icon: Car,
      color: "var(--accent-600)",
      bgColor: "var(--accent-50)",
      description: "Registered drivers",
    },
    {
      title: "Employees",
      value: stats.employees,
      icon: MapPin,
      color: "var(--success-600)",
      bgColor: "var(--success-50)",
      description: "Company employees",
    },
  ]

  const performanceCards = [
    {
      title: "Rides Completed Today",
      value: stats.ridesCompletedToday,
      icon: CheckCircle,
      color: "var(--success-600)",
      bgColor: "var(--success-50)",
      description: "Successfully completed",
      isRealTime: true,
    },
    {
      title: "Active Rides",
      value: stats.activeRides,
      icon: Clock,
      color: "var(--warning-600)",
      bgColor: "var(--warning-50)",
      description: "Currently in progress",
      isRealTime: true,
    },
    {
      title: "Pending Complaints",
      value: stats.pendingComplaints,
      icon: AlertTriangle,
      color: "var(--error-600)",
      bgColor: "var(--error-50)",
      description: "Require attention",
    },
    {
      title: "System Uptime",
      value: `${stats.systemUptime}%`,
      icon: TrendingUp,
      color: "var(--primary-600)",
      bgColor: "var(--primary-50)",
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
      {/* User Statistics */}
      <div>
        <motion.h2 className="text-2xl font-bold mb-6" style={{ color: "var(--neutral-900)" }} variants={itemVariants}>
          User Statistics
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Card className="border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--neutral-600)" }}>
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold mt-2" style={{ color: "var(--neutral-900)" }}>
                        {card.value.toLocaleString()}
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
          {performanceCards.map((card, index) => (
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

      {/* System Health */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-custom">
          <CardHeader>
            <CardTitle style={{ color: "var(--neutral-900)" }}>System Health</CardTitle>
            <CardDescription>Overall system performance and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "var(--neutral-600)" }}>System Uptime</span>
                <span style={{ color: "var(--neutral-900)" }}>{stats.systemUptime}%</span>
              </div>
              <Progress value={stats.systemUptime} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "var(--neutral-600)" }}>User Satisfaction</span>
                <span style={{ color: "var(--neutral-900)" }}>94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "var(--neutral-600)" }}>Response Time</span>
                <span style={{ color: "var(--neutral-900)" }}>98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
