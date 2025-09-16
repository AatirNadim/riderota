import { Request, Response } from "express";
import { components, paths } from "@riderota/utils";
import { AuthService } from "../services/auth.service";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";
import { UserNotAuthorizedError } from "../exceptions/user-not-authorized.exception";
import TenantService from "../services/tenant.service";
import { cookieOptions } from "../constants";
import { InviteTokenExpiredError } from "../exceptions/invite-token-expired.exception";

type SuperAdminCreatePayload = components["schemas"]["SuperadminCreatePayload"];

class AuthController {
  constructor(
    private authService: AuthService,
    private tenantService: TenantService
  ) {}

  superAdminSignupController = async (
    req: Request<{}, {}, SuperAdminCreatePayload>,
    res: Response
  ) => {
    try {
      console.log("Received superadmin signup request:", req.body);
      const { userDetails, accessToken, refreshToken } =
        await this.authService.superAdminSignup(req.body);

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

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

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      console.log("setting the cookies", res);

      res.status(200).json(user);
    } catch (error) {
      console.log("Error during login:", error);
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
      const userDetails = await this.authService.getUserFromRequest(req, res);
      if (!userDetails) throw new UserNotFoundError();
      let tenantDetails = null;
      if (userDetails.tenantSlug) {
        tenantDetails = await this.tenantService.getTenantDetails(
          userDetails.tenantSlug
        );
      }
      res.json({ userDetails, tenantDetails });
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

  inviteUser = async (req: Request, res: Response) => {
    try {
      // const { email, userType, welcomeMessage } = req.body;
      const invitationResult = await this.authService.inviteUser(req.body);
      res
        .status(200)
        .json({ message: "Invitation sent successfully", ...invitationResult });
    } catch (error) {
      console.error("Error inviting user:", error);
      res.status(500).json({ message: "Error inviting user", error });
    }
  };

  validateInviteToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const validationResponse = await this.authService.validateInviteToken(
        token
      );
      res.status(200).json(validationResponse);
    } catch (error) {
      if (error instanceof InviteTokenExpiredError) {
        res.status(400).json({ expired: true, message: error.message });
        return;
      }
      console.error("Error validating invite token:", error);
      res.status(500).json({ message: "Error validating invite token", error });
    }
  };

  onboardUser = async (req: Request, res: Response) => {
    try {
      const id = await this.authService.onboardUser(req.body);
      res
        .status(200)
        .json({ message: "User onboarded successfully", newUserId: id });
    } catch (error) {
      console.error("Error onboarding user:", error);
      res.status(500).json({ message: "Error onboarding user", error });
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
