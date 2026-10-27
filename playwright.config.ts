import { defineConfig } from "@playwright/test";

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    locale: "fa-IR",
    trace: "on-first-retry",
    // Locally: use the installed Google Chrome. In CI: Playwright's own Chromium.
    ...(isCI ? {} : { channel: "chrome" }),
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/login",
    reuseExistingServer: !isCI,
    env: {
      SESSION_SECRET: "e2e-secret-e2e-secret-e2e-secret-123",
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "admin12345",
    },
  },
});
