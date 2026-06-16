# Evidence Scripts

Use scripts only to extract objective evidence from assets and URLs. Scripts do
not choose the final design direction.

Use bundled scripts when repeatability matters. If a script does not exist for
the source format, perform the same analysis manually from the provided assets,
screenshots, and links.

For existing-design extension, scripts should extract rules from the submitted
design source of truth. They should not invent a new visual direction.

## `analyze-logo`

Purpose: inspect an SVG or PNG logo file and produce structured brand signals.

Bundled script: `../scripts/analyze-logo.py`

Useful outputs:

- image dimensions, aspect ratio, file format, and transparency
- dominant colors and approximate palette
- likely primary, secondary, accent, and neutral colors
- contrast candidates against light and dark backgrounds
- flat, gradient-heavy, transparent, or photo-like treatment
- basic geometry signals such as aspect ratio, SVG shape counts, and
  wide, square, or tall mark hints
- a JSON summary

Example output shape:

```json
{
  "file": "logo.svg",
  "format": "svg",
  "width": "120",
  "height": "60",
  "hasTransparency": false,
  "dominantColors": [
    { "color": "#102030", "count": 1 },
    { "color": "#2DD4BF", "count": 1 }
  ],
  "notes": {
    "gradientCount": 0,
    "shapeCounts": { "rect": 1, "circle": 1 },
    "treatment": "flat-or-unknown"
  }
}
```

## `capture-reference-site`

Purpose: turn a user-provided URL into artifacts the agent can inspect.

Useful outputs:

- desktop and mobile screenshots
- page title, final URL, and viewport sizes
- visible headings
- button labels
- navigation labels
- extracted links
- sampled computed colors
- detected font families when available
- saved artifacts in a temporary analysis folder

Example output shape:

```json
{
  "url": "https://example.com",
  "title": "Example",
  "screenshots": {
    "desktop": "references/example-desktop.png",
    "mobile": "references/example-mobile.png"
  },
  "headings": ["Build faster", "Integrations", "Pricing"],
  "buttons": ["Start free", "Book demo"],
  "nav": ["Product", "Docs", "Pricing", "Login"],
  "colors": ["#0F172A", "#6366F1", "#F8FAFC"],
  "fonts": ["Inter", "ui-sans-serif"]
}
```

## `capture-existing-site`

Purpose: inspect a deployed site or app so a new page or screen can match the
current product language.

Bundled script:
`../scripts/capture-existing-site.mjs`

Useful outputs:

- desktop and mobile screenshots for provided URLs
- navigation, headings, buttons, forms, tables, and repeated components
- sampled computed colors and CSS custom properties
- detected font families and approximate type scale
- spacing, radius, shadow, and border clues from computed styles
- responsive layout differences
- JSON summary plus screenshots

This script should treat the captured site as design evidence, not as
permission to copy unrelated products.

## `scan-project-design-system`

Purpose: inspect local project files for reusable design rules.

Bundled script:
`../scripts/scan-project-design-system.mjs`

Useful outputs:

- CSS variables and design tokens
- Tailwind, theme, or styling config values
- font imports and font-family declarations
- reusable component names and props when easy to detect
- spacing, color, radius, shadow, and breakpoint scales
- Storybook-like examples or component documentation paths

This script should prefer existing project tokens over screenshot guesses.

## `extract-figma-file`

Purpose: extract design-system evidence from a Figma file when the user
provides access.

Useful outputs:

- frames, pages, and component names
- color and text styles
- typography values
- dimensions and spacing clues
- exported frame screenshots
- component screenshots

If access is unavailable, ask the user for exported frames, screenshots, or
tokens instead.

## `inspect-design-images`

Purpose: inspect screenshots or exported image files.

Useful outputs:

- image dimensions
- dominant colors
- approximate layout regions
- visible text when OCR is available
- repeated component shapes
- density and spacing clues

This script should mark uncertain findings instead of treating screenshots as
complete design-system documentation.

## `inspect-psd`

Purpose: extract basic evidence from PSD files when dependencies are available.

Useful outputs:

- canvas dimensions
- layer names
- visible text layers when extractable
- approximate colors and bounds
- exported preview images

If dependencies are unavailable, ask the user for exported PNGs plus any style
notes.

## `inspect-ai-or-pdf`

Purpose: inspect Illustrator exports or PDF design artifacts when direct source
parsing is not practical.

Useful outputs:

- page or artboard previews
- embedded text when available
- vector color hints
- exported screenshots or SVG/PDF-derived previews

Native AI parsing is unreliable. Prefer SVG, PDF, PNG, or exported assets when
the user can provide them.

## `compare-reference-sites`

Purpose: aggregate extracted reference-site data so commonalities and
differences are easier to inspect.

Useful outputs:

- common navigation patterns
- common hero structures
- repeated CTA labels
- light, dark, or mixed theme usage
- repeated colors or font choices
- common section order
- common product screenshot treatments
- density differences
- suggested design-choice prompts

This script should summarize measurable patterns. It should not judge whether a
design is good.

## `extract-brand-guide`

Purpose: extract constraints from a PDF, DOCX, HTML page, or similar style
guide.

Useful outputs:

- color names and hex values
- font names
- logo usage rules
- spacing or layout rules
- image or illustration style notes
- voice and tone excerpts
- accessibility requirements
- forbidden treatments

Brand guides vary heavily, so this script should preserve source snippets and
mark uncertain findings instead of pretending every rule is definitive.
