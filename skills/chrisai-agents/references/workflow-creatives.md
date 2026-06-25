# Creatives Workflow

Use this workflow for visual direction, brand exploration, creative briefs,
copy explorations, asset notes, and creative reviews. Creative direction is
optional for some MVPs, but when it is used it must be accepted or explicitly
deferred before production frontend implementation starts.

## Read First

- `.agents/AGENTS.md`
- relevant spec brief, audience, non-goals, constraints, and acceptance
- existing root `creatives/` artifacts

## May Update

- root `creatives/<direction-or-screen-set>/`
- root `creatives/<direction-or-screen-set>/index.md`
- root `creatives/<direction-or-screen-set>/guidelines.md` after approval
- root `creatives/<direction-or-screen-set>/reviews.md`
- root `creatives/<direction-or-screen-set>/assets/`
- `.agents/context/` after guideline creation
- `.agents/references/` for longer rationale or examples
- spec records when creative direction affects product truth

## Process

1. Identify the audience, mood, brand constraints, and output surfaces.
2. Keep creative notes separate from implementation source.
3. Run creative review rounds explicitly. Each round should name the phase,
   round number, target artifact, what changed, concrete review questions, and
   what approval unlocks.
4. Treat round approval as approval for that round only unless the full creative
   direction is explicitly approved.
5. Link large binaries, generated images, Figma files, or production assets
   instead of storing them directly in `.agents/`.
6. Record accepted direction, rejected alternatives, unresolved feedback, and
   open questions.
7. When creative direction is approved, create a detailed creative guidelines
   document in root `creatives/<direction-or-screen-set>/guidelines.md`
   describing colors, spacing, typography, styled components, styled pages,
   iconography, imagery, interaction styling, responsive rules, and asset
   usage.
8. Promote approved creative guidelines and durable product, UX, copy, or asset
   requirements into `.agents/context/` and spec records before implementation
   or MVP freeze.

## Guidelines Document Contents

`guidelines.md` should describe the approved creative direction in enough
detail for production UI implementation:

- approval status, review round, approver, date, and what approval unlocks
- brand mood, visual principles, target audience, and rejected directions
- color palette with roles, states, contrast notes, and usage constraints
- typography, type scale, weights, line heights, casing, and content density
- spacing system, layout rhythm, grid behavior, breakpoints, and page padding
- styled components, controls, cards, tables, forms, dialogs, navigation, and
  repeated patterns
- styled page guidance for each approved screen or template
- iconography, imagery, illustration, motion, interaction styling, and
  accessibility expectations
- copy tone, labels, microcopy, and content rules when creative direction
  affects them
- asset inventory, production asset requirements, and external asset
  provenance stored through `.agents/references/` with purpose and
  `Load when:` notes
- implementation notes, QA checks, non-goals, unresolved questions, and
  explicit deferrals
- `.agents/context/` promotion summary and `.agents/references/` provenance
  with purpose and `Load when:` notes

Use this structure:

```markdown
# <Direction Or Screen Set> Creative Guidelines

Status:
Approval:
Review Round:
Approved By:
Approved Date:
Unlocks:

## Scope

## Source Artifacts

List root creative artifacts, asset folders, and any `.agents/references/`
provenance notes. Every `.agents/references/` link must state why it exists and
when to load it. Do not link `.agents/context/` directly to root artifacts.

Use this shape for provenance references:

- `.agents/references/<reference>.md`
  Load when: <specific source detail, asset provenance, or evidence is needed>.
  Skip when: <the guidelines already answer the implementation or review question>.

## Creative Principles

## Rejected Directions

## Color System

Include palette, semantic roles, states, contrast notes, and usage constraints.

## Typography

Include font families, scale, weights, line heights, casing, density, and
fallbacks.

## Spacing, Layout, And Breakpoints

## Styled Components

Cover buttons, links, inputs, selects, checkboxes, radios, cards, tables,
dialogs, navigation, tabs, alerts, empty states, loading states, and repeated
patterns when relevant.

## Styled Pages

Describe page-level styling for each approved screen/template.

## Imagery, Icons, Motion, And Assets

## Copy And Microcopy Direction

## Accessibility And Responsive Rules

## Implementation Notes

## QA Checks

## Non-Goals, Deferrals, And Open Questions

## Context Promotion

Summarize what was promoted into `.agents/context/` and which
`.agents/references/` files carry provenance. Include purpose and `Load when:`
guidance for each reference link.
```

## Stop Conditions

- accepted creative direction is clear
- review round, approval state, and unresolved feedback are explicit
- approved guidelines exist when creative direction is accepted
- large assets are linked, not copied into planning records
- durable scope changes are promoted into `.agents/context/` and back into specs

## Handoff

State the reviewed artifact, phase and round, accepted direction, rejected
alternatives, unresolved questions, durable records updated, and whether
implementation is unlocked. Include root creative guidelines, `.agents/context/`
promotion, and the recommended next step.
