import { Router } from "express";
import { superAdminSignupController } from "../controllers/auth.controller";
import { paths } from "../types/generated-api";

const router = Router();

router.post("signup/superadmin", superAdminSignupController);

router.post("health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

export default router;
