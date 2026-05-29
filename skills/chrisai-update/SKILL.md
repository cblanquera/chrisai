---
name: chrisai-update
description: Use when the user explicitly asks to update, upgrade, pull, install, or sync ChrisAI skills from the canonical repository, or asks how to update ChrisAI for Codex, Claude Code, or OpenCode. This skill must not run during ordinary skill use.
---

# ChrisAI Update

Use this skill only for explicit ChrisAI maintenance requests. Do not auto-run
updates as part of normal coding, docs, QA, or design work.

## Source Of Truth

Treat the checked-out ChrisAI repository as the primary source. Portable skill
content lives in `skills/`. Codex, Claude Code, and OpenCode directories are
adapter targets populated by scripts.

## Update Flow

1. Confirm the current working directory is the ChrisAI repository.
2. Run `scripts/check-version.sh` to capture the current version and commit.
3. Run `scripts/update-from-git.sh` only when the user explicitly asked to pull
   or update from Git.
4. Run `scripts/validate-skills.py`.
5. Ask which adapter target to sync when the user did not name one.
6. Run only the requested sync command:
   - Codex: `scripts/sync-codex.sh`
   - Claude Code: `scripts/sync-claude.sh`
   - OpenCode: `scripts/sync-opencode.sh`
7. Report the version, commit, validation result, and synced target.

## Boundaries

- Do not edit installed adapter copies first.
- Do not silently auto-update skills.
- Do not sync to Codex unless the user requested Codex sync.
- Do not sync to Claude Code unless the user requested Claude Code sync.
- Do not sync to OpenCode unless the user requested OpenCode sync.
- Prefer environment overrides documented in `adapters/*/README.md` when an
  agent uses a non-default skills path.
