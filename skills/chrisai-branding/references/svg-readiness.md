# SVG Readiness

An SVG output is only useful as a master when it behaves like a clean vector
asset, not just when it opens in a viewer.

## Good SVG Master Signs

Prefer the SVG as master when it has:

- a correct `viewBox`
- sensible bounds and centering
- shape/path structure that matches the visible artwork
- no accidental raster embed for a task that expects true vector
- acceptable legibility at both large and small preview sizes

## Warning Signs

Be cautious when the SVG has:

- huge numbers of tiny paths for a simple mark
- clipped fragments that suggest a poor conversion
- embedded bitmap data when the user expects clean vector output
- fuzzy or overly complex shape edges that would be easier to keep in PNG
- tiny decorative detail that will collapse in favicon use

## Operational Rule

If the SVG is only being used as an intermediate export and the real quality is
in the PNG source, do not pretend the asset has become a good vector master.

Keep PNG as the master unless the SVG can be maintained as a real vector asset.
