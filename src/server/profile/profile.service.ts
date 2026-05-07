import serverFetch from "@/utils/server-fetch";

export async function createStudentProfile(formData: {
  phone: string;
  address: string;
  gradeLevel: string;
  school: string;
}) {
  try {
    const response = await serverFetch.post("/profile/student", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create student profile",
    };
  }
}

export async function createTutorProfile(formData: {
  bio?: string;
  subjects: string[];
  experience: string;
  education: string;
  hourlyRate: number;
  certifications?: string;
}) {
  try {
    const response = await serverFetch.post("/profile/tutor", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create tutor profile",
    };
  }
}
