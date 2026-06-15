# Batch Reconciliation Workflow

Use this workflow after feedback has been audited or validated and the work
contains bulk feedback, many QA mismatches, or inefficient micro-passes.

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
2. Confirm raw feedback has been validated, rejected, or marked as needing
   validation before implementation.
3. List mismatches with surface, severity, dependency, source feedback, and
   verification method.
4. Pick 8-15 related mismatches unless risk requires a smaller batch.
5. Split out invalid, unvalidated, unclear, scope-changing, or risky items.
6. Implement the batch together.
7. Verify changed surfaces together.
8. Update progress, logs, status, and durable records once at the end.
9. Repeat with the next related batch only after the current batch has
   verification and document-integrity status.

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
- unvalidated feedback is routed to validation instead of implementation
- verification covers the batch surfaces
- progress is updated once per batch, not after every micro-fix
- document integrity can confirm records, progress, and feedback status agree
