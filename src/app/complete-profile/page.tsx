import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Redirect based on user role
  if (session.user.role === "STUDENT") {
    redirect("/complete-profile/student");
  } else if (session.user.role === "TUTOR") {
    redirect("/complete-profile/tutor");
  } else {
    // Admin or other roles - redirect to dashboard
    redirect("/admin");
  }
}
