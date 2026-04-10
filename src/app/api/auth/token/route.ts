import { NextResponse } from "next/server"
import type { UserRole } from "@prisma/client"

import { auth } from "@/auth"
import {
  getRefreshTokenCookieConfig,
  issueTokenPairForUser,
} from "@/lib/token-system"

export async function POST() {
  const session = await auth()
  const user = session?.user

  if (!user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const tokenPair = await issueTokenPairForUser({
    id: user.id,
    role: (user.role as UserRole | undefined) ?? "STUDENT",
    email: user.email,
    name: user.name,
  })

  const cookie = getRefreshTokenCookieConfig()
  const response = NextResponse.json({
    tokenType: "Bearer",
    accessToken: tokenPair.accessToken,
    accessTokenExpiresAt: tokenPair.accessTokenExpiresAt.toISOString(),
  })

  response.cookies.set(cookie.name, tokenPair.refreshToken, cookie.options)
  return response
}
