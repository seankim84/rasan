import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: "daily",
    priority: locale === "vi" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `${baseUrl}/${item}`])),
    },
  }));
}
