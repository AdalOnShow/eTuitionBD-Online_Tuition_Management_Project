import { z } from "zod";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const zodValidation = <T extends z.ZodTypeAny>(
  payload: any,
  schema: T,
) => {
  const validatedPayload = schema.safeParse(payload);

  if (!validatedPayload.success) {
    const errors: Record<string, string> = {};

    validatedPayload.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });

    return {
      success: false,
      errors,
      data: undefined,
    } as const;
  }

  return {
    success: true,
    data: validatedPayload.data as z.infer<T>,
    errors: undefined,
  } as const;
};
