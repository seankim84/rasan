import { describe, expect, it } from "vitest";
import { formatMatchDate, formatTime, formatVnd } from "@/lib/i18n/format";

describe("locale formatters", () => {
  it.each([
    ["vi" as const, "120.000 ₫"],
    ["ko" as const, "₫120,000"],
    ["en" as const, "₫120,000"],
  ])("formats VND for %s", (locale, expected) => {
    expect(formatVnd(120_000, locale)).toBe(expected);
  });

  it("displays UTC timestamps in Vietnam time", () => {
    expect(formatTime("2026-10-03T12:00:00Z", "vi")).toBe("19:00");
  });

  it.each(["vi", "ko", "en"] as const)("formats a full date for %s", (locale) => {
    expect(formatMatchDate(new Date("2026-10-03T12:00:00+07:00"), locale)).not.toHaveLength(0);
  });
});
