/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envVars from "@/lib/env";
import jwt from "jsonwebtoken";
export const verifyAccessToken = async (token: string) => {
  try {
    const verifiedAccessToken = jwt.verify(
      token,
      envVars.jwt.jwt_access_secret,
    ) as jwt.JwtPayload;

    return {
      success: true,
      data: verifiedAccessToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid token",
    };
  }
};
