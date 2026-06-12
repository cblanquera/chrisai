---
name: chrisai-process-agent-progress
description: Use when a task is large enough to need filesystem-backed agent progress, itemized work packets, progress logs, decisions, or optional delegation across separate chat sessions while keeping each worker context small.
---

# ChrisAI Process Agent Progress

Use this skill for large artifact-production or multi-item tasks where a
single chat session is likely to drift, compact away important details, or
load too much context at once.

This skill creates a durable progress bank at `.agents/progress/` in the
workspace. The progress bank is the source of truth for active item scope,
status, execution decisions, logs, and handoffs.

## Trigger Conditions

Use agent progress when the request involves one or more of these signals:

- many pages, components, documents, images, videos, slides, data files, or
  other artifacts
- many independent implementation, migration, review, or repair items
- a long-running task that may span multiple chat sessions
- detailed style, strategy, acceptance, or reporting requirements
- repeated risk of losing track of what is done, blocked, current, or next

Do not use this skill for small tasks that fit cleanly in the active chat.

## Ownership

This skill owns:

- `.agents/progress/` progress bank structure
- item IDs, status, ownership, and progress logs
- small work packets for individual items or batches
- cross-item decisions and conventions
- handoff format between sessions
- deciding when separate sessions may help, then asking the user before using
  them

This skill does not own:

- domain-specific implementation choices
- product requirements, acceptance criteria, architecture decisions, planning
  evidence, or durable product risks that belong in `.agents/specs/`
- code, design, copy, image, video, data, or documentation quality standards
- final verification for the produced artifacts
- remote publication, release, or deployment decisions

Use the relevant domain skill alongside this process skill.

Use `.agents/specs/` as the preferred source for requirements, acceptance
criteria, durable product decisions, risks, constraints, and evidence. Progress
items should link to those spec records instead of duplicating them.

POC progress items are allowed when the work is intentionally proving
feasibility before MVP. Mark them as POC work, keep their acceptance criteria
focused on the question being tested, and record whether the result was proved,
failed, inconclusive, or needs another pass.

When a progress bank moves from POC to MVP, each active MVP item must preserve
the product viability boundary from the spec. A verified item proves its stated
slice is implemented and checked; it does not prove the MVP is customer-ready
unless the item also links to customer-facing acceptance criteria or an
MVP-level release gate that checks the full workflow.

Do not let MVP progress drift into unpromoted POC continuation. If an MVP item
starts from a spike, prototype, scaffold, or proof screen, write the item goal
and acceptance criteria around the promoted user-facing behavior. Use the POC
as input evidence or current-state context.

## Core Rule

Keep each active worker's context small.

A worker should normally read only:

1. `.agents/progress/brief.md`
2. `.agents/progress/conventions.md` when conventions affect the item
3. `.agents/progress/decisions.md` when prior decisions affect the item
4. one assigned item file or one assigned batch file
5. the specific source files needed for that item

Do not load the full progress bank unless acting as the coordinator or resolving a
cross-item conflict.

## Progress Bank Structure

Create the bank at `.agents/progress/` unless the user requests another
location or the repo already has an equivalent planning folder.

Read [agent-progress-structure](references/agent-progress-structure.md) for
the file layout and templates.

Keep every progress bank file under 500 lines. Prefer 80-200 lines for active item
files. When a log grows too large, summarize it into the item file and start a
new dated log entry.

## Workflow

1. Identify whether the task is large enough for a progress bank.
2. If a bank already exists, read only `manifest.md`, `brief.md`, and any
   directly relevant item or batch files.
3. If no bank exists, create the minimal bank:
   - `brief.md`
   - `manifest.md`
   - `decisions.md`
   - `conventions.md`
   - `items/`
   - `batches/`
   - `logs/`
4. Break the work into stable item IDs.
5. Write one item file per independent unit of work.
6. For POC work, state the feasibility question and the decision needed after
   the proof. For product or MVP work, link each item to the relevant customer
   workflow, capability, or acceptance record. If no such record exists, mark
   the item as planning or blocked until the spec is clarified.
7. Group related item IDs into batch files only when batch execution improves
   focus.
8. Work on one assigned item or batch at a time.
9. Update the manifest after each item changes state.
10. Record durable execution decisions in `decisions.md`, not only in logs.
   Product, architecture, requirements, risk, and acceptance decisions belong
   in the relevant spec `decisions.md`.
11. Write a handoff before stopping, switching sessions, or delegating.

Read [work-packets](references/work-packets.md) for item and batch packet
templates.

## Separate Session Gate

Separate sessions may help when:

- items are mostly independent
- each item has clear inputs, outputs, and acceptance criteria
- workers will not frequently edit the same files
- shared decisions and conventions are already written in the progress bank
- each worker can verify or report its own result

Do not spawn or delegate to separate chat sessions automatically.

When these conditions are met, ask the user whether they want separate
sessions before proceeding. Include:

- why separate sessions may help
- which item IDs or batches would be assigned
- what each session should read
- what each session must write back
- what coordination risks remain

Read [session-delegation](references/session-delegation.md) for the delegation
prompt and reconciliation checklist.

## Status Model

Use these manifest statuses unless the task requires something narrower:

- `planned`
- `ready`
- `in_progress`
- `blocked`
- `review`
- `done`
- `verified`

Only mark an item `verified` after the stated verification was actually run.

Only mark MVP or release-gate items `verified` after verification covers the
customer workflow, not just isolated technical tests. Technical proof may be
recorded as implementation evidence, but customer-facing MVP readiness needs a
workflow, UI, data, state, and failure-mode check appropriate to the item.

## Handoff

Before ending a large-task turn, leave the progress bank recoverable:

- update `manifest.md`
- update the relevant item or batch file
- append a concise log entry
- record new durable decisions in `decisions.md`
- state the next recommended item ID or batch

Read [handoff](references/handoff.md) for the required handoff format.

## Guardrails

- The progress bank is the source of truth; chat memory is not.
- Prefer explicit IDs over prose names.
- Keep reports as indexes and dashboards, not long journals.
- Keep item files self-contained enough for a future worker to start without
  reading unrelated items.
- Do not duplicate long strategy or style documents into every item file; link
  to them and summarize only the item-specific constraints.
- Do not overwrite unrelated user work when reconciling parallel sessions.
- Do not treat sprint names, batch names, or implementation phases as product
  acceptance. They are execution organization only.
