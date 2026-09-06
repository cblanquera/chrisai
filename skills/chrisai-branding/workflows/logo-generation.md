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
- reference-role classification and reference-preservation contracts
- concept direction selection
- separately addressable SVG concept assets
- per-candidate anatomy and terminology descriptions at review time
- visually credible first-iteration concept boards
- board maps that resolve review positions to exact candidate files
- logo mark generation through vector-capable design or construction methods,
  with raster capabilities limited to exploratory reference
- wordmark, monogram, symbol, and combination-mark decisions
- selected-baseline locking and controlled refinement
- SVG-first candidate construction and controlled refinement
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
3. For reference-led work, classify and describe the reference before drawing.
4. Clarify the design direction before drawing.
5. Choose concept methods and structural categories.
6. Produce separate self-describing SVG concepts, then assemble a credible
   board and companion map.
7. Review the concept board and select a direction.
8. Lock the selected candidate as the accepted baseline.
9. Describe the selected logo anatomy and establish shared vocabulary.
10. Refine the selected direction in SVG.
11. Preview and validate SVG candidates.
12. Obtain explicit approval for the SVG production master.
13. Create PNG or other derivative exports only after approval, then hand off.

Do not jump straight to polishing one mark before the direction space is
clear.

The first visual iteration matters. SVG is the required working format, but
valid SVG syntax is not the quality bar. A first iteration should look like a
plausible brand concept board, not like a technical diagram, icon-library
placeholder, or rough geometry exercise.

## Step 1: Check Existing Context And Assets

Look for existing strategy, messaging, visual guidelines, logos, SVGs, PNGs,
icons, colors, typography, websites, app screenshots, decks, or brand docs. Do
not assume a particular folder exists.

Use existing approved brand decisions first. If brand strategy is missing or
unclear, use `workflows/brand-strategy.md` first or label logo decisions as
provisional.

Inspect available source files before making asset-specific claims. Preserve
the user's originals.

When an attached or existing logo materially guides the requested result, read
and apply `references/logo-reference-led-generation.md` before choosing a
generation or construction method. A reference-led request is not a greenfield
text prompt with extra inspiration.

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

## Step 3: Classify And Describe The Reference

For reference-led work, complete the interpretation checkpoint in
`references/logo-reference-led-generation.md`. State what will be preserved,
changed, and excluded using both the user's wording and concrete visual
terminology. Continue only when the interpretation is unambiguous or the user's
request already confirms that exact construction. Skip this step for greenfield
work with no material visual reference.

## Step 4: Clarify Design Direction

Do not let SVG construction replace the design-direction decision. Establish
the direction first, then express each candidate as a polished SVG.

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

## Step 5: Choose Concept Methods And Structural Categories

Use `references/logo-generation.md` for concept methods and review standards.

Choose 3-4 clearly different directions by default. Use two only when the
brief is intentionally narrow, or expand to six while the direction space is
still broad. Common methods:

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

## Step 6: Produce Separate Concept Assets And Assemble A Credible Board

The default first visual deliverable is a browser-reviewable concept board
assembled from separately addressable SVG candidate files, not one image
containing the entire generated grid.

Use the best available vector-capable path in the active environment. A design
tool, vector-native generator, or reference-aware image capability may help
explore a direction, but every selectable candidate must be saved as a real SVG
with editable vector geometry. A raster output may be retained privately as an
exploratory reference; do not present it as the candidate or embed it inside an
SVG.

Code-native SVG construction is appropriate for simple deterministic geometry,
small exact changes to an existing SVG, or cleanup of already accepted vector
geometry. It is not the default creative engine for reconstructing a polished
raster reference. Apply the capability gate in
`references/logo-reference-led-generation.md`; if no available path can retain
the reference's visual grammar at a professional quality level, stop before
creating selectable candidates.

If a direction cannot be represented faithfully as SVG, stop and explain the
limitation. Do not silently switch the working logo format to PNG.

A first concept board should include 3-6 visually credible directions. Create
and save one SVG per concept. Give each concept a stable label and preserve the
same viewBox or aspect ratio across the set. Read and apply
`references/logo-concept-artifacts.md` for the self-describing SVG contract,
file relationships, board map, and review-response descriptions.

Each direction should have:

- a rendered SVG mark or mark-plus-wordmark
- a concept name
- a concise visible-anatomy description using technical and plain-language terms
- stable SVG group or path IDs for likely edit targets
- a short rationale tied to the brand idea
- expected strengths
- risk or weakness
- likely best use case

Make each candidate self-describing with a stable filename, `<title>`, `<desc>`,
viewBox, and semantic component IDs. The SVG is the geometry specification and
later edit target. Do not create a separate candidate specification merely to
restate its paths, colors, or groups.

