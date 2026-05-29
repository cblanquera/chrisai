# Mocha + Chai

Use this reference when the touched repo or suite already uses Mocha and Chai.

## Suite Workflow

1. Match nearby file placement and helper style first.
2. Prefer `async/await` over `done` callbacks.
3. Restore Sinon sandboxes, fake timers, and stubs in `afterEach`.
4. Keep assertions focused on observable results and owned side-effects.

## Preferred Patterns

- Use `expect` assertions when the repo already does.
- Reuse shared builders and helpers before creating large fixtures.
- Stub only real boundaries such as I/O, time, randomness, or external clients.

## Common Failure Modes

- shared stubs bleed between tests because restore paths are incomplete
- promise failures are asserted indirectly instead of at the awaited boundary
- tests verify internal helper calls instead of public behavior
- fake timers hide order or cleanup bugs when they are not restored correctly
