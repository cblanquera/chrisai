---
name: chrisai-process
description: Use when a ChrisAI process task needs routing to staged feedback-loop handling, local `.agents` progress workflows, progress logs, decisions, or handoffs.
---

# ChrisAI Process Router

Use this family router for ChrisAI process work that supports another owning
domain skill or coordinates larger work over time.

Do not duplicate specialist instructions here. Route, then defer.

## Specialist Routes

- Use `chrisai-process-feedback-loop` with the owning domain skill when the
  task shows a draft, prototype, rendered page, local app, screenshot,
  recording, or other reviewable artifact in the in-app browser and the user is
  expected to approve, reject, or revise what they see.
- For large work in projects with `.agents/AGENTS.md`, use the owning domain
  skill plus `.agents/workflows/progress.md` when the task needs
  filesystem-backed work packets, durable decisions, progress logs, handoffs,
  or optional delegation.

## Decision Rules

- Use `chrisai-process-feedback-loop` for staged browser review, concrete
  review questions, round approval, phase approval, and exact next-step
  language.
- Do not use `chrisai-process-feedback-loop` by itself to create the artifact.
- Do not use `chrisai-process-feedback-loop` instead of
  `chrisai-qa-playwright` when the primary deliverable is QA, screenshots,
  recordings, or responsive browser verification.
- Use `.agents/workflows/progress.md` for large artifact-production,
  multi-item implementation, broad migrations, or long-running tasks that may
  drift or span sessions when the current `.agents` setup exists.
- Do not create progress state for small tasks that fit cleanly in the active
  chat.
- Do not let progress workflow replace the domain skill that owns the actual
  work.
- When separate sessions may help, ask the user before spawning or delegating.
