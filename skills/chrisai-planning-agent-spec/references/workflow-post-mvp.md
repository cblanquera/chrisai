# Post-MVP Workflow

Use this workflow after the MVP exists and the work shifts to feedback
reconciliation, hardening, polish, expansion, or ongoing product maintenance.

## Read First

- `.agents/AGENTS.md`
- MVP status, release readiness, open risks, and progress manifest
- user feedback, QA notes, screenshots, recordings, or issue lists

## May Update

- `.agents/progress/`
- post-MVP spec records
- `.agents/sprints/`
- `.agents/releases/`
- review or validation records when feedback changes durable scope

## Process

1. Audit feedback before editing.
2. Classify mismatches by workflow, screen, component, severity, dependency,
   and verification surface.
3. Decide whether each mismatch is a bug, polish item, new requirement, risk,
   question, or out-of-scope request.
4. Promote durable scope changes into records.
5. Batch related low-to-medium-risk mismatches before implementation.
6. Verify changed surfaces together.
7. Update progress once at the end of the batch.
8. Before appending feedback, audit notes, issue lists, or rationale to an
   existing Markdown file, decide whether the addition stays compact. If not,
   refactor the file by splitting it or move the detail to references, a batch
   file, or a log and link back.

## Batch Default

When the user gives bulk feedback or more than five small related mismatches,
do an audit-first batch reconciliation pass. Pick 8-15 related mismatches,
implement them together, verify changed surfaces, and update progress once at
the end. This is a batching rule, not a command to split files; split Markdown
files only when the target file is near the line limit, the addition is large,
or the detail belongs in references, a batch file, or a log.

## Stop Conditions

- feedback is classified
- selected batch or individual item is justified
- verification covers changed surfaces
- progress/status reflects the completed batch or blockers
