import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Photo } from "@/components/Photo";
import { Eyebrow, Head } from "@/components/Section";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang).contact.meta;
  return { title: t.title, description: t.description };
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.contact;

  return (
    <>
      <section className="wrap grid gap-10 py-12 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Eyebrow className="mb-5 text-stone">{c.hero.eyebrow}</Eyebrow>
          <h1 className="display text-[3.4rem] md:text-[5rem]">{c.hero.title}</h1>
          <p className="mt-5 max-w-md text-lg text-stone">{c.hero.sub}</p>
          <dl className="mt-10 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-stone">{c.labels.phone}</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="link-ul num text-[1.4rem]">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-stone">{c.labels.email}</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="link-ul break-all">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-stone">{c.labels.address}</dt>
              <dd className="mt-1 not-italic">
                {site.address.line1}
                <br />
                {site.address.line2}
              </dd>
              <dd className="mt-2 text-sm text-stone">{c.directions}</dd>
            </div>
            <div>
              <dt className="eyebrow text-stone">{c.labels.hours}</dt>
              <dd className="num mt-1 text-sm">
                {t.footer.hoursList.map((h) => (
                  <span key={h} className="block">
                    {h}
                  </span>
                ))}
              </dd>
              <dt className="eyebrow mt-4 text-stone">{c.labels.instagram}</dt>
              <dd className="num mt-1 text-sm">{site.instagram}</dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Photo src="/images/facility.jpg" alt={lang === "es" ? "Instalación en Doral" : "Doral facility"} ratio="16/9" sizes="(min-width: 768px) 50vw, 100vw" position="50% 60%" />
          <div className="mt-8 border border-ink p-5 md:p-7">
            <p className="display-tight mb-5 text-[1.4rem]">{c.form.title}</p>
            <ContactForm t={c.form} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2">
        <div className="wrap py-16 md:py-24">
          <Head eyebrow={c.faq.eyebrow} title={c.faq.title} className="mb-12" />
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-16">
            {c.faq.groups.map((g) => (
              <div key={g.h}>
                <h3 className="display mb-4 text-[2rem]">{g.h}</h3>
                <FAQ items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
