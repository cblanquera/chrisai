# Brand Asset Audit

Use this workflow when the main problem is auditing existing brand asset files
for quality, completeness, master-format readiness, transparency, favicon
readiness, export gaps, or implementation handoff.

This workflow produces an asset audit, not new logo concepts, visual identity
strategy, or final export packages.

## Ownership

This workflow owns:

- brand asset inventory
- master-file recommendations
- logo, SVG, PNG, transparency, and favicon readiness checks
- export and format gap identification
- next-action recommendations

This workflow does not own:

- logo concept generation; use `workflows/logo-generation.md`
- transparent PNG preparation; use `workflows/transparent-pngs.md`
- ICO packaging; use `workflows/png-ico-conversion.md`
- broad brand kit review; use `workflows/brand-kit-audit.md`

## Workflow

Work through these steps in order:

1. Inventory available assets.
2. Identify likely master files.
3. Run objective inspections where useful.
4. Check format-specific readiness.
5. Produce the audit and next actions.

## Step 1: Inventory Assets

Inspect available files before making claims. Look for:

- SVG logos and marks
- PNG exports
- ICO/favicon files
- source files or design exports
- color, type, or token files
- brand guides or usage notes

Preserve originals. Do not rewrite, flatten, convert, or overwrite assets
during an audit unless the user explicitly asks.

## Step 2: Identify Masters

Use `references/master-format-selection.md` to decide whether SVG, PNG, or
another source should be treated as the working master.

Prefer SVG masters for simple logo-like assets when the SVG is clean and real.
Treat low-resolution PNGs, screenshots, and baked-background exports as weaker
sources.

## Step 3: Run Inspections

Use bundled scripts when local files are available:

- `scripts/analyze-logo.py` for SVG/PNG logo evidence
- `scripts/prepare_logo_export.py` for SVG export-prep guidance
- `scripts/inspect_svg.py` for SVG inspection
- `scripts/png_alpha_check.py` for PNG transparency checks
- `scripts/favicon_preview.py` or `scripts/svg_favicon_strip.py` for favicon
  review aids

If dependencies such as Pillow are unavailable, state which checks could not
run and provide the command the user can run later.

## Step 4: Check Readiness

Review:

- master format
- SVG cleanliness and viewBox
- embedded text or raster content
- PNG alpha channel and matte/edge quality
- favicon readability at `16x16`
- required export formats
- naming consistency
- duplicate or stale assets
- accessibility concerns such as contrast and legibility

Use relevant references:

- `references/svg-readiness.md`
- `references/png-transparency-validation.md`
- `references/favicon-qa.md`
- `references/html-head-icons.md`
- `references/vectorization-suitability.md`

## Step 5: Produce Audit

Output:

- asset inventory
- recommended master files
- quality findings
- export gaps
- risks and unknowns
- recommended next actions

Use this compact table when useful:

| Asset | Role | Current Format | Finding | Risk | Next Action |
| --- | --- | --- | --- | --- | --- |
| [file] | [logo/favicon/etc.] | [SVG/PNG/ICO] | [finding] | [risk] | [action] |

End by routing implementation work to the relevant asset workflow.
