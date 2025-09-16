import { prisma, UserRole, MembershipStatus } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createUser(userData: any): Promise<string> {
    console.log("\n\nCreating user with data:", userData, "\n\n");
    const passwordHash = userData.password;
    delete userData.password;
    const { id } = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
      },
    });

    // const res = await prisma.user.create({
    //   data: {

    //   }
    // })

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
