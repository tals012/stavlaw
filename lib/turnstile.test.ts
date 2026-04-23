import { describe, it, expect, vi, afterEach } from "vitest";
import { verifyTurnstile } from "./turnstile";

const origFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = origFetch; });

describe("verifyTurnstile", () => {
  it("returns true when secret is not set (dev)", async () => {
    const r = await verifyTurnstile({ token: "x", secret: undefined, ip: "1.2.3.4" });
    expect(r).toBe(true);
  });

  it("calls Cloudflare and returns success flag", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }) as unknown as typeof fetch;
    const r = await verifyTurnstile({ token: "tok", secret: "s", ip: "1.2.3.4" });
    expect(r).toBe(true);
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it("returns false on failure response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: false }) }) as unknown as typeof fetch;
    const r = await verifyTurnstile({ token: "tok", secret: "s", ip: "1.2.3.4" });
    expect(r).toBe(false);
  });
});
