"use client";

import { SuperAdminDashboard } from "@/components/dashboard/superadmin.dashboard";
import { useWhoAmI } from "@/lib/queries/auth.queries";

export default function DashboardPage() {
  const { data: userDetails, isLoading, isError } = useWhoAmI();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user details</div>;
  }

  return <SuperAdminDashboard />;
}
