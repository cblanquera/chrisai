---
name: chrisai-prompt
description: Use when a ChrisAI prompt or prompt-artifact task needs routing to Markdown-to-HTML artifact generation or prior-conversation context caching.
---

# ChrisAI Prompt Router

Use this family router for ChrisAI prompt artifacts and prompt-context work.
Choose exactly one prompt specialist unless the task clearly needs both.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-prompt-md-to-html` when a Markdown or Codex text response should
  be converted into a deterministic single-file HTML artifact with a fixed
  layout, optional validated theme colors, syntax highlighting, Mermaid
  support, and safe fallbacks.
- Use `chrisai-prompt-cache` when the task is about preserving, indexing,
  chunking, retrieving, or handing off context from a prior conversation without
  loading the full transcript.

## Decision Rules

- If the request is mainly about converting a Markdown or Codex text response
  into a deterministic single-file HTML artifact, prefer
  `chrisai-prompt-md-to-html`.
- If the request is about repo-local prompt caches, conversation archives,
  semantic topic chunks, decision/evidence indexes, future-session retrieval,
  or inspectable conversation references, prefer `chrisai-prompt-cache`.
- Do not route production websites, frontend implementation, or open-ended
  design drafts to `chrisai-prompt-md-to-html`.
- Do not use `chrisai-prompt-cache` for required repo guidance that belongs in
  `AGENTS.md`.
- Do not use `chrisai-prompt-cache` for active multi-item execution state that
  belongs in `chrisai-process-task-bank`.
- Do not use `chrisai-prompt-cache` for private automatic personal recall that
  Codex Memories can handle better.
