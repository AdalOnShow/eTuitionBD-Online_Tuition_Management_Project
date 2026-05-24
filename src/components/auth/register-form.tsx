"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authRegister } from "@/server/auth/auth.service";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<RegisterErrors>({});
  const [formError, setFormError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setFormError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const result = await authRegister(null, formData);

      if (!result.success) {
        if (result.errors) {
          setErrors(result.errors as RegisterErrors);
        }
        setFormError(
          result.message || "Registration failed. Please try again.",
        );
        return;
      }

      if (result.shouldRedirect) {
        router.push("/email-verify");
      }
    });
  };

  return (
    <Card className="mx-auto w-full max-w-xl rounded-2xl border-border/80 shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Create account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="register-name"
                className="text-muted-foreground text-sm font-medium"
              >
                Name
              </Label>
              <Input
                id="register-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                className="h-11 rounded-xl"
                placeholder="Your full name"
              />
              {errors.name ? (
                <p className="text-destructive text-xs">{errors.name}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="register-email"
                className="text-muted-foreground text-sm font-medium"
              >
                Email
              </Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                className="h-11 rounded-xl"
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p className="text-destructive text-xs">{errors.email}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="register-password"
                className="text-muted-foreground text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  className="h-11 rounded-xl pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="text-destructive text-xs">{errors.password}</p>
              ) : null}
            </div>
          </div>

          {formError ? (
            <p className="text-destructive text-sm">{formError}</p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full rounded-xl"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Continue to verification"}
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            Already registered?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
