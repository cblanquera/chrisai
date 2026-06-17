# Logic Review Signals

Use these signals to guide review judgment. They are not a required scoring
system and should not be reported as raw metrics unless the user asks.

## Cyclomatic Complexity

Cyclomatic complexity estimates how many independent control-flow paths exist in
a function or method.

Increase concern when logic contains:

- `if`, `else if`, loops, `case`, `catch`, ternaries, and short-circuit
  boolean branches that change behavior
- guard clauses whose ordering affects user-visible results
- async branches that choose different retry, fallback, or error behavior
- validation branches that return different messages, statuses, or field errors

Use the signal to ask: how many meaningful paths should tests prove?

Avoid over-weighting syntax that does not create meaningful review risk. For
example, optional chaining may count in some tools, but it is often just nullish
access protection unless the fallback behavior matters.

## Cognitive Complexity

Cognitive complexity estimates how hard the logic is to understand.

Increase concern when logic contains:

- nested conditionals or loops
- mixed positive and negative conditions
- long branch chains where each branch carries different business meaning
- local state mutation across multiple branches
- callback, promise, or closure nesting that hides the execution order

Prefer this signal over raw path count when deciding whether code is hard to
maintain.

## Nesting Depth

Deep nesting makes it harder to see which conditions are active at a line.

Watch for:

- `if` inside `if` inside loops
- `try` / `catch` blocks with inner branching
- React hooks or callbacks with nested guards and side effects
- test setup nested inside callbacks or helper closures

Suggested improvements often include guard clauses, extracted helpers, named
predicates, or smaller phases with clear intermediate names.

## Boolean Expression Complexity

Dense boolean expressions hide decision rules.

Watch for:

- several `&&` and `||` operators in one condition
- mixed negation such as `!isReady || !hasAccess && isOwner`
- repeated subexpressions across functions or tests
- conditions that combine unrelated concepts such as role, account state,
  feature flag, region, and inventory

Suggested improvements often include named predicates, explicit intermediate
variables, or table-driven tests that make each combination visible.

## Decision-Table Size

Decision-table size estimates how many meaningful input combinations the logic
has.

Increase concern when behavior depends on combinations of:

- roles or permissions
- status enums and discriminated unions
- feature flags
- config options
- request method, content type, and auth state
- retry count, error type, and fallback availability

The goal is not to test every theoretical combination. Identify the meaningful
combinations that would change the result, side effect, or error path.

## Branch Coverage Gap

Branch coverage gap compares visible decision paths to tests.

Look for tests that miss:

- `else`, `default`, and `catch` paths
- false branches for feature flags or permission checks
- boundary values such as empty arrays, missing fields, zero, expired dates, and
  unknown enum values
- ordering behavior when the first matching branch wins
- failure modes for external boundaries

Do not assume line coverage proves branch coverage. A line can execute while an
important condition outcome remains untested.

## Mutation Risk

Mutation risk asks whether tests would fail if a small logic change were wrong.

High-risk examples:

- `>` changed to `>=`
- `&&` changed to `||`
- a negation removed
- a default branch changed
- an early return moved above another guard
- a caught error swallowed instead of rethrown

Use this as a review lens. Do not require StrykerJS or mutation tooling unless
the project already uses it or the user asks for it.

## Fan-Out And Responsibility Spread

Fan-out is the number of collaborators a logic unit coordinates.

Increase concern when a function both branches and coordinates many of:

- services
- repositories
- network clients
- event emitters
- stores
- analytics
- cache layers
- filesystem or process state

High fan-out plus branching is riskier than branching alone because each path
may trigger different side effects.

## Duplicate Decision Logic

Duplicate decision logic is the same rule repeated in multiple places.

Look for:

- matching conditions in source and tests
- the same permission rule in UI and API code
- validators and submit handlers checking the same field combinations
- status transition rules repeated across handlers
- fixtures that encode production rules instead of observing behavior

Suggest centralization only when it reduces divergence risk. Sometimes duplicate
test setup is clearer than a shared helper that hides the scenario.

## TypeScript-Specific Review Notes

TypeScript features can either clarify or hide logic. Use these notes only when
the reviewed code is TypeScript.

Helpful patterns:

- discriminated unions with exhaustive `switch`
- typed result objects for success and failure paths
- named type guards for reusable narrowing rules
- `satisfies` in tests and fixtures to keep scenarios honest

Risk patterns:

- broad `as` assertions that bypass narrowing
- optional fields used as implicit state machines
- impossible states represented by loose object types
- overloaded functions with branch behavior based on argument shape
- generic helpers that hide runtime decision rules

Prefer clearer types when they remove impossible branches or make missing test
cases easier to see.
