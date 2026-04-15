import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getApiUrl } from "@/lib/api";
import { getPermissionsForRole } from "@/lib/rbac";
import { loginSchema } from "@/server/validations/auth.schema";
import type { UserRole } from "@/types/auth";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers = [
  ...(googleClientId && googleClientSecret
    ? [
        Google({
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        }),
      ]
    : []),
  Credentials({
    name: "credentials",
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      const parsed = loginSchema.safeParse(credentials);

      if (!parsed.success) return null;

      try {
        const response = await fetch(getApiUrl("/auth/login"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: parsed.data.email.toLowerCase().trim(),
            password: parsed.data.password,
          }),
        });

        if (!response.ok) {
          return null;
        }

        const data = (await response.json().catch(() => null)) as
          | {
              accessToken?: string;
              user?: {
                id?: string;
                name?: string | null;
                email?: string;
                role?: UserRole;
                image?: string | null;
              };
            }
          | null;

        if (!data?.accessToken || !data.user?.id || !data.user.email) {
          return null;
        }

        return {
          id: data.user.id,
          name: data.user.name ?? null,
          email: data.user.email,
          image: data.user.image ?? null,
          role: data.user.role ?? "STUDENT",
          accessToken: data.accessToken,
        };
      } catch {
        return null;
      }
    },
  }),
];

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE,
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const resolvedRole = (user as { role?: UserRole }).role ?? "STUDENT";

        token.id = user.id ?? token.sub;
        token.role = resolvedRole;
        token.accessToken = (user as { accessToken?: string }).accessToken;
        token.permissions = getPermissionsForRole(resolvedRole);
      }

      if (!token.role) {
        token.role = "STUDENT";
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
        session.user.accessToken = token.accessToken as string | undefined;
        session.user.permissions =
          (token.permissions as string[] | undefined) ??
          getPermissionsForRole((token.role as UserRole) ?? "STUDENT");
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
