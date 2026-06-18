# Logo Visual Concept Board

Use this reference when `workflows/logo-generation.md` needs a visually
credible first logo iteration using an image, design, or logo-generation
capability.

The first board is judged as the user's first impression. It must look like an
early professional brand presentation, not a raw implementation sketch.

## Contents

- When To Use
- Prompt Contract
- Recommended Board Formats
- Direction Inputs
- Attachment References
- Golden Prompt Examples
- First-Pass Critique Loop
- Targeted Repair Prompts
- Presentation Quality Gate
- Handoff To SVG Or Vector

## When To Use

Use this reference before creating visual logo concepts for:

- logo marks
- wordmarks
- monograms
- combination logos
- app icons
- favicon-safe brand marks
- README, GitHub, npm, marketplace, or social avatar logo directions

Do not use this reference for final SVG cleanup, PNG transparency, ICO
conversion, or legal/trademark review.

## Prompt Contract

Shape the visual-generation prompt with these fields:

```text
Use case: logo-brand
Asset type: first-iteration logo concept board for [brand/product].
Primary request: Create a polished visual concept board with [3-6] distinct
logo directions for [brand/product], a [category] focused on [core product
ideas].
Format: clean presentation board, [2x2 or 3x2] grid, each concept showing a
symbol mark plus wordmark reading exactly "[brand name]". No slogans unless
requested.
Visual personality: [3-6 traits].
Target surfaces: [README/GitHub/npm/favicon/social/avatar/app/etc.].
Concept directions:
1. [name]: [brand idea and visual territory]
2. [name]: [brand idea and visual territory]
3. [name]: [brand idea and visual territory]
4. [name]: [brand idea and visual territory]
Style: professional brand identity presentation, polished typography, strong
silhouettes, restrained palette, crisp spacing, vector-friendly forms.
Avoid: [category cliches, obvious rejected motifs, UI/icon pitfalls].
Quality bar: each concept should look like a plausible first-round logo from a
professional brand designer, suitable for review before vector production.
```

Use the user's exact brand name. If exact generated text is unreliable in the
active image tool, ask for a mark-only board or use the generated board for
visual direction only, then rebuild the wordmark separately.

## Recommended Board Formats

Use a layout that makes comparison easy:

- `2x2` board for four strong directions
- `3x2` board for six directions when the direction space is still broad
- one concept per cell
- mark plus wordmark when possible
- plain white or neutral background
- no decorative mockup scene as the primary review surface
- no long labels, slogans, or tiny explanatory text inside the image

## Direction Inputs

Include only inputs that materially guide visual output:

- brand/product name
- category
- audience
- product promise
- core product actions or differentiators
- visual personality
- exact target surfaces
- required or rejected colors
- required or rejected symbols
- competitor/category cliches to avoid

For developer tools, useful visual inputs often include the actual API
surface, package role, runtime behavior, syntax, workflow, or mental model.
Do not default to brackets, terminal prompts, cursors, nodes, or sync arrows.

## Attachment References

When the user provides reference images, use them as visual evidence, not as
art to copy. Extract the useful traits before generating:

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

Use reference wording like:

```text
Use the attachments only as inspiration for [specific traits]. Do not copy the
source layout, watermark, text, exact maze path, or composition. Create an
original logo mark that preserves [traits] while simplifying for favicon and
brand use.
```

If an attachment includes text, labels, watermarks, or UI chrome, explicitly
exclude them from the generated logo.

## Golden Prompt Examples

Use these as patterns, not fixed templates.

### Developer Tool

```text
Use case: logo-brand
Asset type: first-iteration logo concept board for r22n.
Primary request: Create a polished 2x2 visual concept board with four distinct
logo directions for r22n, a lightweight React translation library focused on
runtime phrase switching, interpolation placeholders, and compact developer
ergonomics.
Format: clean presentation board, one concept per cell, mark plus wordmark
reading exactly "r22n" if possible. No slogans.
Visual personality: precise, lightweight, developer-first, compact, modern.
Target surfaces: README, GitHub, npm avatar, favicon, package badges.
Concept directions:
1. Phrase Switch: compact phrase rows that imply reordered language structure
without generic sync arrows.
2. Placeholder Logic: a percent or slot cue integrated into a simple mark.
3. Compact Monogram: an ownable r22n letterform with restrained geometry.
4. Runtime Swap: abstract before-and-after phrase transformation.
Style: professional brand identity presentation, strong silhouettes,
vector-friendly forms, restrained palette, crisp spacing.
Avoid: globes, flags, speech bubbles, language letters, brackets, terminal
prompts, cursors, generic sync arrows, UI widgets, rough SVG geometry.
Quality bar: each concept should look like a plausible first-round logo from a
professional brand designer, suitable for review before vector production.
```

### Attachment-Based Brain Maze

```text
Use case: logo-brand
Asset type: first-iteration logo concept board for a brain-maze brand mark.
Primary request: Create a polished 2x2 visual concept board with four original
logo directions inspired by the attached brain maze references.
Format: clean presentation board, one concept per cell, symbol mark only or
symbol plus neutral placeholder wordmark if a brand name is not provided. No
slogans, captions, labels, or watermarks.
Visual personality: clever, simple, bold, geometric, memorable.
Target surfaces: app icon, favicon, website header, social avatar.
Reference handling: use the attachments only for the brain silhouette, maze
concept, thick-line treatment, and simple geometric feeling. Do not copy the
exact maze path, stock layout, watermark, text, or composition.
Concept directions:
1. Brain Maze: simple brain silhouette built from thick maze corridors.
2. Split Hemispheres: purple and green halves with a clean central path.
3. Neural Path: one clear route through a simplified maze-brain outline.
4. Rounded Labyrinth: friendlier thick-line maze with compact icon balance.
Style: professional logo design, flat vector-friendly forms, thick lines,
high contrast, purple and green palette, clean negative space.
Avoid: thin maze lines, complex labyrinths, fake text, watermarks, stock-logo
labels, realistic brain detail, gradients, shadows, generic app-icon frames.
Quality bar: each concept should work as a credible first-round logo direction
and remain readable when shrunk.
```

