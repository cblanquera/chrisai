# Design Handoff Package

Use this workflow when the user asks for documentation based on generated
wireframes, creatives, clickable drafts, functional creatives, or any
combination of those artifacts.

The Design Handoff Package is markdown documentation derived from generated
design artifacts. This is separate from wireframes and creatives themselves,
which must remain HTML/CSS/JS review artifacts unless the user explicitly asks
for text-only planning.

After wireframes and/or creatives are approved and the next phase is creative
design or frontend implementation, produce a standalone handoff package. The
handoff must be usable by another agent without reopening the rendered HTML.

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
2. read every entry in the revision-local `notes.md` review logs when present
3. identify approval status and any unresolved review notes
4. extract the screen inventory and user flows
5. document component identity and purpose
6. document interaction behavior and state changes
7. document functional assumptions and simulated behavior
8. document routes, forms, fields, and validation behavior
9. synthesize the update history into final decisions, superseded directions,
   remaining review notes, and open questions
10. document implementation priority and open questions

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
- Review notes: <notes.md path or none>
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

## Route And Navigation Map
| From | Trigger | To | Notes |
|---|---|---|---|
| <screen> | <click, submit, tab, menu item, etc.> | <screen or state> | <behavior note> |

## User Flow Summary
1. <step>
2. <step>
3. <step>

## Review Decision History
| Round | Changes considered | Final handoff impact |
|---|---|---|
| <round/date> | <change, feedback, or annotation from notes.md> | <kept, revised, superseded, deferred, or open> |

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

## Forms And Inputs
| Form | Field | Type | Required | Validation | Submit behavior |
|---|---|---|---|---|---|
| <form> | <field> | <text, select, checkbox, etc.> | <yes/no> | <rule or none> | <result> |

## Screen-Level Behavior

### <Screen Name>

**Primary behavior**
<How the screen should behave overall.>

**When <condition>**
- <expected behavior>

## Functional Assumptions
- <intended behavior that may be simulated or deferred>
- <placeholder values are illustrative unless promoted into requirements,
  configuration, or final copy>

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

## Standalone Handoff Rules

Do not require the next agent to inspect the rendered HTML to understand the
approved structure. The package should restate the major components,
navigation, interaction points, forms, states, and functional assumptions in
plain language.

Use revision-local `notes.md` entries to reconcile what changed across review
rounds, what the user was asked to review, which annotations were applied, and
which simulated or deferred behaviors remain. Do not silently drop review-log
decisions when preparing the final handoff.

Read all update records, not only the latest entry. The final handoff should
synthesize the complete review history and make clear which prior decisions
remain current, which were superseded by later rounds, which are deferred, and
which are still open. If any `notes.md` entry conflicts with the rendered
artifact or another entry, call out the conflict instead of choosing silently.

Separate:

- actual intended product behavior
- simulated review behavior
- deferred or out-of-scope behavior
- illustrative placeholder values

Placeholder values in approved artifacts are illustrative unless the handoff
explicitly promotes them into requirements, configuration, or final copy.

## Review Gate

Do not consider the Design Handoff Package complete unless:

- the latest source revisions are identified
- revision-local `notes.md` files were read fully or explicitly reported
  missing
- source approval status is stated
- the Review Decision History summarizes every update record's final handoff
  impact
- every included screen has a purpose and primary action
- route and navigation behavior is documented
- every non-obvious component is named and explained
- important interactions and states are documented
- forms, fields, validation, and submit behavior are documented when forms
  exist
- simulated behavior and deferred behavior are separated
- illustrative placeholder values are identified instead of silently treated
  as final copy or configuration
- open questions are listed instead of hidden
