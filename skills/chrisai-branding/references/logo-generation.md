# Logo Generation Reference

Use this reference when `workflows/logo-generation.md` needs concept methods,
output structure, SVG standards, or review checklists.

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

## Concept Direction Table

```markdown
| Direction | Method | Brand Idea | Visual Logic | Strength | Risk |
| --- | --- | --- | --- | --- | --- |
| [Name] | [Method] | [Meaning] | [Shape logic] | [Why promising] | [Concern] |
```

## SVG Output Standards

Prefer:

- `viewBox="0 0 100 100"` for standalone marks
- `currentColor` for single-color marks
- clean geometric primitives where practical
- readable grouping
- minimal path complexity
- transparent background
- stable line weights
- crisp negative space

Avoid:

- hidden dependencies on external fonts for symbol marks
- inline raster images
- excessive filters and effects
- tiny details that fail at small sizes
- unlabelled color values when color is part of the concept
- multiple unrelated focal points

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

When a browser plugin or browser-preview capability is available, use it to
show SVG drafts before direction selection.

The review surface should include:

- all variants together for side-by-side comparison
- concept name and short rationale for each variant
- light background preview
- dark background preview when the logo may need it
- one-color preview when the mark should be flexible
- small-size samples such as `64x64`, `32x32`, and `16x16` when favicon or app
  icon use matters
- enough spacing around each mark to judge silhouette and balance

Keep the page plain. Avoid decorative presentation styles that make weak marks
look stronger than they are.

Fallback when browser preview is not available:

- provide SVG code blocks
- provide saved SVG or HTML artifact paths
- state which checks still need visual review

## Review Checklist

Before calling a logo direction strong, check:

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

- the mark depends on tiny details
- the mark needs explanatory text to be understood
- there are multiple competing focal points
- the form feels crowded
- the idea is a generic category icon
- the concept is decorative rather than meaningful
- variants are only spacing, color, or rotation tweaks
- the mark resembles a famous or competitor logo too closely

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
