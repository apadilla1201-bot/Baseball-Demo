// Convert generated PNGs into web JPGs. usage: node scripts/process-images.mjs <srcdir>
import sharp from "sharp";
import { existsSync } from "node:fs";

const src = process.argv[2];
const out = "public/images";
const jobs = [
  ["00.png", "hero.jpg", 2200],
  ["01.png", "bullpen.jpg", 1800, { left: 0.12 }],
  ["03.png", "radar.jpg", 1800],
  ["15.png", "coach.jpg", 1400],
  ["04.png", "college-navy.jpg", 1400],
  ["05b.png", "college-maroon.jpg", 1400],
  ["06b.png", "college-green.jpg", 1400],
  ["07b.png", "wall-1.jpg", 900],
  ["08.png", "wall-2.jpg", 900],
  ["09p.png", "wall-3.jpg", 900],
  ["10b.png", "wall-4.jpg", 900],
  ["11p.png", "wall-5.jpg", 900],
  ["12.png", "wall-6.jpg", 900],
  ["02c.png", "coach-tablet.jpg", 1800],
  ["13.png", "facility.jpg", 2200],
  ["14.png", "remote.jpg", 1800],
  ["16.png", "parents.jpg", 1800],
  ["17.png", "armcare.jpg", 1800],
  ["18.png", "grip.jpg", 1800],
  ["19.png", "catcher.jpg", 1800],
];
for (const [inName, outName, width, crop] of jobs) {
  const p = `${src}/${inName}`;
  if (!existsSync(p)) { console.log("skip", inName); continue; }
  let img = sharp(p);
  if (crop?.left) {
    const meta = await img.metadata();
    const left = Math.round(meta.width * crop.left);
    img = img.extract({ left, top: 0, width: meta.width - left, height: meta.height });
  }
  await img.resize({ width, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${out}/${outName}`);
  console.log("ok", outName);
}
