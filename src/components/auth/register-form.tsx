"use client"

import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import * as React from "react"

import { GoogleIcon } from "@/components/auth/google-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerSchema } from "@/server/validations/auth.schema"
import { registerUser } from "@/server/actions/auth.actions"

type UserRole = "STUDENT" | "TUTOR"

type RegisterErrors = {
  name?: string
  email?: string
  password?: string
  role?: string
}

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [role, setRole] = React.useState<UserRole>("STUDENT")
  const [errors, setErrors] = React.useState<RegisterErrors>({})
  const [formError, setFormError] = React.useState("")
  const [isPending, startTransition] = React.useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors({})
    setFormError("")

    const parsed = registerSchema.safeParse({ name, email, password, role })

    if (!parsed.success) {
      const nextErrors: RegisterErrors = {}

      for (const issue of parsed.error.issues) {
        const field = issue.path[0]
        if (field === "name") nextErrors.name = issue.message
        if (field === "email") nextErrors.email = issue.message
        if (field === "password") nextErrors.password = issue.message
        if (field === "role") nextErrors.role = issue.message
      }

      setErrors(nextErrors)
      return
    }

    startTransition(async () => {
      const result = await registerUser({
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        role: parsed.data.role,
      })

      if (!result.success) {
        if (result.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...result.fieldErrors }))
        }
        setFormError(result.message)
        return
      }

      const signInResult = await signIn("credentials", {
        email: parsed.data.email.toLowerCase().trim(),
        password: parsed.data.password,
        callbackUrl: "/dashboard",
        redirect: false,
      })

      if (signInResult?.error) {
        setFormError("Account created successfully. Please sign in.")
        router.push("/login")
        return
      }

      router.replace(signInResult?.url ?? "/dashboard")
      router.refresh()
    })
  }

  const handleGoogleSignIn = () => {
    void signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <Card className="mx-auto w-full max-w-md border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">Create account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2.5">
            <Label htmlFor="register-name">Name</Label>
            <Input
              id="register-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className="h-10"
              placeholder="Your full name"
            />
            {errors.name ? (
              <p className="text-destructive text-xs">{errors.name}</p>
            ) : null}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
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
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                className="h-10 pr-10"
                placeholder="Create a strong password"
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

          <div className="space-y-2.5">
            <Label>Role</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={role === "STUDENT" ? "default" : "outline"}
                className="h-10"
                onClick={() => setRole("STUDENT")}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={role === "TUTOR" ? "default" : "outline"}
                className="h-10"
                onClick={() => setRole("TUTOR")}
              >
                Tutor
              </Button>
            </div>
            {errors.role ? (
              <p className="text-destructive text-xs">{errors.role}</p>
            ) : null}
          </div>

          {formError ? <p className="text-destructive text-sm">{formError}</p> : null}

          <Button type="submit" size="lg" className="h-10 w-full" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
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
            Already registered?{" "}
            <Link href="/login" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
