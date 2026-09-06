# Banner And Social Graphics

Create a single-message graphic for an article, social post, campaign moment,
or editorial feature.

## 1. Define The Job

Identify:

- the one message the graphic must communicate
- the destination and viewing context
- the required text, if any
- the audience
- the visual tone and available brand assets
- the required crop, aspect ratio, or output type

When a supplied logo or other protected brand asset must appear, read
`../references/protected-brand-assets.md` and treat its source file as an
immutable production input.

If dimensions are not specified, use `../references/visual-formats.md` to
choose an aspect ratio from the destination.

## 2. Choose The Composition

Use one dominant focal point and a clear reading order. Decide whether the
graphic should be:

- image-led, with little or no text
- headline-led, with supporting imagery
- typographic, where the message itself is the visual
- symbolic, using one metaphor or object
- modular, using a small set of supporting elements

Do not place every idea from the source into one banner.

## 3. Write The Visual Specification

Before rendering, define:

- canvas and safe crop
- focal subject or visual metaphor
- hierarchy and placement
- exact on-image text
- palette, typography, and brand treatment
- negative space requirements
- protected-asset placement, clearspace, and background treatment
- elements to avoid
- export format and variants

Keep generated text minimal. When exact typography is important, use a
controllable composition medium rather than asking a raster generator to draw
long copy.

## 4. Render The Visual Plate

Use the best available capability described in the parent skill. If rendering
is unavailable, provide the final specification or prompt in a form another
designer or image tool can execute directly.

When a protected brand asset is required, render the visual plate without that
asset or any invented substitute. Reserve the specified safe region and use
the generator for the scene, illustration, texture, or other non-protected
artwork only.

For cross-channel use, create intentional variants from the same visual system
instead of cropping away the focal point or headline.

## 5. Assemble Protected Assets

Place every protected brand asset from its canonical file through a
deterministic composition medium. Preserve aspect ratio and apply only the
transformations allowed by its placement specification. Keep the source asset,
visual plate, and placement specification separate while revisions remain
likely.

If deterministic assembly is unavailable, return the unbranded plate and
placement specification instead of asking a generator to recreate the mark.

## 6. Review

Apply `../references/visual-review.md`. Inspect the actual output at full size
and at the approximate feed or article-preview size.

Verify that the message reads quickly, required text is correct, the crop is
safe, contrast is sufficient, and the graphic supports rather than repeats the
entire accompanying post.

For protected brand assets, apply the binary verification gate in
`../references/protected-brand-assets.md` before accepting the first candidate
or promoting it as a revision baseline.

If feedback requests changes to the rendered graphic, use
`../references/iterative-editing.md` instead of treating the next attempt as a
fresh generation. Return to the earlier workflow steps only when the feedback
reopens the message, composition, format, or visual direction.
