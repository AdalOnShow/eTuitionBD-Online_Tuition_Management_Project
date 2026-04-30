import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@/utils/jsonwebtoken/getCookie";
import { verifyAccessToken } from "@/utils/jsonwebtoken/verifyAccessToken.verify";
import { verifyRefreshToken } from "@/utils/jsonwebtoken/verifyRefreshToken";
import { getApiUrl } from "./api";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
};

export async function setAuthTokens(tokens: AuthTokens) {
  await setCookie("access_token", tokens.accessToken, {
    maxAge: 60 * 60, // 1 hour
  });
  await setCookie("refresh_token", tokens.refreshToken, {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function getAccessToken(): Promise<string | null> {
  return await getCookie("access_token");
}

export async function getRefreshToken(): Promise<string | null> {
  return await getCookie("refresh_token");
}

export async function clearAuthTokens() {
  await deleteCookie("access_token");
  await deleteCookie("refresh_token");
}

export async function isAuthenticated(): Promise<boolean> {
  const accessToken = await getAccessToken();
  if (!accessToken) return false;

  const verification = await verifyAccessToken(accessToken);
  return verification.success;
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  const refreshVerification = await verifyRefreshToken(refreshToken);
  if (!refreshVerification.success) {
    await clearAuthTokens();
    return null;
  }

  try {
    const response = await fetch(getApiUrl("/auth/refresh"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      await clearAuthTokens();
      return null;
    }

    const data = await response.json();
    await setAuthTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    return data.accessToken;
  } catch {
    await clearAuthTokens();
    return null;
  }
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }
    accessToken = newToken;
  }

  const verification = await verifyAccessToken(accessToken);
  if (!verification.success) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }
    accessToken = newToken;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }
  }

  return response;
}