Assemble the review board only after the candidate SVGs exist. Put exact
candidate labels, concise anatomy, rationales, and other review text in the
board presentation rather than inside the visible candidate artwork. Prefer the
bundled SVG variant sheet or another HTML/SVG review surface that references the
exact candidate files.

Create a companion `.map.md` in the same operation as the board. The map must
identify the board artifact and layout, then map every visible position and
candidate ID to the exact source SVG, visible construction, and semantic SVG
IDs. Verify all mapped paths before presenting the board. Update the board and
map together whenever membership, order, labels, paths, or component IDs change.

If an exploratory capability can return only a composite raster board, preserve
it only as a reference. Reconstruct each surviving direction as an independent
SVG with `<title>`, `<desc>`, and semantic IDs, then assemble a mapped SVG/HTML
board before asking the user to select. A cropped raster cell is not a
selectable logo candidate.

Use `references/logo-concept-artifacts.md` for the artifact schemas and
selection mapping. Use `references/logo-visual-concept-board.md` for the
prompt contract, recommended board formats, and first-pass critique loop. Use
`references/logo-generation.md` for broader concept methods and review
standards.

Reject the first board before showing it if the marks look like:

- squiggly line sketches
- MS Paint-style geometry
- icon-library placeholders
- generic settings, sync, upload, widget, toolbar, or status icons
- text plus an arbitrary symbol
- marks that need the written rationale to be understood

After generating the concept assets, critique each one against the failure signs
before assembling or presenting the board. If one has obvious correctable
problems, run one targeted replacement for that concept from its original
direction brief. Do not regenerate the successful concepts or the full set.
Update the replaced candidate's SVG metadata, then regenerate the board and map
from the surviving assets. After one targeted replacement, present the strongest
surviving set with a candid critique.

For reference-led work, also compare each candidate directly with the reference
contract. Reject candidates that preserve the noun but lose the source's craft:
stroke rhythm, curvature, proportions, negative space, visual weight, or
silhouette logic. SVG validity and semantic recognizability are not enough.

## Step 7: Review The Concept Board And Select A Direction

Compare board options against:

- concept fit
- first-impression quality
- silhouette recognition
- memorability
- structural variety
- type and mark compatibility
- usefulness across README, GitHub, npm, favicon, social avatar, and product UI

If no board option is strong enough, explain why and generate a narrower second
board. Do not proceed to refinement merely because the SVG files are valid.

Selection identifies a promising direction; it does not authorize the agent to
recreate it from the written concept alone. Resolve the user's candidate label
through the current board map, then continue with the mapped visual asset
itself. Use the board description and shared reference contract as context only.

## Step 8: Lock The Selected Candidate

Read and apply `references/logo-iterative-refinement.md`. Resolve the selected
candidate through the current board map and establish that exact SVG as the
accepted baseline before any revision, cleanup, or asset expansion. Preserve
the candidate label, source path, viewBox, accepted traits, locked invariants,
and pending change in the baseline record described by the reference.

For an imported legacy raster logo, follow the reference's imported-raster gate
and obtain acceptance of a faithful SVG working baseline before refinement. Do
not refine a cropped board cell or PNG.

## Step 9: Describe The Selected Logo And Establish Shared Vocabulary

Use the anatomy and shared-vocabulary handoff in
`references/logo-iterative-refinement.md`. The concept review should already
have described every candidate; when it did, reuse those terms and semantic SVG
IDs instead of repeating the full description or asking for confirmation again.

If the handoff is missing, inspect the exact selected SVG and provide it before
rendering a requested change. Map the user's words to the visible component and
SVG IDs, keep both vocabularies as aliases, and resolve any ambiguous target
with one concise question or an annotated baseline.

## Step 10: Refine The Selected Direction In SVG

Use `references/logo-iterative-refinement.md` for target resolution, locked
invariants, revision briefs, allowed-change regions, surgical SVG edits,
baseline comparison, promotion, and retry limits. Treat the whole accepted mark
as locked by default, branch every revision from the exact accepted SVG, and
change only the authorized groups or paths. A rejected candidate must not
become the next baseline.

Use `references/logo-generation.md` for SVG output standards, variant output,
cliche rejection, and failure signs. If no suitable editing path can preserve
the accepted identity, stop and state the fidelity limitation instead of
falling back to a generated PNG refinement.

## Step 11: Preview And Validate SVG Candidates

When creating or refining SVG candidates, generate a review surface before
asking the user to approve the logo. A browser preview is
preferred when a browser plugin or browser-preview capability is available.

Use `references/logo-generation.md` for the browser preview checklist.

