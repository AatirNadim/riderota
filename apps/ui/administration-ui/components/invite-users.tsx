"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InviteAdminForm } from "./form/invite-admin.form";
import { InviteDriverForm } from "./form/invite-driver.form";
import { InviteEmployeeForm } from "./form/invite-employee.form";
import { UserCheck, Car, Users } from "lucide-react";
import { useRef } from "react";

export function InviteUsers() {

  const tenantSlug = useRef(
    typeof window !== "undefined"
      ? window.location.hostname.split(".")[0] || "demo"
      : "demo"
  ).current;

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
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--neutral-900)" }}
        >
          Invite Users
        </h2>
        <p className="text-lg" style={{ color: "var(--neutral-600)" }}>
          Send invitations to new team members with role-specific access
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-custom">
          <CardContent className="p-6">
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Admin
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Driver
                </TabsTrigger>
                <TabsTrigger
                  value="employee"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Employee
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-4">
                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Invite Admin
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--neutral-600)" }}
                  >
                    Admins can manage drivers, employees, and handle ride
                    assignments
                  </p>
                </div>
                <InviteAdminForm tenantSlug={tenantSlug} />
              </TabsContent>

              <TabsContent value="driver" className="space-y-4">
                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Invite Driver
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--neutral-600)" }}
                  >
                    Drivers will receive ride assignments and can update their
                    availability
                  </p>
                </div>
                <InviteDriverForm tenantSlug={tenantSlug} />
              </TabsContent>

              <TabsContent value="employee" className="space-y-4">
                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--neutral-900)" }}
                  >
                    Invite Employee
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--neutral-600)" }}
                  >
                    Employees can book rides and track their transportation
                    history
                  </p>
                </div>
                <InviteEmployeeForm tenantSlug={tenantSlug} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
