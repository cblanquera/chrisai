# ChrisAI Coding Logic Review

Use this workflow for JavaScript or TypeScript logic reviews where the goal is
to understand branching risk, test adequacy, and refactor opportunities before
changing code.

This is a review-first workflow. Do not edit code during the initial review pass.
Present findings, then ask whether to apply all suggested changes, selected
changes, or no changes.

## Relationship To Other Skills

Use this workflow when the main question is whether existing JavaScript or
TypeScript logic is too complex, under-tested, duplicated, or risky to change.

Use `workflows/javascript.md` or `workflows/typescript.md` after the user
approves code edits so the resulting code follows language-specific code style,
comments, imports, exports, and typing rules.

Use `workflows/typescript-tests.md` after the user approves test edits so added
or changed tests follow the repo's test standards.

If the review reveals a module boundary, public API, adapter, or architecture
problem, mention it in the findings. Do not switch into architecture design
unless the user asks to proceed.

## Repo Discovery Workflow

Before reviewing logic, inspect the local codebase in this order:

1. the requested source files and nearby modules
2. related tests, fixtures, builders, and helper utilities
3. project lint, TypeScript, and coverage configuration
4. existing patterns for table-driven tests, validators, guards, reducers,
   services, hooks, and error handling

If local tooling already reports complexity, branch coverage, or mutation
results, use it as context. Do not turn the review into a tool setup task.

## Review Signals

Treat metrics as private review signals, not the report headline.

Read `references/logic-review-signals.md` when the review needs concrete
guidance on:

- cyclomatic complexity
- cognitive complexity
- nesting depth
- boolean expression complexity
- decision-table size
- branch coverage gaps
- mutation risk
- fan-out and responsibility spread
- duplicate decision logic

Do not show raw scores unless the user explicitly asks for them or a local tool
already made a score central to the request.

## Review Process

1. Identify the logic units worth reviewing. Prefer functions, methods,
   reducers, validators, route handlers, hooks, and service methods with
   meaningful branching or state combinations.
2. Map the important decision paths in plain language. Focus on branches that
   affect behavior, data safety, permissions, validation, retries, side effects,
   or user-visible output.
3. Compare those paths against the existing tests. Look for covered paths,
   missing paths, shallow assertions, tautological mocks, and brittle fixtures.
4. Decide whether each issue is real engineering risk or acceptable local
   complexity. Some dense logic is clear, isolated, and well-tested.
5. Produce findings that explain the practical risk and the smallest useful
   improvement.
6. Ask the user whether to apply all suggested changes, selected changes, or no
   changes.

## Finding Priorities

Use code-review severity, not metric severity.

- `P1`: likely broken behavior, a missing test for a high-risk branch that can
  already fail silently, or duplicated decision logic that can already diverge.
- `P2`: maintainability or correctness risk that is plausible but needs more
  proof, such as deeply nested control flow, unclear boolean expressions, or
  tests that miss important state combinations.
- `P3`: readability or simplification opportunity with low immediate risk.

Do not report every complex-looking function. Report issues only when there is a
clear reason a maintainer should act.

When in doubt between `P1` and `P2`, choose `P2` unless the reviewed code already
shows likely wrong behavior or a realistic failing path.

## Output Format

Lead with findings. Keep summaries secondary.

For each finding, include:

- priority
- file and line reference
- `Current behavior`: the risky logic in plain language
- `Test gap`: what current tests do or do not prove
- `Suggested change`: the smallest concrete change when the fix is clear
- `Suggested direction`: use this instead of `Suggested change` when the right
  fix needs more context, design choice, or verification before a patch
- a short `Current code` and `Proposed code` snippet when the improvement can
  be shown clearly without inventing unrelated code
- a unified diff instead of separate snippets when the proposed change is small
  enough to show clearly as a patch preview

Example:

P2 src/orders/eligibility.ts:42

Current behavior: the eligibility check combines account state, coupon state,
inventory, and region rules in one branch chain.

Test gap: current tests cover the happy path and one rejection, but they do not
prove mixed coupon + inventory failures choose the right rejection reason.

Suggested change: extract named rule predicates and add table-driven tests
for the meaningful state combinations before changing the order of the checks.

Current code:

```ts
if (account.isActive && coupon && inventory > 0 && region !== 'blocked') {
  return { ok: true };
}
```

Proposed code:

```ts
const hasUsableCoupon = Boolean(coupon);
const canFulfillOrder = inventory > 0 && region !== 'blocked';

if (account.isActive && hasUsableCoupon && canFulfillOrder) {
  return { ok: true };
}
```

For compact edits, prefer a diff preview:

```diff
-if (account.isActive && coupon && inventory > 0 && region !== 'blocked') {
+const hasUsableCoupon = Boolean(coupon);
+const canFulfillOrder = inventory > 0 && region !== 'blocked';
+
+if (account.isActive && hasUsableCoupon && canFulfillOrder) {
   return { ok: true };
 }
```

Keep snippets minimal. Label them so the user can tell what exists now and what
is proposed. They should illustrate the proposed direction, not act as a full
patch unless the user asks to apply the change. If a safe snippet or diff would
require too much surrounding context, say that and keep the finding prose-only.

When verification commands were run, add a short `Verification note` after the
findings. Mention both what passed or failed and any limitation the verification
does not cover, such as tests asserting generated strings without exercising a
formatter, database, browser, or external boundary.

After the findings, ask:

```text
Would you like me to apply all suggested changes, selected changes, or leave
this as review feedback only?
```

If there are no findings, say that clearly and mention any residual uncertainty,
such as tests not being runnable or branch coverage not being available.

## Applying Approved Changes

Only apply changes after the user approves all or selected findings.

When applying changes:

- preserve behavior unless the user explicitly approves a behavior change
- prefer extraction of named predicates, guard clauses, or table-driven tests
  over broad rewrites
- keep refactors close to the reviewed logic
- update tests for any changed or extracted decision paths
- run the narrowest relevant verification command available in the repo

After editing, summarize what changed and what verification ran.

## Common Mistakes

- Do not center the review on numeric scores.
- Do not auto-edit code during the review pass.
- Do not recommend refactoring well-tested, isolated logic only because it has
  several branches.
- Do not count language syntax as risky when it does not add meaningful
  behavior risk.
- Do not require mutation testing, branch coverage tools, or new lint rules.
- Do not replace business rules with abstractions that hide the decision table.
