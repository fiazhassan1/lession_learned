import { test, expect } from "@playwright/test";
import { contentAttr, isAbsoluteHttps } from "../helpers";

test.describe("smoke · share.html + Open Graph", () => {
  test("share page is reachable", async ({ page }) => {
    const res = await page.goto("/share.html");
    expect(res?.status()).toBeLessThan(400);
  });

  test("og tags meet the locked spec", async ({ page }) => {
    await page.goto("/share.html");

    const ogType = await contentAttr(page, 'meta[property="og:type"]');
    expect(ogType).not.toBe("x:game");
    expect(ogType).toMatch(/website|article/);

    const image = await contentAttr(page, 'meta[property="og:image"]');
    expect(isAbsoluteHttps(image)).toBeTruthy();

    const width = await contentAttr(page, 'meta[property="og:image:width"]');
    const height = await contentAttr(page, 'meta[property="og:image:height"]');
    expect(width).toBe("1200");
    expect(height).toBe("630");

    const card = await contentAttr(page, 'meta[name="twitter:card"]');
    expect(card).toBe("summary_large_image");
  });

  test("og:image URL returns an image", async ({ page, request }) => {
    await page.goto("/share.html");
    const image = await contentAttr(page, 'meta[property="og:image"]');
    expect(image).toBeTruthy();

    const host = new URL(image!).hostname;
    test.skip(
      host === "example.com",
      "Fixture uses example.com. Point BASE_URL at Hostinger to enforce the live image."
    );

    const res = await request.get(image!);
    expect(res.ok()).toBeTruthy();
    const type = res.headers()["content-type"] ?? "";
    expect(type).toMatch(/image\/(jpeg|png|webp)/);
    const buf = await res.body();
    expect(buf.byteLength).toBeGreaterThan(8_000);
    expect(buf.byteLength).toBeLessThan(600_000);
  });
});
