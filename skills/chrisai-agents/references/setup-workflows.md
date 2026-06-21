# Setup Workflows

Use this reference when creating or repairing `.agents/` from a product idea,
existing codebase, imported material, or a mix of both.

## Greenfield Setup

Use greenfield setup when `.agents/` is being created from a prompt, product
idea, or sparse project before implementation begins.

Read first:

- user prompt or product brief
- existing README or project notes, if present
- `.agents/AGENTS.md`, if repairing an existing setup

May update:

- `.agents/AGENTS.md`
- `.agents/context/index.md`, only when context exists or is seeded
- `.agents/context/feature-goals.md`, only when feature-goal intake exists
- `.agents/workflows/`
- `.agents/specs/manifest.md`, only when spec records are created
- `.agents/specs/research/`
- root `proofs/`, only when current-state uncertainty or technical risk needs a
  POC
- root `wireframes/`, when the requested UI change needs static or functional
  wireframes
- root `creatives/`, when creative direction is explored or accepted
- `.agents/specs/mvp/`, only when research shows MVP scope can be trusted next
- `.agents/references/`

Ask only enough to start responsibly:

1. What is being designed?
2. Who is it for?
3. What problem should it solve?
4. What capabilities should be considered?
5. What is out of scope?
6. Are there preferred or forbidden technologies?
7. What constraints or known unknowns already exist?

If enough information exists, proceed and mark uncertainty explicitly.

Process:

1. Ensure `.agents/AGENTS.md` and needed `.agents/workflows/` exist.
2. Create or repair `.agents/specs/manifest.md`.
3. Create `.agents/specs/research/` as the first spec folder.
4. Write research `brief.md`, `index.md`, and `status.md`.
5. Create compact grouped record files directly under the research spec folder.
6. Capture goals, users, desired capabilities, constraints, non-goals,
   assumptions, open questions, risks, and early evidence as research records.
7. Capture high-level future feature goals in `.agents/context/feature-goals.md`.
8. Do not convert the research spec directly into an MVP spec. Treat research
   as discovery whose job is to produce reusable context and a next-path
   recommendation.
9. Create or update `.agents/context/` only with final accepted reusable
   research results that future specs should read first, such as product
   description, goals, users, constraints, terms, decisions, non-goals, known
   risks, accepted examples, rationale, edge cases, open questions, and useful
   provenance. If research status is not final, keep context candidates in the
   research spec until they are accepted.
10. Decide the next spec path:
    - create or recommend root `proofs/<proof-slug>/` when feasibility,
      architecture, platform, integration, security, performance, persistence,
      permissions, or deployment uncertainty could change the product plan
    - create or recommend `workflows/wireframes.md` when static or functional
      wireframes are missing, unaccepted, or needed to define the user workflow
    - create or recommend `workflows/creatives.md` when visual direction is
      needed and not yet accepted or explicitly deferred
    - create or recommend `.agents/specs/mvp/` only when the smallest
      customer-usable workflow can be specified from accepted research, accepted
      static wireframes, accepted functional wireframes, accepted or deferred
      creative direction, and accepted or deferred proof results
11. In root `proofs/`, root `wireframes/`, root `creatives/`, or
    `.agents/specs/mvp/`, link back to `.agents/context/` for accepted shared
    context. Link to research records for traceability, candidates, or detailed
    evidence.
12. Create routing files for open questions, status, source, and traceability
    only when useful.
13. Create a review packet under `reviews/` or `.agents/references/` only when
    records alone would not support a productive review.

Stop when `status.md` says `ready-for-review`, `needs-clarification`, or
`needs-validation`, final accepted reusable findings have been promoted into
`.agents/context/` or explicitly deferred because research is not final, the
recommended next step is POC, MVP, review, validation, or no follow-up,
blockers are explicit, and no active implementation work has been created
unless the user explicitly asked for execution. Include the recommended next
step in the completion response.

## Brownfield Setup

Use brownfield setup when `.agents/` must reflect an existing codebase, current
behavior, or gaps between docs and code. Treat brownfield products as post-MVP
by default. Do not require research or MVP specs unless the user explicitly asks
to define, rebuild, or audit an MVP, or the project is clearly pre-MVP.

Read first:

- `.agents/AGENTS.md`, if present
- `.agents/context/index.md`, if present
- root README and project docs
- only the code, tests, routes, schemas, configuration, or UI files needed for
  the requested scope
- existing planning docs when the user says they matter

May update:

- `.agents/AGENTS.md`
- `.agents/context/`, only when context is seeded or repaired
- `.agents/workflows/`
- `.agents/specs/manifest.md`, only when feature, migration, initiative, or
  explicit MVP/research records are created
- `.agents/specs/research/`, only when the user explicitly asks to reopen
  discovery
- root `proofs/`, only when current-state uncertainty or technical risk needs a
  POC
- root `wireframes/`, when the requested UI change needs static or functional
  wireframes
