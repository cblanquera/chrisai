# Goal Manager Workflow

Use this workflow when a documented overall goal should be executed
autonomously across planning, design, implementation, QA, documentation, and
handoff loops.

The goal manager owns orchestration, active goal state, delegation, next-action
decisions, QA and validation gates, document integrity, and escalation to the
user. It routes specialist workflows; it does not replace them.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/workflows/progress.md`
3. `.agents/workflows/document-integrity.md`
4. `.agents/progress/manifest.md`
5. `.agents/plans/feature-goals.md`
6. the last or current progress item, active goal, batch, spec, release, or
   handoff packet
7. directly relevant requirements, acceptance criteria, architecture decisions,
   designs, POC evidence, QA notes, and source files

Do not load the full knowledge base unless coordinating a cross-goal conflict.

## May Update

- `.agents/progress/`
- `.agents/plans/feature-goals.md` when user prompts identify new feature goals
- relevant spec records, indexes, status files, and traceability files
- `.agents/poc/`, `.agents/wireframes/`, `.agents/creatives/`, or
  `.agents/releases/` when the active goal produces durable results there
- review, validation, QA, or handoff records

## Manager Duties

1. Confirm the active documented goal, scope, non-goals, and done definition.
2. Compare the last or current progress item, progress manifest next-action
   text, and `.agents/plans/feature-goals.md` before deciding what to do next.
3. If the user's prompt identifies a new feature goal, record or reconcile it in
   `.agents/plans/feature-goals.md`.
4. Decompose the goal into the smallest useful item or batch.
5. Choose the next specialist workflow and delegate when useful.
6. Keep progress state current.
7. Run QA or validation before marking work complete.
8. Run `workflows/document-integrity.md` before checkpointing or closeout.
9. Continue autonomously unless a stop-and-ask condition applies.

## Loop Phases

Name the current loop phase in progress, handoffs, and checkpoint reports:

- `intake`: goal, scope, non-goals, gaps, and done definition are being shaped
- `grill-review`: manual or agent review is finding blockers, gaps, and weak
  assumptions
- `gap-reconciliation`: planner updates records, blockers, and next workflow
- `poc`: feasibility proof is being specified, built, validated, or promoted
- `design`: wireframe or creative rounds are being drafted and reviewed
- `freeze`: accepted records are becoming MVP scope and proposed tasks
- `implementation`: developer is working a progress item or batch
- `qa-feedback`: feedback is being reproduced, rejected, classified, or routed
- `fix-reconciliation`: validated fixes are being batched or isolated
- `closeout`: verification, document integrity, and next action are being set

## Stop And Ask

Stop and ask the user only when:

- a blocker requires a business or product decision
- multiple valid approaches exist and the choice materially affects the product
- required information cannot be determined from project artifacts
- a proposed change would alter MVP scope

## Delegation Rules

- Use planning workflows for requirements, gaps, freeze, scope, and status.
- Use review workflow for readiness, risk, evidence, traceability, and manual
  grill-report reconciliation; do not turn review into implementation.
- Use POC or validation workflows for uncertain feasibility, blockers, risky
  claims, or high-impact decisions.
- Use wireframe and creative workflows for design artifacts and review rounds.
- Use progress workflow for implementation items, batches, logs, and handoffs.
- Use batch reconciliation for bulk feedback, QA mismatches, or repeated review
  loops.
- Use document integrity whenever records, indexes, status, progress, releases,
  or derived views may drift.

Give each delegated agent or specialist a narrow brief: goal, allowed scope,
inputs, outputs, acceptance criteria, verification expectation, and files or
folders to avoid.

## Goal Prompt Help

When the user gives a rough goal, rewrite it into an executable goal prompt
before starting work. Include:

- goal statement
- scope
- non-goals
- source documents or artifacts to follow
- done definition
- QA or validation expectation
- document-integrity expectation
- first action

Ask the user to confirm only when the prompt exposes a stop-and-ask condition.
If the goal is too broad, propose the smallest useful goal slice and name what
remains out of scope.

Use `.agents/plans/feature-goals.md` as planning input, not as an
implementation queue. If the proposed goal is a bounded product stream with its
own acceptance criteria, risks, decisions, POCs, or multiple implementation
items, create or recommend a sibling spec under `.agents/specs/` instead of
continuing to add work to the initial/root spec.

## Feedback Loop

When reviewer feedback arrives:

1. Classify each item as bug, missed requirement, design mismatch, QA issue,
   new scope, product decision, or invalid feedback.
2. Ask QA or validation to reproduce, inspect, or reject feedback before
   implementation when the issue is not already proven by artifact evidence.
3. Have the planner reconcile validated feedback into records, progress state,
   open questions, or explicit rejection notes before fixes start.
4. Batch related low-to-medium-risk fixes.
5. Isolate architecture, schema, security, permission, data-model, deployment,
   or scope-changing feedback as one item at a time.
6. Implement only the selected item or batch.
7. Verify the changed surfaces.
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

Before escalating, write a short stuck report with:

- active goal
- repeated loop or item
- what was attempted
- evidence gathered
- why the next retry is not justified
- options for the user or next specialist workflow

## Artifact Promotion

Before MVP freeze, feature-development closeout, or goal completion, confirm
accepted outputs from POCs, wireframes, creatives, reviews, QA, and feedback
loops are promoted into the right source-of-truth surface:

- feasibility results into `.agents/poc/`, evidence, decisions, risks, and
  MVP viability gaps
- accepted UX, flow, and creative direction into specs, acceptance criteria,
  wireframe or creative review notes, and progress inputs
- rejected alternatives and invalid feedback into review, QA, or progress notes
- active execution state into progress items, batches, manifest, and handoffs

## Feature-Development UI Decisions

For feature-development goals that affect UI, first look for an existing app
pattern, documented wireframe, accepted creative direction, or established
component behavior that fits the goal.

Use the existing pattern autonomously when the intended UI is clear and the
change does not alter product scope.

Route to `workflows/wireframes.md` and use the hand-back review format before
implementation when:

- the manager cannot determine the UI from existing artifacts
- multiple valid UI approaches would materially affect the product
- the manager wants to introduce a new UI pattern not already used in the app
- approval is needed for a suggested new screen, flow, state, control, or
  interaction model

When a new feature-development wireframe is introduced, record it in
`.agents/wireframes/`, link it from the active progress item or batch, and
promote durable UX decisions into spec records before implementation.

## Hand-Back Review

When work is ready for user review, tell the user what to review, the phase and
round, target artifact, what changed, verified checks, concrete review
questions, what approval unlocks, and whether approval covers only the current
round. Round approval is not phase approval unless the full phase scope is
complete.

When the review target is browser-visible and the in-app browser is available,
show or verify it there. If the browser is unavailable, provide the local URL,
file path, screenshot, recording, or artifact name to review.

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

## Stop Conditions

- active goal is complete and QA or validation has passed
- progress state, status, and durable records reflect the result
- document-integrity gate has passed or remaining drift is explicit
- next action is clear, or a hard blocker has been escalated

## Handoff

State the active goal, delegated workflows or agents, completed work, QA or
validation evidence, document-integrity result, blockers, and the next action.
