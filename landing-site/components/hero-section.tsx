"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Car, Users, Shield, Zap } from "lucide-react"
import { motion, Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

const statsVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          style={{ background: "var(--primary-300)" }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--accent-300)" }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--secondary-300)" }}
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: "var(--primary-100)",
                color: "var(--primary-800)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Revolutionary Cab Management System
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: "var(--neutral-900)" }}
            >
              Streamline Your <span className="text-primary-gradient">Employee Transportation</span> Like Never Before
            </h1>

            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--neutral-600)" }}>
              RideRota is the complete solution for organizations to manage cab allocation, driver assignments, and
              employee transportation with unprecedented efficiency and transparency.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary-gradient hover:shadow-custom-hover text-white px-10 py-6 text-lg font-semibold shadow-xl transition-all duration-100"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 px-8 py-4 text-lg font-semibold transition-all duration-100 bg-transparent hover:bg-primary-50"
                style={{
                  borderColor: "var(--neutral-300)",
                  color: "var(--neutral-700)",
                }}
              >
                Watch Demo
              </Button>
            </motion.div> */}
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto" variants={containerVariants}>
            {[
              { icon: Car, number: "500+", label: "Active Vehicles", color: "var(--primary-600)" },
              { icon: Users, number: "10K+", label: "Happy Employees", color: "var(--secondary-600)" },
              { icon: Shield, number: "99.9%", label: "Uptime", color: "var(--accent-600)" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={statsVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-3"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: "var(--neutral-900)" }}>
                  {stat.number}
                </div>
                <div style={{ color: "var(--neutral-600)" }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
