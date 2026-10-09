"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dict } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/paths";

export function AudienceSelector({ lang, t }: { lang: Locale; t: Dict["home"]["selector"] }) {
  const [i, setI] = useState(0);
  const cur = t.options[i];
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5" role="tablist" aria-label={t.title}>
        {t.options.map((o, idx) => {
          const active = idx === i;
          return (
            <button
              key={o.key}
              role="tab"
              id={`aud-tab-${o.key}`}
              aria-selected={active}
              aria-controls={`aud-panel-${o.key}`}
              onClick={() => setI(idx)}
              className={`display flex w-full items-baseline justify-between border-t border-line py-4 text-left text-[2rem] transition-colors md:text-[2.75rem] ${active ? "text-clay" : "hover:text-stone"}`}
            >
              <span>{o.label}</span>
              <span className="num text-sm text-stone">0{idx + 1}</span>
            </button>
          );
        })}
        <div className="border-t border-line" />
      </div>
      <div
        className="md:col-span-7"
        role="tabpanel"
        id={`aud-panel-${cur.key}`}
        aria-labelledby={`aud-tab-${cur.key}`}
      >
        <h3 className="display-tight text-[1.75rem] leading-tight md:text-[2.25rem]">{cur.heading}</h3>
        <p className="mt-5 max-w-xl text-lg">{cur.body}</p>
        <ul className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {cur.links.map((l) => (
            <li key={l.href}>
              <Link href={href(lang, l.href)} className="btn btn-ghost">
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
