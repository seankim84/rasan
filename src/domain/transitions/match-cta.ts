import type { MatchStatus } from "@/domain/types/match";

export type MatchCtaState = "book" | "full" | "closed" | "cancelled";

export function getMatchCtaState(status: MatchStatus, spotsLeft: number): MatchCtaState {
  if (status === "cancelled") return "cancelled";
  if (status === "closed") return "closed";
  if (status === "full" || spotsLeft <= 0) return "full";
  return "book";
}
