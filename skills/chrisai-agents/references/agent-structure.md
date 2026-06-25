# Agent Structure

Use `.agents/context/` for durable product context that future specs should read
first. Use `.agents/` for agent-readable local operating rules, specs, active
progress, research support material, and handoffs. Use root `wireframes/`,
`creatives/`, and `proofs/` for product artifacts and proof implementation
artifacts that need to be inspected, run, or reviewed outside `.agents`.

## Layout

This is the full folder contract, not a command to create every folder during
setup. Materialize folders and files only when the current setup, repair,
workflow, context entry, record, progress item, design artifact, research note,
or release view needs them.

```text
.agents/
  AGENTS.md
  context/
    index.md
    product.md
    goals.md
    feature-goals.md
    constraints.md
    decisions.md
    terms.md
    <short-context-entry>.md

  workflows/
    goal-manager.md
    context-ingestion.md
    document-integrity.md
    import.md
    poc.md
    mvp.md
    feature-development.md
    ad-hoc.md
    batch-reconciliation.md
    review.md
    validation.md
    freeze.md
    progress.md
    handoff.md
    source-retirement.md
    wireframes.md
    creatives.md

  specs/
    manifest.md
    research/
      brief.md
      index.md
      status.md
      requirements.md
      capabilities.md
      constraints.md
      assumptions.md
      questions.md
      decisions.md
      risks.md
      acceptance.md
      evidence.md
      tasks.md
      traceability.md
      reviews/
      logs/
    mvp/
      brief.md
      index.md
      status.md
      requirements.md
      capabilities.md
      constraints.md
      decisions.md
      risks.md
      acceptance.md
      evidence.md
      tasks.md
      traceability.md
      by-mvp.md
      mvp-viability-gaps.md

  development/
    progress/
      manifest.md
      items/
      batches/
      logs/
    sprints/
      sprint-001.md
  references/
    context/
    terms/
    decisions/
    examples/
    snippets/
    research/
      grill/
      adr/
      validation/
  releases/
    release-001/
      plan.md
      readiness.md
      notes.md

wireframes/
  <flow-or-screen-set>/
    index.md
    static/
    functional/
    handoff.md
    reviews.md

creatives/
  <direction-or-screen-set>/
    index.md
    guidelines.md
    reviews.md
    assets/

proofs/
  <proof-slug>/
    README.md
    proof.md
    results.md
    src/
    tests/
```

## Local AGENTS.md

Create or update `.agents/AGENTS.md` whenever the `.agents` operating surface
is created or materially changed. It should be concise and include rules
equivalent to:

