# React JSDoc And Declaration Comments

Use this reference during the final style pass when the component logic already
works and the remaining job is to document intent clearly.

## JSDoc Coverage

- Every function gets `/** ... */`.
- Every custom hook gets `/** ... */`.
- Every class method, if present, gets `/** ... */`.
- Exported components, hooks, functions, and classes get `/** ... */`.
- For exported classes, the JSDoc should explain the class role and how callers
  instantiate or use it.
- Keep JSDoc to a short description by default.
- Do not add `@param`, `@returns`, or similar tags unless the user explicitly
  asks for them.
- Do not place a `//comment` declaration note directly above the JSDoc block
  for the same function, hook, method, or class.

```tsx
/**
 * Build the post list state and handlers the page needs to render cleanly.
 */
function usePostIndex(config: PostIndexProps) {
  return config;
}

/**
 * Render the post summary block used by the index page.
 */
export function PostSummary(props: PostSummaryProps) {
  return <article>{props.title}</article>;
}
```

## Declaration Comments

- Use JSDoc for functions, hooks, methods, and classes.
- Keep `//` declaration comments for exported types, exported constants, and
  class properties.
- Do not duplicate declaration comments above a JSDoc block for the same
  function, hook, method, or class.
- Add `//` comments above every class property to explain what it is, where it
  is used, and how it is expected to change.
- Add `//` comments above exported types, constants, properties, and other
  exported declarations to explain what they are, where they are used, and how
  they are used.

```tsx
//The public contract shared by the post index page and the local state hook
// so both pieces read the same input shape for filters and post data.
export type PostIndexProps = {
  posts: PostSummaryShape[],
  selectedTag?: string
};

//The default page size exported so the index page and pagination helper can
// stay aligned on how many posts should render before paging.
export const DEFAULT_POST_LIMIT = 12;

export default class PostIndexController {
  //The current selected tag is updated by filter handlers and reused by the
  // render flow so the page knows which posts should remain visible.
  public selectedTag = '';

  public constructor(selectedTag = '') {
    this.selectedTag = selectedTag;
  }
}

//The public card contract shared by the page and the summary component so
// both pieces render the same title, image, and path values.
export type PostSummaryProps = {
  title: string,
  image?: string,
  path: string
};
```
