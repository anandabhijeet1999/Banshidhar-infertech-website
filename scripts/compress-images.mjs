import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOTS = [
  "public/assets/images",
  "public/assets/icons",
  "public/assets/Background",
];
const EXTS = new Set([".png", ".jpg", ".jpeg"]);
const MAX_WIDTH = 1920;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

let totalBefore = 0;
let totalAfter = 0;
const converted = [];

for (const root of ROOTS) {
  let files;
  try {
    files = await walk(root);
  } catch {
    continue;
  }
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const before = (await fs.stat(file)).size;
    const target = file.slice(0, -ext.length) + ".webp";

    const img = sharp(file);
    const meta = await img.metadata();
    const pipeline =
      meta.width && meta.width > MAX_WIDTH
        ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true })
        : img;

    await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(target);
    const after = (await fs.stat(target)).size;

    totalBefore += before;
    totalAfter += after;
    converted.push({ file, target, before, after });

    await fs.unlink(file);
  }
}

const fmt = (n) => (n / 1024).toFixed(0) + " KB";
const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(`Converted ${converted.length} files`);
console.log(`Before: ${fmt(totalBefore)}  After: ${fmt(totalAfter)}  Saved: ${pct}%`);
for (const r of converted.sort((a, b) => b.before - a.before).slice(0, 10)) {
  console.log(`  ${r.file}: ${fmt(r.before)} -> ${fmt(r.after)}`);
}
