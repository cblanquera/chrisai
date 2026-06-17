# PNG And ICO Conversion

Use this workflow when the main problem is converting PNG files to ICO files,
producing favicon-oriented files, previewing small icon output, or inspecting
ICO/PNG conversion readiness.

This workflow owns conversion and small-format QA. It does not own logo
generation, transparent-background cleanup, HTML-head strategy, or legal
clearance.

## Ownership

This workflow owns:

- PNG-to-ICO packaging
- favicon-safe preview review
- SVG/PNG favicon strip review
- small-format simplification guidance
- conversion handoff notes

This workflow does not own:

- logo concepting; use `workflows/logo-generation.md`
- transparent PNG preparation; use `workflows/transparent-pngs.md`
- HTML-head icon markup strategy; use `references/html-head-icons.md`
- full brand asset guidelines; use `workflows/brand-visual-guidelines.md`

## Workflow

Work through these steps in order:

1. Confirm source and target.
2. Check whether the source is favicon-safe.
3. Preview at `16x16`.
4. Convert PNG to ICO when ready.
5. Hand off HTML-head or asset guidance when needed.

## Step 1: Confirm Source And Target

Capture or infer:

- source file path
- desired output file path
- whether source is SVG or PNG
- whether the deliverable is an ICO favicon, PNG icon, or review preview

Treat only `16x16` as favicon output in this workflow. If the user needs larger
icons, handle them as PNG icon assets rather than favicon sizes.

## Step 2: Check Favicon Readiness

Read `references/favicon-qa.md` before packaging.

Check whether the source depends on:

- text
- thin strokes
- nested details
- low-contrast interior shapes
- multiple competing focal points

If the source fails small-size review, route back to `workflows/logo-generation.md`
for a favicon-safe variant or simplify the asset before conversion.

## Step 3: Preview Small Output

Use `scripts/favicon_preview.py` for PNG preview sheets when Pillow is
available:

```bash
python3 skills/chrisai-branding/scripts/favicon_preview.py \
  path/to/source.png \
  path/to/favicon-preview.png
```

Use `scripts/svg_favicon_strip.py` to create a simple `16x16` HTML review
strip for SVG or PNG inputs:

```bash
python3 skills/chrisai-branding/scripts/svg_favicon_strip.py \
  path/to/favicon-strip.html \
  path/to/source.svg
```

Review the output at actual size. Do not approve the favicon because the large
source looks good.

## Step 4: Convert PNG To ICO

Use `scripts/png_to_ico.py` when Pillow is available:

```bash
python3 skills/chrisai-branding/scripts/png_to_ico.py \
  path/to/source.png \
  path/to/favicon.ico
```

If Pillow is unavailable, state that conversion could not be run locally and
give the exact command to run after installing Pillow.

## Step 5: Handoff

End with the next useful step:

- use `references/html-head-icons.md` when the user needs HTML `<head>` icon
  markup guidance
- use `workflows/transparent-pngs.md` if the PNG alpha channel or edge quality
  is questionable
- use `workflows/brand-visual-guidelines.md` if icon usage rules need to be
  documented