- root `creatives/`, when creative direction is explored or accepted
- `.agents/specs/mvp/`, only when the user explicitly asks to define, rebuild,
  or audit MVP scope
- `.agents/references/`

Source rules:

- Code, tests, configuration, routes, schemas, UI, and runtime behavior are
  evidence for current state.
- Human documents are evidence for intended state unless the user says they are
  authoritative.
- When code and docs conflict, mark the conflict. Do not silently choose one.

Process:

1. Confirm the target project and whether docs are current truth or intended
   future state.
2. Ensure `.agents/AGENTS.md` and `.agents/workflows/` exist.
3. Inspect only the sources needed to infer the requested scope.
4. Capture durable current-state behavior in `.agents/context/` when future
   agents should inherit it. Use `.agents/references/` for provenance and long
   evidence.
5. Create or update bounded feature, migration, or initiative records with
   `Current State`, `Intended State`, and `Gap` when the requested work needs
   its own acceptance criteria, risks, decisions, POCs, or multiple
   implementation items.
6. Mark confidence as `inferred`, `evidence-backed`, `conflicting`, or `stale`
   as appropriate.
7. Update traceability, open question, source, and status indexes.
8. Promote final accepted reusable current-state, intended-state, product,
   goal, constraint, term, decision, non-goal, rationale, example, edge case,
   open-question, and provenance findings into detailed `.agents/context/`. If
   findings are not final, leave them in the bounded spec, reference note, or
   review record that owns the uncertainty.
9. Record or reconcile user-identified feature goals in
   `.agents/context/feature-goals.md` before routing them.
10. Decide whether the next step should be feature development, validation,
    root `proofs/<proof-slug>/`, wireframes, creatives, or a bounded sibling
    spec. Use POC when current-state uncertainty or technical risk could change
    product scope. Use wireframes when a post-MVP UI change lacks an accepted
    workflow or interactions. Use creatives when visual direction is needed and
    not explicitly deferred. Route to `.agents/specs/mvp/` only when the user
    explicitly asks to define, rebuild, or audit MVP scope.

Stop when inspected sources are listed, current-state findings are recorded,
intended-state conflicts or gaps are explicit, final accepted reusable findings
are in `.agents/context/` or explicitly deferred, and the recommended next step
is feature development, review, validation, POC, wireframes, creatives, a
bounded spec, explicit MVP work, progress, or no follow-up.

## Import Setup

Use import setup when existing human planning material should become compact
spec records while preserving useful context.

Read first:

- provided planning documents, pasted material, links, or folder list
- `.agents/AGENTS.md`, if present
- `.agents/context/index.md`, if present
- `.agents/context/feature-goals.md`, if present

May update:

- `.agents/AGENTS.md`
- `.agents/context/`
- `.agents/references/`
- `.agents/workflows/`
- `.agents/specs/manifest.md`, only when spec records are created
- `.agents/specs/<spec-id>/`, only when scope is bounded enough
- `.agents/references/research/`, only when source material contains long-form
  research support that should not be compacted into spec records

Source types:

- legacy planning folders
- PRDs, sprint plans, work orders, stakeholder briefs, and scope docs
- architecture docs, ADRs, research notes, and acceptance docs
- pasted planning text or imported documentation files
- links to files or external planning documents

Use brownfield setup too when current code behavior must be inspected.

Process:

1. Inventory source material without loading more than needed.
2. Ingest reusable context as detailed Markdown into `.agents/context/` or
   large chunks under `.agents/references/context/`.
3. Capture high-level future feature goals in
   `.agents/context/feature-goals.md` as planning input.
4. Extract requirements, capabilities, constraints, decisions, risks,
   assumptions, questions, acceptance criteria, and evidence into grouped
   records.
5. Extract MVP journeys, validation goals, and customer workflows into `CAP`,
   `REQ`, and `AC` records instead of leaving them only as links.
6. For POCs, spikes, prototypes, or feasibility reports, import what each proof
   tested, what it proved, what remains unknown, and whether it should be
   promoted, replaced, discarded, or continued.
7. Mark confidence as `imported` unless evidence upgrades or conflicts exist.
8. Mark ambiguous, stale, duplicated, or conflicting content explicitly.
9. Update traceability, open questions, status, source, and MVP viability
   indexes.
10. At closeout, promote only final accepted reusable imported facts into
    `.agents/context/` so future specs do not need to depend on the import spec
    for baseline product understanding. Preserve accepted rationale, examples,
    constraints, terminology, edge cases, and source nuance instead of only a
    summary. Keep ambiguous, conflicting, stale, or non-final imported material
    in spec records until reconciled.

Stop when source material is inventoried, durable facts are compact records,
detailed reusable context is preserved or linked, remaining unique source value
is preserved or linked, and the recommended next step is review, validation,
freeze, source retirement, or no follow-up.

## Hybrid Setup

Use hybrid setup when code and human planning documents both matter. Use
brownfield setup for current behavior and import setup for intended state. Mark
conflicts explicitly and do not let imported future-state material overwrite
current-state evidence.
