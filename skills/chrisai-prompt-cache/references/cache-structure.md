# Cache Structure

Create the smallest structure that makes future retrieval obvious.

## User-Local Layout

Use this layout by default when the user provides a copied Codex Chat ID:

```text
~/Documents/Codex/.chrisai/cache/
├── manifest.md
├── aliases.md
└── <chat-id>/
    ├── index.md
    ├── decisions.md
    ├── timeline.md
    ├── topics/
    │   ├── topic-001-<slug>.md
    │   └── topic-002-<slug>.md
    ├── evidence/
    │   ├── evidence-001-<slug>.md
    │   └── evidence-002-<slug>.md
    └── raw/
        └── transcript-notes.md
```

`<chat-id>` is the copied Codex Chat ID from the thread menu. It is a cache key,
not a claim about Codex's internal folder layout.

## Repo-Local Layout

Use this layout when the user asks for project-local or shared cache files:

```text
.prompt-cache/
├── manifest.md
└── <cache-id>/
    ├── index.md
    ├── decisions.md
    ├── timeline.md
    ├── topics/
    │   ├── topic-001-<slug>.md
    │   └── topic-002-<slug>.md
    ├── evidence/
    │   ├── evidence-001-<slug>.md
    │   └── evidence-002-<slug>.md
    └── raw/
        └── transcript-notes.md
```

`aliases.md`, `timeline.md`, and `raw/` are optional. Create them only when
they improve retrieval or auditability. `manifest.md` is recommended for
user-local caches with more than one Chat ID.

## Manifest Template

```markdown
# Prompt Cache Manifest

## Caches

- `<cache-id>`: <one-sentence purpose>
```

## Aliases Template

```markdown
# Prompt Cache Aliases

- `prompt-cache-skill` -> `019ea6be-3a1b-7913-997f-b1474b8484dd`
```

## Index Template

```markdown
# <cache-id>

Created: YYYY-MM-DD
Source Type: Codex chat session | transcript | notes | handoff
Source ID: <chat-id, if known>
Source Label: <human-readable label>
Scope: <repo-local, user-local, temporary, or shared>
Project: <project name or path, if relevant>

## Purpose

<What this cache preserves and when to use it.>

## Read First

- `topics/topic-001-<slug>.md`: <why it matters>
- `decisions.md`: <when to read>

## Topics

- `topic-001`: <title> - <retrieval intent>

## Decisions

- `decision-001`: <short decision>

## Open Questions

- `question-001`: <short question>

## Keywords

<comma-separated terms future sessions may search for>
```

## Decisions Template

```markdown
# Decisions

## decision-001: <short title>

Status: accepted
Date: YYYY-MM-DD

### Decision

### Rationale

### Rejected Options

### Risks

### Related Context

- `topics/topic-001-<slug>.md`
```

Use statuses such as `accepted`, `tentative`, `rejected`, `superseded`, and
`open`.
