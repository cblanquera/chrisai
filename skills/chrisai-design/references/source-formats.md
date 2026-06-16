# Source Formats

Use this reference to decide how to inspect each design source.

## Deployed Site Or App

Use `../scripts/capture-existing-site.mjs` when a Playwright-capable Node
environment is available.

Capture:

- desktop and mobile screenshots
- navigation, headings, buttons, forms, tables, and repeated components
- sampled computed colors and CSS custom properties
- detected fonts and approximate type scale
- spacing, radius, shadow, border, and divider clues
- responsive layout differences

Treat the captured site as the strongest visual evidence unless a design system
or explicit user instruction overrides it.

## Local Project Source

Prefer existing source over visual guesses.

Use `../scripts/scan-project-design-system.mjs` for a first-pass scan of local
tokens, CSS variables, theme config, and component clues.

Inspect:

- CSS variables and design tokens
- Tailwind, theme, or styling configuration
- font imports and font-family declarations
- reusable component files
- Storybook-like examples or component documentation
- spacing, color, radius, shadow, and breakpoint scales

Do not rewrite production code during extraction.

## Figma

Prefer API extraction or exported frames when available.

Extract:

- pages, frames, and component names
- color and text styles
- typography values
- dimensions and spacing clues
- exported frame screenshots
- component screenshots

If access is unavailable, ask for exported frames, screenshots, or tokens.

## Canva

Prefer exported PDF, PNG, SVG, or screenshots.

Treat exports as visual evidence, not editable design-system data.

## PSD

Extraction may be possible with extra dependencies.

If tooling is unavailable, ask for exported PNGs plus any style notes.

## AI

Native Illustrator parsing is unreliable.

Ask for SVG, PDF, PNG, or exported assets when direct extraction is not easy.

## Images And Screenshots

Extract:

- palette
- layout regions
- visible text when practical
- repeated component shapes
- density and spacing clues

Do not infer hidden states unless the user provides them.
