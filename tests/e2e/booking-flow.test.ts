import { test, expect } from "@playwright/test";

test.describe("Full booking flow (test mode)", () => {
  test("can complete booking flow up to Stripe checkout", async ({ page }) => {
    // Start booking flow
    await page.goto("/book?service=little-explorers-sensory");

    // Step 2: Select a date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split("T")[0];
    await page.fill('input[type="date"]', dateString);
    await page.click("button:has-text('Continue')");

    // Step 3: Should show slot selection
    await expect(page.getByRole("heading", { name: /Choose a time/i })).toBeVisible();
    
    // Wait for slots to load
    await page.waitForTimeout(2000);

    // Click on first available slot
    const firstSlot = page.locator('button:has-text("spaces")').first();
    if ((await firstSlot.count()) > 0) {
      await firstSlot.click();

      // Step 4: Details page
      await expect(page.getByRole("heading", { name: /Your details/i })).toBeVisible();
      await page.fill('input[placeholder="e.g. Sarah Johnson"]', "Test Parent");
      await page.fill('input[placeholder="e.g. sarah@example.com"]', "test@example.com");
      await page.click("button:has-text('Continue to payment')");

      // Step 5: Review page
      await expect(page.getByRole("heading", { name: /Review & pay/i })).toBeVisible();
      
      // Click Stripe checkout
      await page.click("button:has-text('Pay securely with Stripe')");

      // Should redirect to Stripe checkout
      await page.waitForURL(/checkout\.stripe\.com/, { timeout: 10000 });
      await expect(page).toHaveURL(/checkout\.stripe\.com/);
    }
  });

  test("full slot shows as unavailable", async ({ page }) => {
    await page.goto("/book?service=little-explorers-sensory");
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split("T")[0];
    await page.fill('input[type="date"]', dateString);
    await page.click("button:has-text('Continue')");
    
    await page.waitForTimeout(2000);
    
    // Check that full slots are disabled
    const fullSlots = page.locator('button:has-text("Full")');
    if ((await fullSlots.count()) > 0) {
      await expect(fullSlots.first()).toBeDisabled();
    }
  });
});
