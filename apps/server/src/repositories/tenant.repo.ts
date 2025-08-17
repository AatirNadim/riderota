import { prisma, UserRole, MembershipStatus } from "@riderota/utils";

class TenantRepo {
  async createTenant(data: any) {
    // Logic for creating a tenant
    console.log("Creating tenant in repo with data: ", data);
  }

  async checkIfSlugExists(slug: string) {
    try {
      const existingTenant = await prisma.tenant.findFirst({
        where: {
          slug: slug,
        },
      });

      return existingTenant !== null;
    } catch (error) {
      console.error("Error checking if slug exists:", error);
      throw error;
    }
  }
}

export default TenantRepo;
