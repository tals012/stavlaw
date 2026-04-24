import { z } from "zod";

export const QUIZ_STEP_KEYS = ["situation", "hearing", "tenure", "issue"] as const;

export type QuizStepKey = (typeof QUIZ_STEP_KEYS)[number];

export const quizSchema = z.object({
  situation: z.enum(["fired_recent", "still_employed", "hearing_scheduled", "unpaid"]),
  hearing: z.enum(["yes", "no", "not_applicable"]),
  tenure: z.enum(["under_1y", "1_3y", "3_7y", "over_7y"]),
  issue: z.enum(["wages_overtime", "pension_benefits", "harassment", "wrongful_dismissal", "other"]),
  name: z.string().trim().min(2, "שם קצר מדי").max(80),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, "מספר טלפון לא תקין"),
  email: z.string().trim().email("אימייל לא תקין"),
  honeypot: z.string().max(0).optional(),
});

export type QuizInput = z.infer<typeof quizSchema>;
