# Changelog

## 0.1.2 - 2026-05-29

- Added a minimal dependency-free `npx` install CLI.
- Added CLI tests for version reporting, target installs, unknown targets, and
  preservation of extra installed skills.
- Updated validation so `package.json` and `VERSION` must stay aligned.

## 0.1.1 - 2026-05-29

- Established ChrisAI as a skill-first distribution repository.
- Migrated portable ChrisAI skills from the previous `coding/skills` source.
- Added Codex, Claude Code, and OpenCode adapter directories.
- Added validation, version, update, and adapter sync scripts.
- Added `chrisai-update` and `chrisai-doctor` maintenance skills.
- Added a portable `local-environment` template and guidance for opt-in
  machine-local command resolution.
