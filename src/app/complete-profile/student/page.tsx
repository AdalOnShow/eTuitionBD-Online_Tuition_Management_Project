import { ProfileFrame } from "@/components/profile/profile-frame";
import { StudentProfileForm } from "@/components/profile/student-profile-form";
import { auth } from "@/lib/auth";
import { getPostAuthPath } from "@/lib/destinations";
import { getProfileStatus } from "@/server/auth/profile-status.service";
import { redirect } from "next/navigation";

export default async function StudentProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const profileStatus = await getProfileStatus();

  if (profileStatus.success && profileStatus.data.profileComplete) {
    redirect(getPostAuthPath(profileStatus.data));
  }

  return (
    <ProfileFrame
      eyebrow="Student setup"
      title="Tell tutors what kind of learning support you need."
      description="Add the minimum profile details required to post tuition needs and receive better tutor matches."
    >
      <StudentProfileForm />
    </ProfileFrame>
  );
}
