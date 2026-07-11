# Implementation Rules

Use this reference before writing wireframe HTML, CSS, or JavaScript.

## Contents

- [Core Rules](#core-rules)
- [Page Model](#page-model)
- [Grayscale Design Rules](#grayscale-design-rules)
- [Functional Behavior](#functional-behavior)
- [State](#state)
- [Library Usage](#library-usage)
- [Content Discipline](#content-discipline)
- [Verification](#verification)

## Core Rules

- Use vanilla HTML, CSS, and JavaScript.
- Keep the artifact static-file friendly whenever possible.
- Use document-relative links for pages, CSS, JS, and images.
- Keep the UI grayscale.
- Do not add annotations, TODO labels, review prose, implementation notes, or visible explanations of how to use the wireframe.
- Do not include annotations and annotation elements that are visible in the rendered UI.
- Do not create unused files or empty placeholder folders.

## Page Model

Create one HTML file per screen unless the user asks for a single page app.

Use `workflows.html` as the separate workflow starting-points page. It should be a real navigation surface with links into user flows, not a planning note.

Use predictable paths. Example:

```text
workflows.html
pages/dashboard.html
pages/settings.html
lib/base/tokens.css
lib/base/reset.css
lib/base/base.css
lib/layouts/panel-layout.css
lib/components/buttons.css
lib/components/dialog.css
lib/icons/icons.js
lib/utilities/interactions.js
```

Only create files that are required by `specs.md`.

## Grayscale Design Rules

Use neutral color values such as white, near-white, light gray, mid gray, and dark gray. Express hierarchy through:

- Spacing.
- Borders.
- Type scale.
- Font weight.
- Surface tone.
- Dividers.
- Layout density.

Do not use brand colors, decorative gradients, decorative illustrations, or colorful status treatments unless the user explicitly asks for them. Status can be represented with grayscale labels, icons, borders, and text.

Prefer white and light-gray surfaces. Do not use black or near-black for
backgrounds, hover states, or text. Use medium gray for emphasized controls and
a darker gray only when additional contrast is required.

Use Lucide SVG icons from
[`../assets/wireframes/lib/icons/`](../assets/wireframes/lib/icons/) when suitable. If the bundled
inventory does not include the needed icon, use Lucide as the visual guide and
create a local or inline SVG. Do not approximate icons with ASCII characters.
Keep accessible control names in text or `aria-label` attributes.

Use native flag emoji for country and calling-code choices. Do not draw custom
country flag vectors for wireframes.

## Functional Behavior

Wireframes should behave close to the intended frontend.

Implement real behavior for interactive elements, components, form fields,
layouts, navigation, and workflow-relevant state changes. Include loading,
empty, success, warning, and error states when the product flow calls for them.

Clickable behavior is the default for app screens, multi-screen flows, forms,
menus, tabs, dialogs, drawers, and other stateful surfaces when interaction
affects understanding. Static-only output is appropriate for intentionally
non-interactive surfaces, early layout-option comparisons, or an explicitly
partial draft.

Use small reusable JS helpers when the same pattern appears in multiple screens.

For a panel detail stack, bind domain-specific content through the
`wf:detail-open` and `wf:detail-submit` events. Keep record types, datasets,
and update logic in the owning screen or sample instead of the reusable layout
module. When a source row or item opens the root detail screen, clicking or
keyboard-activating that already-selected source should close the panel and
clear its selected state. Activating a different source while the panel is open
should keep the panel open and replace its root content.

Prototype components do not need production-grade datasets or parsing unless
`specs.md` requires them. Preserve the intended visible states and core
workflow, but do not add complete country data, locale/timezone engines,
calendar libraries, or rich-text document models only to support a wireframe.

## State

Model state clearly and conservatively.

Use:

- CSS classes and ARIA attributes for component state.
- Query strings or hashes when a state should be linkable.
- `localStorage` only when cross-page persistence is needed for review.
- In-memory state for simple same-page interactions.

Document each state decision in `specs.md`.

## Library Usage

The authoring skill includes source library files under
[`../assets/wireframes/lib/`](../assets/wireframes/lib/).

Start most revisions with `base/tokens.css`, `base/reset.css`, and
`base/base.css`. When using other bundled files:

1. Read [Wireframe Library Inventory](wireframe-lib-inventory.md).
2. Select only files required by the current revision's `specs.md`.
3. Copy selected HTML fragments or layout shells into the owning screen files and adapt their content, IDs, links, and initial state.
4. Copy selected CSS, JavaScript, icons, and helpers into the revision folder, usually under `lib/`.
5. Do not copy unused components, layouts, icons, helpers, or CSS.
6. If a copied file includes unused exports or styles, trim it when doing so will not break the shared pattern.

Keep source paths grouped as `base/`, `layouts/`, `components/`, `icons/`,
and `utilities/` when preserving the bundled structure. If a revision flattens
or combines files, record that mapping in `specs.md`.

Treat bundled files as copyable sources and implementation guides, not as a
limit. Create or adapt local layouts, component collections, templates,
interactions, state helpers, and icons as needed, and record them in the
`Library Plan` section of `specs.md`.

Review samples live under
[`../assets/wireframes/lib/samples/`](../assets/wireframes/lib/samples/). Use
them to inspect behavior and dependencies, but do not copy sample pages or
`samples/sample.css` into target revisions unless the user explicitly asks for
review samples.

## Content Discipline

Use realistic product copy and data from source material when available. When
source material is missing, use neutral illustrative content that reflects the
shape of the real domain. Do not visibly label it as placeholder content or add
annotative placeholders to the rendered wireframe. Record illustrative-data
assumptions and annotations in revision-local `notes.md`.

Avoid filler that teaches the reviewer how wireframes work. The rendered UI should read like a real product surface.

## Verification

Before finishing:

- Open or otherwise inspect `workflows.html`.
- Click through the main workflow links.
- Exercise all components with interactive states.
- Check responsive behavior for at least one narrow and one wide viewport when browser tooling is available.
- Search rendered source text for `TODO`, `annotation`, `note:`, and similar internal labels.
- Confirm the file list matches `specs.md`.

Use an available in-app browser, browser tool, or equivalent preview capability
for rendered verification. Identify the exact review URL or entry file and
report only checks actually run. When screenshots, recordings, or browser QA
notes are produced, keep them under the revision's optional `qa/` folder and
record the checks in `qa/notes.md`.

If browser verification is not possible, say so and report only the static checks completed.
