import {test, expect} from "@playwright/test";

test.describe("Login Flow", () => {
  test("should display login form elements", async ({page}) => {
    await page.goto("/login");

    // Check for email input
    const emailInput = page.getByPlaceholder("Email");
    await expect(emailInput).toBeVisible();

    // Check for password input
    const passwordInput = page.getByPlaceholder("Password");
    await expect(passwordInput).toBeVisible();

    // Check for login button
    const loginButton = page.getByRole("button", {name: "🦖 Log In"});
    await expect(loginButton).toBeVisible();

    // Fill in dummy credentials
    await emailInput.fill("test@example.com");
    await passwordInput.fill("password123");

    // Click the login button (no assertion for redirect yet as auth is not implemented)
    await loginButton.click();

    // You might add a soft assertion here if there's a loading state or a temporary message
    // For now, just ensure the click doesn't throw an immediate error
  });

  test("should navigate to register page from login", async ({page}) => {
    await page.goto("/login");
    const registerLink = page.getByRole("link", {name: "Sign up →"});
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await expect(page).toHaveURL(/.*\/register/);
  });

  test("should navigate to reset password page from login", async ({page}) => {
    await page.goto("/login");
    const forgotPasswordLink = page.getByRole("link", {name: "Forgot your password?"});
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();
    await expect(page).toHaveURL(/.*\/reset-password/);
  });
});
