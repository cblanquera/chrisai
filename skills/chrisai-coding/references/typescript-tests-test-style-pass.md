# Test Style Pass

Use this reference after the tests already pass.

## What The Final Pass Should Improve

- Comments explain the scenario, setup, action, and assertion flow clearly.
- JSDoc exists on helpers and methods.
- Shared declarations have enough nearby context to understand their role.
- Titles still read like behavior.
- Comment density matches the complexity of the scenario.

## When To Comment More

- The test has setup branches.
- A builder or helper hides important assumptions.
- A callback or loop creates multiple cases in one test.
- The assertion depends on a subtle business rule.

## When To Stay Lighter

- The scenario is already obvious from the test name and one or two lines of
  setup.
- Extra comments would repeat the code instead of explaining intent.
