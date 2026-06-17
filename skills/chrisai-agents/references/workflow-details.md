# Workflow Details

Use this reference when generating or repairing local `.agents/workflows/*.md`
files that need more than the compact templates in `workflow-templates.md`.

## Goal Manager Details

The goal manager owns orchestration, active goal state, delegation, next-action
decisions, QA and validation gates, document integrity, and escalation. It
routes specialist workflows; it does not replace them.

Manager duties:

1. Confirm the active documented goal, scope, non-goals, and done definition.
2. Compare the last or current progress item, progress manifest next-action
   text, `.agents/context/index.md`, and `.agents/context/feature-goals.md`.
3. If the user's prompt identifies a new feature goal, record or reconcile it
   in `.agents/context/feature-goals.md`.
4. Decompose the goal into the smallest useful item or batch.
5. Choose the next specialist workflow and delegate when useful.
6. Keep progress state current.
7. Run QA or validation before marking work complete.
8. Run `workflows/document-integrity.md` before checkpointing or closeout.
9. Continue autonomously unless a stop-and-ask condition applies.

Stop and ask only when:

- a blocker requires a business or product decision
- multiple valid approaches exist and the choice materially affects the product
- required information cannot be determined from project artifacts
- a proposed change would alter MVP scope

Delegation briefs should name the goal, allowed scope, inputs, outputs,
acceptance criteria, verification expectation, and files or folders to avoid.

When the user gives a rough goal, rewrite it into an executable goal prompt
before starting work. Include goal statement, scope, non-goals, source
documents or artifacts to follow, done definition, QA or validation
expectation, document-integrity expectation, and first action. Ask for
confirmation only when the prompt exposes a stop-and-ask condition.

## Loop Phases

Name the current loop phase in progress, handoffs, and checkpoint reports:

- `intake`
- `grill-review`
- `gap-reconciliation`
- `poc`
- `design`
- `freeze`
- `implementation`
- `qa-feedback`
- `fix-reconciliation`
- `closeout`

## Feedback Loop

When reviewer feedback arrives:

1. Classify each item as bug, missed requirement, design mismatch, QA issue,
   new scope, product decision, or invalid feedback.
2. Ask QA or validation to reproduce, inspect, or reject feedback before
   implementation when the issue is not already proven by artifact evidence.
3. Reconcile validated feedback into records, progress state, open questions,
   or explicit rejection notes before fixes start.
4. Batch related low-to-medium-risk fixes.
5. Isolate architecture, schema, security, permission, data-model, deployment,
   or scope-changing feedback as one item at a time.
6. Implement only the selected item or batch.
7. Verify changed surfaces.
8. Update progress and durable records once at the end of the item or batch.
9. Repeat from QA validation when the fix is still not working or misses an
   accepted item; do not start another implementation pass from raw chat
   feedback alone.

## Loop Escape

Stop and escalate instead of repeating the same work when:

- the same item, batch, feedback point, or validation target fails twice without
  new evidence
- the manager is about to rerun the same workflow with the same inputs and
  expected output
- QA reports the same failure after a fix and the cause is still unclear
- implementation changes are cycling between two states or approaches
- the next action is only "try again" without a different hypothesis, narrower
  scope, or new verification method
- progress state has not materially changed after one full loop through
  implementation, QA, and planner reconciliation

A retry is allowed only when the next pass has a new hypothesis, new evidence,
narrower scope, or different verification method.

Before escalating, write a short stuck report with active goal, repeated loop
or item, attempted work, evidence gathered, why another retry is not justified,
and options for the user or next workflow.

## Hand-Back Review

When work is ready for user review, state:

- what to review
- phase and review round
- target artifact
- what changed
- verified checks
- concrete review questions
- what approval unlocks
- whether approval covers only the current round

Round approval is not phase approval unless the full phase scope is complete.

## Git Commit Policy

The goal manager may create incremental local commits only when the active goal
explicitly allows auto-commit.

Before committing:

- inspect `git status`
- identify unrelated dirty files and leave them unstaged
- stage only files owned by the completed item, batch, or checkpoint
- run required QA, validation, and document-integrity checks
- write a focused commit message tied to the item, batch, or checkpoint

Never push unless the user explicitly requests it. If unrelated changes overlap
with files needed for the commit, stop and ask.

## POC Branch Policy

Each POC should have its own branch named `poc-<short-name>`. Keep prototype
code for that proof only on its POC branch. Do not combine multiple unrelated
POCs on one branch.

Do not switch branches or create a POC branch unless the user explicitly asks
for implementation or branch work. Before switching or creating a branch, check
`git status`. If unrelated dirty changes exist, stop and ask how to proceed.

When a POC is accepted, promote only the accepted learning or reusable code
into the target product/spec branch through an explicit merge, cherry-pick, or
reimplementation decision. Do not treat the whole POC branch as product code by
default.

## Batch Criteria

Use batches when:

- feedback items are related by screen, workflow, component, theme, or copy
- fixes are low-to-medium risk
- changed surfaces can be verified together
- separate passes would repeat setup, context loading, or verification
- work is polish, consistency cleanup, responsive fixes, missing states, small
  interaction fixes, or QA reconciliation

Use one item at a time when:

- the item changes architecture, schema, auth, permissions, payment, security,
  data model, or deployment
- acceptance is unclear
- the item is blocked on validation
- multiple possible fixes need evidence before choosing
- rollback risk is high
- the change touches many unrelated surfaces

For batch reconciliation, list mismatches with surface, severity, dependency,
source feedback, and verification method. Pick 8-15 related mismatches unless
risk requires a smaller batch. Split out invalid, unvalidated, unclear,
scope-changing, or risky items.

## Progress Item Template

```markdown
# item-001: <short title>

Status: ready
Type:
Phase: research | poc | mvp | feature-development | internal
Priority:
Owner: unassigned

## Goal

## Inputs

## Spec Links

## Branch

For POC work: poc-<short-name>

## Outputs

## Acceptance Criteria

## Verification

## Dependencies

## Notes
```

Use `planned`, `ready`, `in_progress`, `blocked`, `review`, `done`, and
`verified` unless the project defines a narrower model. Only mark an item
`verified` after the stated verification was actually run.

## Freeze Entry Gate

Before freezing, confirm:

- target scope is clear
- blockers are resolved or explicitly accepted
- MVP scope describes a customer-usable product slice when MVP is in scope
- requirements link to acceptance criteria
- important decisions and risks are recorded
- POC results have a promotion, replacement, discard, or follow-up decision
- accepted wireframe and creative decisions are promoted into requirements,
  acceptance, risks, or implementation inputs
- validated feedback and QA results are reconciled
- manual grill or review reports have no unresolved blocker/high findings
  unless explicitly accepted or deferred

## Validation Evidence Rules

Accept official documentation, source references, local code inspection, tests
or reproducible command output, observed structured payloads, screenshots for
UI behavior, and explicit fallback or scope decisions from the user.

Reject assumptions without evidence, "should be possible" claims, UI-only proof
of backend behavior, and stale docs when current code contradicts them.

For implementation feedback, classify the feedback as reproduced, not
reproduced, invalid, expected behavior, missed requirement, design mismatch, QA
issue, new scope, or product decision.

## Review Severity Model

- `BLOCKER`: cannot freeze or execute without resolution.
- `HIGH`: strongly recommended to resolve before freeze.
- `MEDIUM`: can proceed with documented risk.
- `LOW`: informational or cleanup.
- `QUESTION`: open question that may affect scope or decisions.

Manual grill reports may be used as review input. Reconcile each material
finding into a record, blocker, validation target, accepted risk, or explicit
rejection.
