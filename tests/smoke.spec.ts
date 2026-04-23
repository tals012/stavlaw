import { test, expect } from "@playwright/test";

test("home renders in Hebrew RTL", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toBeVisible();
});

test("all JSON-LD blocks parse as valid JSON", async ({ page }) => {
  await page.goto("/");
  const blocks = await page.locator('script[type="application/ld+json"]').all();
  expect(blocks.length).toBeGreaterThanOrEqual(6);
  for (const b of blocks) {
    const text = await b.textContent();
    expect(() => JSON.parse(text ?? "")).not.toThrow();
  }
});

test("contact form submits successfully (mocked API)", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
  );
  await page.goto("/#contact");
  await page.getByLabel("שם מלא").fill("דנה בדיקה");
  await page.getByLabel("טלפון").fill("055-555-5555");
  await page.getByLabel("אימייל").fill("dana@example.com");
  await page.getByLabel("הודעה").fill("הודעת בדיקה ממושכת דיה לעבור ולידציה של Zod.");
  await page.getByRole("button", { name: /שליחה/ }).click();
  await expect(page.getByText("תודה, ניצור איתך קשר בהקדם")).toBeVisible({ timeout: 5000 });
});
