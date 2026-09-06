# SVG Readiness

An SVG output is only useful as a master when it behaves like a clean vector
asset, not just when it opens in a viewer.

## Good SVG Master Signs

Prefer the SVG as master when it has:

- a correct `viewBox`
- `xmlns="http://www.w3.org/2000/svg"` when stored as a standalone file
- sensible bounds and centering
- shape/path structure that matches the visible artwork
- no accidental raster embed for a task that expects true vector
- acceptable legibility at both large and small preview sizes
- no clipping from strokes or shapes that touch the viewBox edge
- no unresolved `defs`, `clipPath`, `mask`, `filter`, or gradient references
- no editor metadata, hidden layers, or unused exported cruft
- no font dependency for a final distributed wordmark unless the runtime font
  is guaranteed
- color behavior that is intentional on light, dark, and one-color surfaces

## Warning Signs

Be cautious when the SVG has:

- huge numbers of tiny paths for a simple mark
- clipped fragments that suggest a poor conversion
- embedded bitmap data when the user expects clean vector output
- fuzzy or overly complex shape edges that would be easier to keep in PNG
- tiny decorative detail that will collapse in favicon use
- hardcoded dark colors that disappear on dark backgrounds
- excessive nested transforms that make the visible geometry hard to maintain
- `width` or `height` values that fight responsive scaling without a fixed-size
  export reason
- `text` nodes in a final portable logo where exact rendering matters
- shape density or stroke weights that make the mark read as a UI icon instead
  of a brand asset

## Operational Rule

If the SVG is only being used as an intermediate export and the real quality is
in a PNG source, do not pretend the asset has become a good vector master.

For non-logo brand assets, keep PNG as the master unless the SVG can be
maintained as a real vector asset.

For logo work, PNG may remain an exploratory reference, but it cannot become a
selectable candidate or refinement baseline. If a faithful real-vector SVG
cannot be made, stop and explain the limitation. Do not use an SVG wrapper with
an embedded bitmap as a workaround.

A clean logo SVG is still only a working candidate until the user explicitly
approves it. It must also pass visual review for silhouette, memorability,
small-size use, light/dark surfaces, and brand fit before it becomes the
approved logo master. Create PNG derivatives only after that approval.
