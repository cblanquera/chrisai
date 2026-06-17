---
name: chrisai-chatting
description: Use for experimental chat-session experience work, including session caching and recall, intake from HTML form-submission artifacts, and converting agent responses into HTML artifacts.
---

# ChrisAI Chatting

Use this skill for experimental workflows that improve the shape, continuity,
or artifact interface of chat sessions. Treat this skill as a placeholder until
its workflow files are created.

Do not use this skill for general conversation quality, prompt editing, broad
assistant behavior design, or production application implementation unless the
request is specifically about chat-session experience patterns.

## Planned Workflows

The detailed workflow files are intentionally not created yet. When the user
asks to draft or implement one of these workflows, create the narrowest
workflow file needed and keep the guidance portable across Codex, Claude Code,
OpenCode, and other compatible consumers.

- `workflows/chat-session-caching-and-recall.md`: For preserving useful chat
  context, producing compact recall artifacts, deciding what should be cached,
  and rehydrating prior session state without overloading a new conversation.
- `workflows/html-form-intake.md`: For turning submitted HTML form artifacts
  into structured intake, validation notes, follow-up questions, and a usable
  task brief.
- `workflows/agent-response-to-html.md`: For converting agent responses into
  readable, reviewable, or shareable HTML artifacts while preserving the
  meaning and structure of the original response.

## Placeholder Rules

- Keep this skill experimental and review-first until a workflow has concrete
  examples, input/output expectations, and clear success criteria.
- Prefer artifact-oriented outputs when the user provides or asks for HTML.
- Preserve source meaning when transforming chat content into cache summaries,
  intake briefs, or HTML artifacts.
- Separate session-memory guidance from repository memory, application state,
  or long-term user profile storage unless the user explicitly asks to connect
  those systems.
- Do not invent persistence, storage, browser automation, or deployment
  behavior. Describe assumptions and ask for the missing target environment
  when those choices matter.

## Decision Rules

- If the task is about compacting, saving, recalling, or transferring useful
  chat-session context, route it to the planned chat-session caching and recall
  workflow.
- If the task starts from an HTML form submission, exported form artifact, or
  submitted HTML payload, route it to the planned HTML form intake workflow.
- If the task asks for a response, summary, report, or handoff to become an
  HTML file or HTML fragment, route it to the planned agent response to HTML
  workflow.
- If the request spans multiple planned workflows, choose the workflow that
  owns the first concrete artifact and keep any follow-up workflow explicit.
