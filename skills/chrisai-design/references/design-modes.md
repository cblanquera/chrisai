# Design Modes

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
- implementation-ready handoff

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
- design handoff that preserves the current product language

Do not introduce a new style unless the user explicitly asks for a redesign.

## Grayscale Wireframe Draft

Use when the structure is not approved yet.

Owner: `workflows/wireframes.md`.

Rules:

- grayscale only
- no logo-dependent color system
- no gradients
- no decorative graphics
- no polished visual styling
- generated wireframes must be static HTML/CSS/JS review artifacts
- do not output markdown-only wireframes unless the user explicitly requests
  text-only planning
- focus on sections, hierarchy, layout density, and user flow

Output:

- static HTML/CSS/JS low-fidelity draft
- open questions about layout and flow
- review instructions and next-step guidance for the current review round

## Clickable Grayscale Wireframe Draft

Use after the grayscale wireframe direction is accepted and navigation or flow
needs to be tested.

Owner: `workflows/wireframes.md`.

Rules:

- generated clickable wireframes must be static HTML/CSS/JS review artifacts
- generated clickable wireframes must use HTML/CSS/JS files, not markdown
- links and simple state changes may be clickable
- styling remains grayscale and low-fidelity
- no production implementation claims
- each review round must state what is clickable, what is simulated, and what the
  user should test before approval

## Creative Design Draft

Use after the wireframe is approved.

Owner: `workflows/design-drafts.md` when creating a static review artifact.
Owner: `workflows/creative-direction.md` when only a design-direction handoff
is needed.

Rules:

- apply the approved visual direction to the approved wireframe
- generated creative drafts must be static HTML/CSS/JS review artifacts
- preserve the approved layout unless the user asks to revisit it
- add color, typography, imagery, icons, and surface treatment
- keep usability constraints visible
- each review round must state what visual decisions changed and what the user should
  review before approval

## Clickable Creative Design Draft

Use after the creative design direction is accepted and the user needs a
reviewable interaction draft.

Owner: `workflows/design-drafts.md`.

Rules:

- generated clickable creative drafts must be static HTML/CSS/JS review
  artifacts
- generated clickable creative drafts must use HTML/CSS/JS files, not markdown
- interactions should demonstrate intent, not production behavior
- generated assets should use an available image, logo, asset, or graphics
  capability when asset format, transparency, or favicon quality matters; if no
  capability is available, use best-effort placeholders or static guidance
- each review round must state what is clickable, what is simulated, what changed,
  and what the user should test before approval

## Functional Creative Draft

Use when the user needs to review a creative design with enough interaction to
evaluate flows, states, menus, forms, modals, drawers, validation messaging, or
state transitions.

Owner: `workflows/design-drafts.md`.

Rules:

- functional creatives are still design-review artifacts
- functional creatives must use static HTML/CSS/JS for simulated behavior
- behavior must be clearly labeled as simulated unless it is real
- do not add real persistence, authentication, billing, backend calls, or
  production analytics
- each reviewable update must go through `workflows/feedback-loop.md` until the
  phase is approved

## Draft Artifact Storage

Before writing static draft files, ask whether the user wants drafts saved in
the project.

If yes:

- ask where to save them
- create one new revision folder for major changes
- keep minor changes in the current revision folder when appropriate
- name folders clearly by revision and draft stage when possible
- keep draft files separate from production app code unless the user requests
  otherwise

If no:

- provide text guidance or temporary artifacts only
- do not add project files

Use `references/draft-artifact-rules.md` for the detailed draft workspace,
browser-review artifact, and folder-naming rules.
