import { publicConfig } from "@/config/public";
import type { NextRequest, NextResponse } from "next/server";

export type DecodedToken = {
  role?: string;
  exp?: number;
  [key: string]: unknown;
};

export type RefreshedSession = {
  decoded: DecodedToken | null;
  refreshFailed: boolean;
  refreshedCookies: string[];
};

export function parseJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload) as DecodedToken;
  } catch {
    return null;
  }
}

export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: publicConfig.isProduction,
    sameSite: "lax" as const,
    path: "/",
    domain: publicConfig.isProduction
      ? `.${publicConfig.productionRootUrl}`
      : undefined,
  };
}

export function clearAuthCookies(res: NextResponse) {
  const cookieOptions = getCookieOptions();

  res.cookies.set("access_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("refresh_token", "", { ...cookieOptions, maxAge: 0 });
  res.cookies.set("isLoggingOut", "", { ...cookieOptions, maxAge: 0 });

  return res;
}

export function attachRefreshedCookies(
  res: NextResponse,
  refreshedCookies: string[],
) {
  if (refreshedCookies.length === 0) {
    return res;
  }

  const cookieOptions = getCookieOptions();

  for (const cookieStr of refreshedCookies) {
    const [nameValue] = cookieStr.split(";");
    const [name, value] = nameValue.split("=");

    if (name && value) {
      res.cookies.set(name, value, cookieOptions);
    }
  }

  return res;
}

export function getRouteAccess(pathname: string) {
  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");
  const isTutorRoute = pathname.startsWith("/tutor");

  return {
    isAdminRoute,
    isStudentRoute,
    isTutorRoute,
    isProtectedRoute: isAdminRoute || isStudentRoute || isTutorRoute,
  };
}

export function canAccessRoleRoute(role: string | undefined, pathname: string) {
  const { isAdminRoute, isStudentRoute, isTutorRoute } = getRouteAccess(pathname);

  if (isAdminRoute) {
    return role === "ADMIN" || role === "SUPER_ADMIN";
  }

  if (isStudentRoute) {
    return role === "STUDENT";
  }

  if (isTutorRoute) {
    return role === "TUTOR";
  }

  return true;
}

export async function resolveSessionFromRequest(
  req: NextRequest,
): Promise<RefreshedSession> {
  const accessToken = req.cookies.get("access_token")?.value || null;
  const refreshToken = req.cookies.get("refresh_token")?.value || null;
  const isLoggingOut = req.cookies.get("isLoggingOut")?.value === "1";

  let decoded = accessToken ? parseJwt(accessToken) : null;

  if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
    decoded = null;
  }

  if (decoded) {
    return { decoded, refreshFailed: false, refreshedCookies: [] };
  }

  if (!refreshToken || isLoggingOut) {
    return {
      decoded: null,
      refreshFailed: Boolean(accessToken || isLoggingOut),
      refreshedCookies: [],
    };
  }

  try {
    const refreshRes = await fetch(`${publicConfig.apiUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (!refreshRes.ok) {
      return { decoded: null, refreshFailed: true, refreshedCookies: [] };
    }

    const refreshedCookies =
      typeof refreshRes.headers.getSetCookie === "function"
        ? refreshRes.headers.getSetCookie()
        : [];
    const accessTokenCookie = refreshedCookies.find((cookie) =>
      cookie.startsWith("access_token="),
    );

    if (!accessTokenCookie) {
      return { decoded: null, refreshFailed: true, refreshedCookies };
    }

    const newValue = accessTokenCookie.split(";")[0].split("=")[1];

    return {
      decoded: parseJwt(newValue),
      refreshFailed: false,
      refreshedCookies,
    };
  } catch (error) {
    console.error("Token refresh failed in proxy:", error);
    return { decoded: null, refreshFailed: true, refreshedCookies: [] };
  }
}
