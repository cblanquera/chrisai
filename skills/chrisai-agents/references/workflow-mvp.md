# MVP Workflow

Use this workflow to define, narrow, validate, or freeze the smallest
customer-usable product slice after setup and any required POC promotion.

This workflow owns MVP scope and acceptance. Active execution belongs in
`workflows/progress.md` or, for a documented multi-step goal, in
`workflows/goal-manager.md`.

## Read First

- `.agents/AGENTS.md`
- `.agents/context/index.md`
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
- `.agents/context/`, when MVP work clarifies reusable product goals,
  constraints, decisions, terms, or non-goals
- `.agents/development/progress/`, only when converting accepted MVP scope into execution
  tracking

## Process

1. Identify the target customer or evaluator.
2. Read `.agents/context/` and confirm the MVP is based on accepted research or
   accepted POC learning, not raw discovery notes.
3. Define the smallest coherent workflow they must be able to complete.
4. Record minimum usable capabilities, data behavior, states, permissions,
   errors, empty states, and verification.
5. Exclude POC-only scaffolds and internal-only shortcuts from MVP acceptance.
6. Link requirements to acceptance criteria and evidence.
7. Reconcile grill reports, review findings, validation results, POC outcomes,
   wireframe decisions, creative direction, and QA feedback into records or
   explicit blockers before freeze.
8. Promote final product goals, shared constraints, cross-spec decisions,
   terminology, and non-goals into `.agents/context/`.
9. Freeze proposed tasks only after blockers and high-risk gaps are resolved,
   accepted, or explicitly deferred.
10. Convert tasks to progress items only when execution is explicitly requested
   or when a goal-manager loop needs executable tracking.

## Stop Conditions

- MVP scope is customer-usable, not only technically demonstrable
- acceptance criteria cover the full target workflow
- POC dependencies have promotion decisions
- accepted POC, wireframe, creative, review, QA, and gap outcomes are promoted
  or explicitly deferred
- reusable MVP decisions and product understanding are promoted or reconciled
  into `.agents/context/`
- remaining gaps are recorded and routed to validation, freeze, progress, or
  goal-manager

## Handoff

State the customer-usable workflow, changed records, remaining gaps, and the
recommended next step: validation, freeze, progress, goal-manager, or no
follow-up.
