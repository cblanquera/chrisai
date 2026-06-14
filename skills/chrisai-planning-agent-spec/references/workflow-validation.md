# Validation Workflow

Use this workflow when blockers, high-risk findings, assumptions, questions, or
decisions need evidence before freeze or implementation.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/specs/manifest.md`
3. `.agents/specs/<spec-id>/index.md`
4. `.agents/specs/<spec-id>/status.md`
5. relevant records and review findings
6. source files, docs, commands, or external references needed for the specific
   validation target

Do not load unrelated spec folders.

## May Update

- `.agents/specs/<spec-id>/evidence.md`
- validated source records
- `traceability.md`
- `open-questions.md`
- `by-status.md`
- `by-source.md`
- `reviews/findings.md`, when findings change
- `status.md`

## Process

1. Confirm the spec ID and validation target.
2. Identify the specific `Q`, `ASM`, `RISK`, `DEC`, `AC`, or finding IDs to
   validate.
3. State the evidence needed before expensive work.
4. Gather acceptable evidence.
5. Create or update `EVD` records.
6. Update validated records with pass, fail, fallback, deferred, or blocked
   status.
7. Update indexes and findings.
8. Update `status.md` with readiness and next action.

## Evidence Rules

Accept official documentation, source references, local code inspection, tests
or reproducible command output, observed structured payloads, screenshots for UI
behavior, and explicit fallback or scope decisions from the user.

Reject assumptions without evidence, "should be possible" claims, UI-only proof
of backend behavior, and stale docs when current code contradicts them.

## Stop Conditions

- evidence records exist or the validation remains explicitly blocked
- blocker/high-risk status is updated
- next workflow is review, another validation pass, or freeze

