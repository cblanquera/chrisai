# Existing Design Sources

Use this reference when the user asks to add or revise a page, screen, or flow
for a product that already has a design.

## Term

Use "design source of truth" for the authoritative design material.

Examples:

- deployed site or app URL
- Figma file or design system
- local component library
- local app source with theme tokens
- Storybook or component docs
- Canva project or exports
- PSD, AI, SVG, PDF, PNG, JPG, or screenshot files
- brand style guide

## Priority Order

When sources disagree, use this order:

1. explicit user instruction
2. brand or design-system source of truth
3. existing deployed product
4. existing code tokens and components
5. screenshots or exported design files
6. reference sites or apps
7. agent judgment

Do not let external references override the existing product language unless
the user explicitly asks for a redesign.

## Source Intake

Ask what source exists before designing.

Useful questions:

- Is there a deployed URL?
- Is there a Figma, design system, or component library?
- Are there source files such as PSD, AI, SVG, PDF, images, or screenshots?
- Is there a local project with tokens, theme config, or reusable components?
- Are there specific screens the new work must match?

If the source format cannot be read directly, ask the user to export it to a
digestible format such as PNG, SVG, PDF, screenshots, tokens, or CSS variables.

## Extraction Targets

Extract rules before designing:

- colors and state colors
- typography and font scale
- spacing, padding, margins, and rhythm
- grid and page layout patterns
- common components and interface patterns
- cards, tables, forms, navigation, and modals
- borders, radius, shadows, dividers, and surface treatments
- icons, illustrations, images, and empty states
- loading, error, success, warning, and disabled states
- responsive behavior when visible

## Format Guidance

Figma:

- Prefer API extraction or exported frames when available.
- Extract styles, components, frames, typography, colors, and spacing clues.

Canva:

- Prefer exported PDF, PNG, SVG, or screenshots.
- Treat exports as visual evidence, not editable design-system data.

PSD:

- Extraction may be possible with extra dependencies.
- If tooling is unavailable, ask for exported PNGs plus any style notes.

AI:

- Native Illustrator parsing is unreliable.
- Ask for SVG, PDF, PNG, or exported assets when direct extraction is not easy.

Images and screenshots:

- Extract palette, layout regions, visible text, density, and repeated
  components.
- Do not infer hidden states unless the user provides them.

Local project source:

- Prefer existing tokens, CSS variables, theme config, components, and
  Storybook-like examples over visual guesses.

## Extension Rule

For an added page or screen, first state the existing rules the new work must
obey. Then design within those rules.

If a new requirement does not fit the existing design system, call out the gap
and ask whether to extend the system or keep the new feature visually
conservative.
