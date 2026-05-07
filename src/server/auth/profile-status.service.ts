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
