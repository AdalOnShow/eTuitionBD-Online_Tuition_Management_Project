/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserRole } from "@/types/auth";
import { getCookie } from "@/utils/jsonwebtoken/getCookie";
import { verifyAccessToken } from "@/utils/jsonwebtoken/verifyAccessToken.verify";

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
};

export async function auth(): Promise<{ user: SessionUser } | null> {
  const accessToken = await getCookie("access_token");

  if (!accessToken) {
    return null;
  }

  const verification = await verifyAccessToken(accessToken);

  if (!verification.success) {
    return null;
  }

  const payload = verification.data as any;

  return {
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name || null,
      role: (payload.role as UserRole) || "STUDENT",
    },
  };
}
