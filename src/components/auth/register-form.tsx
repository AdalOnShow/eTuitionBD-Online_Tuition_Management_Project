"use client";

import { Camera, Eye, EyeOff, GraduationCap, School } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as React from "react";

import { registerUser } from "@/server/actions/auth.actions";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema } from "@/server/validations/auth.schema";

type UserRole = "STUDENT" | "TUTOR";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

type UploadedImage = {
  url: string;
  publicId: string;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG, or WEBP images are allowed.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be 2MB or less.";
  }

  return "";
}

async function uploadImageToCloudinary(file: File): Promise<UploadedImage> {
  const signatureResponse = await fetch("/api/cloudinary/sign", {
    method: "POST",
  });

  const signaturePayload = await signatureResponse.json();

  if (!signatureResponse.ok) {
    throw new Error(
      signaturePayload.message ?? "Failed to initialize image upload.",
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signaturePayload.apiKey);
  formData.append("timestamp", String(signaturePayload.timestamp));
  formData.append("folder", signaturePayload.folder);
  formData.append("signature", signaturePayload.signature);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${signaturePayload.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  const uploadPayload = await uploadResponse.json();

  if (!uploadResponse.ok) {
    throw new Error(uploadPayload.error?.message ?? "Image upload failed.");
  }

  return {
    url: uploadPayload.secure_url,
    publicId: uploadPayload.public_id,
  };
}

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoError, setPhotoError] = React.useState("");
  const [role, setRole] = React.useState<UserRole>("STUDENT");
  const [errors, setErrors] = React.useState<RegisterErrors>({});
  const [formError, setFormError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const photoPreviewUrl = React.useMemo(
    () => (photoFile ? URL.createObjectURL(photoFile) : null),
    [photoFile],
  );

  React.useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
  }, [photoPreviewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) {
      setPhotoFile(null);
      setPhotoError("");
      return;
    }

    const validationMessage = validateImageFile(nextFile);

    if (validationMessage) {
      setPhotoFile(null);
      setPhotoError(validationMessage);
      event.target.value = "";
      return;
    }

    setPhotoError("");
    setPhotoFile(nextFile);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setPhotoError("");
    setFormError("");

    const parsed = registerSchema.safeParse({ name, email, password, role });

    if (!parsed.success) {
      const nextErrors: RegisterErrors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "name") nextErrors.name = issue.message;
        if (field === "email") nextErrors.email = issue.message;
        if (field === "password") nextErrors.password = issue.message;
        if (field === "role") nextErrors.role = issue.message;
      }

      setErrors(nextErrors);
      return;
    }

    startTransition(async () => {
      let uploadedImage: UploadedImage | null = null;

      if (photoFile) {
        try {
          uploadedImage = await uploadImageToCloudinary(photoFile);
        } catch (uploadError) {
          const message =
            uploadError instanceof Error
              ? uploadError.message
              : "Image upload failed. Please try again.";
          setPhotoError(message);
          return;
        }
      }

      const result = await registerUser({
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        role: parsed.data.role,
        image: uploadedImage?.url,
        imagePublicId: uploadedImage?.publicId,
      });

      if (!result.success) {
        if (result.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...result.fieldErrors }));
        }
        setFormError(result.message);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: parsed.data.email.toLowerCase().trim(),
        password: parsed.data.password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (signInResult?.error) {
        setFormError("Account created successfully. Please sign in.");
        router.push("/login");
        return;
      }

      router.replace(signInResult?.url ?? "/dashboard");
      router.refresh();
    });
  };

  const handleGoogleSignIn = () => {
    void signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="mx-auto w-full max-w-2xl border-border/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Create account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[14rem_1fr] sm:items-start">
            <div className="space-y-2.5">
              <Label htmlFor="register-photo">Profile photo (optional)</Label>
              <input
                id="register-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="sr-only"
              />
              <label
                htmlFor="register-photo"
                className="border-input bg-background hover:border-muted-foreground/50 relative block size-52 cursor-pointer overflow-hidden rounded-lg border transition-colors"
              >
                {photoPreviewUrl ? (
                  <>
                    <Image
                      src={photoPreviewUrl}
                      alt="Profile preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="bg-background/75 text-foreground absolute right-1 bottom-1 rounded px-1.5 py-0.5 text-[10px] font-medium">
                      Change
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-1 text-xs">
                    <Camera className="size-4" />
                    Upload photo
                  </span>
                )}
              </label>
              {photoError ? (
                <p className="text-destructive text-xs">{photoError}</p>
              ) : null}
            </div>

            <div className="flex flex-col justify-between h-full space-y-3">
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
                <GraduationCap className="size-4" />
                Student
              </Button>
              <Button
                type="button"
                variant={role === "TUTOR" ? "default" : "outline"}
                className="h-10"
                onClick={() => setRole("TUTOR")}
              >
                <School className="size-4" />
                Tutor
              </Button>
            </div>
            {errors.role ? (
              <p className="text-destructive text-xs">{errors.role}</p>
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
            {isPending ? "Creating account..." : "Sign up"}
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
  );
}
