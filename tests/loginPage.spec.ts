import test, { expect } from "@playwright/test";

test.describe("Testing Jam-Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://jam.up.railway.app/register");
  });
  test("Should render register page", async ({ page }) => {
    const title = page.locator("h2", { hasText: "Register" });
    await expect(title).toBeVisible();
    const username = page.getByLabel("username");
    await username.fill("monica_001");
  });
});
