# Wireframing

This is the wireframe-drafting workflow inside `chrisai-designing`. It owns
wireframe creation, revision structure, specs, reusable library selection,
functional behavior, and wireframe-specific readiness checks.

Use [Feedback Loop](feedback-loop.md) to present every review round and control
review-round or phase approval. Use
[Design Handoff Package](design-handoff-package.md) only after approval or when
the user explicitly requests implementation-facing documentation.

## Purpose

Use this skill to create functional grayscale product-surface prototypes for structural and interaction review. Wireframes may inform later implementation, but they are not production frontend code. They are project-owned artifacts under the target project root `wireframes/` folder, not under `.agents/`.

Every wireframe revision is document driven. Write or update `specs.md` first, then create the rendered HTML/CSS/JS from that spec.

This skill owns grayscale structure, screen flows, functional review behavior,
and wireframe review records. It does not own brand styling, polished visual
design, production implementation, or production QA.

## Revision Model

- Use `wireframes/r001-meta-title/`, `wireframes/r002-meta-title/`, and so on.
- Use exactly three revision digits: `r001`, `r002`, `r003`.
- Make `meta-title` a short lowercase hyphenated explainer of the revision scope.
- Put a complete `specs.md` in every revision folder.
- For `r002` and later, copy forward the previous revision's `specs.md` as the starting point, then update it before editing rendered artifacts.
- Do not create a new revision folder for tiny fixes unless the user asks for a new revision or the change materially alters scope, layout, flow, or behavior.
- Treat a review round as one feedback cycle. Reserve revision for a major folder-level artifact version.

Read [Revision Workflow](../references/wireframe-revision-workflow.md) before creating a revision folder or deciding whether to modify an existing revision.

## Required Workflow

1. Identify the target project root and the source material that defines the product truth.
2. Collect only missing audience, goal, scope, action, navigation, device, and existing-product constraints that materially affect structure.
3. When structure is unresolved, compare one to three grayscale HTML/CSS/JS layout options before committing to the full build.
4. Create or select the revision folder using the revision model.
5. Create or update `wireframes/rNNN-meta-title/specs.md` before writing HTML, CSS, or JS.
6. In `specs.md`, identify layouts, reusable components, interactions, states, library files, page files, and `workflows.html` entry points.
7. Build one HTML file per screen unless the user explicitly asks for a single page app, and build `workflows.html` as the separate workflow starting-points page.
8. Make screens product-like and functional wherever interaction affects understanding.
9. Verify the rendered artifact in an available browser and report any unverified behavior.
10. Present every artifact update through [Feedback Loop](feedback-loop.md),
    record it in revision-local `notes.md`, and advance only through the stated
    approval path.

Read [Specs Contract](../references/wireframe-specs-contract.md) before writing or updating `specs.md`.
Read [Implementation Rules](../references/wireframe-implementation-rules.md) before writing HTML, CSS, or JS.
Read [Review Workflow](../references/wireframe-review-workflow.md) before
presenting a generated or updated artifact for approval, then use
[Feedback Loop](feedback-loop.md) for the shared review response and approval
language.

## Rendered Artifact Rules

- Use vanilla HTML, CSS, and JavaScript only. Do not add frameworks, package managers, build tools, or generated app scaffolds unless the user explicitly asks.
- Keep the rendered wireframe grayscale. Use spacing, border, weight, and tone for hierarchy.
- Do not put annotations, TODO text, spec explanations, review notes, implementation notes, or keyboard-shortcut explanations in rendered screens.
- Keep rendered screens close to product truth: realistic labels, realistic page structure, plausible state, and working controls.
- Use document-relative links such as `./workflows.html`,
  `./pages/settings.html`, and `../lib/base/base.css`.
- Prefer semantic HTML and reusable vanilla helpers over page-specific one-off behavior when multiple screens share the same pattern.
- Keep build-contract decisions in `specs.md`, review history in `notes.md`, and both out of the rendered UI.

## Library Policy

This workflow includes a reusable starting library under
[`../assets/wireframes/lib/`](../assets/wireframes/lib/). Start most revisions
with its `base/` CSS system, then inspect
[wireframe-lib-inventory](../references/wireframe-lib-inventory.md) for other
useful files. Copy only what the revision uses.

Treat HTML files beside component and layout CSS as canonical source markup.
Copy them directly or use them as guides. Adapt content, IDs, links, structure,
behavior, and initial state to match `specs.md` while preserving relevant
accessibility hooks.

The bundled library does not limit the wireframe. Create new layouts,
components, interactions, state helpers, or other files whenever the revision
needs them, and document the resulting library plan in `specs.md`.

Candidate library areas are:

- templating
- layouts
- component collections
- interactions
- state management

Treat [wireframe-lib-inventory](../references/wireframe-lib-inventory.md) as
the inventory of bundled files, not as a catalog of everything a wireframe may
use.

Review samples live under
[`../assets/wireframes/lib/samples/`](../assets/wireframes/lib/samples/). Use
them to inspect library behavior, but do not copy `samples/` into target
project wireframe revisions unless the user explicitly asks for sample pages.

## Validation

Before presenting a revision for review, check that `specs.md`, `notes.md`, and `workflows.html` exist; screen links and workflow-relevant behavior work; the UI has no visible annotations; and the implemented scope matches `specs.md`. Do not call the wireframe phase approved until its complete requested scope has passed the review workflow.
