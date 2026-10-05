import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Browser, type Page } from "@playwright/test";

const localeExpectations = {
  vi: { heading: "Chọn trận. Giữ chỗ. Ra sân.", list: "Trận sắp diễn ra", title: /Hồ Chí Minh/ },
  ko: { heading: "경기를 고르고, 예약하고, 뛰러 가세요.", list: "다가오는 경기", title: /호찌민/ },
  en: { heading: "Pick a match. Save your spot. Play.", list: "Upcoming matches", title: /Ho Chi Minh City/ },
} as const;

async function expectNoDocumentOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function newLocaleContext(browser: Browser, locale: string) {
  return browser.newContext({
    viewport: { width: 390, height: 844 },
    locale,
    extraHTTPHeaders: { "Accept-Language": locale },
  });
}

test.describe("locale routing and persistence", () => {
  test("detects Vietnamese, Korean, English, and unsupported browser languages", async ({ browser }) => {
    for (const [locale, expected] of [
      ["vi-VN", "/vi"],
      ["ko-KR", "/ko"],
      ["en-US", "/en"],
      ["fr-FR", "/vi"],
    ] as const) {
      const context = await newLocaleContext(browser, locale);
      const page = await context.newPage();
      await page.goto("/");
      await expect(page).toHaveURL(new RegExp(`${expected}$`));
      await context.close();
    }
  });

  test("a valid locale cookie overrides the browser language", async ({ browser }) => {
    const context = await newLocaleContext(browser, "vi-VN");
    await context.addCookies([{ name: "rasan-locale", value: "ko", domain: "127.0.0.1", path: "/" }]);
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko$/);
    await context.close();
  });

  test("an invalid locale cookie falls back safely", async ({ browser }) => {
    const context = await newLocaleContext(browser, "en-US");
    await context.addCookies([{ name: "rasan-locale", value: "invalid", domain: "127.0.0.1", path: "/" }]);
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await context.close();
  });

  for (const [locale, content] of Object.entries(localeExpectations)) {
    test(`${locale} renders complete localized shell and metadata`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.heading);
      await expect(page.getByRole("heading", { level: 2 })).toHaveText(content.list);
      await expect(page).toHaveTitle(content.title);
      await expect(page.locator("body")).not.toContainText(/undefined|matches\.[A-Za-z]|common\.[A-Za-z]/);
    });
  }

  test("language switch preserves query state and persists a safe cookie", async ({ page, context }) => {
    await page.goto("/vi?district=phu-nhuan&time=evening");
    await page.getByLabel("Language").selectOption("ko");
    await expect(page).toHaveURL(/\/ko\?district=phu-nhuan&time=evening/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("경기를 고르고");
    const cookie = (await context.cookies()).find((item) => item.name === "rasan-locale");
    expect(cookie?.value).toBe("ko");
    expect(cookie?.sameSite).toBe("Lax");
    await page.reload();
    await expect(page).toHaveURL(/\/ko\?district=phu-nhuan&time=evening/);
  });
});

