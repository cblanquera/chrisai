# Brownfield Setup Workflow

Use this workflow when `.agents/` must reflect an existing codebase, current
behavior, or gaps between docs and code.

## Read First

- `.agents/AGENTS.md`, if present
- root README and project docs
- only the code, tests, routes, schemas, configuration, or UI files needed for
  the requested scope
- existing planning docs when the user says they matter

## May Update

- `.agents/AGENTS.md`
- `.agents/workflows/`
- `.agents/specs/manifest.md`
- `.agents/specs/<spec-id>/`
- `.agents/plans/source-documents.md`
- `.agents/plans/feature-goals.md`
- `.agents/references/`

## Source Rules

- Code, tests, configuration, routes, schemas, UI, and runtime behavior are
  evidence for current state.
- Human documents are evidence for intended state unless the user says they are
  authoritative.
- When code and docs conflict, mark the conflict. Do not silently choose one.

## Process

1. Confirm the target project and whether docs are current truth or intended
   future state.
2. Choose or confirm one `<spec-id>`. Do not add every feature-development goal
   to the initial/root spec; create sibling specs for bounded product streams.
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
   `.agents/plans/feature-goals.md` before routing them to existing specs, new
   sibling specs, or progress work.

## Stop Conditions

- inspected sources are listed
- current-state findings are recorded
- intended-state conflicts or gaps are explicit
- next workflow is review, validation, freeze, or progress
