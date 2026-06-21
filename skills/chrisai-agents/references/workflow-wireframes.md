# Wireframes Workflow

Use this workflow for low-fidelity product flows, screens, layout notes, and
wireframe review records. Wireframes are research-phase artifacts by default.
Static and functional wireframes must be accepted or explicitly deferred before
MVP implementation planning starts.

## Read First

- `.agents/AGENTS.md`
- relevant spec brief, requirements, capabilities, acceptance, and user flows
- existing root `wireframes/` artifacts

## May Update

- root `wireframes/<flow-or-screen-set>/`
- root `wireframes/<flow-or-screen-set>/index.md`
- root `wireframes/<flow-or-screen-set>/static/`
- root `wireframes/<flow-or-screen-set>/functional/`
- root `wireframes/<flow-or-screen-set>/reviews.md`
- root `wireframes/<flow-or-screen-set>/handoff.md` after approval
- `.agents/context/` after handoff creation
- spec records when wireframes reveal durable requirements or decisions

## Process

1. Identify the user workflow and screens being framed.
2. Keep wireframes low-fidelity and focused on structure, hierarchy, states,
   and flow.
3. Link screens to relevant requirements, capabilities, or acceptance records.
4. Run review rounds explicitly. Each round should name the phase, round
   number, target artifact, what changed, concrete review questions, and what
   approval unlocks.
5. Treat round approval as approval for that round only unless the full design
   scope is explicitly approved.
6. Record review findings as requirements, questions, risks, or decisions when
   they affect product truth.
7. When static wireframes are approved, record the approval state and what the
   approval unlocks.
8. When functional wireframes are approved, create a detailed handoff document
   in root `wireframes/<flow-or-screen-set>/handoff.md` describing screen
   layouts, components, states, interactions, navigation, data expectations,
   validation, empty/error states, and functionality.
9. Promote the approved handoff and accepted flows, states, and UX decisions
   into `.agents/context/` and spec records before implementation or MVP
   freeze.
10. Link external design files or screenshots instead of embedding large assets.

## Handoff Document Contents

`handoff.md` should describe the approved wireframes in enough detail for
frontend, backend, QA, and future planning work:

- approval status, review round, approver, date, and what approval unlocks
- product workflow, target users, supported platforms, and route or navigation
  map
- screen inventory with purpose, entry points, exits, and dependencies
- per-screen layout structure, regions, hierarchy, and responsive behavior
- components, controls, forms, tables, lists, menus, dialogs, and reusable
  patterns
- user interactions, click paths, transitions, validation, disabled states, and
  keyboard or accessibility expectations
- data displayed, data entered, data dependencies, permissions, and API or
  backend expectations
- loading, empty, error, success, edge, and boundary states
- copy requirements, labels, helper text, and user-facing messages
- analytics, QA, acceptance, or verification notes when known
- unresolved UX questions, explicit deferrals, and non-goals
- `.agents/context/` promotion summary and `.agents/references/` provenance

Use this structure:

```markdown
# <Flow Or Screen Set> Wireframe Handoff

Status:
Approval:
Review Round:
Approved By:
Approved Date:
Unlocks:

## Scope

## Source Artifacts

List root wireframe artifacts and any `.agents/references/` provenance notes.
Do not link `.agents/context/` directly to root artifacts.

## Placeholder Policy

Wireframes may contain placeholder text, mock records, sample counts, fake
names, demo states, avatar initials, timestamps, illustrative labels, and
temporary values. These are examples only unless listed under Required UI
Content.

Do not hardcode placeholder data into the product.

## Required UI Content

List exact copy, labels, fields, data, statuses, defaults, validation messages,
or options that are required product content.

## Illustrative Placeholder Examples

List placeholder/example values shown only to communicate layout, density,
state, or behavior. These must not be implemented literally.

## Workflow And Navigation

## Screen Inventory

## Per-Screen Requirements

For each screen:
- purpose
- layout regions and hierarchy
- components and controls
- interactions and state changes
- responsive behavior
- accessibility expectations
- data displayed and data entered
- backend or API expectations
- loading, empty, error, success, and edge states
- required copy and placeholders to ignore

## Component And Pattern Requirements

## Data, Permissions, And Validation

## Acceptance And QA Notes

## Unresolved Questions And Deferrals

## Context Promotion

Summarize what was promoted into `.agents/context/` and which
`.agents/references/` files carry provenance.
```

## Stop Conditions

- wireframe scope and linked records are clear
- open UX questions are recorded
- review round, approval state, and unresolved feedback are explicit
- approved handoff exists when wireframes are accepted
- durable changes are promoted into `.agents/context/` and back into specs

## Handoff

State the reviewed artifact, phase and round, accepted decisions, unresolved
questions, root handoff document, durable context and records updated, whether
implementation is unlocked, and the recommended next step.
