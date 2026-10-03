import { describe, expect, it } from "vitest";
import { getMatchCtaState } from "@/domain/transitions/match-cta";

describe("match CTA state", () => {
  it("allows an open match with capacity", () => {
    expect(getMatchCtaState("open", 2)).toBe("book");
  });

  it("treats zero remaining spots as full", () => {
    expect(getMatchCtaState("open", 0)).toBe("full");
  });

  it.each(["full", "closed", "cancelled"] as const)("maps %s explicitly", (status) => {
    expect(getMatchCtaState(status, 4)).toBe(status);
  });
});
