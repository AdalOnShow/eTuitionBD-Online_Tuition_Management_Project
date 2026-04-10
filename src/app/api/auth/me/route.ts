import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
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

  try {
    const payload = await verifyAccessToken(accessToken);

    if (!payload?.sub) {
      return NextResponse.json(
        { message: "Invalid access token" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isBlocked =
      ("isBlocked" in user && Boolean((user as { isBlocked?: boolean }).isBlocked)) ||
      ("blocked" in user && Boolean((user as { blocked?: boolean }).blocked)) ||
      ("status" in user && (user as { status?: string }).status === "BLOCKED");

    if (isBlocked) {
      return NextResponse.json({ message: "Account blocked" }, { status: 403 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      imagePublicId: user.imagePublicId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
