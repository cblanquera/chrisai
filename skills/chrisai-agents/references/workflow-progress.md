# Progress Workflow

Use this workflow for large or multi-item execution that needs recoverable
state under `.agents/development/progress/`.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/development/progress/brief.md`
3. `.agents/development/progress/manifest.md`
4. `.agents/development/progress/conventions.md`, when conventions affect the item
5. `.agents/development/progress/decisions.md`, when prior decisions affect the item
6. `.agents/context/index.md`, when selecting product or spec-linked work
7. `.agents/context/feature-goals.md`, when selecting next work or routing a new
   feature goal
8. one assigned item file or batch file
9. source files directly required by the assigned work

Do not load the full progress bank unless acting as coordinator or resolving a
cross-item conflict.

## Structure

```text
.agents/development/progress/
  brief.md
  manifest.md
  decisions.md
  conventions.md
  outputs.md
  batches/
  items/
  logs/
```

## Process

1. Confirm active execution is allowed by accepted planning records before
   creating item or batch files.
2. Create the minimal progress bank when needed.
3. Break work into stable item IDs.
4. Write one item file per independent unit of work.
5. For product, MVP, distribution, or feature work, link each item to accepted
   `TASK`, `REQ`, `CAP`, or `AC` records from `.agents/specs/mvp/` or the
   relevant sibling feature spec.
6. Do not create progress items from a progress-hosted rebuild plan, chat-only
   plan, raw review note, raw feature-goal list, or unaccepted proposed task.
   Route missing or unaccepted MVP/distribution scope to `workflows/mvp.md`,
   `workflows/freeze.md`, or `workflows/review.md` before progress continues.
7. For POC work, state the feasibility question, `poc-<short-name>` branch, and
   the decision needed after the proof.
8. For feature-development or bulk feedback, read `workflows/batch-reconciliation.md`
   before editing when there are more than five small or related mismatches.
9. Do not turn raw user feedback directly into implementation work. Route it
   through validation or planner reconciliation first unless the evidence is
   already explicit in project artifacts.
10. Group related item IDs into batch files when batching improves focus,
   reduces repeated verification, or avoids inefficient micro-passes.
11. Keep risky, unclear, or contract-changing work as one item at a time.
12. Work on one assigned item or batch at a time.
13. When selecting next work, compare the last or current item, manifest
    next-action text, and `.agents/context/feature-goals.md`.
14. If a user prompt identifies a new feature goal, record or reconcile it in
    `.agents/context/feature-goals.md` before creating progress work.
15. Update the manifest after each item or batch changes state.
16. Record durable execution decisions in `decisions.md`.
17. If execution changes durable product understanding, promote it into
    `.agents/context/` or route it to document integrity before closeout.
18. Write a handoff before stopping, switching sessions, or delegating.

## Item Versus Batch

Use one item at a time for architecture, schema, auth, permissions, payment,
security, data model, deployment, unclear acceptance, validation blockers,
high rollback risk, or changes that touch unrelated surfaces.

Use batches for related low-to-medium-risk feedback by screen, workflow,
component, copy layer, responsive behavior, visual consistency, missing states,
or QA mismatches that can be verified together.

Batching work does not mean splitting files by default. Split or refactor a
Markdown file only when the target file is near the line limit, the addition is
large, or the content belongs in references, a batch file, or a log.

## Item Packet Template

```markdown
# item-001: <short title>

Status: ready
Type:
Phase: poc | mvp | feature-development | internal
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

## Status Model

Use `planned`, `ready`, `in_progress`, `blocked`, `review`, `done`, and
`verified` unless the project defines a narrower model.

Only mark an item `verified` after the stated verification was actually run.
Use `review` when implementation is ready for user or QA feedback. If feedback
arrives, keep or return the item to `review` or `blocked` until validation or
planner reconciliation decides whether a fix item, batch, question, or scope
change is needed.

## Stop Conditions

- manifest reflects current status
- item or batch file is updated
- log or handoff records what changed
- new durable decisions are in `decisions.md`
- feature-goal intake is checked when selecting next work
- user feedback has been validated, rejected, or routed before fix work starts
- next item or blocker is explicit
- recommended next step is included in the completion response
- batch work updates progress once at the end of the batch
