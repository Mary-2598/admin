import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    locale: "fa-IR",
    // Locally: use the installed Google Chrome. In CI: Playwright's own Chromium.
    ...(process.env.CI ? {} : { channel: "chrome" }),
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000/login",
    reuseExistingServer: !process.env.CI,
    env: {
      SESSION_SECRET: "e2e-secret-e2e-secret-e2e-secret-123",
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "admin12345",
    },
  },
});