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
- requirements link to acceptance criteria
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
3. Update decision and risk records when freeze decisions are made.
4. Update implementation-facing indexes such as `indexes/traceability.md` and
   `indexes/by-status.md`.
5. Generate proposed `TASK` records in `records/tasks.md`.
6. Generate `generated/implementation-plan.md` or `generated/sprint-plan.md`
   only when the user asks for human-readable or tool-specific views.
7. If the user wants active execution tracking, create or update
   `.agents/progress/` items that link back to spec records.
8. Stop before coding unless the user explicitly requests implementation.

## Progress Boundary

`.agents/specs/<spec-id>/records/tasks.md` contains proposed tasks.

`.agents/progress/items/` contains active executable work packets with owners,
status, outputs, acceptance criteria, and verification.

When creating progress items, include `Spec Links` to relevant `REQ`, `DEC`,
`RISK`, and `AC` records.

## Handoff

Before stopping, state:

- frozen scope
- indexes updated
- proposed task records
- active progress items created, if any
- recommended first item or batch
