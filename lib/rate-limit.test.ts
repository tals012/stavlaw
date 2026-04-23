import { describe, it, expect, vi } from "vitest";
import { createLimiter } from "./rate-limit";

describe("createLimiter", () => {
  it("returns a noop limiter when env is missing", async () => {
    const limiter = createLimiter({ url: undefined, token: undefined });
    const r = await limiter.check("ip-1");
    expect(r.allowed).toBe(true);
  });

  it("uses Upstash when env is present", async () => {
    const limit = vi.fn().mockResolvedValue({ success: true, remaining: 4 });
    const limiter = createLimiter({
      url: "https://x",
      token: "t",
      __testOverride: { limit },
    });
    const r = await limiter.check("ip-1");
    expect(r.allowed).toBe(true);
    expect(limit).toHaveBeenCalledWith("ip-1");
  });
});
