# Update And Sync

Use this workflow only for explicit ChrisAI maintenance requests. Do not
auto-run updates as part of normal coding, docs, QA, or design work.

## Source Of Truth

Treat the checked-out ChrisAI repository as the primary source. Portable skill
content lives in `skills/`. Codex, Claude Code, and OpenCode directories are
adapter targets populated by scripts.

Prefer the Node CLI for user-facing installs and syncs because it works on
Linux, macOS, and Windows. Use the shell scripts only when operating inside a
local clone on a Unix-like environment where those scripts are known to work.

## Update Flow

1. Confirm the current working directory is the ChrisAI repository.
2. Run `node bin/chrisai.js version` or `scripts/check-version.sh` to capture
   the current version.
3. Run `scripts/update-from-git.sh` only when the user explicitly asked to pull
   or update a local Git checkout.
4. Run `node bin/chrisai.js validate` or `scripts/validate-skills.py`.
5. Ask which adapter target to sync when the user did not name one.
6. Run only the requested sync command. Prefer:
   - Codex: `npx github:cblanquera/chrisai#<version> install --target codex`
   - Claude Code: `npx github:cblanquera/chrisai#<version> install --target claude`
   - OpenCode: `npx github:cblanquera/chrisai#<version> install --target opencode`
7. When intentionally using a local Unix clone instead, the equivalent scripts
   are:
   - Codex: `scripts/sync-codex.sh`
   - Claude Code: `scripts/sync-claude.sh`
   - OpenCode: `scripts/sync-opencode.sh`
8. Report the version, commit, validation result, and synced target.

## Boundaries

- Do not edit installed adapter copies first.
- Do not silently auto-update skills.
- Do not sync to Codex unless the user requested Codex sync.
- Do not sync to Claude Code unless the user requested Claude Code sync.
- Do not sync to OpenCode unless the user requested OpenCode sync.
- Prefer environment overrides documented in `adapters/*/README.md` when an
  agent uses a non-default skills path.
