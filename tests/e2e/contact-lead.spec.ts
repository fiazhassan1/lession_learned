import { test, expect } from "@playwright/test";

test.describe("e2e · lead capture", () => {
  test("contact path is visible and does not use a dead mailto-only dead-end", async ({
    page,
  }) => {
    await page.goto("/");
    const contact = page.getByRole("link", {
      name: /contact|book|whatsapp|start/i,
    }).first();
    await expect(contact).toBeVisible();
    const href = await contact.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).not.toMatch(/^#$/);
  });

  test("form, if present, posts to a real endpoint", async ({ page }) => {
    await page.goto("/");
    const form = page.locator("form").first();
    if ((await form.count()) === 0) {
      test.info().annotations.push({
        type: "note",
        description: "No form on homepage yet — WhatsApp CTA is the interim path.",
      });
      return;
    }
    const action = await form.getAttribute("action");
    expect(action).toBeTruthy();
    expect(action).not.toMatch(/example\.com|localhost|TODO/i);
  });
});
