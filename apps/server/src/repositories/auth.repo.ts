import { prisma, UserRole, MembershipStatus } from "@riderota/utils";
import { components } from "@riderota/utils";

export class AuthRepo {
  async createUser(userData: any): Promise<string> {
    console.log("\n\nCreating user with data:", userData, "\n\n");
    const passwordHash = userData.password as string;
    const vehicleDetails = userData.vehicleDetails;
    delete userData.password;
    delete userData.vehicleDetails;
    const { id } = await prisma.user.create({
      data: {
        passwordHash,
        ...userData,
      },
    });

    if (vehicleDetails) {
      console.log("\n\nCreating vehicle details for the driver:", id, "\n\n");
      await prisma.vehicle.create({
        data: {
          ...vehicleDetails,
          driverId: id,
        },
      });
      console.log("\n\nVehicle details created for the driver:", id, "\n\n");
    }

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
