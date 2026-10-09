"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict } from "@/i18n";
import { otherLocale, type Locale } from "@/i18n/config";
import { href, swapLocale } from "@/lib/paths";
import { Logo } from "./Logo";

const items: { key: keyof Dict["nav"]; route: string }[] = [
  { key: "pitching", route: "pitching" },
  { key: "recruiting", route: "recruiting" },
  { key: "results", route: "results" },
  { key: "parents", route: "parents" },
  { key: "about", route: "about" },
  { key: "contact", route: "contact" },
];

export function Nav({ lang, t }: { lang: Locale; t: Dict["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const other = otherLocale(lang);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const setLangCookie = (l: Locale) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        {t.skip}
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href={href(lang)} aria-label="Rivas Pitching Co. home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {items.map((it) => {
              const h = href(lang, it.route);
              const active = pathname === h || pathname.startsWith(h + "/");
              return (
                <li key={it.key}>
                  <Link
                    href={h}
                    aria-current={active ? "page" : undefined}
                    className={`display-tight text-[1.05rem] uppercase tracking-wide transition-colors hover:text-clay ${active ? "text-clay" : ""}`}
                  >
                    {t[it.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={swapLocale(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.langAria}
            onClick={() => setLangCookie(other)}
            className="eyebrow rounded-full border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper"
          >
            {t.lang}
          </Link>
          <Link href={href(lang, "book")} className="btn btn-clay hidden text-[1rem] md:inline-flex">
            {t.book}
          </Link>
          <button
            type="button"
            className="display-tight -mr-2 px-2 py-2 text-[1.05rem] uppercase lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink text-paper lg:hidden">
          <nav aria-label="Mobile" className="wrap flex h-full flex-col py-8">
            <ul className="flex flex-col">
              {items.map((it, i) => (
                <li key={it.key} className="border-b border-line-dark">
                  <Link href={href(lang, it.route)} onClick={() => setOpen(false)} className="display flex items-baseline justify-between py-4 text-[2.6rem]">
                    <span>{t[it.key]}</span>
                    <span className="num text-sm text-stone-2">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <Link href={href(lang, "book")} onClick={() => setOpen(false)} className="btn btn-clay w-full justify-between text-[1.2rem]">
                {t.book} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
