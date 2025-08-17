import {
  prisma,
  UserRole,
  MembershipStatus,
  components,
} from "@riderota/utils";

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

  async tenantExistsForUser(userId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      console.log("user details for checking existing tenant --> ", user);

      return user?.tenantId !== null && user?.tenantId !== undefined;
    } catch (error) {
      console.error("Error checking if tenant exists for user:", error);
      throw error;
    }
  }

  async addTenant(
    data: components["schemas"]["TenantCreatePayload"],
    userId: string
  ) {
    try {
      const newTenant = await prisma.tenant.create({
        data: {
          ...data,
          superadminId: userId,
        },
      });

      console.log("new tenant created with id --> ", newTenant.id);

      await prisma.user.update({
        where: { id: userId },
        data: {
          tenantId: newTenant.id,
        },
      });

      console.log("User updated with new tenant ID --> ", userId);

      return newTenant;
    } catch (error) {
      console.error("Error adding tenant:", error);
      throw error;
    }
  }
}

export default TenantRepo;
