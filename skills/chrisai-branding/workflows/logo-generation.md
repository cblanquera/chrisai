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
- visually credible first-iteration concept boards
- logo mark generation through available visual, image, or design capabilities
- wordmark, monogram, symbol, and combination-mark decisions
- variant comparison and refinement
- SVG/vector rebuild after visual direction approval
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
3. Clarify the design direction before drawing.
4. Choose concept methods and structural categories.
5. Produce a visually credible first concept board.
6. Review the concept board and select a direction.
7. Rebuild or refine the selected direction as SVG/vector when needed.
8. Preview SVG/vector candidates.
9. Validate the vector candidate against production criteria.
10. Refine the selected direction.
11. Create a favicon-safe variant when needed.
12. Hand off to visual guidelines or asset formats.

Do not jump straight to polishing one mark before the direction space is
clear.

The first visual iteration matters. Do not show raw hand-authored SVG geometry
as the default starting point. A first iteration should look like a plausible
brand concept board, not like a technical diagram, icon-library placeholder, or
rough geometry exercise.

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

## Step 3: Clarify Design Direction

Do not write SVG logo files as the first creative act.

Before drawing, confirm or infer the logo's design direction. If the direction
is materially underspecified, ask one to three curated questions or present a
short direction menu. Useful direction choices include:

- visual personality: bold geometric, precise technical, friendly crafted,
  restrained typographic, expressive, premium, playful, editorial, or another
  domain-relevant posture
- brand focus: what the product does, how the brand should feel, who the brand
  is, or a distinctive name/letterform
- reference territory: known brands in or near the user's category that anchor
  the desired or rejected aesthetic

Tailor examples to the user's category. Do not use generic inspiration brands
when domain-specific references are available.

Skip this step only when the user has already provided both a concrete visual
style and specific imagery or construction constraints.

## Step 4: Choose Concept Methods And Structural Categories

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

Before creating files, produce a compact concept direction table. Each concept
should have a different brand idea and visual logic.

For sets of four or more options, include at least three structural categories
from `references/logo-generation.md`. Do not present one structural vocabulary
with small changes as a full logo set.

Reject first-pass category cliches before drawing. Common weak logo shortcuts
include generic code brackets, sync arrows, rounded app frames, abstract nodes,
chat bubbles, shields, bar charts, globes, leaf icons, and literal UI controls
unless the user's brief explicitly asks for them and the treatment adds a
distinctive twist.

## Step 5: Produce A Visually Credible First Concept Board

The default first visual deliverable is a concept board, not SVG source.

Use the best available visual path in the active environment:

- image generation or image-editing capability when available
- design-tool or browser-reviewable visual artifact when available
- external logo/design generator only when the user asks for or allows external
  tool use
- hand-authored SVG only when the user explicitly requests SVG-only
  exploration or no visual generation path is available

If no image, design, or logo-generation capability is available, stop and say
that the environment can only produce a lower-confidence text/SVG exploration.
Do not imply that raw SVG geometry is equivalent to a polished first logo pass.

A first concept board should include 3-6 visually credible directions. Each
direction should have:

- a rendered mark or mark-plus-wordmark image
- a concept name
- a short rationale tied to the brand idea
- expected strengths
- risk or weakness
- likely best use case

Use `references/logo-visual-concept-board.md` for the prompt contract,
recommended board formats, and first-pass critique loop. Use
`references/logo-generation.md` for broader concept methods and review
standards.

Reject the first board before showing it if the marks look like:

- squiggly line sketches
- MS Paint-style geometry
- icon-library placeholders
- generic settings, sync, upload, widget, toolbar, or status icons
- text plus an arbitrary symbol
- marks that need the written rationale to be understood

After generating the first board, critique it against the failure signs before
presenting it as usable. If the board has obvious correctable problems, run one
targeted regeneration that explicitly removes those failure modes and preserves
what worked. Do not keep regenerating indefinitely; after one targeted
regeneration, present the best result with a candid critique.

## Step 6: Review The Concept Board And Select A Direction

Compare board options against:

- concept fit
- first-impression quality
- silhouette recognition
- memorability
- structural variety
- type and mark compatibility
- usefulness across README, GitHub, npm, favicon, social avatar, and product UI

If no board option is strong enough, explain why and generate a narrower second
board. Do not proceed to SVG/vector production just because files can be made.

## Step 7: Rebuild Or Refine As SVG/Vector

After a visual direction is selected, create or clean up SVG/vector assets when
needed.

Prefer SVG as the master only when the selected direction can be maintained as
a clean vector asset. If the selected logo depends on raster texture,
illustration, or complex shading, preserve the raster source as the visual
master and produce simplified vector companions only where appropriate.

Hand-authored SVG is acceptable at this stage as a vector rebuild, trace,
simplification, favicon variant, or production candidate. It is still not ready
until it passes visual review.

Use practical SVG defaults:

- `viewBox="0 0 100 100"` for marks
- `currentColor` where practical
- simple geometric primitives when possible
- 1-2 core elements
- strong silhouette
- controlled line weights
- crisp negative space
- transparent background

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
- marks that look like settings, sync, upload, widget, or toolbar icons
- wordmarks that cannot support an icon or favicon need

## Step 8: Preview SVG/Vector Candidates

When creating SVG files, generate a review surface before asking the user to
choose a direction. A browser preview is preferred when a browser plugin or
browser-preview capability is available.

Use `references/logo-generation.md` for the browser preview checklist.

The preview should make comparison easy:

- show all variants on one review page or browser surface
- include each concept name and short rationale
- preview marks on light and dark backgrounds when relevant
- include small-size samples: `16x16`, `32x32`, and `64x64`
- include a larger sample for balance and proportion
- include favicon and simple navigation/header mockups when relevant
- keep the preview simple enough that presentation styling does not hide logo
  weaknesses

If browser preview is not available, provide SVG code blocks, file paths, or a
simple HTML draft artifact the user can open later.

Do not treat a browser preview as final production QA. It is a review aid for
direction selection.

## Step 9: Validate The Vector Candidate

Validate SVG/vector candidates against:

- the selected concept direction
- silhouette recognition
- memorability
- scalability
- simplicity and restraint
- fit with brand strategy and visual guidelines
- likely usefulness across target surfaces

State that ownability is a design judgment, not legal or trademark clearance.

If the vector candidate weakens the approved visual direction, return to
refinement or rebuild it. Do not treat the vector candidate as selected merely
because it is technically valid.

## Step 10: Refine The Direction

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

## Step 11: Favicon-Safe Variant

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

## Step 12: Handoff

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
- Did the workflow clarify direction before drawing?
- Did the concept set include structural diversity?
- Were obvious category cliches rejected or transformed?
- Was the first visual iteration presentation-quality, not raw SVG geometry?
- Was SVG/vector work delayed until after a visual direction was selected,
  unless the user explicitly requested SVG-only exploration?
- Is the silhouette recognizable quickly?
- Is there one clear focal point?
- Is the structure internally coherent?
- Does the mark work without explanatory text?
- Does the mark look like a brand asset rather than a generic UI icon?
- Does the logo survive required small-size use cases?
- Was a preview surface used before direction selection when files were
  created?
- Are legal/trademark/originality limits stated clearly?
