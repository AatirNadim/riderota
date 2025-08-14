import { Request, Response } from "express";
import { AuthRepo } from "../repositories/auth.repo";
import { UserNotFoundError } from "../exceptions/user-not-found.exception";
import {
  components,
  createTokens,
  refreshTokens,
  verifyAccessToken,
} from "@riderota/utils";

type ValidatedSession = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

export class AuthService {
  constructor(private authRepo: AuthRepo) {}

  async superAdminSignup(
    data: components["schemas"]["SuperadminCreatePayload"]
  ): Promise<any> {
    try {
      const userId = await this.authRepo.createSuperAdminInDb(data);
      console.log("Superadmin created successfully");

      const { accessToken, refreshToken } = createTokens({ id: userId });
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      // Handle error
    }
  }

  async getUserFromRequest(req: Request, res: Response): Promise<any> {
    const { userId } = await this.validateAndRefreshTokens(req, res);
    const user: components["schemas"]["UserDetails"] = await this.authRepo.getUserById(userId);
    return user;
  }

  async validateAndRefreshTokens(
    req: Request,
    res: Response
  ): Promise<ValidatedSession> {
    const { accessToken, refreshToken } = req.cookies;

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
