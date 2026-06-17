# Design Drafts

Use this workflow when the main problem is creating reviewable static design
artifacts after structure and design direction are known.

Drafts are temporary review artifacts. They are not production implementation.

Use [feedback-loop](feedback-loop.md) for shared review-loop rules, including
review-round approval, phase approval, next-step language, revision folders,
and artifact folder behavior.

## Portability

Write draft guidance for portable agent use first. Do not assume the consumer
is Codex-only. Use Codex-specific, Claude-specific, or OpenCode-specific notes
only when the behavior actually differs.

## Ownership

This workflow owns:

- static HTML/CSS/JS design-review artifacts
- clickable creative design drafts
- functional creative drafts for reviewable flows and states
- visual application of approved wireframes
- consolidated draft workspace folder structure
- draft-stage labeling and review handoff

This workflow does not own:

- design source-of-truth extraction
- low-fidelity wireframe exploration
- final production frontend implementation
- browser QA for production behavior
- SVG, PNG, or ICO asset conversion

Use [wireframes](wireframes.md) when the layout or flow is not approved yet.

Use [design-system-extraction](design-system-extraction.md) when the draft must
match an existing product and the design rules are not yet known.

Use [creative-direction](creative-direction.md) when the visual direction is
still unresolved.

When the draft needs new SVG, PNG, ICO, transparent, favicon-ready, generated,
or converted assets, look for an available logo, image, asset, or graphics
capability. If none is available, use placeholders or best-effort static
guidance and state the limitation.

When work moves from draft artifact into production HTML/CSS/JS, look for an
available frontend, HTML/CSS, JavaScript, app implementation, or project-local
coding workflow. If none is available, keep the output at the design-artifact
or handoff level.

## Workflow

Work through these steps in order:

1. confirm the draft stage
2. confirm inputs and draft workspace
3. create the static draft
4. label review-only behavior
5. run draft QA
6. present review instructions and next steps
7. produce a handoff

Do not create static draft files in the project until the user confirms where
they should be saved.

Every reviewable creative artifact must go through [feedback-loop](feedback-loop.md)
until the creative or draft phase is approved. This includes feedback received
as annotations, screenshot notes, direct chat comments, ad hoc requests, or
informal change lists. Apply the feedback, decide whether it is a major
revision or a minor update, then present the updated creative in another
review round.

## Step 1: Confirm The Draft Stage

Supported stages:

- clickable grayscale wireframe draft
- creative design draft from approved wireframe
- clickable creative design draft
- functional creative draft for reviewing flows, states, and interaction intent

If the wireframe or visual direction is not approved, hand off to the owning
skill first.

## Step 2: Confirm Inputs And Draft Workspace

Required inputs:

- approved wireframe or structure
- brand-led creative direction or existing design rules
- target viewport assumptions
- required screens or states
- draft stage

Before writing files, ask:

- should this draft be saved in the project?
- where should the draft workspace live?

Create one new revision folder per major draft change. That folder is the
consolidated workspace for the revision, including source files, draft-only
assets, QA screenshots, QA notes, recordings, and review metadata. Minor
changes may update the current revision folder.

Keep review artifacts separate from production app code unless the user
explicitly requests otherwise.

## Step 3: Create The Static Draft

Generated design drafts must be static HTML/CSS/JS review artifacts.

Rules:

- keep files small and readable
- create a separate HTML file for each distinct page, screen, or major state
- use semantic HTML where practical
- use CSS variables for draft-level colors, type, spacing, and surfaces
- avoid production build tooling unless the project already requires it
- mark interactions as simulated where appropriate
- do not wire real persistence, authentication, billing, or backend behavior

Do not collapse a multi-page draft into one large HTML file. Use `index.html`
only as the first page or review hub, then add sibling files such as
`checkout.html`, `settings.html`, `empty-state.html`, or
`mobile-menu.html` for the remaining pages and states. Share draft-level
styles and behavior through `styles.css` and `script.js` when useful, and use
document-relative links between HTML files so the folder can be reviewed
without a build step. Use links such as `./index.html`, `./checkout.html`,
`./styles.css`, and `./script.js`; do not use root-relative links such as
`/index.html`, `/checkout.html`, `/styles.css`, or `/script.js` inside
portable static drafts.

For clickable drafts, include only interactions needed to review navigation,
flow, or state intent.

Functional creative drafts are still design-review artifacts, not production
implementation. They may include enough static HTML/CSS/JS behavior to review
flow, screen states, validation messaging, menus, tabs, modals, drawers, and
state transitions, but they must clearly label simulated behavior and avoid
real persistence, authentication, billing, backend calls, or production
analytics.

Use [draft-artifact-rules](../references/draft-artifact-rules.md) for artifact
boundaries.

