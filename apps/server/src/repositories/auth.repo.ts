import { prisma, UserRole } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createSuperAdminInDb(
    userData: components["schemas"]["SuperadminCreatePayload"]
  ) {
    return prisma.user.create({
      data: {
        ...userData,
        role: UserRole.SUPERADMIN,
      },
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
