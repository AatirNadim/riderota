import { Router } from "express";
import { authController } from "../container";
import { paths } from "@riderota/utils";

const router = Router();

router.post("/signup/superadmin", authController.superAdminSignupController);

router.post("/login/administration", authController.loginAdministration);

router.get("/whoami", authController.whoAmIController);

router.get("/health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

router.post("/clearSession", authController.clearSession);

router.post("/api/users/invite" as keyof paths, authController.inviteUser); // To satisfy TS compiler

export default router;
