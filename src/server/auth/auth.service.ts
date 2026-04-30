/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envVars from "@/lib/env";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@/utils/jsonwebtoken/getCookie";
import { verifyAccessToken } from "@/utils/jsonwebtoken/verifyAccessToken.verify";
import serverFetch from "@/utils/server-fetch";
import { zodValidation } from "@/utils/zodValidation";
import { LoginSchema, RegisterSchema } from "@/validation/auth.validation";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const authRegister = async (_preState: any, formData: FormData) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || "STUDENT",
  };

  const validatedPayload = zodValidation(payload, RegisterSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: payload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const res = await serverFetch.post("/auth/register", {
      body: JSON.stringify({
        ...validatedPayload.data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Registration failed",
        errors: response?.errors,
      };
    }

    // Set cookies with tokens
    await setCookie("access_token", response.accessToken, {
      maxAge: 60 * 60, // 1 hour
    });
    await setCookie("refresh_token", response.refreshToken, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return {
      success: true,
      message: "Registration successful",
      data: response.data,
      shouldRedirect: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        envVars.node_env === "development"
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
};

export const authLogin = async (_preState: any, formData: FormData) => {
  const payload = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  const validatedPayload = zodValidation(payload, LoginSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: payload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: payload,
    };
  }

  try {
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify({
        identifier: validatedPayload.data.identifier.toLowerCase().trim(),
        password: validatedPayload.data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Invalid credentials",
        formData: payload,
      };
    }

    // Set cookies with tokens
    await setCookie("access_token", response.accessToken, {
      maxAge: 60 * 60, // 1 hour
    });
    await setCookie("refresh_token", response.refreshToken, {
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return {
      success: true,
      message: "Login successful",
      data: response.data,
      shouldRedirect: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${envVars.node_env === "development" ? error.message : "Something went wrong. Please try again later."}`,
    };
  }
};

export const devAutoLogin = async () => {
  if (process.env.NODE_ENV !== "development") {
    return {
      success: false,
      message: "Dev auto-login is only available in development.",
    };
  }

  const email = "superadmin@example.com";
  const password = "ChangeMe12345!";

  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);

  return await authLogin(null, formData);
};

export const logOut = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value || "";
  const refreshToken = cookieStore.get("refresh_token")?.value || "";

  const isProduction = process.env.NODE_ENV === "production";
  const rootDomain = isProduction
    ? process.env.NEXT_PUBLIC_PRODUCTION_APP_ROOT_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_APP_ROOT_URL;

  // Signal the middleware proxy to skip the refresh-token flow during logout.
  // Without this, a surviving refreshToken causes the proxy to re-issue an
  // accessToken on the very next request, effectively cancelling the logout.
  cookieStore.set("isLoggingOut", "1", {
    domain: `.${rootDomain}`,
    httpOnly: true,
    path: "/",
    maxAge: 15, // 15 seconds — enough time for the redirect to complete
    sameSite: "lax",
    secure: isProduction,
  });

  try {
    await fetch(`${envVars.api}/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      },
    });
  } catch (error) {
    console.error("[logOut] Backend logout call failed:", error);
    // best-effort logout; still clear cookies and redirect
  }

  await deleteCookie("access_token");
  await deleteCookie("refresh_token");

  const redirectURL = isProduction
    ? `https://${rootDomain}/login`
    : `http://${rootDomain}:3000/login`;

  redirect(redirectURL);
};

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("access_token");
    const refreshToken = await getCookie("refresh_token");

    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    let accessTokenObject: null | any = null;

    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    const result = await response.json();

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["access_token"]) {
          accessTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("access_token");
    setCookie(
      "access_token",
      accessTokenObject.access_token,
      accessTokenObject,
    );

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
