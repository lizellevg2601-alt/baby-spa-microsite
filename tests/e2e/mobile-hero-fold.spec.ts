import { expect, test } from "@playwright/test";

const mobileViewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
];

for (const viewport of mobileViewports) {
  test(`closed mobile navigation must not push hero down at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const header = page.locator("header").first();
    const menu = page.getByTestId("mobile-site-navigation");
    const eyebrow = page.getByText("Premium baby development & sensory studio", { exact: true });
    const headline = page.getByText("Little wonders.", { exact: false }).first();

    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(eyebrow).toBeVisible();
    await expect(headline).toBeVisible();

    const headerBox = await header.boundingBox();
    const eyebrowBox = await eyebrow.boundingBox();
    expect(headerBox).not.toBeNull();
    expect(eyebrowBox).not.toBeNull();

    const heroGap = eyebrowBox!.y - (headerBox!.y + headerBox!.height);
    expect(heroGap, "Hero should follow the header rather than an invisible menu").toBeGreaterThanOrEqual(0);
    expect(heroGap, "The space under the mobile header must remain compact").toBeLessThanOrEqual(52);

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth, "Mobile page must not overflow horizontally").toBeLessThanOrEqual(viewport.width + 1);

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
  });
}
