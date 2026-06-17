# ChrisAI Chatting

`chrisai-chatting` is the experimental chat-session experience skill. Use it
when the request is about making a chat session easier to preserve, answer,
preview, or continue through a local artifact.

This skill is not for general conversation quality, broad assistant behavior
design, production web apps, or persistent data-collection systems. It owns
chat-session artifacts that help the current conversation work better.

Source skill: [`skills/chrisai-chatting`](../skills/chrisai-chatting/SKILL.md)

## What Happens When It Activates

The skill first decides which chat-session workflow owns the requested
artifact. Most requests use one workflow. If a request touches more than one
workflow, the agent starts with the workflow that produces the first concrete
artifact and keeps any follow-up step explicit.

## Activation Scenarios

| User intent | Internal workflow | What happens |
| --- | --- | --- |
| Cache, archive, summarize, index, retrieve, or recall a prior chat session or copied Codex Chat ID. | [`workflows/chat-session-caching-and-recall.md`](../skills/chrisai-chatting/workflows/chat-session-caching-and-recall.md) | The agent turns useful conversation context into small, searchable cache files. It writes an index first, splits topics by retrieval intent, records durable decisions, and treats cached material as historical evidence that should be checked against current repo state before acting. |
| Answer an agent intake prompt through a local HTML form instead of a normal chat reply. | [`workflows/html-form-intake.md`](../skills/chrisai-chatting/workflows/html-form-intake.md) | The agent converts the intake questions into a normalized schema, generates a local HTML form, and sends a clickable file link. By default, the form produces JSON and Markdown for the user to paste back into chat. If the user explicitly wants submit-and-continue behavior, the workflow can use a one-shot local server that writes one JSON response and shuts down after submit, timeout, cancellation, or chat override. |
| Make an agent response prettier, readable, previewable, browser-friendly, or HTML-formatted. | [`workflows/agent-response-to-html.md`](../skills/chrisai-chatting/workflows/agent-response-to-html.md) | The agent still answers in chat first, then mirrors the same response into a local HTML preview file and includes a clickable file link. The HTML is a convenience preview, not the only copy of the answer. It does not start a server or force browser automation for response previews. |

## Common Examples

Use
[`workflows/chat-session-caching-and-recall.md`](../skills/chrisai-chatting/workflows/chat-session-caching-and-recall.md)
when the request sounds like:

- "Cache this conversation so I can use it later."
- "Summarize this thread into reusable context."
- "Use this copied Chat ID to recall the prior session."
- "Create searchable chunks for this long transcript."
- "Compare the old cached decision with the current repo."

Use
[`workflows/html-form-intake.md`](../skills/chrisai-chatting/workflows/html-form-intake.md)
when the request sounds like:

- "Can I answer this intake in a form?"
- "Turn these questions into an HTML form."
- "Make a local questionnaire for this workflow."
- "Let me submit the intake through a temporary local form."
- "I answered in chat instead; use this and stop waiting for the form."

Use
[`workflows/agent-response-to-html.md`](../skills/chrisai-chatting/workflows/agent-response-to-html.md)
when the request sounds like:

- "Respond in pretty HTML."
- "Make your answer more readable in a browser."
- "Prettify this response."
- "Give me the answer and a local HTML preview."
- "Render the report as an HTML page."

## Workflow Boundaries

- Chat session caching is for explicit, inspectable conversation references. It
  does not replace required repo guidance in `AGENTS.md`, automatic Codex
  Memories, or active project progress tracking.
- HTML form intake is for answering an agent's intake questions. It is not for
  building production forms, CRM capture, surveys, file uploads, or external
  service submission.
- Agent response to HTML is for previewing the agent's own answer. It is not a
  frontend implementation workflow and should not be used to create production
  pages or apps.

## Response Standards

For response previews, the chat answer remains canonical. The agent should
include a local file link such as:

```text
Readable HTML preview: [response.html](/absolute/path/to/response.html)
```

For intake forms, the default mode is a static local file link. One-shot server
mode is only for cases where the user explicitly wants submit-and-continue
behavior and accepts the temporary local server.
