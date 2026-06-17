# Jest

Use this reference when the touched repo or suite already uses Jest.

## Suite Workflow

1. Match nearby file placement and naming first.
2. Reuse existing setup utilities before inventing new helpers.
3. Await all async work directly instead of leaning on timing hacks.
4. Reset mocks, modules, and fake timers when the suite needs isolation.

## Preferred Assertions

- Prefer explicit assertions over large snapshots.
- Prefer user-visible outcomes over implementation details.
- Prefer `findBy` queries, `waitFor`, or resolved promises over raw timeouts.

## Common Failure Modes

- `mockResolvedValue` infers `never` because the mock lacks a typed promise
  signature.
- async work is started but never awaited before assertions run.
- fake timers or mocked modules leak between tests.
- React tests assert internal state instead of visible behavior.
