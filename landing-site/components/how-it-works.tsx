"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, UserPlus, Settings, Car, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: UserPlus,
    title: "Organization Setup",
    description: "Super admin creates organization profile and enrolls initial admin team members.",
    color: "var(--primary-600)",
  },
  {
    icon: Settings,
    title: "System Configuration",
    description: "Configure workflows, approval processes, and organization-specific policies and settings.",
    color: "var(--secondary-600)",
  },
  {
    icon: Car,
    title: "Driver & Employee Onboarding",
    description: "Admins review and approve driver applications while employees request enrollment access.",
    color: "var(--accent-600)",
  },
  {
    icon: CheckCircle,
    title: "Smart Ride Management",
    description: "Employees request rides, admins assign drivers, and everyone tracks progress in real-time.",
    color: "var(--success-600)",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.5,
    },
  },
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(135deg, var(--neutral-50), var(--primary-50))" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "var(--neutral-900)" }}>
            How <span className="text-primary-gradient">RideRota Works</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--neutral-600)" }}>
            Get your organization up and running with our streamlined four-step process. From setup to daily operations,
            we make transportation management effortless.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2 origin-left"
            style={{
              background: "linear-gradient(90deg, var(--primary-200), var(--secondary-200), var(--accent-200))",
            }}
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="relative" variants={itemVariants}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "var(--shadow-2xl)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="border-0 shadow-custom bg-white h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto"
                        style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <div className="text-sm font-semibold mb-2" style={{ color: "var(--neutral-500)" }}>
                        STEP {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--neutral-900)" }}>
                        {step.title}
                      </h3>
                      <p className="leading-relaxed" style={{ color: "var(--neutral-600)" }}>
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.2, duration: 0.4 }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <ArrowRight className="h-4 w-4" style={{ color: "var(--neutral-400)" }} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
