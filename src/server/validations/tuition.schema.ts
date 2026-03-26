import { z } from "zod";

export const postStatusSchema = z.enum(["OPEN", "CLOSED", "FILLED"]);
export const appStatusSchema = z.enum(["PENDING", "ACCEPTED", "REJECTED"]);

export const tuitionPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  subject: z.string().min(1, "Subject is required"),
  grade: z.string().min(1, "Grade/Class is required"),
  salary: z.coerce.number().positive("Salary must be a positive number"),
  location: z.string().min(1, "Location is required"),
});

export const applicationSchema = z.object({
  message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
});

export type TuitionPostInput = z.infer<typeof tuitionPostSchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