test.describe("date and filter behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/vi");
  });

  test("date strip has 14 dates and persists a valid selection", async ({ page }) => {
    const dateStrip = page.getByRole("listbox", { name: "Date" });
    const dates = dateStrip.getByRole("option");
    await expect(dates).toHaveCount(14);
    await expect(dates.first()).toHaveAttribute("aria-selected", "true");
    await dates.nth(5).click();
    await expect(dates.nth(5)).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/date=\d{4}-\d{2}-\d{2}/);
    const selectedUrl = page.url();
    await page.reload();
    expect(page.url()).toBe(selectedUrl);
    await expect(dates.nth(5)).toHaveAttribute("aria-selected", "true");
  });

  test("invalid and out-of-range dates fall back without crashing", async ({ page }) => {
    for (const value of ["not-a-date", "1999-01-01", "9999-99-99"]) {
      await page.goto(`/vi?date=${value}`);
      await expect(page.getByRole("listbox", { name: "Date" }).getByRole("option").first()).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("district filter updates URL and visible cards", async ({ page }) => {
    await page.getByLabel("Khu vực").selectOption("binh-thanh");
    await expect(page).toHaveURL(/district=binh-thanh/);
    await expect(page.getByText("Sân bóng Bình Thạnh", { exact: true })).toBeVisible();
    await expect(page.getByText("Sân bóng Thảo Điền", { exact: true })).toHaveCount(0);
  });

  test("availability filter removes full matches on a known full day", async ({ page }) => {
    const dates = page.getByRole("listbox", { name: "Date" }).getByRole("option");
    await dates.nth(4).click();
    await expect(page).toHaveURL(/date=/);
    await expect(page.getByRole("link", { name: /Bình Thạnh/ })).toContainText("Hết chỗ", { timeout: 10_000 });
    await page.getByRole("button", { name: "Còn chỗ" }).click();
    await expect(page).toHaveURL(/available=true/);
    await expect(page.getByText("Hết chỗ", { exact: true })).toHaveCount(0);
  });

  test("format filter opens, filters, toggles off, and exposes state", async ({ page }) => {
    const filtersButton = page.getByRole("button", { name: "Bộ lọc" });
    await filtersButton.click();
    await expect(filtersButton).toHaveAttribute("aria-expanded", "true");
    const format = page.getByRole("button", { name: "6v6" });
    await format.click();
    await expect(format).toHaveAttribute("aria-pressed", "true");
    await expect(page).toHaveURL(/format=6v6/);
    await expect(page.getByText("Sân bóng Bình Thạnh", { exact: true })).toBeVisible();
    await format.click();
    await expect(page).not.toHaveURL(/format=6v6/);
  });

  test("combined filters use logical AND and empty reset recovers", async ({ page }) => {
    await page.getByLabel("Khu vực").selectOption("phu-nhuan");
    await page.getByRole("button", { name: "Buổi tối" }).click();
    await page.getByRole("button", { name: "Còn chỗ" }).click();
    await page.getByRole("button", { name: "Bộ lọc", exact: true }).click();
    await page.getByRole("button", { name: "6v6" }).click();
    await expect(page.getByText("Không có trận phù hợp")).toBeVisible();
    await page.getByRole("button", { name: "Xóa bộ lọc" }).last().click();
    await expect(page.getByText("Sân bóng Thảo Điền", { exact: true })).toBeVisible();
    await expect(page).not.toHaveURL(/district|time|available|format/);
  });

  test("keyboard activates dates and quick filters", async ({ page }) => {
    const secondDate = page.getByRole("listbox", { name: "Date" }).getByRole("option").nth(1);
    await secondDate.focus();
    await page.keyboard.press("Enter");
    await expect(secondDate).toHaveAttribute("aria-selected", "true");
    const evening = page.getByRole("button", { name: "Buổi tối" });
    await evening.focus();
    await page.keyboard.press("Space");
    await expect(evening).toHaveAttribute("aria-pressed", "true");
  });

  test("filter navigation replaces history and survives reload", async ({ page }) => {
    await page.getByRole("button", { name: "Buổi tối" }).click();
    await expect(page).toHaveURL(/time=evening/);
    await page.getByLabel("Khu vực").selectOption("quan-2");
    await expect(page).toHaveURL(/district=quan-2/);
    const filteredUrl = page.url();
    await page.reload();
    expect(page.url()).toBe(filteredUrl);
    await expect(page.getByRole("button", { name: "Buổi tối" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByLabel("Khu vực")).toHaveValue("quan-2");
  });
});

test.describe("match cards and states", () => {
  test("card exposes all scannable facts and localized link", async ({ page }) => {
    await page.goto("/vi");
    const card = page.getByRole("link", { name: /Sân bóng Thảo Điền/ });
    await expect(card).toContainText("19:00");
    await expect(card).toContainText("90 phút");
    await expect(card).toContainText("Quận 2");
    await expect(card).toContainText("5v5");
    await expect(card).toContainText(/120\.000/);
    await expect(card).toHaveAttribute("href", /\/vi\/matches\/mock-/);
  });

  test("onsite, almost-full, full, and closed text states are present in deterministic data", async ({ page }) => {
    await page.goto("/vi");
    await expect(page.getByRole("link", { name: /Bình Thạnh/ })).toContainText("Thanh toán tại sân");
    await expect(page.getByText("Sắp đầy", { exact: true })).toBeVisible();
    const dates = page.getByRole("listbox", { name: "Date" }).getByRole("option");
    await dates.nth(4).click();
    await expect(page).toHaveURL(/date=/);
    await expect(page.getByRole("link", { name: /Bình Thạnh/ })).toContainText("Hết chỗ", { timeout: 10_000 });
    await dates.nth(7).click();
    await expect(page.getByRole("link", { name: /Phú Nhuận/ })).toBeVisible();
  });

  test("closed matches are not advertised as available", async ({ page }) => {
    await page.goto("/vi");
    const dates = page.getByRole("listbox", { name: "Date" }).getByRole("option");
    await dates.nth(7).click();
    await expect(page).toHaveURL(/date=/);
    const closedCard = page.getByRole("link", { name: /Phú Nhuận/ });
    await expect(closedCard).toContainText("Đã đóng", { timeout: 10_000 });
    await expect(closedCard).not.toContainText(/Còn \d+ chỗ/);
  });

  test("match detail target is a documented Phase 1 404", async ({ page }) => {
    const response = await page.goto("/vi/matches/mock-2026-10-03-1");
    expect(response?.status()).toBe(404);
  });
});

test.describe("responsive and visual structure", () => {
  const viewports = [
    { name: "small-mobile", width: 320, height: 568 },
    { name: "mobile", width: 390, height: 844 },
    { name: "large-mobile", width: 430, height: 932 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "tablet-landscape", width: 1024, height: 768 },
    { name: "desktop-min", width: 1200, height: 800 },
    { name: "desktop", width: 1440, height: 900 },
    { name: "desktop-wide", width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`${viewport.name} has no document overflow and correct navigation`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/vi");
      await expectNoDocumentOverflow(page);
      const mobileNav = page.getByRole("navigation", { name: "Mobile" });
      if (viewport.width < 768) await expect(mobileNav).toBeVisible();
      else await expect(mobileNav).toBeHidden();
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("Sân bóng Thảo Điền", { exact: true })).toBeVisible();
    });
  }

  test("fixed mobile navigation does not cover the final card", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/vi");
    await page.locator("a[href*='/matches/']").last().scrollIntoViewIfNeeded();
    const card = await page.locator("a[href*='/matches/']").last().boundingBox();
    const nav = await page.getByRole("navigation", { name: "Mobile" }).boundingBox();
    expect(card).not.toBeNull();
    expect(nav).not.toBeNull();
    expect(card!.y + card!.height).toBeLessThanOrEqual(nav!.y + 1);
  });

  test("reduced motion preference is respected by the global stylesheet", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/vi");
    const duration = await page.getByRole("heading", { level: 1 }).evaluate((element) =>
      getComputedStyle(element).transitionDuration,
    );
    expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
  });
});

