#!/usr/bin/env node

import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(`Invalid argument pair starting at ${key ?? "<missing>"}`);
    }
    args[key.slice(2)] = value;
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const mode = args.mode ?? "screenshot";
const url = args.url;
const output = args.output;
const waitUntil = args.waitUntil ?? "networkidle";
const waitMs = Number(args.waitMs ?? "0");
const width = Number(args.width ?? "1440");
const height = Number(args.height ?? "900");

if (!url || !output) {
  throw new Error("--url and --output are required");
}

if (!["screenshot", "video"].includes(mode)) {
  throw new Error(`Unsupported mode: ${mode}`);
}

await mkdir(mode === "video" ? output : path.dirname(output), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  ...(mode === "video" ? { recordVideo: { dir: output, size: { width, height } } } : {})
});

const page = await context.newPage();
await page.goto(url, { waitUntil });

if (waitMs > 0) {
  await page.waitForTimeout(waitMs);
}

if (mode === "screenshot") {
  await page.screenshot({ path: output, fullPage: true });
  console.log(output);
} else {
  await context.close();
  const videoPath = await page.video().path();
  console.log(videoPath);
  await browser.close();
  process.exit(0);
}

await context.close();
await browser.close();
