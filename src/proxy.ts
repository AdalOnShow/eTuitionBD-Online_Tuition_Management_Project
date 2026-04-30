/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

// Safely decode JWT payload without verification (Edge-safe).
function parseJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload) as DecodedToken;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;

  const host = req.headers.get("host") || "";
  const hostname = host.split(":")[0];

  const isProduction = process.env.NODE_ENV === "production";

  const rootDomain = isProduction
    ? process.env.NEXT_PUBLIC_PRODUCTION_APP_ROOT_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_APP_ROOT_URL;

  const pathname = url.pathname;

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    domain: isProduction
      ? `.${process.env.NEXT_PUBLIC_PRODUCTION_APP_ROOT_URL}`
      : undefined,
  };

  const authRoutes = ["/login", "/register", "/email-verify"];
  const isAuthRoute = authRoutes.includes(pathname);

  const isAdminRoute = pathname.startsWith("/admin");
  const isStudentRoute = pathname.startsWith("/student");
  const isTutorRoute = pathname.startsWith("/tutor");
  const isProtectedRoute = isAdminRoute || isStudentRoute || isTutorRoute;

  // --- Utilities ---
  const accessToken = req.cookies.get("access_token")?.value || null;
  const refreshToken = req.cookies.get("refresh_token")?.value || null;

  // Ensure session cookies are cleared when auth fails.
  const clearAuthCookies = (res: NextResponse) => {
    res.cookies.set("access_token", "", { ...cookieOptions, maxAge: 0 });
    res.cookies.set("refresh_token", "", { ...cookieOptions, maxAge: 0 });
  };

  let decoded: DecodedToken | null = null;
  let refreshFailed = false;
  let refreshedCookies: string[] = [];
  const isLoggingOut = req.cookies.get("isLoggingOut")?.value === "1";

  // Persist refreshed cookies back to the Edge response.
  const attachAccessTokenIfNeeded = (res: NextResponse) => {
    if (refreshedCookies.length > 0) {
      refreshedCookies.forEach((cookieStr) => {
        const [nameValue] = cookieStr.split(";");
        const [name, value] = nameValue.split("=");
        if (name && value) {
          res.cookies.set(name, value, cookieOptions);
        }
      });
    }
    return res;
  };

  // --- Auth: Token Extraction & Validation ---
  if (accessToken) {
    decoded = parseJwt(accessToken);
    if (decoded && decoded.exp && decoded.exp * 1000 < Date.now()) {
      decoded = null;
    }
  }

  // --- Auth: Refresh Token Flow ---
  // Skip refresh entirely if the user is in the middle of logging out.
  // Without this guard the proxy would re-issue an accessToken on the very
  // next request (the post-logout redirect), silently cancelling the logout.
  if (!decoded && refreshToken && !isLoggingOut) {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const refreshRes = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (refreshRes.ok) {
        refreshedCookies =
          typeof (refreshRes.headers as any).getSetCookie === "function"
            ? (refreshRes.headers as any).getSetCookie()
            : [];

        const accessTokenCookie = refreshedCookies.find((c: string) =>
          c.startsWith("access_token="),
        );
        if (accessTokenCookie) {
          const newValue = accessTokenCookie.split(";")[0].split("=")[1];
          decoded = parseJwt(newValue);
        }
      } else {
        refreshFailed = true;
      }
    } catch (error) {
      console.error("Token refresh failed in proxy:", error);
      refreshFailed = true;
    }
  } else if (!decoded && (isLoggingOut || (!refreshToken && accessToken))) {
    // isLoggingOut flag set → treat as a hard logout, skip refresh
    refreshFailed = true;
  } else if (!decoded && accessToken) {
    refreshFailed = true;
  }

  if (refreshFailed) {
    const res = isAuthRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));
    clearAuthCookies(res);
    // Consume the logout flag so it doesn't linger beyond this request
    res.cookies.set("isLoggingOut", "", { ...cookieOptions, maxAge: 0 });
    return res;
  }

  if (isProtectedRoute && !decoded) {
    return attachAccessTokenIfNeeded(
      NextResponse.redirect(new URL("/login", req.url)),
    );
  }

  // --- Auth: Role-Based Access Control ---
  if (decoded) {
    const role = decoded.role as string | undefined;
    const isAdminRole = role === "ADMIN" || role === "SUPER_ADMIN";
    const isStudentRole = role === "STUDENT";
    const isTutorRole = role === "TUTOR";

    if (isAdminRoute && !isAdminRole) {
      return attachAccessTokenIfNeeded(
        NextResponse.redirect(new URL("/unauthorized", req.url)),
      );
    }
    if (isStudentRoute && !isStudentRole) {
      return attachAccessTokenIfNeeded(
        NextResponse.redirect(new URL("/unauthorized", req.url)),
      );
    }
    if (isTutorRoute && !isTutorRole) {
      return attachAccessTokenIfNeeded(
        NextResponse.redirect(new URL("/unauthorized", req.url)),
      );
    }
  }

  // --- Routing: Subdomain Handling ---
  const searchParams = url.searchParams.toString();

  const path = `${url.pathname}${searchParams ? `?${searchParams}` : ""}`;

  const isRootDomain =
    hostname === rootDomain || hostname === `www.${rootDomain}`;

  if (isRootDomain && pathname.startsWith("/student")) {
    const target =
      process.env.NODE_ENV === "development"
        ? `http://student.${rootDomain}:3000`
        : `https://student.${rootDomain}`;

    return attachAccessTokenIfNeeded(NextResponse.redirect(target));
  }

  if (isRootDomain && pathname.startsWith("/tutor")) {
    const target =
      process.env.NODE_ENV === "development"
        ? `http://tutor.${rootDomain}:3000`
        : `https://tutor.${rootDomain}`;

    return attachAccessTokenIfNeeded(NextResponse.redirect(target));
  }

  if (isRootDomain && pathname.startsWith("/admin")) {
    const target =
      process.env.NODE_ENV === "development"
        ? `http://admin.${rootDomain}:3000`
        : `https://admin.${rootDomain}`;

    return attachAccessTokenIfNeeded(NextResponse.redirect(target));
  }

  if (isRootDomain) {
    return attachAccessTokenIfNeeded(NextResponse.next());
  }

  if (hostname === `admin.${rootDomain}`) {
    const searchParams = req.nextUrl.searchParams.toString();

    const adminPath = `/admin${
      req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname
    }${searchParams ? `?${searchParams}` : ""}`;

    return attachAccessTokenIfNeeded(
      NextResponse.rewrite(new URL(adminPath, req.url)),
    );
  }

  if (hostname === `student.${rootDomain}`) {
    const searchParams = req.nextUrl.searchParams.toString();

    const studentPath = `/student${
      req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname
    }${searchParams ? `?${searchParams}` : ""}`;

    return attachAccessTokenIfNeeded(
      NextResponse.rewrite(new URL(studentPath, req.url)),
    );
  }
  if (hostname === `tutor.${rootDomain}`) {
    const searchParams = req.nextUrl.searchParams.toString();

    const tutorPath = `/tutor${
      req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname
    }${searchParams ? `?${searchParams}` : ""}`;

    return attachAccessTokenIfNeeded(
      NextResponse.rewrite(new URL(tutorPath, req.url)),
    );
  }

  // --- Routing: Tenant Resolution ---
  const parts = hostname.split(".");

  let subdomain = "";

  if (isProduction) {
    if (parts.length > 2) {
      subdomain = parts.slice(0, -2).join(".");
    }
  } else {
    if (parts.length >= 3 && parts.slice(-2).join(".") === "lvh.me") {
      subdomain = parts[0];
    }
  }

  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== "admin" &&
    subdomain !== "student" &&
    subdomain !== "tutor"
  ) {
    return attachAccessTokenIfNeeded(
      NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url)),
    );
  }

  return attachAccessTokenIfNeeded(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
