import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudienceSelector } from "@/components/AudienceSelector";
import { FAQ } from "@/components/FAQ";
import { Photo } from "@/components/Photo";
import { CTA, Eyebrow, Head } from "@/components/Section";
import { StatCount } from "@/components/StatCount";
import { caseStudies, wall } from "@/data/athletes";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { href } from "@/lib/paths";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang);
  return { title: { absolute: t.meta.title }, description: t.meta.description };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const h = t.home;
  const stories = caseStudies.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-paper">
        <div className="relative flex min-h-[82svh] flex-col justify-end pt-40 md:min-h-[86vh] md:pt-48">
          <Photo
            src="/images/hero.jpg"
            alt={lang === "es" ? "Pitcher de high school en el momento de aterrizaje del pie delantero, bullpen al aire libre en Miami" : "High school pitcher at front-foot landing, outdoor bullpen in Miami"}
            className="absolute inset-0 h-full"
            sizes="100vw"
            priority
            position="72% 30%"
            shade={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden="true" />
          <div className="wrap relative pb-10 md:pb-14">
            <Eyebrow className="mb-5 text-stone-2">{h.hero.eyebrow}</Eyebrow>
            <h1 className="display max-w-[12ch] text-[17vw] leading-[0.86] xs:text-[4.6rem] md:text-[7rem] lg:text-[8.5rem]">
              <span className="block">{h.hero.h1a}</span>
              <span className="block">{h.hero.h1b}</span>
              <span className="block text-clay">{h.hero.h1c}</span>
            </h1>
            <div className="mt-7 flex max-w-xl flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10 lg:max-w-3xl">
              <p className="max-w-md text-lg text-paper/90">{h.hero.sub}</p>
              <Link href={href(lang, "book")} className="btn btn-clay shrink-0 self-start">
                {t.cta.book} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        {/* data strip */}
        <div className="border-t border-line-dark">
          <div className="wrap grid grid-cols-3 divide-x divide-line-dark md:grid-cols-12 md:divide-x-0">
            {h.hero.strip.map((s, i) => (
              <div key={s.k} className={`py-4 pr-3 md:col-span-3 md:border-r md:border-line-dark md:py-5 ${i > 0 ? "pl-3 md:pl-6" : ""}`}>
                <p className="num text-[1.6rem] leading-none md:text-[2.2rem]">{s.v}</p>
                <p className="eyebrow mt-2 text-stone-2">{s.k}</p>
                <p className="num mt-0.5 text-xs text-stone-2">{s.unit}</p>
              </div>
            ))}
            <p className="hidden self-center py-5 pl-6 text-sm text-stone-2 md:col-span-3 md:block">{h.hero.caption}</p>
          </div>
        </div>
      </section>

      {/* SELECTOR */}
      <section className="wrap py-16 md:py-24">
        <Head eyebrow={h.selector.eyebrow} title={h.selector.title} className="mb-10 md:mb-14" />
        <AudienceSelector lang={lang} t={h.selector} />
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-paper-2">
        <div className="wrap grid gap-y-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-3">
            <Eyebrow>{h.stats.eyebrow}</Eyebrow>
            <p className="mt-5 max-w-xs text-sm text-stone">{h.stats.note}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-9 md:grid-cols-4">
            {h.stats.items.map((s) => (
              <div key={s.k} className="border-t border-ink pt-4">
                <dd className="display text-[3.4rem] leading-none md:text-[4.5rem]">
                  <StatCount value={s.v} prefix={s.prefix} suffix={s.suffix} className="font-display" />
                </dd>
                <dt className="mt-3 text-sm font-medium leading-snug">{s.k}</dt>
                <p className="num mt-1 text-xs text-stone">{s.sub}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PAIN */}
      <section className="dark bg-ink text-paper">
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Head eyebrow={h.pain.eyebrow} title={h.pain.title} className="[&_.eyebrow]:text-stone-2" />
            <Photo src="/images/radar.jpg" alt={lang === "es" ? "Radar mostrando 86 mph con un pitcher desenfocado al fondo" : "Radar reading 86 mph with a pitcher out of focus behind"} ratio="3/2" className="mt-10 hidden md:block" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <ol className="md:col-span-6 md:col-start-7">
            {h.pain.items.map((it, i) => (
              <li key={it.h} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-dark py-7 first:border-t-0 md:first:border-t">
                <span className="num pt-1 text-sm text-clay">0{i + 1}</span>
                <div>
                  <h3 className="display-tight text-[1.6rem] leading-tight md:text-[2rem]">{it.h}</h3>
                  <p className="mt-3 max-w-lg text-stone-2">{it.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PILLARS */}
      <section className="wrap py-16 md:py-24">
        <Head eyebrow={h.pillars.eyebrow} title={h.pillars.title} className="mb-12 max-w-4xl" />
        <div className="grid gap-px bg-line md:grid-cols-2">
          <article className="bg-paper md:pr-12">
            <Photo src="/images/bullpen.jpg" alt={lang === "es" ? "Bullpen bajo techo con cámara de alta velocidad en primer plano" : "Indoor bullpen with a high-speed camera in the foreground"} ratio="3/2" sizes="(min-width: 768px) 50vw, 100vw" position="30% 50%" />
            <div className="pt-6 md:pt-8">
              <p className="num text-sm text-clay">01</p>
              <h3 className="display mt-2 text-[2.4rem] md:text-[3rem]">{h.pillars.pitching.h}</h3>
              <p className="mt-4 max-w-lg text-lg">{h.pillars.pitching.p}</p>
              <ul className="mt-6 columns-1 gap-8 text-sm sm:columns-2">
                {h.pillars.pitching.bullets.map((b) => (
                  <li key={b} className="break-inside-avoid border-t border-line py-2">
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={href(lang, "pitching")} className="btn btn-ink mt-8">
                {h.pillars.pitching.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
          <article className="bg-paper pt-10 md:pl-12 md:pt-0">
            <Photo src="/images/college-navy.jpg" alt={lang === "es" ? "Pitcher universitario en uniforme azul marino liso" : "College pitcher in a plain navy uniform"} ratio="3/2" sizes="(min-width: 768px) 50vw, 100vw" position="50% 20%" />
            <div className="pt-6 md:pt-8">
              <p className="num text-sm text-clay">02</p>
              <h3 className="display mt-2 text-[2.4rem] md:text-[3rem]">{h.pillars.recruiting.h}</h3>
              <p className="mt-4 max-w-lg text-lg">{h.pillars.recruiting.p}</p>
              <ul className="mt-6 columns-1 gap-8 text-sm sm:columns-2">
                {h.pillars.recruiting.bullets.map((b) => (
                  <li key={b} className="break-inside-avoid border-t border-line py-2">
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={href(lang, "recruiting")} className="btn btn-ink mt-8">
                {h.pillars.recruiting.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* STORIES */}
      <section className="border-t border-line bg-paper-2">
        <div className="wrap py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Head eyebrow={h.stories.eyebrow} title={h.stories.title} />
            <Link href={href(lang, "results")} className="link-ul display-tight text-[1.2rem] uppercase">
              {h.stories.all} →
            </Link>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {stories.map((c, i) => (
              <article key={c.slug} className={`grid grid-cols-[1fr_auto] gap-x-6 border-t border-ink pt-5 ${i === 1 ? "lg:mt-16" : ""} ${i === 2 ? "lg:mt-32" : ""}`}>
                <div className="col-span-2 flex items-baseline justify-between">
                  <p className="num text-xs text-stone">
                    {c.hand} · {c.hs} &apos;{String(c.grad).slice(2)}
                  </p>
                  <p className="num text-xs text-stone">
                    {c.months} {h.stories.months}
                  </p>
                </div>
                <h3 className="display mt-3 text-[2.2rem] leading-none">{c.name}</h3>
                <div className="row-span-2 flex items-start gap-3 self-start pt-1">
                  <div className="text-right">
                    <p className="eyebrow text-stone">{h.stories.before}</p>
                    <p className="num text-[2rem] leading-none text-stone">{c.before === 0 ? "—" : c.before}</p>
                  </div>
                  <div className="text-right">
                    <p className="eyebrow text-clay">{h.stories.after}</p>
                    <p className="num text-[2rem] leading-none">{c.after}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{c.story[lang]}</p>
                <div className="col-span-2 mt-5 flex items-center justify-between border-t border-line pt-3">
                  <p className="text-sm">
                    <span className="eyebrow mr-2 text-stone">{h.stories.committed}</span>
                    <span className="font-medium">{c.school}</span>
                  </p>
                  <span className="num border border-ink px-1.5 py-0.5 text-xs">{c.level}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO WALL */}
      <section className="dark bg-ink text-paper">
        <div className="grid grid-cols-3 gap-px bg-ink-3 md:grid-cols-6">
          {wall.map((w) => (
            <figure key={w.name} className="relative bg-ink">
              <Photo src={w.photo} alt={w.name} ratio="1/1" sizes="(min-width: 768px) 17vw, 33vw" shade={false} />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-[0.7rem] leading-tight">
                <span className="block font-medium">{w.name}</span>
                <span className="num hidden text-stone-2 sm:block">{w.meta}</span>
              </figcaption>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
            </figure>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section className="wrap py-16 md:py-24">
        <Head eyebrow={h.compare.eyebrow} title={h.compare.title} className="mb-10 max-w-3xl" />
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="eyebrow w-1/2 py-3 pr-4 font-normal text-stone">
                {h.compare.colA}
              </th>
              <th scope="col" className="eyebrow w-1/2 py-3 pl-4 font-normal text-clay">
                {h.compare.colB}
              </th>
            </tr>
          </thead>
          <tbody>
            {h.compare.rows.map(([a, b]) => (
              <tr key={a} className="border-b border-line align-top">
                <td className="py-4 pr-4 text-stone">{a}</td>
                <td className="py-4 pl-4 font-medium">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* FAQ */}
      <section className="border-t border-line">
        <div className="wrap grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <Head eyebrow={h.faq.eyebrow} title={h.faq.title} />
            <Link href={href(lang, "contact")} className="link-ul mt-6 inline-block">
              {t.nav.contact} →
            </Link>
          </div>
          <div className="md:col-span-8">
            <FAQ items={h.faq.items} />
          </div>
        </div>
      </section>

      <CTA
        title={h.cta.title}
        p={h.cta.p}
        price={h.cta.price}
        priceNote={h.cta.priceNote}
        primary={{ label: t.cta.book, href: href(lang, "book") }}
        secondary={{ label: t.cta.remote, href: href(lang, "contact") }}
      />
    </>
  );
}
