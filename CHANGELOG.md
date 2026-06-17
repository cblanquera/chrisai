# Changelog

## 0.2.3 - 2026-06-18

- Added MIT license metadata to all active ChrisAI skill frontmatter.
- Updated skill validation to allow the recommended `license` metadata field.

## 0.2.2 - 2026-06-18

- Added Bad Baby Bear Bot icon assets for the active ChrisAI skill metadata.
- Updated Codex `openai.yaml` metadata for all active ChrisAI skills with
  shared icon paths and brand color.
- Clarified adapter-specific workflow guidance for Codex, Claude Code, and
  OpenCode.

## 0.2.1 - 2026-06-18

- Consolidated the active distribution into seven portable ChrisAI skills:
  `chrisai-agents`, `chrisai-branding`, `chrisai-chatting`,
  `chrisai-coding`, `chrisai-designing`, `chrisai-docing`, and
  `chrisai-doctor`.
- Updated installer and sync behavior so retired ChrisAI-owned skill folders
  are pruned from adapter targets while unrelated custom skills are preserved.
- Removed machine-local override guidance and tightened archive boundaries so
  active skills and docs do not reference retired archive content.
- Added chatting workflows for session caching, HTML form intake, and readable
  HTML response previews.
- Added branding workflows for brand strategy, research, naming, asset
  preparation, domain checks, and launch readiness.

## 0.1.27 - 2026-06-16

- Updated `chrisai-planning-agent-spec` so each implemented POC uses its own
  isolated `poc-<short-name>` branch while `.agents/poc/` remains the record
  and evidence surface.
- Clarified POC branch safety: agents must not create or switch POC branches
  without explicit user approval, must check `git status`, and must not combine
  unrelated POCs on one branch.
- Added POC branch fields to progress handoffs and promotion rules so accepted
  proof code reaches product branches only through explicit merge, cherry-pick,
  or reimplementation decisions.

## 0.1.26 - 2026-06-16

- Added a loop-escape clause to the agent-spec goal manager so repeated
  implementation, QA, validation, or feedback loops stop and escalate when no
  new evidence, hypothesis, narrower scope, or verification method exists.
- Updated the agent-spec README to explain the goal manager's stuck-loop
  behavior for humans using the `.agents` workflow system.

## 0.1.25 - 2026-06-16

- Added goal-manager, document-integrity, and feature-goal intake templates to
  `chrisai-planning-agent-spec` so generated `.agents` setups can orchestrate
  documented goals, gate document drift, and preserve future feature goals.
- Renamed the after-MVP workflow model to feature development and updated
  generated `.agents` routing, phase labels, README guidance, and workflow
  references accordingly.
- Strengthened the planning workflow loop so POC, wireframe, creative, review,
  QA, and feedback outcomes are validated, reconciled, promoted, and checked
  before MVP freeze, feature-development closeout, or implementation fixes.

## 0.1.24 - 2026-06-12

- Corrected agent-spec guidance so `chrisai-planning-agent-spec` creates and
  maintains the `.agents/` project knowledge base, not a root `plans/`
  document tree.
- Removed the fallback that allowed root `plans/` deliverables when `.agents/`
  is not writable; agents must now report the permission blocker and request
  writable `.agents/` access or another explicit target.
- Updated planning discovery/import wording so original planning materials are
  preserved under `.agents/plans/` and reusable long-form context lives under
  `.agents/references/`.

## 0.1.23 - 2026-06-12

- Clarified that explicit human-facing deliverables, such as a requested root
  `plans/` folder, are first-class outputs rather than disposable generated
  views.
- Updated agent-spec guidance so `.agents/specs/` backs requested deliverables
  with traceability when writable, while requested human documents are still
  produced when `.agents/` is unavailable.

## 0.1.22 - 2026-06-12

- Added a mental-model README for the agent-spec planning skill that explains
  specs versus sprints, tasks versus progress items, POC-to-MVP promotion, and
  reusable references.
- Updated the agent-spec planning structure to use `.agents/plans/`,
  `.agents/poc/`, `.agents/references/`, `.agents/specs/`, `.agents/sprints/`,
  `.agents/progress/`, and `.agents/releases/`.
- Refined planning and progress guidance so POC work is a first-class
  feasibility step, MVP work requires customer-facing viability checks, and
  sprints remain timeboxed execution views rather than product scope.

## 0.1.21 - 2026-06-12

- Updated the agent-spec planning family to use `.agents/specs/` as the
  durable planning namespace.
- Updated agent-progress guidance to use `.agents/progress/` for active
  execution state and handoffs.
- Refreshed planning and progress OpenAI metadata so generated prompts point to
  the `.agents/` namespace.

## 0.1.20 - 2026-06-12

- Archived the legacy `chrisai-planning-greenfield-*` skills outside the active
  `skills/` distribution and routed planning work through the agent-spec flow.
- Updated planning router and README references so active skill discovery no
  longer points to archived greenfield specialists.

## 0.1.19 - 2026-06-11

- Added source retirement audit guidance to the agent-spec planning flow so
  legacy planning, progress, or documentation sources are discovered,
  classified, and given explicit keep/archive/delete recommendations before
  they are declared obsolete.
- Added `generated/source-retirement-review.md` as a disposable planning view
  for evaluating whether durable facts, active progress, and remaining source
  context have been preserved.
- Clarified that examples such as `plans/`, `docs/`, `specs/`, `roadmap/`, and
  `.task-bank/` are non-exhaustive and agents must discover actual project
  source locations.

## 0.1.18 - 2026-06-11

- Added a pure greenfield readiness loop to the agent-spec planning flow,
  including a generated grill-session packet, saved review outputs, external
  grill-results import, and repeated validation-cycle passes before freeze.
- Updated agent-spec discovery, review, validation, and freeze gates so
  unresolved `BLOCKER` findings and unresolved `HIGH` findings cannot silently
  proceed into implementation planning.
- Clarified that validation-cycle repeats do not restart discovery or
  regenerate the grill packet unless new scope makes existing records stale.

## 0.1.17 - 2026-06-11

- Clarified `chrisai-planning-agent-spec` compact records as short,
  source-linked planning facts rather than lossy replacements for useful source
  documents.
- Added generated project-management view guidance for statements of work, work
  orders, sprint plans, sprint results, burndown/status reports, release
  summaries, risk registers, change summaries, and stakeholder updates.
- Strengthened generated-view rules so agents combine spec records with active
  progress state, report missing inputs, and promote newly introduced durable
  facts back into records or progress.

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
