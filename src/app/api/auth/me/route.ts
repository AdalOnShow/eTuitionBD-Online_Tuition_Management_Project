import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "@/lib/token-system";

function getBearerToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");
  if (!authorization) return null;

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) return null;

  return token;
}

export async function GET(request: NextRequest) {
  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json(
      { message: "Missing access token" },
      { status: 401 },
    );
  }

  const payload = await verifyAccessToken(accessToken);

  if (!payload) {
    return NextResponse.json(
      { message: "Invalid access token" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    userId: payload.sub,
    role: payload.role,
    permissions: payload.permissions,
    tokenVersion: payload.tokenVersion,
  });
}
