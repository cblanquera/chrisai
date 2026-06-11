# Agent Spec Structure

Use `.agents/specs/` for AI-readable planning and specification state that
should not interfere with human-authored project documents.

## Layout

```text
.agents/specs/
  manifest.md
  AGENTS.md

  <spec-id>/
    brief.md
    index.md
    status.md
    records/
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
    indexes/
      traceability.md
      open-questions.md
      by-mvp.md
      by-status.md
      by-source.md
    reviews/
      readiness-review.md
      findings.md
    imports/
      source-documents.md
    logs/
      YYYY-MM-DD.md
    generated/
      stakeholder-brief.md
      sow-<purpose>.md
      work-order-<id>.md
      sprint-plan-<sprint>.md
      sprint-results-<sprint>.md
      burndown-<period>.md
      release-summary-<version>.md
      source-retirement-review.md
```

Create grouped record files first. Do not create one file per record unless a
grouped file is too large, the record needs independent ownership, or a worker
must load it without unrelated records.

## Spec ID

Use one `<spec-id>` per bounded product, feature, release, migration, or major
initiative.

Good examples:

- `c4os-v1`
- `checkout-redesign`
- `plugin-marketplace`
- `workspace-import-export`

Avoid creating a spec folder per sprint, topic, requirement, or implementation
task.

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

- grouped source records under `records/`
- routing and traceability files under `indexes/`
- concise status in `status.md`
- readiness findings under `reviews/`

## Optional Generated Views

Files under `generated/` are disposable views. They may be rewritten from
records, indexes, reviews, source references, and `.agents/progress/` state when
a stakeholder, project manager, product manager, sprint planner, or external
tool needs a specific document shape.

Useful generated views include:

- statements of work
- work orders
- sprint plans
- sprint results
- burndown or status reports
- release readiness summaries
- risk registers
- change summaries
- stakeholder progress updates
- source retirement reviews

Do not treat generated files as the source of truth.

If a generated view introduces new scope, decisions, risks, assumptions,
acceptance criteria, evidence, or tasks, promote those facts back into records
or progress before relying on them.

Before generating a view, verify that the needed records and progress data
exist. If inputs are missing, state the gap in the generated document instead
of inventing commitments or delivery state.

## Source Retirement Reviews

Use `generated/source-retirement-review.md` when a user asks whether legacy
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
