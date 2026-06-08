# Task Bank Structure

Create `.task-bank/` at the project root unless the user requests another
location or the repository already has an equivalent planning folder.

## Layout

```text
.task-bank/
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
# Task Bank Brief

Goal:

Non-Goals:

Constraints:

Definition Of Done:

Source Materials:

Verification Expectations:
```

## `manifest.md`

Purpose: dashboard and routing index. Keep detailed notes out of this file.

```markdown
# Task Bank Manifest

| ID | Type | Status | Owner | Output | Notes |
| --- | --- | --- | --- | --- | --- |
| item-001 | web-page | ready | unassigned | src/pages/example.tsx | |
```

Use stable IDs. Do not rename IDs after work starts.

## `decisions.md`

Purpose: durable decisions that affect multiple items.

```markdown
# Decisions

## DEC-001: <short title>

Date:
Status: active

Decision:

Reason:

Applies To:
```

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
