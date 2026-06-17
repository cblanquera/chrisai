# React Commenting Style

Use this reference on the final style pass when the component already works and
the remaining job is to make the author's voice visible in the file.

## Core Rules

- Comments are expected by default.
- Minimum comment density is per logical block.
- Increase comment density toward line-by-line when the component branches,
  carries state, or hides assumptions.
- Story-style comments are welcome, but they should stay local to the code they
  narrate.
- When a control-flow step spans multiple lines, prefer separate comments for
  the condition and the consequence.
- When a control-flow step fits cleanly on one line, one combined comment is
  acceptable.
- The first line of a `//` comment block has no space after `//`.
- Continuation lines in the same wrapped comment block do have a space after
  `//`.

## Conditionals

```tsx
//if there is a hero image
if (post.image) {
  //then render the hero image
  return <img alt={post.title} src={post.image} />;
}

//if there is a hero image, then render the hero image
if (post.image) return <img alt={post.title} src={post.image} />;
```

## Render Callbacks

```tsx
//for each post, render the post row
const rows = posts.map(post => (
  <PostRow key={post.id} post={post} />
));

const rows = posts.map(post => {
  //if the post has an image
  if (post.image) {
    //then render the image row
    return <PostImageRow key={post.id} post={post} />;
  }

  //otherwise render the summary row
  return <PostSummaryRow key={post.id} post={post} />;
});
```

## Ternaries

```tsx
//if the post has an image, then use the image layout
const layout = post.image ? 'with-image' : 'summary-only';

//if the post has an image
const layout = post.image
  //then use the image layout
  ? 'with-image'
  //otherwise use the summary layout
  : 'summary-only';
```

## Wrapped Comments

```tsx
//from here we can assume the page already loaded
// the current post collection and this component only needs
// to derive what rows and sections it should render next
```
