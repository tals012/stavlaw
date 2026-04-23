import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/rate-limit", () => ({
  contactLimiter: { check: vi.fn().mockResolvedValue({ allowed: true, remaining: 5 }) },
}));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: vi.fn().mockResolvedValue(true) }));
vi.mock("@/lib/email", () => ({ sendContactEmail: vi.fn().mockResolvedValue({ ok: true, id: "e_1" }) }));

import { POST } from "./route";

function req(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://x/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("200 on valid input", async () => {
    const res = await POST(req({ name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום עולם." }));
    expect(res.status).toBe(200);
  });

  it("400 on invalid input", async () => {
    const res = await POST(req({ name: "ד", phone: "x", email: "x", message: "" }));
    expect(res.status).toBe(400);
  });

  it("400 on honeypot filled", async () => {
    const res = await POST(req({ name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום עולם.", honeypot: "bot" }));
    expect(res.status).toBe(400);
  });
});
