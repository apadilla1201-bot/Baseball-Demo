import type { Locale } from "@/i18n/config";

export const href = (lang: Locale, route: string = "") =>
  `/${lang}${route ? `/${route}` : ""}`;

export const swapLocale = (pathname: string, to: Locale) => {
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "es") parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
};
