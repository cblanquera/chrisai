---
name: chrisai-design-logo-generator
description: Use when an agent needs to create, refine, or iterate on logos or logo marks, especially for SVG-first brand marks, logo concept directions, favicon-safe simplification, and production-ready mark variants before downstream PNG, SVG, or ICO export work.
---

# ChrisAI Design Logo Generator

Use this skill when the main problem is logo creation or logo refinement rather
than broad creative direction or generic asset conversion.

This skill owns SVG-first logo ideation, concept variation, mark refinement,
and logo-specific review gates.

## Ownership

This skill owns:

- logo intake for product, brand, and concept signals
- logo concept directions and variant exploration
- SVG-first logo mark generation
- logo-specific simplification for favicon-safe variants
- rationale for why a logo direction fits the brand
- review gates for memorability, restraint, and scalability

This skill does not own:

- broad site visual-system design
- generic non-logo transparent cutouts
- generic SVG, PNG, or ICO conversion workflows
- final favicon packaging and export scripts

Use [`chrisai-design-creative`](../chrisai-design-creative/SKILL.md) when the
brand direction or visual language is still unresolved.

Use [`chrisai-design-asset-formats`](../chrisai-design-asset-formats/SKILL.md)
when the work moves into PNG, SVG, or ICO packaging, transparency handling, or
favicon export QA.

## Workflow

Work through these steps in order:

1. gather logo inputs
2. choose 2 to 4 concept directions
3. generate a small set of distinct mark variants
4. refine the strongest direction
5. create a favicon-safe variant if needed
6. hand off the chosen mark to asset-format production

Do not jump straight to polishing one mark before the direction space is clear.

## Step 1: Gather Logo Inputs

Collect the minimum information needed to make good directions:

- brand or product name
- industry or category
- core concept or desired association
- tone or positioning
- any color constraints
- whether a wordmark, monogram, symbol, or combination mark is desired

Ask only for missing information that materially blocks good output.

## Step 2: Choose Concept Directions

Use [logo-briefing](references/logo-briefing.md) and
[logo-patterns](references/logo-patterns.md) to choose a few distinct
directions.

Default rule:

- choose 2 to 4 clearly different directions
- avoid generating many shallow variants of the same idea
- connect each direction to a brand idea, not just a shape preference

## Step 3: Generate Distinct Mark Variants

Prefer SVG-first marks unless the idea depends on raster texture.

Use simple, maintainable structures:

- viewBox `0 0 100 100` by default
- `currentColor` where practical
- 1 to 2 core elements
- strong negative space
- controlled line weights

Do not overload a mark with decorative details.

## Step 4: Refine The Strongest Direction

Refine only after a direction wins on concept and silhouette.

Typical refinements:

- spacing and proportions
- stroke weight
- counter size
- visual balance
- negative-space cuts
- simplification of weak details

## Step 5: Create A Favicon-Safe Variant

Read [logo-review](references/logo-review.md) before treating a logo as ready.

If the primary mark becomes muddy at `16x16`, create a simplified favicon-safe
variant.

Common simplifications:

- remove text
- reduce interior detail
- thicken strokes
- enlarge the dominant silhouette
- remove secondary decorative shapes

## Step 6: Hand Off To Asset Formats

Once the logo mark or logo variant is chosen:

- keep SVG as the master when possible
- hand off to `chrisai-design-asset-formats` for PNG export, ICO packaging,
  favicon preview, and format validation

Do not duplicate export logic here.

## Hard Rules

- Prefer SVG as the logo master unless the design fundamentally depends on raster texture.
- Do not present tiny parameter tweaks as distinct concepts.
- Do not let wordmarks carry the whole solution when the user needs a favicon-safe mark.
- Do not call a logo complete unless it survives small-size review.
- Do not confuse moodboard direction with a final mark.

## References

- [logo-briefing](references/logo-briefing.md): brand-input intake and framing
- [logo-patterns](references/logo-patterns.md): reusable mark archetypes and
  pattern ideas
- [logo-review](references/logo-review.md): logo-specific quality and
  scalability checks
