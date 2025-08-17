"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Car, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TenantDetailsForm } from "@/components/form/tenant-info-form"

function TenantSetupWrapper() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          style={{ background: "var(--secondary-300)" }}
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          style={{ background: "var(--accent-300)" }}
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

      <motion.div
        className="w-full max-w-2xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-primary-gradient rounded-xl shadow-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-gradient">RideRota</span>
          </div>
          <h1 className="text-[var(--neutral-900)] text-3xl font-bold mb-2 text-shadow-md">Setup Your Tenant</h1>
          <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
            Configure your tenant details to complete the setup
          </p>
        </motion.div>

        {/* Setup Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-0 shadow-custom bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: "var(--primary-100)" }}>
                  <Building className="h-6 w-6" style={{ color: "var(--primary-600)" }} />
                </div>
              </div>
              <CardTitle className="text-xl" style={{ color: "var(--neutral-900)" }}>
                Tenant Details
              </CardTitle>
              <CardDescription className="text-base">
                Tell us about your tenant to customize your RideRota experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TenantDetailsForm />
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
            Need help with setup?{" "}
            <Link href="/support" className="font-medium text-primary-600 hover:text-primary-700 underline">
              Contact Support
            </Link>
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div className="text-center mt-4" variants={itemVariants}>
          <div
            className="inline-flex items-center px-4 py-2 rounded-full text-sm"
            style={{
              backgroundColor: "var(--success-50)",
              color: "var(--success-700)",
              border: "1px solid var(--success-200)",
            }}
          >
            <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
            Secure setup process - Your data is encrypted
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TenantSetupWrapper;