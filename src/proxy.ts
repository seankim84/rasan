import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

function detectLocale(request: NextRequest): Locale {
  const savedLocale = request.cookies.get("rasan-locale")?.value;
  if (savedLocale && isLocale(savedLocale)) return savedLocale;

  const requested = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (requested.startsWith("ko") || requested.includes(",ko")) return "ko";
  if (requested.startsWith("en") || requested.includes(",en")) return "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const target = request.nextUrl.clone();
  target.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml).*)"],
};
