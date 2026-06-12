---
name: chrisai-planning-agent-spec-validation
description: Use when `.agents/specs/` records have blockers, high-risk findings, unresolved decisions, risky assumptions, or open questions that need evidence before freeze or implementation.
---

# ChrisAI Planning Agent Spec Validation

Use this skill when agent spec records need evidence before they can be trusted
for freeze or implementation planning.

This skill validates records and updates AI-readable routing files. It does not
produce long human planning documents by default.

## Entry Conditions

Use this skill when any of these are true:

- review findings include unresolved `BLOCKER` or `HIGH` items
- decisions remain blocked by missing evidence
- assumptions may change architecture, MVP scope, security, data model, UX, or
  implementation sequencing
- imported documentation conflicts with current code or other source material
- brownfield current state and intended state do not match
- Phase 0 technical gates need validation before execution

## Input Boundary

Read only:

1. `.agents/specs/manifest.md`
2. `.agents/specs/<spec-id>/index.md`
3. `.agents/specs/<spec-id>/status.md`
4. relevant records
5. relevant routing files or indexes
6. relevant review findings
7. source files, docs, commands, or external references needed for the specific
   validation item

Do not load unrelated spec folders.

## Workflow

1. Confirm the spec ID and validation target.
2. Identify the specific `Q`, `ASM`, `RISK`, `DEC`, `AC`, or finding IDs to
   validate.
3. State the evidence needed before starting expensive work.
4. Gather acceptable evidence.
5. Create or update `EVD` records.
6. Update the validated records with pass, fail, fallback, deferred, or blocked
   status.
7. Update `traceability.md`, `open-questions.md`, `by-status.md`, and
   `by-source.md` as needed.
8. Update `reviews/findings.md` only when review findings change status.
9. Update `status.md` with readiness and next action.
10. Stop before freeze unless exit criteria are met.

## Evidence Rules

Accept:

- official documentation
- source references
- local code inspection
- tests or reproducible command output
- observed structured payloads
- screenshots or browser observations for UI behavior
- explicit fallback or scope decisions from the user

Reject:

- assumptions without evidence
- "should be possible" claims
- UI-only observation as proof of backend behavior
- post-execution audit as proof of pre-execution control
- stale imported docs when current code contradicts them

## Output Rules

Default outputs are records and indexes:

- `evidence.md`
- updated source records
- `traceability.md`
- `open-questions.md`
- `by-status.md`
- `by-source.md`
- `reviews/findings.md`, when findings change
- `status.md`

Do not create stakeholder, sprint, release, or implementation views unless the
user asks for them.

## Exit Criteria

Validation can exit successfully when:

- no unresolved `BLOCKER` findings remain
- `HIGH` findings are resolved, explicitly accepted, or deferred with rationale
- evidence exists for formerly blocked assumptions or decisions
- open questions no longer block the requested freeze scope
- `status.md` says the spec is ready for review, another validation pass, or
  freeze

For pure greenfield specs, do not recommend freeze or implementation planning
while unresolved `BLOCKER` findings remain or unresolved `HIGH` findings lack
evidence, explicit acceptance, or deferral rationale. Recommend another focused
validation pass or review update instead.

## Handoff

Before stopping, state:

- validation records updated
- evidence records created
- indexes updated
- remaining blockers or high-risk items
- whether the next skill is review, another validation pass, or freeze
