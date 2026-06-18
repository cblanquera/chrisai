# Source Retirement Workflow

Use this workflow before declaring legacy planning, progress, documentation, or
source material obsolete, archived, or deletable.

## Read First

- `.agents/AGENTS.md`
- `.agents/context/index.md`, if present
- relevant spec records, indexes, reviews, evidence, and progress state
- the candidate source files or folders

## May Update

- source-retirement review under `.agents/releases/`, `.agents/specs/<spec-id>/reviews/`,
  or another project-approved `.agents` review location
- `.agents/context/` when source material contains reusable product knowledge
- records or progress items when durable facts were not yet extracted
- `.agents/context/index.md`

## Process

1. Discover actual project sources. Do not rely on fixed folder names.
2. For each source, identify its role.
3. Check whether reusable product facts were extracted into `.agents/context/`.
4. Check whether scope-specific durable facts were extracted into records.
5. Check whether active execution state was moved into progress.
6. Identify facts that are still only linked by reference.
7. Identify unique rationale, validation history, examples, rejected
   alternatives, or stakeholder context.
8. Recommend `keep`, `archive`, `delete-after-confirmation`, or `unknown`.
9. Promote missing reusable context, durable records, or progress state before
   recommending deletion.

## Review Table

```markdown
| Source | Role | Extracted To | Remaining Unique Value | Recommendation |
| --- | --- | --- | --- | --- |
```

## Stop Conditions

- every discovered source has a recommendation
- linked-only material is not called safely removable
- delete recommendations require explicit confirmation
- recommended next step is included in the completion response
