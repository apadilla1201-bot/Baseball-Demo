import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const failed = [];
page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().slice(0, 120)}`); });
await page.goto("http://localhost:3000/en", { waitUntil: "networkidle" });
const info = await page.evaluate(() => {
  const img = document.querySelector("section img");
  const r = img?.getBoundingClientRect();
  const wrap = img?.parentElement;
  const wr = wrap?.getBoundingClientRect();
  const btn = document.querySelector("header a.btn");
  return {
    img: img && { src: img.currentSrc.slice(0, 100), nw: img.naturalWidth, rect: [r.x, r.y, r.width, r.height], complete: img.complete },
    wrap: wrap && { cls: wrap.className, pos: getComputedStyle(wrap).position, rect: [wr.x, wr.y, wr.width, wr.height], h: getComputedStyle(wrap).height },
    btn: btn && { display: getComputedStyle(btn).display },
  };
});
console.log(JSON.stringify(info, null, 1));
console.log("failed:", failed.slice(0, 5));
await browser.close();
