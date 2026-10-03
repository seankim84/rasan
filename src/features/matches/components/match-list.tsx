import { RotateCcw, SearchX } from "lucide-react";
import type { Match } from "@/domain/types/match";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { MatchCard } from "./match-card";

export function MatchList({
  matches,
  locale,
  messages,
  onReset,
}: {
  matches: Match[];
  locale: Locale;
  messages: Messages;
  onReset: () => void;
}) {
  if (matches.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[#C8CECA] bg-white/60 px-6 text-center">
        <div className="flex size-13 items-center justify-center rounded-full bg-[#FFF0EB] text-[#E74827]">
          <SearchX aria-hidden="true" size={24} />
        </div>
        <h3 className="mt-4 text-lg font-black text-[#18211F]">{messages.matches.emptyTitle}</h3>
        <p className="mt-1 max-w-sm text-sm text-[#606964]">{messages.matches.emptyDescription}</p>
        <button type="button" onClick={onReset} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#18211F] px-4 text-sm font-bold text-white">
          <RotateCcw aria-hidden="true" size={16} />
          {messages.common.reset}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} locale={locale} messages={messages} />
      ))}
    </div>
  );
}
