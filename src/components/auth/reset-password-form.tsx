"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiUrl } from "@/lib/api";

type ResetPasswordFormProps = {
  token?: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!token) {
      setFormError("Missing reset token.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const response = await fetch(getApiUrl("/auth/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setFormError(data?.message ?? "Unable to reset password.");
        return;
      }

      setFormSuccess(data?.message ?? "Password updated successfully.");
      setPassword("");
      setConfirmPassword("");
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
            disabled={isPending || !token}
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
