import { CalendarDays, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale, messages }: { locale: Locale; messages: Messages }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-[#F5F6F2]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-[1180px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="mr-auto inline-flex min-h-11 items-center text-[19px] font-black tracking-[-0.04em] text-[#101817]"
        >
          RA <span className="ml-1 text-[#E74827]">SÂN</span>
        </Link>

        <button className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#18211F] sm:flex" type="button">
          <MapPin aria-hidden="true" size={18} />
          {messages.common.city}
        </button>
        <a className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#18211F] md:flex" href="#matches">
          <Search aria-hidden="true" size={18} />
          {messages.common.explore}
        </a>
        <button
          className="flex size-11 items-center justify-center rounded-xl border border-[#DEE3DF] bg-white text-[#18211F] md:hidden"
          type="button"
          aria-label={messages.common.reservations}
        >
          <CalendarDays aria-hidden="true" size={20} />
        </button>
        <Suspense fallback={<div className="h-11 w-18 rounded-xl bg-white" />}>
          <LanguageSwitcher locale={locale} />
        </Suspense>
        <button
          type="button"
          className="hidden min-h-11 rounded-xl bg-[#18211F] px-4 text-sm font-bold text-white transition hover:bg-[#101817] sm:block"
        >
          {messages.common.login}
        </button>
      </div>
    </header>
  );
}
