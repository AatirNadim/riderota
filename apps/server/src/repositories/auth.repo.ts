import { prisma, UserRole } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  createSuperAdminInDb = async (
    userData: components["schemas"]["SuperadminCreatePayload"]
  ) => {
    return prisma.user.create({
      data: {
        ...userData,
        role: UserRole.SUPERADMIN,
      },
    });
  };
}
