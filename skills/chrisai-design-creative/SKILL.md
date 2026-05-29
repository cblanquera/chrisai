---
name: chrisai-design-creative
description: Use when Codex needs to coordinate brand-led creative direction for sites, apps, docs, landing pages, or related product surfaces by selecting the design mode, analyzing the logo, optional brand guide, design source of truth, reference sites or apps, usability constraints, and differentiation, then handing off to extraction, wireframe, draft, asset, or implementation specialists as needed.
---

# ChrisAI Design Creative

Use this skill when the main problem is coordinated design direction grounded
in brand evidence, existing design sources, reference examples, usability, and
differentiation.

This skill is the coordinator for the ChrisAI design category. Use narrower
design specialists when the task is mainly extraction, wireframing, static
drafting, logo generation, or asset-format production.

Do not start from mood words alone. Derive the design direction from the task
mode, logo, optional brand style guide, existing design source of truth,
reference-site commonalities, reference-site differences, usability constraints,
and one deliberate differentiation choice.

## Ownership

This skill owns:

- brand-led creative direction selection and refinement
- visual-system definition
- homepage and landing-page composition
- design-mode selection and specialist handoff
- adaptation of existing logos, icons, screenshots, and brand assets
- reference-site or reference-app synthesis
- implementation-ready design handoff
- visual review before a direction is treated as stable

This skill does not own:

- repo layout or build decisions
- detailed extraction of existing design systems
- grayscale wireframe artifact creation
- static HTML/CSS/JS draft artifact creation
- production implementation of HTML, CSS, or JavaScript
- browser QA or screenshot capture
- generic product UX strategy or application flow design
- SVG, PNG, or ICO asset conversion and favicon packaging

Use a repo-specific implementation or documentation skill when the task also
needs site architecture, publishing layout, migration policy, or build
decisions.

Use [`chrisai-design-system-extraction`](../chrisai-design-system-extraction/SKILL.md)
when the work is mainly about inspecting an existing app, site, design system,
Figma file, screenshot set, exported design file, or local component source to
extract design rules.

Use [`chrisai-design-wireframes`](../chrisai-design-wireframes/SKILL.md) when
the work is mainly about grayscale wireframes or clickable grayscale
wireframes.

Use [`chrisai-design-drafts`](../chrisai-design-drafts/SKILL.md) when the work
is mainly about static HTML/CSS/JS design-review artifacts or clickable
creative design drafts.

Use [`chrisai-coding-html-css`](../chrisai-coding-html-css/SKILL.md) when the
work moves from design drafts into production HTML and CSS implementation.

Use [`chrisai-design-logo-generator`](../chrisai-design-logo-generator/SKILL.md)
when the work moves from creative direction into logo concept generation or
logo mark refinement.

Use [`chrisai-design-asset-formats`](../chrisai-design-asset-formats/SKILL.md)
when the work needs SVG, PNG, or ICO asset creation, conversion, transparency
validation, favicon packaging, or temporary SVG prompt artifacts for graphic
design support.

Use [`chrisai-qa-playwright`](../chrisai-qa-playwright/SKILL.md) when the task
is mainly about rendered QA, screenshots, or responsive browser checks.

When QA is used for a design draft or clickable wireframe, keep QA screenshots,
recordings, and notes inside the same draft workspace under `qa/`.

## Workflow

Work through these steps in order:

1. Classify the deliverable.
2. Select the design mode.
3. Collect brand or design-source inputs.
4. Analyze the logo, brand guide, or existing design source of truth.
5. Ask for and analyze 3-5 reference sites or apps when the mode needs them.
6. Extract commonalities and differences.
7. Apply usability constraints.
8. Define differentiation or extension rules.
9. Define the visual system or wireframe system.
10. Produce the handoff or draft artifact plan.
11. Run a visual review gate.

Do not jump into implementation details before the creative direction is clear.

## Step 1: Classify The Deliverable

Start by identifying what is being shaped right now.

Current primary deliverables:

- static site homepage
- documentation homepage
- docs-site visual system
- landing page for a developer-facing product or tool
- app page or screen extension
- grayscale wireframe draft
- clickable static design-review draft

Future-compatible deliverables:

- homepage layout studies
- concept explorations for documentation surfaces

If the task is mainly about repo shape, docs information architecture, or build
workflow, hand off to another skill instead of stretching this one.

## Step 2: Select The Design Mode

Classify the work before collecting inputs. Use
[design-modes](references/design-modes.md) when the task involves existing
designs, wireframes, clickable drafts, or static prototype artifacts.

Supported modes:

- greenfield design direction
- existing design extension: hand off to `chrisai-design-system-extraction`
- grayscale wireframe draft: hand off to `chrisai-design-wireframes`
- clickable grayscale wireframe draft: hand off to `chrisai-design-wireframes`
- creative design draft from an approved wireframe: hand off to
  `chrisai-design-drafts`
