"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ArrowRight,
  Building,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { SignupData } from "@/lib/types";

interface SignupSuccessProps {
  data: SignupData;
}

export function SignupSuccess({ data }: SignupSuccessProps) {
  const tenantSlug =
    data.tenantName?.toLowerCase().replace(/\s+/g, "-") || "your-org";
  const tenantUrl = `https://${tenantSlug}.riderota.com`;

  const handleContinue = () => {
    // In real implementation, this would redirect to the tenant subdomain
    window.location.href = tenantUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success-600" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--neutral-900)" }}
        >
          Welcome to RideRota!
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Your organization has been successfully created
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-neutral-50 rounded-lg p-6 space-y-4"
      >
        <h3
          className="font-semibold text-lg"
          style={{ color: "var(--neutral-900)" }}
        >
          Organization Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-primary-600" />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--neutral-700)" }}
              >
                Organization
              </p>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                {data.tenantName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-primary-600" />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--neutral-700)" }}
              >
                Super Admin
              </p>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                {data.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-primary-600" />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--neutral-700)" }}
              >
                Email
              </p>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                {data.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-primary-600" />
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--neutral-700)" }}
              >
                Phone
              </p>
              <p className="text-sm" style={{ color: "var(--neutral-600)" }}>
                {data.phoneNo}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-primary-50 rounded-lg p-4"
      >
        <p
          className="text-sm font-medium mb-2"
          style={{ color: "var(--primary-700)" }}
        >
          Your organization dashboard is ready at:
        </p>
        <p
          className="text-sm font-mono bg-white px-3 py-2 rounded border"
          style={{ color: "var(--primary-600)" }}
        >
          {tenantUrl}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="pt-4"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleContinue}
            className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
          >
            Access Your Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-xs"
        style={{ color: "var(--neutral-500)" }}
      >
        You can now start setting up your cab management system and invite
        admins to join your organization.
      </motion.div>
    </motion.div>
  );
}
