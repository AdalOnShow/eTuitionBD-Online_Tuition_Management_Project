import { getAppRootDomain, publicConfig } from "@/config/public";
import type { NextRequest } from "next/server";

const RESERVED_SUBDOMAINS = new Set(["www", "admin", "student", "tutor"]);

export function getHostname(req: NextRequest) {
  const host = req.headers.get("host") || "";
  return host.split(":")[0];
}

export function isRootDomain(hostname: string) {
  const rootDomain = getAppRootDomain();
  return hostname === rootDomain || hostname === `www.${rootDomain}`;
}

export function buildRoleSubdomainUrl(role: "admin" | "student" | "tutor") {
  const rootDomain = getAppRootDomain();

  if (publicConfig.nodeEnv === "development") {
    return `http://${role}.${rootDomain}:3000`;
  }

  return `https://${role}.${rootDomain}`;
}

export function getRoleSubdomainRewrite(req: NextRequest, hostname: string) {
  const rootDomain = getAppRootDomain();
  const role = hostname.split(".")[0];

  if (!["admin", "student", "tutor"].includes(role)) {
    return null;
  }

  if (hostname !== `${role}.${rootDomain}`) {
    return null;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const rolePath = `/${role}${
    req.nextUrl.pathname === "/" ? "" : req.nextUrl.pathname
  }${searchParams ? `?${searchParams}` : ""}`;

  return rolePath;
}

export function getTenantSubdomainRewrite(req: NextRequest, hostname: string) {
  const parts = hostname.split(".");
  let subdomain = "";

  if (publicConfig.isProduction) {
    if (parts.length > 2) {
      subdomain = parts.slice(0, -2).join(".");
    }
  } else if (parts.length >= 3 && parts.slice(-2).join(".") === "lvh.me") {
    subdomain = parts[0];
  }

  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
    return null;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${req.nextUrl.pathname}${searchParams ? `?${searchParams}` : ""}`;

  return `/${subdomain}${path}`;
}
