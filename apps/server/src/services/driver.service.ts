import { RideTask } from "@riderota/utils/dist/generated/prisma";

import { components, paths } from "@riderota/utils";
import { DriverRepository } from "../repositories/driver.repo";

export class DriverService {
  constructor(private driverRepository: DriverRepository) {}

  getRideTasks = async (
    driverId: string
  ): Promise<components["schemas"]["RideTaskForDriver"][]> => {
    return this.driverRepository.getRideTasks(driverId);
  };

  generateRideEndOtp = async (driverId: string): Promise<string> => {
    return this.driverRepository.createRideEndOtp(driverId);
  };
}
