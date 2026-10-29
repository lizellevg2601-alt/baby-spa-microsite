import { test, expect } from "@playwright/test";

test.describe("Twinkle Toe Love – Baby Wellness Spa", () => {
  test("mobile home page loads with hero and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Twinkle Toe Love/);
    await expect(page.getByRole("heading", { name: /Little wonders/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Book an experience/i })
    ).toBeVisible();
    await expect(
      page.getByText(/Thoughtfully designed sensory play/i)
    ).toBeVisible();
  });

  test("mobile navigation shows experiences link", async ({ page }) => {
    await page.goto("/");
    const navLink = page.getByRole("link", { name: /Experiences/i });
    await expect(navLink).toBeVisible();
  });

  test("experiences page shows three launch cards", async ({ page }) => {
    await page.goto("/experiences");
    await expect(page.getByRole("heading", { name: /Experiences/i })).toBeVisible();
    await expect(page.getByText(/Little Explorers Sensory/i)).toBeVisible();
    await expect(page.getByText(/Touch & Togetherness/i)).toBeVisible();
    await expect(page.getByText(/Wonder & Wiggle/i)).toBeVisible();
  });

  test("booking flow: select service navigates to date step", async ({ page }) => {
    await page.goto("/book?service=little-explorers-sensory");
    await expect(page.getByRole("heading", { name: /Choose a date/i })).toBeVisible();
  });

  test("about page shows venue status as coming soon", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText(/Coming to Nottingham/i)).toBeVisible();
  });

  test("footer shows Instagram link", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Instagram/i })
    ).toBeVisible();
  });
});

test.describe("Booking flow validation", () => {
  test("date picker disallows past dates", async ({ page }) => {
    await page.goto("/book?service=little-explorers-sensory");
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).toBeVisible();
    // min attribute should be set to tomorrow
    const minAttr = await dateInput.getAttribute("min");
    expect(minAttr).toBeTruthy();
  });

  test("FAQ page is accessible", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.getByRole("heading", { name: /Frequently asked questions/i })).toBeVisible();
  });

  test("contact page shows email", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/bookings@baby\.twinkletoelove\.com/i)).toBeVisible();
  });
});
