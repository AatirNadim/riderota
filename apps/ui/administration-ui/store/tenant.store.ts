import { create } from "zustand";
import { components } from "@riderota/utils";
import { persist } from "zustand/middleware";

type TenantData = components["schemas"]["TenantDetails"];

interface TenantState {
  tenantData: Partial<TenantData>;
  updateTenantData: (data: Partial<TenantData>) => void;
  resetTenantData: () => void;
}

const initialState: Partial<TenantData> = {
  name: "",
  slug: "",
  createdAt: "",
  office_location: "",
  office_name: "",
  superAdminId: "",
};

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      tenantData: initialState,
      updateTenantData: (data) =>
        set((state) => ({
          tenantData: { ...state.tenantData, ...data },
        })),
      resetTenantData: () => set({ tenantData: initialState }),
    }),
    {
      name: "tenant-storage", // unique name
    }
  )
);
