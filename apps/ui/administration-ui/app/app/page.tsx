"use client";

import Logout from "@/components/logout.button";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const { userData } = useUserStore();
  const router = useRouter();

  console.log("userData", userData);

  if (userData.tenantSlug) {
    if (userData.role === "SUPERADMIN") {
      router.push(`/${userData.tenantSlug}/superadmin/console`);
    } else {
      router.push(`/${userData.tenantSlug}/admin/console`);
    }
  } else if (userData.id && !userData.tenantSlug) {
    router.push("/register-tenant");
  } else if (!userData.id) {
    router.push("/login");
  }

  return <div>page hello</div>;
};

export default Page;
