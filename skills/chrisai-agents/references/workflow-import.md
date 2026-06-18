# Import Workflow

Use this workflow when existing human planning material should be converted into
compact `.agents/specs/` records while preserving useful project
context in `.agents/context/`.

## Read First

- `.agents/AGENTS.md`
- provided planning documents, links, pasted text, or folder list
- `.agents/context/index.md`, if present

## May Update

- `.agents/context/`
- `.agents/references/`
- `.agents/specs/manifest.md`
- `.agents/specs/<spec-id>/`

## Process

1. Inventory source material without loading more than needed.
2. Ingest reusable background into `.agents/context/` or, for large generated
   context, `.agents/references/context/<source-slug>/`.
3. Extract requirements, capabilities, constraints, decisions, risks,
   assumptions, questions, acceptance criteria, and evidence into grouped
   records.
4. Extract MVP journeys, validation goals, and customer workflows into `CAP`,
   `REQ`, and `AC` records instead of leaving them only as links.
5. For POCs, spikes, prototypes, or feasibility reports, import what each proof
   tested, what it proved, what remains unknown, and whether it should be
   promoted, replaced, discarded, or continued.
6. Mark ambiguous, stale, duplicated, or conflicting content explicitly.
7. Promote only final accepted reusable imported product facts into
   `.agents/context/` so later specs do not need to depend on the import spec.
   Keep ambiguous, conflicting, stale, or non-final imported material in spec
   records until reconciled.
8. Update traceability, open questions, status, source, and MVP viability
   indexes.

## Stop Conditions

- source material is inventoried
- durable facts are compact records
- final accepted reusable product context is promoted into `.agents/context/`
  or explicitly deferred
- remaining unique source value is preserved or linked
- recommended next step is review, validation, freeze, source retirement, or no
  follow-up
