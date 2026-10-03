import { describe, expect, it } from "vitest";
import { addDays, dateKeyToDate, getVietnamDateKey } from "@/lib/datetime/vietnam";

describe("Vietnam calendar helpers", () => {
  it.each([
    ["2026-01-31", 1, "2026-02-01"],
    ["2026-12-31", 1, "2027-01-01"],
    ["2028-02-28", 1, "2028-02-29"],
    ["2028-02-29", 1, "2028-03-01"],
  ])("adds days across calendar boundaries", (start, amount, expected) => {
    expect(addDays(start, amount)).toBe(expected);
  });

  it("uses the Vietnam date when UTC is still on the previous day", () => {
    expect(getVietnamDateKey(new Date("2026-10-02T18:30:00Z"))).toBe("2026-10-03");
  });

  it("creates a stable date away from UTC midnight", () => {
    expect(dateKeyToDate("2026-10-03").toISOString()).toBe("2026-10-03T05:00:00.000Z");
  });
});
