// Screenshot pages at desktop and mobile widths.
// usage: node scripts/shot.mjs <outdir> <path> [<path>...]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const [outDir, ...paths] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const base = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
for (const p of paths) {
  const name = p.replace(/\//g, "_").replace(/^_/, "") || "root";
  for (const [label, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(base + p, { waitUntil: "networkidle", timeout: 90000 });
    // scroll through to trigger lazy images, then back to top
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      if (document.documentElement.scrollWidth > vw) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 0) out.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(r.right)}`);
          if (out.length > 12) break;
        }
        out.unshift(`scrollWidth ${document.documentElement.scrollWidth} > ${vw}`);
      }
      return out;
    });
    if (overflow.length) console.log(`[${p} ${label}] OVERFLOW:\n  ` + overflow.join("\n  "));
    await page.screenshot({ path: `${outDir}/${name}-${label}.png`, fullPage: true });
    if (errors.length) console.log(`[${p} ${label}] console errors:\n  ` + errors.join("\n  "));
    await ctx.close();
  }
  console.log("shot", p);
}
await browser.close();
