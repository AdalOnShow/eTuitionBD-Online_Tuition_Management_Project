import type { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { hasRequiredRole } from "@/lib/rbac";

const ROLE_RULES: Array<{ prefix: string; roles: UserRole[] }> = [
  { prefix: "/dashboard/admin", roles: ["ADMIN"] },
  { prefix: "/dashboard/tutor", roles: ["TUTOR", "ADMIN"] },
  { prefix: "/dashboard/student", roles: ["STUDENT", "ADMIN"] },
];

function getAuthSecret() {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
}

function buildLoginRedirect(request: NextRequest) {
  const callbackUrl = encodeURIComponent(
    request.nextUrl.pathname + request.nextUrl.search,
  );
  const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
  return NextResponse.redirect(loginUrl);
}

function buildUnauthorizedRedirect(request: NextRequest) {
  const unauthorizedUrl = new URL("/unauthorized", request.url);
  return NextResponse.redirect(unauthorizedUrl);
}

function findRoleRule(pathname: string) {
  return ROLE_RULES.find((rule) => pathname.startsWith(rule.prefix));
}

export async function proxy(request: NextRequest) {
  const secret = getAuthSecret();
  if (!secret) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    return buildLoginRedirect(request);
  }

  const roleRule = findRoleRule(request.nextUrl.pathname);

  if (!roleRule) {
    return NextResponse.next();
  }

  const userRole = token.role as UserRole | undefined;

  if (!hasRequiredRole(userRole, roleRule.roles)) {
    return buildUnauthorizedRedirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
