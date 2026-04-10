"use server";

import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
  registerSchema,
  type RegisterInput,
} from "@/server/validations/auth.schema";

type RegisterFieldErrors = Partial<Record<keyof RegisterInput, string>>;

function serializeUnknownError(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    ("target" in error || "currentTarget" in error)
  ) {
    const eventLike = error as {
      type?: unknown;
      message?: unknown;
      error?: unknown;
      target?: unknown;
      currentTarget?: unknown;
    };
    const targetLike = (
      typeof eventLike.target === "object" && eventLike.target !== null
        ? eventLike.target
        : typeof eventLike.currentTarget === "object" &&
            eventLike.currentTarget !== null
          ? eventLike.currentTarget
          : null
    ) as {
      readyState?: unknown;
      url?: unknown;
      protocol?: unknown;
      extensions?: unknown;
    } | null;

    return {
      type: "ErrorEventLike",
      eventType: String(eventLike.type ?? "unknown"),
      message:
        typeof eventLike.message === "string" && eventLike.message.length > 0
          ? eventLike.message
          : eventLike.error instanceof Error
            ? eventLike.error.message
            : "Non-Error thrown value",
      innerError:
        eventLike.error instanceof Error
          ? {
              name: eventLike.error.name,
              message: eventLike.error.message,
              stack: eventLike.error.stack,
            }
          : eventLike.error,
      target:
        targetLike === null
          ? null
          : {
              readyState: targetLike.readyState,
              url: targetLike.url,
              protocol: targetLike.protocol,
              extensions: targetLike.extensions,
            },
      rawKeys: Object.keys(error),
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      type: error.name,
      code: error.code,
      meta: error.meta,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      type: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    type: typeof error,
    message: "Non-Error thrown value",
    value: String(error),
  };
}

const registerActionSchema = registerSchema.extend({
  image: z.string().url().nullable().optional(),
  imagePublicId: z.string().min(1).nullable().optional(),
});

type RegisterActionInput = z.infer<typeof registerActionSchema>;

export type RegisterActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: RegisterFieldErrors;
  debug?: unknown;
};

export async function registerUser(
  payload: RegisterActionInput,
): Promise<RegisterActionResult> {
  console.log("STEP 1: received data", {
    ...payload,
    password: payload?.password ? "[REDACTED]" : payload?.password,
  });

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

  const name = parsed.data.name.trim();
  const email = parsed.data.email.toLowerCase().trim();
  const password = parsed.data.password;
  const role = parsed.data.role ?? "STUDENT";
  const image = parsed.data.image ?? null;
  const imagePublicId = parsed.data.imagePublicId ?? null;

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Name, email, and password are required.",
      fieldErrors: {
        ...(name ? {} : { name: "Name is required" }),
        ...(email ? {} : { email: "Email is required" }),
        ...(password ? {} : { password: "Password is required" }),
      },
    };
  }

  try {
    console.log("STEP 2: checking existing user", { email });
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists",
        fieldErrors: { email: "Email already exists" },
      };
    }

    console.log("STEP 3: hashing password");
    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    const prismaPayload = {
      name,
      email,
      password: hashedPassword,
      image,
      imagePublicId,
      role,
    } satisfies Prisma.UserCreateInput;

    const hasUndefinedValues = Object.entries(prismaPayload).some(
      ([, value]) => value === undefined,
    );
    const hasRequiredFields =
      typeof prismaPayload.email === "string" &&
      prismaPayload.email.length > 0 &&
      typeof prismaPayload.password === "string" &&
      prismaPayload.password.length > 0;
    const isValidRole = ["STUDENT", "TUTOR", "ADMIN"].includes(
      String(prismaPayload.role),
    );

    console.log("STEP 4: pre-prisma verification", {
      role: prismaPayload.role,
      email: prismaPayload.email,
      image: prismaPayload.image,
      imagePublicId: prismaPayload.imagePublicId,
      hashedPasswordLength: prismaPayload.password.length,
      hasUndefinedValues,
      hasRequiredFields,
      isValidRole,
    });

    try {
      await prisma.user.create({
        data: prismaPayload,
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("PRISMA CREATE ERROR:", {
          code: error.code,
          meta: error.meta,
          message: error.message,
        });
      } else if (error instanceof Error) {
        console.error("PRISMA CREATE ERROR:", {
          message: error.message,
        });
      } else {
        console.error("PRISMA CREATE ERROR:", serializeUnknownError(error));
      }
      throw error;
    }

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error: unknown) {
    console.error("REGISTER ERROR FULL:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Email already exists",
        fieldErrors: { email: "Email already exists" },
        debug: {
          type: error.name,
          code: error.code,
          meta: error.meta,
        },
      };
    }

    if (error instanceof Error && error.message) {
      return {
        success: false,
        message: error.message,
        debug: serializeUnknownError(error),
      };
    }

    return {
      success: false,
      message: "Registration failed. Please try again.",
      debug: serializeUnknownError(error),
    };
  }
}
