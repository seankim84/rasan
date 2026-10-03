"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Match, MatchFormat } from "@/domain/types/match";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { DateStrip } from "./date-strip";
import { Hero } from "./hero";
import { MatchList } from "./match-list";
import { QuickFilters, type MatchFilters } from "./quick-filters";

export function HomeExperience({
  locale,
  messages,
  dates,
  matches,
}: {
  locale: Locale;
  messages: Messages;
  dates: string[];
  matches: Match[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedDate = searchParams.get("date");
  const selectedDate = requestedDate && dates.includes(requestedDate) ? requestedDate : dates[0];
  const filters: MatchFilters = {
    district: searchParams.get("district") ?? "",
    evening: searchParams.get("time") === "evening",
    available: searchParams.get("available") === "true",
    format: (["5v5", "6v6"] as const).includes(searchParams.get("format") as MatchFormat)
      ? (searchParams.get("format") as MatchFormat)
      : "",
  };

  function replaceParams(changes: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    const query = next.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }

  function changeFilter(key: keyof MatchFilters, value: MatchFilters[keyof MatchFilters]) {
    const paramByFilter: Record<keyof MatchFilters, string> = {
      district: "district",
      evening: "time",
      available: "available",
      format: "format",
    };
    const serialized = typeof value === "boolean" ? (value ? (key === "evening" ? "evening" : "true") : null) : value || null;
    replaceParams({ [paramByFilter[key]]: serialized });
  }

  function resetFilters() {
    replaceParams({ district: null, time: null, available: null, format: null });
  }

  const visibleMatches = useMemo(
    () =>
      matches
        .filter((match) => match.startsAt.slice(0, 10) === selectedDate)
        .filter((match) => !filters.district || match.districtSlug === filters.district)
        .filter((match) => !filters.evening || Number(match.startsAt.slice(11, 13)) >= 18)
        .filter((match) => !filters.available || (match.status === "open" && match.spotsLeft > 0))
        .filter((match) => !filters.format || match.format === filters.format)
        .sort((left, right) => left.startsAt.localeCompare(right.startsAt)),
    [filters.available, filters.district, filters.evening, filters.format, matches, selectedDate],
  );

  return (
    <>
      <SiteHeader locale={locale} messages={messages} />
      <main className="mx-auto max-w-[1180px] px-4 pb-28 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        <Hero messages={messages} />

        <section id="matches" className="scroll-mt-24 pt-8 sm:pt-11">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[23px] font-black tracking-[-0.035em] text-[#101817] sm:text-[28px]">{messages.matches.listTitle}</h2>
              <p className="mt-1 text-sm text-[#606964]">{messages.matches.listDescription}</p>
            </div>
            <div className="rounded-full bg-[#FFF0EB] px-3 py-1.5 text-xs font-extrabold text-[#B9361C]">
              {visibleMatches.length} {messages.common.explore.toLowerCase()}
            </div>
          </div>

          <DateStrip
            dates={dates}
            selectedDate={selectedDate}
            locale={locale}
            messages={messages}
            onSelect={(date) => replaceParams({ date })}
          />

          <div className="mt-3">
            <QuickFilters filters={filters} messages={messages} onChange={changeFilter} onReset={resetFilters} />
          </div>

          <div className="mt-5 max-w-4xl">
            <MatchList matches={visibleMatches} locale={locale} messages={messages} onReset={resetFilters} />
          </div>
        </section>
      </main>
      <MobileBottomNav locale={locale} messages={messages} />
    </>
  );
}
