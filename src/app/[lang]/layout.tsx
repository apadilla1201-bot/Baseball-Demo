import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getDict } from "@/i18n";
import { hasLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "es" ? "es_US" : "en_US",
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: ["/og.jpg"] },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDict(lang);
  const ld = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: site.name,
    url: `${site.url}/${lang}`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Doral",
      addressRegion: "FL",
      postalCode: "33122",
      addressCountry: "US",
    },
    founder: { "@type": "Person", name: site.coach },
    foundingDate: String(site.founded),
    areaServed: "Miami-Dade County",
    knowsLanguage: ["en", "es"],
  };
  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Nav lang={lang} t={t.nav} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} t={t.footer} nav={t.nav} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
