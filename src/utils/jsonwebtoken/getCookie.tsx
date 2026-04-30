/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envVars from "@/lib/env";
import { cookies } from "next/headers";

export const setCookie = async (
  cookieName: string,
  cookieValue: string,
  cookie: any,
) => {
  const cookieStore = await cookies();
  const maxAge = cookie?.["Max-Age"]
    ? parseInt(cookie["Max-Age"])
    : cookie?.maxAge
      ? Number(cookie.maxAge)
      : 1000 * 60 * 60;

  cookieStore.set(cookieName, cookieValue, {
    domain:
      envVars.node_env === "production"
        ? `.${envVars.PRODUCTION_APP_ROOT_URL}`
        : `.${envVars.DEVELOPMENT_APP_ROOT_URL}`,
    httpOnly: true,
    secure: cookie?.secure ?? envVars.node_env === "production",
    sameSite:
      cookie?.sameSite ??
      (envVars.node_env === "production"
        ? cookie?.["SameSite"] || "none"
        : "lax"),
    maxAge,
    path: cookie?.path || cookie?.["Path"] || "/",
  });
};
export const getCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const result = cookieStore.get(cookieName)?.value || null;
  return result;
};

export const deleteCookie = async (cookieName: string) => {
  const cookieStore = await cookies();

  cookieStore.set(cookieName, "", {
    domain:
      envVars.node_env === "production"
        ? `.${envVars.PRODUCTION_APP_ROOT_URL}`
        : `.${envVars.DEVELOPMENT_APP_ROOT_URL}`,
    path: "/",
    maxAge: 0,
  });
};
