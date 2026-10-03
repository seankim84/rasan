import { CalendarDays } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { dateKeyToDate } from "@/lib/datetime/vietnam";
import { formatWeekday } from "@/lib/i18n/format";
import type { Messages } from "@/lib/i18n/messages";

export function DateStrip({
  dates,
  selectedDate,
  locale,
  messages,
  onSelect,
}: {
  dates: string[];
  selectedDate: string;
  locale: Locale;
  messages: Messages;
  onSelect: (date: string) => void;
}) {
  return (
    <div className="relative">
      <div className="hide-scrollbar flex snap-x gap-2 overflow-x-auto pb-2" aria-label="Date" role="listbox">
        {dates.map((dateKey, index) => {
          const date = dateKeyToDate(dateKey);
          const selected = dateKey === selectedDate;
          return (
            <button
              key={dateKey}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(dateKey)}
              className={`flex min-h-[72px] min-w-[62px] snap-start flex-col items-center justify-center rounded-2xl border px-2 transition sm:min-w-[68px] ${
                selected
                  ? "border-[#FF5A36] bg-[#FF5A36] text-[#101817]"
                  : "border-[#DEE3DF] bg-white text-[#606964] hover:border-[#FFB39F]"
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wide">
                {index === 0 ? messages.matches.today : formatWeekday(date, locale)}
              </span>
              <span className="mt-1 text-xl font-black leading-none">{date.getUTCDate()}</span>
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 flex h-[72px] w-8 items-center justify-end bg-gradient-to-l from-[#F5F6F2] to-transparent sm:hidden" aria-hidden="true">
        <CalendarDays className="mr-0.5 text-[#606964]" size={15} />
      </div>
    </div>
  );
}
