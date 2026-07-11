# Creative Draft Revision Workflow

Use this reference when creating or updating creative design revisions.

## Target Folder

Ask whether the user wants the artifact saved in the project. If yes and no
stricter project convention exists, use:

```text
design-drafts/
  r001-meta-title/
    specs.md
    notes.md
```

Use exactly three revision digits: `r001`, `r002`, `r003`, and so on.

## New Revision Versus Update

Create a new revision when the user requests one or when scope, screen
inventory, visual system, component language, responsive behavior, asset
direction, or interaction treatment changes materially. Preserve an approved
revision when the next direction should remain comparable.

Update the current revision for small visual corrections, copy fixes, broken
links, minor component adjustments, or other changes that do not materially
alter creative intent.

## Copy Forward

For `r002` and later:

1. Copy the prior revision's `specs.md` first.
2. Update revision goal, sources, scope, and changed creative decisions.
3. Copy only rendered files and assets still required by the updated spec.
4. Start a new `notes.md`; do not copy the prior revision's review-round log.
5. Keep document-relative links working after files move.

For `r001`, create `specs.md` from approved structure, approved creative
direction or extracted design rules, and accepted source material.

## Required Files

Every generated creative revision must include:

- `specs.md`
- `notes.md`
- rendered HTML/CSS/JS files defined by the spec
- only the assets and QA evidence used by the revision
