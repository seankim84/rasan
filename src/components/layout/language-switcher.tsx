"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function changeLocale(nextLocale: Locale) {
    document.cookie = `rasan-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const query = searchParams.toString();
    router.push(`${segments.join("/")}${query ? `?${query}` : ""}`);
  }

  return (
    <label className="relative flex min-h-11 items-center gap-2 rounded-xl border border-[#DEE3DF] bg-white px-3 text-sm font-semibold text-[#18211F]">
      <Languages aria-hidden="true" size={17} strokeWidth={1.8} />
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        className="cursor-pointer appearance-none bg-transparent pr-3 outline-none"
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
