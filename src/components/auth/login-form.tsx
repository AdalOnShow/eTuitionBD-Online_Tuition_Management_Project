"use client"

import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import * as React from "react"

import { GoogleIcon } from "@/components/auth/google-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginSchema } from "@/server/validations/auth.schema"

type LoginErrors = {
  email?: string
  password?: string
}

export function LoginForm() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState<LoginErrors>({})
  const [formError, setFormError] = React.useState("")
  const [isPending, startTransition] = React.useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors({})
    setFormError("")

    const parsed = loginSchema.safeParse({ email, password })

    if (!parsed.success) {
      const nextErrors: LoginErrors = {}

      for (const issue of parsed.error.issues) {
        const field = issue.path[0]
        if (field === "email") nextErrors.email = issue.message
        if (field === "password") nextErrors.password = issue.message
      }

      setErrors(nextErrors)
      return
    }

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: parsed.data.email,
        password: parsed.data.password,
        redirect: false,
      })

      if (result?.error) {
        setFormError("Invalid email or password. Please try again.")
      }
    })
  }

  const handleGoogleSignIn = () => {
    void signIn("google")
  }

  return (
    <Card className="mx-auto w-full max-w-md border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              className="h-10"
              placeholder="you@example.com"
            />
            {errors.email ? (
              <p className="text-destructive text-xs">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                className="h-10 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password ? (
              <p className="text-destructive text-xs">{errors.password}</p>
            ) : null}
          </div>

          {formError ? <p className="text-destructive text-sm">{formError}</p> : null}

          <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-10 w-full"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon className="size-4" />
            Continue with Google
          </Button>

          <p className="text-muted-foreground text-center text-sm">
            New here?{" "}
            <Link href="/register" className="text-foreground hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
