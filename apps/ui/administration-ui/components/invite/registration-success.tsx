"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  ArrowRight,
  Building,
  User,
  Mail,
  Phone,
  Car,
  Users,
  UserCheck,
} from "lucide-react";
import { UserRole } from "@/lib/types";

interface RegistrationSuccessProps {
  userData: any;
  userType: UserRole;
  tenantData: {
    email: string;
    tenantName: string;
    tenantSlug: string;
    invitedBy: string;
    expiresAt: string;
  };
}

export function RegistrationSuccess({
  userData,
  userType,
  tenantData,
}: RegistrationSuccessProps) {
  const tenantUrl = `https://${tenantData.tenantSlug}.riderota.com`;

  const handleContinue = () => {
    // In real implementation, this would redirect to the appropriate dashboard
    window.location.href = `${tenantUrl}/${userType}`;
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case UserRole.ADMIN:
        return <UserCheck className="w-8 h-8 text-white" />;
      case UserRole.DRIVER:
        return <Car className="w-8 h-8 text-white" />;
      case UserRole.EMPLOYEE:
        return <Users className="w-8 h-8 text-white" />;
      default:
        return <User className="w-8 h-8 text-white" />;
    }
  };

  const getUserTypeTitle = () => {
    switch (userType) {
      case UserRole.ADMIN:
        return "Admin Registration Complete!";
      case UserRole.DRIVER:
        return "Driver Registration Complete!";
      case UserRole.EMPLOYEE:
        return "Employee Registration Complete!";
      default:
        return "Registration Complete!";
    }
  };

  const getDashboardName = () => {
    switch (userType) {
      case UserRole.ADMIN:
        return "Admin Dashboard";
      case UserRole.DRIVER:
        return "Driver Dashboard";
      case UserRole.EMPLOYEE:
        return "Employee Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-custom border-0">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-success-600" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <CardTitle
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--neutral-900)" }}
              >
                {getUserTypeTitle()}
              </CardTitle>
              <CardDescription className="text-base">
                Welcome to{" "}
                <span className="font-semibold text-primary-600">
                  {tenantData.tenantName}
                </span>
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-neutral-50 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center">
                  {getUserTypeIcon()}
                </div>
                <h3
                  className="font-semibold text-lg"
                  style={{ color: "var(--neutral-900)" }}
                >
                  Your Profile Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-primary-600" />
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--neutral-700)" }}
                    >
                      Name
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--neutral-600)" }}
                    >
                      {userData.name}
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
                    <p
                      className="text-sm"
                      style={{ color: "var(--neutral-600)" }}
                    >
                      {userData.email}
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
                    <p
                      className="text-sm"
                      style={{ color: "var(--neutral-600)" }}
                    >
                      {userData.phoneNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-primary-600" />
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--neutral-700)" }}
                    >
                      {userType === UserRole.DRIVER ? "Role" : "Department"}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--neutral-600)" }}
                    >
                      {userType === UserRole.DRIVER
                        ? "Driver"
                        : userData.department}
                    </p>
                  </div>
                </div>

                {userType !== UserRole.DRIVER && userData.employeeId && (
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary-600 rounded-full" />
                    </div>
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        Employee ID
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--neutral-600)" }}
                      >
                        {userData.employeeId}
                      </p>
                    </div>
                  </div>
                )}

                {userType === UserRole.DRIVER && userData.vehicleMake && (
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5 text-primary-600" />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--neutral-700)" }}
                      >
                        Vehicle
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--neutral-600)" }}
                      >
                        {userData.vehicleMake} {userData.vehicleModel}
                      </p>
                    </div>
                  </div>
                )}
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
                Your {getDashboardName()} is ready at:
              </p>
              <p
                className="text-sm font-mono bg-white px-3 py-2 rounded border"
                style={{ color: "var(--primary-600)" }}
              >
                {tenantUrl}/{userType}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleContinue}
                  className="w-full h-11 bg-primary-gradient hover:shadow-custom-hover transition-all duration-300"
                >
                  Access Your {getDashboardName()}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs" style={{ color: "var(--neutral-500)" }}>
                {userType === UserRole.ADMIN &&
                  "You can now start managing ride allocations and coordinating with drivers and employees."}
                {userType === UserRole.DRIVER &&
                  "You can now start receiving ride assignments and managing your schedule."}
                {userType === UserRole.EMPLOYEE &&
                  "You can now start requesting rides and tracking your transportation needs."}
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
