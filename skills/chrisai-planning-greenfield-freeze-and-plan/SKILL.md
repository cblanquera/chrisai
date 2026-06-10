---
name: chrisai-planning-greenfield-freeze-and-plan
description: Use after greenfield grill review is complete or explicitly skipped to resolve readiness findings, freeze the MVP, and convert the approved plan into epics, tasks, dependencies, and build order.
---

# ChrisAI Planning Greenfield Freeze And Plan

Use this skill after a large greenfield app has completed discovery and grill
review, or after the user explicitly decides to skip grill review.

This skill converts an approved planning corpus into an implementation
contract and backlog. It does not implement code.

Do not use this skill for existing app features, small projects, or discovery
work that has not reached readiness.

## Entry Gate

Before producing implementation planning artifacts, confirm all required
implementation-readiness conditions are true:

- `plans/reviews/final-implementation-readiness-review.md` exists, or the user
  explicitly skipped grill review and that decision is recorded in
  `plans/decisions/deferred-decisions.md` or a matching decision summary.
- `BLOCKER` findings are `0`.
- `HIGH` findings are `0`.
- validation evidence exists for decisions that were previously blocked by
  uncertainty.
- MVP scope is frozen or can be frozen from resolved inputs.
- MVP-relevant acceptance criteria exist.

If the final grill review artifact is missing and the user did not explicitly
skip grill review, stop and recommend
`chrisai-planning-greenfield-grill-review`.

When `plans/reviews/final-implementation-readiness-review.md` does not exist,
notify the user that the final grill review artifact is missing and do not
freeze the MVP, generate epics, or generate implementation tasks unless the
user explicitly chooses to skip grill review.

If any required readiness condition fails, do not proceed to implementation
planning. Instead, summarize the failed conditions and ask whether the user
wants to do another pass to enter a Validation Cycle. Before asking, explain
exactly what validation work would be performed, which findings or decisions it
would address, which artifacts would be updated, and what evidence would be
enough to resume freeze-and-plan. The next pass should convert uncertainty into
evidence-backed decisions, update ADRs and specifications, update decisions,
and then re-run freeze-and-plan.

## Workflow

1. Review the discovery corpus and grill findings.
2. Confirm `BLOCKER` findings are `0`, `HIGH` findings are `0`, and validation
   evidence exists for decisions that were previously blocked by uncertainty.
3. If readiness fails, stop, summarize the proposed validation work, and ask
   whether the user wants to proceed with a Validation Cycle for another pass.
4. Update affected specs, ADRs, MVP docs, and decision summaries as needed.
5. Generate `plans/mvp/mvp-freeze.md` as the implementation contract.
6. Convert the frozen MVP into epics.
7. Map epics to acceptance criteria and dependencies.
8. Generate independently completable, testable tasks.
9. Recommend build order and sprint grouping.
10. Stop before implementation.

Read [planning-outputs](references/planning-outputs.md) for required output
structures.

## Outputs

Write or update:

- `plans/decisions/finalized-decisions.md`
- `plans/decisions/unresolved-decisions.md`
- `plans/decisions/deferred-decisions.md`
- `plans/mvp/mvp-freeze.md`
- `plans/implementation/epics.md`
- `plans/implementation/epic-dependencies.md`
- `plans/implementation/recommended-build-order.md`
- `plans/implementation/tasks.md`
- `plans/implementation/sprint-plan.md`

## Task Rules

Each implementation task must be:

- independently completable
- objectively testable
- small enough for a coding agent
- linked to MVP requirements
- linked to acceptance criteria
- explicit about dependencies
- explicit about completion criteria

Prioritize architecture validation before feature completeness.

Never ignore `BLOCKER` findings, downgrade findings without evidence, proceed
with unresolved blockers, treat assumptions as decisions, or treat opinions as
evidence.

## Handoff

Before stopping, state:

- whether MVP freeze is complete
- remaining unresolved or deferred decisions
- if readiness failed, the exact validation work proposed and whether the user
  wants to proceed with a Validation Cycle
- generated implementation planning artifacts
- recommended first implementation epic or task
- which non-planning ChrisAI skill should own implementation next
