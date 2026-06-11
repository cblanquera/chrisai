---
name: chrisai-process-agent-progress
description: Use when a task is large enough to need filesystem-backed agent progress, itemized work packets, progress logs, decisions, or optional delegation across separate chat sessions while keeping each worker context small.
---

# ChrisAI Process Agent Progress

Use this skill for large artifact-production or multi-item tasks where a
single chat session is likely to drift, compact away important details, or
load too much context at once.

This skill creates a durable progress bank at `.agent/progress/` in the
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

- `.agent/progress/` progress bank structure
- item IDs, status, ownership, and progress logs
- small work packets for individual items or batches
- cross-item decisions and conventions
- handoff format between sessions
- deciding when separate sessions may help, then asking the user before using
  them

This skill does not own:

- domain-specific implementation choices
- product requirements, acceptance criteria, architecture decisions, planning
  evidence, or durable product risks that belong in `.agent/specs/`
- code, design, copy, image, video, data, or documentation quality standards
- final verification for the produced artifacts
- remote publication, release, or deployment decisions

Use the relevant domain skill alongside this process skill.

Use `.agent/specs/` as the preferred source for requirements, acceptance
criteria, durable product decisions, risks, constraints, and evidence. Progress
items should link to those spec records instead of duplicating them.

## Core Rule

Keep each active worker's context small.

A worker should normally read only:

1. `.agent/progress/brief.md`
2. `.agent/progress/conventions.md` when conventions affect the item
3. `.agent/progress/decisions.md` when prior decisions affect the item
4. one assigned item file or one assigned batch file
5. the specific source files needed for that item

Do not load the full progress bank unless acting as the coordinator or resolving a
cross-item conflict.

## Progress Bank Structure

Create the bank at `.agent/progress/` unless the user requests another
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
6. Group related item IDs into batch files only when batch execution improves
   focus.
7. Work on one assigned item or batch at a time.
8. Update the manifest after each item changes state.
9. Record durable execution decisions in `decisions.md`, not only in logs.
   Product, architecture, requirements, risk, and acceptance decisions belong
   in `.agent/specs/<spec-id>/records/decisions.md` when a spec bank exists.
10. Write a handoff before stopping, switching sessions, or delegating.

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
