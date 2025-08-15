import { Request, Response } from "express";
import { components } from "@riderota/utils";
import { AuthService } from "../services/auth.service";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";

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

  async whoAmIController(req: Request, res: Response) {
    try {
      const user = await this.authService.getUserFromRequest(req, res);

      res.json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error fetching user information" });
      }
    }
  }

  async clearSession(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Session cleared successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear session." });
    }
  }
}

export const authController = new AuthController(
  new AuthService(new AuthRepo())
);
