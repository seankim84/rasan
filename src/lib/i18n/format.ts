import type { Locale } from "./config";

const localeTags: Record<Locale, string> = {
  vi: "vi-VN",
  ko: "ko-KR",
  en: "en-US",
};

export function formatVnd(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWeekday(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    weekday: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

export function formatMatchDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

export function formatTime(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(isoDate));
}
