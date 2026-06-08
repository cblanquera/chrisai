---
name: chrisai
description: Alias entrypoint for the canonical ChrisAI router skill.
---

# ChrisAI

This skill is a convenience alias for `chrisai-router`.

Use `chrisai` when you want the shortest entrypoint into the ChrisAI skill
family. It should behave exactly like `chrisai-router`.

Do not maintain separate routing rules here.

Defer all routing behavior, decision rules, sequencing, and scope boundaries
to `chrisai-router`.

## Behavior

- Treat `chrisai` as an alias for `chrisai-router`.
- Route docs, coding, prompt, process, design, QA, and maintenance tasks through
  `chrisai-router`.
- Do not duplicate or drift from the canonical router instructions.
- If the canonical router changes, keep this alias aligned.
