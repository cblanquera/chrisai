#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as esbuild from "esbuild";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillDir = path.join(root, "skills", "chrisai-prompt-md-to-html");
const source = path.join(
  skillDir,
  "scripts",
  "src",
  "md_to_html_artifact.source.mjs",
);
const output = path.join(skillDir, "scripts", "md_to_html_artifact.mjs");
const mermaidSource = path.join(root, "node_modules", "mermaid", "dist", "mermaid.min.js");
const mermaidOutput = path.join(skillDir, "assets", "mermaid.min.js");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.mkdirSync(path.dirname(mermaidOutput), { recursive: true });
fs.copyFileSync(mermaidSource, mermaidOutput);

await esbuild.build({
  absWorkingDir: root,
  bundle: true,
  entryPoints: [source],
  format: "esm",
  platform: "node",
  outfile: output,
  target: "node18",
});

fs.chmodSync(output, 0o755);
console.log(`Built ${path.relative(root, output)}`);
