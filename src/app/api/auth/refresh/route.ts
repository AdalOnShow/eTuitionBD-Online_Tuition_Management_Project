import { NextRequest, NextResponse } from "next/server";

import {
  getRefreshTokenCookieConfig,
  REFRESH_TOKEN_COOKIE,
  rotateRefreshTokenPair,
} from "@/lib/token-system";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token missing" },
      { status: 401 },
    );
  }

  const rotated = await rotateRefreshTokenPair(refreshToken);

  if (!rotated) {
    const cookie = getRefreshTokenCookieConfig(0);
    const response = NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 401 },
    );
    response.cookies.set(cookie.name, "", cookie.options);
    return response;
  }

  const cookie = getRefreshTokenCookieConfig();
  const response = NextResponse.json({
    tokenType: "Bearer",
    accessToken: rotated.accessToken,
    accessTokenExpiresAt: rotated.accessTokenExpiresAt.toISOString(),
  });

  response.cookies.set(cookie.name, rotated.refreshToken, cookie.options);
  return response;
}
