import { z } from "zod";

// Esquema de validación con Zod
 export const passwordSchema = z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
  .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
  .regex(/[0-9]/, "Debe contener al menos un número");