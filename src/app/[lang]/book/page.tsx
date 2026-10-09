import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntakeForm } from "@/components/IntakeForm";
import { Eyebrow } from "@/components/Section";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/book">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).book.meta;
  return { title: t.title, description: t.description, robots: { index: false } };
}

export default async function Book({ params }: PageProps<"/[lang]/book">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const b = t.book;

  return (
    <section className="wrap grid gap-10 py-12 md:grid-cols-12 md:py-20">
      <div className="md:col-span-4">
        <Eyebrow className="mb-5 text-stone">{b.hero.eyebrow}</Eyebrow>
        <h1 className="display text-[3.4rem] md:text-[4.5rem]">{b.hero.title}</h1>
        <p className="mt-5 text-lg text-stone">{b.hero.sub}</p>
        <div className="mt-10 border-t border-ink pt-5">
          <p className="display-tight text-[1.3rem]">{b.aside.h}</p>
          <ol className="mt-4 space-y-2 text-sm">
            {b.aside.items.map((x, i) => (
              <li key={x} className="grid grid-cols-[2rem_1fr]">
                <span className="num text-clay">0{i + 1}</span>
                <span>{x}</span>
              </li>
            ))}
          </ol>
          <p className="num mt-5 text-sm">{b.aside.price}</p>
        </div>
        <p className="num mt-8 text-sm text-stone">
          {t.cta.call}:{" "}
          <a href={site.phoneHref} className="link-ul text-ink">
            {site.phone}
          </a>
        </p>
      </div>
      <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
        <IntakeForm t={b} />
      </div>
    </section>
  );
}
