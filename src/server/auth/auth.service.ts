/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import envVars from "@/lib/env";
import { setAuthTokens } from "@/lib/auth-utils";
import { resolvePostAuthPath } from "@/server/auth/profile-status.service";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@/utils/jsonwebtoken/getCookie";
import { verifyAccessToken } from "@/utils/jsonwebtoken/verifyAccessToken.verify";
import serverFetch from "@/utils/server-fetch";
import { zodValidation } from "@/utils/zodValidation";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  VerificationCodeSchema,
} from "@/validation/auth.validation";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PENDING_VERIFICATION_COOKIE = "pending_verification";
const PENDING_RESET_EMAIL_COOKIE = "pending_reset_email";

type PendingVerification = {
  userId: string;
  email: string;
  name: string;
};

async function setPendingVerification(data: PendingVerification) {
  await setCookie(
    PENDING_VERIFICATION_COOKIE,
    encodeURIComponent(JSON.stringify(data)),
    {
      maxAge: 60 * 15,
    },
  );
}

export async function getPendingVerification(): Promise<PendingVerification | null> {
  const raw = await getCookie(PENDING_VERIFICATION_COOKIE);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(raw)) as PendingVerification;
  } catch {
    await deleteCookie(PENDING_VERIFICATION_COOKIE);
    return null;
  }
}

async function clearPendingVerification() {
  await deleteCookie(PENDING_VERIFICATION_COOKIE);
}

export const authRegister = async (_preState: any, formData: FormData) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
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

    await setPendingVerification({
      userId: response.data.id,
      email: response.data.email,
      name: response.data.name,
    });

    return {
      success: true,
      message: response.message || "Registration successful",
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
      if (response?.code === "EMAIL_NOT_VERIFIED" && response?.data?.id) {
        await setPendingVerification({
          userId: response.data.id,
          email: response.data.email,
          name: response.data.name,
        });

        return {
          success: false,
          requiresEmailVerification: true,
          message:
            response?.message || "Please verify your email before logging in.",
        };
      }

      return {
        success: false,
        message: response?.message || "Invalid credentials",
        formData: payload,
      };
    }

    await clearPendingVerification();
    await setAuthTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    return {
      success: true,
      message: "Login successful",
      data: response.data,
      shouldRedirect: true,
      nextPath: await resolvePostAuthPath(),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${envVars.node_env === "development" ? error.message : "Something went wrong. Please try again later."}`,
    };
  }
};

export const authVerifyEmail = async (_preState: any, formData: FormData) => {
  const pendingVerification = await getPendingVerification();

  if (!pendingVerification) {
    return {
      success: false,
      message: "Verification session expired. Please register or sign in again.",
    };
  }

  const payload = {
    code: formData.get("code"),
  };

  const validatedPayload = zodValidation(payload, VerificationCodeSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedPayload.errors,
    };
  }

  try {
    const res = await serverFetch.post("/auth/verify-email", {
      body: JSON.stringify({
        userId: pendingVerification.userId,
        code: validatedPayload.data.code,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Verification failed",
      };
    }

    await setAuthTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
    await clearPendingVerification();

    return {
      success: true,
      message: response.message || "Email verified successfully",
      shouldRedirect: true,
      nextPath: "/complete-profile",
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

export async function authResendVerification() {
  const pendingVerification = await getPendingVerification();

  if (!pendingVerification) {
    return {
      success: false,
      message: "Verification session expired. Please register or sign in again.",
    };
  }

  try {
    const res = await serverFetch.post("/auth/resend-verification", {
      body: JSON.stringify({
        userId: pendingVerification.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Failed to resend verification code",
      };
    }

    return {
      success: true,
      message:
        response?.message || "A new verification code has been sent to your email.",
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
}

export const requestPasswordReset = async (
  _preState: any,
  formData: FormData,
) => {
  const payload = {
    email: formData.get("email"),
  };

  const validatedPayload = zodValidation(payload, ForgotPasswordSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedPayload.errors,
    };
  }

  try {
    const res = await serverFetch.post("/auth/forgot-password", {
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Unable to process request.",
      };
    }

    await setCookie(PENDING_RESET_EMAIL_COOKIE, validatedPayload.data.email, {
      maxAge: 60 * 20,
    });

    return {
      success: true,
      message:
        response?.message || "If an account exists, a reset code has been sent.",
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

export async function getPendingResetEmail() {
  return await getCookie(PENDING_RESET_EMAIL_COOKIE);
}

export const resetPasswordWithCode = async (
  _preState: any,
  formData: FormData,
) => {
  const pendingResetEmail = await getPendingResetEmail();
  const payload = {
    email: pendingResetEmail || formData.get("email"),
    code: formData.get("code"),
    password: formData.get("password"),
  };

  const validatedPayload = zodValidation(payload, ResetPasswordSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedPayload.errors,
    };
  }

  try {
    const res = await serverFetch.post("/auth/reset-password", {
      body: JSON.stringify(validatedPayload.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Unable to reset password.",
      };
    }

    await deleteCookie(PENDING_RESET_EMAIL_COOKIE);

    return {
      success: true,
      message: response?.message || "Password updated successfully.",
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
  formData.set("identifier", email);
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
