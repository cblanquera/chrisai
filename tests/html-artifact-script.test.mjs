import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skill = path.join(
  root,
  "skills",
  "chrisai-prompt-md-to-html",
);

test("renders a self-contained HTML artifact from Codex-style Markdown", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "chrisai-prompt-md-to-html-"));
  const installedSkill = path.join(tmp, "installed-skill");
  const input = path.join(tmp, "input.md");
  const output = path.join(tmp, "output.html");
  const installedScript = path.join(
    installedSkill,
    "scripts",
    "md_to_html_artifact.mjs",
  );

  fs.cpSync(skill, installedSkill, { recursive: true });

  fs.writeFileSync(
    input,
    [
      "# Renderer Test",
      "",
      "## Status",
      "",
      "- [x] Task lists",
      "",
      "> Warning: Important note.",
      "",
      "<script>alert(1)</script>",
      "",
      "| Feature | State |",
      "| --- | --- |",
      "| Table | OK |",
      "",
      "```js",
      "console.log('highlighted');",
      "```",
      "",
      "```mermaid",
      "flowchart TD",
      "  A --> B",
      "```",
      "",
    ].join("\n"),
    "utf8",
  );

  execFileSync(
    process.execPath,
    [
      installedScript,
      input,
      output,
      "--layout",
      "report",
      "--theme",
      "auto",
      "--accent",
      "#0f766e",
    ],
    { cwd: root, stdio: "pipe" },
  );

  const html = fs.readFileSync(output, "utf8");
  assert.match(html, /<title>Renderer Test<\/title>/);
  assert.match(html, /class="task-list-item"/);
  assert.match(html, /class="callout callout-warning"/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /class="table-wrap"/);
  assert.match(html, /class="hljs language-js"/);
  assert.match(html, /class="mermaid"/);
  assert.match(html, /mermaid\.initialize/);
  assert.doesNotMatch(html, /cdn\.jsdelivr/);
});
