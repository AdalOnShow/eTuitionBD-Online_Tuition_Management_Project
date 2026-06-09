import { ProfileFrame } from "@/components/profile/profile-frame";
import { TutorProfileForm } from "@/components/profile/tutor-profile-form";
import { auth } from "@/lib/auth";
import { getPostAuthPath } from "@/lib/destinations";
import { getProfileStatus } from "@/server/auth/profile-status.service";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
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
      eyebrow="Tutor setup"
      title="Build a profile that makes students confident to hire you."
      description="Share credentials, teaching subjects, and pricing so your tutor listing can be matched accurately."
    >
      <TutorProfileForm />
    </ProfileFrame>
  );
}
