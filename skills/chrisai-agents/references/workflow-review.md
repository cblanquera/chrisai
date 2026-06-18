# Review Workflow

Use this workflow when a `.agents/specs/` record set needs readiness, risk,
consistency, evidence, or traceability review before freeze or implementation.

This workflow judges record quality and readiness. Use
`workflows/document-integrity.md` instead when the question is whether indexes,
status files, progress state, releases, or derived views have drifted.

Manual grill reports may be used as review input. This workflow reconciles
their findings into questions, risks, decisions, evidence needs, or blockers;
it does not replace the griller's adversarial questioning process.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/specs/manifest.md`
3. `.agents/context/index.md`, when product context exists
4. `.agents/specs/<spec-id>/index.md`
5. `.agents/specs/<spec-id>/status.md`
6. relevant grouped record files
7. relevant evidence, traceability, and review packet files
8. manual grill report, QA report, or feedback packet when provided

Do not load unrelated spec folders.

## May Update

- `.agents/specs/<spec-id>/reviews/readiness-review.md`
- `.agents/specs/<spec-id>/reviews/findings.md`
- relevant `Q`, `RISK`, `ASM`, `DEC`, `AC`, or `EVD` records
- `.agents/context/`, when review reconciles reusable product understanding
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
8. For manual grill reports, reconcile each material finding into a record,
   blocker, validation target, accepted risk, or explicit rejection.
9. Write or update review files.
10. Promote durable findings into records as questions, risks, assumptions, or
   decisions.
11. Promote reusable product findings into `.agents/context/` when future specs
    should inherit them.
12. Update `status.md` with readiness and next action.
13. If the review changes routing, status, indexes, context, or progress state, run
    `workflows/document-integrity.md` before closeout.

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
- manual grill or feedback findings are reconciled when provided
- reusable findings are promoted into `.agents/context/` or explicitly left in the
  reviewed spec only
- recommended next step is validation, freeze, document integrity, setup
  repair, or no follow-up

## Handoff

State the review objective, severity counts, changed records, readiness result,
and recommended next step.
