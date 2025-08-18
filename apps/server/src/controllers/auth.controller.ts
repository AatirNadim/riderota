import { Request, Response } from "express";
import { components, paths } from "@riderota/utils";
import { AuthService } from "../services/auth.service";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";
import { UserNotAuthorizedError } from "../exceptions/user-not-authorized.exception";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

class AuthController {
  constructor(private authService: AuthService) {}

  superAdminSignupController = async (
    req: Request<{}, {}, SuperAdminCreatePayload>,
    res: Response
  ) => {
    try {
      console.log("Received superadmin signup request:", req.body);
      const { userDetails, accessToken, refreshToken } =
        await this.authService.superAdminSignup(req.body);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(201).json({
        message: "Superadmin created successfully",
        user: userDetails,
      });
    } catch (error) {
      // A more specific error handling can be implemented

      console.error("Error creating superadmin:", error);
      res.status(500).json({ message: "Error creating superadmin", error });
    }
  };

  loginAdministration = async (
    req: Request,
    res: Response<
      | paths["/api/auth/login/administration"]["post"]["responses"]["200"]["content"]["application/json"]
      | paths["/api/auth/login/administration"]["post"]["responses"]["401"]["content"]["application/json"]
      | any
    >
  ) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } =
        await this.authService.loginAdministration(email, password);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(401).json({ message: error.message });
      } else if (error instanceof UserNotAuthorizedError) {
        res.status(403).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error logging in", error });
      }
    }
  };

  whoAmIController = async (req: Request, res: Response) => {
    try {
      console.log("Received request to get user information");
      const user = await this.authService.getUserFromRequest(req, res);
      if (!user) throw new UserNotFoundError();
      res.json(user);
    } catch (error) {
      console.error("Error fetching user information:", error);
      if (error instanceof UserNotFoundError) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error fetching user information" });
      }
    }
  };

  clearSession = async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Session cleared successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear session." });
    }
  };
}

export default AuthController;
