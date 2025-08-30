import { Router } from "express";
import { paths } from "@riderota/utils";
import { adminController } from "../container";

const router = Router();


router.post("/api/admin/task/createRideTask" as keyof paths, adminController.createRideTask);



export default router;