Follow the artifact rules in
[browser-feedback-loop](../references/browser-feedback-loop.md):
major changes create a new revision folder; minor changes may update the
current revision folder. Review rounds and revisions are tracked separately.
For example, a creative phase may go through 10 review rounds and 3 major
revision folders.

## Step 4: Label Review-Only Behavior

The artifact must be clearly described as a draft for design review.

Do not present it as production-ready code.

If the draft is intentionally static, say which actions are simulated.

## Step 5: Run Draft QA

Before treating the draft as ready, check:

- desktop and mobile layout do not overlap
- text fits inside controls and panels
- the primary action is visible
- clickable elements are obvious
- simulated interactions work enough for review
- visual styling follows approved direction or existing design rules
- generated assets were validated by an available image, logo, asset, or
  graphics capability when needed; if no capability is available, the limitation
  is stated

Use the Browser plugin when available for rendered inspection, screenshots, or
interaction checks. If the Browser plugin is unavailable, provide the review
URL or file path and state that browser verification was not performed.

For local static drafts, do not try to open `file://` URLs in the browser.
Serve the draft workspace with a simple static server, then open the
localhost URL:

```bash
python3 -m http.server [port] --directory [location]
```

Use an available local port and the draft workspace as `[location]`. Link to
the served entry page, such as `http://127.0.0.1:[port]/index.html`. This is a
static preview server for review, not production infrastructure.

Treat this server as agent-owned when the agent starts it:

- stop it before the final response unless the user needs it open for review
- use a 15-minute default timeout, 5 minutes for quick verification, or 30
  minutes for user review
- do not stop a server that was already running before the task
- report whether the server was stopped, left running with its URL and timeout,
  or identified as pre-existing and left alone

When browser verification produces screenshots, recordings, or QA notes, keep
them inside the same draft workspace under `qa/`. Do not scatter design-draft
browser artifacts into a separate temporary workspace unless the user
explicitly asks for that.

## Step 6: Present Review Instructions And Next Steps

After each review round, state:

- what changed in this review round
- which revision folder contains the current draft
- what the user should review now, phrased as specific questions
- what is clickable
- what is simulated
- what feedback would be most useful
- the next step if this review round is approved
- whether more review rounds remain before the next phase
- the next step if revisions are needed

For creative design drafts, ask the user to review visual fit, hierarchy,
brand/style-guide alignment, component treatment, density, and missing states.
Phrase those review items as concrete questions tied to what changed in the
current review round.

For clickable creative drafts, also ask the user to test the intended flow and
confirm whether simulated interactions communicate the behavior clearly.

Use direct review prompts such as:

```markdown
What to review for this review round:

- Does the visual treatment match the approved brand direction?
- Does the hierarchy make the primary action obvious?
- Do the card, form, and navigation treatments feel consistent with the
  existing design rules?
- Are any important states missing before this becomes clickable?
- Do the simulated interactions communicate the intended flow clearly?

If this review round is approved, the next step is to apply this treatment to the
remaining draft screens. If not, tell me which visual decisions or states to
revise.
```

Do not move from creative design draft to clickable creative draft, or from
clickable draft to production implementation, unless that was the exact next
step stated for the approved round and the current phase scope is complete.

## Step 7: Produce The Handoff

When the user asks for documentation or implementation handoff material, use
[design-handoff-package](design-handoff-package.md). Otherwise, state:

- draft folder
- stage
- screens included
- interactions included
- QA artifacts under `qa/` when QA was run
- simulated behavior
- known limitations
- what the user should review next if approval is not yet final
- what review-round approval unlocks
- whether phase approval is still needed
- what needs approval before production implementation

The Design Handoff Package should document component identity, interactions,
states, simulated behavior, functional assumptions, implementation priority,
and open questions from the latest creative and/or wireframe revisions.

## Hard Rules

- Do not save draft files before confirming location.
- Keep all draft-related files inside the draft workspace unless the user asks
  for a different layout.
- Do not create one monolithic HTML file for a multi-page or multi-state
  draft; use one HTML file per page, screen, or major state.
- Do not use root-relative paths such as `/index.html`, `/styles.css`, or
  `/assets/logo.png` inside generated static drafts; use document-relative
  paths such as `./index.html`, `./styles.css`, or `./assets/logo.png`.
- Do not mix review drafts into production code unless the user asks.
- Do not open `file://` URLs for browser review; use a local static server
  for generated static drafts.
- Do not end silently with an agent-started static preview server still
  running.
- Do not advance beyond the stated next step for the approved round.
- Do not change approved wireframe structure during visual draft work unless
  the user requests a revision.
- Do not claim simulated behavior is production behavior.
- Do not invent SVG, PNG, ICO, or transparency validation results. Look for an
  available asset or graphics capability when validation matters; if none is
  available, state the limitation and keep the draft at best-effort guidance.
