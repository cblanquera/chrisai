# Test JSDoc And Declaration Comments

Use this reference during the final style pass when the tests already work and
the remaining job is to document intent clearly.

## JSDoc Coverage

- Every function gets `/** ... */`.
- Every class method gets `/** ... */`.
- Local helpers, shared builders, and exported test helpers all get
  `/** ... */`.
- Keep JSDoc to a short description by default.
- Do not add `@param`, `@returns`, or similar tags unless the user explicitly
  asks for them.

```ts
/**
 * Build a request shape with sensible defaults for this suite.
 */
function makeRequest(overrides: Partial<RequestShape> = {}) {
  return { ...defaults, ...overrides };
}

describe('resolveRequest()', () => {
  /**
   * Build the context object each test mutates for its own scenario.
   */
  function makeContext(overrides: Partial<ContextShape> = {}) {
    return { ...contextDefaults, ...overrides };
  }

  it('returns the fallback route when the request path is empty', () => {
    const context = makeContext({ path: '' });

    expect(resolveRequest(context)).to.equal('/fallback');
  });
});
```

## Declaration Comments

- Add `//` comments above class properties and shared declarations when the
  reader benefits from knowing what they are, where they are used, or how they
  are expected to change.

```ts
//This fixture is reused by the success-path and retry-path suites so both
// cases start from the same owned default request shape.
const defaults = {
  path: '/health'
};

describe('resolveRequest()', () => {
  //This shared error is asserted by the invalid-input tests so each case
  // compares against the same owned message.
  const expectedError = 'Request path is required';

  it('throws when the request path is empty', () => {
    expect(() => resolveRequest({ path: '' })).to.throw(expectedError);
  });
});
```
