import { expect, test } from "@playwright/test";
import { login } from "./helpers";

test("messages card opens the messages page", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: /پیام ها/ }).click();
  await expect(page).toHaveURL(/\/messages/);
  await expect(page.getByRole("heading", { name: "پیام‌ها", level: 1 })).toBeVisible();
});

test("filters selected on the dashboard are carried to the messages page", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "۷ روز اخیر" }).click();
  await page.getByRole("link", { name: /پیام ها/ }).click();
  await expect(page).toHaveURL(/\/messages\?period=7d/);
  await expect(page.getByRole("button", { name: "۷ روز اخیر" })).toHaveAttribute("aria-pressed", "true");
});

test("delete-all asks for confirmation and empties the conversation", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: /پیام ها/ }).click();
  await page.getByRole("button", { name: "حذف همه پیام‌ها" }).click();
  await page.getByRole("button", { name: "حذف همه", exact: true }).click();
  await expect(page.getByText("پیامی وجود ندارد.")).toBeVisible();
});

test("support actions: view-all page opens and new action is added to the list", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: /پیام ها/ }).click();
  await page.getByRole("button", { name: "ثبت اقدام جدید" }).click();
  await page.getByLabel("توضیحات :").fill("پیگیری تست خودکار");
  await page.getByRole("button", { name: "ثبت اقدام", exact: true }).click();
  await expect(page.getByText("پیگیری تست خودکار")).toBeVisible();
  await page.getByRole("link", { name: "مشاهده همه" }).click();
  await expect(page).toHaveURL(/\/messages\/support-actions/);
});
