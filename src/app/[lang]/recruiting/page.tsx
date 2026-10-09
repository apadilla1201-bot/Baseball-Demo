import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommitBoard } from "@/components/CommitBoard";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { CTA, Head } from "@/components/Section";
import { commitTotals } from "@/data/athletes";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/recruiting">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).recruiting.meta;
  return { title: t.title, description: t.description };
}

export default async function Recruiting({ params }: PageProps<"/[lang]/recruiting">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const r = t.recruiting;

  return (
    <>
      <PageHero eyebrow={r.hero.eyebrow} title={r.hero.title} sub={r.hero.sub} photo="/images/college-navy.jpg" alt={lang === "es" ? "Pitcher universitario en uniforme liso" : "College pitcher in a plain uniform"} position="50% 15%" />

      {/* ROADMAP */}
      <section className="border-t border-line">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={r.roadmap.eyebrow} title={r.roadmap.title} className="mb-12" />
          <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {r.roadmap.years.map((y, i) => (
              <li key={y.y} className={`border-t-2 border-ink pt-5 ${i === 2 ? "lg:border-clay" : ""}`}>
                <p className="display text-[2.6rem] leading-none">{y.y}</p>
                <p className="num mt-1 text-xs text-stone">{String(i + 9).padStart(2, "0")}</p>
                <h3 className="display-tight mt-6 text-[1.4rem] leading-tight">{y.h}</h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {y.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-2 inline-block h-px w-3 shrink-0 bg-clay" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROFILE */}
      <section className="border-y border-line bg-paper-2">
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Head eyebrow={r.profile.eyebrow} title={r.profile.title} />
            <Photo src="/images/remote.jpg" alt="" ratio="3/2" className="mt-10" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {r.profile.items.map((it) => (
              <div key={it.h} className="border-t border-ink py-6">
                <dt className="display text-[1.9rem]">{it.h}</dt>
                <dd className="mt-2 max-w-lg">{it.p}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SHOWCASES + EMAIL */}
      <section className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Head eyebrow={r.showcases.eyebrow} title={r.showcases.title} />
          <p className="mt-6 text-lg">{r.showcases.p}</p>
          <ol className="mt-8 border-t border-line">
            {r.showcases.list.map((s, i) => (
              <li key={s} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-3 text-sm">
                <span className="num text-clay">0{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Head eyebrow={r.email.eyebrow} title={r.email.title} />
          <p className="mt-6">{r.email.p}</p>
          <figure className="mt-8 border border-ink bg-chalk p-5 font-mono text-[0.85rem] leading-relaxed md:p-7">
            <p className="border-b border-line pb-3 font-medium">{r.email.subject}</p>
            <div className="mt-4 space-y-3">
              {r.email.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </figure>
          <p className="mt-5 text-sm text-stone">{r.email.followup}</p>
        </div>
      </section>

      {/* LEVEL FIT */}
      <section className="border-t border-line">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={r.fit.eyebrow} title={r.fit.title} sub={r.fit.p} className="mb-10" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-ink">
                  {r.fit.cols.map((c) => (
                    <th key={c} scope="col" className="eyebrow py-3 pr-4 font-normal text-stone">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.fit.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-line align-top">
                    <th scope="row" className="display py-4 pr-4 text-[2rem] font-bold leading-none">
                      {row[0]}
                    </th>
                    <td className="num py-4 pr-4 text-[1.1rem] text-clay">{row[1]}</td>
                    <td className="py-4 pr-4">{row[2]}</td>
                    <td className="py-4 text-stone">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-xs text-stone">{r.fit.note}</p>
        </div>
      </section>

      {/* PARENT GUIDE */}
      <section className="dark bg-clay text-chalk">
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Head eyebrow={r.parentGuide.eyebrow} title={r.parentGuide.title} />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-8">
            <div>
              <p className="eyebrow border-b border-chalk/40 pb-2">{lang === "es" ? "Te toca a ti" : "Yours"}</p>
              <ul className="mt-4 space-y-3">
                {r.parentGuide.yours.map((x) => (
                  <li key={x} className="text-[1.05rem]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow border-b border-chalk/40 pb-2">{lang === "es" ? "No te toca" : "Not yours"}</p>
              <ul className="mt-4 space-y-3">
                {r.parentGuide.not.map((x) => (
                  <li key={x} className="text-[1.05rem] line-through decoration-chalk/50 decoration-1">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COMMIT BOARD */}
      <section className="dark bg-ink text-paper">
        <div className="wrap py-16 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Head eyebrow={r.board.eyebrow} title={r.board.title} className="[&_.eyebrow]:text-stone-2" />
            <dl className="num flex gap-6 text-sm">
              {(Object.keys(commitTotals.byLevel) as (keyof typeof commitTotals.byLevel)[]).map((l) => (
                <div key={l}>
                  <dt className="text-stone-2">{l}</dt>
                  <dd className="display text-[2rem] leading-none">{commitTotals.byLevel[l]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <CommitBoard cols={[...r.board.cols]} filterAll={r.board.filterAll} lang={lang} />
          <p className="mt-6 text-xs text-stone-2">{r.board.note}</p>
        </div>
      </section>

      <CTA title={r.cta.title} p={r.cta.p} primary={{ label: t.cta.book, href: href(lang, "book") }} secondary={{ label: t.nav.parents, href: href(lang, "parents") }} />
    </>
  );
}
