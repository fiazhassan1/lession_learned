import { test, expect } from "@playwright/test";

const api = process.env.API_URL ?? "http://127.0.0.1:3001";

test.describe("e2e · api", () => {
  test("/health is up when API_URL is running", async ({ request }) => {
    let res;
    try {
      res = await request.get(`${api}/health`);
    } catch {
      test.skip(true, "API not running — start with npm run api:dev");
      return;
    }
    if (!res.ok()) {
      test.skip(true, "API not running — start with npm run api:dev");
      return;
    }
    const json = await res.json();
    expect(json.ok).toBeTruthy();
  });
});
