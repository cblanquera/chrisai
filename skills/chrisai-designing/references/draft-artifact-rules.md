# Draft Artifact Rules

Use this reference when creating static HTML/CSS/JS design-review drafts.

Generated wireframes and creative drafts must be HTML/CSS/JS review artifacts.
Do not use markdown-only wireframes, markdown mockups, ASCII layouts, or
prose-only drafts unless the user explicitly asks for text-only planning
instead of generated files.

Wireframes use the project-root `wireframes/rNNN-meta-title/` model defined in
[Wireframe Revision Workflow](wireframe-revision-workflow.md). The storage and
revision-folder guidance below applies to creative design drafts and other
non-wireframe design-review artifacts. Shared rendering, notes, browser, and
review rules still apply to both.

## Contents

- [Revision Folders](#revision-folders)
- [File Rules](#file-rules)
- [Relative Link Rules](#relative-link-rules)
- [Per-Update Notes](#per-update-notes)
- [Browser Preview Rules](#browser-preview-rules)
- [QA Artifact Rules](#qa-artifact-rules)
- [Interaction Rules](#interaction-rules)
- [Visual Rules](#visual-rules)
- [Review Label](#review-label)

## Revision Folders

Review rounds and revisions are different.

- A review round is a feedback cycle.
- A revision is a folder-level artifact version created for a major change.

Each major revision must live in one self-contained folder. Minor changes may
update the current revision folder. Use exactly three revision digits:
`r001`, `r002`, `r003`, and so on.

Ask where to save drafts before writing files. If the user wants project-visible
review artifacts and has no preference, recommend `design-drafts/`. If the user
wants local or agent-generated drafts away from docs and source, recommend
`.chrisai/design-drafts/`.

Do not place drafts inside production source folders such as `src/`, `app/`,
`pages/`, `components/`, or `public/` unless the user explicitly asks.

Create one folder per major revision. Prefer names that include the revision
number and draft stage, such as `r001-creative-homepage`,
`r002-clickable-creative-dashboard`, or
`r003-functional-creative-checkout`.

Keep all draft-related files inside that folder, including:

- static HTML/CSS/JS files
- `specs.md` for document-driven wireframe drafts when required by the
  wireframe-drafts workflow
- draft-only assets
- generated graphics
- `notes.md` for per-update review-round notes
- QA screenshots
- browser-review notes
- interaction smoke-test notes
- review metadata

Keep the rendered product surface and documentation separate. HTML, CSS, and
JS files should contain only UI that would plausibly exist in the actual app.
Review notes, agent rationale, simulated-behavior explanations, deferred
states, open questions, TODOs, and implementation commentary belong in
Markdown files such as `README.md`, `notes.md`, `handoff.md`, or `qa/notes.md`.
`notes.md` is the durable per-update review log for the revision. `qa/notes.md`
is only for browser verification notes.

Example:

```text
design-drafts/
  r001-clickable-creative-checkout/
    specs.md
    index.html
    cart.html
    shipping.html
    payment.html
    confirmation.html
    styles.css
    script.js
    notes.md
    assets/
    qa/
      desktop.png
      mobile.png
      notes.md
    README.md
  r002-clickable-creative-checkout-navigation-rework/
    specs.md
    index.html
    cart.html
    shipping.html
    payment.html
    confirmation.html
    styles.css
    script.js
    notes.md
    assets/
    qa/
      desktop.png
      mobile.png
      notes.md
    README.md
```

## File Rules

For plain static drafts, a small folder can include:

- `index.html` as the first page or review hub
- one additional `.html` file per distinct page, screen, or major state
- `styles.css`
- `script.js` when needed
- `assets/` when draft-only images or icons are needed
- `qa/` when screenshots, recordings, or QA notes are produced
- `README.md` for review context
- `specs.md` for the required pre-build wireframe or creative draft contract
- `notes.md` for the required per-update review log

Do not put a multi-page or multi-state draft into one monolithic HTML file.
Use sibling HTML files with relative links, such as `dashboard.html`,
`settings.html`, `empty-state.html`, and `error-state.html`. Keep shared
styling in `styles.css` and shared simulated interactions in `script.js`.

Do not render artifact labels or agent notes inside the product UI. Avoid
visible labels such as "placeholder", "annotation", "wireframe note",
"simulated", "future state", "TODO", or "not final" unless that wording is
intended product copy. If an explanation is needed for reviewers or downstream
agents, put it in Markdown next to the draft.

## Relative Link Rules

Use document-relative links for all generated static review artifacts so the
revision folder works when served from any directory path.

Prefer:

- `./index.html`
- `./dashboard.html`
- `./settings.html`
- `./styles.css`
- `./script.js`
- `./assets/logo.png`
- `../shared/example.png` only when the asset intentionally lives outside the
  current revision folder

Avoid root-relative paths such as `/index.html`, `/dashboard.html`,
`/styles.css`, `/script.js`, or `/assets/logo.png`. Root-relative paths assume
the draft is served from the web server root and can break when the artifact is
reviewed from a nested folder, a temporary static server directory, or a copied
revision folder.

When linking between pages in the same revision folder, include the leading
`./` for clarity, such as `href="./checkout.html"` or
`window.location.href = "./confirmation.html"`.

`README.md` is only review context. It must not replace the HTML/CSS/JS draft
files.

For wireframe and creative drafts, `specs.md` is the source contract for the
rendered draft. It must not replace HTML/CSS/JS files, and it must be updated
before rendered files change when feedback alters structural or creative
intent.

Do not add build tooling unless the user requests it or the project already
requires it.

## Per-Update Notes

Every generated wireframe or creative revision must include `notes.md` once
the artifact has gone through its first update or review round. Append or
update one entry per artifact update. This applies to major revisions and minor
updates inside the current revision folder.

Use this entry shape unless the project already has a stricter local format:

```markdown
## Round <n> - <YYYY-MM-DD> - <short label>

### Changed
- <visible artifact change>
- <behavior or state change>

### Review Focus
- <specific screen, state, flow, or decision the user should review>

### Feedback And Annotations Applied
- <annotation, screenshot note, chat note, or ad hoc request applied>

### Simulated Or Deferred
- <behavior that is simulated, illustrative, deferred, or not production>

### Open Questions
- <question or "None">

### Approval Path
If approved, the next step is <exact next step>. If not, revise <specific area>.
```

Do not put this update log in rendered HTML. Do not rely only on the chat
transcript for this information; future creative and frontend agents need the
revision-local notes to prevent drift.

## Browser Preview Rules

Do not try to open local static drafts with `file://` browser URLs. Serve the
draft workspace with a simple static server, then open the localhost URL:

```bash
python3 -m http.server [port] --directory [location]
```

Use an available local port and the draft workspace as `[location]`. Link to
the served entry page, such as `http://127.0.0.1:[port]/index.html`.

This server is only a static preview server for review. It must serve the
generated draft files as-is and must not add production build tooling,
backend behavior, authentication, persistence, payments, or analytics.

## QA Artifact Rules

When the Browser plugin or another available browser capability is used to
verify a draft, save screenshots, recordings, and notes inside the same draft
folder under `qa/`. If no browser capability is available, provide the review
URL or file path and state that browser verification was not performed.

Do not scatter draft QA artifacts into separate temporary folders unless the
user explicitly asks for that.

Useful QA outputs:

- `qa/desktop.png`
- `qa/mobile.png`
- `qa/flow.webm`
- `qa/notes.md`

## Interaction Rules

Acceptable simulated interactions:

- tab switching
- simple menu open and close
- modal or drawer open and close
- stepper navigation
- preview-only form state
- validation messaging and success or error states
- disabled, selected, loading, and empty states
- page-to-page links inside the draft

Avoid:

- real authentication
- real persistence
- real payments
- backend calls
- production analytics

## Visual Rules

Creative design drafts should follow the approved wireframe and either:

- approved brand-led creative direction, or
- extracted existing product design rules

Do not introduce new visual language in an existing product extension unless
the user explicitly approves it.

## Review Label

The final response should state that the artifact is a design-review draft and
list what is simulated.

If a `README.md` is created in the draft workspace, include:

- draft stage
- source inputs
- what is clickable
- what is simulated
- what values are illustrative placeholders, unless promoted into
  requirements, configuration, or final copy
- where the per-update notes live
- QA artifacts
- known limitations
- whether it is safe to delete
