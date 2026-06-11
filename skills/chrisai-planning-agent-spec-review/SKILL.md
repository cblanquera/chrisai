---
name: chrisai-planning-agent-spec-review
description: Use when a `.agent/specs/` agent spec needs adversarial readiness, risk, consistency, evidence, or traceability review before freeze or implementation.
---

# ChrisAI Planning Agent Spec Review

Use this skill to review an agent spec before freeze, implementation planning, or
major delegation.

Review records and evidence. Do not review generated documents as the source of
truth.

For pure greenfield projects, this skill owns the Grill Me With Docs-style
readiness pass for agent specs. When the grill session happened outside the
current session, ask for the path to the saved review file before completing the
review update. Import durable findings from that file into `reviews/` and
promote them into records.

## Input Boundary

Read only:

1. `.agent/specs/manifest.md`
2. `.agent/specs/<spec-id>/index.md`
3. `.agent/specs/<spec-id>/status.md`
4. relevant grouped record files
5. relevant indexes
6. relevant evidence records
7. `generated/grill-session-brief.md`, when it exists and the review objective
   is pure greenfield grill readiness
8. an external grill-results file path supplied by the user, when review
   already happened outside the current session

Do not load unrelated agent specs.

## Workflow

1. Confirm the spec ID and review objective.
2. For pure greenfield specs, determine whether to run the review now or import
   an already-saved grill-results file. If the results file is missing, ask
   where it is before claiming the initial spec is complete.
3. Inventory the record files and review packet or external results reviewed.
4. Check requirements, decisions, risks, assumptions, acceptance criteria,
   evidence, and traceability.
5. Identify unsupported decisions, conflicting records, stale imported content,
   missing acceptance criteria, missing evidence, and MVP ambiguity.
6. Classify findings by severity.
7. Write or update `reviews/readiness-review.md` and `reviews/findings.md`.
8. Promote durable findings into records as questions, risks, assumptions, or
   decisions.
9. Update `status.md` with readiness and next action.

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

For pure greenfield specs, after the initial review exists, repeat
`chrisai-planning-agent-spec-validation` passes and update review/status records
until unresolved `BLOCKER` findings are `0` and unresolved `HIGH` findings are
resolved, accepted, or explicitly deferred with rationale. Do not restart
discovery unless new scope makes the existing records materially stale.

Route to `chrisai-planning-agent-spec-freeze` only when the spec is ready to
freeze or the user explicitly accepts remaining risks.

## Handoff

Before stopping, state:

- finding counts by severity
- blocking records or questions
- whether freeze may proceed
- next recommended skill
