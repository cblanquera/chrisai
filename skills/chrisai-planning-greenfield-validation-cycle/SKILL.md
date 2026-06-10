---
name: chrisai-planning-greenfield-validation-cycle
description: Use after greenfield grill review and before freeze-and-plan when BLOCKER or HIGH findings, unresolved ADRs, risky assumptions, open questions, or Phase 0 gates need evidence-backed validation before implementation planning.
---

# ChrisAI Planning Greenfield Validation Cycle

Use this skill after greenfield grill review and before freeze-and-plan when
uncertainty must be converted into evidence-backed decisions.

This skill is a first-class planning workflow. It does not generate
implementation epics, implementation tasks, product code, or release plans.

Do not use this skill for existing app features, small projects, or casual
research.

## Entry Conditions

Use this skill when any of these are true:

- grill review produced unresolved `BLOCKER` or `HIGH` findings
- ADRs remain unresolved and block implementation confidence
- risky assumptions need evidence before decisions can be trusted
- open questions may change architecture, MVP scope, security posture, or
  implementation sequencing
- Phase 0 pre-implementation gates need validation

Use this skill before `chrisai-planning-greenfield-freeze-and-plan`.

Do not generate implementation epics while unresolved `BLOCKER` or `HIGH`
findings remain.

## Required Inputs

Read the relevant planning corpus:

- `plans/reviews/final-implementation-readiness-review.md`
- `plans/reviews/grill-findings.md`
- `plans/decisions/finalized-decisions.md`
- `plans/decisions/unresolved-decisions.md`
- relevant ADRs in `plans/adr/`
- relevant acceptance docs in `plans/acceptance/`
- relevant spikes in `plans/spikes/`
- relevant MVP docs in `plans/mvp/`
- relevant specifications in `plans/specs/`

If required review or decision inputs are missing, notify the user and stop
unless they explicitly request a partial validation pass.

## Workflow

1. Confirm this is a large greenfield app planning corpus.
2. Identify the findings, ADRs, assumptions, questions, or Phase 0 gates that
   need validation.
3. Explain exactly what validation work will be performed before asking the
   user whether to proceed.
4. Create or update the validation artifacts under `plans/validation/`.
5. Gather acceptable evidence.
6. Reject unsupported claims.
7. Record pass, fail, fallback, or deferral status for each validation item.
8. Update ADRs, specifications, and decision rollups when evidence changes
   readiness.
9. Separate Phase 0 architecture gates from product QA acceptance when mixed.
10. Stop before freeze-and-plan unless exit criteria are satisfied.

Read [validation-artifacts](references/validation-artifacts.md) for required
artifact structures.

## Required Outputs

Write or update:

- `plans/validation/evidence-matrix.md`
- `plans/validation/decision-log.md`
- `plans/validation/pre-implementation-prework.md`
- `plans/validation/validation-loop.md`
- finding-specific validation artifacts under `plans/validation/`
- affected ADRs and decision rollups when evidence changes readiness

Write `plans/validation/acceptance-gate-separation.md` when product QA
acceptance and Phase 0 architecture gates are mixed together.

## Evidence Rules

Accept evidence from:

- official docs
- source references
- local probes
- reproducible command transcripts
- observed structured payloads
- failure-mode reproduction
- explicit fallback decisions

Reject:

- assumptions
- UI-only observation for backend or runtime control
- terminal scraping as proof of structured control
- post-execution audit as proof of pre-execution control
- "should be possible" claims without evidence

## Validation Statuses

Use these statuses:

- `Not started`
- `Investigating`
- `Evidence recorded`
- `Passed`
- `Failed`
- `Fallback required`
- `Deferred by explicit decision`

## Decision Rules

- Failed gates must either block freeze-and-plan or be resolved by explicit
  fallback or scope change.
- Accepted fallback decisions must update ADRs, decision rollups, and
  implementation requirements.
- App-build-only checks may be deferred to release or milestone validation if
  they cannot be completed before implementation.
- Phase 0 architecture gates must be separated from product QA acceptance
  before freeze-and-plan.
- Do not downgrade findings without evidence.
- Do not treat assumptions or opinions as decisions.

## Exit Criteria

The Validation Cycle exits successfully only when:

- remaining `BLOCKER` findings are zero, or resolved by explicit accepted
  fallback or scope change
- remaining `HIGH` findings are zero, or explicitly deferred from
  implementation with rationale
- validation evidence exists for prior unknowns
- `plans/decisions/unresolved-decisions.md` no longer says implementation is
  blocked
- `plans/decisions/finalized-decisions.md` says ready for freeze-and-plan
- deferred implementation or release validation is clearly listed

If exit criteria fail, summarize the remaining work and ask whether the user
wants another Validation Cycle pass.

## Handoff

After successful exit, route to
`chrisai-planning-greenfield-freeze-and-plan`.

Before stopping, state:

- validation items completed
- evidence artifacts generated or updated
- ADRs, specs, or decision rollups updated
- remaining blockers or high findings, if any
- whether exit criteria were met
- whether the next skill is `chrisai-planning-greenfield-freeze-and-plan` or
  another validation pass
