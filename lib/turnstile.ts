const ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile({
  token,
  secret,
  ip,
}: {
  token: string | undefined;
  secret: string | undefined;
  ip: string | null;
}): Promise<boolean> {
  if (!secret) return true; // dev bypass
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
