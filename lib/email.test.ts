import { describe, it, expect, vi } from "vitest";
import { sendContactEmail } from "./email";

describe("sendContactEmail", () => {
  it("calls resend.emails.send with expected shape", async () => {
    const send = vi.fn().mockResolvedValue({ data: { id: "e_1" }, error: null });
    const r = await sendContactEmail(
      { name: "דנה", phone: "0555555555", email: "d@x.com", message: "שלום", consentLocation: true },
      { client: { emails: { send } }, to: "s@stavlaw.co.il", from: "noreply@stavlaw.co.il" }
    );
    expect(r.ok).toBe(true);
    expect(send).toHaveBeenCalledOnce();
    const call = send.mock.calls[0]?.[0];
    expect(call).toBeDefined();
    expect(call!.to).toBe("s@stavlaw.co.il");
    expect(call!.from).toBe("noreply@stavlaw.co.il");
    expect(call!.reply_to).toBe("d@x.com");
    expect(call!.subject).toContain("דנה");
    expect(call!.html).toContain("שלום");
  });
});
