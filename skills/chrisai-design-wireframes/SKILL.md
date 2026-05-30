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
5. produce a complete grayscale wireframe set
6. present review instructions and next steps
7. create a clickable wireframe only when needed
8. produce a wireframe handoff

Do not apply brand color, gradients, decorative graphics, or polished visual
styling before the wireframe is approved.

Do not move to creative design until the full wireframe scope is represented
and approved. A single partial screen is not enough unless the requested scope
is only that screen.

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

For each option or round, tell the user what to review:

- page or screen purpose
- section order
- hierarchy and scan path
- primary and secondary actions
- navigation or flow behavior
- missing sections, states, or screens
- desktop and mobile assumptions when relevant

Also tell the user what happens next after review.

## Step 4: Choose Or Revise One Structure

Before moving to visual design, confirm:

- primary action is obvious
- content order supports the user goal
- navigation or flow is understandable
- repeated regions are consistent
- mobile and desktop constraints are plausible
- unresolved choices are named

Do not proceed to polished design if the user has not accepted the structure.

## Step 5: Produce A Complete Grayscale Wireframe Set

Before creative design, cover the full requested scope:

- all requested pages or screens
- required sections on each page
- primary states needed for review
- key empty, loading, error, or success states when they affect layout
- key responsive variants when mobile or desktop behavior changes materially
- navigation or flow links between screens

If scope is too large for one round, split it into named rounds and explain
which screens or states are covered in the current round and which remain.

Do not call the wireframe complete until the user can review the whole
structure needed before visual design.

## Step 6: Present Review Instructions And Next Steps

After each review round, state:

- what changed in this round
- which folder contains the current draft when files were created
- what the user should review now
- what feedback would be most useful
- the next step if approved
- the next step if revisions are needed

Use direct review prompts such as:

```markdown
Please review:

- section order
- whether the primary action is obvious
- missing screens or states
- whether the density feels right

If this structure is approved, the next step is a clickable grayscale
wireframe. If not, tell me which sections or flow points to change.
```

## Step 7: Create A Clickable Wireframe When Needed

Use static HTML/CSS/JS only as a review artifact.

Before writing files:

- ask whether the user wants the draft saved in the project
- ask where the draft workspace should live
- keep draft files separate from production code unless requested

The draft folder is the consolidated workspace for the clickable wireframe.
Keep static files, draft-only assets, QA screenshots, QA notes, recordings, and
review metadata inside that folder. If `chrisai-qa-playwright` is used, save
its artifacts under the draft folder's `qa/` directory.

Create a new folder for every major wireframe round or major structure change.
Major changes include new layout directions, changed navigation models, added
screens, removed screens, or substantial section reordering.

For minor changes in the same review round, it is acceptable to update the same
folder. Minor changes include copy labels, small spacing adjustments, local
section tweaks, and small control-state clarifications.

Clickable wireframes may include simple links, tabs, toggles, and state changes
that demonstrate navigation or flow intent.

## Step 8: Produce The Wireframe Handoff

State:

- selected structure
- page or screen purpose
- section order
- navigation or flow behavior
- primary and secondary actions
- full scope covered
- any screens or states intentionally deferred
- responsive assumptions
- draft workspace and `qa/` artifacts when a clickable draft was created
- unresolved questions
- constraints for the creative design draft
- next step after approval

## Review Gate

Before treating the wireframe as ready:

- Is it grayscale and low-fidelity?
- Does it cover the full requested scope?
- Have any missing screens, states, or responsive variants been named?
- Is the next action obvious?
- Does each page or screen have one clear primary job?
- Are labels understandable without decoration?
- Does the layout support scanning?
- Is clickable behavior clearly review-only?
- Did the final response tell the user what to review and what happens next?
