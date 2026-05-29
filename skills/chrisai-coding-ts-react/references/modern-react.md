# Modern React

Use this reference when the repo's rendering model or state placement is part
of the task.

## Rendering Boundary Checks

- Inspect whether the repo distinguishes server and client components.
- Keep browser-only hooks and event handlers on the client side.
- Avoid moving data fetching into the client when the local architecture already
  resolves it earlier.
- Preserve the package's existing routing and rendering boundaries unless the
  user asks to change them.

## State Placement Rules

- Keep state as close as possible to the component that truly owns it.
- Lift state only when multiple consumers need to coordinate behavior.
- Prefer derived values over duplicated mirrors of existing state.
- Extract a hook when several pieces of state, effects, and handlers already
  form one reusable unit.

## Interaction Rules

- Prefer intent-revealing handlers over large inline anonymous functions.
- Keep render blocks declarative and move preparation logic above JSX.
- Prefer browser and React primitives before adding helper dependencies.

## Review Questions

- Does the rendering boundary match the repo's architecture?
- Is state placed at the lowest useful owner?
- Did the change reduce or increase accidental coupling?
- Would a later maintainer understand where async work and UI state live?
