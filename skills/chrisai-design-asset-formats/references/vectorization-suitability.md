# Vectorization Suitability

PNG-to-SVG conversion is not automatically an upgrade.

Use vectorization only when the raster source is already close to vector-like.

## Good Candidates

Good PNG-to-SVG candidates usually have:

- strong silhouette separation
- few colors
- clean flat fills
- limited or no gradients
- little or no texture

Common good cases:

- black-and-white icons
- simple flat logos
- badges with broad shape regions
- stencil-like artwork

## Poor Candidates

Avoid PNG-to-SVG conversion when the source has:

- photo content
- brush texture
- soft shading
- transparency-heavy edges
- glow effects
- shadows
- anti-aliased text or screenshots
- hair, fur, smoke, liquids, or glass

## Decision Rule

Ask one question:

Would a designer reasonably maintain this as vector after conversion?

If the answer is no, keep the asset as PNG and explain why.
