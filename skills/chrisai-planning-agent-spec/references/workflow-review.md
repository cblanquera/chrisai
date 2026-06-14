# Review Workflow

Use this workflow when a `.agents/specs/` record set needs readiness, risk,
consistency, evidence, or traceability review before freeze or implementation.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/specs/manifest.md`
3. `.agents/specs/<spec-id>/index.md`
4. `.agents/specs/<spec-id>/status.md`
5. relevant grouped record files
6. relevant evidence, traceability, and review packet files

Do not load unrelated spec folders.

## May Update

- `.agents/specs/<spec-id>/reviews/readiness-review.md`
- `.agents/specs/<spec-id>/reviews/findings.md`
- relevant `Q`, `RISK`, `ASM`, `DEC`, `AC`, or `EVD` records
- `.agents/specs/<spec-id>/status.md`

## Process

1. Confirm the spec ID and review objective.
2. Inventory the record files and review packet reviewed.
3. Check requirements, decisions, risks, assumptions, acceptance criteria,
   evidence, and traceability.
4. Identify unsupported decisions, conflicting records, stale imported content,
   missing acceptance criteria, missing evidence, and MVP ambiguity.
5. For POC-backed MVP specs, audit whether POC results were captured and
   explicitly promoted, replaced, discarded, or kept under investigation.
6. For MVP specs, audit whether compact records preserve customer-facing
   journeys and viability goals, not only implementation tasks or sprint phases.
7. Classify findings by severity.
8. Write or update review files.
9. Promote durable findings into records as questions, risks, assumptions, or
   decisions.
10. Update `status.md` with readiness and next action.

## Severity Model

- `BLOCKER`: cannot freeze or execute without resolution.
- `HIGH`: strongly recommended to resolve before freeze.
- `MEDIUM`: can proceed with documented risk.
- `LOW`: informational or cleanup.
- `QUESTION`: open question that may affect scope or decisions.

## Stop Conditions

- finding counts by severity are recorded
- blocking records or questions are explicit
- status says whether freeze may proceed
- next workflow is validation, freeze, or setup repair

