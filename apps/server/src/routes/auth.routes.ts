import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("signup/superadmin", authController.superAdminSignupController);

router.post("/login", authController.login)

router.get("/whoami", authController.whoAmIController);

router.get("/health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

router.get("/clearSession", authController.clearSession);

export default router;
