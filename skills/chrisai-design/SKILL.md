---
name: chrisai-design
description: Use when a ChrisAI design task needs routing to the narrowest creative, design-system extraction, wireframe, draft, logo, or asset-format specialist.
---

# ChrisAI Design Router

Use this family router for ChrisAI design work. Choose exactly one design
specialist unless the task clearly needs a deliberate sequence.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-design-creative` for coordinated creative direction,
  visual-system definition, homepage composition, brand adaptation, mode
  selection, and design handoff across multiple design specialists.
- Use `chrisai-design-system-extraction` for inspecting existing apps, sites,
  Figma files, design systems, component libraries, screenshots, exported
  design files, or local project theme sources to extract design rules before
  extending a product.
- Use `chrisai-design-wireframes` for grayscale low-fidelity wireframes and
  clickable grayscale wireframe drafts.
- Use `chrisai-design-drafts` for static HTML/CSS/JS design-review artifacts,
  clickable creative design drafts, and polished mockups based on an approved
  wireframe and visual direction.
- Use `chrisai-design-logo-generator` for logo ideation, SVG-first logo marks,
  concept variation, and favicon-safe logo refinement.
- Use `chrisai-design-asset-formats` for SVG, PNG, and ICO asset creation,
  conversion, transparency validation, temporary SVG prompt artifacts, and
  favicon packaging.

## Sequencing

Only chain design specialists when there is a clear owner plus a clear
follow-up:

1. use `chrisai-design-creative` first when the visual direction is still open
2. use `chrisai-design-system-extraction` when existing product rules must be
   extracted before new design work
3. use `chrisai-design-wireframes` when the structure must be approved before
   visual design
4. use `chrisai-design-drafts` when a static review artifact is needed from an
   approved structure and direction
5. use `chrisai-design-logo-generator` when the task is specifically about logo
   concepts or logo mark refinement
6. use `chrisai-design-asset-formats` when the work moves into concrete asset
   production or conversion

Do not default to multi-skill design sequences.

## Decision Rules

- If the request is mainly about creative direction, visual-system work, or
  homepage composition, prefer `chrisai-design-creative`.
- If the request is mainly about extracting rules from an existing design
  source of truth, prefer `chrisai-design-system-extraction`.
- If the request is mainly about grayscale wireframes or clickable grayscale
  wireframes, prefer `chrisai-design-wireframes`.
- If the request is mainly about static design-review artifacts, clickable
  creative drafts, or mockups from approved structure and direction, prefer
  `chrisai-design-drafts`.
- If the request is mainly about logo creation, logo mark iteration, or
  favicon-safe logo simplification, prefer `chrisai-design-logo-generator`.
- If the request is mainly about creating, converting, validating, or packaging
  SVG, PNG, or ICO assets, prefer `chrisai-design-asset-formats`.
