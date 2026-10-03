import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HomeExperience } from "@/features/matches/components/home-experience";
import { MockMatchRepository } from "@/features/matches/data/mock-match-repository";
import { addDays, getVietnamDateKey } from "@/lib/datetime/vietnam";
import { isLocale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

const titles = {
  vi: "Tìm trận futsal tại Hồ Chí Minh",
  ko: "호찌민 풋살 경기 찾기",
  en: "Find futsal matches in Ho Chi Minh City",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: titles[locale],
    description: getMessages(locale).matches.heroDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
    openGraph: {
      title: `${titles[locale]} · RA SÂN`,
      description: getMessages(locale).matches.heroDescription,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : locale === "ko" ? "ko_KR" : "en_US",
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const startDate = getVietnamDateKey();
  const dates = Array.from({ length: 14 }, (_, index) => addDays(startDate, index));
  const repository = new MockMatchRepository();
  const matches = await repository.listUpcoming(startDate, 14);

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeExperience locale={locale} messages={getMessages(locale)} dates={dates} matches={matches} />
    </Suspense>
  );
}

function HomeSkeleton() {
  return <div className="mx-auto min-h-screen max-w-[1180px] animate-pulse bg-[#F5F6F2] px-4 py-6" aria-label="Loading" />;
}
