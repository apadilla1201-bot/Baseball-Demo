import Link from "next/link";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/paths";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ lang, t, nav }: { lang: Locale; t: Dict["footer"]; nav: Dict["nav"] }) {
  const year = 2026;
  return (
    <footer className="dark bg-ink text-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo className="text-paper [&_.text-stone]:text-stone-2" />
          <p className="mt-5 max-w-sm text-stone-2">{t.tagline}</p>
          <p className="num mt-6 text-sm text-stone-2">{site.instagram}</p>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-stone-2">{t.visit}</p>
          <address className="mt-3 not-italic leading-snug">
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-stone-2">{t.hours}</p>
          <ul className="num mt-3 space-y-1 text-sm">
            {t.hoursList.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-stone-2">{t.talk}</p>
          <ul className="mt-3 space-y-1">
            <li>
              <a className="link-ul num" href={site.phoneHref}>
                {site.phone}
              </a>
            </li>
            <li>
              <a className="link-ul break-all" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {(["pitching", "recruiting", "results", "parents", "about", "contact", "book"] as const).map((r) => (
              <li key={r}>
                <Link className="link-ul" href={href(lang, r)}>
                  {nav[r]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rule-dark border-t">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-stone-2 md:flex-row md:justify-between">
          <p>{t.legal}</p>
          <p className="num">
            © {year} {site.name} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
