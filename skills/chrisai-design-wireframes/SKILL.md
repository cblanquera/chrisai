---
name: chrisai-design-wireframes
description: Use when an agent needs grayscale low-fidelity wireframes or clickable grayscale wireframe drafts for sites, apps, docs, landing pages, or product screens before creative visual design is approved.
---

# ChrisAI Design Wireframes

Use this skill when the main problem is structure, layout, hierarchy, or flow
before polished visual design.

Wireframes are design-review drafts. They are not production implementation.

## Portability

Write wireframe guidance for portable agent use first. Do not assume the
consumer is Codex-only. Use Codex-specific, Claude-specific, or OpenCode-specific
notes only when the behavior actually differs.

## Ownership

This skill owns:

- grayscale low-fidelity wireframe direction
- section and screen layout exploration
- clickable grayscale wireframe drafts for review
- layout-option comparison
- handoff from approved wireframe to creative design

This skill does not own:

- brand-led color, typography, or final surface styling
- extraction of an existing design source of truth
- final creative design drafts
- production frontend implementation
- browser QA for rendered production pages

Use [`chrisai-design-system-extraction`](../chrisai-design-system-extraction/SKILL.md)
first when the wireframe must extend an existing product design.

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
wireframe needs broader creative-direction coordination.

Use [`chrisai-design-drafts`](../chrisai-design-drafts/SKILL.md) when the user
wants a polished static design-review draft after the wireframe is approved.

## Workflow

Work through these steps in order:

1. classify the wireframe scope
2. collect required structure inputs
3. draft grayscale layout options
4. choose or revise one structure
5. create a clickable wireframe only when needed
6. produce a wireframe handoff

Do not apply brand color, gradients, decorative graphics, or polished visual
styling before the wireframe is approved.

## Step 1: Classify The Scope

Identify what is being structured:

- homepage
- landing page
- documentation surface
- app page or screen
- multi-screen flow
- modal, drawer, or focused workflow

If the task is a complex product UX architecture problem, state the boundary
and keep this skill focused on the requested screens or flow.

## Step 2: Collect Structure Inputs

Collect:

- target audience
- primary user goal
- required sections or content
- required actions
- known navigation or flow constraints
- existing design-extension rules when applicable
- device targets
- whether a clickable wireframe is needed

Ask only for missing inputs that materially affect structure.

## Step 3: Draft Grayscale Layout Options

Wireframe rules:

- grayscale only
- no brand color
- no gradients
- no photos or illustrations
- no polished surface styling
- realistic labels where they clarify structure
- stable dimensions for repeated controls and layout regions
- clear hierarchy and scan path

Prefer 1 to 3 layout options when the structure is unresolved. Compare options
by user task, density, complexity, and risk.

Use [wireframe-patterns](references/wireframe-patterns.md) for common layout
patterns.

## Step 4: Choose Or Revise One Structure

Before moving to visual design, confirm:

- primary action is obvious
- content order supports the user goal
- navigation or flow is understandable
- repeated regions are consistent
- mobile and desktop constraints are plausible
- unresolved choices are named

Do not proceed to polished design if the user has not accepted the structure.

## Step 5: Create A Clickable Wireframe When Needed

Use static HTML/CSS/JS only as a review artifact.

Before writing files:

- ask whether the user wants the draft saved in the project
- ask where the draft workspace should live
- create a new folder for the draft
- keep draft files separate from production code unless requested

The draft folder is the consolidated workspace for the clickable wireframe.
Keep static files, draft-only assets, QA screenshots, QA notes, recordings, and
review metadata inside that folder. If `chrisai-qa-playwright` is used, save
its artifacts under the draft folder's `qa/` directory.

Clickable wireframes may include simple links, tabs, toggles, and state changes
that demonstrate navigation or flow intent.

## Step 6: Produce The Wireframe Handoff

State:

- selected structure
- page or screen purpose
- section order
- navigation or flow behavior
- primary and secondary actions
- responsive assumptions
- draft workspace and `qa/` artifacts when a clickable draft was created
- unresolved questions
- constraints for the creative design draft

## Review Gate

Before treating the wireframe as ready:

- Is it grayscale and low-fidelity?
- Is the next action obvious?
- Does each page or screen have one clear primary job?
- Are labels understandable without decoration?
- Does the layout support scanning?
- Is clickable behavior clearly review-only?