test.describe("accessibility and SEO", () => {
  for (const locale of ["vi", "ko", "en"] as const) {
    test(`${locale} has no serious or critical axe violations`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const results = await new AxeBuilder({ page }).analyze();
      const severe = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
      expect(severe, JSON.stringify(severe, null, 2)).toEqual([]);
    });
  }

  test("semantic landmarks, heading order, and control labels are present", async ({ page }) => {
    await page.goto("/vi");
    await expect(page.locator("header")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(1);
    await expect(page.getByLabel("Language")).toBeVisible();
    await expect(page.getByLabel("Khu vực")).toBeVisible();
  });

  test("robots and sitemap expose valid locale discovery", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain("Sitemap:");
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    for (const locale of ["vi", "ko", "en"]) expect(xml).toContain(`/${locale}`);
  });

  test("localized canonical and alternate links are emitted", async ({ page }) => {
    await page.goto("/ko");
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/ko$/);
    for (const locale of ["vi", "ko", "en"]) {
      await expect(page.locator(`link[rel='alternate'][hreflang='${locale}']`)).toHaveAttribute("href", new RegExp(`/${locale}$`));
    }
  });
});

test("home emits no page errors or console errors during core interaction", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/vi");
  await page.getByRole("button", { name: "Buổi tối" }).click();
  await page.getByLabel("Khu vực").selectOption("phu-nhuan");
  await page.getByLabel("Language").selectOption("en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Pick a match");
  expect(errors).toEqual([]);
});

test.describe("query-string security and resilience", () => {
  test("script-like filter values never execute", async ({ page }) => {
    const payload = `<img src=x onerror="globalThis.__rasanXss=true">`;
    const query = new URLSearchParams({
      date: payload,
      district: payload,
      time: payload,
      available: payload,
      format: payload,
    });
    await page.goto(`/vi?${query.toString()}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => (globalThis as typeof globalThis & { __rasanXss?: boolean }).__rasanXss)).toBeUndefined();
    await expect(page.locator("img[src='x']")).toHaveCount(0);
  });

  test("long, duplicate, and malformed query values return a controlled response", async ({ request }) => {
    const longValue = "a".repeat(8_000);
    for (const path of [
      `/vi?district=${longValue}`,
      "/vi?district=quan-2&district=phu-nhuan&format=5v5&format=6v6",
      "/vi?district=%E0%A4%A&date=%ZZ",
    ]) {
      const response = await request.get(path);
      expect(response.status()).toBeLessThan(500);
    }
  });
});
