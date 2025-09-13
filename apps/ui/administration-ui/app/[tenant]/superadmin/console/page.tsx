"use client";

import { SuperAdminDashboard } from "@/components/dashboard/superadmin.dashboard";
import { useWhoAmI } from "@/lib/queries/auth.queries";
import { useTenantStore } from "@/store/tenant.store";
import { useUserStore } from "@/store/user.store";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data, isLoading, isError } = useWhoAmI();
  const { updateUserData } = useUserStore();

  const { updateTenantData } = useTenantStore();

  useEffect(() => {
    if (data) {
      // // Perform any side effects or actions with the userDetails
      console.log("User details:", data);
      updateUserData({
        ...data.userDetails,
      });

      updateTenantData({
        ...data.tenantDetails,
        // domain: userDetails.tenantDomain,
      });
    }
  }, [updateUserData, data, updateTenantData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user details</div>;
  }

  return <SuperAdminDashboard />;
}
