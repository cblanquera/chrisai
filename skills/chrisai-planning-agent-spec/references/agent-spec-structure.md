# Agent Spec Structure

Use `.agents/` for AI-readable planning and execution state that should not
interfere with human-authored project documents. Use `.agents/specs/` for
durable product and feature scope.

Do not create a root `plans/` folder from this skill. Preserve planning sources
inside `.agents/plans/` and keep the knowledge base under `.agents/`.

## Layout

```text
.agents/
  AGENTS.md

  workflows/
    goal-manager.md
    document-integrity.md
    import.md
    poc.md
    mvp.md
    feature-development.md
    ad-hoc.md
    batch-reconciliation.md
    review.md
    validation.md
    freeze.md
    progress.md
    handoff.md
    source-retirement.md
    wireframes.md
    creatives.md

  plans/
    source-documents.md
    feature-goals.md

  poc/
    findings.md
    results.md
    snippets/

  wireframes/
    flows.md
    screens.md
    reviews.md

  creatives/
    direction.md
    assets.md
    reviews.md

  references/
    terms/
    decisions/
    examples/
    snippets/
    research/

  specs/
    manifest.md

    <spec-id>/
      brief.md
      index.md
      status.md
      requirements.md
      capabilities.md
      constraints.md
      assumptions.md
      questions.md
      decisions.md
      risks.md
      acceptance.md
      evidence.md
      tasks.md
      traceability.md
      open-questions.md
      by-mvp.md
      mvp-viability-gaps.md
      by-status.md
      by-source.md
      reviews/
        readiness-review.md
        findings.md
      logs/
        YYYY-MM-DD.md

  sprints/
    sprint-001.md

  progress/
    manifest.md
    items/
    batches/
    logs/

  releases/
    release-001/
      plan.md
      readiness.md
      notes.md
```

Create compact grouped record files first. Do not create one file per record
unless a grouped file is too large, the record needs independent ownership, or a
worker must load it without unrelated records.

Keep long explanations, examples, snippets, research, and rationale in
`.agents/references/` and link to them from specs, sprints, releases, and
progress items.

## Local AGENTS.md

Create or update `.agents/AGENTS.md` whenever an agent-spec knowledge base is
created or materially changed. Use `AGENTS.md` as the project-local rule file
for future agents working inside `.agents/`. Do not use `CONTEXT.md` as the
rules surface for this skill; if it exists, treat it as supporting context only.

The file should be concise and include rules equivalent to:

