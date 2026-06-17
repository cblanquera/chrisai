#!/usr/bin/env node

//node
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { resolve, relative, join, extname, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_IGNORES = new Set([
  '.git',
  '.hg',
  '.svn',
  '.next',
  '.nuxt',
  '.svelte-kit',
  '.turbo',
  '.vercel',
  '.cache',
  'coverage',
  'dist',
  'build',
  'out',
  'node_modules'
]);

const TEXT_EXTENSIONS = new Set([
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.html',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
  '.json'
]);

const CONFIG_NAMES = new Set([
  'tailwind.config.js',
  'tailwind.config.cjs',
  'tailwind.config.mjs',
  'tailwind.config.ts',
  'theme.js',
  'theme.ts',
  'tokens.js',
  'tokens.ts',
  'tokens.json'
]);

const CSS_LIKE_EXTENSIONS = new Set([
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.html'
]);

function parseArgs(argv) {
  const args = {
    maxFiles: 800,
    out: null,
    root: process.cwd()
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--out') {
      args.out = argv[index + 1];
      index += 1;
    } else if (value === '--max-files') {
      args.maxFiles = Number.parseInt(argv[index + 1], 10);
      index += 1;
    } else if (value === '--help' || value === '-h') {
      printHelp();
      process.exit(0);
    } else {
      args.root = value;
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  scan-project-design-system.mjs [project-root] [--out report.json] [--max-files 800]

Scans local project files for objective design-system evidence such as CSS
variables, colors, fonts, spacing, radii, shadows, breakpoints, and likely UI
component files.`);
}

function pushCount(map, key) {
  const normalized = key.trim();
  if (!normalized) {
    return;
  }
  map.set(normalized, (map.get(normalized) || 0) + 1);
}

function topEntries(map, limit = 40) {
  return [...map.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ count, value }));
}

function shouldReadFile(path) {
  const name = basename(path);
  const extension = extname(path).toLowerCase();
  return TEXT_EXTENSIONS.has(extension) || CONFIG_NAMES.has(name);
}

function walk(root, maxFiles) {
  const files = [];
  const stack = [root];

  while (stack.length > 0 && files.length < maxFiles) {
    const current = stack.pop();
    let stat;
    try {
      stat = statSync(current);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      const name = basename(current);
      if (DEFAULT_IGNORES.has(name)) {
        continue;
      }
      for (const child of readdirSync(current)) {
        stack.push(join(current, child));
      }
      continue;
    }

    if (stat.isFile() && stat.size <= 1_000_000 && shouldReadFile(current)) {
      files.push(current);
    }
  }

  return files.sort();
}

function extractMatches(text, pattern, callback) {
  for (const match of text.matchAll(pattern)) {
    callback(match);
  }
}

function scanFile(root, path, report) {
  const relPath = relative(root, path);
  const text = readFileSync(path, 'utf8');
  const name = basename(path);
  const extension = extname(path).toLowerCase();

  if (CONFIG_NAMES.has(name)) {
    report.configFiles.push(relPath);
  }

  extractMatches(text, /--([a-zA-Z0-9-_]+)\s*:\s*([^;}{]+)/g, match => {
    report.cssVariables.push({
      file: relPath,
      name: `--${match[1]}`,
      value: match[2].trim()
    });
  });

  extractMatches(
    text,
    /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|rgba?\([^)]+\)|hsla?\([^)]+\)/g,
    match => {
      const color = match[0];
      if (color !== 'rgba(0, 0, 0, 0)' && color !== 'rgba(0,0,0,0)') {
        pushCount(report.counts.colors, color);
      }
    }
  );

  if (CSS_LIKE_EXTENSIONS.has(extension)) {
    extractMatches(text, /font-family\s*:\s*([^;}{]+)/g, match => {
      pushCount(report.counts.fontFamilies, match[1].replace(/\s+/g, ' '));
    });

    extractMatches(text, /(?:margin|padding|gap|inset|top|right|bottom|left)\s*:\s*([^;}{]+)/g, match => {
      pushCount(report.counts.spacing, match[1].replace(/\s+/g, ' '));
    });

    extractMatches(text, /border-radius\s*:\s*([^;}{]+)/g, match => {
      pushCount(report.counts.radii, match[1].replace(/\s+/g, ' '));
    });

    extractMatches(text, /box-shadow\s*:\s*([^;}{]+)/g, match => {
      pushCount(report.counts.shadows, match[1].replace(/\s+/g, ' '));
    });

    extractMatches(text, /@media\s*([^{]+)/g, match => {
      pushCount(report.counts.breakpoints, match[1].replace(/\s+/g, ' '));
    });
  }

  extractMatches(text, /fontFamily\s*[:=]\s*([^,\n}]+)/g, match => {
    pushCount(report.counts.fontFamilies, match[1].replace(/\s+/g, ' '));
  });

  if (/\b(?:export\s+)?(?:default\s+)?function\s+[A-Z][A-Za-z0-9]*|\bconst\s+[A-Z][A-Za-z0-9]*\s*=|\bclassName=|\bclsx\(/.test(text)) {
    report.likelyComponentFiles.push(relPath);
  }
}

function buildSummary(report) {
  return {
    root: report.root,
    scannedFiles: report.scannedFiles,
    configFiles: report.configFiles.slice(0, 40),
    cssVariables: report.cssVariables.slice(0, 120),
    likelyComponentFiles: report.likelyComponentFiles.slice(0, 120),
    colors: topEntries(report.counts.colors),
    fontFamilies: topEntries(report.counts.fontFamilies),
    spacing: topEntries(report.counts.spacing),
    radii: topEntries(report.counts.radii),
    shadows: topEntries(report.counts.shadows, 20),
    breakpoints: topEntries(report.counts.breakpoints, 20)
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = resolve(args.root);

  if (!existsSync(root)) {
    console.error(`Project root does not exist: ${root}`);
    process.exit(1);
  }

  const report = {
    configFiles: [],
    counts: {
      breakpoints: new Map(),
      colors: new Map(),
      fontFamilies: new Map(),
      radii: new Map(),
      shadows: new Map(),
      spacing: new Map()
    },
    cssVariables: [],
    likelyComponentFiles: [],
    root,
    scannedFiles: 0
  };

  for (const file of walk(root, args.maxFiles)) {
    try {
      scanFile(root, file, report);
      report.scannedFiles += 1;
    } catch {
      // Binary or unreadable files are ignored; this script extracts evidence only.
    }
  }

  const summary = buildSummary(report);
  const output = `${JSON.stringify(summary, null, 2)}\n`;

  if (args.out) {
    writeFileSync(resolve(args.out), output);
  } else {
    process.stdout.write(output);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
