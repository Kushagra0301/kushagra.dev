
import { existsSync, mkdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "shots");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function findChrome() {
  const hit = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!hit) {
    throw new Error(
      "No Chrome or Edge binary found. Set CHROME_PATH to your browser executable."
    );
  }
  return hit;
}

async function loadProjects() {
  const source = await readFile(
    path.join(root, "content", "projects.ts"),
    "utf8"
  );
  const entries = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?liveUrl:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(source))) {
    entries.push({ slug: match[1], url: match[2] });
  }
  return entries;
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const projects = await loadProjects();
const queue = projects.filter((p) => {
  if (only.length && !only.includes(p.slug)) return false;
  if (force || only.length) return true;
  return !existsSync(path.join(outDir, `${p.slug}.webp`));
});

if (queue.length === 0) {
  console.log("All shots already captured. Pass --force to redo them.");
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--hide-scrollbars", "--disable-features=IsolateOrigins,site-per-process"],
});

let ok = 0;
let failed = 0;

for (const project of queue) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  try {
    await page.goto(project.url, {
      waitUntil: "networkidle2",
      timeout: 60_000,
    });

    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 2500));

    await page.screenshot({
      path: path.join(outDir, `${project.slug}.webp`),
      type: "webp",
      quality: 88,
    });

    console.log(`  captured  ${project.slug}`);
    ok += 1;
  } catch (err) {
    console.error(`  FAILED    ${project.slug}: ${err.message}`);
    failed += 1;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\n${ok} captured, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
