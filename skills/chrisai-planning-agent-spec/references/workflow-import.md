# Import Workflow

Use this workflow when existing human planning material should be converted into
compact `.agents/specs/` records while preserving source documents.

## Read First

- `.agents/AGENTS.md`
- provided planning documents or folder list
- `.agents/plans/source-documents.md`, if present

## May Update

- `.agents/plans/`
- `.agents/references/`
- `.agents/specs/manifest.md`
- `.agents/specs/<spec-id>/`

## Process

1. Inventory source documents without loading more than needed.
2. Preserve or index source documents in `.agents/plans/source-documents.md`.
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

- source documents are inventoried
- durable facts are compact records
- remaining unique source value is preserved or linked
- next workflow is review, validation, freeze, or source retirement

