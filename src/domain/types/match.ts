export type MatchStatus = "open" | "full" | "closed" | "cancelled";
export type MatchFormat = "5v5" | "6v6";

export interface Match {
  id: string;
  venueName: string;
  district: string;
  districtSlug: string;
  startsAt: string;
  durationMinutes: number;
  format: MatchFormat;
  feeVnd: number;
  spotsLeft: number;
  status: MatchStatus;
  onsitePayment: boolean;
  facilities: string[];
  surface: "indoor" | "outdoor";
}
