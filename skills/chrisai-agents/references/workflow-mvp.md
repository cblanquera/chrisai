# MVP Workflow

Use this workflow to define, narrow, validate, or freeze the smallest viable
customer-usable product slice after research is complete.

This workflow owns MVP scope and acceptance. Active execution belongs in
`workflows/progress.md` or, for a documented multi-step goal, in
`workflows/goal-manager.md`.

Do not plan MVP feature-by-feature by default. Plan the smallest complete
accepted user workflow that real users can consume. POCs, static wireframes,
functional wireframes, and optional creative direction are research-phase
artifacts that must be accepted or explicitly deferred before MVP implementation
tasks are generated.

## Read First

- `.agents/AGENTS.md`
- `.agents/context/index.md`
- spec brief, status, requirements, capabilities, acceptance, decisions, risks,
  evidence, and MVP viability gaps
- root `proofs/<proof-slug>/results.md` when the MVP depends on prior proof
- root `wireframes/<flow-or-screen-set>/handoff.md`
- root `creatives/<direction-or-screen-set>/guidelines.md`, when creative
  direction is part of MVP
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
3. Confirm research readiness: required POCs have results, static wireframes
   are accepted, functional wireframes are accepted, and creative direction is
   accepted or explicitly deferred.
4. Define the smallest coherent workflow users must be able to complete.
5. Record minimum usable capabilities, data behavior, states, permissions,
   errors, empty states, and verification.
6. Exclude POC-only scaffolds and internal-only shortcuts from MVP acceptance.
7. Link requirements to acceptance criteria and evidence.
8. Reconcile grill reports, review findings, validation results, POC outcomes,
   wireframe decisions, creative direction, and QA feedback into records or
   explicit blockers before freeze.
9. Promote final product goals, shared constraints, cross-spec decisions,
   terminology, and non-goals into `.agents/context/`.
10. Freeze proposed tasks only after blockers and high-risk gaps are resolved,
   accepted, or explicitly deferred.
11. Generate MVP implementation tasks from the accepted workflow, not from a
   feature-by-feature backlog. Use this default task sequence unless the user
   directs otherwise:
   - accepted or deferred creative direction, plus app scaffold and mock backend
   - production frontend from accepted functional wireframes and creative
     guidelines
   - production backend from accepted workflow, data, and API requirements
   - frontend-to-mock-backend integration for user acceptance
   - frontend-to-finished-backend integration for user acceptance
   - backend debt, security, deployment preparation, operational readiness, and
     release hardening
12. Convert tasks to progress items only when execution is explicitly requested
   or when a goal-manager loop needs executable tracking.
13. If all accepted MVP tasks are complete but the MVP is still not viable or
    not accepted, stop. Tell the user what completed, why the MVP is not
    complete, and the viable options, then wait for the user's response. Do not
    create new MVP tasks or progress items automatically.

## Stop Conditions

- MVP scope is customer-usable, not only technically demonstrable
- acceptance criteria cover the full target workflow
- POC dependencies have promotion decisions
- required proof results, wireframe handoffs, creative guidelines, review, QA,
  and gap outcomes are promoted or explicitly deferred
- reusable MVP decisions and product understanding are promoted or reconciled
  into `.agents/context/`
- proposed MVP tasks follow the default viable-product delivery sequence unless
  the user directed otherwise
- remaining gaps are recorded and routed to validation, freeze, progress, or
  goal-manager
- if all MVP tasks are complete but MVP acceptance still fails, the user has
  been given options and execution is paused for a response

## Handoff

State the customer-usable workflow, changed records, remaining gaps, and the
recommended next step: validation, freeze, progress, goal-manager, user decision,
or no follow-up. When completed tasks did not produce a viable MVP, include
options such as revising MVP scope, adding accepted task records through freeze,
running validation, running a POC, revisiting wireframes or creatives, or
pausing the MVP.
