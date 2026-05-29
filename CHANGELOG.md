# Changelog

## 0.1.4 - 2026-05-29

- Added release workflow guidance that requires confirmation before remote
  publication actions such as push, tag, or GitHub release creation.
- Documented the 0-6 release verification process in `AGENTS.md`.
- Added cross-platform skill drafting guidance for Linux, macOS, and Windows.
- Updated maintenance, QA, and asset skills to prefer cross-platform install
  and runtime resolution paths where relevant.

## 0.1.3 - 2026-05-29

- Made the `npx` installer cross-platform by moving validation and skill sync
  into the Node CLI.
- Added tests proving `chrisai validate` and `chrisai install` work without
  shell tools such as `bash`, `python3`, or `rsync` on `PATH`.
- Preserved the existing shell scripts for Unix users who prefer direct script
  execution.

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
