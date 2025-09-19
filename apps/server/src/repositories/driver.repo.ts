import { components, paths } from "@riderota/utils";

import { prisma, UserRole, MembershipStatus } from "@riderota/utils";

export class DriverRepository {
  getRideTasks = async (
    driverId: string
  ) => {
    // Implementation for fetching ride tasks for a driver
    return null;
  };

  createRideEndOtp = async (driverId: string) => {
    // Implementation for creating ride end OTP
    return null;
  };


  getVehicleDetails = async (driverId: string) => {
    // Implementation for fetching vehicle details for a driver

    console.log("\n\nFetching vehicle details for driver:", driverId, "\n\n");

    const vehicleDetails = await prisma.vehicle.findUnique({
      where: { driverId },
    });

    console.log("\n\nVehicle details fetched for driver:", driverId, vehicleDetails, "\n\n");
    return vehicleDetails;
  };
}
