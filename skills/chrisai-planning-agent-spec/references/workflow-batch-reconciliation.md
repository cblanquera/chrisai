# Batch Reconciliation Workflow

Use this workflow when the user gives bulk feedback, QA finds many mismatches,
or work starts drifting into inefficient micro-passes.

## Use Batches When

- feedback items are related by screen, workflow, component, theme, or copy
- fixes are low-to-medium risk
- changed surfaces can be verified together
- separate passes would repeat setup, context loading, or verification
- work is polish, consistency cleanup, responsive fixes, missing states, small
  interaction fixes, or QA reconciliation

## Use One Item At A Time When

- the item changes architecture, schema, auth, permissions, payment, security,
  data model, or deployment
- acceptance is unclear
- the item is blocked on validation
- multiple possible fixes need evidence before choosing
- rollback risk is high
- the change touches many unrelated surfaces

## Process

1. Stop micro-passes and audit first.
2. List mismatches with surface, severity, dependency, and verification method.
3. Pick 8-15 related mismatches unless risk requires a smaller batch.
4. Implement the batch together.
5. Verify changed surfaces together.
6. Update progress, logs, and status once at the end.
7. Repeat with the next related batch.

## File Updates

Batch reconciliation does not mean splitting files by default. Before appending
to an existing `.agents/**/*.md` file, decide whether the addition keeps that
file compact and under the local line limit. Append compact status, record, or
routing facts directly. For long feedback inventories, audit notes, issue
lists, screenshot notes, or rationale, refactor the target file by splitting
it or move the detail into `.agents/references/`, a dedicated batch file, or a
log file and link back.

## Stop Conditions

- batch membership is explicit
- unrelated risky items are split out
- verification covers the batch surfaces
- progress is updated once per batch, not after every micro-fix
