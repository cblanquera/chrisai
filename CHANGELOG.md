# Changelog

## 0.1.9 - 2026-06-01

- Added preview-server lifecycle guidance for QA, design drafts, wireframes,
  and Markdown-to-HTML artifact verification.
- Added timeout cleanup support to the QA localhost preview helper so
  agent-started preview servers do not run indefinitely.
- Clarified static design draft and wireframe review artifacts should use
  separate HTML files per page, screen, or major state.

## 0.1.8 - 2026-05-31

- Tightened `chrisai-process-feedback-loop` round responses so browser-visible
  review rounds use a clearer phase/round, target, changes, verification,
  review questions, and approval-path structure.

## 0.1.7 - 2026-05-31

- Added `chrisai-process-feedback-loop` for staged feedback loops around
  in-app browser review artifacts, including round approval, phase approval,
  artifact versioning, and exact next-step language.
- Moved shared design review-loop guidance from `chrisai-design-creative` into
  the new process feedback-loop skill.

## 0.1.6 - 2026-05-31

- Added `chrisai-prompt-md-to-html` for deterministic single-file HTML
  artifacts from Markdown or Codex text responses, including bundled rendering
  assets, layout references, theme options, and script tests.
- Updated the ChrisAI router and README so prompt-to-HTML artifact generation
  is discoverable from the skill family.
- Tightened the design wireframe workflow so every review round states what to
  review, what approval unlocks, and whether more wireframe rounds remain
  before creative design.
- Centralized design review-round rules for wireframes, creative drafts,
  clickable drafts, folder behavior, and next-step language.
- Clarified that `chrisai-design-creative` coordinates wireframe routing while
  `chrisai-design-wireframes` owns grayscale wireframe drafts and handoffs.
- Added release guidance requiring remote GitHub release and tag checks before
  choosing the next version.

## 0.1.5 - 2026-05-29

- Split the design workflow into specialist skills for creative coordination,
  design-system extraction, grayscale wireframes, and static design drafts.
- Added design evidence scripts for logo analysis, local design-system scans,
  and Playwright-based existing-site capture.
- Updated the README skill list for the expanded design skill family.
- Clarified portable skill drafting guidance so skill content stays
  agent-neutral unless Codex, Claude Code, or OpenCode behavior differs.

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
