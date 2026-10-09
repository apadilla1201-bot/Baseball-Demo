import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { CTA, Eyebrow, Head } from "@/components/Section";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/pitching">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).pitching.meta;
  return { title: t.title, description: t.description };
}

const servicePhotos = ["/images/bullpen.jpg", "/images/remote.jpg", "/images/radar.jpg", "/images/grip.jpg", "/images/armcare.jpg"];

export default async function Pitching({ params }: PageProps<"/[lang]/pitching">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const p = t.pitching;

  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} sub={p.hero.sub} photo="/images/catcher.jpg" alt={lang === "es" ? "Vista desde detrás del receptor en el bullpen bajo techo" : "View from behind the catcher in the indoor bullpen"} position="50% 40%" />

      {/* SERVICES: alternating editorial rows */}
      <section className="border-t border-line">
        <div className="wrap py-14 md:py-20">
          <Eyebrow className="mb-10">{p.services.eyebrow}</Eyebrow>
          <ol className="divide-y divide-line border-y border-line">
            {p.services.items.map((s, i) => (
              <li key={s.h} className="grid gap-6 py-10 md:grid-cols-12 md:gap-10 md:py-14">
                <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-last" : ""}`}>
                  <Photo src={servicePhotos[i]} alt="" ratio={i === 3 ? "3/2" : "4/3"} sizes="(min-width: 768px) 33vw, 100vw" position={i === 0 ? "30% 50%" : undefined} />
                </div>
                <div className="md:col-span-7">
                  <p className="num text-sm text-clay">0{i + 1}</p>
                  <h2 className="display mt-2 text-[2.4rem] md:text-[3.2rem]">{s.h}</h2>
                  <p className="mt-5 max-w-xl text-lg">{s.p}</p>
                  <p className="num mt-6 inline-block border-l-2 border-clay pl-3 text-sm text-stone">{s.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESS */}
      <section className="dark bg-ink text-paper">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={p.process.eyebrow} title={p.process.title} className="mb-12 [&_.eyebrow]:text-stone-2" />
          <ol className="grid gap-px bg-ink-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.process.steps.map((s) => (
              <li key={s.n} className="flex min-h-[18rem] flex-col bg-ink p-6 md:p-8">
                <span className="display text-[4rem] leading-none text-clay">{s.n}</span>
                <h3 className="display-tight mt-auto pt-10 text-[1.8rem]">{s.h}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-2">{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* METRICS */}
      <section className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Head eyebrow={p.metrics.eyebrow} title={p.metrics.title} />
        </div>
        <dl className="grid grid-cols-2 gap-x-6 md:col-span-8 md:grid-cols-4">
          {p.metrics.items.map((m) => (
            <div key={m.k} className="border-t border-ink py-4">
              <dt className="text-sm font-medium leading-snug">{m.k}</dt>
              <dd className="num mt-2 text-[1.6rem] leading-none text-clay">{m.v}</dd>
              <dd className="mt-2 text-xs text-stone">{m.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* SAMPLE WEEK */}
      <section className="border-t border-line bg-paper-2">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <Head eyebrow={p.sample.eyebrow} title={p.sample.title} />
              <p className="mt-5 max-w-sm text-sm text-stone">{p.sample.note}</p>
            </div>
            <table className="w-full border-collapse text-left md:col-span-8">
              <tbody>
                {p.sample.days.map((d) => (
                  <tr key={d.d} className="border-t border-line last:border-b">
                    <th scope="row" className="display w-14 py-3 pr-3 align-top text-[1.4rem] font-bold">
                      {d.d}
                    </th>
                    <td className="num w-40 py-3 pr-4 align-top text-xs text-stone sm:text-sm">{d.t}</td>
                    <td className="py-3 align-top text-sm">{d.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wrap py-12 md:py-16">
        <p className="max-w-3xl text-lg">
          <Link href={href(lang, "results")} className="link-ul">
            {t.cta.results} →
          </Link>
        </p>
      </section>

      <CTA title={p.cta.title} p={p.cta.p} primary={{ label: t.cta.book, href: href(lang, "book") }} secondary={{ label: t.nav.parents, href: href(lang, "parents") }} tone="ink" />
    </>
  );
}
