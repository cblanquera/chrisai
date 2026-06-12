---
name: chrisai-planning-agent-spec-review
description: Use when a `.agents/specs/` agent spec needs adversarial readiness, risk, consistency, evidence, or traceability review before freeze or implementation.
---

# ChrisAI Planning Agent Spec Review

Use this skill to review an agent spec before freeze, implementation planning, or
major delegation.

Review records and evidence. Do not review sprint, release, or generated views
as the source of truth.

For pure greenfield projects, this skill owns the Grill Me With Docs-style
readiness pass for agent specs. When the grill session happened outside the
current session, ask for the path to the saved review file before completing the
review update. Import durable findings from that file into `reviews/` and
promote them into records.

## Input Boundary

Read only:

1. `.agents/specs/manifest.md`
2. `.agents/specs/<spec-id>/index.md`
3. `.agents/specs/<spec-id>/status.md`
4. relevant grouped record files
5. relevant routing files or indexes
6. relevant evidence records
7. a spec review packet or `.agents/references/` review packet, when it exists
   and the review objective is pure greenfield grill readiness
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
6. For POC-backed MVP specs, audit whether POC results were captured and
   explicitly promoted, replaced, discarded, or kept under investigation.
7. For MVP specs, audit whether compact records preserve customer-facing
   journeys and viability goals, not only implementation tasks, sprint phases,
   or linked acceptance-document sets.
8. Classify findings by severity.
9. Write or update `reviews/readiness-review.md` and `reviews/findings.md`.
10. Promote durable findings into records as questions, risks, assumptions, or
   decisions.
11. Update `status.md` with readiness and next action.

## Severity Model

- `BLOCKER`: cannot freeze or execute without resolution.
- `HIGH`: strongly recommended to resolve before freeze.
- `MEDIUM`: can proceed with documented risk.
- `LOW`: informational or cleanup.
- `QUESTION`: open question that may affect scope or decisions.

For MVP work, treat these as at least `HIGH`, and as `BLOCKER` before release
or MVP freeze when they affect the target workflow:

- MVP records only describe scaffolds, technical probes, or POC screens without
  a promotion decision.
- POC results are missing, inconclusive, or unreviewed but are being used as
  MVP implementation scope.
- Customer journeys exist only in archived or linked source documents and are
  not represented by compact records.
- Progress items can be verified without proving a user-facing workflow.
- Sprint or batch structure is being used as a substitute for product scope.

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
