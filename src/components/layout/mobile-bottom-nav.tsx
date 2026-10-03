import { CalendarDays, CircleUserRound, House, Search } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

export function MobileBottomNav({ locale, messages }: { locale: Locale; messages: Messages }) {
  const items = [
    { label: messages.common.home, href: `/${locale}`, icon: House, active: true },
    { label: messages.common.explore, href: "#matches", icon: Search, active: false },
    { label: messages.common.reservations, href: "#matches", icon: CalendarDays, active: false },
    { label: messages.common.profile, href: `/${locale}`, icon: CircleUserRound, active: false },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#DEE3DF] bg-white/96 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-1 backdrop-blur md:hidden" aria-label="Mobile">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={label}
            href={href}
            className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold ${active ? "text-[#E74827]" : "text-[#606964]"}`}
          >
            <Icon aria-hidden="true" size={20} strokeWidth={active ? 2.4 : 1.8} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
