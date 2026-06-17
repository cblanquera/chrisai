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
- `.agents/context/index.md`
- `.agents/context/feature-goals.md`
- `.agents/workflows/`
- `.agents/development/specs/manifest.md`
- `.agents/development/specs/<spec-id>/`
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

1. Choose one `<spec-id>` for the bounded initiative.
2. Ensure `.agents/AGENTS.md`, `.agents/context/index.md`,
   `.agents/workflows/`, and `.agents/development/specs/manifest.md` exist.
3. Create the initial spec skeleton when the scope is bounded enough.
4. Write `brief.md`, `index.md`, and `status.md`.
5. Create compact grouped record files directly under the spec folder.
6. Capture goals, users, desired capabilities, constraints, and non-goals as
   records.
7. Capture high-level future feature goals in
   `.agents/context/feature-goals.md`.
8. Draft requirements and functional behavior as compact `REQ` and `CAP`
   records, not long narrative specs.
9. Create `ASM`, `Q`, and `RISK` records for unsupported claims and ambiguous
   scope.
10. Create provisional `DEC` records for early decision candidates.
11. Create POC or spike `TASK` records only when evidence is needed before a
    decision can be trusted.
12. Define POC path, MVP scope, customer-facing MVP journeys, success measures,
    and validation needs as records.
13. Create MVP-relevant `AC` records.
14. Create routing files for open questions, MVP, status, source, and
    traceability only when useful.
15. Create a review packet under `reviews/` or `.agents/references/` only when
    records alone would not support a productive review.

Stop when `status.md` says `ready-for-review`, `needs-clarification`, or
`needs-validation`, blockers are explicit, and no active implementation work
has been created unless the user explicitly asked for execution.

## Brownfield Setup

Use brownfield setup when `.agents/` must reflect an existing codebase, current
behavior, or gaps between docs and code.

Read first:

- `.agents/AGENTS.md`, if present
- `.agents/context/index.md`, if present
- root README and project docs
- only the code, tests, routes, schemas, configuration, or UI files needed for
  the requested scope
- existing planning docs when the user says they matter

May update:

- `.agents/AGENTS.md`
- `.agents/context/`
- `.agents/workflows/`
- `.agents/development/specs/manifest.md`
- `.agents/development/specs/<spec-id>/`
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
2. Choose or confirm one `<spec-id>`. Do not add every feature-development
   goal to the initial/root spec; create sibling specs for bounded product
   streams.
3. Ensure `.agents/AGENTS.md`, `.agents/workflows/`, and the spec skeleton
   exist.
4. Inspect only the sources needed to infer the requested scope.
5. Create `EVD` records for observed code, behavior, or docs.
6. Create or update `REQ`, `CAP`, `DEC`, `RISK`, `Q`, and `AC` records with
   `Current State`, `Intended State`, and `Gap` when useful.
7. Mark confidence as `inferred`, `evidence-backed`, `conflicting`, or `stale`
   as appropriate.
8. Update traceability, open question, source, and status indexes.
9. Record or reconcile user-identified feature goals in
   `.agents/context/feature-goals.md` before routing them.

Stop when inspected sources are listed, current-state findings are recorded,
intended-state conflicts or gaps are explicit, and the next workflow is review,
validation, freeze, or progress.

## Import Setup

Use import setup when existing human planning material should become compact
development records while preserving useful context.

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
- `.agents/development/specs/manifest.md`
- `.agents/development/specs/<spec-id>/`
- `.agents/development/research/`

Source types:

- legacy planning folders
- PRDs, sprint plans, work orders, stakeholder briefs, and scope docs
- architecture docs, ADRs, research notes, and acceptance docs
- pasted planning text or imported documentation files
- links to files or external planning documents

Use brownfield setup too when current code behavior must be inspected.

Process:

1. Inventory source material without loading more than needed.
2. Ingest reusable context into `.agents/context/` or large chunks under
   `.agents/references/context/`.
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

Stop when source material is inventoried, durable facts are compact records,
remaining unique source value is preserved or linked, and the next workflow is
review, validation, freeze, or source retirement.

## Hybrid Setup

Use hybrid setup when code and human planning documents both matter. Use
brownfield setup for current behavior and import setup for intended state. Mark
conflicts explicitly and do not let imported future-state material overwrite
current-state evidence.
