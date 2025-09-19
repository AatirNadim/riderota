import { RideTask } from "@riderota/utils/dist/generated/prisma";

import { components, paths } from "@riderota/utils";
import { DriverRepository } from "../repositories/driver.repo";

export class DriverService {
  constructor(private driverRepository: DriverRepository) {}

  getRideTasks = async (
    driverId: string
  ) => {
    return this.driverRepository.getRideTasks(driverId);
  };

  generateRideEndOtp = async (driverId: string) => {
    return this.driverRepository.createRideEndOtp(driverId);
  };


  getVehicleDetails = async (driverId: string) => {
    return this.driverRepository.getVehicleDetails(driverId);
  };
}
