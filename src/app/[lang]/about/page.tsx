import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { CTA, Eyebrow, Head } from "@/components/Section";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).about.meta;
  return { title: t.title, description: t.description };
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const a = t.about;

  return (
    <>
      {/* HERO: portrait left, name right */}
      <section className="border-b border-line">
        <div className="wrap grid gap-8 py-10 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Photo src="/images/coach.jpg" alt="Danny Rivas" ratio="3/4" sizes="(min-width: 768px) 40vw, 100vw" priority />
          </div>
          <div className="flex flex-col justify-end md:col-span-7 md:pl-8">
            <Eyebrow className="mb-5 text-stone">{a.hero.eyebrow}</Eyebrow>
            <h1 className="display text-[4.5rem] leading-[0.86] md:text-[8rem]">{a.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-stone md:text-xl">{a.hero.sub}</p>
            <dl className="num mt-10 grid grid-cols-3 gap-4 border-t border-ink pt-4 text-sm">
              <div>
                <dt className="text-stone">RHP</dt>
                <dd>91–93</dd>
              </div>
              <div>
                <dt className="text-stone">{lang === "es" ? "Desde" : "Since"}</dt>
                <dd>2015</dd>
              </div>
              <div>
                <dt className="text-stone">{lang === "es" ? "Compromisos" : "Commits"}</dt>
                <dd>38</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="space-y-6 text-lg leading-relaxed md:col-span-7">
          {a.bio.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:display first-letter:float-left first-letter:mr-3 first-letter:text-[4.5rem] first-letter:leading-[0.8]" : ""}>
              {para}
            </p>
          ))}
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <Eyebrow className="mb-4">{a.timeline.eyebrow}</Eyebrow>
          <ol className="border-t border-ink">
            {a.timeline.items.map((it) => (
              <li key={it.y} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-line py-3 text-sm">
                <span className="num text-stone">{it.y}</span>
                <span>{it.t}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* PHILOSOPHY */}
      <section className="dark bg-ink text-paper">
        <div className="wrap py-16 md:py-24">
          <Eyebrow className="mb-10 text-stone-2">{a.philosophy.eyebrow}</Eyebrow>
          <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {a.philosophy.items.map((it, i) => (
              <li key={it.h} className="border-t border-line-dark pt-5">
                <span className="num text-sm text-clay">0{i + 1}</span>
                <h2 className="display mt-3 text-[2.4rem] md:text-[3rem]">{it.h}</h2>
                <p className="mt-3 max-w-md text-stone-2">{it.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FACILITY */}
      <section>
        <Photo src="/images/facility.jpg" alt={lang === "es" ? "Instalación de entrenamiento en Doral" : "Training facility in Doral"} ratio="21/9" sizes="100vw" position="50% 60%" />
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Head eyebrow={a.facility.eyebrow} title={a.facility.title} size="lg" />
            <p className="num mt-6 text-sm text-stone">
              7800 NW 25th St, Unit 4
              <br />
              Doral, FL 33122
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lg">{a.facility.p}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6">
              {a.facility.specs.map(([k, v]) => (
                <div key={k} className="border-t border-ink py-3">
                  <dt className="eyebrow text-stone">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTA title={t.home.cta.title} p={t.home.cta.p} price={t.home.cta.price} priceNote={t.home.cta.priceNote} primary={{ label: t.cta.book, href: href(lang, "book") }} />
    </>
  );
}
