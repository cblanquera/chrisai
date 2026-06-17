# Prompt Artifacts

When a request sounds like graphic design or creative design work, it is often
useful to create a temporary SVG artifact before the final asset exists.

This does not magically force a model to output better SVG. It creates a
structured visual reference that can guide later generation or conversion.

## When To Use A Temporary SVG Artifact

Use a temporary SVG artifact when the request benefits from a designed guide
rather than a text-only prompt, for example:

- logo exploration
- badge composition
- icon silhouette studies
- layout and balance checks for a mark
- palette and motif studies

## What The Artifact Should Do

The temporary SVG should help communicate:

- composition
- silhouette
- palette intent
- text placement, if any
- spacing and emphasis

Do not mistake the artifact for the final deliverable unless it is already good
enough to be maintained as the master.

## Operational Flow

The reliable flow is:

1. create a temporary SVG guide
2. inspect it
3. use it directly if it is already good enough
4. otherwise rasterize it to PNG and send that as the visual prompt artifact
   for raster-first generation tools
5. continue with the real asset workflow

## Script Usage

Use `scripts/make_svg_artifact.py` to create the temporary SVG.

Use `scripts/inspect_svg.py` to inspect an SVG for viewBox, dimensions, and
embedded raster content.

Use `scripts/rasterize_svg.py` only when a PNG reference is needed. That script
requires `cairosvg` locally; if it is unavailable, fall back to another local
rasterization path only after asking the user whether they want to install the
dependency. If they say no, cancel that branch cleanly.

Use `scripts/png_to_ico.py` only when ICO packaging is needed. That script
requires `Pillow` locally; if it is unavailable, ask the user whether they want
to install it. If they say no, cancel that branch cleanly.

## Dependency Notes

`cairosvg` and `Pillow` are common Python libraries.

- `cairosvg` is a common local choice for SVG-to-PNG rasterization
- `Pillow` is the standard Python imaging library used for PNG and ICO work

They are common enough to rely on as optional helpers, but not universal enough
to assume they are already installed on every machine.
