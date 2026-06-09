import { z } from "zod";

export const gradeLevels = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
] as const;

export const studentProfileSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+8801[3-9]\d{8}$/, "Use a correct Bangladeshi phone number"),
  address: z.string().trim().min(1, "Address is required"),
  gradeLevel: z.enum(gradeLevels, "Grade level is required"),
  school: z.string().trim().min(1, "School name is required"),
});

export const tutorProfileSchema = z.object({
  experience: z.string().trim().min(1, "Experience is required"),
  education: z.string().trim().min(1, "Education is required"),
  subjects: z
    .array(z.string().trim().min(1))
    .min(1, "At least one subject is required"),
  hourlyRate: z.coerce
    .number()
    .min(100, "Hourly rate must be at least 100 BDT")
    .max(10000, "Hourly rate must not exceed 10,000 BDT"),
  bio: z.string().trim().optional(),
  certifications: z.string().trim().optional(),
});

export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type TutorProfileInput = z.infer<typeof tutorProfileSchema>;

export const studentProfileSteps = [
  {
    id: 1,
    title: "Contact",
    fields: ["phone"],
  },
  {
    id: 2,
    title: "Location",
    fields: ["address"],
  },
  {
    id: 3,
    title: "Academics",
    fields: ["gradeLevel", "school"],
  },
] as const;

export const tutorProfileSteps = [
  {
    id: 1,
    title: "Credentials",
    fields: ["experience", "education"],
  },
  {
    id: 2,
    title: "Teaching",
    fields: ["subjects", "hourlyRate"],
  },
  {
    id: 3,
    title: "Profile",
    fields: ["bio", "certifications"],
  },
] as const;

export function zodErrorsToRecord(error: z.ZodError) {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}
