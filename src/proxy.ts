import { NextRequest, NextResponse } from "next/server";

import {
  clearAuthCookies,
  getRouteAccess,
  resolveSessionFromRequest,
} from "@/lib/proxy/auth";
import {
  getHostname,
  getTenantSubdomainRewrite,
  isRootDomain,
} from "@/lib/proxy/routing";

const authRoutes = ["/login", "/register", "/email-verify"];

export async function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const hostname = getHostname(req);
  const isAuthRoute = authRoutes.includes(pathname);
  const { isProtectedRoute } = getRouteAccess(pathname);

  const session = await resolveSessionFromRequest(req);
  if (session.refreshedCookies.length && session.decoded) {
    return new NextResponse(null, {
      status: 204,
      headers: { "Set-Cookie": session.refreshedCookies.join("; ") as string },
    });
  }

  if (session.refreshFailed) {
    const res = isAuthRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", req.url));

    return clearAuthCookies(res);
  }

  if (isProtectedRoute && !session.decoded) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!isRootDomain(hostname)) {
    const tenantRewrite = getTenantSubdomainRewrite(req, hostname);

    if (tenantRewrite) {
      return NextResponse.rewrite(new URL(tenantRewrite, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
