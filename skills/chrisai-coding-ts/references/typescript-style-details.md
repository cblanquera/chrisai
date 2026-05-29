# TypeScript Style Details

## Exports

- End exported constants, functions, classes, and default exports with
  semicolons.
- When a file has multiple export categories, order them as:
  1. Types
  2. Constants
  3. Functions
  4. Classes
  5. Default export
- Keep that category order, then alphabetize exports within each category by
  exported name.

```ts
//--------------------------------------------------------------------//
// Types

//The shared route event names accepted by the request resolver.
export type RouteEvent = "boot" | "request" | "error";

//The public request shape passed through the route pipeline.
export type RequestState = {
  method: string,
  path: string
};

//--------------------------------------------------------------------//
// Constants

//Expose the shared route status values so handlers and formatters can compare
// the same owned status codes without repeating magic numbers.
export const ROUTE_STATUS = {
  ok: 200,
  notFound: 404
};

//--------------------------------------------------------------------//
// Functions

/**
 * Return the status code that should be sent for the request.
 */
export function getRouteStatus(path: string) {
  return path === '/' ? ROUTE_STATUS.ok : ROUTE_STATUS.notFound;
};

//--------------------------------------------------------------------//
// Classes

/**
 * Keep route-resolution behavior together in one place.
 */
export class RouteResolver {};

//--------------------------------------------------------------------//
// Exports

export default getRouteStatus;
```

## Types

- Prefer `type` for object shapes, unions, aliases, and function signatures.
- Use `interface` for class contracts and shapes implemented by classes.
- Use commas, not semicolons, inside object types.
- Use one space after the colon in type annotations and none before it.
- Put spaces around `|` and `&`.
- Prefer `unknown` over `any`.
- If `any` is unavoidable, justify it with a nearby `//` comment first.

```ts
type RouteDefinition = {
  path: string,
  method: string
};

interface RouteStore {
  routes: RouteMap,
  register(definition: RouteDefinition): Promise<void>
}

type RouteSummary = Pick<RouteDefinition, 'path' | 'method'>;
type RouteMap = Record<string, RouteDefinition>;
```

## Imports

- Group imports under `//node`, `//modules`, and `//client`.
- Prefix Node imports with `node:`.
- Use `.js` for local ESM imports.
- Split type imports from runtime imports when needed to preserve ordering.

```ts
//node
import type { IncomingMessage } from 'node:http';
import { join } from 'node:path';
import http from 'node:http';

//modules
import type { Plugin } from 'stackpress';
import type Status from 'stackpress/types/Status';
import { Exception } from 'stackpress';
import Router from 'stackpress/Router';

//client
import type { RouteDefinition } from './types.js';
import { getRouteStatus } from './status.js';
import RouteResolver from './RouteResolver.js';
```

## Functions And Classes

- Let TypeScript infer parameter and return types when the result is still easy
  to understand.
- Add explicit types when they improve public API clarity.
- Prefer narrowing before acting on unknown input.
- Use explicit access modifiers on class members.
- Always write `public` on public properties, getters, setters, methods, and
  the constructor.
- Order class members as static properties, static methods, properties,
  getters, setters, constructor, then methods.
- Within each member group, order by access level as `public`, then
  `protected`, then `private`.
- Within each same-kind and same-access group, alphabetize by member name.
- Prefix `protected` and `private` methods with `_`.
- Prefer `public readonly` for stable public composition fields.
- Avoid `protected readonly` and `private readonly` unless a special case
  makes that boundary-level immutability materially clearer.
- Declare overload signatures before the shared implementation.

```ts
function incrementStatus(code: number, by = 1) {
  return code + by;
}

function toRouteList(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  return [ String(value) ];
}

export default class RouteResolver {
  public readonly handler: RouteHandler;

  public get routes() {
    return this.handler.routes;
  }

  public constructor(handler: RouteHandler) {
    this.handler = handler;
  }

  protected _resolveEvent(event: string) {}

  public async resolve(event: string): Promise<void>;
  public async resolve(method: Method, path: string): Promise<void>;
  public async resolve(a: string, b?: string) {
    if (typeof b === 'string') {
      return this._resolveRoute(a, b);
    }

    return this._resolveEvent(a);
  }
};
```
