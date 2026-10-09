# Rivas Pitching Co.

Marketing site for a private baseball pitching coach in Doral, Miami: pitching development
and college recruiting guidance. Bilingual (English / Spanish), mobile-first, static.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · TypeScript ·
self-hosted fonts via Fontsource (Barlow Condensed, Archivo, IBM Plex Mono).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /es
npm run build && npm start
```

## Structure

```
src/app/[lang]/        pages (en, es): home, pitching, recruiting, results, parents, about, book, contact
src/components/        Nav, Footer, Logo, Photo, StatCount, AudienceSelector, FAQ, VeloChart, IntakeForm …
src/i18n/              en.ts / es.ts dictionaries (es is typed against en so nothing goes untranslated)
src/data/athletes.ts   commit board, case studies, photo wall (all placeholder athletes)
src/proxy.ts           locale redirect: cookie → Accept-Language → /en
public/images/         photo set (generated, consistent grade)
scripts/               shot.mjs (Playwright screenshots), process-images.mjs
docs/DESIGN_BRIEF.md   brand, type, color, layout, imagery rules
```

## Deploy

**GitHub Pages (automatic).** `.github/workflows/pages.yml` builds a static export on every push
to `main` and publishes it at `https://<owner>.github.io/<repo>/`. The workflow sets
`GITHUB_PAGES=true`, which switches `next.config.ts` to `output: "export"` with a `basePath`,
unoptimized images and no Cache Components. The locale redirect (`src/proxy.ts`) cannot run on a
static host, so `scripts/pages-index.html` does the same thing in the browser at the site root.

**Vercel.** Import the repo, framework preset **Next.js**, no env vars required. Set
`NEXT_PUBLIC_SITE_URL` to the production URL so canonical / Open Graph URLs are absolute.
Vercel builds use the full server build (image optimization, edge redirect).

`prebuild` generates `public/robots.txt` and `public/sitemap.xml` for whichever host is being built.

## Notes

- The intake form on `/book` is front-end only. It validates, shows a simulated success state
  and stores nothing.
- All athletes, numbers, phone numbers and the address are fictional placeholders.
- Secrets go in `.env*` (git-ignored). None are needed to run the site.
