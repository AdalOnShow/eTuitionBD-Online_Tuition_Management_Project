import "server-only";

import { getPostAuthPath } from "@/lib/destinations";
import serverFetch from "@/utils/server-fetch";

export async function getProfileStatus() {
  try {
    const response = await serverFetch.get("/profile/status");
    const result = await response.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to check profile status",
    };
  }
}

export async function resolvePostAuthPath() {
  const profileStatus = await getProfileStatus();

  if (!profileStatus?.success) {
    return "/complete-profile";
  }

  return getPostAuthPath(profileStatus.data);
}
