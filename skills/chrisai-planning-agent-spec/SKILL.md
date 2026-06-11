---
name: chrisai-planning-agent-spec
description: Use when planning should create or maintain an AI-readable file-based agent spec under `.agent/specs/`, including greenfield prompts, imported planning docs, brownfield codebases, readiness review, or conversion into implementation progress.
---

# ChrisAI Planning Agent Spec

Use this router when the deliverable is an AI-readable planning source of truth
under `.agent/specs/`.

The agent spec creates an AI-readable planning layer for new work. It ingests
the same kinds of inputs as traditional planning, but the default outputs are
compact records, indexes, and optional generated views for AI workers and
project stakeholders to consume.

## Layer Model

Use these boundaries:

- `.agent/specs/`: durable intent, requirements, decisions, risks, evidence,
  reviews, indexes, and optional generated planning views.
- `.agent/progress/`: active execution state, assigned work packets, batches,
  progress logs, and handoffs.
- Human planning documents: legacy or human-facing planning documents unless
  the user says otherwise.

Do not recreate a large human planning document forest inside `.agent/specs/`.
Preserve or link source material when it contains useful detail, rationale,
validation history, or stakeholder context that compact records should not
copy.

Before any legacy planning, progress, or documentation source is removed,
archived, or declared obsolete, run a source retirement audit. Discover actual
project sources instead of assuming fixed folder names. Examples may include
`plans/`, `docs/`, `docs/adr/`, `specs/`, `roadmap/`, `.task-bank/`, issue
exports, sprint notes, PRDs, research notes, or project-specific folders. Treat
examples as non-exhaustive; classify every discovered source by whether its
durable facts were extracted into records, its active execution state moved to
progress, and its remaining rationale, validation history, examples, or
stakeholder context must be preserved.

## Specialist Routes

- Use `chrisai-planning-agent-spec-discovery` when starting from a prompt, product
  idea, or sparse greenfield description.
- Use `chrisai-planning-agent-spec-import` when starting from human planning
  documents and little or no existing code.
- Use `chrisai-planning-agent-spec-brownfield` when starting from an existing
  codebase, with or without human documentation.
- Use `chrisai-planning-agent-spec-review` when an agent spec needs adversarial
  readiness, risk, consistency, or evidence review.
- Use `chrisai-planning-agent-spec-validation` when blockers, high-risk
  findings, assumptions, questions, or decisions need evidence before freeze.
- Use `chrisai-planning-agent-spec-freeze` when approved spec records should be
  frozen into implementation-facing indexes, proposed task records, and
  optional agent-progress items.

## Pure Greenfield Readiness Loop

For pure greenfield projects, the agent-spec path must preserve the same
readiness discipline as the legacy greenfield flow while keeping records as the
source of truth:

1. Discovery creates compact records and, when a grill session would otherwise
   lack enough context, a generated grill-session packet under
   `generated/grill-session-brief.md`.
2. The grill or adversarial review results are saved under `reviews/`, using
   `reviews/readiness-review.md` for the narrative review and
   `reviews/findings.md` for durable findings.
3. When review happened outside the current session, ask for the review file
   path before completing or updating the initial spec records. Import durable
   findings into questions, risks, assumptions, decisions, evidence, or
   acceptance records instead of treating the external file as the only source.
4. After the initial review exists, repeat validation-cycle passes with
   `chrisai-planning-agent-spec-validation`, updating review/status records
   after each pass, until unresolved `BLOCKER` findings are `0` and unresolved
   `HIGH` findings are resolved, accepted, or explicitly deferred with
   rationale.

Do not invoke implementation planning from the pure greenfield agent-spec path
until this validation cycle has completed or the user explicitly accepts the
remaining risk. Do not restart discovery or regenerate the grill-session packet
unless new scope makes the existing records or packet materially stale.

## Core Rules

- Keep `.agent/specs/<spec-id>/records/` compact.
- Treat compact records as short, stable, source-linked planning facts, not
  lossy replacements for every source document.
- Start with grouped record files, not one file per record.
- Use stable record IDs such as `REQ-001`, `DEC-001`, and `AC-001`.
- Treat generated docs as disposable views, not source of truth.
- Generate human-facing documents only when the user asks for them or an
  established workflow explicitly requires them.
- Before generating human-facing documents, check whether the needed records,
  indexes, reviews, and progress data exist. Report gaps instead of inventing
  missing scope, status, or commitments.
- If a generated document introduces new scope, decisions, risks, assumptions,
  acceptance criteria, or tasks, promote that information back into records or
  progress before treating it as durable.
- Before saying a legacy source can be deleted or retired, produce an explicit
  source retirement decision for that source. If source material is only linked
  by reference, do not call it safely removable.
- Promote durable findings from logs or reviews into records.
- Distinguish current state from intended state for brownfield work.
- Route active execution to `chrisai-process-agent-progress`.
  Use `.agent/specs/` for agreed intent and `.agent/progress/` for delivery
  state.

## Structure

Read [agent-spec-structure](references/agent-spec-structure.md) before creating a
new agent spec or changing folder layout.

Read [record-model](references/record-model.md) when creating, importing,
reviewing, or freezing records.

## Standalone Rule

This family is self-contained. Do not load or defer to other planning skill
families for discovery, review, validation, or freeze behavior.

When migrating human planning documents, import them as source material and
extract compact records. Do not copy every legacy document into
`.agent/specs/`.
