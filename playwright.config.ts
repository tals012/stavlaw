import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  use: { baseURL: "http://localhost:3111", locale: "he-IL" },
  webServer: {
    command: "npm run build && npm run start -- --port 3111",
    url: "http://localhost:3111",
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
