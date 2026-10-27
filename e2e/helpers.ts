import { expect, type Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("نام کاربری").fill("admin");
  await page.getByLabel("رمز عبور").fill("admin12345");
  await page.getByRole("button", { name: "ورود" }).click();
  await expect(page).toHaveURL(/\/$/);
}
