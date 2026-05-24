"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  authResendVerification,
  authVerifyEmail,
} from "@/server/auth/auth.service";

type EmailVerifyFormProps = {
  email: string;
  name: string;
};

export function EmailVerifyForm({ email, name }: EmailVerifyFormProps) {
  const router = useRouter();
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const [isResending, startResendTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError("");
    setFormSuccess("");

    const formData = new FormData();
    formData.append("code", code);

    startTransition(async () => {
      const result = await authVerifyEmail(null, formData);

      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors as Record<string, string>);
        }
        setFormError(result.message || "Unable to verify email.");
        return;
      }

      router.push("/complete-profile");
    });
  };

  const handleResend = () => {
    setFormError("");
    setFormSuccess("");

    startResendTransition(async () => {
      const result = await authResendVerification();

      if (!result.success) {
        setFormError(result.message || "Unable to resend code.");
        return;
      }

      setFormSuccess(result.message);
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Verify your email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-muted-foreground text-sm leading-6">
            {name.split(" ")[0] || "There"}, enter the 6-digit code sent to{" "}
            <span className="text-foreground font-medium">{email}</span>.
          </p>

          <div className="space-y-2.5">
            <Label htmlFor="verify-code">Verification code</Label>
            <Input
              id="verify-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="h-12 text-center text-lg tracking-[0.45em]"
              placeholder="000000"
              required
            />
            {errors.code ? (
              <p className="text-destructive text-xs">{errors.code}</p>
            ) : null}
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
            className="h-11 w-full"
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify email"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={isResending}
            onClick={handleResend}
          >
            {isResending ? "Sending..." : "Resend code"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Need a different account?{" "}
            <Link href="/register" className="text-foreground hover:underline">
              Register again
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
