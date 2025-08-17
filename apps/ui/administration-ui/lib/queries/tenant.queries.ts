"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { components, paths } from "@riderota/utils";
import axiosClient from "@/lib/axios";

export const checkWhetherTenantSlugExists = async (slug: string) => {
  const pathHolder: keyof paths = `/api/tenant/slug/check-if-exists`;

  console.log("Checking slug availability:", slug);
  const { data } = await axiosClient.get(pathHolder, {
    params: {
      slug,
    },
  });
  console.log("User information retrieved:", data);
  return data;
};

const createTenant = async (
  payload: components["schemas"]["TenantCreatePayload"]
) => {
  const pathHolder: keyof paths = `/api/tenant/create`;

  const { data } = await axiosClient.post(pathHolder, payload);
  return data;
};

export const useCheckWhetherTenantSlugExists = (slug: string) => {
  return useQuery({
    queryKey: [`tenant-slug-${slug}`],
    queryFn: () => checkWhetherTenantSlugExists(slug),
    enabled: false,
  });
};

export const useCreateTenant = () => {
  return useMutation({
    mutationKey: [`create-tenant`],
    mutationFn: createTenant,
  });
};
