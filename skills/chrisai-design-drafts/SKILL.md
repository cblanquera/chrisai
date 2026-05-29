---
name: chrisai-design-drafts
description: Use when Codex needs static HTML/CSS/JS design-review drafts, clickable creative design drafts, or polished visual mockup artifacts based on an approved wireframe, brand direction, or existing design source of truth.
---

# ChrisAI Design Drafts

Use this skill when the main problem is creating reviewable static design
artifacts after structure and design direction are known.

Drafts are temporary review artifacts. They are not production implementation.

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
6. produce a handoff

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
- use semantic HTML where practical
- use CSS variables for draft-level colors, type, spacing, and surfaces
- avoid production build tooling unless the project already requires it
- mark interactions as simulated where appropriate
- do not wire real persistence, authentication, billing, or backend behavior

For clickable drafts, include only interactions needed to review navigation,
flow, or state intent.

Use [draft-artifact-rules](references/draft-artifact-rules.md) for artifact
boundaries.

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

When using [`chrisai-qa-playwright`](../chrisai-qa-playwright/SKILL.md), keep
screenshots, recordings, and QA notes inside the same draft workspace under
`qa/`. Do not scatter design-draft QA artifacts into a separate Playwright
workspace unless the user explicitly asks for that.

## Step 6: Produce The Handoff

State:

- draft folder
- stage
- screens included
- interactions included
- QA artifacts under `qa/` when QA was run
- simulated behavior
- known limitations
- what needs approval before production implementation

## Hard Rules

- Do not save draft files before confirming location.
- Keep all draft-related files inside the draft workspace unless the user asks
  for a different layout.
- Do not mix review drafts into production code unless the user asks.
- Do not change approved wireframe structure during visual draft work unless
  the user requests a revision.
- Do not claim simulated behavior is production behavior.
- Do not duplicate SVG, PNG, ICO, or transparency validation logic; use
  `chrisai-design-asset-formats`.
