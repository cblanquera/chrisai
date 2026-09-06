# Brand-Mark Calibration Test

This package tests monochrome brand marks in UI-sized contexts. It deliberately
crosses the boundary between branding and interface iconography:

- brand identity, geometry, approved variants, and trademark usage remain a branding
  concern
- SVG safety, packaging, native-size rendering, accessible control names, and
  perceptual review use the iconography workflow

The brand marks are not restyled to match Lucide. Visual consistency comes from
optical sizing, clear space, and component alignment rather than changing the
brands' geometry.

## Source Decisions

| Mark | Decision | Master used in this test |
| --- | --- | --- |
| Viber | Reuse the official black icon unchanged | Official Rakuten Viber 2026 SVG pack |
| WhatsApp | Reuse the official black digital glyph unchanged | Official Meta 2026 SVG pack |
| Messenger | Reuse the official secondary-black icon unchanged | Official Meta icon pack linked from the February 2025 guidance |
| Shoppable Business | Preserve the production symbol paths, remove the wordmark, and convert its layered fills into a true one-color mask | Symbol group extracted from the live production SVG and checked against the supplied PNG |

The original color messaging marks, the supplied Shoppable PNG, and the
complete production SVG lockup are preserved in `sources/`. The Shoppable
symbol uses the exact nine production paths; it does not embed or trace the
raster file. Its black version is a new monochrome candidate rather than an
officially supplied brand asset.

## Semantic Inventory

| Name | Identifies | Suitable UI use | Avoid |
| --- | --- | --- | --- |
| `viber` | Rakuten Viber | A labeled link or action that opens Viber | Generic phone, chat, or call actions |
| `whatsapp` | WhatsApp | A labeled WhatsApp contact or channel action | Generic messaging or telephone actions |
| `messenger` | Messenger | A labeled Messenger contact or channel action | Generic chat, send, or direct-message actions |
| `shoppable-business` | Shoppable Business | Product identity, account switcher, launcher, or branded channel | Generic shopping, marketplace, bag, or send actions |

Use functional accessible names on the host control, such as `Message us on
WhatsApp` or `Open Shoppable Business`. Do not announce `WhatsApp icon` or
repeat a visible adjacent label.

## Monochrome and Geometry

- Viber: official `#000000`, native `132 × 141` viewBox
- WhatsApp: official near-black `#111B21`, native `720 × 720` viewBox
- Messenger: official `#000000`, native `502 × 502` viewBox
- Shoppable Business: one-color `#000000`, cropped symbol viewBox `40 × 45`
- Brand proportions and silhouettes are locked. Do not apply Lucide strokes or
  forced square distortion.
- The Shoppable mask converts formerly white internal details to transparent
  negative space so the result remains a genuine one-color mark on light
  surfaces. Its geometry remains identical to the production symbol.

## Files

- `icons/viber.svg`
- `icons/whatsapp.svg`
- `icons/messenger.svg`
- `icons/shoppable-business.svg`
- `contact-sheet.svg`
- `sources/shoppable-business-logo.png`
- `sources/shoppable-production-lockup.svg`
- `sources/viber-color.svg`
- `sources/whatsapp-color.svg`
- `sources/messenger-color.svg`

## Trademark and Usage Boundary

Viber, WhatsApp, and Messenger are third-party trademarks. This package is a
technical review artifact, not a new license or permission grant. Use the
official brand guidance and assets for any production deployment, and do not
imply endorsement or partnership.

## Review Record

The contact sheet was rendered at 100% and inspected. Result: **pass with one
small-size limitation**.

- Viber, WhatsApp, and Messenger use their official black variants unchanged
  and remain recognizable from 16 to 64 pixels.
- All four delivered masters render black on light surfaces. WhatsApp's
  official black asset uses `#111B21`, not literal `#000000`.
- The Shoppable symbol preserves the production vector paths, removes the
  wordmark, and uses transparent knockouts for its internal details.
- The Shoppable symbol reads clearly at 32 pixels and above. Its bag,
  monogram, and paper-plane details compress at 16 and 24 pixels, where a
  visible label is required.
- Do not silently simplify the Shoppable mark. A dedicated compact mark would
  be a new branding candidate and should be approved against this production
  baseline before replacing it at small sizes.

This validates the iconography skill's boundary: brand marks should retain
their identity geometry and be reviewed as branded assets, not redrawn into a
uniform UI-icon style.
