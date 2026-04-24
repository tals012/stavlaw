import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";

type MinimalClient = { emails: { send: (args: SendArgs) => Promise<{ data: unknown; error: unknown }> } };
type SendArgs = {
  from: string;
  to: string;
  reply_to: string;
  subject: string;
  html: string;
  text: string;
};

export function buildEmailHtml(input: ContactInput): string {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  return `<!doctype html><html lang="he" dir="rtl"><body style="font-family:Arial,sans-serif;color:#111B2E;background:#F4EBDD;padding:24px">
    <h2 style="color:#1F2A44;margin:0 0 12px">פנייה חדשה מהאתר</h2>
    <p><strong>שם:</strong> ${esc(input.name)}</p>
    <p><strong>טלפון:</strong> ${esc(input.phone)}</p>
    <p><strong>אימייל:</strong> ${esc(input.email)}</p>
    <p><strong>הודעה:</strong><br>${esc(input.message).replace(/\n/g, "<br>")}</p>
  </body></html>`;
}

export function buildEmailText(input: ContactInput): string {
  return `פנייה חדשה מהאתר\n\nשם: ${input.name}\nטלפון: ${input.phone}\nאימייל: ${input.email}\n\nהודעה:\n${input.message}`;
}

export async function sendContactEmail(
  input: ContactInput,
  ctx: {
    client?: MinimalClient;
    apiKey?: string;
    to: string;
    from: string;
  }
): Promise<{ ok: boolean; id?: string; error?: unknown }> {
  const client = ctx.client ?? new Resend(ctx.apiKey ?? process.env.RESEND_API_KEY);
  const { data, error } = await client.emails.send({
    from: ctx.from,
    to: ctx.to,
    reply_to: input.email,
    subject: `פנייה חדשה מהאתר - ${input.name}`,
    html: buildEmailHtml(input),
    text: buildEmailText(input),
  });
  if (error) return { ok: false, error };
  return { ok: true, id: (data as { id?: string } | null)?.id };
}
