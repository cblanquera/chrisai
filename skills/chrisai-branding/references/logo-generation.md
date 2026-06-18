# Logo Generation Reference

Use this reference when `workflows/logo-generation.md` needs concept methods,
output structure, SVG standards, or review checklists.

## Logo Workflow Standard

The first logo iteration must be visually credible. Do not use raw
hand-authored SVG geometry as the default logo ideation engine.

Default sequence:

1. define the brief and design direction
2. mine the domain and reject obvious cliches
3. create a visual concept board using the best available image, design, or
   logo-generation capability
4. review the board as images, not source code
5. select or narrow a direction
6. rebuild, simplify, or clean up SVG/vector assets only after the visual
   direction is promising

SVG is a production and handoff format unless the user explicitly asks for
SVG-only exploration.

## Borrowed Reference Priorities

Use the OpenDesign SVG references as follows:

- `logo-techniques.md`: concept quality, domain mining, cliche rejection,
  structural category diversity, typography, small-size survival, dark-mode
  logo variants
- `editing-workflow.md`: data-driven review pages, grouping variants by
  concept, light/dark variants, favicon and nav mockups, iterative review
- `accessibility-and-pitfalls.md`: accessible SVG labeling, stroke clipping,
  viewBox issues, browser rendering issues, dark-color failures
- `icon-design.md`: favicon and app-icon QA, pixel alignment, live area,
  optical balance, stroke consistency, blur/squint density testing
- `advanced-techniques.md`: gradient restraint, flat fallback, avoiding
  filters, flattening transforms for distributed assets
- `optimization.md`: final cleanup only, especially preserving `viewBox` and
  avoiding dangerous optimizer defaults

Use `references/logo-visual-concept-board.md` for the repeatable first-pass
visual prompt contract and critique/regeneration loop.

## Brief Template

```markdown
# Logo Brief: [Brand Name]

- **Name:**
- **Category:**
- **Audience:**
- **Positioning:**
- **Core concept:**
- **Desired association:**
- **Logo type:** symbol / wordmark / monogram / combination / app icon / favicon
- **Tone/posture:**
- **Target surfaces:**
- **Color constraints:**
- **Typography constraints:**
- **Must include:**
- **Must avoid:**
- **Existing assets:**
- **Assumptions:**
```

## Direction Gate

Before creating visual concepts, establish the design direction. Use one to
three curated questions when missing inputs would materially change the result.

Good direction prompts are specific choices, not open-ended requests:

```markdown
## Direction Options

**Visual personality**
- Bold geometric: strong shapes, direct silhouette, confident
- Precise technical: measured geometry, restraint, systematic construction
- Friendly crafted: warmer shapes, human feel, less mechanical
- Minimal typographic: name or letterform carries the identity

**Brand focus**
- What it does: product action or outcome
- How it feels: abstract energy, trust, speed, calm, clarity, or delight
- Who it is: initials, name structure, founder/product story, or category role

**Reference territory**
- [Known brand in category]: [what aesthetic it represents]
- [Known adjacent brand]: [what to borrow or avoid]
- [Known competitor]: [how to differ]
```

Tailor reference brands and choices to the user's domain. A developer tool, a
coffee brand, a fintech product, and a children's app should not receive the
same inspiration menu.

Skip the direction gate only when the user has already provided both a
concrete visual style and specific imagery or construction constraints.

## Domain Mining

Mine the product's world before choosing symbols. List concrete items in these
groups:

- objects, tools, surfaces, materials, or environments specific to the domain
- user actions, transformations, workflows, or moments of value
- abstract qualities the brand must signal
- overused category symbols to avoid or transform

If fewer than 10 domain-specific objects or actions can be named, the logo
brief is probably too thin. Ask for more context or use brand research before
drawing.

Push literal ideas through abstraction:

```markdown
| Raw idea | Literal form | Abstract form | Unexpected or dual-read form |
| --- | --- | --- | --- |
| [Domain object] | [Obvious symbol] | [Reduced shape or motion] | [Second meaning or figure-ground idea] |
```

## Visual Concept Board Standard

The first board should feel like an early professional design presentation, not
an implementation scratchpad.

Create 3-6 visual directions. Each direction should include:

- a rendered mark or mark-plus-wordmark image
- a concept name
- a concise rationale
- the structural category
- where it would work best
- the biggest risk

Use image generation, image editing, a design tool, or another visual logo
generator when available. A browser-reviewable HTML/CSS artifact can support
presentation, but it should not be used to disguise weak marks.

