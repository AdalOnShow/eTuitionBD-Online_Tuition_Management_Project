import type { DefaultSession } from "next-auth";
import type { UserRole } from "@/types/auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: UserRole;
      accessToken?: string;
      permissions?: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role?: UserRole;
    accessToken?: string;
    permissions?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    accessToken?: string;
    permissions?: string[];
  }
}
