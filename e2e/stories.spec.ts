import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test("stories card opens the details page and selecting a booth updates the panel", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: /استوری و هایلایت/ }).click();
  await expect(page).toHaveURL(/\/details\/stories/);
  await expect(page.getByRole("heading", { name: "استوری و هایلایت", level: 1 })).toBeVisible();

  await page.getByRole("button", { name: /خانه و زندگی/ }).click();
  await expect(page.getByRole("heading", { name: "خانه و زندگی", level: 2 })).toBeVisible();
});

test("unknown detail pages show the not-found page", async ({ page }) => {
  await login(page);
  await page.goto("/details/does-not-exist");
  await expect(page.getByRole("heading", { name: "صفحه‌ی مورد نظر پیدا نشد" })).toBeVisible();
});
