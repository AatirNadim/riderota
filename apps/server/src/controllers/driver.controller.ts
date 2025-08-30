import { components } from "@riderota/utils";
import { Request, Response } from "express";
import { DriverService } from "../services/driver.service";

class DriverController {
  constructor(private driverService: DriverService) {}

  getRideTasks = async (req: Request, res: Response) => {
    // Implementation for getting ride tasks
  };

  getRideEndOtp = async (req: Request, res: Response) => {
    // Implementation for generating ride end OTP
  };
}
