import { AuthShell } from "@/components/auth/auth-shell";
import { EmailVerifyForm } from "@/components/auth/email-verify-form";
import { getPendingVerification } from "@/server/auth/auth.service";
import { redirect } from "next/navigation";

export default async function EmailVerifyPage() {
  const pendingVerification = await getPendingVerification();

  if (!pendingVerification) {
    redirect("/register");
  }

  return (
    <AuthShell>
      <EmailVerifyForm
        email={pendingVerification.email}
        name={pendingVerification.name}
      />
    </AuthShell>
  );
}
