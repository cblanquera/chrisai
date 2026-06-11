---
name: chrisai-planning-agent-spec-review
description: Use when a `.agent/specs/` agent spec needs adversarial readiness, risk, consistency, evidence, or traceability review before freeze or implementation.
---

# ChrisAI Planning Agent Spec Review

Use this skill to review an agent spec before freeze, implementation planning, or
major delegation.

Review records and evidence. Do not review generated documents as the source of
truth.

## Input Boundary

Read only:

1. `.agent/specs/manifest.md`
2. `.agent/specs/<spec-id>/index.md`
3. `.agent/specs/<spec-id>/status.md`
4. relevant grouped record files
5. relevant indexes
6. relevant evidence records

Do not load unrelated agent specs.

## Workflow

1. Confirm the spec ID and review objective.
2. Inventory the record files reviewed.
3. Check requirements, decisions, risks, assumptions, acceptance criteria,
   evidence, and traceability.
4. Identify unsupported decisions, conflicting records, stale imported content,
   missing acceptance criteria, missing evidence, and MVP ambiguity.
5. Classify findings by severity.
6. Write or update `reviews/readiness-review.md` and `reviews/findings.md`.
7. Promote durable findings into records as questions, risks, assumptions, or
   decisions.
8. Update `status.md` with readiness and next action.

## Severity Model

- `BLOCKER`: cannot freeze or execute without resolution.
- `HIGH`: strongly recommended to resolve before freeze.
- `MEDIUM`: can proceed with documented risk.
- `LOW`: informational or cleanup.
- `QUESTION`: open question that may affect scope or decisions.

## Exit Rules

Do not route to freeze while unresolved `BLOCKER` findings remain.

Route to `chrisai-planning-agent-spec-validation` when blockers, high-risk
findings, assumptions, questions, or decisions need evidence.

Route to `chrisai-planning-agent-spec-freeze` only when the spec is ready to
freeze or the user explicitly accepts remaining risks.

## Handoff

Before stopping, state:

- finding counts by severity
- blocking records or questions
- whether freeze may proceed
- next recommended skill
