"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/server/auth/auth.service";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError("");

    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      const result = await requestPasswordReset(null, formData);

      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors as Record<string, string>);
        }
        setFormError(result.message ?? "Unable to process request.");
        return;
      }

      router.push("/reset-password");
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Forgot password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2.5">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10"
              placeholder="you@example.com"
              required
            />
            {errors.email ? (
              <p className="text-destructive text-xs">{errors.email}</p>
            ) : null}
          </div>

          {formError ? (
            <p className="text-destructive text-sm">{formError}</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-10 w-full"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send reset code"}
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
