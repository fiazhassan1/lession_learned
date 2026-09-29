import { test, expect } from "@playwright/test";
import { contentAttr, isAbsoluteHttps } from "../helpers";

test.describe("e2e · share card contract", () => {
  test("homepage and share.html advertise the same og:image", async ({
    page,
  }) => {
    await page.goto("/");
    const homeImage = await contentAttr(page, 'meta[property="og:image"]');

    await page.goto("/share.html");
    const shareImage = await contentAttr(page, 'meta[property="og:image"]');

    expect(isAbsoluteHttps(homeImage)).toBeTruthy();
    expect(homeImage).toBe(shareImage);
  });

  test("share title does not out-promise the homepage h1", async ({ page }) => {
    await page.goto("/");
    const h1 = (await page.locator("h1").first().innerText()).toLowerCase();

    await page.goto("/share.html");
    const title =
      (await contentAttr(page, 'meta[property="og:title"]')) ??
      (await page.title());

    expect(title.length).toBeGreaterThan(8);
    expect(title.toLowerCase()).not.toMatch(
      /cure|diagnos|therapy|clinical trial|guaranteed/
    );
    expect(h1.length).toBeGreaterThan(0);
  });
});
