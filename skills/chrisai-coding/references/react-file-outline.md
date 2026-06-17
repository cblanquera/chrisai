# React File Outline

Use this reference when a React file is large enough to benefit from stronger
structure.

## Component Internals

Prefer this order inside a component:

1. props
2. hooks
3. derived variables
4. handlers
5. effects
6. render

## File Sections

When a file has enough structure to justify explicit sections, prefer:

1. Imports
2. Types
3. Constants
4. Helpers
5. Hooks
6. Components

Use `//--------------------------------------------------------------------//`
only when those dividers improve scanning.

## Concrete Shape

When the file is large enough to justify sections, prefer a shape like:

```tsx
//--------------------------------------------------------------------//
// Types

export type PostIndexProps = {};

//--------------------------------------------------------------------//
// Constants

export const DEFAULT_POST_LIMIT = 12;

//--------------------------------------------------------------------//
// Helpers

export function getVisiblePosts() {};

//--------------------------------------------------------------------//
// Hooks

export function usePostIndex() {};

//--------------------------------------------------------------------//
// Components

export function PostIndexPage() {};
```

## Component Flow Example

```tsx
function PostIndexPage(props: PostIndexProps) {
  //start with props so the rest of the page reads from local names
  const { posts, selectedTag } = props;

  //create state next so later logic can derive values and handlers from it
  const [ query, setQuery ] = useState('');
  const [ activeTag, setActiveTag ] = useState(selectedTag ?? '');

  //derive the visible posts after props and state already exist
  const visiblePosts = getVisiblePosts(posts, query, activeTag);

  //define handlers before effects so behavior is easy to trace
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  //sync outside tag changes after the main state and handlers are prepared
  useEffect(() => {
    if (typeof selectedTag === 'string') {
      setActiveTag(selectedTag);
    }
  }, [ selectedTag ]);

  //render last so the JSX reads like the output of the earlier setup
  return (
    <section>
      {visiblePosts.map(post => <PostSummary key={post.path} {...post} />)}
    </section>
  );
}
```

## Aggregate Hook Example

```tsx
function usePostIndex(config: PostIndexProps) {
  //read the page inputs first so the hook builds from one stable source
  const { posts, selectedTag } = config;

  //create state before derived values and handlers
  const [ query, setQuery ] = useState('');
  const [ activeTag, setActiveTag ] = useState(selectedTag ?? '');

  //derive the visible posts once the state already exists
  const visiblePosts = getVisiblePosts(posts, query, activeTag);

  //keep handlers intent-focused instead of exposing raw setters
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  //sync external tag changes inside the hook so the component stays cleaner
  useEffect(() => {
    if (typeof selectedTag === 'string') {
      setActiveTag(selectedTag);
    }
  }, [ selectedTag ]);

  return { visiblePosts, query, activeTag, handleQueryChange };
}
```
