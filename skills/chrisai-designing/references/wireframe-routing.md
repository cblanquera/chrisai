# Wireframe Routing

Use this reference when a request starts as creative direction but moves into
low-fidelity structure.

`workflows/creative-direction.md` coordinates the decision and handoff.
`workflows/wireframe-drafts.md` owns document-driven grayscale wireframe
drafting, clickable wireframe drafts, review rounds, and wireframe handoff.

## When To Route

Route to `workflows/wireframe-drafts.md` when the user needs:

- section ordering or page layout studies
- screen-level layout options
- clickable grayscale flow drafts
- reviewable wireframe files
- a complete wireframe set before creative design
- a revision-local `specs.md` that can drive generated wireframe pages

Keep the work in `workflows/creative-direction.md` only when the user needs a
written creative direction or a high-level layout recommendation without draft
artifacts.

## Handoff Notes

When routing, pass along:

- selected design mode
- target pages, screens, or flow
- required sections and actions
- audience and primary user goal
- existing design-extension rules when applicable
- brand or reference constraints that affect layout
- whether there is any reason to make an app, flow, form, menu, tab, modal,
  drawer, or stateful surface static-only instead of product-like and clickable
- any known layouts, reusable components, interactions, states, routes, and
  workflow starting points that should be captured in `specs.md`

Wireframe artifacts must stay grayscale, low-fidelity, and review-only. The
rendered HTML must show only intended product UI. The revision-local
`specs.md` must define the draft before files are generated and must use
headings and bullets instead of markdown tables. Every generated-artifact
update must append or update revision-local `notes.md`. Use
`workflows/feedback-loop.md` for review-round approval and next-step rules.
