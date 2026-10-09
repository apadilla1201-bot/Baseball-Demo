export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const hasLocale = (l: string): l is Locale =>
  (locales as readonly string[]).includes(l);
export const otherLocale = (l: Locale): Locale => (l === "en" ? "es" : "en");
