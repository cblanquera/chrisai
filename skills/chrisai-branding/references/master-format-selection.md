# Master Format Selection

Choose the master format before doing any conversion work.

## Logo Workflow Rule

For generated logo work, SVG is the required working format from the first
selectable candidate through explicit approval. Every concept and refinement
must remain a real editable SVG; do not use PNG as a candidate, refinement
baseline, or visual master, and do not embed raster data inside an SVG. Create
PNG and other raster derivatives only after the user approves the SVG logo.

If a proposed logo direction cannot be represented faithfully as SVG, retain
the raster only as exploratory reference and stop to explain the limitation.
Do not silently switch the logo workflow to a PNG master.

Use the remaining format-selection guidance for non-logo brand assets and for
evaluating imported source material.

## Prefer SVG Master

Use SVG as the master when the asset is:

- geometric
- flat-colored
- logo-like
- iconographic
- silhouette-based
- expected to scale across many sizes

Typical SVG-master cases:

- brand marks
- simple logos
- favicons with clean shapes
- low-color badges
- UI icons

Benefits:

- sharp scaling
- easier color edits
- better downsampling for favicon packaging
- smaller and cleaner deliverables for simple shapes

## Prefer PNG Master

Use PNG as the master when the asset is:

- textured
- painterly
- photographic
- soft-edged
- cutout-based
- not realistically vectorizable

Typical PNG-master cases:

- object cutouts
- painted badges
- textured illustrations
- glow-heavy marks
- translucent or soft-shadow assets

Benefits:

- preserves texture and soft edges
- matches non-vector source behavior
- avoids fake precision from poor vectorization

## Never Use ICO As Master

ICO is a delivery format only.

Use it only after the real master is validated. For a logo, the approved master
is SVG. For another brand asset, the master may be SVG or PNG according to the
criteria above.

## Favicon-Specific Guidance

Even when the main asset is valid, it may still be a poor favicon source.

If the full mark contains:

- small text
- thin linework
- fine interior detail
- multiple nested counters
- weak silhouette contrast

make a dedicated favicon variant instead of shrinking the original unchanged.
