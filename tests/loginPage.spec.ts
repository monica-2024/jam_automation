import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Testing Jam-Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://jam.up.railway.app/register");
  });
  test("Should render register page", async ({ page }) => {
    //Pre-condition, we're on the register page, inspect register element
    const title = page.locator("h2", { hasText: "Register" });
    //Register title page should be visible
    await expect(title).toBeVisible();
    //Inspect Username element
    const username = page.getByLabel("Username");
    //
    const usernameValue = faker.internet.username();
    //Fill in random username
    await username.fill(usernameValue);
    //Inspect email element
    const email = page.getByLabel("Email");
    const emailValue = faker.internet.email();
    //Fill in any email address
    await email.fill(emailValue);
    //Inspect password element
    const password = page.getByLabel("Password");
    //Fill in any password
    await password.fill("password123");
    //Register button
    const registerButton = page.getByRole("button", { name: "Register" });
    await expect(registerButton).toBeVisible();
    await registerButton.click();
    const loginPage = page.locator("h2", { hasText: "Login to Your Account" });
    await expect(loginPage).toBeVisible();

    //can't re-register
  });
  test("Should give an error message with invalid email", async ({ page }) => {
    const title = page.locator("h2", { hasText: "Register" });
    await expect(title).toBeVisible();
    const username = page.getByLabel("Username");
    await username.fill("monica1");
    const email = page.getByLabel("Email");
    await email.fill("monica");
    const password = page.getByLabel("Password");
    await password.fill("password123");
    const registerButton = page.getByRole("button", { name: "Register" });
    await expect(registerButton).toBeVisible();
    await registerButton.click();
    const errorMsg = page.getByText("Failed to register. Please try again.");
    await expect(errorMsg).toBeVisible();
  });
});
