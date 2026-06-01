---
name: chrisai-design-drafts
description: Use when an agent needs static HTML/CSS/JS design-review drafts, clickable creative design drafts, or polished visual mockup artifacts based on an approved wireframe, brand direction, or existing design source of truth.
---

# ChrisAI Design Drafts

Use this skill when the main problem is creating reviewable static design
artifacts after structure and design direction are known.

Drafts are temporary review artifacts. They are not production implementation.

Use
[`chrisai-process-feedback-loop`](../chrisai-process-feedback-loop/SKILL.md)
for shared review-loop rules, including round approval, phase approval,
next-step language, and artifact folder behavior.

## Portability

Write draft guidance for portable agent use first. Do not assume the consumer
is Codex-only. Use Codex-specific, Claude-specific, or OpenCode-specific notes
only when the behavior actually differs.

## Ownership

This skill owns:

- static HTML/CSS/JS design-review artifacts
- clickable creative design drafts
- visual application of approved wireframes
- consolidated draft workspace folder structure
- draft-stage labeling and review handoff

This skill does not own:

- design source-of-truth extraction
- low-fidelity wireframe exploration
- final production frontend implementation
- browser QA for production behavior
- SVG, PNG, or ICO asset conversion

Use [`chrisai-design-wireframes`](../chrisai-design-wireframes/SKILL.md) when
the layout or flow is not approved yet.

Use [`chrisai-design-system-extraction`](../chrisai-design-system-extraction/SKILL.md)
when the draft must match an existing product and the design rules are not yet
known.

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
visual direction is still unresolved.

Use [`chrisai-design-asset-formats`](../chrisai-design-asset-formats/SKILL.md)
when the draft needs new SVG, PNG, ICO, transparent, or favicon-ready assets.

Use [`chrisai-coding-html-css`](../chrisai-coding-html-css/SKILL.md) when the
work moves from draft artifact into production HTML and CSS.

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

## Step 1: Confirm The Draft Stage

Supported stages:

- clickable grayscale wireframe draft
- creative design draft from approved wireframe
- clickable creative design draft

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

Create one new folder per draft. That folder is the consolidated workspace for
the draft, including source files, draft-only assets, QA screenshots, QA notes,
recordings, and review metadata.

Keep review artifacts separate from production app code unless the user
explicitly requests otherwise.

## Step 3: Create The Static Draft

Static HTML/CSS/JS is acceptable for design review.

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
relative links between HTML files so the folder can be reviewed without a
build step.

For clickable drafts, include only interactions needed to review navigation,
flow, or state intent.

Use [draft-artifact-rules](references/draft-artifact-rules.md) for artifact
boundaries.

Follow the artifact rules in
[`browser-feedback-loop`](../chrisai-process-feedback-loop/references/browser-feedback-loop.md):
major round changes create a new folder; minor changes inside the same review
round may update the current folder.

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
- generated assets were validated by the asset-format skill when needed

Use browser QA tooling when a rendered screenshot or interaction check is
needed.

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

When using [`chrisai-qa-playwright`](../chrisai-qa-playwright/SKILL.md), keep
screenshots, recordings, and QA notes inside the same draft workspace under
`qa/`. Do not scatter design-draft QA artifacts into a separate Playwright
workspace unless the user explicitly asks for that.

## Step 6: Present Review Instructions And Next Steps

After each review round, state:

- what changed in this round
- which folder contains the current draft
- what the user should review now, phrased as specific questions
- what is clickable
- what is simulated
- what feedback would be most useful
- the next step if this round is approved
- whether more rounds remain before the next phase
- the next step if revisions are needed

For creative design drafts, ask the user to review visual fit, hierarchy,
brand/style-guide alignment, component treatment, density, and missing states.
Phrase those review items as concrete questions tied to what changed in the
current round.

For clickable creative drafts, also ask the user to test the intended flow and
confirm whether simulated interactions communicate the behavior clearly.

Use direct review prompts such as:

```markdown
What to review for this round:

- Does the visual treatment match the approved brand direction?
- Does the hierarchy make the primary action obvious?
- Do the card, form, and navigation treatments feel consistent with the
  existing design rules?
- Are any important states missing before this becomes clickable?
- Do the simulated interactions communicate the intended flow clearly?

If this round is approved, the next step is to apply this treatment to the
remaining draft screens. If not, tell me which visual decisions or states to
revise.
```

Do not move from creative design draft to clickable creative draft, or from
clickable draft to production implementation, unless that was the exact next
step stated for the approved round and the current phase scope is complete.

## Step 7: Produce The Handoff

State:

- draft folder
- stage
- screens included
- interactions included
- QA artifacts under `qa/` when QA was run
- simulated behavior
- known limitations
- what the user should review next if approval is not yet final
- what round approval unlocks
- whether phase approval is still needed
- what needs approval before production implementation

## Hard Rules

- Do not save draft files before confirming location.
- Keep all draft-related files inside the draft workspace unless the user asks
  for a different layout.
- Do not create one monolithic HTML file for a multi-page or multi-state
  draft; use one HTML file per page, screen, or major state.
- Do not mix review drafts into production code unless the user asks.
- Do not open `file://` URLs for browser review; use a local static server
  for generated static drafts.
- Do not end silently with an agent-started static preview server still
  running.
- Do not advance beyond the stated next step for the approved round.
- Do not change approved wireframe structure during visual draft work unless
  the user requests a revision.
- Do not claim simulated behavior is production behavior.
- Do not duplicate SVG, PNG, ICO, or transparency validation logic; use
  `chrisai-design-asset-formats`.
