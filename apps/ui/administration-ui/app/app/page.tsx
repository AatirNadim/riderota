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
    const newBasePath = `${window.location.protocol}//${userData.tenantSlug}.riderota.com/`;
    if (userData.role === "SUPERADMIN") {
      window.location.replace(`${newBasePath}/superadmin/console`);
    } else {
      window.location.replace(`${newBasePath}/admin/console`);
    }
  } else if (userData.id && !userData.tenantSlug) {
    router.push("/register-tenant");
  } else if (!userData.id) {
    router.push("/login");
  }

  return <div>page hello</div>;
};

export default Page;
