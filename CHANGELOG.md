# Changelog

## 0.1.16 - 2026-06-11

- Added the `chrisai-planning-agent-spec` family for AI-readable planning under
  `.agent/specs/`, including discovery, import, brownfield reconciliation,
  review, validation, and freeze workflows.
- Added agent spec structure and record-model guidance so planning outgest
  defaults to compact records and indexes for AI workers instead of
  document-heavy planning corpuses.
- Renamed process task-bank coordination to
  `chrisai-process-agent-progress` and clarified the boundary between
  `.agent/specs/` durable intent and `.agent/progress/` active execution.
- Updated routers, prompt-cache guidance, README skill listings, and metadata
  to route new planning work through agent specs while keeping legacy
  greenfield planning skills available.

## 0.1.15 - 2026-06-10

- Added `chrisai-planning-greenfield-validation-cycle` as a first-class routed
  workflow between greenfield grill review and freeze-and-plan.
- Added validation-cycle artifact guidance for evidence matrices, decision
  logs, pre-implementation prework, validation loops, and finding-specific
  evidence under `plans/validation/`.
- Updated the planning router, grill-review, freeze-and-plan, and README so
  unresolved `BLOCKER` and `HIGH` findings route through the validation-cycle
  specialist before implementation planning.

## 0.1.14 - 2026-06-10

- Added Validation Cycle guidance to the greenfield planning flow so
  unresolved review findings prompt another evidence-gathering pass before
  freeze-and-plan.
- Tightened greenfield freeze-and-plan readiness gates so `BLOCKER` and `HIGH`
  findings must be resolved and validation evidence must exist before
  implementation planning proceeds.
- Required planning skills to explain the exact proposed validation work before
  asking the user whether to enter a Validation Cycle.

## 0.1.13 - 2026-06-10

- Added the `chrisai-planning` family for large greenfield app planning before
  implementation, including discovery, grill-review, and freeze-and-plan phase
  skills.
- Added planning corpus guidance for pre-grill artifacts, final readiness
  review handoff, `plans/AGENTS.md`, grill preflight checks, MVP freeze, and
  implementation backlog generation.
- Updated the ChrisAI router and README so planning is discoverable as a
  first-class family separate from process agent-progress coordination.

## 0.1.12 - 2026-06-08

- Added family routers for `chrisai-coding`, `chrisai-design`,
  `chrisai-docs`, `chrisai-prompt`, and `chrisai-process`, with the main
  `chrisai-router` now delegating to those routes before specialists.
- Moved `chrisai-prompt-cache` discovery into the prompt family and updated the
  README skill list for the expanded router structure.

## 0.1.11 - 2026-06-08

- Expanded `chrisai-docs-dev-onboarding` with teaching-arc,
  guided-walkthrough, example-explanation, and review-gate guidance adapted
  from Stackpress course content standards.

## 0.1.10 - 2026-06-08

- Added `chrisai-process-agent-progress` for large multi-item tasks that need
  filesystem-backed work packets, durable decisions, progress logs, handoffs,
  and optional separate-session delegation after user approval.
- Updated the ChrisAI router and README so agent-progress coordination is
  discoverable from the process skill family.
- Ignored the local `chrisai-response-simulation` conference demo skill so it
  stays out of the distributed skill set.

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
