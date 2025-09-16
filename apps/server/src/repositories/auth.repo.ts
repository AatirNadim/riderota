import { prisma, UserRole, MembershipStatus } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createUser(userData: any): Promise<string> {
    const { id } = await prisma.user.create({
      data: {
        ...userData,
        passwordHash: userData.password,
      },
    });

    console.log("\n\nNew user created:", id, "\n\n");

    return id;
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
