# Document Integrity Workflow

Use this workflow when `.agents/context/`, `.agents` records, progress, status,
indexes, releases, or derived views may have drifted from the current project
state.

The goal manager owns this gate. Other workflows may run it before checkpoint,
closeout, freeze, release readiness, batch completion, or after significant
document-affecting decisions.

This workflow checks source-of-truth health. Use `workflows/review.md` instead
when the primary question is whether a spec record set is ready, risky,
well-evidenced, or traceable before freeze or implementation.

## Read First

1. `.agents/AGENTS.md`
2. relevant workflow file for the active task
3. `.agents/context/index.md`, when product context exists
4. relevant spec index and status files
5. `.agents/development/progress/manifest.md`, when progress is involved
6. `.agents/context/feature-goals.md`, when deciding or updating feature goals
7. active item, batch, release, review, validation, POC, wireframe, or creative
   record

Do not scan unrelated folders unless checking a cross-document conflict.

## May Update

- `.agents/context/` files when completed specs contain reusable product knowledge
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
3. **Context link boundary:** `.agents/context/` files link only to other
   `.agents/context/` files or `.agents/references/` files. They do not link
   directly to `.agents/specs/`, `.agents/development/progress/`, root
   `wireframes/`, root `creatives/`, root `proofs/`, source files, external
   URLs, uploaded files, local absolute paths, or documents outside `.agents`.
   When provenance is needed, it lives in `.agents/references/` and context
   links to that reference file.
   Links to `.agents/references/` must include a purpose or load condition,
   preferably `Load when:` and optional `Skip when:` notes. Do not leave bare
   reference bullets that force agents to open the file just to judge relevance.
4. **Line limits:** active `.agents/**/*.md` files remain under the local line
   cap or are split before more content is added.
5. **Current-state consistency:** progress manifest, spec status, release
   records, and next-action text agree.
6. **Source-of-truth placement:** reusable product context is promoted into
   `.agents/context/`; scope, decisions, risks, acceptance criteria, evidence, and
   durable tasks are promoted into records instead of remaining only in chat,
   summaries, logs, or derived views. Chat-derived product meaning must retain
   enough rationale, examples, constraints, terminology, and open questions for
   future agents to use without replaying the original conversation.
7. **Derived-view discipline:** sprint plans, release notes, summaries, reviews,
   and logs do not introduce durable truth unless promoted back into records or
   progress state.
8. **Workflow routing:** the workflow used matches the content changed.
9. **Verification claims:** verification is recorded only when the check
   actually ran and the evidence location is linked.
10. **Feature-goal routing:** new user-identified feature goals are captured in
   `.agents/context/feature-goals.md`, and bounded product streams become sibling
   specs instead of being added to earlier specs by default.
11. **Artifact promotion:** accepted POC, wireframe, creative, review, QA, and
    feedback outcomes are promoted into `.agents/context/` and, when
    scope-specific, into specs, evidence, acceptance, progress, or release
    records before freeze, closeout, or release readiness.
12. **Spec record promotion:** grouped files under `.agents/specs/` are checked
    for durable records that future specs can use as context. Promote only
    contained records whose record `Status:` is final, such as `done`,
    `accepted`, `proved`, `proven`, `answered`, `closed`, or project-defined
    equivalents. A non-final document-level status defers promotion for the
    whole file; a final or missing document-level status still requires
    checking contained record statuses.
13. **Closeout context:** every completed research spec, POC, MVP spec,
    feature spec, migration spec, or initiative spec has been checked for final
    product descriptions, goals, constraints, decisions, terms, non-goals,
    accepted examples, rationale, evidence conclusions, open questions, and
    accepted learning that should be added to `.agents/context/`. Promotion is
    invalid when it keeps only a short summary and leaves reusable meaning
    trapped in the completed spec.
14. **Feedback loop hygiene:** raw user feedback is not treated as an
    implementation queue; it is validated, rejected, classified, or reconciled
    before progress work is created.
15. **Loop phase clarity:** active handoffs and progress records name the
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
- `.agents/context/` has no direct links outside `.agents/context/` or
  `.agents/references/`
- `.agents/context/` links to `.agents/references/` include enough load/skip
  guidance for future agents to decide whether to open them
- durable final records in `.agents/specs/` are promoted into
  detailed `.agents/context/`, explicitly do not contain reusable context, or
  have a non-final record or document status that defers promotion
- remaining blocker, if any, has a recommended next step or user escalation

## Handoff

State the checked files, repaired drift, remaining drift, and whether the active
goal can continue. Include the recommended next step.