### SaaS Productivity App

```text
Use case: logo-brand
Asset type: first-iteration logo concept board for Flowdesk.
Primary request: Create a polished 3x2 visual concept board with six distinct
logo directions for Flowdesk, a SaaS productivity app for organizing daily
work, decisions, and follow-through.
Format: clean presentation board, one concept per cell, mark plus wordmark
reading exactly "Flowdesk" if possible. No slogans.
Visual personality: calm, organized, capable, modern, warm but professional.
Target surfaces: app icon, web dashboard header, favicon, social avatar,
sales deck.
Concept directions:
1. Workstream Mark: organized flow lines resolving into a simple desk shape.
2. Decision Path: branching paths converging into one clear next action.
3. Modular Tiles: calm system of task blocks with one highlighted priority.
4. Wordmark Focus: distinctive lowercase wordmark with subtle flow detail.
5. Compass Queue: directional cue for next-step clarity.
6. Negative-Space F: compact letterform that implies movement and structure.
Style: professional brand identity presentation, strong silhouettes,
vector-friendly forms, balanced spacing, restrained palette.
Avoid: checkmarks, generic calendars, kanban boards, clocks, lightning bolts,
target icons, dashboards, UI controls, rough geometry.
Quality bar: each concept should feel like a plausible first-round SaaS logo
from a professional brand designer.
```

## First-Pass Critique Loop

After generating the first board, inspect it before presenting it as usable.

Check:

- Does it look presentation-quality at first glance?
- Are the directions structurally different?
- Does each direction connect to the brand idea without a long explanation?
- Does the wordmark look credible, or should it be treated as placeholder text?
- Are obvious cliches still present?
- Does any concept look like a UI icon, toolbar control, widget, or status
  indicator?
- Does any concept look like rough geometry, squiggly lines, or an
  implementation sketch?
- Is there a likely small-mark or favicon candidate?

If the first board fails obvious criteria, do one targeted regeneration before
showing it. The second prompt should name the specific failure modes to remove,
for example:

```text
Critical correction from previous pass: remove [specific failure mode]. Do not
use [specific motifs]. Keep [successful traits]. Generate a cleaner board with
the same brand, target surfaces, and quality bar.
```

Do not keep regenerating indefinitely. After one targeted regeneration, present
the best result with a candid critique and recommended next step.

## Targeted Repair Prompts

Use a repair prompt when the first pass has one obvious correctable failure.
Keep what worked, name what failed, and ask for a cleaner board.

### Fake Text Or Watermarks

```text
Critical correction from previous pass: remove all fake labels, slogans,
watermarks, captions, mockup text, and placeholder brand names. Keep the
strongest mark silhouettes and palette. Generate a cleaner logo concept board
where each cell contains only the logo mark and the exact requested wordmark
when reliable.
```

### Generic App Icon Container

```text
Critical correction from previous pass: remove generic rounded-square app
containers and badge frames unless they are structurally part of the mark.
Keep the strongest symbol ideas, but make each logo stand on its own as a
brand mark with clear silhouette and intentional negative space.
```

### Too Much Detail

```text
Critical correction from previous pass: simplify the marks. Remove small
decorative details, thin lines, texture, shadows, and complex internal paths.
Keep only the strongest silhouette, bold geometry, and one memorable concept
per mark so the logo can survive favicon size.
```

### Weak Silhouette

```text
Critical correction from previous pass: strengthen the silhouettes. Each mark
should be recognizable as a black or single-color shape before color, texture,
or explanation. Increase contrast, clarify negative space, and avoid loose
sketch-like construction.
```

### UI Icon Or Toolbar Look

```text
Critical correction from previous pass: the marks look like UI icons or
toolbar controls. Remove status-icon, settings, sync, upload, widget, and
interface-control cues. Rebuild the concepts as distinctive brand marks with
ownable shape language.
```

### Color Misuse

```text
Critical correction from previous pass: use color more deliberately. Keep the
requested palette, but avoid muddy blends, excessive gradients, and low
contrast. Each mark should still work in one color, with color acting as a
supporting brand cue rather than the whole idea.
```

### Illegible Small Mark

```text
Critical correction from previous pass: optimize for small-size recognition.
Reduce internal complexity, thicken essential strokes, enlarge negative
spaces, and keep one clear focal idea per mark. The result should still read
as a favicon or social avatar.
```

## Presentation Quality Gate

Reject or regenerate when the board includes:

- squiggly line work
- MS Paint-style construction
- icon-library placeholders
- rough technical diagrams
- generic sync, settings, upload, widget, toolbar, or status icons
- text with an arbitrary symbol
- near-identical layouts
- marks that need written explanation to make sense
- obvious category cliches that were already rejected
- illegible tiny text
- fake watermarks or brand names

## Handoff To SVG Or Vector

Only after a visual direction is promising:

1. choose or narrow the direction
2. identify what must be preserved from the visual board
3. rebuild as clean SVG/vector when appropriate
4. create favicon-safe simplification if needed
5. run `references/svg-readiness.md`, `references/favicon-qa.md`, and the
   preview checklist in `references/logo-generation.md`

If the generated visual direction depends on raster texture, illustration, or
complex shading, preserve the raster source as the visual master and create
simplified vector companions only where they make sense.
