import { Router } from "express";
import { paths } from "@riderota/utils";

const router = Router();

router.get("/api/driver/task/getRideTasks" as keyof paths, driverController.getRideTasks);

// router.post("/api/driver/task/generateRideStartOtp" as keyof paths, driverController.generateRideStartOtp);

router.post("/api/driver/task/generateRideEndOtp" as keyof paths, driverController.generateRideEndOtp);

export default router;
