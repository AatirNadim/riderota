import { Router } from "express";
import { paths } from "@riderota/utils";

const router = Router();


router.post("/api/admin/task/createRideTask" as keyof paths, adminController.createRideTask);



export default router;
