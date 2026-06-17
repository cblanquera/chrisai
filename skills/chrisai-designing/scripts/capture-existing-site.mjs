#!/usr/bin/env node

//node
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

function parseArgs(argv) {
  const args = {
    outDir: 'site-capture',
    url: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--out-dir') {
      args.outDir = argv[index + 1];
      index += 1;
    } else if (value === '--help' || value === '-h') {
      printHelp();
      process.exit(0);
    } else if (!args.url) {
      args.url = value;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  capture-existing-site.mjs <url> [--out-dir site-capture]

Captures desktop and mobile screenshots plus objective page evidence such as
headings, buttons, nav labels, colors, and font families. Requires Playwright
to be available in the current Node environment.`);
}

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch (error) {
    console.error('Playwright is not available in this Node environment.');
    console.error('Install Playwright for this project or use the QA/browser tooling already available.');
    console.error(`Original error: ${error.message}`);
    process.exit(2);
  }
}

function safeName(value) {
  return value
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'page';
}

async function extractEvidence(page) {
  return page.evaluate(() => {
    const visibleText = element => {
      const style = window.getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return '';
      }
      return (element.innerText || element.textContent || '').trim().replace(/\s+/g, ' ');
    };

    const sample = selector => [...document.querySelectorAll(selector)]
      .map(visibleText)
      .filter(Boolean)
      .slice(0, 80);

    const colorCounts = new Map();
    const fontCounts = new Map();

    for (const element of [...document.querySelectorAll('body *')].slice(0, 800)) {
      const style = window.getComputedStyle(element);
      [style.color, style.backgroundColor, style.borderColor].forEach(color => {
        if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
          colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
        }
      });
      if (style.fontFamily) {
        fontCounts.set(style.fontFamily, (fontCounts.get(style.fontFamily) || 0) + 1);
      }
    }

    const sorted = map => [...map.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 30)
      .map(([value, count]) => ({ count, value }));

    return {
      buttons: sample('button, [role="button"], input[type="button"], input[type="submit"], a.button, a[class*="button"], a[class*="btn"]'),
      colors: sorted(colorCounts),
      fonts: sorted(fontCounts),
      headings: sample('h1, h2, h3, h4, h5, h6'),
      links: sample('a'),
      nav: sample('nav a, header a, [role="navigation"] a'),
      title: document.title,
      url: window.location.href
    };
  });
}

async function captureViewport(browser, url, outDir, name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
  const evidence = await extractEvidence(page);
  const screenshot = `${name}-${viewport.width}x${viewport.height}.png`;
  await page.screenshot({ fullPage: true, path: join(outDir, screenshot) });
  await page.close();
  return { evidence, screenshot, viewport };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.url) {
    printHelp();
    process.exit(1);
  }

  const outDir = resolve(args.outDir);
  mkdirSync(outDir, { recursive: true });

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch();

  try {
    const name = safeName(args.url);
    const captures = [];
    captures.push(await captureViewport(browser, args.url, outDir, name, {
      height: 900,
      width: 1440
    }));
    captures.push(await captureViewport(browser, args.url, outDir, name, {
      height: 844,
      width: 390
    }));

    const report = {
      capturedAt: new Date().toISOString(),
      captures,
      url: args.url
    };

    writeFileSync(join(outDir, 'site-evidence.json'), `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Captured ${captures.length} viewport(s) into ${outDir}`);
  } finally {
    await browser.close();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
