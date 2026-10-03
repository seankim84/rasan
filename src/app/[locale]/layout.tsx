import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AppProviders } from "@/app/providers";
import { isLocale, locales } from "@/lib/i18n/config";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "RA SÂN — Chọn trận. Giữ chỗ. Ra sân.",
    template: "%s · RA SÂN",
  },
  description: "Tìm và đặt chỗ các trận futsal tại Hồ Chí Minh City.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
