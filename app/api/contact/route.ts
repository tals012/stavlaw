import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { contactLimiter } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
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

  const rl = await contactLimiter.check(ip);
  if (!rl.allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile({
    token: data.turnstileToken,
    secret: process.env.TURNSTILE_SECRET_KEY,
    ip,
  });
  if (!turnstileOk) {
    return NextResponse.json({ error: "turnstile_failed" }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "s@stavlaw.co.il";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const result = await sendContactEmail(data, { to, from });
  if (!result.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
