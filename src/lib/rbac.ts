import type { UserRole } from "@prisma/client"

export const rolePermissions: Record<UserRole, string[]> = {
  STUDENT: [
    "tuition:read",
    "tuition:post",
    "application:create",
    "profile:manage:self",
  ],
  TUTOR: [
    "tuition:read",
    "application:create",
    "application:manage:self",
    "profile:manage:self",
    "tutor-profile:manage:self",
  ],
  ADMIN: ["*"],
}

export function getPermissionsForRole(role: UserRole): string[] {
  return rolePermissions[role] ?? rolePermissions.STUDENT
}

export function hasRequiredRole(
  role: UserRole | undefined,
  allowedRoles: UserRole[]
): boolean {
  if (!role) return false
  return allowedRoles.includes(role)
}
