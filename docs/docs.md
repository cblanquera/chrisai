# ChrisAI Docs

`chrisai-docs` is the ChrisAI technical writing skill for developer-facing
documentation.

Use it when the work is about explaining technical material to developers:
quick starts, tutorials, API references, configuration docs, CLI docs,
technical README sections, markdown cleanup, or copy editing existing
developer docs.

Do not use it for general documentation by default. Business docs, marketing
copy, project planning notes, operational policy, and non-technical knowledge
base content should use another skill unless the user explicitly asks to treat
that material as developer-facing technical documentation.

Source skill: [`skills/chrisai-docs`](../skills/chrisai-docs/SKILL.md)

## What Happens When It Activates

The skill first decides which internal guide owns the task. Most tasks should
use one primary path. If the work needs a sequence, it uses content ownership
first, copy editing second, and formatting last.

## Activation Scenarios

| User intent | Internal guide | What happens |
| --- | --- | --- |
| Create or restructure a quick start, tutorial, getting-started guide, conceptual explanation, first-success flow, reader journey, or guided walkthrough. | [`references/guided-learning.md`](../skills/chrisai-docs/references/guided-learning.md) | The documentation is shaped around junior-developer learning. The guide identifies the reader state, defines the first visible success, separates tutorial/explanation/reference material, and uses a guided teaching arc instead of a reference-table dump. |
| Write or restructure API, module, class, function, method, CLI, config, schema, parameter, return value, error, or typed example docs. | [`references/api-reference.md`](../skills/chrisai-docs/references/api-reference.md) | The documentation is optimized for lookup and correctness. The guide identifies the technical surface, organizes the page by public API shape, documents methods and returns clearly, adds realistic examples, and links related integration paths. |
| Normalize markdown structure after the content strategy is already clear. | [`references/formatting.md`](../skills/chrisai-docs/references/formatting.md) | The documentation keeps its current content owner, then gets cleaned up for presentation. The guide checks headings, TOCs, outline numbering, spacing, list style, code fence language tags, links, anchors, and repo style consistency. |
| Proofread, clarify, simplify, tighten, or improve existing technical docs without changing technical meaning. | [`workflows/copy-editing.md`](../skills/chrisai-docs/workflows/copy-editing.md) | The documentation gets an editorial pass. The workflow preserves API meaning, behavior claims, identifiers, defaults, constraints, and caveats while improving clarity, terminology, transitions, sequencing, and junior-developer readability. |

## Common Examples

Use
[`references/guided-learning.md`](../skills/chrisai-docs/references/guided-learning.md)
when the request sounds like:

- "Write a getting started guide for this package."
- "Make this tutorial easier for junior developers."
- "Turn this dense explanation into a guided lesson."
- "Add a teaching style for this concept."
- "Restructure this page so the reader gets to first success faster."

Use
[`references/api-reference.md`](../skills/chrisai-docs/references/api-reference.md)
when the request sounds like:

- "Document this class."
- "Write API docs for these methods."
- "Explain these config options."
- "Create reference docs for this CLI command."
- "Add examples for the return value and error cases."

Use
[`references/formatting.md`](../skills/chrisai-docs/references/formatting.md)
when the request sounds like:

- "Clean up this markdown."
- "Normalize headings and TOC."
- "Fix code fence languages."
- "Make this match the repo docs style."
- "Organize this existing page without changing the content plan."

Use
[`workflows/copy-editing.md`](../skills/chrisai-docs/workflows/copy-editing.md)
when the request sounds like:

- "Proofread this doc."
- "Make this clearer without changing meaning."
- "Tighten the prose."
- "Improve transitions and terminology."
- "Simplify this for junior developers."

## Sequencing

Some requests need more than one path. Use this order:

1. [`references/guided-learning.md`](../skills/chrisai-docs/references/guided-learning.md)
   or
   [`references/api-reference.md`](../skills/chrisai-docs/references/api-reference.md)
   when the page needs content ownership.
2. [`workflows/copy-editing.md`](../skills/chrisai-docs/workflows/copy-editing.md)
   when the prose needs an editorial pass.
3. [`references/formatting.md`](../skills/chrisai-docs/references/formatting.md)
   when the final markdown needs cleanup.

Do not run every path by default. Use the smallest path that solves the user's
technical writing request.

## Non-Activation Cases

Do not activate `chrisai-docs` for:

- marketing pages or sales copy
- product positioning docs
- business process docs
- meeting notes or project planning notes
- internal policy docs
- non-technical help center articles
- generic proofreading outside developer-facing technical docs

If the user explicitly says the material should become developer-facing
technical documentation, then `chrisai-docs` can activate and route to the
closest internal guide.
