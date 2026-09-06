---
name: chrisai-graphics
description: Use for creating, planning, or refining standalone visual assets such as article banners, cover images, social graphics, infographics, explanatory diagrams, and technical diagrams.
license: MIT
---

# ChrisAI Graphics

Use this skill for standalone visual communication assets. Turn source content
into a clear visual concept, choose an appropriate format and layout, use the
best available generation or rendering capability, and review the result for
meaning as well as appearance.

This skill owns graphics that accompany or explain content. It does not own
software UI/UX, wireframes, interactive drafts, or design-system extraction.

## Core Visual Contract

- Give every graphic one primary communication job.
- Preserve source facts, labels, relationships, quotations, and numbers.
- Choose the medium from the information structure, not from a default style.
- Establish hierarchy before decoration.
- Keep on-image text concise and legible at the intended viewing size.
- Treat supplied logos, wordmarks, lockups, seals, and other protected brand
  assets as immutable source files, not imagery for a generative model to
  redraw.
- Create for the destination crop or aspect ratio instead of trimming a random
  composition afterward.
- Treat a requested revision as a controlled change from the latest acceptable
  artifact, not as permission to reinterpret the entire visual.
- Review the rendered artifact before calling it complete when a rendering or
  image capability is available.

## Internal Guidance

- Use `workflows/banner-and-social-graphics.md` for article banners, cover
  images, hero graphics, social cards, quote graphics, and other
  message-forward promotional or editorial assets.
- Use `workflows/infographic-design.md` when several facts, steps, comparisons,
  or categories must become one structured visual explanation.
- Use `workflows/diagram-design.md` for flows, systems, sequences,
  relationships, hierarchies, architectures, and other diagrams whose meaning
  depends on correct connections and labels.

## Supporting References

- Use `references/visual-formats.md` to choose aspect ratio, output type, text
  density, and cross-channel variants.
- Use `references/layout-selection.md` to map content structure to an
  appropriate visual layout.
- Use `references/visual-review.md` before delivery to check communication,
  fidelity, legibility, composition, and export readiness.
- Use `references/iterative-editing.md` whenever feedback asks to revise,
  refine, repair, or try again from an existing artifact.
- Use `references/protected-brand-assets.md` whenever a supplied logo,
  wordmark, lockup, seal, partner mark, or certification mark must appear in
  the output.

## Capability Selection

Use installed capabilities opportunistically without making one vendor or
runtime a hard dependency:

- Use a runtime-native image-generation or image-editing tool for raster
  illustrations, editorial imagery, textured graphics, and image-based
  compositions.
- When that capability provides its own operating guidance, follow it for
  tool-specific mechanics while this skill remains authoritative for the
  visual brief, revision baseline, and acceptance review.
- Use an editable diagram, vector, slide, canvas, or code-based renderer when
  exact labels, relationships, geometry, or repeated revisions matter more
  than illustrative richness.
- Use a deterministic composition medium to place protected brand assets from
  their canonical files after generative artwork is complete. Generate a
  logo-free visual plate with suitable negative space instead of asking an
  image model to reproduce a supplied logo.
- If no suitable rendering capability exists, deliver a production-ready
  visual specification or generation prompt and state that the final graphic
  was not rendered.

Do not claim to have visually reviewed an artifact that was not rendered and
inspected.

## Input Discipline

Use supplied content, brand context, target channel, and dimensions first. Ask
only for missing information that materially changes the result, normally the
message, audience, destination, required text, brand constraints, or output
format.

When those inputs are non-blocking, choose a sensible default, state it, and
continue.

## Decision Rules

- If one message or title should dominate, use banner and social graphics.
- If the viewer must understand several related points at once, use
  infographic design.
- If correctness depends on nodes, arrows, ordering, containment, or exact
  relationships, use diagram design.
- Treat software screens, product flows, wireframes, interactive design
  artifacts, and design-system extraction as outside this skill's scope.
- If the request starts from an article or social draft, treat that content as
  the source and keep the graphic subordinate to its central idea.

## Boundaries

- Do not invent data or rewrite quotations to make a layout fit.
- Do not use an infographic when a simple chart, diagram, or single-message
  graphic communicates more clearly.
- Do not force exact text into a raster generator known to render text
  unreliably; switch to a more controllable medium or reduce on-image text.
- Do not redraw, trace, regenerate, restyle, recolor, crop, stretch, skew, or
  bake a supplied protected brand asset into generated pixels. If exact
  placement is unavailable, deliver the unbranded visual plate and placement
  specification instead of substituting an approximation.
- Do not repair incorrect rendered text by painting over a bitmap. Regenerate,
  revise the composition, or switch to an editable medium.
- Do not continue editing from a rejected or visibly degraded candidate unless
  the user explicitly chooses it as the new baseline.
