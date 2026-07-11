# Creative Draft Specs Contract

Use this reference before writing or updating creative revision `specs.md`.
The spec must let another agent recreate or revise the creative artifact
without relying on chat history.

Do not use Markdown tables in `specs.md`. Use headings and bullets.

## Contents

- [Required Rule](#required-rule)
- [Required Sections](#required-sections)
- [Authority](#authority)

## Required Rule

Create or update `specs.md` before creating or revising rendered HTML/CSS/JS.
When feedback changes creative intent, update the spec first.

## Required Sections

```markdown
# Creative Draft Spec

## Revision Summary
- Revision folder:
- Revision goal:
- Previous revision:
- Draft stage:

## Source Of Truth
- Approved wireframe or structure:
- Wireframe approval status:
- Approved creative direction or extracted design system:
- Brand, content, and asset sources:
- Conflicts or unresolved gaps:

## Scope
Included:
- <screen, state, component family, or responsive variant>

Not included:
- <deferred or out-of-scope item>

## Screen Inventory

### <Screen Or State>
- HTML file:
- Purpose:
- Approved structural source:
- Primary action:
- Required states:
- Responsive variants:

## Visual System
- Color roles and tokens:
- Typography roles and scale:
- Spacing and sizing:
- Borders, radii, shadows, and elevation:
- Icon direction:
- Imagery and illustration direction:
- Density and hierarchy rules:

## Component Inventory

### <Component>
- Purpose:
- Screens used:
- Variants:
- States:
- Visual treatment:
- Interaction or motion intent:
- Accessibility expectations:

## Content And Asset Plan
- Required final copy:
- Illustrative content:
- Existing assets:
- Assets to generate or adapt:
- Asset ownership and file paths:

## Responsive Behavior
- Wide viewport:
- Narrow viewport:
- Layout or component changes:

## Interaction And Motion Intent

### <Element Or Flow>
- Trigger:
- State before:
- State after:
- Visible result:
- Motion or transition:
- Simulated or intended production behavior:

## Page Build Plan

### <HTML File>
- Screens or states represented:
- Components used:
- Styles and scripts:
- Assets:
- Initial state:
- Links and workflow entry points:

## Review Criteria
- <visual, responsive, component, content, or interaction decision>

## Open Questions
- <question or "None">
```

## Authority

The creative spec owns current creative intent. `notes.md` owns review history.
The approved wireframe owns structure unless the creative spec explicitly
records that the user reopened a structural decision.
