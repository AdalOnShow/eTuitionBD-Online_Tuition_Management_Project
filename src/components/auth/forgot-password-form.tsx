"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiUrl } from "@/lib/api";

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [formError, setFormError] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    startTransition(async () => {
      const response = await fetch(getApiUrl("/auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        setFormError(data?.message ?? "Unable to process request.");
        return;
      }

      setFormSuccess(
        data?.message ?? "If an account exists, a reset link has been sent.",
      );
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
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send reset link"}
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
