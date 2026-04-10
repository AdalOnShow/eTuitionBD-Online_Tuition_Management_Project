"use server";

import type { UserRole } from "@prisma/client";
import { z } from "zod";

import prisma from "@/lib/prisma";

const createTutorProfileSchema = z.object({
  userId: z.string().cuid(),
  bio: z.string().trim().optional(),
  subjects: z.array(z.string().trim().min(1)).default([]),
  experience: z.string().trim().optional(),
  qualifications: z.array(z.string().trim().min(1)).default([]),
  hourlyRate: z.number().positive().optional(),
  location: z.string().trim().optional(),
});

type CreateTutorProfileInput = z.infer<typeof createTutorProfileSchema>;

export type TutorProfileActionResult = {
  success: boolean;
  message: string;
};

export async function createTutorProfile(
  payload: CreateTutorProfileInput,
): Promise<TutorProfileActionResult> {
  const parsed = createTutorProfileSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid tutor profile data.",
    };
  }

  const data = parsed.data;

  try {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: data.userId },
        select: { id: true, role: true },
      });

      if (!user) {
        return { success: false, message: "User not found." };
      }

      const existingProfile = await tx.tutorProfile.findUnique({
        where: { userId: data.userId },
        select: { id: true },
      });

      if (existingProfile) {
        if (user.role !== "TUTOR") {
          await tx.user.update({
            where: { id: data.userId },
            data: { role: "TUTOR" },
          });
        }

        return { success: false, message: "Tutor profile already exists." };
      }

      await tx.tutorProfile.create({
        data: {
          userId: data.userId,
          bio: data.bio,
          subjects: data.subjects,
          experience: data.experience,
          qualifications: data.qualifications,
          hourlyRate: data.hourlyRate,
          location: data.location,
        },
      });

      if (user.role !== "TUTOR") {
        await tx.user.update({
          where: { id: data.userId },
          data: { role: "TUTOR" },
        });
      }

      return { success: true, message: "Tutor profile created." };
    });
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<TutorProfileActionResult> {
  if (!userId) {
    return { success: false, message: "User ID is required." };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      const existingProfile = await tx.tutorProfile.findUnique({
        where: { userId },
        select: { id: true },
      });

      const nextRole = existingProfile ? "TUTOR" : role;

      await tx.user.update({
        where: { id: userId },
        data: { role: nextRole },
      });

      if (existingProfile && role !== "TUTOR") {
        return {
          success: true,
          message: "Role forced to TUTOR because a TutorProfile exists.",
        };
      }

      return { success: true, message: "User role updated." };
    });
  } catch {
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
