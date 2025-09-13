"use client";

import { useWhoAmI } from "@/lib/queries/auth.queries";
import React from "react";

const WhoAmI = () => {
  const { data, isLoading, error } = useWhoAmI();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user information for tenant page</div>;

  return (
    <div>
      <h1>User Information</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default WhoAmI;
