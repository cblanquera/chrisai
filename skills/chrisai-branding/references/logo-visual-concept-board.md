# Logo Visual Concept Board

Use this reference when `workflows/logo-generation.md` needs a visually
credible first logo iteration expressed as editable SVG candidates.

The first board is judged as the user's first impression. It must look like an
early professional brand presentation, not a raw implementation sketch. The
board is a browser-reviewable surface assembled from separately addressable SVG
logo assets; it must not be generated as one composite candidate image.

## Contents

- Artifact Contract
- Separate Candidate Asset Contract
- Candidate Construction Contract
- Board Assembly
- Direction Inputs
- Attachment References
- Prompt Examples
- First-Pass Critique Loop
- Targeted Repair Prompts
- Presentation Quality Gate
- Selection Handoff

## Artifact Contract

Read and apply `references/logo-concept-artifacts.md` for every multi-candidate
logo set. Each candidate requires its own self-describing SVG file. Each
assembled board requires a companion `.map.md` that maps every visible position
to the exact candidate, its visible construction, and semantic SVG IDs.

The SVG is the geometry specification and edit source. The board is a derived
review surface; it is never the preferred edit target while a mapped candidate
file exists.

## Separate Candidate Asset Contract

Generate and save one true SVG asset per concept direction. This gives every
option an unambiguous, editable target if the user selects it.

- Give each concept a stable label such as `A`, `B`, `C`, or a short concept
  name.
- Use the same viewBox or aspect ratio for every candidate.
- Render one logo direction per SVG. Do not include the other concepts in the
  construction brief or output.
- Keep exact candidate labels, rationale, scores, and review copy outside the
  generated image.
- Preserve each candidate separately until the user selects, rejects, or ends
  the exploration.
- Include a useful `<title>`, concise construction `<desc>`, and stable semantic
  IDs in every SVG before board assembly.
- Assemble the comparison board only after the individual assets exist.

Do not ask an image model to generate the full `2x2` or `3x2` board. Composite
generation makes later selection and editing ambiguous, and raster output does
not provide the stable geometry required for localized logo refinement.

If an exploratory capability can produce only a raster or composite board,
treat that output as reference material only. Reconstruct each surviving
direction as a separate self-describing SVG, compare it with the reference, and
assemble a mapped SVG review board before asking for selection. Do not crop a
PNG cell into a candidate, embed it in SVG, or regenerate a selected cell from
its label, position, rationale, or description.

## Candidate Construction Contract

Shape one prompt or construction brief per concept using these fields:

```text
Use case: logo-brand
Asset type: first-iteration logo candidate [candidate label] for
[brand/product].
Output format: one standalone, editable SVG with a stable viewBox, named groups
or paths, and no embedded raster data.
Primary request: Create exactly one polished logo direction for
[brand/product], a [category] focused on [core product ideas].
Candidate direction: [concept name]: [brand idea and visual territory].
Logo form: [symbol / wordmark / monogram / combination mark / app icon].
Visual personality: [3-6 traits].
Target surfaces: [README/GitHub/npm/favicon/social/avatar/app/etc.].
Composition: one centered, isolated logo candidate on a transparent canvas with
generous clear space.
Style: professional brand identity work, strong silhouette, restrained palette,
crisp spacing, balanced negative space, vector-friendly form.
Text: use the exact wordmark "[brand name]" only when reliable and required;
otherwise render the mark without text.
Avoid: other logo options, board grids, candidate labels, rationale text,
slogans, captions, watermarks, mockup scenes, [category cliches], and
[rejected motifs].
Quality bar: the single candidate should look like a plausible first-round logo
from a professional brand designer and remain readable when reduced.
```

Use the user's exact brand name. Convert final wordmark lettering to paths when
portable rendering matters, or create mark-only candidates and add the exact
name in the deterministic review surface. Do not let generated misspellings or
runtime font differences become part of the selected source.

For reference-led work, record the shared prompt contract, source inputs,
required traits, and exclusions once in the shared reference contract. For
greenfield work, keep the concise intent in the board map and review response.
Do not create per-candidate specifications merely to duplicate SVG geometry.

## Board Assembly

Create a comparison surface from the saved candidate assets:

- use a `2x2` layout for four directions or a `3x2` layout for six
- use one candidate asset per cell without redrawing it
- include the stable label and concept name outside the image
- include a concise rationale, structural category, best use, and biggest risk
- use a plain white or neutral background
- keep candidate image scale and clear space consistent
- avoid decorative mockup scenes as the primary review surface
- do not add long copy or tiny explanatory text

