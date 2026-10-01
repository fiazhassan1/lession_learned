import { test, expect } from "@playwright/test";

const api = process.env.API_URL ?? "http://127.0.0.1:3001";
// CI sets API_REQUIRED=1 and starts the API, so an unreachable or unhealthy API
// FAILS there. Locally the API is optional and the check skips when it is down.
const apiRequired = process.env.API_REQUIRED === "1";

test.describe("e2e · api", () => {
  test("/health is up when API_URL is running", async ({ request }) => {
    let res;
    try {
      res = await request.get(`${api}/health`);
    } catch (error) {
      if (apiRequired) throw error;
      test.skip(true, "API not running — start with npm run api:dev");
      return;
    }
    if (!res.ok()) {
      if (apiRequired) expect(res.ok(), `GET ${api}/health returned ${res.status()}`).toBeTruthy();
      test.skip(true, "API not running — start with npm run api:dev");
      return;
    }
    const json = await res.json();
    expect(json.ok).toBeTruthy();
  });
});
