# TypeScript JSDoc And Declaration Comments

Use this reference during the final style pass when the code behavior already
works and the remaining job is to document intent clearly.

## JSDoc Coverage

- Every function gets `/** ... */`.
- Every class method gets `/** ... */`.
- Exported functions and exported classes get `/** ... */`.
- For exported classes, the JSDoc should explain the class role and how callers
  instantiate or use it.
- Keep JSDoc to a short description by default.
- Do not add `@param`, `@returns`, or similar tags unless the user explicitly
  asks for them.
- Do not place a `//comment` declaration note directly above the JSDoc block
  for the same function, method, or class.

```ts
/**
 * Build the normalized route name from the incoming event.
 */
function getRouteName(event: string) {
  //trim the event first so route matching does not depend on outer whitespace
  const normalized = event.trim();

  //then lower the event so route lookups stay case-insensitive
  return normalized.toLowerCase();
}

/**
 * Return the status code that should be sent for the current request path.
 */
export function getRouteStatus(path: string) {
  //if the request path is the home page
  if (path === '/') {
    //then use the success status
    return ROUTE_STATUS.ok;
  }

  //otherwise use the not found status
  return ROUTE_STATUS.notFound;
}

/**
 * Resolve route requests by reading the registered route table and handing
 * matching requests to the shared request handler.
 */
export class RouteResolver {
  //The route table is filled during registration and then read by resolve()
  // and by plugins that inspect the active routes after boot.
  public readonly routes: RouteMap = {};

  /**
   * Register one route definition into the resolver route table.
   */
  public register(definition: RouteDefinition) {
    //store the route under its path so later resolve() calls can find it fast
    this.routes[definition.path] = definition;
  }

  /**
   * Resolve the incoming request path against the registered route table.
   */
  public resolve(path: string) {
    //if the path was registered
    if (this.routes[path]) {
      //then return the matching route
      return this.routes[path];
    }

    //otherwise return null so the caller can trigger not found handling
    return null;
  }
}
```

## Declaration Comments

- Use JSDoc for functions, methods, and classes.
- Keep `//` declaration comments for exported types, exported constants, and
  class properties.
- Do not duplicate declaration comments above a JSDoc block for the same
  function, method, or class.
- Add `//` comments above every class property to explain what it is, where it
  is used, and how it is expected to change.
- Add `//` comments above exported types, constants, properties, and other
  exported declarations to explain what they are, where they are used, and how
  they are used.

```ts
export default class Router {
  //The route table is filled during registration and then read by resolve()
  // and by plugins that inspect the active routes after boot.
  public readonly routes: RouteMap = {};

  //The request handler is reused by resolve() so route execution always flows
  // through the same boundary and plugins can decorate one shared handler.
  public readonly handler: RouteHandler;

  public constructor(handler: RouteHandler) {
    this.handler = handler;
  }
}

//The public route table shared by registration code, resolve(), and plugin
// hooks that inspect which route patterns were loaded.
export type RouteMap = Record<string, RouteDefinition>;

//Alphabetize exports within the same category after applying the category
// order used by the repo.
//The shared status map exported so route handlers and error formatters can
// compare the same owned status values without repeating magic numbers.
export const ROUTE_STATUS = {
  ok: 200,
  notFound: 404
};
```
