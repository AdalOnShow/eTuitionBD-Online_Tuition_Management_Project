import type { UserRole } from "@/types/auth";

export type ProfileStatusData = {
  profileComplete?: boolean;
  role?: UserRole | "SUPER_ADMIN";
};

export function getDashboardPath(role?: UserRole | "SUPER_ADMIN") {
  if (role === "TUTOR") return "/tutor";
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin";
  return "/student";
}

export function getPostAuthPath(profileStatus?: ProfileStatusData | null) {
  if (!profileStatus?.profileComplete) {
    return "/complete-profile";
  }

  return getDashboardPath(profileStatus.role);
}
