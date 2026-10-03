import { describe, expect, it } from "vitest";
import { MockMatchRepository } from "@/features/matches/data/mock-match-repository";

describe("MockMatchRepository", () => {
  it("returns three deterministic matches for each requested day", async () => {
    const repository = new MockMatchRepository();
    const first = await repository.listUpcoming("2026-10-03", 14);
    const second = await repository.listUpcoming("2026-10-03", 14);

    expect(first).toHaveLength(42);
    expect(second).toEqual(first);
    expect(new Set(first.map((match) => match.id)).size).toBe(42);
  });

  it("keeps fees, capacity, times, and identifiers valid", async () => {
    const matches = await new MockMatchRepository().listUpcoming("2026-10-03", 14);

    matches.forEach((match) => {
      expect(match.feeVnd).toBeGreaterThanOrEqual(100_000);
      expect(Number.isInteger(match.feeVnd)).toBe(true);
      expect(match.spotsLeft).toBeGreaterThanOrEqual(0);
      expect(match.startsAt).toMatch(/^2026-10-\d{2}T\d{2}:\d{2}:\d{2}\+07:00$/);
      expect(match.id).toMatch(/^mock-\d{4}-\d{2}-\d{2}-\d$/);
    });
  });
});
