import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "מספר טלפון לא תקין"),
  email: z.string().trim().email("אימייל לא תקין"),
  message: z.string().trim().min(10, "הודעה קצרה מדי").max(2000),
  consentLocation: z.literal(true, { errorMap: () => ({ message: "יש לאשר" }) }),
  consentMarketing: z.boolean().optional(),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().min(1, "אימות נכשל").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
