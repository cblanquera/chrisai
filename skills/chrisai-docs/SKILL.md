---
name: chrisai-docs
description: Use when a ChrisAI documentation task needs routing to the right docs workflow or reference for onboarding, API reference, formatting, or copy editing.
---

# ChrisAI Docs

Use this skill for ChrisAI documentation work. Route the task to the narrowest
internal workflow or reference unless the request clearly needs a deliberate
sequence.

Do not treat the workflow and reference files as separate skills. They are
internal guidance for this consolidated skill.

## Internal Guidance

- Use `workflows/copy-editing.md` when the user asks to proofread, tighten,
  clarify, simplify, or improve existing documentation without changing its
  technical meaning or owning its information architecture.
- Use `references/onboarding.md` when the user asks to create or restructure
  quick starts, tutorials, getting-started guides, conceptual explanations,
  first-success flows, reader journeys, or progressive-disclosure docs.
- Use `references/api-reference.md` when the user asks to write, restructure,
  or review lookup-oriented docs for APIs, modules, classes, functions,
  methods, CLI commands, config, schemas, parameters, return values, errors,
  or typed usage examples.
- Use `references/formatting.md` when the user asks to normalize markdown
  presentation after the content strategy is clear, including headings, TOCs,
  outline numbering, spacing, list style, code fence language tags, links,
  anchors, and repo style-guide conformance.

## Sequencing

Only chain internal guidance when there is a clear owner plus a clear
follow-up. Use this order:

1. `references/onboarding.md` or `references/api-reference.md` first when the
   task needs content ownership.
2. `workflows/copy-editing.md` second when the prose needs an editorial pass.
3. `references/formatting.md` last when the output still needs markdown or
   structure cleanup.

Do not default to multi-step documentation sequences.

## Decision Rules

- If the request mixes onboarding and reference, choose the primary user goal
  first; only add formatting later if needed.
- If the request is mainly about proofreading, clarity, transitions, or tone
  rather than document ownership, use `workflows/copy-editing.md`.
- If the request is mainly about lookup-oriented API, class, module, function,
  configuration, or typed example material, use
  `references/api-reference.md`.
- If the request is mainly about a quick start, tutorial, conceptual guide, or
  junior-developer learning path, use `references/onboarding.md`.
- If the document type is already correct and the task is markdown structure,
  outline numbering, links, TOC, spacing, or style cleanup, use
  `references/formatting.md`.
