# Transparent PNGs

Use this workflow when the main problem is creating, cleaning up, exporting,
or validating transparent PNG brand assets.

This workflow produces or validates PNG transparency. It does not own logo
generation, SVG master selection, ICO packaging, or legal/trademark review.

## Ownership

This workflow owns:

- transparent PNG intake and source inspection
- alpha-channel validation
- edge and matte-fringe review
- transparent export handoff guidance
- preserving original source files

This workflow does not own:

- logo concepting; use `workflows/logo-generation.md`
- SVG readiness; use `references/svg-readiness.md`
- favicon/ICO packaging; use `workflows/png-ico-conversion.md`
- PNG-to-SVG conversion decisions; use `references/vectorization-suitability.md`

## Workflow

Work through these steps in order:

1. Inspect the available source asset.
2. Clarify the transparent PNG target.
3. Create or prepare the PNG.
4. Validate alpha behavior.
5. Review on multiple backgrounds.
6. Hand off to favicon, ICO, or brand-kit workflows when needed.

## Step 1: Inspect Source

Use the best available source:

- SVG master
- high-resolution PNG
- original design export
- generated raster image
- screenshot or low-resolution fallback only when no better source exists

Preserve the user's originals. Do not overwrite source files.

## Step 2: Clarify Target

Capture or infer:

- desired dimensions
- transparent background expectation
- target surfaces: website, app, deck, social, favicon, marketplace, or print
- whether edge quality matters on light, dark, or colored backgrounds
- whether this PNG is an intermediate asset for ICO or favicon work

Ask only for missing constraints that affect export or validation.

## Step 3: Create Or Prepare PNG

Prefer exporting from a clean SVG or design source when available.

When a generated image claims to be transparent, do not trust the preview
alone. Raster outputs often fake transparency with a baked checkerboard or
matte color.

Use `references/png-transparency-validation.md` before calling an output
transparent.

## Step 4: Validate Alpha

Use `scripts/png_alpha_check.py` when a local PNG is available and Pillow is
installed:

```bash
python3 skills/chrisai-branding/scripts/png_alpha_check.py path/to/asset.png
```

Check:

- alpha channel exists
- corners or expected empty regions are transparent
- transparency is not only simulated by a checkerboard
- semi-transparent edges are intentional
- there is no obvious matte fringe

If Pillow is unavailable, state that the scripted alpha check could not be run
and perform a manual review from available previews.

## Step 5: Review Backgrounds

Inspect the PNG on:

- white
- black
- mid-tone or brand-color background

Reject or rework when:

- corners are opaque when they should be empty
- checkerboard is baked into the raster
- halo/fringe appears on dark or light backgrounds
- edge pixels look cut out badly at intended size

## Step 6: Handoff

End with the next useful step:

- use `workflows/png-ico-conversion.md` when a favicon or ICO is needed
- use `references/master-format-selection.md` when deciding whether SVG or PNG
  should be the master asset
- use `workflows/brand-visual-guidelines.md` when transparent asset usage
  rules need to be documented
