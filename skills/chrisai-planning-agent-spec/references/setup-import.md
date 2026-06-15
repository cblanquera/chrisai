# Import Setup Workflow

Use this workflow when existing human planning material should be converted into
compact `.agents/specs/` records while preserving source documents.

## Read First

- provided planning documents or folder list
- `.agents/AGENTS.md`, if present
- `.agents/plans/source-documents.md`, if present
- `.agents/plans/feature-goals.md`, if present

## May Update

- `.agents/AGENTS.md`
- `.agents/workflows/`
- `.agents/plans/`
- `.agents/references/`
- `.agents/specs/manifest.md`
- `.agents/specs/<spec-id>/`

## Source Types

- legacy planning folders
- PRDs, sprint plans, work orders, stakeholder briefs, and scope docs
- architecture docs, ADRs, research notes, and acceptance docs
- pasted planning text or imported documentation files

Use brownfield setup too when current code behavior must be inspected.

## Process

1. Inventory source documents without loading more than needed.
2. Choose or confirm one `<spec-id>`.
3. Preserve or index source documents in `.agents/plans/source-documents.md`.
4. Capture high-level future feature goals in `.agents/plans/feature-goals.md`
   as planning input, not execution order or root-spec scope.
5. Extract requirements, capabilities, constraints, decisions, risks,
   assumptions, questions, acceptance criteria, and evidence into grouped
   records.
6. Extract MVP journeys, validation goals, and customer workflows into `CAP`,
   `REQ`, and `AC` records instead of leaving them only as links.
7. For POCs, spikes, prototypes, or feasibility reports, import what each proof
   tested, what it proved, what remains unknown, and whether it should be
   promoted, replaced, discarded, or continued.
8. Mark confidence as `imported` unless evidence upgrades or conflicts exist.
9. Mark ambiguous, stale, duplicated, or conflicting content explicitly.
10. Update traceability, open questions, status, source, and MVP viability
   indexes.

## Stop Conditions

- source documents are inventoried
- copied document forests were not recreated in `.agents/specs/`
- durable facts are compact records
- remaining unique source value is preserved or linked
- next workflow is review, validation, freeze, or source retirement
