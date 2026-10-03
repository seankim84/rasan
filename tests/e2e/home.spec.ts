import { expect, test } from "@playwright/test";

test("home supports locale content and URL-backed filters", async ({ page }) => {
  await page.goto("/vi");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Chọn trận");
  await expect(page.getByText("Sân bóng Thảo Điền")).toBeVisible();

  await page.getByRole("button", { name: "Buổi tối" }).click();
  await expect(page).toHaveURL(/time=evening/);
  await page.getByLabel("Khu vực").selectOption("phu-nhuan");
  await expect(page).toHaveURL(/district=phu-nhuan/);
});

test("mobile home has no horizontal document overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ko");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("경기를 고르고");
  const overflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflows).toBe(false);
});
