# Design Modes

## Contents

- [Review Rounds](#review-rounds)
- [Greenfield Design Direction](#greenfield-design-direction)
- [Existing Design Extension](#existing-design-extension)
- [Grayscale Wireframe Draft](#grayscale-wireframe-draft)
- [Clickable Grayscale Wireframe Draft](#clickable-grayscale-wireframe-draft)
- [Creative Design Draft](#creative-design-draft)
- [Clickable Creative Design Draft](#clickable-creative-design-draft)
- [Functional Creative Draft](#functional-creative-draft)
- [Draft Artifact Storage](#draft-artifact-storage)

Use this reference to choose the right workflow before collecting inputs or
creating drafts.

## Review Rounds

Use `workflows/feedback-loop.md` for shared review-loop rules across all
design phases that involve browser review or user approval. The short version:
each review round must say what changed, ask specific review questions, and state the
exact next step if the round is approved.

Use "review round" for the feedback cycle and "revision" for a major
folder-level artifact change. Major changes create a new revision folder; minor
changes may stay in the current revision folder.

When generated wireframes, creative drafts, clickable drafts, or functional
creatives are created or changed, the current revision folder must include a
`notes.md` entry for that update. The entry records what changed, what should
be reviewed, feedback or annotations applied, simulated or deferred behavior,
open questions, and approval path. Rendered HTML must show only intended
product UI; put agent notes, annotations, and implementation commentary in
Markdown companion files.

## Greenfield Design Direction

Use when there is no existing app or site design to extend.

Inputs:

- logo or brand mark
- brand style guide when available
- product description and audience
- 3-5 reference websites or apps

Output:

- brand-led creative direction
- visual system guidance
- differentiation strategy
- implementation-ready handoff through `workflows/design-handoff-package.md`
  when generated wireframe or creative artifacts are being handed off

## Existing Design Extension

Use when a deployed site, app, Figma file, design system, local component
library, or design file already exists.

Owner: `workflows/design-system-extraction.md` for rule extraction, then
`workflows/creative-direction.md` for coordinated direction if the extension
needs creative decisions.

Inputs:

- design source of truth
- target page or screen to add or revise
- product constraints and audience
- reference sites only when the existing design leaves a gap

Output:

- extracted existing design rules
- extension rules for the new page or screen
- design handoff that preserves the current product language, using
  `workflows/design-handoff-package.md` when generated artifacts exist

Do not introduce a new style unless the user explicitly asks for a redesign.

## Grayscale Wireframe Draft

Use when the structure is not approved yet.

Owner: `workflows/wireframe-drafts.md`.

Rules:

- grayscale only
- no logo-dependent color system
- no gradients
- no decorative graphics
- no polished visual styling
- generated wireframes must be static HTML/CSS/JS review artifacts
- do not output markdown-only wireframes unless the user explicitly requests
  text-only planning
- create or update revision-local `specs.md` before generating or revising the
  rendered draft
- `specs.md` must capture layouts, reusable components, interactions, states,
  routes, workflow starting points, and draft-local library plans
- `specs.md` must use headings and bullets, not markdown tables
- when `specs.md` calls for icons, render inline or local grayscale SVG icons
  based on Lucide icons
- rendered HTML must not include annotations, TODOs, review notes, placeholder
  labels, or implementation commentary unless the text is intended product copy
- each artifact update must append or update revision-local `notes.md`
- focus on sections, hierarchy, layout density, and user flow

Output:

- revision-local `specs.md`
- static HTML/CSS/JS low-fidelity draft
- revision-local `notes.md` update when files are created or changed
- open questions about layout and flow
- review instructions and next-step guidance for the current review round

## Clickable Grayscale Wireframe Draft

Use when navigation or flow needs to be tested. This may happen in the first
wireframe draft when interaction affects understanding.

Owner: `workflows/wireframe-drafts.md`.

Rules:

- generated clickable wireframes must be static HTML/CSS/JS review artifacts
- generated clickable wireframes must use HTML/CSS/JS files, not markdown
- generated clickable wireframes must follow revision-local `specs.md`
- product-like clickable behavior is the default for app screens,
  multi-screen flows, forms, menus, tabs, modals, drawers, and stateful
  surfaces when interaction affects understanding
- styling remains grayscale and low-fidelity
- no production implementation claims
- rendered HTML must not include annotations or review notes
- each artifact update must append or update revision-local `notes.md`
- each review round must state what is clickable, what is simulated, and what the
  user should test before approval

## Creative Design Draft

Use after structure and visual direction are approved. Use
`workflows/design-drafts.md` for a rendered artifact and
`workflows/creative-direction.md` for direction-only handoff.

Apply the visual system to the approved structure. Record visual tokens,
components, states, assets, responsive behavior, and review criteria in
revision-local `specs.md` before rendering.

## Clickable Creative Design Draft

Use when an approved creative direction needs reviewable interaction. Route to
`workflows/design-drafts.md`; record interaction intent and simulated behavior
in `specs.md` before rendering.

## Functional Creative Draft

Use when interaction depth is needed to review flows, forms, menus, modals,
validation, or state transitions. Route to `workflows/design-drafts.md` and
keep behavior simulated unless production implementation is requested through
another workflow.

## Draft Artifact Storage

Wireframes always follow
[Wireframe Revision Workflow](wireframe-revision-workflow.md), including its
project-root `wireframes/rNNN-meta-title/` location. Do not route wireframes
through the generic creative-draft storage rules below.

Before writing creative design draft files, ask whether the user wants drafts
saved in the project.

If yes:

- ask where to save them
- create one new three-digit revision folder such as `r001` or `r002` for
  major changes
- keep minor changes in the current revision folder when appropriate
- name folders clearly by revision and draft stage when possible
- append or update `notes.md` for every generated-artifact update
- keep draft files separate from production app code unless the user requests
  otherwise

If no:

- provide text guidance or temporary artifacts only
- do not add project files

Use `references/draft-artifact-rules.md` for the detailed draft workspace,
browser-review artifact, and folder-naming rules.
