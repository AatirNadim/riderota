import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("signup/superadmin", authController.superAdminSignupController);

router.post("health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

export default router;
