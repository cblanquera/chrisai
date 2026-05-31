# Design Modes

Use this reference to choose the right workflow before collecting inputs or
creating drafts.

## Review Rounds

Use
[`chrisai-process-feedback-loop`](../../chrisai-process-feedback-loop/SKILL.md)
for shared review-loop rules across all design phases that involve browser
review or user approval. The short version: each round must say what changed,
ask specific review questions, and state the exact next step if the round is
approved.

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

Owner: `chrisai-design-system-extraction` for rule extraction, then
`chrisai-design-creative` for coordinated direction if the extension needs
creative decisions.

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

Owner: `chrisai-design-wireframes`.

Rules:

- grayscale only
- no logo-dependent color system
- no gradients
- no decorative graphics
- no polished visual styling
- focus on sections, hierarchy, layout density, and user flow

Output:

- static low-fidelity draft or design description
- open questions about layout and flow
- review instructions and next-step guidance for the current round

## Clickable Grayscale Wireframe Draft

Use after the grayscale wireframe direction is accepted and navigation or flow
needs to be tested.

Owner: `chrisai-design-wireframes`.

Rules:

- static HTML/CSS/JS is acceptable for review
- links and simple state changes may be clickable
- styling remains grayscale and low-fidelity
- no production implementation claims
- each round must state what is clickable, what is simulated, and what the
  user should test before approval

## Creative Design Draft

Use after the wireframe is approved.

Owner: `chrisai-design-drafts` when creating a static review artifact.
Owner: `chrisai-design-creative` when only a design-direction handoff is
needed.

Rules:

- apply the approved visual direction to the approved wireframe
- preserve the approved layout unless the user asks to revisit it
- add color, typography, imagery, icons, and surface treatment
- keep usability constraints visible
- each round must state what visual decisions changed and what the user should
  review before approval

## Clickable Creative Design Draft

Use after the creative design direction is accepted and the user needs a
reviewable interaction draft.

Owner: `chrisai-design-drafts`.

Rules:

- static HTML/CSS/JS is acceptable for design review
- interactions should demonstrate intent, not production behavior
- generated assets should route through `chrisai-design-asset-formats` when
  asset format, transparency, or favicon quality matters
- each round must state what is clickable, what is simulated, what changed,
  and what the user should test before approval

## Draft Artifact Storage

Before writing static draft files, ask whether the user wants drafts saved in
the project.

If yes:

- ask where to save them
- create one new folder per draft
- name folders clearly by draft stage when possible
- keep draft files separate from production app code unless the user requests
  otherwise

If no:

- provide text guidance or temporary artifacts only
- do not add project files

Use
[`draft-artifact-rules`](../../chrisai-design-drafts/references/draft-artifact-rules.md)
for the detailed draft workspace, QA artifact, and folder-naming rules.
