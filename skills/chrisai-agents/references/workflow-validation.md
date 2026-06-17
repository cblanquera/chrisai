# Validation Workflow

Use this workflow when blockers, high-risk findings, assumptions, questions,
QA feedback, user feedback, or decisions need evidence before freeze,
implementation, or another fix pass.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/development/specs/manifest.md`
3. `.agents/development/specs/<spec-id>/index.md`
4. `.agents/development/specs/<spec-id>/status.md`
5. relevant records and review findings
6. source files, docs, commands, or external references needed for the specific
   validation target
7. active progress item, batch, QA note, screenshot, recording, reproduction
   steps, or user feedback when validating implementation feedback

Do not load unrelated spec folders.

## May Update

- `.agents/development/specs/<spec-id>/evidence.md`
- validated source records
- `traceability.md`
- `open-questions.md`
- `by-status.md`
- `by-source.md`
- `reviews/findings.md`, when findings change
- `status.md`
- `.agents/development/progress/` item, batch, or log files when feedback validation affects
  active work

## Process

1. Confirm the spec ID, active progress item or batch if any, and validation
   target.
2. Identify the specific `Q`, `ASM`, `RISK`, `DEC`, `AC`, or finding IDs to
   validate. For implementation feedback, identify the feedback item and
   claimed mismatch.
3. State the evidence needed before expensive work.
4. Gather acceptable evidence.
5. Classify feedback as reproduced, not reproduced, invalid, expected behavior,
   missed requirement, design mismatch, QA issue, new scope, or product
   decision.
6. Create or update `EVD` records.
7. Update validated records, feedback notes, or progress state with pass, fail,
   fallback, deferred, rejected, or blocked status.
8. Route reproduced low-to-medium-risk fixes to progress or batch
   reconciliation, and route scope-changing or uncertain feedback to review,
   MVP, feature development, or the user.
9. Update indexes and findings.
10. Update `status.md` or progress state with readiness and next action.

## Evidence Rules

Accept official documentation, source references, local code inspection, tests
or reproducible command output, observed structured payloads, screenshots for UI
behavior, and explicit fallback or scope decisions from the user.

Reject assumptions without evidence, "should be possible" claims, UI-only proof
of backend behavior, and stale docs when current code contradicts them.

## Stop Conditions

- evidence records exist or the validation remains explicitly blocked
- blocker/high-risk status is updated
- feedback is reproduced, rejected, deferred, or routed
- next workflow is review, another validation pass, freeze, progress, batch
  reconciliation, or goal-manager

## Handoff

State the validation target, evidence gathered, feedback classification,
records or progress files updated, and the next owner.
