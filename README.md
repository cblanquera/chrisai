# ChrisAI

ChrisAI is a portable skill distribution for AI coding agents. It packages the
ChrisAI coding, documentation, design, QA, and maintenance behaviors as reusable
`skills/*/SKILL.md` folders.

The source of truth is the repository `skills/` directory. Codex, Claude Code,
and OpenCode are install targets, not separate rewritten sources.

## Install

Install directly from GitHub with `npx`:

```bash
npx github:cblanquera/chrisai install --target codex
npx github:cblanquera/chrisai install --target claude
npx github:cblanquera/chrisai install --target opencode
```

Or clone the repository, then sync to the agent you use:

```bash
scripts/sync-codex.sh
scripts/sync-claude.sh
scripts/sync-opencode.sh
```

Both install paths validate `skills/` first and then copy the portable skills
into that agent's skills directory. The `npx` CLI is a small wrapper around the
same sync scripts.

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
