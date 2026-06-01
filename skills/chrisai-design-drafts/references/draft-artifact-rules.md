# Draft Artifact Rules

Use this reference when creating static HTML/CSS/JS design-review drafts.

## Consolidated Draft Workspace

Each draft must live in one self-contained folder.

Ask where to save drafts before writing files. If the user wants project-visible
review artifacts and has no preference, recommend `design-drafts/`. If the user
wants local or agent-generated drafts away from docs and source, recommend
`.chrisai/design-drafts/`.

Do not place drafts inside production source folders such as `src/`, `app/`,
`pages/`, `components/`, or `public/` unless the user explicitly asks.

Create one folder per draft. Prefer names that include the draft stage, such as
`001-wireframe-homepage`, `002-clickable-wireframe-onboarding`,
`003-creative-dashboard`, or `004-clickable-creative-checkout`.

Keep all draft-related files inside that folder, including:

- static HTML/CSS/JS files
- draft-only assets
- generated graphics
- QA screenshots
- Playwright notes
- interaction smoke-test notes
- review metadata

Example:

```text
design-drafts/
  001-clickable-wireframe-checkout/
    index.html
    cart.html
    shipping.html
    payment.html
    confirmation.html
    styles.css
    script.js
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

Do not put a multi-page or multi-state draft into one monolithic HTML file.
Use sibling HTML files with relative links, such as `dashboard.html`,
`settings.html`, `empty-state.html`, and `error-state.html`. Keep shared
styling in `styles.css` and shared simulated interactions in `script.js`.

Do not add build tooling unless the user requests it or the project already
requires it.

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

When `chrisai-qa-playwright` is used to verify a draft, save screenshots,
recordings, and notes inside the same draft folder under `qa/`.

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
- QA artifacts
- known limitations
- whether it is safe to delete
