---
name: chrisai-planning-agent-spec-import
description: Use when converting human planning documents, legacy `plans/` folders, PRDs, specs, sprint notes, or stakeholder docs into a compact AI-readable agent spec under `.agents/specs/`.
---

# ChrisAI Planning Agent Spec Import

Use this skill when source material already exists as human planning
documentation but the AI-readable source of truth should live under
`.agents/specs/`, with original source material preserved under
`.agents/plans/` when it should remain human-readable.

Do not copy a document forest into `.agents/specs/`. Preserve or index source
documents under `.agents/plans/`, extract compact records into specs, and link
to source material or `.agents/references/` as evidence.

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
4. Record source documents in `.agents/plans/source-documents.md`.
5. Extract requirements, capabilities, constraints, decisions, risks,
   assumptions, questions, acceptance criteria, and evidence into grouped
   record files.
6. When source material includes MVP journeys, product validation goals, or
   customer workflows, extract them into `CAP`, `REQ`, and `AC` records instead
   of leaving them only as linked documents.
7. When source material includes POCs, spikes, prototypes, or feasibility
   reports, import what each proof tested, what it proved, what remains unknown,
   and whether it should be promoted, replaced, discarded, or continued.
8. Mark confidence as `imported` unless evidence upgrades or conflicts exist.
9. Mark ambiguous, stale, duplicated, or conflicting content explicitly.
10. Update indexes for traceability, open questions, status, source, and MVP
   viability gaps.
11. Generate human-readable outputs only when requested.

Read `chrisai-planning-agent-spec/references/agent-spec-structure.md` for layout
and `chrisai-planning-agent-spec/references/record-model.md` for record fields.

## Import Rules

- Preserve source links or paths, usually from `.agents/plans/` or
  `.agents/references/`.
- Do not treat imported text as current truth without review.
- Prefer fewer grouped record files over many copied documents.
- When two documents conflict, create a question, risk, or conflicting record.
- When a document describes implementation tasks, import them as proposed
  `TASK` records, not active progress items.
- Do not collapse an MVP into a pointer to a large acceptance set. Preserve the
  minimal customer-facing journeys and viability goals as compact records so
  freeze and progress packets can link to them directly.
- Do not discard POC material just because it is not MVP-ready. Preserve it as
  evidence or POC-phase records, then require an explicit promotion decision
  before it feeds MVP tasks.
- Treat sprint plans as generated execution views. Import durable facts from
  them, but do not create a spec per sprint or let sprint groupings define
  product acceptance.

## Handoff

Before stopping, state:

- source documents inventoried
- spec ID
- records extracted
- conflicts or stale areas found
- next recommended skill
