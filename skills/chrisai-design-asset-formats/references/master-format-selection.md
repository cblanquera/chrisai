# Master Format Selection

Choose the master format before doing any conversion work.

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

Use it only after the real master is validated. The master should be either SVG
or PNG.

## Favicon-Specific Guidance

Even when the main asset is valid, it may still be a poor favicon source.

If the full mark contains:

- small text
- thin linework
- fine interior detail
- multiple nested counters
- weak silhouette contrast

make a dedicated favicon variant instead of shrinking the original unchanged.
