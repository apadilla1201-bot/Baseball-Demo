import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { CTA, Head } from "@/components/Section";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/parents">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).parents.meta;
  return { title: t.title, description: t.description };
}

export default async function Parents({ params }: PageProps<"/[lang]/parents">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const p = t.parents;

  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} sub={p.hero.sub} photo="/images/parents.jpg" alt={lang === "es" ? "Coach revisando un reporte con un atleta y su mamá" : "Coach reviewing a report with an athlete and his mother"} />

      {/* PRICING */}
      <section className="border-t border-line">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={p.pricing.eyebrow} title={p.pricing.title} className="mb-10" />
          <div className="grid gap-px border border-ink bg-ink md:grid-cols-2 lg:grid-cols-4">
            {p.pricing.items.map((it, i) => (
              <div key={it.h} className={`flex flex-col p-6 md:p-7 ${i === 1 ? "bg-ink text-paper dark" : "bg-paper"}`}>
                <h3 className="display-tight text-[1.5rem] leading-tight">{it.h}</h3>
                <p className="mt-6">
                  <span className="display text-[3.4rem] leading-none">{it.price}</span>
                </p>
                <p className={`num mt-1 text-xs ${i === 1 ? "text-stone-2" : "text-stone"}`}>{it.unit}</p>
                <ul className={`mt-6 space-y-2 border-t pt-4 text-sm ${i === 1 ? "border-line-dark" : "border-line"}`}>
                  {it.includes.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-2 inline-block h-px w-3 shrink-0 bg-clay" aria-hidden="true" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-stone">{p.pricing.note}</p>
        </div>
      </section>

      {/* SAFETY */}
      <section className="dark bg-ink text-paper">
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Head eyebrow={p.safety.eyebrow} title={p.safety.title} className="[&_.eyebrow]:text-stone-2" />
            <Photo src="/images/armcare.jpg" alt="" ratio="3/2" className="mt-10" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {p.safety.items.map((it, i) => (
              <li key={it.h} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-dark py-6">
                <span className="num pt-1 text-sm text-clay">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-[1.5rem] leading-tight">{it.h}</h3>
                  <p className="mt-2 text-stone-2">{it.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* REPORTING */}
      <section className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Head eyebrow={p.reporting.eyebrow} title={p.reporting.title} />
          <p className="mt-6 text-lg">{p.reporting.p}</p>
        </div>
        <figure className="md:col-span-6 md:col-start-7">
          <div className="border border-ink bg-chalk p-5 md:p-8">
            <div className="flex items-baseline justify-between border-b border-ink pb-3">
              <p className="display-tight text-[1.2rem]">{p.reporting.sample.title}</p>
              <p className="num text-xs text-stone">Rivas Pitching Co.</p>
            </div>
            <p className="num mt-3 text-xs text-stone">{p.reporting.sample.athlete}</p>
            <table className="num mt-4 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-stone">
                  {p.reporting.sample.cols.map((c, i) => (
                    <th key={c} scope="col" className={`py-2 font-normal ${i === 0 ? "text-left" : "text-right"}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.reporting.sample.rows.map((r) => (
                  <tr key={r[0]} className="border-b border-line">
                    <td className="py-2 font-sans">{r[0]}</td>
                    <td className="py-2 text-right text-stone">{r[1]}</td>
                    <td className="py-2 text-right">{r[2]}</td>
                    <td className={`py-2 text-right ${r[3].startsWith("+") ? "text-clay" : ""}`}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm">{p.reporting.sample.next}</p>
          </div>
        </figure>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-line bg-paper-2">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={p.timeline.eyebrow} title={p.timeline.title} className="mb-12 max-w-3xl" />
          <ol className="relative grid gap-8 md:grid-cols-6">
            <span className="absolute left-0 right-0 top-2 hidden h-px bg-ink md:block" aria-hidden="true" />
            {p.timeline.items.map((it, i) => (
              <li key={it.when} className="relative md:pt-6">
                <span className="absolute left-0 top-0 hidden h-4 w-4 bg-clay md:block" aria-hidden="true" />
                <p className="num text-xs text-stone">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display-tight mt-1 text-[1.3rem] leading-tight">{it.when}</h3>
                <p className="mt-2 text-sm">{it.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTA title={p.cta.title} p={p.cta.p} primary={{ label: `${t.cta.call} · ${site.phone}`, href: site.phoneHref }} secondary={{ label: t.cta.book, href: href(lang, "book") }} tone="ink" />
    </>
  );
}
