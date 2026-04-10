"use server";

import bcrypt from "bcrypt";
import { z } from "zod";

import prisma from "@/lib/prisma";
import {
  registerSchema,
  type RegisterInput,
} from "@/server/validations/auth.schema";

type RegisterFieldErrors = Partial<Record<keyof RegisterInput, string>>;

const registerActionSchema = registerSchema.extend({
  image: z.string().url().optional(),
  imagePublicId: z.string().min(1).optional(),
});

type RegisterActionInput = z.infer<typeof registerActionSchema>;

export type RegisterActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: RegisterFieldErrors;
};

export async function registerUser(
  payload: RegisterActionInput,
): Promise<RegisterActionResult> {
  const parsed = registerActionSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors: RegisterFieldErrors = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "name" ||
        field === "email" ||
        field === "password" ||
        field === "role"
      ) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase().trim();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please sign in.",
        fieldErrors: { email: "Email already exists" },
      };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    await prisma.user.create({
      data: {
        name: parsed.data.name.trim(),
        email,
        password: hashedPassword,
        image: parsed.data.image,
        imagePublicId: parsed.data.imagePublicId,
        role: parsed.data.role,
      },
    });

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
