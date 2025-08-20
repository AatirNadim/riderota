import { Router } from "express";
import { authController } from "../container";

const router = Router();

router.post("/signup/superadmin", authController.superAdminSignupController);

router.post("/login/administration", authController.loginAdministration);

router.get("/whoami", authController.whoAmIController);

router.get("/health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

router.post("/clearSession", authController.clearSession);

export default router;
