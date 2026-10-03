import type { Match } from "@/domain/types/match";

export interface MatchRepository {
  listUpcoming(startDate: string, days: number): Promise<Match[]>;
}
