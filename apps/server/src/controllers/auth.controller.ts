import { Request, Response } from "express";
import { components } from "@riderota/utils";
import { AuthService } from "../services/auth.service";
import { AuthRepo } from "../repositories/auth.repo";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

class AuthController {
  constructor(private authService: AuthService) {}

  async superAdminSignupController(
    req: Request<{}, {}, SuperAdminCreatePayload>,
    res: Response
  ) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.superAdminSignup(req.body);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(201).json({ message: "Superadmin created successfully" });
    } catch (error) {
      // A more specific error handling can be implemented
      res.status(500).json({ message: "Error creating superadmin" });
    }
  }
}

export const authController = new AuthController(
  new AuthService(new AuthRepo())
);
