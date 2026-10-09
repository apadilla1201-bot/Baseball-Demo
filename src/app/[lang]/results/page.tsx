import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { CTA } from "@/components/Section";
import { VeloChart } from "@/components/VeloChart";
import { caseStudies } from "@/data/athletes";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/results">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).results.meta;
  return { title: t.title, description: t.description };
}

export default async function Results({ params }: PageProps<"/[lang]/results">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const r = t.results;
  const L = r.labels;
  const programLabel = { "in-person": L.inPerson, remote: L.remote, hybrid: L.hybrid } as const;

  return (
    <>
      <PageHero eyebrow={r.hero.eyebrow} title={r.hero.title} sub={r.hero.sub} tone="ink" />

      <section>
        {caseStudies.map((c, i) => {
          const dark = i % 2 === 1;
          const muted = dark ? "text-stone-2" : "text-stone";
          return (
            <article key={c.slug} id={c.slug} className={dark ? "dark bg-ink text-paper" : "bg-paper"}>
              <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
                <div className="md:col-span-4">
                  <p className={`num text-xs ${muted}`}>
                    {String(i + 1).padStart(2, "0")} · {c.hand} · {c.hs} &apos;{String(c.grad).slice(2)}
                  </p>
                  <h2 className="display mt-3 text-[3rem] leading-none md:text-[3.6rem]">{c.name}</h2>
                  <div className="mt-8 grid grid-cols-3 gap-4 border-t border-current pt-5">
                    <div>
                      <p className={`eyebrow ${muted}`}>{L.before}</p>
                      <p className={`num mt-1 text-[2.4rem] leading-none ${muted}`}>{c.before === 0 ? "—" : c.before}</p>
                    </div>
                    <div>
                      <p className="eyebrow text-clay">{L.after}</p>
                      <p className="num mt-1 text-[2.4rem] leading-none">{c.after}</p>
                    </div>
                    <div>
                      <p className={`eyebrow ${muted}`}>{L.months}</p>
                      <p className="num mt-1 text-[2.4rem] leading-none">{c.months}</p>
                    </div>
                  </div>
                  <dl className="mt-6 space-y-2 text-sm">
                    <div className="flex justify-between gap-4 border-t border-current/20 pt-2">
                      <dt className={muted}>{L.program}</dt>
                      <dd className="font-medium">{c.before === 0 ? L.rtt : programLabel[c.program]}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-current/20 pt-2">
                      <dt className={muted}>{L.committed}</dt>
                      <dd className="text-right font-medium">
                        {c.school} <span className="num ml-1 border border-current px-1 text-xs">{c.level}</span>
                      </dd>
                    </div>
                  </dl>
                  {c.photo && <Photo src={c.photo} alt={c.name} ratio="4/5" className="mt-8 hidden md:block" sizes="(min-width: 768px) 30vw, 100vw" position="50% 15%" />}
                </div>

                <div className="md:col-span-7 md:col-start-6">
                  <p className={`eyebrow mb-3 ${muted}`}>{L.velo}</p>
                  <VeloChart points={c.points} lang={lang} label={L.velo} rtt={c.before === 0} />
                  <table className="mt-8 w-full border-collapse text-sm">
                    <caption className={`eyebrow mb-2 text-left ${muted}`}>{L.metrics}</caption>
                    <thead>
                      <tr className="border-b border-current/40">
                        <th scope="col" className="py-2 text-left font-normal"></th>
                        <th scope="col" className={`eyebrow py-2 text-right font-normal ${muted}`}>
                          {L.before}
                        </th>
                        <th scope="col" className="eyebrow py-2 text-right font-normal text-clay">
                          {L.after}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.metrics.map((m) => (
                        <tr key={m.label.en} className="border-b border-current/15">
                          <td className="py-2">{m.label[lang]}</td>
                          <td className={`num py-2 text-right ${muted}`}>{m.before}</td>
                          <td className="num py-2 text-right font-medium">{m.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-8 max-w-2xl text-lg">{c.story[lang]}</p>
                  <blockquote className="mt-8 max-w-2xl border-l-2 border-clay pl-5">
                    <p className="display-tight text-[1.5rem] leading-snug md:text-[1.8rem]">“{c.quote[lang]}”</p>
                    <footer className={`num mt-3 text-xs ${muted}`}>— {c.quote.by[lang]}</footer>
                  </blockquote>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <CTA title={r.cta.title} p={r.cta.p} primary={{ label: t.cta.book, href: href(lang, "book") }} />
    </>
  );
}
