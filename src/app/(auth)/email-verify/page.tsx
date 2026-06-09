import { AuthShell } from "@/components/auth/auth-shell";
import { EmailVerifyForm } from "@/components/auth/email-verify-form";
import { getPendingVerification } from "@/server/auth/auth.service";

export default async function EmailVerifyPage() {
  const pendingVerification = await getPendingVerification();

  return (
    <AuthShell>
      <EmailVerifyForm
        email={pendingVerification?.email ?? ""}
        name={pendingVerification?.name ?? ""}
        hasPendingVerification={Boolean(pendingVerification)}
      />
    </AuthShell>
  );
}
