import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type CheckResult = { allowed: boolean; remaining: number };
type Limiter = { check: (key: string) => Promise<CheckResult> };

type Opts = {
  url: string | undefined;
  token: string | undefined;
  __testOverride?: { limit: (k: string) => Promise<{ success: boolean; remaining: number }> };
};

export function createLimiter(opts: Opts): Limiter {
  if (opts.__testOverride) {
    return {
      async check(key) {
        const r = await opts.__testOverride!.limit(key);
        return { allowed: r.success, remaining: r.remaining };
      },
    };
  }
  if (!opts.url || !opts.token) {
    return { async check() { return { allowed: true, remaining: Infinity }; } };
  }
  const redis = new Redis({ url: opts.url, token: opts.token });
  const rl = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "1 h"),
    prefix: "rl:contact",
  });
  return {
    async check(key) {
      const r = await rl.limit(key);
      return { allowed: r.success, remaining: r.remaining };
    },
  };
}

export const contactLimiter = createLimiter({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
