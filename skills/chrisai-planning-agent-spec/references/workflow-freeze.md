# Freeze Workflow

Use this workflow when accepted `.agents/specs/` records should become an
implementation contract, proposed task records, or execution views.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/specs/manifest.md`
3. `.agents/specs/<spec-id>/index.md`
4. `.agents/specs/<spec-id>/status.md`
5. relevant requirements, acceptance, decisions, risks, evidence, and reviews

## May Update

- implementation-facing indexes such as `traceability.md` and `by-status.md`
- `.agents/specs/<spec-id>/tasks.md`
- `.agents/sprints/<sprint>.md`, only when requested
- `.agents/releases/<release>/`, only when requested
- `.agents/progress/`, only when the user asks for active execution tracking

## Entry Gate

Before freezing, confirm:

- target scope is clear
- blockers are resolved or explicitly accepted
- MVP scope describes a customer-usable product slice when MVP is in scope
- requirements link to acceptance criteria
- important decisions and risks are recorded
- POC results have a promotion, replacement, discard, or follow-up decision

## Process

1. Confirm or write the frozen target scope.
2. Identify POC-only current-state behavior and MVP viability gaps.
3. Update decision and risk records when freeze decisions are made.
4. Update implementation-facing routing files.
5. Generate proposed `TASK` records in `tasks.md`.
6. Generate sprint, release, or tool-specific views only when requested.
7. If the user wants active execution tracking, create progress items that link
   back to spec records.

## Stop Conditions

- frozen scope is explicit
- task records are traceable to requirements and acceptance
- active progress items exist only when requested
- next executable item or batch is named

