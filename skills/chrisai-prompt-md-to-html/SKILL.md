---
name: chrisai-prompt-md-to-html
description: Use when an agent should turn a Markdown or Codex text response into a deterministic single-file HTML artifact using the bundled renderer, fixed layouts, optional validated theme colors, syntax highlighting, Mermaid support, and safe fallbacks instead of hand-authoring arbitrary HTML.
---

# ChrisAI Prompt Markdown To HTML

Use this skill when a Markdown or Codex text response should become a
reviewable, shareable, self-contained HTML file.

The renderer owns the HTML, CSS, and JavaScript. The agent owns the source
Markdown, layout choice, theme options, output path, and verification.

## Portability

Write portable artifact guidance first. Do not assume Codex-only behavior unless
the host environment differs.

Write new HTML artifacts to the current conversation asset folder by default
when the host exposes one. In Codex, this usually means the per-chat folder
under `~/Documents/Codex/<date-folder>/<chat-folder>/`.

Use a user-provided path when the user explicitly asks for one. Only fall back
to the current working directory when no conversation asset folder or task
artifact folder is available.

## Ownership

This skill owns:

- deterministic Markdown-to-HTML artifact generation
- fixed layout selection
- validated theme options
- syntax-highlighted code blocks
- Mermaid fenced-block support
- single-file HTML output with embedded CSS and conditional JavaScript

This skill does not own:

- production website implementation
- open-ended visual design exploration
- hand-authored arbitrary HTML/CSS/JS
- PDF, DOCX, slide, or image export

Use a design, document, presentation, or spreadsheet skill when the target
artifact format is not HTML.

## Workflow

Work through these steps in order:

1. choose the output path
2. choose one fixed layout
3. collect optional theme options
4. write the Markdown input
5. run the bundled renderer
6. verify the HTML artifact

Do not manually assemble the final HTML unless the renderer cannot run and the
user accepts that fallback.

## Step 1: Choose The Output Path

Prefer the current conversation asset folder as the initial output location when
the host exposes one.

In Codex, this is usually a per-chat folder under
`~/Documents/Codex/<date-folder>/<chat-folder>/`.

If there is no conversation asset folder, use the host's task artifact folder
when available. If neither exists, create the HTML in the current working
directory unless the user provided a path.

Do not create the initial HTML artifact inside the project repository just
because the repository is the current working directory.

Use clear filenames such as:

- `response-artifact.html`
- `review-report.html`
- `implementation-brief.html`

## Step 2: Choose One Fixed Layout

Supported layouts:

- `article` for long-form prose and explanations
- `brief` for concise summaries and decision notes
- `report` for findings, tables, status, and recommendations
- `dashboard` for metrics, comparisons, and scannable status sections

Read [layouts](references/layouts.md) when the layout choice is unclear.

## Step 3: Collect Optional Theme Options

Supported options:

- `--theme light|dark|auto`
- `--accent #RRGGBB`
- `--background #RRGGBB`
- `--text #RRGGBB`
- `--density comfortable|compact`
- `--title "Artifact Title"`

Read [theme options](references/theme-options.md) when the user asks for custom
colors or density.

Do not pass arbitrary CSS, arbitrary JavaScript, remote assets, or unvalidated
color strings to the renderer.

## Step 4: Write The Markdown Input

Use normal Codex Markdown:

- headings
- paragraphs
- ordered and unordered lists
- task lists
- blockquotes and callout-like blockquotes
- fenced code blocks
- diff fences
- tables
- links and images
- Mermaid fenced blocks
- plain text fallback

Read [Markdown mapping](references/markdown-mapping.md) before relying on a
specific visual treatment.

Raw HTML in Markdown is escaped by default. Prefer Markdown structures or
supported fenced blocks instead.

## Step 5: Run The Renderer

From the skill directory:

```bash
node scripts/md_to_html_artifact.mjs input.md output.html --layout report --theme auto
```

From another directory, use an absolute or relative path to the script:

```bash
node /path/to/chrisai-prompt-md-to-html/scripts/md_to_html_artifact.mjs input.md output.html --layout article --accent '#2563eb'
```

The script is bundled for installed-skill use and should run without installing
local npm dependencies. Mermaid support uses the packaged browser runtime in
`assets/mermaid.min.js` and inlines it into the output only when a Mermaid fence
is present.

Do not run files under `scripts/src/` during normal skill use. That directory is
for repository maintenance and build updates.

## Step 6: Verify The Artifact

Before presenting the artifact as ready:

- confirm the output file exists
- confirm the document title and primary content rendered
- confirm unsupported raw HTML was escaped
- confirm code blocks are highlighted or safely shown as code
- confirm Mermaid support is present when Mermaid fences exist
- open or render the file when browser tooling is available

When verifying in the Codex in-app browser, prefer opening the generated file
directly with a `file://` URL. Start a local preview server only if the browser
tool cannot open local files, file access is blocked, or the artifact depends on
HTTP-only behavior.

When a preview server is required, treat any server started by the agent as
agent-owned. Stop it before the final response unless it must remain open for
user review. Use a 15-minute default timeout, 5 minutes for quick verification,
or 30 minutes for user review, and report whether the server was stopped, left
running with its URL and timeout, or was pre-existing and left alone.

Report the output path, selected layout, selected theme, and any unsupported
input that degraded to plain text.

## Hard Rules

- The renderer emits the final HTML file.
- Keep output self-contained in one `.html` file.
- Do not allow arbitrary CSS or JavaScript through user options.
- Do not load remote JavaScript.
- Escape raw HTML by default.
- Keep layout names fixed until the renderer and references are updated
  together.
