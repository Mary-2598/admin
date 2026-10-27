import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test("anonymous users are redirected to the login page", async ({ page }) => {
  for (const path of ["/", "/messages", "/details/stories"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login$/);
  }
});

test("wrong credentials show an error and stay on the login page", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("نام کاربری").fill("admin");
  await page.getByLabel("رمز عبور").fill("wrong-password");
  await page.getByRole("button", { name: "ورود" }).click();
  await expect(page.getByRole("alert")).toContainText("اشتباه");
  await expect(page).toHaveURL(/\/login$/);
});

test("logout returns to the login page", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "خروج از حساب کاربری" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
