import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((l) =>
    routes.map((r) => ({
      url: `${site.url}/${l}${r ? `/${r}` : ""}`,
      alternates: { languages: { en: `${site.url}/en${r ? `/${r}` : ""}`, es: `${site.url}/es${r ? `/${r}` : ""}` } },
    })),
  );
}
