# Agent Progress Bank Structure

Create `.agents/progress/` at the project root unless the user requests another
location or the repository already has an equivalent planning folder.

## Layout

```text
.agents/progress/
  brief.md
  manifest.md
  decisions.md
  conventions.md
  outputs.md
  batches/
    batch-001.md
  items/
    item-001.md
  logs/
    item-001.md
```

## `brief.md`

Purpose: durable goal and definition of done.

```markdown
# Agent Progress Brief

Goal:

Non-Goals:

Constraints:

Definition Of Done:

POC Gate:

MVP Or Product Viability Gate:

Source Materials:

Verification Expectations:
```

For POC work, `POC Gate` should state the feasibility question, expected proof,
and decision needed after the proof.

For MVP work, `Definition Of Done` must include a customer-facing viability
gate, not only sprint completion, implementation phases, or test commands. The
gate should identify the target user workflow and the evidence needed to call
the slice usable.

## `manifest.md`

Purpose: dashboard and routing index. Keep detailed notes out of this file.

```markdown
# Agent Progress Manifest

| ID | Type | Status | Owner | Output | Notes |
| --- | --- | --- | --- | --- | --- |
| item-001 | web-page | ready | unassigned | src/pages/example.tsx | |
```

Use stable IDs. Do not rename IDs after work starts.

## `decisions.md`

Purpose: durable execution decisions that affect multiple progress items.
Product, architecture, requirements, risk, and acceptance decisions belong in
the relevant spec `decisions.md`.

```markdown
# Decisions

## DEC-001: <short title>

Date:
Status: active

Decision:

Reason:

Applies To:
```

## Relationship To `.agents/specs/`

Use `.agents/specs/` for durable intent: requirements, decisions, risks,
constraints, acceptance criteria, and evidence.

Use `.agents/progress/` for active execution: assigned work packets, statuses,
owners, outputs, verification, logs, and handoffs.

Progress items should link to relevant spec records instead of copying their
full text.

Sprints and batches are execution organization. They can group items by
timebox, dependency, or focus area, but they must not replace specs as the
source of product scope or acceptance.

## `conventions.md`

Purpose: shared style, naming, architecture, quality, or output conventions.

```markdown
# Conventions

## Naming

## Structure

## Style

## Verification
```

## `outputs.md`

Purpose: final artifact index.

```markdown
# Outputs

| ID | Output | Status | Verification |
| --- | --- | --- | --- |
```

## Line Limits

Keep each file under 500 lines. If a file approaches the limit:

- move item-specific detail into item files
- move long execution history into logs
- summarize old log entries
- split large batches into smaller batches
