import { z } from "zod";
import dayjs from 'dayjs';

const today = dayjs().format("YYYY-MM-DD");

export const casoRentasSchema = z.object({
  numero_escritura: z.string()
    .max(5, "El número de escritura no puede tener más de 5 caracteres.")
    .regex(/^\d+$/, "El número de escritura debe contener solo dígitos."),
  user_id: z.number()
    .int()
    .positive("El ID del usuario debe ser un número positivo."),
  fecha: z.string()
    .refine((date) => date <= today, {
      message: "La fecha debe ser menor o igual a la fecha de hoy.",
    }),
  radicado: z.string()
    .min(1, "El radicado es obligatorio.")
    .max(50, "El radicado no puede tener más de 50 caracteres.")
    .regex(/^\d+$/, "El radicado debe contener solo números."),
  observaciones: z.string().optional(),
});


