# Iconography Calibration Test

This artifact tests `chrisai-iconography` with four familiar UI icons under the
Lucide-compatible profile.

## Creation Decision

All four requested concepts already exist in Lucide. The test therefore follows
the skill's reuse-before-invention rule and packages the canonical Lucide SVG
geometry instead of producing visually similar duplicates.

The repository's wireframe inventory already contains Lucide-derived `file`
and `settings` geometry. Current upstream sources were checked for all four
canonical names before creating this test package.

## Profile

- Canvas: `24 × 24`
- Live area: at least 1 coordinate unit from the edge
- Style: outline
- Stroke: `2`, centered
- Caps and joins: round
- Color: `currentColor`
- Source format: standalone editable SVG
- Review sizes: `16`, `20`, `24`, `32`, and `48` pixels
- Themes: light and dark

## Semantic Inventory

| Name | Depicts | Primary use case | Avoid confusing with |
| --- | --- | --- | --- |
| `file` | Blank document sheet | Representing a generic file or document | A text document or file type |
| `cog` | Mechanical cog | Opening settings, preferences, or configuration | A sun, loader, or progress state |
| `coffee` | Steaming handled cup | Representing coffee, a hot drink, or a break | An empty cup or restaurant generally |
| `plug` | Two-prong electrical plug | Representing power or an electrical connection | A software plugin or integration |

The visual names describe what the icons depict. Interface controls should use
functional accessible names such as `Open settings` or `Connect power` rather
than announcing the geometry.

## Files

- `icons/file.svg`
- `icons/cog.svg`
- `icons/coffee.svg`
- `icons/plug.svg`
- `contact-sheet.svg`

## Provenance

The SVG geometry is from [Lucide](https://lucide.dev/icons/) and is used under
the [ISC License](https://lucide.dev/license). The review sheet and notes are
test artifacts created for this repository.

## Review Record

The contact sheet was rendered at 100% and inspected. Result: **pass**.

- All four icons remain recognizable with open negative space from 16 to 48
  pixels.
- Round strokes, joins, and inherited color remain consistent in light and dark
  contexts.
- Representative labels reinforce the intended meanings without changing the
  depicted names.
- The `cog` is visually denser than the other forms at 16 pixels, but remains
  recognizable and suitable for UI use.

This set validates the skill's discovery, profile selection, semantic naming,
source-vector delivery, and rendered-review stages. Because all four concepts
already exist in Lucide, it does not exercise original geometry authoring.
