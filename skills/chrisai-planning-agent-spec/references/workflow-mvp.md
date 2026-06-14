# MVP Workflow

Use this workflow to define or execute the smallest customer-usable product
slice after setup and any required POC promotion.

## Read First

- `.agents/AGENTS.md`
- spec brief, status, requirements, capabilities, acceptance, decisions, risks,
  evidence, and MVP viability gaps
- POC results when the MVP depends on prior proof

## May Update

- MVP-related `REQ`, `CAP`, `AC`, `DEC`, `RISK`, `EVD`, and `TASK` records
- `by-mvp.md`
- `mvp-viability-gaps.md`
- `traceability.md`
- `.agents/progress/`, when execution is requested

## Process

1. Identify the target customer or evaluator.
2. Define the smallest coherent workflow they must be able to complete.
3. Record minimum usable capabilities, data behavior, states, permissions,
   errors, empty states, and verification.
4. Exclude POC-only scaffolds and internal-only shortcuts from MVP acceptance.
5. Link requirements to acceptance criteria and evidence.
6. Freeze proposed tasks only after blockers and high-risk gaps are resolved,
   accepted, or explicitly deferred.
7. Convert tasks to progress items only when execution is requested.

## Stop Conditions

- MVP scope is customer-usable, not only technically demonstrable
- acceptance criteria cover the full target workflow
- POC dependencies have promotion decisions
- remaining gaps are recorded and routed to validation, freeze, or progress

