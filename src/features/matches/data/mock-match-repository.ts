import type { Match, MatchFormat } from "@/domain/types/match";
import { addDays } from "@/lib/datetime/vietnam";
import type { MatchRepository } from "./match-repository";

const venues = [
  {
    venueName: "Sân bóng Thảo Điền",
    district: "Quận 2",
    districtSlug: "quan-2",
    time: "19:00:00",
    format: "5v5" as MatchFormat,
    feeVnd: 120_000,
    spotsLeft: 2,
    onsitePayment: false,
    facilities: ["indoor", "parking"],
  },
  {
    venueName: "Sân bóng Bình Thạnh",
    district: "Bình Thạnh",
    districtSlug: "binh-thanh",
    time: "20:30:00",
    format: "6v6" as MatchFormat,
    feeVnd: 100_000,
    spotsLeft: 4,
    onsitePayment: true,
    facilities: ["parking", "showers"],
  },
  {
    venueName: "Sân bóng Phú Nhuận",
    district: "Phú Nhuận",
    districtSlug: "phu-nhuan",
    time: "21:00:00",
    format: "5v5" as MatchFormat,
    feeVnd: 110_000,
    spotsLeft: 5,
    onsitePayment: false,
    facilities: ["outdoor", "drinks"],
  },
];

export class MockMatchRepository implements MatchRepository {
  async listUpcoming(startDate: string, days: number): Promise<Match[]> {
    return Array.from({ length: days }, (_, dayIndex) => {
      const dateKey = addDays(startDate, dayIndex);
      return venues.map((venue, venueIndex): Match => {
        const isFull = dayIndex % 6 === 4 && venueIndex === 1;
        const isClosed = dayIndex % 9 === 7 && venueIndex === 2;
        return {
          id: `mock-${dateKey}-${venueIndex + 1}`,
          venueName: venue.venueName,
          district: venue.district,
          districtSlug: venue.districtSlug,
          startsAt: `${dateKey}T${venue.time}+07:00`,
          durationMinutes: 90,
          format: venue.format,
          feeVnd: venue.feeVnd + (dayIndex % 3) * 10_000,
          spotsLeft: isFull ? 0 : Math.max(1, venue.spotsLeft - (dayIndex % 3)),
          status: isFull ? "full" : isClosed ? "closed" : "open",
          onsitePayment: venue.onsitePayment,
          facilities: venue.facilities,
          surface: venueIndex === 2 ? "outdoor" : "indoor",
        };
      });
    }).flat();
  }
}