The preview should make comparison easy:

- show all variants on one review page or browser surface
- preserve each variant as a separate self-describing SVG file
- provide a companion map from every preview position to those exact files
- include each concept name and short rationale
- include the visible-anatomy and terminology description for every candidate
- preview marks on light and dark backgrounds when relevant
- include small-size samples: `16x16`, `32x32`, and `64x64`
- include a larger sample for balance and proportion
- include favicon and simple navigation/header mockups when relevant
- keep the preview simple enough that presentation styling does not hide logo
  weaknesses
- show the accepted visual baseline beside any refined or rebuilt production
  candidate

If browser preview is not available, provide SVG code blocks, file paths, or a
simple HTML draft artifact the user can open later.

Do not treat a browser preview as final production QA. It is a review aid for
baseline comparison and production approval.

Do not create PNG logo candidate files during this phase. An ephemeral browser
screenshot may be used as QA evidence, but it is not a logo source, candidate,
or baseline.

Validate production candidates against:

- the selected concept direction
- silhouette recognition
- memorability
- scalability
- simplicity and restraint
- fit with brand strategy and visual guidelines
- likely usefulness across target surfaces

State that ownability is a design judgment, not legal or trademark clearance.

If a candidate weakens the accepted visual direction or changes an undeclared
invariant, return to the accepted baseline. Do not approve a candidate merely
because it is technically valid.

## Step 12: Approve The SVG Production Master

Run `references/svg-readiness.md` on the selected SVG and present it for explicit
approval. Until the user approves it, continue treating it as a candidate.

Approval promotes that exact SVG file to the production master. Record its
path, candidate ID, viewBox, component vocabulary, and approved invariants. Do
not infer approval from selection, a request for another iteration, or silence.

## Step 13: Create Derivative Exports And Hand Off

Only after the SVG logo is approved may the workflow render PNG derivatives.
Create a favicon-safe SVG variant when the approved logo will be used as a
favicon, app icon, social avatar, small UI mark, or package icon.

At `16x16`, simplify aggressively:

- remove text
- reduce interior detail
- thicken strokes
- enlarge the dominant silhouette
- remove secondary decorative shapes
- preserve the most recognizable identity feature

Do not call a logo complete if the required small-size use case fails.

End with the next useful step:

- use `workflows/brand-visual-guidelines.md` for logo usage rules, color
  applications, clearspace notes, and visual-system documentation
- use `workflows/brand-kit-generation.md` to package the logo direction into a
  full brand kit
- use `references/svg-readiness.md` before treating an SVG as a clean vector
  master
- use `workflows/transparent-pngs.md` and `workflows/png-ico-conversion.md`
  to export approved SVG artwork as transparent PNG, favicon, or ICO files

Do not duplicate asset export or favicon packaging logic here.

## Review Gate

Before treating the logo direction as ready, confirm:

- Does the logo connect to a real brand idea?
- Are concepts meaningfully different, not parameter tweaks?
- Did the workflow clarify direction before drawing?
- Did the concept set include structural diversity?
- Was every selectable concept delivered as a separately addressable SVG?
- Did every candidate include `<title>`, `<desc>`, and stable semantic SVG IDs?
- Was the board assembled from the separate candidate files and delivered with
  a verified companion map?
- Were obvious category cliches rejected or transformed?
- Was the first visual iteration presentation-quality, not raw SVG geometry?
- For reference-led work, was the reference role classified and the
  preserve/change/avoid contract established before generation?
- Did the chosen capability meet the reference-fidelity requirement instead of
  improvising polished raster geometry as hand-authored SVG?
- Did every presented reference-led candidate pass direct craft-and-fidelity
  comparison against the reference contract?
- Was SVG used as the candidate format from the first review set onward?
- Is the silhouette recognizable quickly?
- Is there one clear focal point?
- Is the structure internally coherent?
- Does the mark work without explanatory text?
- Does the mark look like a brand asset rather than a generic UI icon?
- Was the selected source locked as the baseline before refinement?
- Was the selection resolved through the board map to the exact candidate and
  SVG file?
- Did the review response describe every presented candidate using concrete
  visual terminology and plain-language aliases before asking for selection?
- Did the agent describe the selected logo anatomy and establish shared
  component vocabulary before attempting a refinement?
- Did every refinement branch from the selected SVG and modify only authorized
  groups or paths?
- Were rejected candidates excluded from later edit attempts?
- Did the user explicitly approve the final SVG before any PNG derivative was
  created?
- Does the logo survive required small-size use cases?
- Was a preview surface used before direction selection when files were
  created?
- Are legal/trademark/originality limits stated clearly?
