# Agent Structure

Use `.agents/` for agent-readable project context, local operating rules,
product planning, active progress, research, and handoffs. Keep it separate
from production source code and human-authored project docs unless the user
explicitly asks to move material.

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
    feature-goals.md
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

  development/
    specs/
      manifest.md
      <spec-id>/
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
    progress/
      manifest.md
      items/
      batches/
      logs/
    sprints/
      sprint-001.md
    research/
      poc/
      grill/
      adr/

  references/
    context/
    terms/
    decisions/
    examples/
    snippets/
    research/

  wireframes/
    flows.md
    screens.md
    reviews.md

  creatives/
    direction.md
    assets.md
    reviews.md

  releases/
    release-001/
      plan.md
      readiness.md
      notes.md
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
  development records
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
- `workflows/wireframes.md` for low-fidelity screens and flow planning
- `workflows/creatives.md` for visual direction, asset briefs, and creative
  review notes

## Source Of Truth

- `.agents/context/` contains the project knowledge base and feature-goal
  intake when context exists. Check it before answering project-specific
  questions.
- `.agents/development/specs/` contains durable product intent, requirements,
  decisions, risks, evidence, acceptance criteria, indexes, and proposed tasks.
- `.agents/development/progress/` contains active execution state and work
  packets.
- `.agents/development/sprints/` contains optional timeboxed execution views
  derived from specs and progress state.
- `.agents/development/research/` contains research material, POCs, grill
  reports, ADRs, validation notes, and feasibility records.
- `.agents/wireframes/` contains low-fidelity screens, flows, layout notes, and
  wireframe review notes.
- `.agents/creatives/` contains visual direction, brand explorations,
  moodboards, asset briefs, copy explorations, and creative review notes.
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
  promoted into specs, evidence, acceptance, progress, or release records before
  freeze, closeout, or release readiness.
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
