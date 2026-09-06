#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const HELP = `Usage:
  node compose-brand-asset.mjs \\
    --base <visual-plate> \\
    --asset <protected-brand-asset> \\
    --out <output.svg> \\
    --canvas-width <pixels> --canvas-height <pixels> \\
    --x <pixels> --y <pixels> --width <pixels> --height <pixels> \\
    [--panel-x <pixels> --panel-y <pixels> \\
     --panel-width <pixels> --panel-height <pixels> \\
     --panel-fill <color> --panel-radius <pixels>]

The asset is embedded unchanged and rendered with preserveAspectRatio. The
output is a self-contained SVG. Optional panel dimensions must be supplied as
a complete set.`;

function parseArgs(argv) {
  const values = {};

  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help" || key === "-h") {
      console.log(HELP);
      process.exit(0);
    }
    if (!key.startsWith("--") || index + 1 >= argv.length) {
      throw new Error(`Invalid argument near ${key}\n\n${HELP}`);
    }
    values[key.slice(2)] = argv[index + 1];
    index += 1;
  }

  return values;
}

function required(values, key) {
  const value = values[key];
  if (value === undefined || value === "") {
    throw new Error(`Missing --${key}\n\n${HELP}`);
  }
  return value;
}

function number(values, key, { positive = false } = {}) {
  const raw = required(values, key);
  const value = Number(raw);
  if (!Number.isFinite(value) || (positive && value <= 0)) {
    throw new Error(`--${key} must be ${positive ? "a positive" : "a finite"} number`);
  }
  return value;
}

function mimeType(path) {
  const extension = extname(path).toLowerCase();
  const types = {
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  const mime = types[extension];
  if (!mime) {
    throw new Error(`Unsupported image format: ${extension || "unknown"}`);
  }
  return mime;
}

function dataUri(path, buffer) {
  return `data:${mimeType(path)};base64,${buffer.toString("base64")}`;
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function optionalPanel(values) {
  const keys = ["panel-x", "panel-y", "panel-width", "panel-height"];
  const supplied = keys.filter((key) => values[key] !== undefined);
  if (supplied.length === 0) return "";
  if (supplied.length !== keys.length) {
    throw new Error(`Optional panel requires ${keys.map((key) => `--${key}`).join(", ")}`);
  }

  const x = number(values, "panel-x");
  const y = number(values, "panel-y");
  const width = number(values, "panel-width", { positive: true });
  const height = number(values, "panel-height", { positive: true });
  const fill = escapeAttribute(values["panel-fill"] ?? "#ffffff");
  const radius = values["panel-radius"] === undefined
    ? 0
    : number(values, "panel-radius");

  return `  <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" />\n`;
}

async function main() {
  const values = parseArgs(process.argv.slice(2));
  const basePath = resolve(required(values, "base"));
  const assetPath = resolve(required(values, "asset"));
  const outputPath = resolve(required(values, "out"));
  const canvasWidth = number(values, "canvas-width", { positive: true });
  const canvasHeight = number(values, "canvas-height", { positive: true });
  const x = number(values, "x");
  const y = number(values, "y");
  const width = number(values, "width", { positive: true });
  const height = number(values, "height", { positive: true });

  const [base, asset] = await Promise.all([
    readFile(basePath),
    readFile(assetPath),
  ]);
  const panel = optionalPanel(values);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}">
  <image href="${dataUri(basePath, base)}" x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" preserveAspectRatio="xMidYMid meet" />
${panel}  <image href="${dataUri(assetPath, asset)}" x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMinYMin meet" />
</svg>
`;

  await mkdir(resolve(outputPath, ".."), { recursive: true });
  await writeFile(outputPath, svg, "utf8");
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
