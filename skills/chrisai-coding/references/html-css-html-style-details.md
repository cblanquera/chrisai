# HTML Style Details

## Section Comments

Use section comments for major sections, blocks, and states when they improve
scanability. Use the exact `START` / `END` pattern:

```html
<!-- START: Post Image -->
<div class="post-image">
  <img alt="This is a post image" height="60" src="avatar.png" />
</div>
<!-- END: Post Image -->
```

## Structure And Readability

- Keep heading levels in order.
- Use no more than one `<h1>` per page.
- Do not place block elements inside inline elements.
- Do not place block elements inside `<p>` tags.
- Keep short inline content on one line when it remains readable.
- If inline text overflows, move the text content onto the next line.
- Treat inline tags such as `<strong>` as part of the same text flow.

## Attributes And Naming

- Use double quotes for attribute values.
- Keep attributes alphabetical.
- Put multiline attributes one per line.
- All `<a>` tags should have a `title` attribute when the project expects it.
- All `<img>` tags should have an `alt` attribute.
- Use lowercase dash-separated IDs only when JavaScript needs them.
- Prefer lowercase dash-separated class names with structural meaning.
- Keep class lists alphabetical when the file follows that pattern.

## Tag Usage

- Use `<br />` only for text breaks, not layout spacing.
- Use `<hr />` only for thematic changes in content.
- Do not use `<b>`, `<i>`, `<s>`, or `<font>`.
- Keep inline styles and inline scripts out of normal page code unless a clear
  project constraint requires them.
