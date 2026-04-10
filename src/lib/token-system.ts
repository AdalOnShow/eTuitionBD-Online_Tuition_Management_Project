import crypto from "crypto";
import type { Prisma, UserRole } from "@prisma/client";
import { decode, encode } from "next-auth/jwt";

import prisma from "@/lib/prisma";
import { getPermissionsForRole } from "@/lib/rbac";

type TokenUser = {
  id: string;
  role: UserRole;
  email?: string | null;
  name?: string | null;
};

type AccessTokenPayload = {
  type: "access";
  sub: string;
  role: UserRole;
  permissions: string[];
  tokenVersion: number;
  email?: string | null;
  name?: string | null;
};

type RefreshTokenPayload = {
  type: "refresh";
  sub: string;
  jti: string;
  family: string;
};

type TokenPair = {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  refreshTokenHash: string;
};

type RotateResult = Omit<TokenPair, "refreshTokenHash">;

type PrismaClientLike = Prisma.TransactionClient | typeof prisma;

const ACCESS_TOKEN_SALT = "etuitionbd.access-token";
const REFRESH_TOKEN_SALT = "etuitionbd.refresh-token";
const TOKEN_VERSION = 1;

export const REFRESH_TOKEN_COOKIE = "et_refresh_token";

const DEFAULT_ACCESS_TOKEN_AGE = 15 * 60;
const DEFAULT_REFRESH_TOKEN_AGE = 30 * 24 * 60 * 60;

function parseMaxAge(value: string | undefined, fallbackValue: number): number {
  if (!value) return fallbackValue;

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallbackValue;

  return parsed;
}

export const ACCESS_TOKEN_MAX_AGE = parseMaxAge(
  process.env.ACCESS_TOKEN_MAX_AGE,
  DEFAULT_ACCESS_TOKEN_AGE,
);
export const REFRESH_TOKEN_MAX_AGE = parseMaxAge(
  process.env.REFRESH_TOKEN_MAX_AGE,
  DEFAULT_REFRESH_TOKEN_AGE,
);

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET (or NEXTAUTH_SECRET) is not set.");
  }

  return secret;
}

function getAccessTokenSecret(): string {
  return process.env.ACCESS_TOKEN_SECRET ?? getAuthSecret();
}

