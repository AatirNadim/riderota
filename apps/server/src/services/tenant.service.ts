import TenantRepo from "../repositories/tenant.repo";

class TenantService {
  constructor(private tenantRepo: TenantRepo) {}

  async createTenant(data: any) {
    // Logic for creating a tenant
    console.log("Creating tenant with data: ", data);
  }

  async checkIfSlugExists(slug: string) {
    return this.tenantRepo.checkIfSlugExists(slug);
  }
}

export default TenantService;
