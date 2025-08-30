import { components, paths } from "@riderota/utils";

export class DriverRepository {
  getRideTasks = async (
    driverId: string
  ): Promise<components["schemas"]["RideTaskForDriver"][]> => {
    // Implementation for fetching ride tasks for a driver
    return null;
  };

  createRideEndOtp = async (driverId: string): Promise<string> => {
    // Implementation for creating ride end OTP
    return null;
  };
}
