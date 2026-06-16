# Design Handoff Package

Use this workflow when the user asks for documentation based on generated
wireframes, creatives, clickable drafts, functional creatives, or any
combination of those artifacts.

The Design Handoff Package is markdown documentation derived from generated
design artifacts. This is separate from wireframes and creatives themselves,
which must remain HTML/CSS/JS review artifacts unless the user explicitly asks
for text-only planning.

## Ownership

This workflow owns:

- documentation generated from the latest available wireframe and creative
  revision folders
- functional explanations for clicks, drags, toggles, menus, drawers, forms,
  component states, and other UX behavior
- component descriptions for UI elements that are not obvious at first glance
- implementation-facing notes about what is intended, simulated, deferred, or
  out of scope

This workflow does not own:

- creating or revising the source wireframes or creatives
- approving design phases
- production implementation
- replacing browser-visible review rounds

Use [wireframes](wireframes.md), [design-drafts](design-drafts.md), and
[feedback-loop](feedback-loop.md) for artifact creation and approval before
treating generated artifacts as approved sources.

## Workflow

Work through these steps in order:

1. find the latest relevant wireframe and creative revision folders
2. identify approval status and any unresolved review notes
3. extract the screen inventory and user flows
4. document component identity and purpose
5. document interaction behavior and state changes
6. document functional assumptions and simulated behavior
7. document implementation priority and open questions

If only wireframes exist, generate the package from the latest wireframe
revision. If only creatives exist, generate the package from the latest
creative revision. If both exist, use both and clearly identify which source
owns structure versus visual treatment.

## Required Package Structure

Use this structure unless the user asks for another format:

```markdown
# Design Handoff Package

## Source Artifacts
- Wireframe revision: <path or none>
- Creative revision: <path or none>
- Review status: <approved, pending, or unknown>
- Generated from: <artifact folder or folders>

## Product Context
<What this page, screen, or flow is for.>

## Scope
Included:
- <screen, page, state, or flow>

Not included:
- <explicit non-goal or deferred area>

## Screen Inventory
| Screen | Purpose | Primary user action |
|---|---|---|
| <screen> | <purpose> | <action> |

## User Flow Summary
1. <step>
2. <step>
3. <step>

## Component Inventory
| Component | What it is | Why it exists |
|---|---|---|
| <component> | <plain-language identity> | <user or system purpose> |

## Interaction And Behavior Spec

### <Component Or Screen Name>

**Purpose**
<What this component or screen is responsible for.>

**Visible Parts**
- <visible part>
- <visible part>

**Interactions**
| Trigger | Expected behavior |
|---|---|
| <click, drag, toggle, hover, keypress, submit, drop, etc.> | <behavior> |

**States**
- Default
- Hover
- Selected
- Loading
- Empty
- Error
- Disabled

**Implementation Notes**
- <what is real, simulated, deferred, or important for MVP>

## Screen-Level Behavior

### <Screen Name>

**Primary behavior**
<How the screen should behave overall.>

**When <condition>**
- <expected behavior>

## Functional Assumptions
- <intended behavior that may be simulated or deferred>

## Implementation Priority
1. <first build slice>
2. <next build slice>
3. <later build slice>

## Open Questions
- <question>
```

## Component Documentation Rules

Document ambiguous components by naming what they really are, not only how they
look. For example:

- "File Explorer" instead of "left sidebar"
- "Command Toolbar" instead of "button row"
- "Resizable Preview Panel" instead of "large content box"
- "Filter Toggle Group" instead of "three buttons"

For each non-obvious component, explain:

- what it is
- why it exists
- what parts are visible
- what user actions it supports
- what states it can enter
- what behavior is simulated or deferred

## Interaction Documentation Rules

Document interactions explicitly. Include clicks, double-clicks, drags, drops,
toggles, hovers, keyboard shortcuts, menu opens, form submits, validation
states, drawer behavior, modal behavior, and responsive behavior when visible
or implied by the artifact.

If behavior is not obvious from the artifact, write the intended behavior as an
implementation note instead of assuming the implementer will infer it.

## Review Gate

Do not consider the Design Handoff Package complete unless:

- the latest source revisions are identified
- source approval status is stated
- every included screen has a purpose and primary action
- every non-obvious component is named and explained
- important interactions and states are documented
- simulated behavior and deferred behavior are separated
- open questions are listed instead of hidden
