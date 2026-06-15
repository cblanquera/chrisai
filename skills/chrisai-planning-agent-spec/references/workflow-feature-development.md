# Feature Development Workflow

Use this workflow after the MVP exists and the work shifts to bounded feature
streams, hardening, polish, expansion, release readiness, or ongoing product
maintenance.

This workflow owns feature-development phase routing. For bulk feedback, QA
mismatches, or repeated review loops, use `workflows/batch-reconciliation.md`
for the detailed feedback cycle.

Feature development repeats the same lifecycle as MVP when the work is
substantial:
feature-goal intake, spec split when bounded, POC or validation when risky,
wireframes or creatives when UI direction is unclear, progress execution, QA
feedback validation, planner reconciliation, and document integrity.

## Read First

- `.agents/AGENTS.md`
- MVP status, release readiness, open risks, and progress manifest
- `.agents/plans/feature-goals.md`
- the last or current progress item when selecting next work
- feedback summaries, QA notes, release readiness, or issue lists

## May Update

- `.agents/progress/`
- `.agents/plans/feature-goals.md` when user prompts identify new feature goals
- feature-development spec records
- `.agents/sprints/`
- `.agents/releases/`
- review or validation records when feedback changes durable scope

## Process

1. Confirm the feature-development objective: bounded feature stream, hardening,
   polish, expansion, release readiness, maintenance, or feedback
   reconciliation.
2. Compare the last or current progress item, progress manifest next-action
   text, and `.agents/plans/feature-goals.md`.
3. If the user's prompt identifies a new feature goal, record or reconcile it in
   `.agents/plans/feature-goals.md`.
4. Decide whether the work is a single item, a goal-manager loop, or a
   batch-reconciliation pass.
5. Create or recommend a sibling spec when the objective is a bounded product
   stream with its own acceptance criteria, risks, decisions, POCs, or multiple
   implementation items.
6. Promote durable scope changes into records before implementation.
7. Route uncertain, risky, or scope-changing items to validation, review, or a
   user decision.
8. For UI changes, reuse existing app patterns when clear. If the UI cannot be
   determined from existing artifacts, or a new UI pattern is proposed, route to
   `workflows/wireframes.md` and a hand-back review round before implementation.
9. Route user feedback through QA/validation and planner reconciliation before
   creating fix work.
10. Verify changed surfaces before marking feature-development work complete.
11. Update progress/status once at the end of the selected item, batch, or goal.
12. Before appending feedback, audit notes, issue lists, or rationale to an
   existing Markdown file, decide whether the addition stays compact. If not,
   refactor the file by splitting it or move the detail to references, a batch
   file, or a log and link back.

## Batch Default

When the user gives bulk feedback or more than five small related mismatches,
route to `workflows/batch-reconciliation.md`. This feature-development workflow
should record the phase objective and durable scope impact; the batch workflow
owns item classification, batch membership, implementation cadence,
verification, and progress update timing.

## Stop Conditions

- feature-development objective is classified
- feature-goal intake and current progress were checked
- selected workflow, batch, individual item, or goal-manager loop is justified
- feedback was validated or rejected before fix work started
- verification covers changed surfaces
- progress/status reflects the completed batch or blockers

## Handoff

Name the feature-development objective, selected workflow, skipped risky items,
verification run, progress update, and next action.
