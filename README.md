# ChrisAI

[![skills.sh](https://skills.sh/b/cblanquera/chrisai)](https://skills.sh/cblanquera/chrisai)
[![Tests Status](https://img.shields.io/github/actions/workflow/status/cblanquera/chrisai/test.yml)](https://github.com/cblanquera/chrisai/actions)
[![Commits](https://img.shields.io/github/last-commit/cblanquera/chrisai)](https://github.com/cblanquera/chrisai/commits/main/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/cblanquera/chrisai/blob/main/LICENSE)

ChrisAI is a portable skill distribution for AI coding agents. It packages the
ChrisAI agents, branding, chatting, coding, designing, docing, and maintenance
behaviors as reusable `skills/*/SKILL.md` folders.

The source of truth is the repository `skills/` directory. Codex, Claude Code,
and OpenCode are install targets, not separate rewritten sources.

## Included Skills

| Skill | Purpose |
| --- | --- |
| `chrisai-agents` | Create, repair, migrate, or standardize a project-local `.agents/` folder for agent-readable workflows, context rules, planning, specs, progress tracking, and handoffs. |
| `chrisai-branding` | Support brand identity work, including guided branding, research, competitor discovery, positioning, naming, domain checks, logo guidance, brand kits, audits, launch readiness, transparent PNG preparation, and PNG/ICO conversion. |
| `chrisai-chatting` | Route experimental chat-session experience work, including session caching and recall, HTML form intake, and readable HTML response preview links. |
| `chrisai-coding` | Audit, recommend improvements to, and fix existing JavaScript, TypeScript, React TSX, TypeScript test, HTML/CSS, and TypeScript logic-review work through consolidated internal workflows and references. |
| `chrisai-docing` | Route developer-facing technical writing to internal workflows and references for guided learning, API reference, formatting, and copy editing. |
| `chrisai-designing` | Route ChrisAI design work to internal workflows and references for creative direction, design-system extraction, wireframes, design drafts, and browser-visible feedback loops. |
| `chrisai-doctor` | Diagnose, verify, inspect, troubleshoot, update, upgrade, pull, install, or sync ChrisAI skills, repository state, validation, or agent adapter targets. |

## Human-Readable Docs

| Topic | Guide |
| --- | --- |
| Agents | [docs/agents.md](docs/agents.md) |
| Branding | [docs/branding.md](docs/branding.md) |
| Chatting | [docs/chatting.md](docs/chatting.md) |
| Coding | [docs/coding.md](docs/coding.md) |
| Designing | [docs/design.md](docs/design.md) |
| Docing | [docs/docs.md](docs/docs.md) |

## Install

Install from Skills.sh:

```bash
npx skills add cblanquera/chrisai
```

Install from the GitHub Skills CLI:

```bash
gh skill install cblanquera/chrisai
```

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

Use `chrisai-doctor` for agent-assisted diagnostics, updates, and sync
guidance.

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
docs/                Operational maintenance notes
VERSION              Current distribution version
CHANGELOG.md         Version history
```
