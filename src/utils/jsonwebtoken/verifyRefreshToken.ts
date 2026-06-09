/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverConfig } from "@/config/server";
import jwt from "jsonwebtoken";
export const verifyRefreshToken = async (token: string) => {
  try {
    const verifiedRefreshToken = jwt.verify(
      token,
      serverConfig.jwt.refreshSecret,
    ) as jwt.JwtPayload;

    return {
      success: true,
      message: "Token is valid",
      payload: verifiedRefreshToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    };
  }
};
