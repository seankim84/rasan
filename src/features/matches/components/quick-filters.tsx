import { ChevronDown, Clock3, SlidersHorizontal, UsersRound, X } from "lucide-react";
import { useState } from "react";
import type { MatchFormat } from "@/domain/types/match";
import type { Messages } from "@/lib/i18n/messages";

export interface MatchFilters {
  district: string;
  evening: boolean;
  available: boolean;
  format: MatchFormat | "";
}

export function QuickFilters({
  filters,
  messages,
  onChange,
  onReset,
}: {
  filters: MatchFilters;
  messages: Messages;
  onChange: (key: keyof MatchFilters, value: MatchFilters[keyof MatchFilters]) => void;
  onReset: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const active = filters.district || filters.evening || filters.available || filters.format;
  const chipClass = "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-bold transition";

  return (
    <div>
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
        <label className={`${chipClass} border-[#DEE3DF] bg-white text-[#18211F]`}>
          <span className="sr-only">{messages.matches.district}</span>
          <select
            value={filters.district}
            onChange={(event) => onChange("district", event.target.value)}
            className="max-w-34 cursor-pointer appearance-none bg-transparent outline-none"
            aria-label={messages.matches.district}
          >
            <option value="">{messages.matches.allDistricts}</option>
            <option value="quan-2">Quận 2</option>
            <option value="binh-thanh">Bình Thạnh</option>
            <option value="phu-nhuan">Phú Nhuận</option>
          </select>
          <ChevronDown aria-hidden="true" size={15} />
        </label>
        <button
          type="button"
          aria-pressed={filters.evening}
          onClick={() => onChange("evening", !filters.evening)}
          className={`${chipClass} ${filters.evening ? "border-[#18211F] bg-[#18211F] text-white" : "border-[#DEE3DF] bg-white text-[#18211F]"}`}
        >
          <Clock3 aria-hidden="true" size={17} />
          {messages.matches.evening}
        </button>
        <button
          type="button"
          aria-pressed={filters.available}
          onClick={() => onChange("available", !filters.available)}
          className={`${chipClass} ${filters.available ? "border-[#18211F] bg-[#18211F] text-white" : "border-[#DEE3DF] bg-white text-[#18211F]"}`}
        >
          <UsersRound aria-hidden="true" size={17} />
          {messages.matches.spotsAvailable}
        </button>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className={`${chipClass} ${filters.format ? "border-[#FF5A36] bg-[#FFF0EB] text-[#B9361C]" : "border-[#DEE3DF] bg-white text-[#18211F]"}`}
        >
          <SlidersHorizontal aria-hidden="true" size={17} />
          {messages.matches.allFilters}
        </button>
        {active ? (
          <button type="button" onClick={onReset} className={`${chipClass} border-transparent text-[#606964] hover:text-[#D94242]`}>
            <X aria-hidden="true" size={17} />
            {messages.common.reset}
          </button>
        ) : null}
      </div>
      {expanded ? (
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#DEE3DF] bg-white p-3" aria-label={messages.matches.allFilters}>
          {(["5v5", "6v6"] as const).map((format) => (
            <button
              key={format}
              type="button"
              aria-pressed={filters.format === format}
              onClick={() => onChange("format", filters.format === format ? "" : format)}
              className={`min-h-11 rounded-xl px-5 text-sm font-black ${filters.format === format ? "bg-[#FF5A36] text-[#101817]" : "bg-[#F5F6F2] text-[#18211F]"}`}
            >
              {format}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
