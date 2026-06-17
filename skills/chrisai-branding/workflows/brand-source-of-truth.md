# Brand Source Of Truth

Use this workflow when the main problem is organizing scattered brand docs,
logos, exports, naming notes, research, and guidelines into a clear source of
truth.

This workflow produces an index and canonical/deprecated file map. It does not
generate new brand strategy, new assets, or a new brand kit unless requested.

## Ownership

This workflow owns:

- locating brand-related files and docs
- identifying canonical, draft, deprecated, and generated materials
- recommending folder organization
- creating source-of-truth indexes when requested
- handoff recommendations for audits or generation

This workflow does not own:

- deleting files unless the user explicitly asks
- regenerating assets
- auditing kit quality; use `workflows/brand-kit-audit.md`
- auditing asset quality; use `workflows/brand-asset-audit.md`
- adapter sync or install behavior

## Workflow

Work through these steps in order:

1. Discover brand materials.
2. Classify each item.
3. Identify canonical sources.
4. Identify stale or duplicate materials.
5. Recommend organization.
6. Create or update an index when requested.

## Step 1: Discover Materials

Search the workspace for likely brand materials:

- brand kits and guidelines
- strategy, voice, messaging, and research docs
- naming/domain notes
- logo masters and exports
- favicon and icon files
- decks and screenshots
- CSS tokens, design tokens, theme files, or style notes

Do not assume a particular folder exists. Do not modify files during discovery.

## Step 2: Classify Items

Classify files as:

- canonical source
- draft
- generated export
- archived/deprecated
- reference/inspiration
- unknown

Record why each classification was made. If uncertain, mark it unknown instead
of guessing.

## Step 3: Identify Canonical Sources

Prefer canonical sources in this order:

- explicit user-designated source
- latest approved brand kit or guide
- editable master file over generated export
- SVG/vector master over raster export for simple logos
- current website/app source only when no brand doc exists
- newest dated artifact only when there is evidence it superseded older work

Use `workflows/brand-asset-audit.md` when file quality affects master choice.

## Step 4: Identify Stale Or Duplicate Material

Flag:

- conflicting logo versions
- old colors or typography
- repeated boilerplate with different wording
- unused draft names
- stale favicon/icon exports
- undocumented generated assets
- unclear owner or approval status

Do not delete, move, or rename files without explicit user approval.

## Step 5: Recommend Organization

Recommend a simple project-local structure only when useful, for example:

```text
brand/
├── brand-kit.md
├── research/
├── strategy/
├── voice-and-messaging/
├── assets/
│   ├── masters/
│   └── exports/
└── source-of-truth.md
```

Adapt to existing workspace conventions instead of forcing this structure.

## Step 6: Index

When asked to create or update an index, include:

- canonical documents
- canonical asset masters
- generated exports
- deprecated or draft materials
- open questions
- next recommended workflow

Use this table:

| Item | Path | Status | Purpose | Notes |
| --- | --- | --- | --- | --- |
| [name] | [path] | Canonical / Draft / Deprecated / Export / Unknown | [purpose] | [notes] |

End by recommending whether the next step is kit audit, asset audit,
consistency review, refresh, or launch readiness.
