import type { UserRole } from "@prisma/client"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: UserRole
      permissions?: string[]
    } & DefaultSession["user"]
    tokenVersion?: number
    accessTokenExpiresAt?: number
  }

  interface User {
    role?: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    role?: UserRole
    permissions?: string[]
    tokenVersion?: number
    accessTokenExpiresAt?: number
  }
}
