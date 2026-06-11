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
