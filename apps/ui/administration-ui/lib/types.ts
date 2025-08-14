export interface SignupData {
  // Basic Info
  name: string;
  email: string;
  password: string;

  // Profile Details
  phoneNo: string;
  age?: number;
  address: string;
  profileImageUrl?: string;

  // Tenant Details
  tenantName: string;
  tenantImageUrl?: string;
  officeName: string;
  officeLocation: string;
}