```markdown
# .agents Rules

This folder is an AI-readable planning and execution knowledge base.

Start by reading the workflow file that matches the task:

- `workflows/import.md` for existing planning documents
- `workflows/poc.md` for feasibility proofs before MVP scope
- `workflows/mvp.md` for the smallest customer-usable product slice
- `workflows/feature-development.md` for bounded feature streams, feedback
  reconciliation, hardening, polish, expansion, and ongoing product work after
  MVP
- `workflows/goal-manager.md` for autonomous goal execution across planning,
  design, implementation, QA, documentation, and handoff loops
- `workflows/document-integrity.md` for keeping specs, progress, indexes,
  status, releases, and derived views consistent
- `workflows/ad-hoc.md` for unplanned requests
- `workflows/batch-reconciliation.md` for bulk feedback, QA mismatches, and
  related fixes
- `workflows/review.md` for readiness, risk, consistency, or traceability review
- `workflows/validation.md` for evidence-gathering on blockers or risky claims
- `workflows/freeze.md` for turning accepted records into implementation
  contracts
- `workflows/progress.md` for active execution packets, logs, and handoffs
- `workflows/source-retirement.md` before declaring old docs obsolete
- `workflows/wireframes.md` for low-fidelity screens and flow planning
- `workflows/creatives.md` for visual direction, asset briefs, and creative
  review notes

## Source Of Truth

- `.agents/specs/` contains durable product intent, requirements, decisions,
  risks, evidence, acceptance criteria, indexes, and proposed tasks.
- `.agents/progress/` contains active execution state and work packets.
- `.agents/wireframes/` contains low-fidelity screens, flows, layout notes, and
  wireframe review notes.
- `.agents/creatives/` contains visual direction, brand explorations,
  moodboards, asset briefs, copy explorations, and creative review notes.
- `.agents/references/` contains long-form support material that keeps records
  compact.
- `.agents/plans/` preserves original human planning source material,
  feature-goal intake, and planning references.
- `.agents/sprints/` and `.agents/releases/` are derived views, not product
  truth.
- `.agents/plans/feature-goals.md` is planning input, not an implementation
  queue. Check it when choosing the next goal or deciding whether to create a
  new spec.

## Markdown File Size

- Apply these file-size and split-refactor rules only to `.agents/**/*.md`
  files.
- Do not apply them to HTML, CSS, JavaScript, TypeScript, JSON, images,
  prototypes, or source files outside Markdown planning artifacts.
- Keep active `.agents` Markdown files under 500 lines.
- Before appending to a Markdown file, decide whether the addition keeps the
  file compact. Append only compact status, record, or routing facts.
- If a Markdown file approaches 500 lines or the addition is large, refactor the
  file by splitting it before adding more content.
- Start with grouped record files. Refactor by splitting by record type, phase,
  source, or ownership only when size, review, or parallel editing requires it.
- Do not create giant narrative specs or copy full PRDs into `.agents/specs/`.
- Put long rationale, examples, research, source excerpts, transcript
  summaries, and detailed evidence in `.agents/references/`, then link to them.
- During feature development, batch reconciliation, and ongoing progress, do
  not split files just because the phase is feature work. Split only when the
  target Markdown file is near the line limit, the addition is large, or the
  content belongs in references, a batch file, or a log.

## Record Rules

- Use stable record IDs such as `REQ-001`, `AC-001`, `DEC-001`, `RISK-001`,
  `EVD-001`, and `TASK-001`.
- Keep records short, source-linked, and durable.
- For brownfield work, distinguish current state, intended state, and gaps.
- Claims about existing behavior need source links, file paths, command output,
  screenshots, or explicit confidence labels.
- Bulk feedback and feature-development mismatches should use audit-first batch
  reconciliation before editing.
- Ad hoc requests must be classified before they become hidden product truth.
- When deciding what to do next, compare the last or current progress item,
  progress manifest next-action text, and `.agents/plans/feature-goals.md`.
- If a user prompt identifies a new feature goal, record or reconcile it in
  `.agents/plans/feature-goals.md` before routing it.
- Raw user feedback must be validated or explicitly rejected before becoming
  implementation work unless the evidence is already explicit in project
  artifacts.
- Accepted POC, wireframe, creative, review, QA, and feedback outcomes must be
  promoted into specs, evidence, acceptance, progress, or release records before
  freeze, closeout, or release readiness.
- Handoffs and active progress should name the loop phase: intake,
  grill-review, gap-reconciliation, POC, design, freeze, implementation,
  QA-feedback, fix-reconciliation, or closeout.

## Boundary Rules

- Do not create a spec folder per sprint.
- Keep the initial/root product spec for the base product shell and overall
  architecture. Bounded product streams should become sibling specs instead of
  being added to the root spec by default.
- Proposed `TASK` records are not active work until converted into
  `.agents/progress/` items.
- Human-readable views must be derived from records and progress state. If data
  is missing, say it is missing.
- If a summary, sprint plan, release note, or review introduces new scope,
  decisions, risks, acceptance criteria, evidence, or tasks, promote those
  facts back into records or progress before treating them as durable.
- Do not declare legacy sources obsolete without a source retirement audit.
- Run `workflows/document-integrity.md` before closing a goal, freezing scope,
  marking a release or batch complete, or after significant document-affecting
  decisions.
- Manual grill reports are review inputs. Reconcile their findings into
  questions, risks, decisions, validation targets, accepted risks, or blockers;
  do not treat them as implementation instructions by themselves.
```

## Workflow Files

Create `.agents/workflows/` during setup. Workflow files are compact local
operating procedures that let future chats work inside `.agents/` without
loading ChrisAI skills. Each workflow should include:

- when to use it
- files to read first
- files it may update
- step-by-step process
- stop conditions
- handoff expectations

Use the corresponding files in this skill's `references/` folder as templates.
Keep workflow files short and project-local; put long examples or source
material in `.agents/references/`.

`setup-greenfield.md` and `setup-brownfield.md` are skill-internal references,
not project-local workflows. If setup or repair is needed later, invoke
`chrisai-planning-agent-spec` again.

## Top-Level Folders

- `.agents/workflows/`: local operating procedures for import, POC, MVP,
  feature development, goal management, document integrity, ad hoc work, batch
  reconciliation, review, validation, freeze, progress, handoffs, source
  retirement, wireframes, and creatives.
- `.agents/plans/`: original planning documents, PRDs, stakeholder notes, and
  imported source material, feature-goal intake, and planning references
  preserved in human form.
- `.agents/poc/`: POC results, findings, snippets, and implementation notes.
  Actual prototype code should live on a separate `poc-<short-name>` branch for
  each proof, outside `.agents/`.
- `.agents/wireframes/`: low-fidelity screens, flows, layout notes, wireframe
  reviews, and links to design files or screenshots. Final UI source belongs
  outside `.agents/`.
- `.agents/creatives/`: visual direction, brand explorations, moodboards, asset
  briefs, copy explorations, and creative review notes. Large binaries and
  final production assets should live outside `.agents/` and be linked.
- `.agents/references/`: arbitrary reusable context files that keep specs and
  progress items small.
- `.agents/specs/`: durable product and feature scope.
- `.agents/sprints/`: optional timeboxed plans that group accepted tasks or
  progress items.