A browser-reviewable HTML/CSS page or SVG sheet assembled from the candidate
files is appropriate. Presentation styling should make comparison easy without
making weak marks look stronger than they are.

Create the companion board map at the same time as the board. Record the board
artifact, layout, candidate ID, visible position, concept name, exact visual
asset, concise visible construction, semantic SVG IDs, and status for every
cell. Verify the paths before presenting the board. If the board changes,
update the map in the same revision.

## Review Response

Do not present the images alone. In the same response, provide a concise entry
for every candidate using the agent's construction vocabulary paired with plain
language. Include the overall reading, visible component groups, important
negative spaces or overlaps, useful SVG IDs, strongest trait, and biggest risk.
This vocabulary must be available before selection so the user's next response
can both choose a candidate and request a precise modification.

## Direction Inputs

Include only inputs that materially guide visual output:

- brand or product name
- category and audience
- product promise
- core product actions or differentiators
- visual personality
- exact target surfaces
- required or rejected colors
- required or rejected symbols
- competitor or category cliches to avoid
- the one concept direction assigned to the current candidate

For developer tools, useful inputs often include the actual API surface,
package role, runtime behavior, syntax, workflow, or mental model. Do not
default to brackets, terminal prompts, cursors, nodes, or sync arrows.

## Attachment References

When the user provides reference images, first read
`references/logo-reference-led-generation.md` and classify each reference as
inspiration, structural reference, edit target, or vectorization source. Do not
collapse those roles into generic inspiration. Extract the useful traits before
generating:

- subject or silhouette to preserve
- line weight, corner style, density, or geometric logic
- color behavior and contrast relationship
- mood or finish level
- composition traits that help the mark work at small sizes

Name what should not transfer:

- watermarks, stock-photo text, labels, captions, or fake brand names
- decorative backgrounds or mockup scenes
- clutter, tiny details, gradients, shadows, or texture that harm favicon use
- copyrighted, famous, or overly similar source composition

Use reference wording like this only for an inspiration reference:

```text
Use the attachments only as inspiration for [specific traits]. Do not copy the
source layout, watermark, text, exact path, or composition. Create one original
logo mark that preserves [traits] while simplifying for favicon and brand use.
```

If an attachment includes text, labels, watermarks, or UI chrome, explicitly
exclude them from the generated logo.

For structural references and edit targets, use the stricter preservation
contract and capability gate in `references/logo-reference-led-generation.md`.
Do not ask a code-writing agent to approximate a polished reference from a
verbal description and then treat the result as faithful.

## Prompt Examples

Use these as patterns, not fixed templates. Run a separate prompt for each
direction in the approved concept table.

### Developer Tool Candidate

```text
Use case: logo-brand
Asset type: first-iteration logo candidate A for r22n.
Primary request: Create exactly one polished logo direction for r22n, a
lightweight React translation library focused on runtime phrase switching,
interpolation placeholders, and compact developer ergonomics.
Candidate direction: Phrase Switch: compact phrase rows that imply reordered
language structure without generic sync arrows.
Logo form: symbol mark suitable for a later wordmark lockup.
Visual personality: precise, lightweight, developer-first, compact, modern.
Target surfaces: README, GitHub, npm avatar, favicon, package badges.
Composition: one centered, isolated mark on a plain neutral background with
generous clear space.
Style: professional brand identity work, strong silhouette, vector-friendly
form, restrained palette, crisp spacing.
Avoid: other logo options, board grids, labels, text, globes, flags, speech
bubbles, language letters, brackets, terminal prompts, cursors, generic sync
arrows, UI widgets, and rough geometry.
Quality bar: the candidate should look like a plausible first-round logo from a
professional brand designer and remain readable when reduced.
```

### Attachment-Based Candidate

```text
Use case: logo-brand
Asset type: first-iteration brain-maze logo candidate B.
Primary request: Create exactly one original brain-maze brand mark inspired by
the attached visual references.
Candidate direction: Split Hemispheres: purple and green brain halves with a
single clear central path.
Logo form: symbol mark.
Visual personality: clever, simple, bold, geometric, memorable.
Target surfaces: app icon, favicon, website header, social avatar.
Reference handling: use the attachments only for the brain silhouette, maze
concept, thick-line treatment, and simple geometric feeling. Do not copy the
exact maze path, stock layout, watermark, text, or composition.
Composition: one centered, isolated mark on a plain neutral background with
generous clear space.
Style: professional flat logo design, thick lines, high contrast, clean
negative space, vector-friendly form.
Avoid: other logo options, board grids, labels, thin maze lines, complex
labyrinths, fake text, watermarks, realistic brain detail, gradients, shadows,
and generic app-icon frames.
Quality bar: the candidate should remain recognizable when reduced.
```

