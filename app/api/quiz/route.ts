import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quizSchema, type QuizInput } from "@/lib/quiz-schema";
import { contactLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";

const SITUATION_LABEL: Record<QuizInput["situation"], string> = {
  fired_recent: "פוטרתי לאחרונה",
  still_employed: "עדיין עובד, אבל יש בעיה",
  hearing_scheduled: "זומנתי לשימוע",
  unpaid: "לא קיבלתי תשלומים / זכויות",
};
const HEARING_LABEL: Record<QuizInput["hearing"], string> = {
  yes: "כן, נערך לי שימוע",
  no: "לא, פוטרתי ללא שימוע",
  not_applicable: "עדיין לא פוטרתי",
};
const TENURE_LABEL: Record<QuizInput["tenure"], string> = {
  under_1y: "פחות משנה",
  "1_3y": "שנה עד 3 שנים",
  "3_7y": "3 עד 7 שנים",
  over_7y: "מעל 7 שנים",
};
const ISSUE_LABEL: Record<QuizInput["issue"], string> = {
  wages_overtime: "שעות נוספות / שכר לא מלא",
  pension_benefits: "פנסיה / זכויות סוציאליות",
  harassment: "הטרדה / התעמרות",
  wrongful_dismissal: "פיטורים שלא כדין",
  other: "אחר",
};

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function buildHtml(input: QuizInput): string {
  return `<!doctype html><html lang="he" dir="rtl"><body style="font-family:Arial,sans-serif;color:#111B2E;background:#F4EBDD;padding:24px">
    <h2 style="color:#1F2A44;margin:0 0 12px">פנייה חדשה משאלון סינון</h2>
    <p><strong>שם:</strong> ${esc(input.name)}</p>
    <p><strong>טלפון:</strong> ${esc(input.phone)}</p>
    <p><strong>אימייל:</strong> ${esc(input.email)}</p>
    <hr style="border:none;border-top:1px solid #1F2A44;margin:16px 0">
    <h3 style="color:#1F2A44;margin:0 0 8px">תשובות השאלון</h3>
    <p><strong>מצב נוכחי:</strong> ${esc(SITUATION_LABEL[input.situation])}</p>
    <p><strong>שימוע:</strong> ${esc(HEARING_LABEL[input.hearing])}</p>
    <p><strong>ותק:</strong> ${esc(TENURE_LABEL[input.tenure])}</p>
    <p><strong>עיקר הבעיה:</strong> ${esc(ISSUE_LABEL[input.issue])}</p>
  </body></html>`;
}

function buildText(input: QuizInput): string {
  return `פנייה חדשה משאלון סינון\n\nשם: ${input.name}\nטלפון: ${input.phone}\nאימייל: ${input.email}\n\nמצב נוכחי: ${SITUATION_LABEL[input.situation]}\nשימוע: ${HEARING_LABEL[input.hearing]}\nותק: ${TENURE_LABEL[input.tenure]}\nעיקר הבעיה: ${ISSUE_LABEL[input.issue]}`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = quizSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ error: "bot_suspected" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const rl = await contactLimiter.check(`quiz:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "s@stavlaw.co.il";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const client = new Resend(process.env.RESEND_API_KEY);
  const { data: sent, error } = await client.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `שאלון סינון חדש - ${data.name}`,
    html: buildHtml(data),
    text: buildText(data),
  });
  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: (sent as { id?: string } | null)?.id });
}
