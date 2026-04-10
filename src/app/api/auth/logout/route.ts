import { NextRequest, NextResponse } from "next/server"

import {
  getRefreshTokenCookieConfig,
  REFRESH_TOKEN_COOKIE,
  revokeRefreshToken,
} from "@/lib/token-system"

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value

  if (refreshToken) {
    await revokeRefreshToken(refreshToken)
  }

  const cookie = getRefreshTokenCookieConfig(0)
  const response = NextResponse.json({ success: true })
  response.cookies.set(cookie.name, "", cookie.options)

  return response
}