Use `references/logo-visual-concept-board.md` to shape the prompt and inspect
the first pass before presenting it as usable.

Only use hand-authored SVG as the first visual artifact when:

- the user explicitly requests SVG-only exploration
- no visual/image/design capability is available and the user accepts the
  lower-confidence path
- the SVG is already visually strong enough to pass the presentation gate

### Presentation Quality Gate

Reject or regenerate before showing the user when the first board looks like:

- squiggly line work
- MS Paint-style construction
- icon-library placeholders
- rough technical diagrams
- generic sync, settings, upload, widget, toolbar, or status icons
- text with an arbitrary symbol
- a set of near-identical layouts
- marks that need a written explanation to make sense

Check the board at normal viewing size and small preview size. If the mark
does not feel credible before explanation, do not ask the user to choose from
it.

Run one targeted regeneration when the first board has obvious correctable
problems. Name the failure modes in the second prompt, preserve the strongest
traits, and stop after that second pass unless the user asks to keep exploring.

## Concept Methods

Use these as concept anchors, not rigid templates.

### Monogram Plus Meaning

Combine one or two initials with a brand-relevant idea. The result should be a
mark, not a decorated letter.

Use when:

- the brand name or initials are distinctive
- the logo must work as a compact app icon or favicon
- the category can be expressed through structure, cuts, or geometry

### Product Action

Turn the product's main action into an abstract symbol.

Examples:

- build -> frame, scaffold, modular block, cursor
- protect -> boundary, shield, watch mark, protected center
- convert -> switch, transformation, passage, arrow-like flow
- speak -> waveform, pulse, speech path
- automate -> loop, handoff, path, sequence

### Metaphor Fusion

Combine two meaningful ideas into one reduced mark. Use at most two metaphors.

Good fusion is subtle and readable. Avoid literal collages.

### Negative-Space Symbol

Use subtraction, cutouts, counters, or protected empty space to create the
identity feature.

Use when the brand needs restraint, precision, or memorability from a simple
silhouette.

### Construction Geometry

Create the mark from a clear system: circles, grids, frames, diagonal cuts,
modular blocks, layered cards, orbital paths, or measured linework.

Use when the brand should feel technical, systematic, trustworthy, or precise.

### Directional Flow

Use repeated, curved, or directional elements that imply movement, transfer,
speed, or progress.

Use when the brand promise involves momentum, transformation, routing, or
workflow.

### Modular Node Or System Mark

Use two to five nodes or modules with intentional hierarchy and spacing.

Use when the brand relates to networks, orchestration, collaboration, systems,
or composability.

## Structural Categories

Concept sets should vary by structure, not only by metaphor.

Use these categories to force real difference:

| Category | What it explores | Useful when |
| --- | --- | --- |
| Wordmark | the brand name as the identity | the name has rhythm, distinct spelling, or verbal equity |
| Monogram | one or more letters as the mark | initials must work as an app icon or compact mark |
| Symbolic icon | one simplified object or scene | the category has a distinctive, ownable object |
| Abstract geometric mark | pure form, proportion, motion, or system | the brand should feel modern, technical, or broad |
| Letterform plus metaphor | a letter also carries a product idea | the name and concept can merge without clutter |
| Negative-space or dual-read mark | absence creates the identity feature | the brand should feel clever, precise, or memorable |

For four or more options, include at least three structural categories. If all
concepts use the same frame, line style, arrow, bracket, node, slot, or icon
grammar, the set is not meaningfully diverse.

## Concept Direction Table

```markdown
| Direction | Method | Structure | Brand Idea | Visual Logic | Strength | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| [Name] | [Method] | [Category] | [Meaning] | [Shape logic] | [Why promising] | [Concern] |
```

## Cliche Rejection

Reject first-pass symbols unless the brief explicitly asks for them and the
treatment adds a distinctive twist.

Common cliches:

- technology or developer tools: brackets, generic cursors, circuit traces,
  hexagons, random nodes, terminal prompts, sync arrows
- localization or translation: globe, speech bubbles, language letters,
  arrows between text blocks, flags
- finance: upward charts, dollar signs, bank columns, shields
- security: shields, locks, checkmarks, guarded centers
- health: hearts, crosses, leaves, human figures
- education: books, caps, lightbulbs, apples
- environmental: leaves, globes, trees, recycling arrows

Transform or replace cliches by:

- reducing the literal object to one memorable gesture
- combining it with a name or letterform
- using negative space instead of adding another symbol
- borrowing structure from a different but relevant domain
- removing everything except the strongest silhouette

## SVG Output Standards

