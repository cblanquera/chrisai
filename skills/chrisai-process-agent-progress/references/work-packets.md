# Work Packets

Use work packets to make each item executable by a future worker with a small
context load.

## Item Packet

```markdown
# item-001: <short title>

Status: ready
Type:
Phase: poc | mvp | post-mvp | internal
Priority:
Owner: unassigned

## Goal

## Feasibility Question

- <POC question to answer, or "not applicable">

## User Workflow

- <customer-facing workflow, evaluator workflow, or "internal-only">

## Inputs

- <source file, reference, prompt, design, or data>

## Spec Links

- <.agents/specs/<spec-id>/... record ID or file>

## Outputs

- <file or artifact to create or modify>

## Constraints

## Acceptance Criteria

- <observable requirement>

## Product Viability Check

- <UI, data, state, error, empty-state, or workflow check needed for product work, or "not applicable for POC">

## POC Result

- <proved, failed, inconclusive, needs follow-up, or "not applicable">

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
- a phase label, especially `poc` or `mvp` when the distinction matters
- a feasibility question for POC work
- a stated user workflow or an explicit internal-only label
- acceptance criteria that can be checked
- a product viability check for customer-facing MVP work
- a POC result before POC work is used as input for MVP planning
- verification steps
- links to relevant decisions or conventions
- links to relevant `.agents/specs/` records when a spec bank exists
- enough context to start without reading unrelated items

Avoid packets that require the worker to infer scope from the original chat.
Avoid packets that treat a POC screen, scaffold, spike, sprint name, or
technical test as the product acceptance target.
