export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  domain: process.env.NODE_ENV === "production" ? ".riderota.com" : "localhost",
};
