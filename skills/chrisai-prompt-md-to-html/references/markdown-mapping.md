# Markdown Mapping

The renderer maps Markdown tokens to fixed HTML components.

## Core Blocks

| Markdown | HTML treatment |
| --- | --- |
| `#` | document title / `h1` |
| `##` through `######` | section headings |
| paragraph | prose block |
| unordered list | list block |
| ordered list | numbered list block |
| task list item | checkbox-style list item |
| blockquote | callout block |
| horizontal rule | section divider |
| table | responsive table wrapper |
| fenced code | syntax-highlighted code panel |
| fenced `diff` | syntax-highlighted diff panel |
| fenced `mermaid` | Mermaid diagram block |
| image | figure |
| link | safe anchor |
| raw HTML | escaped text |

## Callout-Like Blockquotes

Blockquotes that start with a label receive a callout style:

```markdown
> Note: This is useful context.
> Warning: This needs attention.
> Error: This failed.
> Success: This passed.
```

Supported labels:

- `note`
- `tip`
- `warning`
- `error`
- `success`

## Mermaid

Use Mermaid fences for diagrams:

````markdown
```mermaid
flowchart TD
  A --> B
```
````

The renderer includes Mermaid support only when a Mermaid fence is present.

## Charts

Chart fences are reserved for a future fixed schema. Until chart support is
implemented, chart fences render as highlighted code blocks.

## Fallbacks

Unsupported Markdown nodes should render as escaped text or plain blocks. The
artifact should remain readable even when enhanced treatment is unavailable.
