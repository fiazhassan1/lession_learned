import { expect, type Page } from "@playwright/test";

export function meta(page: Page, selector: string) {
  return page.locator(selector);
}

export async function contentAttr(page: Page, selector: string) {
  const el = page.locator(selector).first();
  await expect(el).toHaveCount(1);
  return el.getAttribute("content");
}

export function isAbsoluteHttps(url: string | null) {
  return !!url && /^https:\/\//i.test(url);
}
