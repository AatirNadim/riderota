import { Router } from "express";
import { tenantController } from "../container";

const router = Router();

router.post("/create", tenantController.createTenant);

router.get("/slug/check-if-exists", tenantController.checkIfSlugExists);

router.get("/health-check", (_, res) => {
  res.status(200).json({ message: "OK" });
});

export default router;
