# Chat Cache Retrieval

Retrieve the smallest useful context set.

## Basic Retrieval

1. Resolve the cache key:
   - copied Codex Chat ID -> `~/Documents/Codex/.chrisai/cache/<chat-id>/`
   - alias -> resolve through `~/Documents/Codex/.chrisai/cache/aliases.md`
   - repo-local cache -> `.prompt-cache/<cache-id>/`
2. Read the selected cache's `index.md`.
3. Search the cache with `rg` for user terms and related keywords.
4. Read only the matching topic files.
5. Read `decisions.md` when acting on a cached conclusion.
6. Read evidence files only when source confidence or exact history matters.

## Retrieval Prompt Pattern

When continuing work from a cache, summarize what was loaded:

```text
I loaded <cache-id>/index.md and <topic files>. The relevant cached context is:
<brief summary>. I am treating it as historical context and will verify current
files before changing behavior.
```

## Missing Chat ID

If the user asks to cache the current or a prior Codex chat without providing a
Chat ID, ask them to paste the Chat ID from the thread menu before creating a
user-local cache. Do not invent a Chat ID.

If the user only needs a temporary or repo-local cache, use a dated slug after
confirming that the cache will not be keyed to the original Codex Chat ID.

## Conflict Handling

If cached context conflicts with current sources:

1. Direct user instructions in the current thread win.
2. Current repo files and nearest `AGENTS.md` win for implementation.
3. Checked-in docs win for team policy.
4. Cached context explains prior thinking, but does not override current truth.

Report material conflicts before acting.

## Stale Context Signals

Treat a cache as possibly stale when:

- it references time-sensitive facts
- current files differ from file paths or APIs named in the cache
- decisions are marked `tentative`, `open`, or `superseded`
- evidence came from web search, MCP, or external systems
- the cache is older than the current release or branch state

## Updating A Cache

When adding new context:

- append new topic, decision, question, or evidence IDs
- update `index.md` and `manifest.md`
- mark superseded decisions instead of deleting them
- preserve history unless the user requests cleanup or redaction
