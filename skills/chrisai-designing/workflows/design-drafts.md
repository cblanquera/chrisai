# Design Drafts

Use this workflow to create spec-driven creative design drafts from an approved
wireframe or structure plus an approved creative direction or extracted design
system. Creative drafts are static HTML/CSS/JS review artifacts, not production
frontend code.

Every creative revision is document driven. Create or update revision-local
`specs.md` before creating or changing rendered HTML/CSS/JS.

Use [Feedback Loop](feedback-loop.md) to present every review round and control
review-round or phase approval. Use
[Design Handoff Package](design-handoff-package.md) after approval or when the
user explicitly requests an interim handoff.

## Ownership

This workflow owns:

- creative design drafts from approved structure and visual direction
- clickable and functional creative review artifacts
- revision-local creative `specs.md`
- visual-system application, component treatment, responsive presentation,
  assets, and simulated interaction behavior
- creative-specific browser review and readiness checks

This workflow does not own:

- unresolved wireframe structure
- extracting an existing design system
- approving design phases
- production frontend implementation or production QA

Use [wireframe-drafts](wireframe-drafts.md) when structure is not approved. Use
[design-system-extraction](design-system-extraction.md) when existing product
rules must be extracted first. Use
[creative-direction](creative-direction.md) when visual direction is unresolved.

## Required Workflow

1. Confirm the approved structural and visual source inputs.
2. Confirm whether the creative revision belongs in the project and select its
   workspace.
3. Create or select `design-drafts/rNNN-meta-title/` using
   [Creative Revision Workflow](../references/creative-draft-revision-workflow.md).
4. Create or update revision-local `specs.md` using
   [Creative Specs Contract](../references/creative-draft-specs-contract.md).
5. Generate or revise HTML/CSS/JS from `specs.md` using
   [Creative Implementation Rules](../references/creative-draft-implementation-rules.md).
6. Verify and present the artifact using
   [Creative Review Workflow](../references/creative-draft-review-workflow.md)
   and [Feedback Loop](feedback-loop.md).
7. Advance only through the approval path recorded in `notes.md`.

## Spec Authority

Treat creative `specs.md` as the current build contract. It owns the revision's
source artifacts, scope, screen inventory, visual system, components, variants,
states, assets, content, responsive behavior, motion and interaction intent,
file plan, simulated behavior, review criteria, and open questions.

When feedback changes any of those decisions, update `specs.md` before editing
the rendered artifact. Keep review history and applied annotations in
`notes.md`; do not use `notes.md` as a substitute for the current spec.

## Invariant Artifact Rules

- Use static HTML/CSS/JS for generated creative review artifacts.
- Use one HTML file per page, screen, or major state unless the user explicitly
  requests a single-page artifact.
- Use document-relative page, style, script, and asset paths.
- Show only intended product UI in rendered files. Put annotations, TODOs,
  review notes, implementation commentary, and annotative placeholders in
  revision-local Markdown.
- Preserve approved wireframe structure unless the user explicitly reopens it.
- Treat interactions as review simulations unless production implementation is
  explicitly requested through another workflow.
- Keep every revision's `specs.md`, `notes.md`, source files, assets, and QA
  evidence inside its revision folder.

## Readiness Gate

Do not call a creative phase approved until its complete requested scope
matches `specs.md`, browser-visible checks have been reported honestly, and the
shared feedback loop records phase approval.