```markdown
# .agents Rules

This folder is an agent-readable project knowledge base, planning surface, and
execution state store.

Start by reading the workflow file that matches the task:

- `workflows/context-ingestion.md` for ingesting files, links, pasted text, or
  raw resources into `.agents/context/`
- `workflows/goal-manager.md` for autonomous goal execution across planning,
  design, implementation, QA, documentation, and handoff loops
- `workflows/document-integrity.md` for keeping context, specs, progress,
  indexes, status, releases, and derived views consistent
- `workflows/import.md` for converting existing planning material into compact
  spec records
- `workflows/poc.md` for feasibility proofs before product commitments
- `workflows/mvp.md` for the smallest customer-usable product slice
- `workflows/feature-development.md` for bounded feature streams, hardening,
  polish, expansion, and ongoing product work after MVP
- `workflows/ad-hoc.md` for unplanned requests
- `workflows/batch-reconciliation.md` for bulk feedback, QA mismatches, and
  related fixes
- `workflows/review.md` for readiness, risk, consistency, or traceability
  review
- `workflows/validation.md` for evidence-gathering on blockers or risky claims
- `workflows/freeze.md` for turning accepted records into implementation
  contracts
- `workflows/progress.md` for active execution packets, logs, and handoffs
- `workflows/source-retirement.md` before declaring old docs obsolete
- `workflows/wireframes.md` for root `wireframes/` artifacts, static and
  functional wireframe review, and accepted handoff documents
- `workflows/creatives.md` for visual direction, asset briefs, and creative
  review notes under root `creatives/`

## Source Of Truth

- `.agents/context/` contains shared synthesized product understanding, goals,
  feature-goal intake, constraints, decisions, non-goals, terminology, and
  reusable findings. Check it before answering project-specific questions or
  creating a new spec.
- `.agents/context/` files may link only to other `.agents/context/` files or
  `.agents/references/` files. Put source paths, external URLs, spec paths,
  progress paths, root artifact paths, and other provenance in
  `.agents/references/`.
- Context links to `.agents/references/` must include a purpose or load
  condition. Prefer `Load when:` and optional `Skip when:` notes so agents can
  decide whether to load the reference without opening it first.
- Projects with enough context may use context owner documents instead of a
  flat context index. Each owner should state `Load When`, `Skip When`, `Owns`,
  `Does Not Own`, and reference-routing notes. Owner documents are
  project-specific; do not force a universal owner set.
- `.agents/specs/research/` contains the first greenfield research round, or
  brownfield research only when the user explicitly asks to reopen discovery. It
  is discovery material, not shared product context.
- `.agents/specs/mvp/` contains the smallest customer-usable product slice only
  after research has accepted or explicitly deferred required POCs, accepted
  static wireframes, accepted functional wireframes, and accepted or explicitly
  deferred creative direction.
- `.agents/specs/<spec-id>/` may contain later bounded feature, migration, or
  initiative specs after MVP.
- `.agents/development/progress/` contains active execution state and work
  packets.
- `.agents/development/sprints/` contains optional timeboxed execution views
  derived from specs and progress state.
- Root `proofs/` contains POC implementation artifacts, proof documents, test
  descriptions, evidence, and results, usually created on a `poc-<short-name>`
  branch. Keep durable POC questions, assumptions, risks, decisions, evidence,
  and tasks in spec record files with `Phase: poc`.
- Root `wireframes/` contains static and functional wireframe artifacts,
  review notes, and approved handoff documents describing screen layouts,
  components, states, interactions, and functionality.
- Root `creatives/` contains creative direction, brand explorations,
  moodboards, asset briefs, copy explorations, review notes, and approved
  creative guideline documents describing colors, spacing, typography, styled
  components, styled pages, and asset rules.
- `.agents/references/` contains long-form support material that keeps context,
  records, and progress items compact.
- `.agents/releases/` contains release plans, readiness evidence, release
  notes, and verification summaries.

## Markdown File Size

- Apply these file-size and split-refactor rules only to generated or
  maintained `.agents/**/*.md` files.
- Keep active `.agents` Markdown files under 500 lines.
- If generated context content would exceed 500 lines, put all chunks in
  `.agents/references/context/<source-slug>/` and link them from
  `.agents/context/index.md`.
- Before appending to any Markdown file, decide whether the addition keeps the
  file compact.
- Put long rationale, examples, research, source excerpts, transcript
  summaries, detailed evidence, audit notes, and issue lists in
  `.agents/references/`, then link to them.

## Record Rules

- Use stable record IDs such as `REQ-001`, `CAP-001`, `AC-001`, `DEC-001`,
  `RISK-001`, `EVD-001`, and `TASK-001`.
- Keep records short, source-linked, and durable.
- Proposed `TASK` records are not active work until converted into progress
  items.
- For brownfield work, distinguish current state, intended state, and gaps.
- Do not invent scope, status, commitments, or verification.
- Raw user feedback must be validated, rejected, classified, or reconciled
  before becoming implementation work unless the evidence is already explicit.
- Accepted POC, wireframe, creative, review, QA, and feedback outcomes must be
  promoted into `.agents/context/` and, when scope-specific, into specs,
  evidence, acceptance, progress, or release records before freeze, closeout, or
  release readiness.
- At the end of every spec, check whether reusable product understanding should
  be promoted or reconciled into `.agents/context/` for future specs.
```

## Split And Refactor Rules

Start with compact Markdown files. Split or move content when:

- a generated or maintained Markdown file approaches 500 lines
- multiple agents must edit independent records concurrently
- a record requires a large evidence trail
- content is long-form context, rationale, examples, source excerpts,
  transcript summaries, audit notes, issue lists, screenshot notes, research,
  or detailed evidence

Do not apply Markdown file-size thresholds to HTML, CSS, JavaScript,
TypeScript, JSON, images, prototype code, or source files outside `.agents`.
