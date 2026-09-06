# Protected Brand Assets

Use this reference when a supplied logo, wordmark, lockup, seal, partner mark,
certification mark, or comparable brand identifier must appear in a graphic.
The canonical asset file is the source of truth. A written specification
controls how that file is used; it does not replace the file or authorize a
model to recreate it.

## Immutable Asset Contract

- Do not ask a generative model to redraw, trace, restyle, or bake the asset
  into the image.
- Use generation for a logo-free visual plate, then place the canonical asset
  through a deterministic vector, canvas, slide, HTML/CSS, or raster
  compositing capability.
- Preserve the asset's geometry, proportions, orientation, colors, internal
  spacing, transparency, and wordmark casing.
- Uniform scaling is allowed when needed for placement. Cropping, stretching,
  skewing, rotation, recoloring, effects, opacity changes, and alternate blend
  modes require explicit approval or an authoritative brand rule.
- Do not treat a visually similar reconstruction as acceptable.

## Preflight The Asset

Inspect the actual source file before designing around it. Record only the
fields relevant to the asset and destination:

```text
Protected asset: <canonical name>
Source: <file path or URL>
Role: <primary logo, wordmark, partner mark, seal, or other>
Variant: <exact supplied or approved variant>
Format and native size: <format, width x height>
Transparency: <yes, no, or unknown>
Source verification: <checksum when useful and file-backed>
Usage mode: <flat overlay or environmental application>

Placement:
- anchor: <top-left, centered, or explicit coordinates>
- display size: <width and height, preserving aspect ratio>
- safe area and clearspace: <known brand rule or stated assumption>
- background treatment: <approved contrast or neutral holding field>

Allowed changes:
- <normally uniform scaling only>

Prohibited changes:
- redraw, crop, stretch, skew, rotate, recolor, effects, transparency changes

Acceptance:
- canonical file is placed deterministically
- geometry and appearance match the source
- placement is legible, uncropped, and free of duplicate or invented marks
```

If official variant, clearspace, minimum-size, or background rules are
available, use them. If they are unavailable, preserve the supplied file as-is
and state conservative placement assumptions instead of inventing brand rules.
When the supplied variant lacks contrast against the composition, change the
surrounding layout or add a neutral holding field; do not recolor the asset.

## Separate Generation From Assembly

Use a two-stage pipeline for flat banner, cover, social, and editorial logo
placement:

1. Design the layout and reserve a logo-safe region.
2. Generate or edit the visual plate without the logo, company wordmark, or
   logo-like substitute.
3. Reject a plate that invents a brand mark in the protected region or scene.
4. Place the canonical asset as a separate layer using the recorded placement
   specification.
5. Export the assembled candidate and verify it against the source asset.

When Node.js is available, `../scripts/compose-brand-asset.mjs` can create a
self-contained SVG from a visual plate and canonical asset without third-party
packages. It embeds the original asset bytes, preserves aspect ratio, and can
add an optional contrast panel. For example:

```text
node <skill-dir>/scripts/compose-brand-asset.mjs \
  --base <plate.png> --asset <logo.png> --out <candidate.svg> \
  --canvas-width 1600 --canvas-height 900 \
  --x 72 --y 72 --width 320 --height 124
```

Use an available browser, vector renderer, or raster compositor when a PNG or
JPEG export is required. Do not send the assembled SVG back through a
generative model merely to change its format.

Do not provide the logo to the image generator merely so it can reproduce the
mark. It may be inspected separately for variant selection, contrast, and
placement planning. If it is also needed as a color or style reference, label
that limited role explicitly, instruct the model not to render it, and still
perform final placement from the canonical file.

## Revisions

Keep the visual plate, protected asset, and placement specification separate
for as long as revisions remain likely.

- Edit the visual plate without the protected asset whenever practical.
- Reassemble every candidate from the current plate and the same canonical
  asset instead of editing a flattened logo repeatedly.
- A generated approximation must never become the protected-asset baseline.
- If an existing flattened graphic contains a bad logo, remove or rebuild that
  region before placing the canonical asset. Do not stack the correct logo over
  a visible approximation.

## Flat And Environmental Uses

A flat overlay can preserve the source geometry through ordinary deterministic
composition. A logo placed on angled packaging, clothing, signage, or another
three-dimensional surface requires a deliberate perspective transform and
may also need lighting or material integration. Use a deterministic transform
when exact artwork matters and record that transformation as approved. If the
available capability can only regenerate the scene, state that exact fidelity
cannot be guaranteed and do not claim the result is an unchanged logo.

## Verification Gate

Treat protected-asset fidelity as pass or fail:

- correct canonical file and variant
- preserved aspect ratio, geometry, orientation, colors, alpha, and casing
- no crop, distortion, unauthorized effect, or unintended transparency
- sufficient contrast, safe crop, and clearspace
- no duplicate, residual, approximate, or invented brand mark
- placement matches the recorded anchor and dimensions

If deterministic placement cannot be completed, deliver the unbranded plate,
canonical asset, and placement specification as separate artifacts. Do not
label an approximate generated mark as production-ready.
