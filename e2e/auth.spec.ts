import { expect, test } from "@playwright/test";

test("unauthenticated visitors are sent to the login page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
});

test("login form shows validation errors", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "ورود" }).click();
  await expect(page.getByText("نام کاربری باید حداقل ۳ کاراکتر باشد")).toBeVisible();
});

test("valid login shows the dashboard cards", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("نام کاربری").fill("admin");
  await page.getByLabel("رمز عبور").fill("admin12345");
  await page.getByRole("button", { name: "ورود" }).click();
  await expect(page.getByRole("heading", { name: "محصولات" })).toBeVisible();
});
