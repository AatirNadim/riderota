import { CookieOptions } from "express";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  domain:
    process.env.NODE_ENV === "production" ? ".riderota.com" : ".localhost",
};
