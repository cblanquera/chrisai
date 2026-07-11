# Specs Contract

Use this reference before writing or updating `wireframes/rNNN-meta-title/specs.md`.

`specs.md` is the source document for a wireframe revision. It must be detailed enough for another agent to create the revision from the document alone.

## Contents

- [Required Sections](#required-sections)
  - [Revision Summary](#revision-summary)
  - [Source Of Truth](#source-of-truth)
  - [Screen Inventory](#screen-inventory)
  - [Workflow Starting Points](#workflow-starting-points)
  - [Layout System](#layout-system)
  - [Component Inventory](#component-inventory)
  - [Interaction And State Contract](#interaction-and-state-contract)
  - [Library Plan](#library-plan)
  - [Page Build Plan](#page-build-plan)
  - [Functional Acceptance Checks](#functional-acceptance-checks)

## Required Sections

### Revision Summary

Record:

- Revision folder path.
- Revision number and meta title.
- Whether this is a new revision or an update to an existing revision.
- Previous revision source, when copied forward.
- Product area or feature being wireframed.
- Requested scope and any explicitly deferred screens or states.
- User request or source material that triggered the revision.
- Open questions that affect the rendered artifact.

Keep the current build contract here. Record feedback history, applied
annotations, and review-round approval paths in revision-local `notes.md`.

### Source Of Truth

List the documents, files, tickets, user answers, screenshots, or existing product surfaces used as source material.

For each source, include:

- Path or stable identifier.
- What it contributes.
- Any conflict, assumption, or unresolved gap.

Do not cite chat memory as product truth when a project file can answer the question.

### Screen Inventory

List every screen to build.

For each screen, include:

- HTML file path.
- Purpose.
- Primary user goal.
- Layout.
- Components used.
- Required states.
- Navigation in and out.
- Data/content needed for realistic rendering.

Build one HTML file per screen unless the user explicitly asks for a single page app.

### Workflow Starting Points

Define `workflows.html`.

List each user workflow entry point with:

- Workflow name.
- Starting screen link.
- Intended user role or mode.
- Happy path.
- Alternate or error paths included in the wireframe.

`workflows.html` should help reviewers start real user flows. It is not a notes page and must not expose internal annotations.

### Layout System

Identify every layout used by the revision, such as:

- Blank page layout.
- Panel layout.
- Panel detail stack.
- Header.
- Footer.
- Left or right aside.
- Menu.
- Grid system.
- Mobile shell.
- Optional mobile bottom tabs.
- Optional mobile navigation drawer.
- Split detail layout.
- Modal, top-sheet, or bottom-sheet layout.

For each layout, specify:

- Where it is used.
- Main regions and region names.
- Responsive behavior.
- Shared CSS or JS file, if any.

### Component Inventory

Identify reusable components used by the revision. Consider:

- Accordions.
- Alerts.
- Badges.
- Bread crumbs.
- Buttons and button groups.
- Cards.
- Carousels.
- Dialogs.
- Top and bottom dialog sheets.
- Dropdowns and popovers.
- Form fields.
- Switches.
- Phone fields with country calling codes.
- Country dropdowns.
- Password fields with mask revealers.
- Five-star ratings.
- Range sliders.
- Tags inputs.
- Date, time, and combined date-time fields.
- Date range pickers.
- Rich text editors.
- Heroes.
- Loaders.
- Notifiers.
- Pagination.
- Tables.
- Tabs.
- Trees.
- Tooltips.

For each component, specify:

- Where it appears.
- Variants and states.
- Inputs and outputs.
- Accessibility expectations.
- Shared CSS or JS file, if any.

### Interaction And State Contract

List every meaningful interaction and state change.

Cover:

- Mouse clicks.
- Mouse hover.
- Drag and drop.
- Keyboard events.
- Form validation.
- Dialog open and close.
- Top- and bottom-sheet open and close.
- Tab, accordion, dropdown, popover, tooltip, and tree behavior.
- Panel visibility and resizing.
- Contextual panel root replacement, nested push/back navigation, selected
  source state, active-source toggle closure, different-source replacement,
  and submit-and-return behavior.
- Mobile screen-stack transitions, root tabs, and drawer behavior.
- Password reveal, rating selection, range output, tag add/remove, picker,
  date-range, and rich-text toolbar behavior when used.
- Loading, empty, success, warning, error, disabled, active, selected, and focused states.
- Navigation between screens.
- Any local state persistence such as query string, hash, localStorage, or in-memory state.

For each interaction, specify:

- Trigger.
- Affected element or component.
- State before.
- State after.
- Visible result.
- URL/navigation result, when applicable.
- JS helper or module responsible.

### Library Plan

Specify the vanilla libraries to create or use for this revision.

Include only files that are used by the revision. Candidate files may include:

- `lib/base/tokens.css`
- `lib/base/reset.css`
- `lib/base/base.css`
- `lib/layouts/<layout>.html`
- `lib/layouts/<layout>.css`
- `lib/layouts/<layout>.js`
- `lib/components/<component>.html`
- `lib/components/<component>.css`
- `lib/components/<component>.js`
- `lib/icons/icons.css`
- `lib/icons/icons.js`
- `lib/utilities/templates.js`
- `lib/utilities/state.js`
- `lib/utilities/interactions.js`

Use [Wireframe Library Inventory](wireframe-lib-inventory.md) to identify
bundled sources.
For each planned library file, state whether it will be copied, adapted, or
created for the revision. Include any new layouts, component collections,
templates, interactions, state helpers, or Lucide-guided SVG icons the bundled
inventory does not provide. Do not copy
[`../assets/wireframes/lib/samples/`](../assets/wireframes/lib/samples/)
into a target revision unless the user explicitly asks for sample pages.

For prototype-only controls, specify which visible states and core interactions
must work and which production concerns are intentionally omitted, such as a
complete country dataset, locale and timezone handling, calendar date math, or
full rich-text document semantics.

### Page Build Plan

For each HTML screen, specify:

- File path.
- Title.
- Layout.
- Components.
- Required imports.
- Initial state.
- Interaction hooks.
- Links to other screens.

Use document-relative paths. Avoid root-relative paths.

### Functional Acceptance Checks

Define checks that prove the wireframe is ready:

- `specs.md` matches the rendered pages.
- `workflows.html` links to every workflow start.
- Every screen listed in the spec exists.
- Important clicks and state changes work.
- Navigation between screens works.
- The rendered UI has no annotations, TODOs, or internal implementation notes.
- The UI is grayscale and readable.
- The artifact can be opened as static HTML unless the user requested a server-dependent prototype.

For full-phase approval, also confirm that all requested screens, workflow
paths, layout-affecting states, and materially different responsive variants
are represented. Mark partial scope explicitly and identify the next
wireframe round instead of treating it as phase-complete.
