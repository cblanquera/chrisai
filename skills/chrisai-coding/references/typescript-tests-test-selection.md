# Test Selection

Use this reference when it is unclear what kind of test to add.

## Choose A Unit Test When

- one function or class drives the behavior
- boundaries can be stubbed cleanly
- the risk is in branching logic, parsing, validation, or error handling
- the behavior does not need a rendered UI or full integration path

## Choose An Integration Test When

- the value is in several owned pieces working together
- request flow, persistence, or adapter wiring is part of the risk
- a unit test would mostly mock the real behavior away
- the code under test crosses a meaningful boundary you own

## Choose A DOM Test When

- the risk is in visible UI behavior
- a user interaction should drive the assertion
- accessibility labels, roles, focus, or conditional rendering matter
- hook internals are less important than what the page does

## Do Not Add A Test Yet When

- the behavior is already covered at the right layer
- the existing code is in heavy flux and the stable public behavior is unclear
- the only possible assertion is a tautology about mocked internals

## Selection Order

1. Start from the public behavior that could regress.
2. Choose the cheapest test layer that still observes that behavior honestly.
3. Mock only external boundaries you do not want to exercise for real.
4. Prefer one well-placed test over many overlapping low-signal tests.
