#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import hljs from "highlight.js/lib/common";
import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";

const layouts = new Set(["article", "brief", "report", "dashboard"]);
const themes = new Set(["light", "dark", "auto"]);
const densities = new Set(["comfortable", "compact"]);
const hexColorPattern = /^#[0-9a-fA-F]{6}$/;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));

function usage() {
  return [
    "Usage:",
    "  node md_to_html_artifact.mjs input.md output.html [options]",
    "",
    "Options:",
    "  --layout article|brief|report|dashboard",
    "  --theme light|dark|auto",
    "  --accent #RRGGBB",
    "  --background #RRGGBB",
    "  --text #RRGGBB",
    "  --density comfortable|compact",
    "  --title \"Artifact Title\"",
  ].join("\n");
}

function parseArgs(argv) {
  const args = [...argv];
  if (args.length < 2 || args.includes("--help") || args.includes("-h")) {
    console.log(usage());
    process.exit(args.length < 2 ? 1 : 0);
  }

  const input = args.shift();
  const output = args.shift();
  const options = {
    layout: "report",
    theme: "auto",
    accent: "#2563eb",
    background: null,
    text: null,
    density: "comfortable",
    title: null,
  };

  while (args.length > 0) {
    const flag = args.shift();
    const value = args.shift();
    if (!value) {
      throw new Error(`Missing value for ${flag}`);
    }

    switch (flag) {
      case "--layout":
        if (!layouts.has(value)) {
          throw new Error(`Unsupported layout: ${value}`);
        }
        options.layout = value;
        break;
      case "--theme":
        if (!themes.has(value)) {
          throw new Error(`Unsupported theme: ${value}`);
        }
        options.theme = value;
        break;
      case "--accent":
      case "--background":
      case "--text": {
        if (!hexColorPattern.test(value)) {
          throw new Error(`${flag} must be a six-digit hex color, got ${value}`);
        }
        options[flag.slice(2)] = value;
        break;
      }
      case "--density":
        if (!densities.has(value)) {
          throw new Error(`Unsupported density: ${value}`);
        }
        options.density = value;
        break;
      case "--title":
        options.title = value;
        break;
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }

  return { input, output, options };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugify(value) {
  const slug = value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

function extractTitle(markdown, explicitTitle) {
  if (explicitTitle) {
    return explicitTitle;
  }

  const match = markdown.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim().replace(/`/g, "");
  }

  return "HTML Artifact";
}

function stripFirstTitle(markdown) {
  return markdown.replace(/^#\s+.+\r?\n+/, "");
}

function makeMarkdownRenderer(state) {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: false,
    highlight(code, language) {
      const normalized = language ? language.trim().toLowerCase() : "";
      if (normalized === "mermaid") {
        state.hasMermaid = true;
        return `<pre class="mermaid">${escapeHtml(code)}</pre>`;
      }

      if (normalized && hljs.getLanguage(normalized)) {
        const highlighted = hljs.highlight(code, { language: normalized }).value;
        return `<pre class="code-block"><code class="hljs language-${escapeHtml(normalized)}">${highlighted}</code></pre>`;
      }

      const highlighted = hljs.highlightAuto(code).value;
      return `<pre class="code-block"><code class="hljs">${highlighted}</code></pre>`;
    },
  });

  md.enable("table");
  md.use(taskLists, { enabled: false, label: true, labelAfter: true });

  const defaultHeadingOpen = md.renderer.rules.heading_open;
  md.renderer.rules.heading_open = (tokens, index, options, env, self) => {
    const nextToken = tokens[index + 1];
    const text = nextToken?.content || "";
    const id = slugify(text);
    tokens[index].attrSet("id", id);
    return defaultHeadingOpen
      ? defaultHeadingOpen(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
  };

  const defaultTableOpen = md.renderer.rules.table_open;
  const defaultTableClose = md.renderer.rules.table_close;
  md.renderer.rules.table_open = (tokens, index, options, env, self) => {
    const table = defaultTableOpen
      ? defaultTableOpen(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
    return `<div class="table-wrap">${table}`;
  };
  md.renderer.rules.table_close = (tokens, index, options, env, self) => {
    const table = defaultTableClose
      ? defaultTableClose(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
    return `${table}</div>`;
  };

  const defaultBlockquoteOpen = md.renderer.rules.blockquote_open;
  md.renderer.rules.blockquote_open = (tokens, index, options, env, self) => {
    let kind = "note";
    for (let cursor = index + 1; cursor < tokens.length; cursor += 1) {
      const token = tokens[cursor];
      if (token.type === "blockquote_close") {
        break;
      }
      if (token.type === "inline") {
        const match = token.content.match(/^\s*(note|tip|warning|error|success):/i);
        if (match) {
          kind = match[1].toLowerCase();
        }
        break;
      }
    }

    tokens[index].attrJoin("class", `callout callout-${kind}`);
    return defaultBlockquoteOpen
      ? defaultBlockquoteOpen(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
  };

  const defaultLinkOpen = md.renderer.rules.link_open;
  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const href = tokens[index].attrGet("href") || "";
    if (/^javascript:/i.test(href)) {
      tokens[index].attrSet("href", "#");
    }
    tokens[index].attrSet("rel", "noreferrer");
    return defaultLinkOpen
      ? defaultLinkOpen(tokens, index, options, env, self)
      : self.renderToken(tokens, index, options);
  };

  return md;
}

function buildStyles(options) {
  const background = options.background || (options.theme === "dark" ? "#0f172a" : "#ffffff");
  const text = options.text || (options.theme === "dark" ? "#e5e7eb" : "#111827");
  const surface = options.theme === "dark" ? "#111827" : "#f8fafc";
  const border = options.theme === "dark" ? "#334155" : "#e5e7eb";
  const muted = options.theme === "dark" ? "#94a3b8" : "#64748b";
  const maxWidth = {
    article: "840px",
    brief: "760px",
    report: "1040px",
    dashboard: "1180px",
  }[options.layout];
  const densitySize = options.density === "compact" ? "0.82rem" : "1rem";
  const densityGap = options.density === "compact" ? "1rem" : "1.5rem";

  return `
:root {
  color-scheme: ${options.theme === "dark" ? "dark" : "light"};
  --accent: ${options.accent};
  --background: ${background};
  --text: ${text};
  --surface: ${surface};
  --border: ${border};
  --muted: ${muted};
  --max-width: ${maxWidth};
  --density-size: ${densitySize};
  --density-gap: ${densityGap};
}

${options.theme === "auto" ? `
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --background: ${options.background || "#0f172a"};
    --text: ${options.text || "#e5e7eb"};
    --surface: #111827;
    --border: #334155;
    --muted: #94a3b8;
  }
}
` : ""}

* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--background);
  color: var(--text);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: var(--density-size);
  line-height: 1.65;
}
.page {
  width: min(calc(100% - 32px), var(--max-width));
  margin: 0 auto;
  padding: ${options.density === "compact" ? "32px 0" : "56px 0"};
}
.artifact-header {
  border-bottom: 1px solid var(--border);
  margin-bottom: calc(var(--density-gap) * 1.6);
  padding-bottom: var(--density-gap);
}
.eyebrow {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 0.4rem;
  text-transform: uppercase;
}
h1, h2, h3, h4, h5, h6 {
  color: var(--text);
  line-height: 1.2;
  margin: calc(var(--density-gap) * 1.5) 0 0.65rem;
}
h1 { font-size: clamp(2rem, 6vw, 4rem); margin-top: 0; }
h2 { border-top: 1px solid var(--border); font-size: 1.75rem; padding-top: var(--density-gap); }
h3 { font-size: 1.25rem; }
p, ul, ol, blockquote, pre, table { margin: 0 0 var(--density-gap); }
a { color: var(--accent); text-decoration-thickness: 0.08em; text-underline-offset: 0.18em; }
hr { border: 0; border-top: 1px solid var(--border); margin: calc(var(--density-gap) * 2) 0; }
ul, ol { padding-left: 1.4rem; }
li + li { margin-top: 0.25rem; }
input[type="checkbox"] { accent-color: var(--accent); margin-right: 0.45rem; }
.callout {
  background: color-mix(in srgb, var(--accent) 8%, var(--surface));
  border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--border));
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  padding: 1rem 1.1rem;
}
.callout-warning { border-left-color: #d97706; }
.callout-error { border-left-color: #dc2626; }
.callout-success { border-left-color: #16a34a; }
.table-wrap {
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: var(--density-gap);
  overflow-x: auto;
}
table { border-collapse: collapse; margin: 0; min-width: 100%; }
th, td { border-bottom: 1px solid var(--border); padding: 0.7rem 0.8rem; text-align: left; vertical-align: top; }
th { background: var(--surface); font-weight: 700; }
tr:last-child td { border-bottom: 0; }
code {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 0.9em;
  padding: 0.1rem 0.3rem;
}
.code-block, .mermaid {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 8px;
  color: #e5e7eb;
  overflow-x: auto;
  padding: 1rem;
}
.code-block code {
  background: transparent;
  border: 0;
  color: inherit;
  display: block;
  padding: 0;
}
img { border-radius: 8px; height: auto; max-width: 100%; }
.layout-dashboard main {
  display: grid;
  gap: var(--density-gap);
}
.layout-dashboard h2 {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
  padding: 1rem;
}
.layout-dashboard h2 + p,
.layout-dashboard h2 + ul,
.layout-dashboard h2 + ol,
.layout-dashboard h2 + .table-wrap {
  border: 1px solid var(--border);
  border-radius: 0 0 8px 8px;
  border-top: 0;
  padding: 1rem;
}
`;
}

function loadMermaidRuntime() {
  const runtimePath = path.resolve(scriptDir, "../assets/mermaid.min.js");
  return fs.readFileSync(runtimePath, "utf8");
}

function buildHtml({ title, body, options, hasMermaid }) {
  const mermaidScript = hasMermaid
    ? `<script>${loadMermaidRuntime()}</script><script>mermaid.initialize({ startOnLoad: true, theme: "default" });</script>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${buildStyles(options)}</style>
</head>
<body class="layout-${options.layout}">
<div class="page">
<header class="artifact-header">
<p class="eyebrow">${escapeHtml(options.layout)} artifact</p>
<h1>${escapeHtml(title)}</h1>
</header>
<main>
${body}
</main>
</div>
${mermaidScript}
</body>
</html>
`;
}

function main() {
  try {
    const { input, output, options } = parseArgs(process.argv.slice(2));
    const markdown = fs.readFileSync(input, "utf8");
    const title = extractTitle(markdown, options.title);
    const state = { hasMermaid: false };
    const renderer = makeMarkdownRenderer(state);
    const body = renderer.render(stripFirstTitle(markdown));
    const html = buildHtml({ title, body, options, hasMermaid: state.hasMermaid });

    fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
    fs.writeFileSync(output, html, "utf8");
    console.log(`Wrote ${output}`);
  } catch (error) {
    console.error(error.message);
    console.error("");
    console.error(usage());
    process.exit(1);
  }
}

main();
