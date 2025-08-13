import {test, expect} from "@playwright/test";

test("has title", async ({page}) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hulkastorus/);
});

test("request invite button", async ({page}) => {
  await page.goto("/");
  const requestInviteButton = page.getByText("Request an Invite");
  await expect(requestInviteButton).toBeVisible();
});
