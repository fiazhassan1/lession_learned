import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const useLocalFixture = baseURL.includes("127.0.0.1:4173");

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-smoke",
      testDir: "./tests/smoke",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-e2e",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome-smoke",
      testDir: "./tests/smoke",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: useLocalFixture
    ? {
        command: "npx --yes serve site -l 4173 --no-port-switching",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
        timeout: 60_000,
      }
    : undefined,
});
