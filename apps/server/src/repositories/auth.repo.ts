import { prisma, UserRole, MembershipStatus } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createSuperAdminInDb(
    userData: components["schemas"]["SuperadminCreatePayload"]
  ) {
    const res = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: userData.password,
        role: UserRole.SUPERADMIN,
        name: userData.name,
        phoneNo: userData.phoneNo,
        age: userData.age,
        profileImgUrl: userData.profileImgUrl,
      },
    });

    console.log("\n\nSuperadmin created:", res, "\n\n");

    return res;
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

  createInvitedUserEntry = async (
    email: string,
    role: UserRole,
    tenantSlug: string,
    welcomeMessage?: string
  ) => {
    return prisma.invitations.create({
      data: {
        email,
        userType: role,
        welcomeMessage,
        tenantSlug,
      },
    });
  };
}
