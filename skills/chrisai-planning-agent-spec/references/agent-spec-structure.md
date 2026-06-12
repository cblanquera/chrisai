# Agent Spec Structure

Use `.agents/` for AI-readable planning and execution state that should not
interfere with human-authored project documents. Use `.agents/specs/` for
durable product and feature scope.

## Layout

```text
.agents/
  AGENTS.md

  plans/
    source-documents.md

  poc/
    findings.md
    results.md
    snippets/

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

## Top-Level Folders

- `.agents/plans/`: original planning documents, PRDs, stakeholder notes, and
  imported source material preserved in human form.
- `.agents/poc/`: POC results, findings, snippets, and implementation notes.
  Actual prototype code should live outside `.agents/`.
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
initiative. For Lean or Agile product work, prefer this sequence:

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

Avoid creating a spec folder per sprint, topic, requirement, or implementation
task.

If the user talks about a sprint, create or update `.agents/sprints/<sprint>.md`
only after the durable spec scope exists. A sprint is a timebox for executing
work, not the source of product intent.

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

Human-facing deliverables explicitly requested by the user, such as a root
`plans/` folder, are first-class requested outputs. Create them in the requested
location and, when `.agents/` is writable, link or mirror durable planning facts
back into `.agents/specs/` and `.agents/references/`.

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

Do not treat sprint or release views as the source of product truth. Do not
ignore or relocate explicit human deliverables just because `.agents/specs/`
also exists.

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
Common examples include `plans/`, `docs/`, `docs/adr/`, `specs/`, `roadmap/`,
`.task-bank/`, issue exports, sprint notes, PRDs, research notes, and
project-specific folders. Treat this list as examples only.

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
