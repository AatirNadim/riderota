import { Request, Response } from "express";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";
import {
  components,
  createTokens,
  refreshTokens,
  UserRole,
  verifyAccessToken,
} from "@riderota/utils";

import bcrypt from "bcryptjs";

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

      const userDetails = await this.authRepo.createSuperAdminInDb(data);
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

  async getUserFromRequest(req: Request, res: Response): Promise<any> {
    const { userId } = await this.validateAndRefreshTokens(req, res);

    console.log("Fetching user details for ID:", userId);
    const user: components["schemas"]["UserDetails"] | null =
      await this.authRepo.getUserById(userId);
    return user;
  }

  async validateAndRefreshTokens(
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

        res.cookie("accessToken", newAccessToken, { httpOnly: true });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
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
