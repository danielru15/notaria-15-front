import { z } from "zod";


export const validateField = (schema: z.ZodSchema, value: any) => {
    const result = schema.safeParse(value);
    if (!result.success) {
      return Promise.reject(result.error.errors[0].message);
    }
    return Promise.resolve();
  };