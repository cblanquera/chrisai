# Creative Draft Implementation Rules

Use this reference after revision-local creative `specs.md` exists.

## Generate From Spec

Generate HTML/CSS/JS from `specs.md`. If a required visual, component, asset,
responsive, content, or interaction decision is missing, update the spec before
rendering instead of inventing the decision in code.

## Source Priority

Apply sources in this order unless the project declares a stricter order:

1. approved existing-product design rules
2. approved wireframe or structure
3. approved creative direction
4. accepted brand, content, and asset sources
5. revision-local creative `specs.md`

Record conflicts in the spec and request direction when they materially change
the result.

## Rendered Artifact Rules

- Use static HTML/CSS/JS review artifacts.
- Preserve approved structure unless explicitly reopened.
- Implement the visual tokens, components, variants, states, responsive rules,
  assets, content, and interaction intent recorded in `specs.md`.
- Use document-relative links and local draft assets.
- Keep agent annotations, review notes, TODOs, implementation commentary, and
  annotative placeholders out of rendered UI.
- Use realistic illustrative content when final content is unavailable and
  document it in `notes.md`.
- Simulate workflow-relevant behavior without adding real authentication,
  payments, persistence, backend calls, or production analytics.

## Browser Verification

Serve local drafts through a static server rather than `file://`. Verify the
screens, responsive variants, links, assets, components, states, and simulated
interactions required by `specs.md`. Report only checks actually completed and
store generated QA evidence inside the revision folder.
