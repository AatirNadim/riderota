import React from "react";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import { useLogout } from "@/lib/queries/auth.queries";

function Logout() {
  const { resetUserData } = useUserStore();

  const { mutateAsync: logout, isError, isPending, error } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      resetUserData();
    } catch (err) {
      console.error("error logging out");
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
