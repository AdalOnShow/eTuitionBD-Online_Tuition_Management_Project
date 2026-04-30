import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

export const LoginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character",
    ),
  role: z.enum(["STUDENT", "TUTOR", "ADMIN"]).default("STUDENT"),
});
