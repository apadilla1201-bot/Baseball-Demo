// Writes public/robots.txt and public/sitemap.xml for the current deployment URL.
// Runs as `prebuild`; NEXT_PUBLIC_SITE_URL decides the host (Vercel or GitHub Pages).
import { writeFileSync } from "node:fs";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rivaspitching.com").replace(/\/$/, "");
const trailing = process.env.GITHUB_PAGES === "true" ? "/" : "";
const locales = ["en", "es"];
const routes = ["", "pitching", "recruiting", "results", "parents", "about", "contact"]; // /book is noindex

const url = (l, r) => `${site}/${l}${r ? `/${r}` : ""}${trailing}`;
const entries = locales
  .flatMap((l) => routes.map((r) => ({ l, r })))
  .map(
    ({ l, r }) => `  <url>
    <loc>${url(l, r)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url("en", r)}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${url("es", r)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url("en", r)}"/>
  </url>`,
  )
  .join("\n");

writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`,
);
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log("sitemap + robots written for", site);
