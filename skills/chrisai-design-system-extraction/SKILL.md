---
name: chrisai-design-system-extraction
description: Use when Codex needs to inspect an existing app, site, Figma file, design system, component library, screenshots, exported design files, or local project theme source to extract the design source of truth before extending an existing product design.
---

# ChrisAI Design System Extraction

Use this skill when the main problem is understanding an existing design before
adding or revising a page, screen, flow, or component.

This skill turns a design source of truth into concrete rules that another
design or implementation skill can follow.

## Portability

Write extraction guidance for portable agent use first. Do not assume the
consumer is Codex-only. Use Codex-specific, Claude-specific, or OpenCode-specific
notes only when the behavior actually differs.

## Ownership

This skill owns:

- design source-of-truth intake
- existing app, site, or design-file analysis
- extraction of colors, typography, spacing, layout, components, and states
- format-specific guidance for Figma, Canva, PSD, AI, PDFs, screenshots, and
  local project files
- source-of-truth priority decisions when inputs conflict
- design-extension rule summaries

This skill does not own:

- new creative direction for greenfield products
- wireframe drafting
- clickable prototype creation
- production frontend implementation
- SVG, PNG, or ICO asset conversion

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
task needs coordinated creative direction or a final visual-system handoff.

Use [`chrisai-design-wireframes`](../chrisai-design-wireframes/SKILL.md) when
the next step is grayscale layout exploration.

Use [`chrisai-design-drafts`](../chrisai-design-drafts/SKILL.md) when the next
step is a static HTML/CSS/JS review artifact.

## Workflow

Work through these steps in order:

1. identify the design source of truth
2. confirm readable formats and request exports when needed
3. extract design rules
4. resolve conflicts by priority order
5. produce an extension-rule handoff

Do not design the new page before stating the existing rules it must obey.

## Step 1: Identify The Design Source Of Truth

Ask what authoritative source exists:

- deployed site or app URL
- Figma file or design system
- local component library
- local app source with theme tokens
- Storybook or component docs
- Canva project or exports
- PSD, AI, SVG, PDF, PNG, JPG, or screenshot files
- brand style guide

Use "design source of truth" as the term for the authoritative material.

## Step 2: Confirm Readable Formats

Prefer sources that can be inspected directly:

- local project files
- deployed pages that can be captured
- exported PNG, SVG, PDF, or screenshots
- design tokens or CSS variables
- Figma files when access is available

If a source cannot be read directly, ask the user to export it to a digestible
format such as PNG, SVG, PDF, screenshots, design tokens, or CSS variables.

Do not pretend native AI or PSD extraction is reliable without available
tooling. Ask for exports when needed.

## Step 3: Extract Design Rules

Extract:

- colors and state colors
- typography and font scale
- spacing, padding, margins, and rhythm
- grid and page layout patterns
- common components and interface patterns
- cards, tables, forms, navigation, and modals
- borders, radius, shadows, dividers, and surface treatments
- icons, illustrations, images, and empty states
- loading, error, success, warning, and disabled states
- responsive behavior when visible

Use [source-formats](references/source-formats.md) for format-specific
handling.

Use [extraction-report](references/extraction-report.md) for the handoff shape.

## Step 4: Resolve Conflicts

When sources disagree, use this priority order:

1. explicit user instruction
2. brand or design-system source of truth
3. existing deployed product
4. existing code tokens and components
5. screenshots or exported design files
6. reference sites or apps
7. agent judgment

Do not let external references override the existing product language unless
the user explicitly asks for a redesign.

## Step 5: Produce The Extension-Rule Handoff

Before handing off, state:

- sources inspected
- sources that could not be inspected
- extracted colors, type, spacing, layout, and component rules
- visible responsive behavior
- missing states or unknowns
- explicit constraints for the new page or screen
- open questions that block a faithful extension

If a new requirement does not fit the existing design system, call out the gap
and ask whether to extend the system or keep the new feature visually
conservative.

## Evidence Scripts

Use scripts only to extract objective evidence. Scripts should not decide the
final design.

Use bundled scripts when they apply:

- `capture-existing-site`
- `scan-project-design-system`

Planned future scripts:

- `extract-figma-file`
- `inspect-design-images`
- `inspect-psd`
- `inspect-ai-or-pdf`

If a script is unavailable, perform the analysis manually from the available
sources and clearly mark uncertainty.

`capture-existing-site` requires a Playwright-capable Node environment. If
Playwright is unavailable, ask whether to install or use the QA/browser tooling
already available in the project.
