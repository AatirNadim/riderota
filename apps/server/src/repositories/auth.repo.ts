import { prisma } from "@riderota/utils";
import { components } from "../types/generated-api";

export class AuthRepo {
  createSuperAdminInDb = async (
    userData: components["schemas"]["SuperadminCreatePayload"]
  ) => {
    const { organizationName, ...restOfUser } = userData;

    return prisma.user.create({
      data: {
        ...restOfUser,
        role: "SUPERADMIN",
        organization: {
          create: {
            name: organizationName,
          },
        },
      },
    });
  };
}
