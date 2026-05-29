# PNG Transparency Validation

Do not trust prompt wording or preview appearance alone.

Raster outputs often simulate transparency by drawing a checkerboard pattern or
filling the background with a solid color that still looks removable to a human
at a glance.

## Validation Goals

Before calling a PNG transparent, confirm all of these:

- the file actually contains an alpha channel
- border or corner pixels are truly transparent where expected
- no checkerboard pattern is baked into the image
- the subject edge does not have obvious color spill or matte fringe

## Failure Cases

Reject the output as not transparent when:

- the background is a visible checker pattern inside the raster
- the corners are opaque when they should be empty
- transparency only appears in a preview UI but not in the file
- the edge matte leaves a visible halo that would fail on dark or light
  backgrounds

## Operational Rule

If the built-in image workflow is used for a transparent request:

1. generate a large source on one flat chroma-key background
2. remove the key color locally
3. validate the resulting alpha
4. only then treat the PNG as a transparent deliverable

## Review Checks

Inspect the PNG on at least:

- a white background
- a black background
- a mid-tone background

If the edge breaks down badly on one of those surfaces, it is not ready.
