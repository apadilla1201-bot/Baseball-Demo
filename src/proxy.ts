import { NextResponse, type NextRequest } from "next/server";

const locales = ["en", "es"] as const;

function pickLocale(req: NextRequest): (typeof locales)[number] {
  const cookie = req.cookies.get("lang")?.value;
  if (cookie === "en" || cookie === "es") return cookie;
  const header = req.headers.get("accept-language") ?? "";
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("es") ? "es" : "en";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon|icon|og|robots|sitemap|.*\\..*).*)"],
};
