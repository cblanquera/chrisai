---
name: chrisai-planning-agent-spec
description: Use when planning should create or maintain an AI-readable file-based agent spec under `.agent/specs/`, including greenfield prompts, imported planning docs, brownfield codebases, readiness review, or conversion into implementation progress.
---

# ChrisAI Planning Agent Spec

Use this router when the deliverable is an AI-readable planning source of truth
under `.agent/specs/`.

The agent spec replaces document-heavy planning corpuses for new work. It
ingests the same kinds of inputs as traditional planning, but the default
outputs are compact records and indexes for AI workers to consume.

## Layer Model

Use these boundaries:

- `.agent/specs/`: durable intent, requirements, decisions, risks, evidence,
  reviews, indexes, and optional generated planning views.
- `.agent/progress/`: active execution state, assigned work packets, batches,
  progress logs, and handoffs.
- `plans/`: legacy or human-facing planning documents unless the user says
  otherwise.

Do not recreate a large `plans/` document forest inside `.agent/specs/`.

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
- Start with grouped record files, not one file per record.
- Use stable record IDs such as `REQ-001`, `DEC-001`, and `AC-001`.
- Treat generated docs as disposable views, not source of truth.
- Do not create generated human documents unless the user asks for them.
- Promote durable findings from logs or reviews into records.
- Distinguish current state from intended state for brownfield work.
- Route active execution to `chrisai-process-agent-progress`.

## Structure

Read [agent-spec-structure](references/agent-spec-structure.md) before creating a
new agent spec or changing folder layout.

Read [record-model](references/record-model.md) when creating, importing,
reviewing, or freezing records.

## Standalone Rule

This family is self-contained. Do not load or defer to other planning skill
families for discovery, review, validation, or freeze behavior.

When migrating a legacy `plans/` corpus or other human planning documents,
import them as source material and extract compact records. Do not copy every
legacy document into `.agent/specs/`.
