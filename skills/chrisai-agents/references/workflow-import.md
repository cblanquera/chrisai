# Import Workflow

Use this workflow when existing human planning material should be converted into
compact `.agents/development/specs/` records while preserving useful project
context in the `.agents` knowledge base.

## Read First

- `.agents/AGENTS.md`
- provided planning documents, links, pasted text, or folder list
- `.agents/context/index.md`, if present

## May Update

- `.agents/context/`
- `.agents/references/`
- `.agents/development/specs/manifest.md`
- `.agents/development/specs/<spec-id>/`

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
7. Update traceability, open questions, status, source, and MVP viability
   indexes.

## Stop Conditions

- source material is inventoried
- durable facts are compact records
- remaining unique source value is preserved or linked
- next workflow is review, validation, freeze, or source retirement
