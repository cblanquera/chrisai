# Brand Visual Guidelines

Use this workflow when the main problem is documenting how a brand should look
and behave visually across touchpoints, especially when colors, typography,
imagery, iconography, layout, or asset usage need guidance.

This workflow produces visual guidelines, not logo generation, final design
production, UI design, design-system extraction, or asset conversion.

## Ownership

This workflow owns:

- visual principles and design implications from strategy
- color, typography, imagery, iconography, and layout guidance
- usage rules for provided brand assets
- accessibility and implementation notes
- visual handoff inputs for design or asset workflows

This workflow does not own:

- logo concepting or generation
- trademark or originality clearance
- UI screen design, wireframes, or design-system extraction
- PNG/ICO/SVG conversion; use the asset-format workflows and scripts

## Workflow

Work through these steps in order:

1. Check existing assets and context.
2. Complete only the missing intake.
3. Separate existing rules from provisional recommendations.
4. Define visual principles.
5. Document system elements.
6. Define usage and accessibility rules.
7. State handoff recommendations.

## Step 1: Check Existing Assets And Context

Look for existing logos, SVGs, PNGs, icons, color tokens, CSS variables, design
systems, screenshots, websites, decks, or brand docs. Do not assume a
particular folder exists.

Inspect available files before making asset-specific claims. Preserve original
assets.

When a local SVG or PNG logo is available, use `scripts/analyze-logo.py` and
`references/logo-analysis.md` to extract objective evidence such as dimensions,
aspect ratio, transparency, dominant colors, SVG viewBox, shape counts, and
gradient usage before documenting visual rules.

## Step 2: Intake

Capture or infer:

- asset state: no assets, logo only, colors/fonts exist, full system exists,
  or rebrand in progress
- target surfaces: website, product UI, docs, social, decks, print, app icon,
  marketplace listing, or packaging
- desired visual posture: premium, technical, editorial, playful, calm, bold,
  institutional, friendly, minimal, expressive, or another direction
- constraints: existing logo, color, font, accessibility, platform, legal,
  stakeholder, or implementation constraints
- output need: quick visual direction, usage rules, implementation notes, or
  full visual guidelines section

When asking, offer options and ask for source assets or screenshots where
available.

## Step 3: Separate Facts From Recommendations

Clearly distinguish:

- existing asset facts
- user-provided preferences
- strategy-derived recommendations
- provisional suggestions that need design review

Do not invent final visual rules when no visual assets or approved strategy
exist. Mark them as direction or placeholders.

## Step 4: Define Visual Principles

Tie visual guidance to strategy:

- what the brand should signal
- what it should avoid
- how it should differ from competitors or category norms
- what trust, energy, clarity, or emotion should look like
- how visual choices should support audience expectations

Use principles as decision rules, not mood-board adjectives.

## Step 5: Document System Elements

Cover only applicable elements:

- logo usage notes for provided assets
- color palette and token suggestions
- typography roles and fallback guidance
- imagery and art direction
- iconography and illustration style
- layout and spacing behavior
- UI/application treatment
- motion or sound guidance when relevant
- asset inventory and required formats

Use `references/master-format-selection.md`, `references/svg-readiness.md`,
and `references/png-transparency-validation.md` when asset quality affects the
guidelines.

## Step 6: Usage And Accessibility Rules

Include:

- do/don't usage examples in text form when no visual artifact is requested
- contrast and legibility notes
- minimum size or spacing rules when known
- background and color-pairing guidance
- export and format notes for implementation
- unresolved visual decisions that need a designer or logo workflow

Do not claim legal protectability, trademark clearance, or logo originality.

## Step 7: Handoff

End with the next useful step:

- use `workflows/brand-kit-generation.md` to package guidelines into a full
  brand kit
- use the asset-format workflows for transparent PNG, SVG readiness, or
  PNG/ICO conversion
- use a design workflow when the user needs rendered examples, UI surfaces, or
  reviewable visual artifacts
- use `workflows/logo-generation.md` when the brand mark itself needs to be
  created, revised, or made favicon-safe
