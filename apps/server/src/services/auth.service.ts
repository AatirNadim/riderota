import { Request, Response } from "express";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";
import {
  components,
  createTokens,
  refreshTokens,
  UserRole,
  verifyAccessToken,
  prisma,
  encryptPayload,
  validateEncryptedPayload,
  paths,
} from "@riderota/utils";

import bcrypt from "bcryptjs";
import { cookieOptions } from "../constants";
import { sendInvite } from "./resend.service";
import { InviteTokenExpiredError } from "../exceptions/invite-token-expired.exception";

type ValidatedSession = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

export class AuthService {
  private salt: string;

  constructor(private authRepo: AuthRepo) {
    this.salt = bcrypt.genSaltSync(10);
  }

  async superAdminSignup(
    data: components["schemas"]["SuperadminCreatePayload"]
  ): Promise<any> {
    try {
      const existingUser = await this.authRepo.getUserByEmail(data.email);

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      data.password = bcrypt.hashSync(data.password, this.salt);

      const userDetails = await this.authRepo.createUser(data);
      console.log("Superadmin created successfully");

      const { accessToken, refreshToken } = createTokens({
        id: userDetails.id,
      });
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      return { userDetails, accessToken, refreshToken };
    } catch (error) {
      // Handle error
      console.error("authService: Error creating superadmin:", error);
      throw error;
    }
  }

  async loginAdministration(
    email: string,
    password: string
  ): Promise<{
    user: components["schemas"]["UserDetails"];
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.authRepo.getUserByEmail(email);
    if (!user) throw new UserNotFoundError();

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPERADMIN) {
      throw new Error("Unauthorized user is trying to access admin space");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) throw new Error("Invalid password");

    const { accessToken, refreshToken } = createTokens({ id: user.id });
    return { user, accessToken, refreshToken };
  }

  async getUserFromRequest(req: Request, res: Response) {
    const { userId } = await this.validateAndRefreshTokens(req, res);

    console.log("Fetching user details for ID:", userId);
    const user: components["schemas"]["UserDetails"] | null =
      await this.authRepo.getUserById(userId);
    return user;
  }

  inviteUser = async (
    data: components["schemas"]["UserInvitePayload"]
  ): Promise<{ id: string }> => {
    try {
      console.log("\n\nInviting user with data:", data, "\n\n");

      const existingUser = await this.authRepo.getUserByEmail(data.email);

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const { id } = await this.authRepo.createInvitedUserEntry(
        data.email,
        data.userType,
        data.tenantSlug,
        data.welcomeMessage
      );
      console.log("\n\nUser invited successfully:", id, "\n\n");

      const tenantDetails = await prisma.tenant.findFirst({
        where: { slug: data.tenantSlug },
        select: { name: true, superadminId: true },
      });

      console.log("Tenant details for invitation:", tenantDetails);

      const superAdminDetails = await prisma.user.findFirst({
        where: { id: tenantDetails?.superadminId },
        select: { email: true },
      });

      console.log("superadmin details for invitation:", superAdminDetails);

      if (!tenantDetails || !superAdminDetails) {
        throw new Error("Tenant or Superadmin details not found");
      }

      const inviteToken = encryptPayload({ inviteId: id });

      console.log("Generated invite token:", inviteToken, "\n\nsending invite");

      await sendInvite(
        superAdminDetails.email,
        data.email,
        data.userType,
        tenantDetails.name,
        `http://${data.tenantSlug}.lvh.me:3001/users/invite/${inviteToken}`,
        data.welcomeMessage
      );

      console.log("Invite sent successfully to:", data.email);

      return { id };
    } catch (error) {
      console.error("Error inviting user:", error);
      throw error;
    }
  };

  validateInviteToken = async (
    token: string
  ): Promise<
    paths["/api/users/validate-invite"]["get"]["responses"]["200"]["content"]["application/json"]
  > => {
    try {
      const res = validateEncryptedPayload(token);

      if (res.expired) {
        throw new Error("Invalid or expired invite token");
      }

      console.log("Decrypted invite token data:", res.data);

      const payload = await prisma.invitations.findFirst({
        where: { id: res.data?.id },
      });

      console.log("Invite payload:", payload);

      if (!payload) {
        throw new Error("Invite not found for the given token");
      }

      const inviteExpired = new Date() > payload.expiresAt;
      if (inviteExpired) {
        throw new InviteTokenExpiredError("Invite token has expired.");
      }

      return {
        email: payload.email,
        userType: payload.userType,
        tenantSlug: payload.tenantSlug,
        expired: false,
      };
    } catch (error) {
      console.error("Error validating invite token:", error);
      throw error;
    }
  };

  onboardUser = async (
    data: paths["/api/auth/users/onboard"]["post"]["requestBody"]["content"]["application/json"]
  ): Promise<string> => {
    try {
      // const invite = await prisma.invitations.findFirst({
      //   where: { id: data.inviteId },
      // });

      // if (!invite) {
      //   throw new Error("Invalid invitation ID");
      // }

      // if (invite.used) {
      //   throw new Error("This invitation has already been used");
      // }

      // if (new Date() > invite.expiresAt) {
      //   throw new InviteTokenExpiredError("Invitation token has expired.");
      // }

      console.log("Onboarding user with data:", data);

      const existingUser = await this.authRepo.getUserByEmail(data.email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
      console.log("No existing user found with email:", data.email);

      data.password = bcrypt.hashSync(data.password, this.salt);

      const newUserId = await this.authRepo.createUser(data);

      // await prisma.invitations.update({
      //   where: { id: invite.id },
      //   data: { used: true },
      // });

      console.log("User onboarded successfully:", newUserId);
      return newUserId;
    } catch (error) {
      console.error("Error onboarding user:", error);
      throw error;
    }
  };

  private async validateAndRefreshTokens(
    req: Request,
    res: Response
  ): Promise<ValidatedSession> {
    const { accessToken, refreshToken } = req.cookies;

    console.log("Validating tokens:", {
      accessToken,
      refreshToken,
    });

    if (!accessToken || !refreshToken) {
      throw new UserNotFoundError();
    }

    try {
      // Attempt to verify the access token first
      const decoded = verifyAccessToken<{ id: string }>(accessToken);
      return { userId: decoded.id, accessToken, refreshToken };
    } catch (accessTokenError) {
      // Access token is invalid or expired, try to refresh
      try {
        const {
          payload,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } = refreshTokens<{ id: string }>(refreshToken);

        // Important: Set the new tokens in the response cookies

        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);
        return {
          userId: payload.id,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
      } catch (refreshTokenError) {
        // Refresh token is also invalid, clear cookies and end session

        throw new UserNotFoundError();
      }
    }
  }
}
