import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { getPendingResetEmail } from "@/server/auth/auth.service";

export default async function ResetPasswordPage() {
  const email = await getPendingResetEmail();

  return (
    <AuthShell>
      <ResetPasswordForm email={email} />
    </AuthShell>
  );
}
