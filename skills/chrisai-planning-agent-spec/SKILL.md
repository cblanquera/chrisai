---
name: chrisai-planning-agent-spec
description: Use when creating, repairing, migrating, or standardizing a project-local `.agents/` knowledge base for AI-readable planning, workflows, specs, progress, releases, and handoffs.
---

# ChrisAI Planning Agent Spec

Use this skill to bootstrap or repair a project-local `.agents/` knowledge base.
The deliverable is the `.agents` operating surface itself: local rules,
workflow files, folder structure, and only the initial records needed to make
the project recoverable.

After setup, future chats should follow `.agents/AGENTS.md` and
`.agents/workflows/` even when no ChrisAI skill is active.

## Activation

Use this skill when any of these are true:

- no `.agents/` folder exists
- `.agents/` exists but lacks `.agents/AGENTS.md`
- `.agents/` exists but lacks `.agents/workflows/`
- existing `.agents/` content needs migration, repair, or standardization
- the user explicitly asks to initialize or update the `.agents` operating
  model

Do not use this skill as the normal ongoing review, validation, freeze, sprint,
or progress workflow after `.agents/AGENTS.md` and `.agents/workflows/` exist.
In that case, read the local `.agents/AGENTS.md` and the relevant workflow file.

## Setup Modes

Classify the project before creating records:

- `greenfield`: prompt, product idea, or sparse project with little existing
  code or planning material. Use
  [setup-greenfield](references/setup-greenfield.md).
- `brownfield`: existing codebase or product behavior must be reflected. Use
  [setup-brownfield](references/setup-brownfield.md).
- `import`: existing human planning documents are the main source. Use
  [setup-import](references/setup-import.md).
- `hybrid`: existing code and planning documents both matter. Use brownfield
  setup for current state and import setup for intended state.

If classification is uncertain, proceed with the safest minimal setup and mark
uncertainty in records or status instead of blocking on exhaustive intake.

## Required Setup Output

Create or repair:

1. `.agents/AGENTS.md`
2. `.agents/workflows/`
3. top-level `.agents` folders from
   [agent-spec-structure](references/agent-spec-structure.md)
4. `.agents/specs/manifest.md`
5. one initial spec folder only when setup has enough scope to name a bounded
   product, feature, migration, or initiative

`.agents/AGENTS.md` is the local law. Keep it concise and high authority. Put
detailed operating procedures in `.agents/workflows/*.md`, not in
`.agents/AGENTS.md`.

## Workflow Files

Generate or repair workflow files from these references:

- [workflow-goal-manager](references/workflow-goal-manager.md)
- [workflow-document-integrity](references/workflow-document-integrity.md)
- [workflow-import](references/workflow-import.md)
- [workflow-poc](references/workflow-poc.md)
- [workflow-mvp](references/workflow-mvp.md)
- [workflow-feature-development](references/workflow-feature-development.md)
- [workflow-ad-hoc](references/workflow-ad-hoc.md)
- [workflow-batch-reconciliation](references/workflow-batch-reconciliation.md)
- [workflow-review](references/workflow-review.md)
- [workflow-validation](references/workflow-validation.md)
- [workflow-freeze](references/workflow-freeze.md)
- [workflow-progress](references/workflow-progress.md)
- [workflow-handoff](references/workflow-handoff.md)
- [source-retirement](references/source-retirement.md)
- [workflow-wireframes](references/workflow-wireframes.md)
- [workflow-creatives](references/workflow-creatives.md)

`setup-greenfield.md` and `setup-brownfield.md` are skill-internal setup
references. Do not generate them into `.agents/workflows/`; future chats should
invoke this skill when setup or repair is needed.

Workflow files should say when to use the workflow, what to read first, what it
may update, stop conditions, and handoff expectations. They should not duplicate
large source documents or full skill bodies.

Generate or repair `.agents/plans/feature-goals.md` from
[plan-feature-goals](references/plan-feature-goals.md) during setup or repair.

## Core Boundaries

- `.agents/plans/`: original planning documents, PRDs, stakeholder notes, and
  imported source material, feature-goal intake, and planning references
  preserved in human form.
- `.agents/poc/`: POC findings, results, snippets, and implementation notes.
  Actual prototype code should live outside `.agents/`.
- `.agents/wireframes/`: low-fidelity screens, flows, layout notes, wireframe
  reviews, and links to design files or screenshots.
