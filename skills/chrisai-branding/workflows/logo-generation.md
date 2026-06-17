# Logo Generation

Use this workflow when the main problem is creating, refining, or iterating on
a logo mark, wordmark, monogram, combination mark, app icon, or favicon-safe
brand mark.

This workflow produces logo concepts and selected logo directions. It does not
produce full brand strategy, competitor research, full visual guidelines,
generic UI design, asset conversion packages, or legal/trademark clearance.

## Ownership

This workflow owns:

- logo-specific intake
- concept direction selection
- SVG-first logo mark generation
- wordmark, monogram, symbol, and combination-mark decisions
- variant comparison and refinement
- favicon-safe simplification
- logo review gates and handoff recommendations

This workflow does not own:

- brand research; use `workflows/brand-research.md`
- brand strategy; use `workflows/brand-strategy.md`
- visual guideline documentation; use `workflows/brand-visual-guidelines.md`
- full brand kit assembly; use `workflows/brand-kit-generation.md`
- transparent PNG, ICO, or favicon packaging
- trademark search, originality guarantee, or legal clearance

## Workflow

Work through these steps in order:

1. Check existing context and assets.
2. Complete only the missing logo intake.
3. Choose concept methods.
4. Generate distinct SVG-first variants.
5. Preview SVG drafts when possible.
6. Compare and select a direction.
7. Refine the selected direction.
8. Create a favicon-safe variant when needed.
9. Hand off to visual guidelines or asset formats.

Do not jump straight to polishing one mark before the direction space is
clear.

## Step 1: Check Existing Context And Assets

Look for existing strategy, messaging, visual guidelines, logos, SVGs, PNGs,
icons, colors, typography, websites, app screenshots, decks, or brand docs. Do
not assume a particular folder exists.

Use existing approved brand decisions first. If brand strategy is missing or
unclear, use `workflows/brand-strategy.md` first or label logo decisions as
provisional.

Inspect available source files before making asset-specific claims. Preserve
the user's originals.

When the user provides an existing SVG or PNG logo, use
`scripts/analyze-logo.py` and `references/logo-analysis.md` to extract
objective color, transparency, aspect-ratio, geometry, and treatment evidence
before proposing refinements or related logo directions.

## Step 2: Logo Intake

Capture or infer:

- brand or product name
- category or market
- audience and positioning
- core concept or desired association
- logo type: symbol, wordmark, monogram, combination mark, app icon, favicon,
  badge, or flexible system
- desired posture: technical, premium, playful, calm, bold, editorial,
  institutional, developer-first, friendly, minimal, expressive, or another
  direction
- constraints: colors, typography, must-use initials, existing symbol ideas,
  visual aversions, target surfaces, or platform requirements

When asking the user, offer options and ask only for missing information that
would materially change the logo direction.

## Step 3: Choose Concept Methods

Use `references/logo-generation.md` for concept methods and review standards.

Choose 2-4 clearly different directions by default. Common methods:

- monogram plus meaning
- product action
- metaphor fusion
- negative-space symbol
- construction geometry
- directional flow
- modular node or system mark

Connect each direction to a brand idea. Do not present tiny parameter changes
as distinct concepts.

## Step 4: Generate SVG-First Variants

Prefer SVG as the master unless the logo fundamentally depends on raster
texture.

Use practical SVG defaults:

- `viewBox="0 0 100 100"` for marks
- `currentColor` where practical
- simple geometric primitives when possible
- 1-2 core elements
- strong silhouette
- controlled line weights
- crisp negative space

For each variant, provide:

- concept name
- SVG code or file path when creating files
- short rationale
- expected strengths
- risk or weakness
- likely best use case

Avoid:

- generic startup gradients
- meaningless shapes
- copied or famous marks
- clipart-style icons
- overcomplicated symbols
- inconsistent variant systems
- marks that depend on tiny details
- wordmarks that cannot support an icon or favicon need

## Step 5: Preview SVG Drafts

When a browser plugin or browser-preview capability is available, show SVG
drafts in the browser before asking the user to choose a direction.

Use `references/logo-generation.md` for the browser preview checklist.

The preview should make comparison easy:

- show all variants on one review page or browser surface
- include each concept name and short rationale
- preview marks on light and dark backgrounds when relevant
- include small-size samples, especially `16x16` when favicon use matters
- keep the preview simple enough that presentation styling does not hide logo
  weaknesses

If browser preview is not available, provide SVG code blocks, file paths, or a
simple HTML draft artifact the user can open later.

Do not treat a browser preview as final production QA. It is a review aid for
direction selection.

## Step 6: Compare And Select

Compare variants against:

- concept fit
- silhouette recognition
- memorability
- scalability
- simplicity and restraint
- fit with brand strategy and visual guidelines
- likely usefulness across target surfaces

State that ownability is a design judgment, not legal or trademark clearance.

If no variant is strong enough, explain why and generate a narrower second
round instead of forcing a weak selection.

## Step 7: Refine The Direction

Refine only after a direction wins on concept and silhouette.

Typical refinements:

- spacing and proportions
- stroke weight
- counter size
- visual balance
- negative-space cuts
- corner radius and joins
- simplification of weak details
- color application when color constraints are known

Keep revisions targeted. Do not regenerate the full set unless the direction
is wrong.

## Step 8: Favicon-Safe Variant

Create a favicon-safe variant when the logo will be used as a favicon, app
icon, social avatar, small UI mark, or package icon.

At `16x16`, simplify aggressively:

- remove text
- reduce interior detail
- thicken strokes
- enlarge the dominant silhouette
- remove secondary decorative shapes
- preserve the most recognizable identity feature

Do not call a logo complete if the required small-size use case fails.

## Step 9: Handoff

End with the next useful step:

- use `workflows/brand-visual-guidelines.md` for logo usage rules, color
  applications, clearspace notes, and visual-system documentation
- use `workflows/brand-kit-generation.md` to package the logo direction into a
  full brand kit
- use `references/svg-readiness.md` before treating an SVG as a clean vector
  master
- use `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md`
  when transparent PNG, favicon, or ICO files need production

Do not duplicate asset export or favicon packaging logic here.

## Review Gate

Before treating the logo direction as ready, confirm:

- Does the logo connect to a real brand idea?
- Are concepts meaningfully different, not parameter tweaks?
- Is the silhouette recognizable quickly?
- Is there one clear focal point?
- Is the structure internally coherent?
- Does the mark work without explanatory text?
- Does the logo survive required small-size use cases?
- Are legal/trademark/originality limits stated clearly?
