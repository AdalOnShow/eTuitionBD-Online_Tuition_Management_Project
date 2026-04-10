import type { UserRole } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { getPermissionsForRole } from "@/lib/rbac";
import { loginSchema } from "@/server/validations/auth.schema";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60;
const rawAccessTokenTtl = Number.parseInt(
  process.env.ACCESS_TOKEN_MAX_AGE ?? "900",
  10,
);
const ACCESS_TOKEN_TTL = Number.isNaN(rawAccessTokenTtl)
  ? 900
  : rawAccessTokenTtl;
const TOKEN_VERSION = 1;

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE,
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase().trim();
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.password) return null;

        const isValidPassword = await bcrypt.compare(
          parsed.data.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const fallbackRole = (user as { role?: UserRole }).role;
        const dbRole = user.id
          ? await prisma.user.findUnique({
              where: { id: user.id },
              select: { role: true },
            })
          : null;
        const resolvedRole = dbRole?.role ?? fallbackRole ?? "STUDENT";

        token.id = user.id;
        token.role = resolvedRole;
        token.permissions = getPermissionsForRole(resolvedRole);
        token.tokenVersion = TOKEN_VERSION;
        token.accessTokenExpiresAt =
          Math.floor(Date.now() / 1000) + ACCESS_TOKEN_TTL;
      }

      if (!token.permissions && token.role) {
        token.permissions = getPermissionsForRole(token.role as UserRole);
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as UserRole) ?? "STUDENT";
        session.user.permissions =
          (token.permissions as string[] | undefined) ??
          getPermissionsForRole((token.role as UserRole) ?? "STUDENT");
      }

      session.tokenVersion = token.tokenVersion as number | undefined;
      session.accessTokenExpiresAt = token.accessTokenExpiresAt as
        | number
        | undefined;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
