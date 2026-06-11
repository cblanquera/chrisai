---
name: chrisai-planning-agent-spec-import
description: Use when converting human planning documents, legacy `plans/` folders, PRDs, specs, sprint notes, or stakeholder docs into a compact AI-readable agent spec under `.agents/specs/`.
---

# ChrisAI Planning Agent Spec Import

Use this skill when source material already exists as human planning
documentation but the AI-readable source of truth should live under
`.agents/specs/`.

Do not copy a document forest into `.agents/specs/`. Extract compact records and
link to the source material as evidence.

## Source Types

Use this skill for:

- legacy `plans/` folders
- PRDs, sprint plans, work orders, stakeholder briefs, and scope docs
- architecture docs, ADRs, research notes, and acceptance docs
- pasted planning text or imported documentation files

Use `chrisai-planning-agent-spec-brownfield` instead when current code behavior
must be inspected or reconciled.

## Workflow

1. Inventory the provided documents without loading more than needed.
2. Choose or confirm one `<spec-id>`.
3. Create or update the agent spec skeleton.
4. Record source documents in `imports/source-documents.md`.
5. Extract requirements, capabilities, constraints, decisions, risks,
   assumptions, questions, acceptance criteria, and evidence into grouped
   record files.
6. Mark confidence as `imported` unless evidence upgrades or conflicts exist.
7. Mark ambiguous, stale, duplicated, or conflicting content explicitly.
8. Update indexes for traceability, open questions, status, and source.
9. Generate human-readable outputs only when requested.

Read `chrisai-planning-agent-spec/references/agent-spec-structure.md` for layout
and `chrisai-planning-agent-spec/references/record-model.md` for record fields.

## Import Rules

- Preserve source links or paths.
- Do not treat imported text as current truth without review.
- Prefer fewer grouped record files over many copied documents.
- When two documents conflict, create a question, risk, or conflicting record.
- When a document describes implementation tasks, import them as proposed
  `TASK` records, not active progress items.

## Handoff

Before stopping, state:

- source documents inventoried
- spec ID
- records extracted
- conflicts or stale areas found
- next recommended skill
