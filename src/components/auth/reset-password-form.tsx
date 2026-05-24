"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordWithCode } from "@/server/auth/auth.service";

type ResetPasswordFormProps = {
  email?: string | null;
};

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError("");
    setFormSuccess("");

    if (!email) {
      setFormError("Reset session expired. Start from forgot password.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code);
    formData.append("password", password);

    startTransition(async () => {
      const result = await resetPasswordWithCode(null, formData);

      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors as Record<string, string>);
        }
        setFormError(result.message ?? "Unable to reset password.");
        return;
      }

      setFormSuccess(result.message ?? "Password updated successfully.");
      setCode("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/login"), 800);
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Reset password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2.5">
            <Label htmlFor="reset-code">Reset code</Label>
            <Input
              id="reset-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="h-10"
              placeholder="Enter the 6-digit code"
              required
            />
            {errors.code ? (
              <p className="text-destructive text-xs">{errors.code}</p>
            ) : null}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="reset-password">New password</Label>
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10"
              placeholder="Enter a new password"
              required
              minLength={6}
            />
            {errors.password ? (
              <p className="text-destructive text-xs">{errors.password}</p>
            ) : null}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="reset-password-confirm">Confirm password</Label>
            <Input
              id="reset-password-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-10"
              placeholder="Confirm your password"
              required
              minLength={6}
            />
          </div>

          {formError ? (
            <p className="text-destructive text-sm">{formError}</p>
          ) : null}
          {formSuccess ? (
            <p className="text-emerald-600 text-sm">{formSuccess}</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-10 w-full"
            disabled={isPending || !email}
          >
            {isPending ? "Updating..." : "Update password"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Remembered your password?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
