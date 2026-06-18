# Freeze Workflow

Use this workflow when accepted `.agents/specs/` records should become an
implementation contract, proposed task records, or execution views.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/specs/manifest.md`
3. `.agents/context/index.md`, when product context exists
4. `.agents/specs/<spec-id>/index.md`
5. `.agents/specs/<spec-id>/status.md`
6. relevant requirements, acceptance, decisions, risks, evidence, and reviews
7. accepted POC, wireframe, creative, validation, QA, feedback, and gap reports
   that affect the freeze target

## May Update

- implementation-facing indexes such as `traceability.md` and `by-status.md`
- `.agents/context/` when freeze clarifies reusable product understanding
- `.agents/specs/<spec-id>/tasks.md`
- `.agents/development/sprints/<sprint>.md`, only when requested
- `.agents/releases/<release>/`, only when requested
- `.agents/development/progress/`, only when the user asks for active execution tracking

## Entry Gate

Before freezing, confirm:

- target scope is clear
- blockers are resolved or explicitly accepted
- MVP scope describes a customer-usable product slice when MVP is in scope
- requirements link to acceptance criteria
- important decisions and risks are recorded
- POC results have a promotion, replacement, discard, or follow-up decision
- reusable product goals, constraints, decisions, terms, and non-goals are
  promoted or reconciled into `.agents/context/`
- accepted wireframe and creative decisions are promoted into requirements,
  acceptance, risks, or implementation inputs
- validated feedback and QA results are reconciled; raw feedback is not treated
  as frozen scope
- manual grill or review reports have no unresolved blocker/high findings unless
  they are explicitly accepted or deferred

## Process

1. Confirm or write the frozen target scope.
2. Identify POC-only current-state behavior and MVP viability gaps.
3. Promote accepted POC, wireframe, creative, validation, QA, and feedback
   outcomes into durable records.
4. Promote reusable freeze decisions and product understanding into
   `.agents/context/`.
5. Update decision and risk records when freeze decisions are made.
6. Update implementation-facing routing files.
7. Generate proposed `TASK` records in `tasks.md`.
8. Generate sprint, release, or tool-specific views only when requested.
9. If the user wants active execution tracking, create progress items that link
   back to spec records.

## Stop Conditions

- frozen scope is explicit
- task records are traceable to requirements and acceptance
- accepted artifacts and feedback are promoted or explicitly deferred
- `.agents/context/` reflects reusable freeze outcomes or explicitly needs no
  change
- active progress items exist only when requested
- recommended next step or executable item is named
