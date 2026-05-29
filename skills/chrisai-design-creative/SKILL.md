---
name: chrisai-design-creative
description: Use when Codex needs creative design direction for static sites, documentation sites, or related brand-led surfaces, especially to define a visual concept, adapt assets, shape homepage composition, and produce implementation-ready visual guidance with future room for wireframing work.
---

# ChrisAI Design Creative

Use this skill when the main problem is creative direction.

This skill is the start of a separate design category. Its current strongest
use case is static sites and documentation sites, but it should stay compatible
with future design artifacts such as wireframes.

## Ownership

This skill owns:

- creative direction selection and refinement
- visual-system definition
- homepage and landing-page composition
- adaptation of existing logos, icons, screenshots, and brand assets
- implementation-ready design handoff
- visual review before a direction is treated as stable

This skill does not own:

- repo layout or build decisions
- implementation of HTML, CSS, or JavaScript
- browser QA or screenshot capture
- generic product UX strategy or application flow design
- SVG, PNG, or ICO asset conversion and favicon packaging

Use a repo-specific implementation or documentation skill when the task also
needs site architecture, publishing layout, migration policy, or build
decisions.

Use [`chrisai-coding-html-css`](../chrisai-coding-html-css/SKILL.md) when the
work moves from creative direction into HTML and CSS implementation.

Use [`chrisai-design-logo-generator`](../chrisai-design-logo-generator/SKILL.md)
when the work moves from creative direction into logo concept generation or
logo mark refinement.

Use [`chrisai-design-asset-formats`](../chrisai-design-asset-formats/SKILL.md)
when the work moves from creative direction into SVG, PNG, or ICO asset
creation, conversion, transparency validation, or favicon packaging.

Use [`chrisai-qa-playwright`](../chrisai-qa-playwright/SKILL.md) when the task
is mainly about rendered QA, screenshots, or responsive browser checks.

## Workflow

Work through these steps in order:

1. Classify the deliverable.
2. Audit available assets and constraints.
3. Choose or refine a creative direction.
4. Define the visual system.
5. Produce an implementation handoff.
6. Run a visual review gate.

Do not jump into implementation details before the creative direction is clear.

## Step 1: Classify The Deliverable

Start by identifying what is being shaped right now.

Current primary deliverables:

- static site homepage
- documentation homepage
- docs-site visual system
- landing page for a developer-facing product or tool

Future-compatible deliverables:

- low-fidelity wireframes
- homepage layout studies
- concept explorations for documentation surfaces

If the task is mainly about repo shape, docs information architecture, or build
workflow, hand off to another skill instead of stretching this one.

## Step 2: Audit Assets And Constraints

Before choosing a direction, identify:

1. the available logos, icons, screenshots, diagrams, and reusable images
2. whether the site needs light mode, dark mode, or both
3. the homepage role
4. any constraints from an existing brand, product UI, or design system
5. whether a reference is visual, structural, or both

If a reference is only for build structure, do not inherit its visual language.

## Step 3: Choose Or Refine A Creative Direction

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
- can scale from homepage to article or documentation pages
- avoids generic docs-site styling when a stronger identity is justified

## Step 4: Define The Visual System

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

## Step 5: Produce An Implementation Handoff

When handing off to implementation, define:

- the design concept in one sentence
- the intended homepage or page role
- the visual tone
- the major layout motifs
- the color strategy
- the typography strategy
- the key constraints from brand assets or existing UI
- any elements that must stay restrained for readability

Do not hand off vague directions like "make it modern" or "make it pop."

## Step 6: Run A Visual Review Gate

Before considering the direction stable, run the checks in
[visual-review](references/visual-review.md).

If the direction passes only on the homepage but breaks down on reading
surfaces or code-heavy pages, it is not stable yet.

## Future Wireframes

This skill should stay ready to grow into wireframing work without changing its
top-level identity.

Use [future-wireframes](references/future-wireframes.md) when a request starts
to move from visual direction into layout studies or low-fidelity structure.
