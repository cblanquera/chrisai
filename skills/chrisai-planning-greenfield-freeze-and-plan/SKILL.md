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

Before producing implementation planning artifacts, confirm one of these:

1. `plans/reviews/final-implementation-readiness-review.md` exists and all
   `BLOCKER` and `HIGH` findings are accepted, resolved, or explicitly
   deferred.
2. The user explicitly skipped grill review and that decision is recorded in
   `plans/decisions/deferred-decisions.md` or a matching decision summary.

If neither is true, stop and recommend
`chrisai-planning-greenfield-grill-review`.

When `plans/reviews/final-implementation-readiness-review.md` does not exist,
notify the user that the final grill review artifact is missing and do not
freeze the MVP, generate epics, or generate implementation tasks unless the
user explicitly chooses to skip grill review.

## Workflow

1. Review the discovery corpus and grill findings.
2. Triage each `BLOCKER` and `HIGH` finding as accepted, rejected, resolved, or
   deferred.
3. Update affected specs, ADRs, MVP docs, and decision summaries as needed.
4. Generate `plans/mvp/mvp-freeze.md` as the implementation contract.
5. Convert the frozen MVP into epics.
6. Map epics to acceptance criteria and dependencies.
7. Generate independently completable, testable tasks.
8. Recommend build order and sprint grouping.
9. Stop before implementation.

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

## Handoff

Before stopping, state:

- whether MVP freeze is complete
- remaining unresolved or deferred decisions
- generated implementation planning artifacts
- recommended first implementation epic or task
- which non-planning ChrisAI skill should own implementation next
