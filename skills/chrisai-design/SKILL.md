---
name: chrisai-design
description: Use when a ChrisAI design task needs creative direction, design-system extraction, wireframes, design drafts, browser-visible feedback loops, or supporting design references.
---

# ChrisAI Design

Use this skill for ChrisAI design work. Route the task to the narrowest
internal workflow or reference unless the request clearly needs a deliberate
sequence.

Do not treat the workflow and reference files as separate skills. They are
internal guidance for this consolidated skill.

Do not hard-code dependencies on external ChrisAI skills. When logo generation,
image generation, production HTML/CSS/JS implementation, or browser-visible
review would benefit from an installed capability, look softly for an available
skill, plugin, tool, or project-local workflow. If no matching capability is
available, continue with the best design effort possible and state any limits.

Use precise review terminology:

- A review round is a feedback cycle.
- A revision is a major folder-level artifact version.
- Major changes create a new revision folder.
- Minor changes may stay in the current revision folder.

Wireframes, creative drafts, clickable drafts, and functional creatives must
use `workflows/feedback-loop.md` until the relevant phase is approved, including
when feedback arrives as annotations, screenshot notes, ad hoc requests, or
direct chat comments.

Generated wireframes and creative drafts must be HTML/CSS/JS review artifacts.
Do not deliver markdown-only wireframes, markdown mockups, or prose-only
creative drafts unless the user explicitly asks for text-only planning instead
of generated files.

## Internal Guidance

- Use `workflows/creative-direction.md` when the task needs coordinated
  creative direction, visual-system definition, homepage or landing-page
  composition, brand adaptation, reference-site synthesis, or a design handoff.
- Use `workflows/design-system-extraction.md` when the task needs existing
  app, site, Figma, design-system, component-library, screenshot, exported
  design-file, or local theme-source inspection before extending a product.
- Use `workflows/wireframes.md` when the task needs HTML/CSS/JS grayscale
  low-fidelity wireframes, layout options, flow structure, or clickable
  grayscale wireframe drafts.
- Use `workflows/design-drafts.md` when the task needs static HTML/CSS/JS
  design-review artifacts, clickable creative drafts, functional creative
  drafts, or polished visual mockups from an approved structure and direction.
- Use `workflows/feedback-loop.md` whenever a draft, prototype, rendered page,
  local app, screenshot, recording, or other browser-visible artifact needs
  review questions, review-round approval, phase approval, and exact next-step
  language.
- Use `workflows/design-handoff-package.md` when the user asks to document,
  explain, package, summarize, or hand off generated wireframes and/or
  creatives. Generate the package from whichever latest approved or latest
  available wireframe and creative revisions exist.

## Supporting References

- Use `references/design-modes.md` to classify the design mode before choosing
  a workflow.
- Use `references/brand-led-discovery.md`,
  `references/existing-design-sources.md`, `references/homepage-patterns.md`,
  `references/site-direction-playbooks.md`, and `references/visual-review.md`
  during creative-direction work.
- Use `references/source-formats.md` and
  `references/extraction-report.md` during design-system extraction.
- Use `references/wireframe-patterns.md` during wireframe work.
- Use `references/draft-artifact-rules.md` during static draft creation.
- Use `references/browser-feedback-loop.md` during browser-visible review
  rounds.
- Use `references/evidence-scripts.md` when objective extraction scripts can
  provide useful evidence.
- Use `references/future-wireframes.md` only as a bridge when a creative
  direction task turns into low-fidelity structure work.

## Soft Capability Lookup

Use installed capabilities opportunistically, but do not require them:

- For logo creation or refinement, look for an available logo-generation skill,
  plugin, local tool, or project workflow. If none exists, produce best-effort
  logo direction or lightweight SVG guidance without claiming a dedicated logo
  workflow was used.
- For image generation, look for an available image-generation capability such
  as a skill, plugin, or image tool. If none exists, use placeholders, existing
  assets, SVG/static guidance, or ask for source assets when needed.
- For production HTML, CSS, or JavaScript implementation, look for an
  available frontend, HTML/CSS, JavaScript, app implementation, or
  project-local coding workflow. If none exists, keep the output at the
  design-artifact or handoff level.
- For browser-visible review, use the Browser plugin when available. If it is
  unavailable, provide the local URL or file path and state that browser review
  was not performed.

## Sequencing

Only chain internal guidance when there is a clear owner plus a clear
follow-up. Use this order:

1. `workflows/design-system-extraction.md` first when existing product rules
   must be understood before new design work.
2. `workflows/creative-direction.md` when the visual direction, design mode, or
   brand-led system is still open.
3. `workflows/wireframes.md` when structure, hierarchy, or flow must be
   approved before visual design.
4. `workflows/design-drafts.md` when a static review artifact is needed from an
   approved structure and direction.
5. `workflows/feedback-loop.md` whenever an artifact is shown for review.
6. `workflows/design-handoff-package.md` after the latest wireframe and/or
   creative artifacts exist and the user asks for documentation or handoff
   material.

Do not default to multi-step design sequences.

## Decision Rules

- If the request is mainly about creative direction, visual-system work,
  homepage composition, or design handoff, use
  `workflows/creative-direction.md`.
- If the request is mainly about extracting rules from an existing design
  source of truth, use `workflows/design-system-extraction.md`.
- If the request is mainly about grayscale wireframes or clickable grayscale
  wireframes, use `workflows/wireframes.md`.
- If the request is mainly about static design-review artifacts, clickable
  creative drafts, or mockups from approved structure and direction, use
  `workflows/design-drafts.md`.
- If a browser-visible artifact is part of the task, apply
  `workflows/feedback-loop.md` before asking the user for approval.
- If the request is mainly about documenting generated design artifacts, use
  `workflows/design-handoff-package.md` and include interaction behavior,
  component identity, states, assumptions, implementation priority, and open
  questions.
