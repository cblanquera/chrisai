# ChrisAI

ChrisAI is a portable skill distribution for AI coding agents. It packages the
ChrisAI coding, documentation, design, QA, and maintenance behaviors as reusable
`skills/*/SKILL.md` folders.

The source of truth is the repository `skills/` directory. Codex, Claude Code,
and OpenCode are install targets, not separate rewritten sources.

## Included Skills

| Skill | Purpose |
| --- | --- |
| `chrisai` | Short alias entrypoint for `chrisai-router`. |
| `chrisai-router` | Canonical router for ChrisAI documentation, coding, QA, and design tasks. |
| `chrisai-update` | Explicit update and sync workflow for ChrisAI installs. |
| `chrisai-doctor` | Diagnose ChrisAI repository, validation, adapter sync, and local installation state. |
| `chrisai-coding-engineering` | Frame architecture, abstractions, runtime boundaries, and refactor-versus-rewrite decisions before language-specific implementation details. |
| `chrisai-coding-html-css` | Write or review vanilla HTML and CSS for static sites and docs pages. |
| `chrisai-coding-js` | Write or review JavaScript using ChrisAI conventions across `.js`, `.mjs`, and `.cjs`. |
| `chrisai-coding-ts` | Write or review TypeScript implementation details using ChrisAI coding conventions, not framework or architecture boundaries. |
| `chrisai-coding-ts-logic-review` | Review TypeScript logic and related tests for branching risk, test gaps, duplicated rules, and refactor opportunities before applying changes. |
| `chrisai-coding-ts-react` | Write or review React TSX using ChrisAI conventions. |
| `chrisai-coding-ts-tests` | Write or review TypeScript tests using ChrisAI testing conventions. |
| `chrisai-docs-copy-editing` | Proofread and tighten existing developer-facing documentation without changing technical meaning. |
| `chrisai-docs-dev-api-reference` | Write or restructure junior-developer-facing API reference docs. |
| `chrisai-docs-dev-formatting` | Normalize markdown structure and formatting using ChrisAI documentation style rules. |
| `chrisai-docs-dev-onboarding` | Write or restructure onboarding docs, quick starts, tutorials, and conceptual developer guides. |
| `chrisai-prompt-md-to-html` | Convert Markdown or Codex text responses into deterministic single-file HTML artifacts with fixed layouts, syntax highlighting, Mermaid support, and validated theme options. |
| `chrisai-design-asset-formats` | Create, convert, validate, and package SVG, PNG, and ICO design assets with transparency and favicon QA rules. |
| `chrisai-design-creative` | Coordinate brand-led design direction, mode selection, and handoff across the design specialist skills. |
| `chrisai-design-drafts` | Create static HTML/CSS/JS design-review drafts and clickable creative mockups from approved structure and direction. |
| `chrisai-design-logo-generator` | Create and refine SVG-first logos and mark variants before downstream export and packaging. |
| `chrisai-design-system-extraction` | Extract design source-of-truth rules from existing apps, sites, design files, component libraries, and project tokens. |
| `chrisai-design-wireframes` | Create grayscale low-fidelity wireframes and clickable grayscale wireframe drafts before visual design. |
| `chrisai-process-feedback-loop` | Manage staged feedback loops for reviewable artifacts shown in the in-app browser. |
| `chrisai-process-task-bank` | Coordinate large multi-item tasks with filesystem-backed work packets, decisions, logs, handoffs, and optional separate-session delegation. |
| `chrisai-qa-playwright` | QA local web projects through localhost preview detection, Playwright capture, and responsive browser checks. |

## Install

Install directly from GitHub with `npx`:

```bash
npx github:cblanquera/chrisai#v0.1.11 install --target codex
npx github:cblanquera/chrisai#v0.1.11 install --target claude
npx github:cblanquera/chrisai#v0.1.11 install --target opencode
```

Or clone the repository, then sync to the agent you use:

```bash
scripts/sync-codex.sh
scripts/sync-claude.sh
scripts/sync-opencode.sh
```

Both install paths validate `skills/` first and then copy the portable skills
into that agent's skills directory. The `npx` CLI uses Node filesystem APIs so
it works on Windows, macOS, and Linux without requiring `bash`, `python3`, or
`rsync`.

Default targets:

```text
Codex:      ${CODEX_HOME:-$HOME/.codex}/skills
Claude:     $HOME/.claude/skills
OpenCode:   $HOME/.config/opencode/skills
```

Override target paths with:

```bash
CHRISAI_CODEX_SKILLS_DIR=/path/to/skills scripts/sync-codex.sh
CHRISAI_CLAUDE_SKILLS_DIR=/path/to/skills scripts/sync-claude.sh
CHRISAI_OPENCODE_SKILLS_DIR=/path/to/skills scripts/sync-opencode.sh
```

The same overrides work with `npx`.

## Update

ChrisAI does not silently auto-update during normal skill use. Update only when
you explicitly ask for it or run the maintenance scripts.

Check the installed repository version:

```bash
scripts/check-version.sh
```

Pull the latest repository state and validate it:

```bash
scripts/update-from-git.sh
```

Then sync the target agent again:

```bash
scripts/sync-codex.sh
```

Use `chrisai-update` for agent-assisted update workflow and `chrisai-doctor`
for diagnostics.

## Stable And Development Workflow

For stable use, install from a tagged release or a known commit and sync only
after reviewing `CHANGELOG.md`.

For development, edit skills in this repository first:

```bash
scripts/validate-skills.py
npm test
```

After validation, sync to the agent target you want to test. Do not edit
installed Codex, Claude Code, or OpenCode copies first.

## Supported Agents

- Codex through `adapters/codex/` and `scripts/sync-codex.sh`
- Claude Code through `adapters/claude/` and `scripts/sync-claude.sh`
- OpenCode through `adapters/opencode/` and `scripts/sync-opencode.sh`

Adapter metadata may grow over time, but portable skill folders remain the
canonical content.

## Repository Layout

```text
skills/              Portable ChrisAI skills and bundled resources
adapters/codex/      Codex install notes
adapters/claude/     Claude Code install notes
adapters/opencode/   OpenCode install notes
bin/                 Minimal npm/npx CLI wrapper
scripts/             Validation, version, update, and sync commands
templates/           Copyable personal overlays such as local-environment
docs/                Operational maintenance notes
VERSION              Current distribution version
CHANGELOG.md         Version history
```

## Local Environment

ChrisAI can use an optional `local-environment` skill for machine-local command
resolution. This is useful for preferred Node, Yarn, npm, pnpm, Python, Rust,
browser, or helper CLI paths.

Start from:

```text
templates/local-environment/SKILL.md
```

Copy it into your agent's local skills directory and customize that installed
copy. Do not commit real machine-local paths to this repository.
