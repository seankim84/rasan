import { Banknote, Clock3, MapPin, UsersRound } from "lucide-react";
import Link from "next/link";
import type { Match } from "@/domain/types/match";
import type { Locale } from "@/lib/i18n/config";
import { formatTime, formatVnd } from "@/lib/i18n/format";
import { interpolate, type Messages } from "@/lib/i18n/messages";

const facilityLabels: Record<Locale, Record<string, string>> = {
  vi: { indoor: "Trong nhà", outdoor: "Ngoài trời", parking: "Có chỗ đậu xe", showers: "Phòng tắm", drinks: "Nước uống" },
  ko: { indoor: "실내", outdoor: "야외", parking: "주차 가능", showers: "샤워실", drinks: "음료" },
  en: { indoor: "Indoor", outdoor: "Outdoor", parking: "Parking", showers: "Showers", drinks: "Drinks" },
};

function availabilityLabel(match: Match, messages: Messages): string {
  if (match.status === "full" || match.spotsLeft === 0) return messages.matches.full;
  if (match.spotsLeft <= 2) return messages.matches.almostFull;
  return interpolate(messages.matches.spotsLeft, { count: match.spotsLeft });
}

export function MatchCard({ match, locale, messages }: { match: Match; locale: Locale; messages: Messages }) {
  const unavailable = match.status === "full" || match.status === "closed";
  return (
    <Link
      href={`/${locale}/matches/${match.id}`}
      aria-label={interpolate(messages.matches.viewMatch, { venue: match.venueName })}
      className="group grid grid-cols-[92px_1fr] gap-4 rounded-2xl border border-[#DEE3DF] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#FFB39F] hover:shadow-[0_12px_34px_rgba(16,24,23,0.07)] sm:grid-cols-[128px_1fr_auto] sm:items-center sm:p-4"
    >
      <div className="court-grid relative h-[112px] overflow-hidden rounded-xl bg-[#18211F] sm:h-[126px]" aria-hidden="true">
        <div className="absolute inset-x-2 top-2 flex justify-between">
          <span className="rounded-full bg-white/92 px-2 py-1 text-[10px] font-black text-[#18211F]">{match.format}</span>
          <span className="size-2.5 rounded-full bg-[#FF5A36] shadow-[0_0_0_4px_rgba(255,90,54,.16)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/18" />
        <div className="absolute inset-y-0 left-1/2 border-l border-white/15" />
      </div>

      <div className="min-w-0 py-1">
        <div className={`mb-1.5 inline-flex items-center gap-1.5 text-xs font-extrabold ${unavailable ? "text-[#606964]" : match.spotsLeft <= 2 ? "text-[#D94242]" : "text-[#168A55]"}`}>
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {availabilityLabel(match, messages)}
          {match.onsitePayment ? <span className="hidden text-[#606964] sm:inline">· {messages.matches.onsite}</span> : null}
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-black tracking-[-0.03em] text-[#101817]">{formatTime(match.startsAt, locale)}</p>
          <span className="text-xs font-semibold text-[#606964]">{interpolate(messages.matches.duration, { minutes: match.durationMinutes })}</span>
        </div>
        <h3 className="mt-1 truncate text-sm font-extrabold text-[#18211F] sm:text-base">{match.venueName}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-[#606964]">
          <MapPin aria-hidden="true" size={13} />
          {match.district}
        </div>
        <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {match.facilities.slice(0, 2).map((facility) => (
            <span key={facility} className="rounded-full bg-[#F5F6F2] px-2.5 py-1 text-[11px] font-semibold text-[#606964]">
              {facilityLabels[locale][facility] ?? facility}
            </span>
          ))}
        </div>
      </div>

      <div className="col-start-2 flex items-end justify-between border-t border-[#EEF0ED] pt-3 sm:col-start-auto sm:flex-col sm:items-end sm:border-0 sm:pl-5 sm:pt-0">
        <div className="flex items-center gap-1.5 text-[#606964] sm:hidden">
          {match.onsitePayment ? <Banknote aria-hidden="true" size={15} /> : <UsersRound aria-hidden="true" size={15} />}
          <span className="text-[11px] font-semibold">{match.onsitePayment ? messages.matches.onsite : match.format}</span>
        </div>
        <div className="text-right">
          <p className="text-base font-black tracking-[-0.03em] text-[#101817] sm:text-lg">{formatVnd(match.feeVnd, locale)}</p>
          <p className="text-[10px] text-[#606964] sm:text-xs">{messages.matches.pricePerPerson}</p>
        </div>
        <div className="mt-5 hidden size-10 items-center justify-center rounded-full bg-[#FFF0EB] text-[#E74827] transition group-hover:bg-[#FF5A36] group-hover:text-[#101817] sm:flex">
          <Clock3 aria-hidden="true" size={18} />
        </div>
      </div>
    </Link>
  );
}
