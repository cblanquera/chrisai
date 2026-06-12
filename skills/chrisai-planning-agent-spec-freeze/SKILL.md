---
name: chrisai-planning-agent-spec-freeze
description: Use when approved `.agents/specs/` records should be frozen into implementation-facing indexes and, when requested, `.agents/progress/` work packets.
---

# ChrisAI Planning Agent Spec Freeze

Use this skill when an agent spec is ready to become an implementation contract.

This skill freezes implementation planning from records into AI-readable
indexes and proposed task records. It creates active agent-progress work
packets only when the user asks to start execution or explicitly wants progress
tracking prepared.

## Entry Gate

Before freezing, confirm:

- spec ID is known
- `status.md` does not show unresolved blockers
- MVP or target scope is clear
- any required POC step has an explicit result: proved, failed, inconclusive,
  or intentionally skipped
- POC results have been promoted into MVP records or recorded as remaining
  risks, questions, or non-MVP work
- MVP scope describes a customer-usable product slice, not only POC screens,
  prototype scaffolding, or technical proof
- requirements link to acceptance criteria
- GUI-facing MVP requirements have acceptance criteria for workflows, states,
  data behavior, and verification from the user's perspective
- important decisions and risks are recorded
- review has run or the user explicitly skips review
- for pure greenfield specs, `reviews/readiness-review.md` and
  `reviews/findings.md` exist unless the user explicitly skipped review
- unresolved `BLOCKER` findings are `0`
- unresolved `HIGH` findings are resolved, explicitly accepted, or deferred
  with rationale

If blockers remain, recommend `chrisai-planning-agent-spec-review`,
`chrisai-planning-agent-spec-validation`, or focused record updates instead of
freezing.

If the review artifact is missing for a pure greenfield spec and the user did
not explicitly skip review, ask whether the grill or adversarial review already
happened. If it did, ask for the saved review file path and route to
`chrisai-planning-agent-spec-review` to import it before freezing. If it did
not, recommend `chrisai-planning-agent-spec-review`.

## Workflow

1. Read only the spec index, status, relevant records, relevant indexes, and
   latest review.
2. Confirm or write the frozen target scope.
3. Identify any POC-only current-state behavior, record the corresponding MVP
   viability gaps, and decide whether to keep, replace, discard, or continue
   investigating each POC result before producing tasks.
4. Update decision and risk records when freeze decisions are made.
5. Update implementation-facing routing files such as `traceability.md` and
   `by-status.md`.
6. Generate proposed `TASK` records in `tasks.md`.
7. Generate `.agents/sprints/<sprint>.md`, `.agents/releases/<release>/`, or a
   human-readable implementation view only when the user asks for a timeboxed,
   release, or tool-specific view.
8. If the user wants active execution tracking, create or update
   `.agents/progress/` items that link back to spec records.
9. Stop before coding unless the user explicitly requests implementation.

## Progress Boundary

`.agents/specs/<spec-id>/tasks.md` contains proposed tasks.

`.agents/progress/items/` contains active executable work packets with owners,
status, outputs, acceptance criteria, and verification.

When creating progress items, include `Spec Links` to relevant `REQ`, `DEC`,
`RISK`, and `AC` records.

Do not convert a POC screen or technical spike into an MVP progress item as if
it were the deliverable. First promote the proof into intended customer-facing
requirements and acceptance criteria, then create the item from those records.
Cite the POC as input evidence or current-state context.

A sprint plan in `.agents/sprints/` may group tasks or progress items by
timebox, priority, or dependency. It must not redefine scope independently from
spec records.

## Handoff

Before stopping, state:

- frozen scope
- indexes updated
- proposed task records
- active progress items created, if any
- recommended first item or batch