- clickable creative design draft: hand off to `chrisai-design-drafts`
- implementation-ready design handoff

For draft artifacts, ask whether the user wants to save the drafts in the
project. If yes, ask where to save them before handing off. Draft artifact
creation itself belongs to `chrisai-design-drafts`.

## Step 3: Collect Brand Or Design-Source Inputs

Start with the strongest available brand source.

For greenfield design, required:

- logo or brand mark

Ask for if available:

- brand style guide
- existing product screenshots
- existing marketing pages
- existing app or website
- reusable icons, illustrations, photos, patterns, fonts, or color tokens
- whether the site needs light mode, dark mode, or both
- the homepage or page role

For existing design extension, ask for the design source of truth:

- deployed site or app URL
- Figma file, design system, or component library
- Canva project or exported assets
- PSD, AI, SVG, PDF, PNG, JPG, or screenshot files
- local project files that contain theme tokens or UI components
- brand style guide or design-system documentation

If a brand style guide exists, treat it as the highest authority after explicit
user direction. If no style guide exists, derive the starting visual system from
the logo.

For existing designs, treat submitted design artifacts as law unless the user
explicitly asks for a redesign.

Use [brand-led-discovery](references/brand-led-discovery.md) for the detailed
intake and analysis checklist.

Use [existing-design-sources](references/existing-design-sources.md) when the
user provides an existing site, deployed app, Figma source, design files,
screenshots, or local project design system.

If detailed extraction is required, hand off to
[`chrisai-design-system-extraction`](../chrisai-design-system-extraction/SKILL.md).

## Step 4: Analyze The Logo, Brand Guide, Or Existing Design Source

Analyze the logo as the brand anchor. Capture:

- primary colors, secondary colors, and implied neutrals
- contrast behavior and likely accessibility risks
- flat, gradient, transparent, or image-heavy treatment
- sharp, rounded, geometric, organic, dense, or sparse shape language
- symmetry, balance, and symbol meaning
- industry cues and personality signals
- visual motifs that could inform UI details or section treatments

If a style guide exists, extract approved colors, typography rules, logo usage
rules, image style, voice, accessibility constraints, and forbidden treatments.

Do not invent a visual direction that conflicts with the style guide unless the
user explicitly asks for a departure.

For existing design extension, identify the existing rules before proposing any
new screen or page:

- common interfaces and components
- colors and state colors
- typography and font scale
- spacing, padding, and layout rhythm
- grid, card, table, form, and navigation patterns
- border radius, shadows, dividers, and surface treatments
- icon, illustration, and image treatments
- empty, loading, error, and success states when visible

Apply the source-of-truth priority order from
[existing-design-sources](references/existing-design-sources.md).

If those rules are not already known, hand off to
`chrisai-design-system-extraction` before continuing.

If the user provides files or URLs and analysis scripts exist, use them only to
extract objective evidence. The agent still owns interpretation and final
creative judgment. See [evidence-scripts](references/evidence-scripts.md).

Use `scripts/analyze-logo.py` when the user provides a local SVG or PNG logo
and a basic file, color, transparency, or shape-evidence summary would help.

## Step 5: Ask For And Analyze Reference Sites Or Apps

Ask the user for 3-5 reference websites or apps when the mode needs external
calibration and they have not already provided examples.

In greenfield mode, references are normally useful. In existing-design
extension mode, references are secondary to the design source of truth and
should only influence areas not already governed by the existing design.

For each reference, clarify what the reference means:

- visual style
- layout structure
- onboarding or user flow
- dashboard or content density
- interaction pattern
- something common in the category that should be avoided

Treat references as evidence, not templates to copy.

If a reference is only for build structure, do not inherit its visual language.

## Step 6: Extract Commonalities And Differences

Find what the references share. Commonalities can reveal category expectations
that users already understand, such as navigation placement, hero composition,
CTA behavior, dashboard density, onboarding structure, screenshot treatment,
trust signals, or content hierarchy.

Find what the references do differently. Differences are useful when the user
has taste preferences, when multiple valid UX patterns exist, or when the agent
needs to ask a focused design-choice question.

When differences imply a meaningful tradeoff, ask the user to choose before
locking the direction.

Example:

```markdown
The references split into two dashboard styles:

1. Dense operational dashboard
   Better for repeated expert use.

2. Guided overview dashboard
   Better for first-time users and onboarding.

Which direction fits the audience better?
```

## Step 7: Apply Usability Constraints

Use "Don't Make Me Think" as the usability posture: the next action should be
obvious, navigation should be plain, and visual novelty should not hide
function.

Check that:

