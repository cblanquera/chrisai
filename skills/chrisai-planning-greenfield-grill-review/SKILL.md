---
name: chrisai-planning-greenfield-grill-review
description: Use when a large greenfield app planning corpus already exists and needs a deep adversarial implementation-readiness review before MVP freeze or implementation planning.
---

# ChrisAI Planning Greenfield Grill Review

Use this skill after greenfield discovery has produced a planning corpus and
before MVP freeze or implementation planning begins. When `grill-with-docs` is
available, use it as the review method for this phase and write its findings
into the greenfield planning review outputs.

This skill is intentionally expensive. It may take a long time on large
planning corpuses. Do not trigger it for existing app features, small projects,
or casual review.

## Input Boundary

Read only the planning corpus needed for review:

- `plans/preplan-brief.md`
- `plans/AGENTS.md`
- `plans/research/*`
- `plans/specs/*`
- `plans/reviews/*`
- `plans/adr/*`
- `plans/spikes/*`
- `plans/decisions/*`
- `plans/mvp/*`
- `plans/acceptance/*`
- `plans/non-goals.md`

If key artifacts are missing, report the gap instead of inventing the missing
planning basis.

## Preflight

Before running the expensive grill review, check whether the planning corpus has
the expected discovery artifacts:

- `plans/preplan-brief.md`
- `plans/AGENTS.md`
- at least one file in `plans/specs/`
- `plans/reviews/architecture-review.md`
- ADR candidates or draft ADRs in `plans/adr/`
- decision summaries or readiness gaps in `plans/decisions/`
- MVP scope artifacts in `plans/mvp/`
- MVP-relevant acceptance criteria in `plans/acceptance/`
- research or spike artifacts when unresolved assumptions require evidence

If required artifacts are missing, notify the user before continuing. Recommend
returning to `chrisai-planning-greenfield-discovery` to backfill the missing
artifacts. Continue with a partial grill review only when the user explicitly
asks for that.

## Role

Act as a principal engineer, architect, security reviewer, product manager, and
skeptical CTO.

Do not defend the current architecture. Actively attempt to find flaws.

Do not propose implementation tasks.

## Workflow

1. Confirm the corpus is for a large unbuilt app.
2. Run the preflight checklist and stop for missing required artifacts unless
   the user explicitly requests a partial review.
3. Invoke or follow the Grill Me With Docs review method when available.
4. Inventory the planning artifacts reviewed.
5. Challenge assumptions and unsupported decisions.
6. Identify missing requirements, scaling risks, security risks, lock-in risks,
   operational risks, maintenance risks, and migration risks.
7. Review ADRs and present the strongest argument against each major decision.
8. Identify inconsistent decisions across documents.
9. Classify findings by severity.
10. Write the final readiness review.
11. If unresolved findings remain, summarize them, explain exactly what
    validation work would be performed in the next pass, then ask the user
    whether they want to proceed with
    `chrisai-planning-greenfield-validation-cycle`.

Read [review-model](references/review-model.md) for severity and report
structure.

## Outputs

Write:

- `plans/reviews/final-implementation-readiness-review.md`
- `plans/reviews/grill-findings.md`

## Severity Model

- `BLOCKER`: a decision cannot be made without additional evidence.
- `HIGH`: a decision has been made, but confidence is low and validation is
  strongly recommended.
- `MEDIUM`: decision may proceed, but future review is recommended.
- `LOW`: informational finding.
- `QUESTION`: open question that may influence future decisions.

## Validation Cycle Handoff

If the review process produces unresolved findings, inform the user, summarize
the results, explain exactly what validation work would be performed next, and
ask whether they want to proceed with
`chrisai-planning-greenfield-validation-cycle`.

Before asking the user to proceed, state:

- which findings or questions the Validation Cycle will address
- which validation methods will be used
- which files or systems will be inspected, researched, prototyped, or updated
- which artifacts are expected to be produced or changed
- what evidence would be enough to resolve or downgrade each finding
- what will remain out of scope for that pass

Do not downgrade findings without evidence. Do not treat assumptions or
opinions as decisions.

## Handoff

Before stopping, state:

- number of findings by severity
- whether any `BLOCKER` or `HIGH` findings remain
- whether freeze-and-plan may begin or validation-cycle is required
- if unresolved findings remain, explain the proposed validation work and ask
  whether the user wants to proceed with
  `chrisai-planning-greenfield-validation-cycle`
- the next recommended skill:
  `chrisai-planning-greenfield-validation-cycle` when unresolved findings
  remain, otherwise `chrisai-planning-greenfield-freeze-and-plan`
