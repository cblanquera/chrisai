---
name: chrisai-design-asset-formats
description: Use when Codex needs to create, convert, validate, or package SVG, PNG, and ICO design assets, especially for prompt-to-PNG, prompt-to-SVG, PNG-to-SVG, SVG-to-PNG, PNG-to-ICO, and SVG-to-ICO workflows where transparency correctness, master-format choice, and favicon-safe output matter.
---

# ChrisAI Design Asset Formats

Use this skill when the main problem is asset-format production rather than
creative direction.

This skill owns format choice, transparency correctness, conversion flow, and
delivery QA for small design assets such as logos, icons, cutouts, badges, and
favicons.

## Ownership

This skill owns:

- master-format selection for SVG, PNG, and ICO deliverables
- prompt-to-PNG and prompt-to-SVG asset creation
- PNG-to-SVG and SVG-to-PNG conversion decisions
- PNG-to-ICO and SVG-to-ICO packaging
- temporary SVG prompt artifacts for design-oriented generation workflows
- transparency validation for raster outputs
- favicon-specific simplification and QA

This skill does not own:

- brand strategy or creative-direction exploration
- broad homepage or visual-system design
- HTML, CSS, or JavaScript implementation
- browser QA for rendered pages

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
task is mainly about concept direction, brand feel, or visual-system choices.

Use [`chrisai-design-logo-generator`](../chrisai-design-logo-generator/SKILL.md)
when the task is mainly about logo ideation, logo mark refinement, or
favicon-safe logo variants before format export work.

Use [`chrisai-coding-html-css`](../chrisai-coding-html-css/SKILL.md) when the
work moves into implementation.

## Workflow

Work through these steps in order:

1. classify the asset and requested transformation
2. choose the master format
3. create or validate the source asset
4. convert or package the output
5. run delivery QA before treating the asset as final

Do not jump straight to export until the master format is justified.

Use the bundled scripts when they remove repeated setup work:

- `scripts/make_svg_artifact.py`
- `scripts/inspect_svg.py`
- `scripts/prepare_logo_export.py`
- `scripts/favicon_preview.py`
- `scripts/png_alpha_check.py`
- `scripts/svg_favicon_strip.py`
- `scripts/svg_variant_sheet.py`
- `scripts/rasterize_svg.py`
- `scripts/png_to_ico.py`

If a requested script depends on a local Python library that is not installed,
ask the user whether they want to install it. If they decline, stop that path
cleanly instead of pretending the conversion succeeded.

Before relying on a Python helper, resolve a working Python runtime for the
current OS. On Windows, do not assume `python3` exists; check `python`, `py`,
project wrappers, or `local-environment` as appropriate.

## Step 1: Classify The Request

Start by identifying both the asset class and the requested operation.

Common asset classes:

- logo mark
- favicon candidate
- flat icon or badge
- transparent cutout
- textured illustration
- simple vector-friendly graphic

Supported operations:

- prompt to PNG
- prompt to SVG
- PNG to SVG
- SVG to PNG
- PNG to ICO
- SVG to ICO

If the request combines multiple operations, identify the master asset first
and treat later formats as derived deliverables.

## Step 2: Choose The Master Format

Use [master-format-selection](references/master-format-selection.md) before
creating or converting anything.

Default rules:

- prefer SVG as the master for geometric, flat, logo-like, or iconographic
  work
- prefer PNG as the master for painterly, textured, photographic, cutout, or
  soft-edged work
- never treat ICO as a master format
- never trust prompt-only transparency claims without validation

If the source is too detailed for a good `16x16` favicon, create a simplified
favicon variant instead of shrinking the main asset blindly.

## Step 3: Create Or Validate The Source

### Prompt To PNG

Use the system `imagegen` skill for raster generation.

If transparency is requested, generate a large source on a removable flat
chroma-key background, then validate and clean the result. Read
[png-transparency-validation](references/png-transparency-validation.md) before
calling a raster output transparent.

Never describe a raster output as transparent unless the file actually has
alpha and passes edge checks.

### Prompt To SVG

Use prompt-to-SVG only for vector-friendly assets such as:

- simple logos
- flat badges
- monochrome or low-color icons
- clean silhouettes

Read [svg-readiness](references/svg-readiness.md) to confirm the output is
actually fit to be an SVG master.

Do not force prompt-to-SVG for soft gradients, textures, photos, or highly
organic shapes.

If the request is creative-design oriented but the downstream model is still
raster-first, create a temporary SVG prompt artifact first, then rasterize it
to PNG for use as a reference image when needed. Read
[prompt-artifacts](references/prompt-artifacts.md) for that flow.

### Existing Source Validation

Before converting an existing asset:

- check whether the source is already a good master
- reject checkerboard pixels baked into PNG files
- reject SVG files that embed unintended raster artwork when the task expects a
  clean vector master

## Step 4: Convert Or Package The Output

### PNG To SVG

Read [vectorization-suitability](references/vectorization-suitability.md)
first.

Only convert PNG to SVG when the source is simple enough to survive
vectorization cleanly.

Good candidates:

- monochrome icons
- flat logos
- high-contrast silhouettes
- low-color badges

Poor candidates:

- photos
- textured illustrations
- anti-aliased screenshots
- gradients and soft shadows
- hair, fur, smoke, or translucent edges

If vectorization would produce junk, say so directly and keep PNG as the
master.

### SVG To PNG

Export SVG to PNG only after the SVG master is clean, centered, and sized for
the target use.

Set explicit output dimensions and preserve transparency when the use case
requires it.

### ICO Packaging

Read [favicon-qa](references/favicon-qa.md) before producing ICO output.

Rules:

- do not generate an ICO directly from prompt unless the user only wants a
  rough concept
- derive ICO from a validated SVG or PNG master
- treat only `16x16` as favicon output in this workflow
- treat larger icon assets as PNG icons rather than extra favicon sizes
- check legibility at actual size, not only zoomed previews

## Step 5: Run Delivery QA

Before treating any asset as final, confirm:

- the chosen master format still makes sense
- transparency claims are real, not simulated
- derived PNGs have clean edges and usable padding
- derived SVGs are structurally plausible and visually clean
- favicon output remains legible at `16x16`
- any larger icon deliverables are handled as PNG icons, not favicon sizes

If the asset fails at `16x16`, simplify it or create a dedicated favicon
variant. Do not call the export finished just because a large preview looks
good.

## Hard Rules

- Never call a PNG transparent unless alpha is verified.
- Never trust a checkerboard-looking background as proof of transparency.
- Never force PNG-to-SVG conversion for complex raster art.
- Never use ICO as the master format.
- Never assume the main logo can be shrunk directly into a good favicon.
- Always allow a dedicated favicon variant when the source is too detailed.

## References

Read these references only when they apply:

- [master-format-selection](references/master-format-selection.md):
  choosing SVG or PNG as the master
- [png-transparency-validation](references/png-transparency-validation.md):
  raster alpha checks and fake-transparency rejection
- [svg-readiness](references/svg-readiness.md): checking whether an SVG output
  is fit to be a master
- [vectorization-suitability](references/vectorization-suitability.md):
  deciding whether PNG-to-SVG is appropriate
- [favicon-qa](references/favicon-qa.md): small-size icon export and review
- [html-head-icons](references/html-head-icons.md): favicon versus PNG icon
  usage in the HTML head
- [prompt-artifacts](references/prompt-artifacts.md): temporary SVG guides for
  design-oriented prompts