- each page has one clear primary job
- the next action is obvious
- navigation labels are plain
- users do not need to interpret decoration to proceed
- forms and repeated controls behave predictably
- onboarding is short and direct
- visual hierarchy supports scanning
- category conventions are preserved when they reduce cognitive load

The design should feel distinct, but never cryptic.

## Step 8: Define Differentiation Or Extension Rules

For greenfield design, define what will make this design distinct after the
brand analysis, reference analysis, and usability checks are clear.

Good differentiation can come from:

- the logo's shape language
- a unique brand color behavior
- a signature layout motif
- a distinctive screenshot or product-demo treatment
- a better onboarding pattern than the references
- a simpler version of a common category flow
- clearer hierarchy than comparable sites
- a memorable but still usable visual system

Avoid differentiation that only means making the page louder.

For existing design extension, define extension rules instead of new creative
direction. The new page or screen should feel native to the existing product
unless the user explicitly requests a redesign.

## Step 9: Define The Visual Direction Or Wireframe System

For wireframe modes, stay grayscale and avoid graphics, brand color, gradients,
decorative imagery, and polished visual design. Focus on layout, sections,
information hierarchy, user flow, density, and interaction targets.

Detailed wireframe drafting belongs to
[`chrisai-design-wireframes`](../chrisai-design-wireframes/SKILL.md).

For creative design modes, apply the approved wireframe and the approved
visual direction. Do not redesign the layout after wireframe approval unless
the user asks for a revision.

Static design-review draft artifacts belong to
[`chrisai-design-drafts`](../chrisai-design-drafts/SKILL.md).

Pick one strong direction that fits the local assets and content instead of
averaging multiple styles together.

Use [site-direction-playbooks](references/site-direction-playbooks.md) when the
direction is still open or needs clearer naming.

Treat named directions as working design archetypes, not fixed industry
taxonomy. Labels such as `Editorial`, `Product-Doc Hybrid`, or future app-heavy
handles like `Knowledge Console` are shorthand for a coherent mix of tone,
layout behavior, hierarchy, and surface treatment.

The names themselves are not the deliverable. They are internal handles that
help the agent and user discuss a concrete direction without falling back to
vague prompts like "make it modern."

If the task benefits from app- or interface-oriented framing, it is valid to
name a custom direction archetype for the conversation as long as you explain
what that archetype means in behavioral terms. Do not present such labels as
canonical design categories unless they are already established in the local
team or source material.

Prefer a direction that:

- matches the local brand signals
- supports the page's real role
- respects style-guide constraints when present
- accounts for reference commonalities and differences
- can scale from homepage to article or documentation pages
- avoids generic docs-site styling when a stronger identity is justified

Turn the chosen direction into concrete guidance for:

- color behavior
- background treatment
- typography direction
- layout density
- navigation character
- hero structure
- reading-surface calmness on article pages
- treatment of code blocks and screenshots

Use [homepage-patterns](references/homepage-patterns.md) when the homepage role
needs more specific composition guidance.

Keep article and reference pages calmer than the homepage unless the user
explicitly wants a louder system everywhere.

When the design needs new graphics, icons, favicons, raster cutouts, SVGs, PNGs,
or temporary prompt artifacts, use
[`chrisai-design-asset-formats`](../chrisai-design-asset-formats/SKILL.md).

## Step 10: Produce The Handoff Or Draft Artifact Plan

When handing off to implementation, define:

- the design concept in one sentence
- the brand interpretation
- any style-guide constraints
- reference commonalities
- reference differences
- user choices still needed
- the intended homepage or page role
- the visual tone
- the major layout motifs
- the color strategy
- the typography strategy
- the key constraints from brand assets or existing UI
- the differentiation strategy
- anti-copy constraints from references
- any elements that must stay restrained for readability

Do not hand off vague directions like "make it modern" or "make it pop."

For static HTML/CSS/JS draft artifacts, state clearly that the artifact is a
draft for design review, not production implementation. Before writing files,
confirm whether the user wants the draft saved in the project and where it
should be saved, then hand off to `chrisai-design-drafts`. Create a new folder
per draft in that specialist workflow.

Draft stages should normally proceed in this order:

1. grayscale wireframe draft
2. clickable grayscale wireframe draft
3. creative design draft based on approved wireframe
4. clickable creative design draft

## Step 11: Run A Visual Review Gate

Before considering the direction stable, run the checks in
[visual-review](references/visual-review.md).

If the direction passes only on the homepage but breaks down on reading
surfaces or code-heavy pages, it is not stable yet.

## Future Wireframes

This skill should stay ready to grow into wireframing work without changing its
top-level identity.

Use [future-wireframes](references/future-wireframes.md) when a request starts
to move from visual direction into layout studies or low-fidelity structure.