## First-Pass Critique Loop

Inspect every candidate before assembling the board.

Check:

- Does it look presentation-quality at first glance?
- Does it match its assigned concept rather than blending several directions?
- Does the concept connect to the brand idea without a long explanation?
- Does the wordmark look credible, or should the candidate become mark-only?
- Are obvious cliches still present?
- Does it look like a UI icon, toolbar control, widget, or status indicator?
- Does it look like rough geometry, squiggly lines, or an implementation sketch?
- Can it plausibly survive as a small mark or favicon?

Reject weak candidates before board assembly. If one has an obvious correctable
problem, run one targeted replacement for that candidate from its original
direction prompt. Preserve the successful candidates unchanged. Do not
regenerate the full board or successful concepts merely because one option
failed. Update the replacement SVG's metadata and then rebuild the board and
board map from the surviving files.

After one targeted replacement, assemble the strongest surviving set and
present it with a candid critique. Continue exploring only when the user asks or
when no option passes the minimum quality gate.

## Targeted Repair Prompts

Use a repair brief only before selection, when one concept has an obvious
correctable failure:

```text
Critical correction for candidate [label]: remove [specific failure mode].
Preserve the original candidate direction, brand context, target surfaces,
successful traits, and quality bar. Create exactly one replacement SVG
candidate, not a board or alternate concept. Avoid [specific motifs].
```

Useful corrections include:

- remove fake labels, slogans, watermarks, captions, and placeholder names
- remove generic rounded-square containers and badge frames
- simplify small details, thin lines, texture, shadows, and complex paths
- strengthen the one-color silhouette and negative space
- remove settings, sync, upload, widget, and interface-control cues
- correct muddy color, excessive gradients, or weak contrast
- enlarge counters and thicken essential strokes for small-size recognition

Do not reuse this pre-selection repair pattern after the user selects a
candidate. Post-selection work must follow
`references/logo-iterative-refinement.md` and use the selected asset as the
baseline and edit target.

## Presentation Quality Gate

Reject or replace a candidate when it includes:

- squiggly line work or rough technical geometry
- icon-library placeholders
- generic sync, settings, upload, widget, toolbar, or status icons
- text with an arbitrary symbol
- a concept that needs written explanation to make sense
- an obvious rejected category cliche
- illegible or invented text
- fake watermarks or brand names

Reject the assembled board when:

- concepts are missing stable labels, source SVGs, descriptions, or semantic IDs
- the board has no companion map, the map is stale, or a visible cell does not
  resolve to an existing candidate
- candidates are near-identical
- image scale, crop, or padding makes comparison misleading
- decoration or mockups hide weak marks
- the exact selected cell could not later be isolated and edited
- a candidate is raster or contains an embedded raster rather than editable SVG

## Selection Handoff

After the user selects a direction:

1. resolve the candidate label through the current board map
2. identify the exact SVG source from that row
3. describe the selected mark's visible anatomy in concrete terms: component
   count, groups, shapes, colors, positions, orientation, spatial relationships,
   layers, negative spaces, and silhouette
4. pair the agent's terms with the user's wording and map both to stable SVG IDs
5. record what the user selected and what must remain unchanged
6. load and follow `references/logo-iterative-refinement.md`
7. use the selected SVG itself for refinement; do not regenerate it from the
   board description or other text
8. create a favicon-safe SVG simplification when needed
9. run `references/svg-readiness.md`, `references/favicon-qa.md`, and the
   preview checklist in `references/logo-generation.md`
10. wait for explicit approval of the SVG logo before creating PNG derivatives

If the review response already supplied the complete anatomy, reuse those terms
instead of repeating the handoff. When the user's selection includes a clear
modification request, map it to the existing SVG IDs and proceed without an
extra confirmation round unless the target remains ambiguous.

If a direction depends on raster texture, illustration, or complex shading that
cannot be represented faithfully in SVG, keep it as an exploratory reference
and stop before selection. Explain the limitation rather than changing the logo
workflow to PNG.
