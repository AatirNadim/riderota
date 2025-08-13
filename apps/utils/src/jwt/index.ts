import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const createTokens = (
  payload: any
): { accessToken: string; refreshToken: string } => {
  const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
  const accessTokenExpiresIn = (process.env.JWT_ACCESS_TOKEN_EXPIRATION ||
    "15m") as StringValue;
  const refreshTokenExpiresIn = (process.env.JWT_REFRESH_TOKEN_EXPIRATION ||
    "7d") as StringValue;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error("JWT secrets are not defined in environment variables.");
  }

  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenExpiresIn,
  });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = <T>(token: string): T => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_ACCESS_TOKEN_SECRET is not defined in environment variables."
    );
  }

  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    console.error("Access Token Verification Error:", (error as Error).message);
    throw new Error("Invalid or expired access token.");
  }
};

export const refreshTokens = <T>(oldRefreshToken: string): AuthTokens => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_REFRESH_TOKEN_SECRET is not defined in environment variables."
    );
  }

  try {
    const decoded = jwt.verify(oldRefreshToken, secret) as T;

    return createTokens(decoded);
  } catch (error) {
    console.error("Refresh Token Error:", (error as Error).message);
    throw new Error("Invalid or expired refresh token.");
  }
};
