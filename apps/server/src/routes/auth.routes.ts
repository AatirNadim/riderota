import { Router } from "express";
import { authController } from "../container";
import { paths } from "@riderota/utils";

const router = Router();

router.post("/signup/superadmin", authController.superAdminSignupController);

router.post("/login/administration", authController.loginAdministration);

router.post("/users/onboard" as keyof paths, authController.onboardUser);

router.get("/whoami", authController.whoAmIController);

router.get("/health-check", (_, res) => {
  res.json({ status: "ok from auth" });
});

router.post("/clearSession", authController.clearSession);

router.post("/users/invite" as keyof paths, authController.inviteUser);

router.post(
  "/users/validate-invite" as keyof paths,
  authController.validateInviteToken
);

export default router;