- `.agents/progress/`: active execution state.
- `.agents/releases/`: release plans, readiness evidence, release notes, and
  verification summaries.

## Spec ID

Use one `<spec-id>` per bounded product, feature, migration, or major
initiative. Keep the initial/root product spec for the base product shell and
overall architecture. Create a new sibling spec when a feature-development goal
becomes a bounded product stream with its own acceptance criteria, risks,
decisions, POCs, or multiple implementation items.

Do not create a spec folder per sprint, topic, requirement, implementation
task, bugfix, single wireframe round, or small UI tweak.

For Lean or Agile product work, prefer this sequence:

- `01-poc`
- `02-mvp`
- `03-<feature-name>`
- `04-<feature-name>`

Good examples:

- `01-poc`
- `02-mvp`
- `03-session-management`
- `04-plugin-marketplace`
- `checkout-redesign`
- `plugin-marketplace`
- `workspace-import-export`

If the user talks about a sprint, create or update `.agents/sprints/<sprint>.md`
only after the durable spec scope exists. A sprint is a timebox for executing
work, not the source of product intent.

`.agents/plans/feature-goals.md` is planning input, not an implementation queue.
Convert feature goals into bounded spec records, acceptance criteria, and
progress items before implementation.

## Feature Goals

Purpose: high-level feature-goal intake.

Use [plan-feature-goals](plan-feature-goals.md) when generating
`.agents/plans/feature-goals.md`.

## Manifest

Purpose: dashboard for all agent specs.

```markdown
# Agent Spec Manifest

| Spec ID | Status | Type | Source | Current Phase | Notes |
| --- | --- | --- | --- | --- | --- |
| c4os-v1 | active | greenfield | prompt | review | |
```

## Brief

Purpose: durable scope and boundary.

```markdown
# <Spec Name> Brief

Spec ID:
Type: greenfield | planned-greenfield | brownfield | planned-brownfield
Status:

## Objective

## Audience

## Source Material

## Scope

## Non-Goals

## MVP Viability

Target customer or evaluator:

Customer-facing workflow:

Minimum usable capabilities:

Known POC-only or prototype-only areas:

Viability gaps:

## Current State

## Intended State

## Definition Of Ready
```

## Index

Purpose: read-first routing guide for the spec.

```markdown
# <Spec Name> Index

## Read First

## Record Files

## Reviews

## Optional Generated Views

## Current Open Questions
```

## Status

Purpose: concise current state, not a log.

```markdown
# <Spec Name> Status

Current Phase:
Readiness:
Last Updated:

## Summary

## Blocking Questions

## Next Recommended Action
```

## Default Outgest

The default outgest is AI-readable records and indexes:

- compact source records directly under the spec folder
- routing and traceability files under the spec folder
- concise status in `status.md`
- readiness findings under `reviews/`

## Optional Sprint And Release Views

Files under `.agents/sprints/` and `.agents/releases/` are execution and
delivery views. They may be rewritten from specs, references, reviews, source
material, and `.agents/progress/` state when a stakeholder, project manager,
product manager, sprint planner, or external tool needs a specific document
shape.

Useful requested or derived views include:

- statements of work
- work orders
- sprint plans as timeboxed execution views, not spec replacements
- sprint results
- burndown or status reports
- release readiness summaries
- risk registers
- change summaries
- stakeholder progress updates
- source retirement reviews

Do not treat sprint or release views as the source of product truth.

If a requested or derived view introduces new scope, decisions, risks, assumptions,
acceptance criteria, evidence, or tasks, promote those facts back into records
or progress before relying on them.

Before generating a view, verify that the needed records and progress data
exist. If inputs are missing, state the gap in the requested or derived
document instead of inventing commitments or delivery state.

## Source Retirement Reviews

Use `.agents/releases/` or a spec review file when a user asks whether legacy
planning, progress, or documentation sources can be removed, archived, or
declared obsolete.

Discover actual project sources rather than assuming standard folder names.
Common examples include human planning folders, `docs/`, `docs/adr/`, existing
`specs/`, `roadmap/`, `.task-bank/`, issue exports, sprint notes, PRDs,
research notes, and project-specific folders. Treat this list as examples only.

A source retirement review should include one row per source:

```markdown
| Source | Role | Extracted To | Remaining Unique Value | Recommendation |
| --- | --- | --- | --- | --- |
```

Use recommendations such as:

- `keep`: important facts, rationale, validation history, examples, or context
  remain only in the source.
- `archive`: source is not needed for active routing but should be preserved as
  historical or evidentiary material.
- `delete-after-confirmation`: durable facts and active progress were extracted
  or superseded, and no important unique value remains.
- `unknown`: coverage could not be established from available records,
  progress, indexes, and source references.

Do not recommend deletion when source material is only linked by reference.
Either extract durable facts into records or preserve the source in an archive.