Apply these after a visual direction has been selected or when the user has
explicitly asked for SVG-only work.

Prefer:

- `viewBox="0 0 100 100"` for standalone marks
- `currentColor` for single-color marks
- clean geometric primitives where practical
- readable grouping
- minimal path complexity
- transparent background
- stable line weights
- crisp negative space
- `xmlns="http://www.w3.org/2000/svg"` for standalone files
- root-level styling defaults when they reduce repetition safely
- shape primitives when they remain readable and maintainable
- paths for compound silhouettes, boolean cutouts, and portable final
  wordmarks
- `fill-rule="evenodd"` for simple negative-space compound paths

Avoid:

- hidden dependencies on external fonts for symbol marks
- inline raster images
- excessive filters and effects
- tiny details that fail at small sizes
- unlabelled color values when color is part of the concept
- multiple unrelated focal points
- nested transforms that hide the actual geometry
- editor metadata, hidden layers, or unused definitions
- hardcoded `width` and `height` unless a fixed-size export is required
- coordinate precision beyond what the design needs

Stroke width is relative to the viewBox. A stroke that looks balanced at
`100x100` may fail when copied to a `24x24` or `16x16` canvas. Inset stroked
forms enough to avoid clipping at the viewBox edge.

Use `currentColor` for flexible one-color marks. For hardcoded colored logos,
provide a dark-background variant when dark surfaces are in scope. CSS
inversion is acceptable for simple monochrome previews, not for production
colored logos.

## Variant Output Template

```markdown
## [Variant Name]

- **Method:** [concept method]
- **Brand idea:** [what the mark represents]
- **Best use:** [primary surface/use case]
- **Strength:** [why it works]
- **Risk:** [what may need refinement]
- **SVG:** [code block or file path]
```

## Browser Preview Checklist

When SVG/vector files are created, use a browser preview, generated HTML
artifact, or equivalent visual review before production handoff.

The review surface should include:

- all variants together for side-by-side comparison
- concept name and short rationale for each variant
- light background preview
- dark background preview when the logo may need it
- one-color preview when the mark should be flexible
- small-size samples such as `64x64`, `32x32`, and `16x16` when favicon or app
  icon use matters
- a large sample for balance, spacing, and proportion
- favicon or browser-tab mockup when small icon use matters
- simple navigation/header mockup when product UI use matters
- enough spacing around each mark to judge silhouette and balance

Keep the page plain. Avoid decorative presentation styles that make weak marks
look stronger than they are.

Fallback when browser preview is not available:

- provide SVG code blocks
- provide saved SVG or HTML artifact paths
- state which checks still need visual review

## Review Checklist

Before calling a logo direction strong, check:

- Was the design direction clarified before drawing?
- Was the first board visually credible before explanation?
- Is the concept structurally different from the other options?
- Is the silhouette recognizable quickly?
- Is there one clear focal point?
- Does the mark feel memorable rather than generic?
- Is the geometry or structure internally coherent?
- Does the rationale precede the shape, instead of feeling post-rationalized?
- Can the mark work in one color?
- Can it work on light and dark backgrounds?
- Does it still work at `16x16` when that use case matters?
- Does the favicon-safe variant preserve the identity?

## Failure Signs

Reject or rework when:

- raw SVG files were created before a brief, direction choice, concept table, or
  visual concept board
- the first visual iteration looks like an implementation sketch
- the mark depends on tiny details
- the mark needs explanatory text to be understood
- there are multiple competing focal points
- the form feels crowded
- the idea is a generic category icon
- the concept is decorative rather than meaningful
- variants are only spacing, color, or rotation tweaks
- the mark resembles a famous or competitor logo too closely
- the mark reads as a UI control, toolbar icon, settings icon, sync icon,
  upload/download icon, or status indicator instead of a brand asset
- all variants share the same frame, arrow, bracket, line, node, slot, or
  rounded-app-icon vocabulary
- the hand-authored geometry is valid SVG but not a visually credible logo

## Favicon-Safe Checklist

For favicon, app icon, package icon, or small social-avatar use:

- remove text
- use the strongest symbol only
- enlarge the dominant silhouette
- simplify counters and cutouts
- thicken strokes
- reduce color count
- test in one color
- check legibility at `16x16`

## Handoff Checklist

For asset production, preserve:

- selected SVG master
- favicon-safe SVG variant when needed
- rationale for the selected direction
- color assumptions
- usage constraints
- open decisions
- required exports: SVG, PNG, ICO, favicon, social avatar, app icon, or other
```
