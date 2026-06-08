---
name: chrisai-docs
description: Use when a ChrisAI documentation task needs routing to the narrowest onboarding, API reference, formatting, or copy-editing specialist.
---

# ChrisAI Docs Router

Use this family router for ChrisAI documentation work. Choose exactly one
documentation specialist unless the task clearly needs a deliberate sequence.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-docs-dev-api-reference` for API pages, module/class/function
  reference docs, config docs, and lookup-oriented examples.
- Use `chrisai-docs-dev-onboarding` for quick starts, tutorials, conceptual
  guides, and junior-developer-first learning flows.
- Use `chrisai-docs-copy-editing` for proofreading, wording cleanup, clarity
  improvement, tone consistency, and prose simplification without changing
  technical meaning.
- Use `chrisai-docs-dev-formatting` for markdown normalization, structure
  cleanup, outline numbering, TOC decisions, and style-guide conformance after
  the document type is already understood.

## Sequencing

Only chain documentation specialists when there is a clear owner plus a clear
follow-up:

1. content owner first
2. copy editing second when the prose needs an editorial pass
3. formatting last if the output still needs structure cleanup

Do not default to multi-skill documentation sequences.

## Decision Rules

- If the request mixes onboarding and reference, choose the primary user goal
  first; only add formatting later if needed.
- If the request is mainly about proofreading, clarity, transitions, or tone
  rather than document ownership, prefer `chrisai-docs-copy-editing`.
- If the request is mainly about lookup-oriented API, class, module, function,
  configuration, or typed example material, prefer
  `chrisai-docs-dev-api-reference`.
- If the request is mainly about a quick start, tutorial, conceptual guide, or
  junior-developer learning path, prefer `chrisai-docs-dev-onboarding`.
- If the document type is already correct and the task is markdown structure,
  outline numbering, links, TOC, spacing, or style cleanup, prefer
  `chrisai-docs-dev-formatting`.
