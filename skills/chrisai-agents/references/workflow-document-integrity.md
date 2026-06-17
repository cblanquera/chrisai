# Document Integrity Workflow

Use this workflow when `.agents` records, progress, status, indexes, releases,
or derived views may have drifted from the current project state.

The goal manager owns this gate. Other workflows may run it before checkpoint,
closeout, freeze, release readiness, batch completion, or after significant
document-affecting decisions.

This workflow checks source-of-truth health. Use `workflows/review.md` instead
when the primary question is whether a spec record set is ready, risky,
well-evidenced, or traceable before freeze or implementation.

## Read First

1. `.agents/AGENTS.md`
2. relevant workflow file for the active task
3. relevant spec index and status files
4. `.agents/development/progress/manifest.md`, when progress is involved
5. `.agents/context/feature-goals.md`, when deciding or updating feature goals
6. active item, batch, release, review, validation, POC, wireframe, or creative
   record

Do not scan unrelated folders unless checking a cross-document conflict.

## May Update

- spec indexes, status files, traceability files, and compact records
- `.agents/context/feature-goals.md`
- `.agents/development/progress/manifest.md`, item files, batch files, logs, and outputs
- release readiness files and release-scoped evidence
- review, validation, POC, wireframe, or creative records
- `.agents/references/` when long evidence or rationale needs to move out of an
  active record

## Integrity Checks

1. **Spec/progress boundary:** `TASK` records describe proposed or accepted
   work; execution results belong in progress items, batches, logs, references,
   or release evidence.
2. **Index coverage:** new durable files are linked from the relevant manifest,
   index, status, traceability, or progress routing file.
3. **Line limits:** active `.agents/**/*.md` files remain under the local line
   cap or are split before more content is added.
4. **Current-state consistency:** progress manifest, spec status, release
   records, and next-action text agree.
5. **Source-of-truth placement:** scope, decisions, risks, acceptance criteria,
   evidence, and durable tasks are promoted into records instead of remaining
   only in chat, summaries, logs, or derived views.
6. **Derived-view discipline:** sprint plans, release notes, summaries, reviews,
   and logs do not introduce durable truth unless promoted back into records or
   progress state.
7. **Workflow routing:** the workflow used matches the content changed.
8. **Verification claims:** verification is recorded only when the check
   actually ran and the evidence location is linked.
9. **Feature-goal routing:** new user-identified feature goals are captured in
   `.agents/context/feature-goals.md`, and bounded product streams become sibling
   specs instead of being added to the initial/root spec by default.
10. **Artifact promotion:** accepted POC, wireframe, creative, review, QA, and
    feedback outcomes are promoted into specs, evidence, acceptance, progress,
    or release records before freeze, closeout, or release readiness.
11. **Feedback loop hygiene:** raw user feedback is not treated as an
    implementation queue; it is validated, rejected, classified, or reconciled
    before progress work is created.
12. **Loop phase clarity:** active handoffs and progress records name the
    current loop phase and next owner.

## Repair Rules

- Prefer compact repairs to indexes, status files, manifests, and record links.
- Move long implementation results, rationale, audit notes, and evidence into
  progress records, references, release evidence, or logs.
- Do not rewrite history just to make the tree look cleaner.
- Do not delete or retire sources without `workflows/source-retirement.md`.
- If repair would change MVP scope, stop and ask the user.

## Stop Conditions

- checked surfaces are named
- drift is repaired or explicitly recorded
- no active Markdown file is pushed past the local line cap
- durable truth is in the right source-of-truth surface
- remaining blocker, if any, has a next workflow or user escalation

## Handoff

State the checked files, repaired drift, remaining drift, and whether the active
goal can continue.
