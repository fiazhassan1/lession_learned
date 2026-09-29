import { test, expect } from "@playwright/test";

test.describe("smoke · homepage", () => {
  test("loads and exposes a product job in the first screen", async ({
    page,
  }) => {
    const res = await page.goto("/");
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    const h1 = (await page.locator("h1").first().innerText()).trim();
    expect(h1.length).toBeGreaterThan(8);
    expect(h1).not.toMatch(/empower|holistic|next-gen|wellbeing journey/i);
  });

  test("has one primary CTA and working nav", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /book|start|view|contact/i }).first();
    await expect(cta).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("does not ship mixed-content or missing favicon as a 404", async ({
    page,
  }) => {
    const failed: string[] = [];
    page.on("response", (res) => {
      const url = res.url();
      if (res.status() >= 400 && /\.(css|js|png|jpe?g|webp|ico|svg)$/i.test(url)) {
        failed.push(`${res.status()} ${url}`);
      }
    });
    await page.goto("/");
    expect(failed, failed.join("\n")).toEqual([]);
  });
});
