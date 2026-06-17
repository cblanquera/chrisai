# React Section Comments

Use JSX section comments only when the component or JSX return is large enough
that the reader benefits from clear section boundaries.

## Required Pattern

Use the exact `START` / `END` format:

```tsx
{/* START: Post Image */}
<figure className="post-image">
  <img alt={post.title} height="60" src={post.image} />
</figure>
{/* END: Post Image */}
```

Do not use unlabeled or one-sided section comments:

```tsx
{/* Post Image */}
<figure className="post-image" />
```

## When To Apply

- Large render blocks with multiple visually distinct regions
- Long components where sections map cleanly to UI concepts
- Files that already use section comments and benefit from consistency

## When Not To Apply

- Small components
- Short render blocks
- Places where section comments would outnumber or distract from the actual UI