function getRefreshTokenSecret(): string {
  return process.env.REFRESH_TOKEN_SECRET ?? getAuthSecret();
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function getExpiryDate(maxAgeSeconds: number): Date {
  return new Date(Date.now() + maxAgeSeconds * 1000);
}

function isRefreshPayload(payload: unknown): payload is RefreshTokenPayload {
  if (!payload || typeof payload !== "object") return false;

  const candidate = payload as Partial<RefreshTokenPayload>;
  return (
    candidate.type === "refresh" &&
    typeof candidate.sub === "string" &&
    typeof candidate.jti === "string" &&
    typeof candidate.family === "string"
  );
}

function isAccessPayload(payload: unknown): payload is AccessTokenPayload {
  if (!payload || typeof payload !== "object") return false;

  const candidate = payload as Partial<AccessTokenPayload>;
  return (
    candidate.type === "access" &&
    typeof candidate.sub === "string" &&
    typeof candidate.role === "string" &&
    Array.isArray(candidate.permissions)
  );
}

async function encodeAccessToken(user: TokenUser): Promise<{
  token: string;
  expiresAt: Date;
}> {
  const payload: AccessTokenPayload = {
    type: "access",
    sub: user.id,
    role: user.role,
    permissions: getPermissionsForRole(user.role),
    tokenVersion: TOKEN_VERSION,
    email: user.email ?? null,
    name: user.name ?? null,
  };

  const token = await encode<AccessTokenPayload>({
    token: payload,
    secret: getAccessTokenSecret(),
    salt: ACCESS_TOKEN_SALT,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  return { token, expiresAt: getExpiryDate(ACCESS_TOKEN_MAX_AGE) };
}

async function encodeRefreshToken(payload: RefreshTokenPayload): Promise<{
  token: string;
  expiresAt: Date;
}> {
  const token = await encode<RefreshTokenPayload>({
    token: payload,
    secret: getRefreshTokenSecret(),
    salt: REFRESH_TOKEN_SALT,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return { token, expiresAt: getExpiryDate(REFRESH_TOKEN_MAX_AGE) };
}

async function decodeRefreshToken(
  token: string,
): Promise<RefreshTokenPayload | null> {
  const payload = await decode<RefreshTokenPayload>({
    token,
    secret: getRefreshTokenSecret(),
    salt: REFRESH_TOKEN_SALT,
  });

  if (!isRefreshPayload(payload)) return null;

  return payload;
}

async function persistRefreshToken(
  client: PrismaClientLike,
  input: {
    userId: string;
    jti: string;
    family: string;
    refreshTokenHash: string;
    refreshTokenExpiresAt: Date;
  },
) {
  await client.refreshToken.create({
    data: {
      userId: input.userId,
      jti: input.jti,
      family: input.family,
      tokenHash: input.refreshTokenHash,
      expiresAt: input.refreshTokenExpiresAt,
    },
  });
}

async function issueTokenPair(
  user: TokenUser,
  client: PrismaClientLike,
  family?: string,
): Promise<TokenPair> {
  const jti = crypto.randomUUID();
  const tokenFamily = family ?? crypto.randomUUID();

  const [accessTokenResult, refreshTokenResult] = await Promise.all([
    encodeAccessToken(user),
    encodeRefreshToken({
      type: "refresh",
      sub: user.id,
      jti,
      family: tokenFamily,
    }),
  ]);

  const refreshTokenHash = hashToken(refreshTokenResult.token);

  await persistRefreshToken(client, {
    userId: user.id,
    jti,
    family: tokenFamily,
    refreshTokenHash,
    refreshTokenExpiresAt: refreshTokenResult.expiresAt,
  });

  return {
    accessToken: accessTokenResult.token,
    accessTokenExpiresAt: accessTokenResult.expiresAt,
    refreshToken: refreshTokenResult.token,
    refreshTokenExpiresAt: refreshTokenResult.expiresAt,
    refreshTokenHash,
  };
}

export async function issueTokenPairForUser(
  user: TokenUser,
): Promise<RotateResult> {
  const pair = await issueTokenPair(user, prisma);

  return {
    accessToken: pair.accessToken,
    accessTokenExpiresAt: pair.accessTokenExpiresAt,
    refreshToken: pair.refreshToken,
    refreshTokenExpiresAt: pair.refreshTokenExpiresAt,
  };
}

export async function rotateRefreshTokenPair(
  refreshToken: string,
): Promise<RotateResult | null> {
  const payload = await decodeRefreshToken(refreshToken);
  if (!payload) return null;

  const currentTokenHash = hashToken(refreshToken);

  return prisma.$transaction(async (tx) => {
    const storedToken = await tx.refreshToken.findUnique({
      where: { tokenHash: currentTokenHash },
      include: {
        user: {
          select: {
            id: true,
            role: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!storedToken) return null;

    if (storedToken.revokedAt || storedToken.expiresAt <= new Date()) {
      return null;
    }

    if (
      storedToken.jti !== payload.jti ||
      storedToken.family !== payload.family ||
      storedToken.userId !== payload.sub
    ) {
      return null;
    }

    const nextPair = await issueTokenPair(
      {
        id: storedToken.user.id,
        role: storedToken.user.role,
        email: storedToken.user.email,
        name: storedToken.user.name,
      },
      tx,
      storedToken.family,
    );

    await tx.refreshToken.update({
      where: { id: storedToken.id },
      data: {
        revokedAt: new Date(),
        replacedByTokenHash: nextPair.refreshTokenHash,
      },
    });

    return {
      accessToken: nextPair.accessToken,
      accessTokenExpiresAt: nextPair.accessTokenExpiresAt,
      refreshToken: nextPair.refreshToken,
      refreshTokenExpiresAt: nextPair.refreshTokenExpiresAt,
    };
  });
}

export async function revokeRefreshToken(refreshToken: string): Promise<void> {
  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function verifyAccessToken(
  accessToken: string,
): Promise<AccessTokenPayload | null> {
  const payload = await decode<AccessTokenPayload>({
    token: accessToken,
    secret: getAccessTokenSecret(),
    salt: ACCESS_TOKEN_SALT,
  });

  if (!isAccessPayload(payload)) return null;

  return payload;
}

export function getRefreshTokenCookieConfig(maxAge = REFRESH_TOKEN_MAX_AGE) {
  return {
    name: REFRESH_TOKEN_COOKIE,
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    },
  };
}