- `.agents/creatives/`: visual direction, brand explorations, moodboards, asset
  briefs, copy explorations, and creative review notes.
- `.agents/references/`: long explanations, examples, snippets, research,
  rationale, source excerpts, and implementation patterns.
- `.agents/specs/`: durable intent, requirements, decisions, risks, evidence,
  reviews, indexes, and proposed task records.
- `.agents/sprints/`: optional timeboxed execution views derived from specs and
  progress.
- `.agents/progress/`: active execution state, assigned work packets, batches,
  logs, outputs, and handoffs.
- `.agents/releases/`: release plans, release notes, readiness summaries, and
  verification evidence.

Do not create a root `plans/` folder as this skill's deliverable. If `.agents/`
is not writable, do not silently fall back to another folder; report the
permission problem and ask for a writable target.

## Local AGENTS.md Rules

`.agents/AGENTS.md` must include:

- purpose of `.agents`
- source-of-truth boundaries for specs, progress, references, plans, sprints,
  wireframes, creatives, and releases
- Markdown-only file-size and split-refactor rules for `.agents/**/*.md`
- workflow routing through `.agents/workflows/`
- stable record ID expectations
- current-state versus intended-state guidance for brownfield work
- no invented scope, status, commitments, or verification
- workflow routing for `goal-manager.md` and `document-integrity.md`
- `.agents/plans/feature-goals.md` routing when choosing the next goal or
  deciding whether to create a new spec
- a rule that user prompts identifying new feature goals are recorded or
  reconciled in `.agents/plans/feature-goals.md`
- a rule that the manager compares the last or current progress item, progress
  manifest next-action text, and feature goals before deciding next work
- a rule that bounded product streams become sibling specs instead of being
  added to the initial or root spec by default
- a rule that document integrity runs before goal closeout, freeze,
  release/batch completion, or significant document-affecting decisions
- a rule that raw user feedback is validated or rejected before implementation,
  then reconciled into records, progress, a single fix item, or a batch
- a rule that accepted POC, wireframe, creative, review, QA, and feedback
  outcomes are promoted into specs/progress before MVP freeze or
  feature-development closeout
- audit-first batch reconciliation for bulk feedback and feature-development
  mismatches
- ad hoc request classification before it becomes hidden product truth
- promotion rule for durable facts introduced in summaries, reviews, sprint
  plans, release notes, or progress logs
- source-retirement rule before declaring old docs obsolete

Prefer `.agents/AGENTS.md` over `.agents/CONTEXT.md` for rules. `CONTEXT.md`
may exist as supporting context, but it is not the operating policy surface.

File-size and split-refactor rules apply only to generated or maintained
`.agents/**/*.md` files. Before appending to one of those files, decide whether
the addition keeps the file compact and under the local line limit. Append only
compact status, record, or routing facts. If the file is near the limit, the
addition is large, or the content is long-form rationale, examples, source
excerpts, transcript summaries, audit notes, issue lists, screenshot notes,
research, or detailed evidence, do not append directly. Refactor the file by
splitting it, or move the long-form material into `.agents/references/`, a
dedicated batch file, or a log file and link to it.

Do not apply Markdown file-size rules to HTML, CSS, JavaScript, TypeScript,
JSON, images, prototype code, generated artifacts, or source files.

## Record Rules

Read [record-model](references/record-model.md) before creating or repairing
records.

Use stable IDs such as `REQ-001`, `CAP-001`, `DEC-001`, `RISK-001`, `AC-001`,
`EVD-001`, and `TASK-001`. Keep records compact, source-linked, and durable.
Use `.agents/references/` for detail that would make records large.

A `TASK` record is proposed work. Active execution belongs in
`.agents/progress/` and should be governed by `.agents/workflows/progress.md`.

## Stop Conditions

Stop setup when:

- `.agents/AGENTS.md` exists and contains the local operating rules
- `.agents/workflows/` contains the workflow files needed for future chats
- folder structure exists or missing folders are intentionally deferred
- initial records or manifests are coherent enough for future work
- open questions, blockers, and next workflow are stated

Do not continue into implementation unless the user explicitly asks for active
execution after setup.

## Removed Public Routes

Older specialist skills for discovery, brownfield import, review, validation,
freeze, and agent progress have been removed from the active distribution. Do
not route to those former skill names. Use this setup skill to install
project-local rules and workflow files instead.
