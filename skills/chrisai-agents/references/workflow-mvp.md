# MVP Workflow

Use this workflow to define, narrow, validate, or freeze the smallest
customer-usable product slice after setup and any required POC promotion.

This workflow owns MVP scope and acceptance. Active execution belongs in
`workflows/progress.md` or, for a documented multi-step goal, in
`workflows/goal-manager.md`.

## Read First

- `.agents/AGENTS.md`
- spec brief, status, requirements, capabilities, acceptance, decisions, risks,
  evidence, and MVP viability gaps
- POC results when the MVP depends on prior proof
- accepted wireframe and creative review notes when UX or visual direction is
  part of MVP
- review, validation, QA, grill, or gap reports that affect readiness

## May Update

- MVP-related `REQ`, `CAP`, `AC`, `DEC`, `RISK`, `EVD`, and `TASK` records
- `by-mvp.md`
- `mvp-viability-gaps.md`
- `traceability.md`
- `.agents/development/progress/`, only when converting accepted MVP scope into execution
  tracking

## Process

1. Identify the target customer or evaluator.
2. Define the smallest coherent workflow they must be able to complete.
3. Record minimum usable capabilities, data behavior, states, permissions,
   errors, empty states, and verification.
4. Exclude POC-only scaffolds and internal-only shortcuts from MVP acceptance.
5. Link requirements to acceptance criteria and evidence.
6. Reconcile grill reports, review findings, validation results, POC outcomes,
   wireframe decisions, creative direction, and QA feedback into records or
   explicit blockers before freeze.
7. Freeze proposed tasks only after blockers and high-risk gaps are resolved,
   accepted, or explicitly deferred.
8. Convert tasks to progress items only when execution is explicitly requested
   or when a goal-manager loop needs executable tracking.

## Stop Conditions

- MVP scope is customer-usable, not only technically demonstrable
- acceptance criteria cover the full target workflow
- POC dependencies have promotion decisions
- accepted POC, wireframe, creative, review, QA, and gap outcomes are promoted
  or explicitly deferred
- remaining gaps are recorded and routed to validation, freeze, progress, or
  goal-manager

## Handoff

State the customer-usable workflow, changed records, remaining gaps, and the
next workflow: validation, freeze, progress, or goal-manager.
