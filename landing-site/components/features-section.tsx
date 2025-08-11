"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Car, UserCheck, BarChart3, Clock, MapPin, Bell, Settings } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Shield,
    title: "Super Admin Control",
    description:
      "Complete organizational oversight with admin management, complaint handling, and comprehensive analytics.",
    color: "var(--primary-600)",
  },
  {
    icon: Users,
    title: "Admin Dashboard",
    description:
      "Streamlined driver and employee enrollment, ride request management, and intelligent assignment algorithms.",
    color: "var(--secondary-600)",
  },
  {
    icon: Car,
    title: "Driver Management",
    description:
      "Efficient task assignment, availability tracking, and seamless communication between drivers and admins.",
    color: "var(--accent-600)",
  },
  {
    icon: UserCheck,
    title: "Employee Portal",
    description: "Easy ride booking, real-time tracking, ride history, and direct complaint escalation system.",
    color: "var(--success-600)",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting, usage statistics, and performance metrics for data-driven decisions.",
    color: "var(--warning-600)",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Live location updates, ETA calculations, and instant notifications for all stakeholders.",
    color: "var(--error-600)",
  },
  {
    icon: MapPin,
    title: "Smart Routing",
    description: "Optimized route planning, traffic-aware navigation, and efficient pickup/drop scheduling.",
    color: "var(--primary-500)",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "SMS and email alerts for ride confirmations, updates, and important system notifications.",
    color: "var(--secondary-500)",
  },
  {
    icon: Settings,
    title: "Flexible Configuration",
    description: "Customizable workflows, approval processes, and organization-specific settings and policies.",
    color: "var(--neutral-600)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
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

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--neutral-900)" }}>
            Powerful Features for <span className="text-primary-gradient">Every Role</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--neutral-600)" }}>
            From super admins to employees, RideRota provides tailored solutions that streamline transportation
            management across your entire organization.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "var(--shadow-2xl)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-0 shadow-custom hover:shadow-custom-hover transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
                    style={{ backgroundColor: `${feature.color}20` }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--neutral-900)" }}>
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--neutral-600)" }}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
