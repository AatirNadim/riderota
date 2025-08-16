import { prisma, UserRole } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createSuperAdminInDb(
    userData: components["schemas"]["SuperadminCreatePayload"]
  ) {
    const res = await prisma.user.create({
      data: {
        ...userData,
        role: UserRole.SUPERADMIN,
      },
    });

    console.log("\n\nSuperadmin created:", res, "\n\n");

    return res.id;
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
