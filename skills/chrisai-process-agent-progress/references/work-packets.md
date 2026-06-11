# Work Packets

Use work packets to make each item executable by a future worker with a small
context load.

## Item Packet

```markdown
# item-001: <short title>

Status: ready
Type:
Priority:
Owner: unassigned

## Goal

## Inputs

- <source file, reference, prompt, design, or data>

## Spec Links

- <.agent/specs/<spec-id>/records/... record ID or file>

## Outputs

- <file or artifact to create or modify>

## Constraints

## Acceptance Criteria

- <observable requirement>

## Verification

- <command, browser check, render check, review step, or manual inspection>

## Dependencies

- <item ID or decision ID>

## Notes
```

## Batch Packet

Use batches only for related items that can be worked together without loading
the whole bank.

```markdown
# batch-001: <short title>

Status: ready
Owner: unassigned

## Items

- item-001
- item-002

## Shared Context

## Execution Order

1. item-001
2. item-002

## Batch Acceptance Criteria

## Verification
```

## Packet Quality

A good packet has:

- one clear goal
- explicit inputs and outputs
- acceptance criteria that can be checked
- verification steps
- links to relevant decisions or conventions
- links to relevant `.agent/specs/` records when a spec bank exists
- enough context to start without reading unrelated items

Avoid packets that require the worker to infer scope from the original chat.
