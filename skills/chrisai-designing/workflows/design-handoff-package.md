# Design Handoff Package

Use this workflow when the user asks for documentation based on generated
wireframes, creatives, clickable drafts, functional creatives, or any
combination of those artifacts.

The Design Handoff Package is markdown documentation derived from generated
design artifacts. This is separate from wireframes and creatives themselves,
which must remain HTML/CSS/JS review artifacts unless the user explicitly asks
for text-only planning.

After the relevant wireframe and/or creative phases are approved, produce a
final standalone handoff package. If the user explicitly requests documentation
before approval, produce an interim handoff marked `pending`; do not present it
as implementation-ready. Both forms must be usable without reopening rendered
HTML.

## Handoff Modes

- **Final handoff:** requires approved included source phases and may be used
  for creative design or frontend implementation.
- **Interim handoff:** requires an explicit user request, records source status
  as `pending` or `unknown`, preserves unresolved questions, and must state that
  implementation should wait for phase approval.

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

Use [wireframe-drafts](wireframe-drafts.md), [design-drafts](design-drafts.md),
and [feedback-loop](feedback-loop.md) for artifact creation and approval before
treating generated artifacts as approved sources.

## Workflow

Work through these steps in order:

1. find the latest relevant wireframe and creative revision folders
2. read revision-local wireframe and creative `specs.md` files
3. read every entry in the revision-local `notes.md` review logs when present
4. identify approval status and any unresolved review notes
5. extract the screen inventory and user flows
6. document component identity and purpose
7. document interaction behavior and state changes
8. document functional assumptions and simulated behavior
9. document routes, forms, fields, and validation behavior
10. synthesize the update history into final decisions, superseded directions,
   remaining review notes, and open questions
11. document implementation priority

If only wireframes exist, generate the package from the latest wireframe
revision. If only creatives exist, generate the package from the latest
creative revision. If both exist, use both and clearly identify which source
owns structure versus visual treatment.

Choose final or interim mode before drafting the package. Never silently turn
unapproved source artifacts into a final handoff.

## Required Package Structure

Use this structure unless the user asks for another format:

```markdown
# Design Handoff Package

## Source Artifacts
- Wireframe revision: <path or none>
- Wireframe spec: <specs.md path or none>
- Creative revision: <path or none>
- Creative spec: <specs.md path or none>
- Review notes: <notes.md path or none>
- Handoff mode: <final or interim>
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

## Synthesis Rules

- Name components by function, not appearance; explain purpose, visible parts,
  actions, states, and simulated or deferred behavior.
- Document non-obvious interactions, validation, responsive behavior, and
  implementation intent explicitly.
- Make the package understandable without reopening rendered HTML.
- Read all `specs.md` and `notes.md` records, reconcile current, superseded,
  deferred, and open decisions, and report source conflicts rather than
  choosing silently.
- Separate intended product behavior, review simulations, deferred scope, and
  illustrative values. Treat illustrative values as non-final unless promoted
  explicitly.

## Review Gate

Do not consider the Design Handoff Package complete unless:

- the latest source revisions are identified
- revision-local wireframe and creative `specs.md` files were read or
  explicitly reported missing
- revision-local `notes.md` files were read fully or explicitly reported
  missing
- source approval status is stated
- final mode includes only approved source phases
- interim mode is explicitly labeled pending or unknown and not
  implementation-ready
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
