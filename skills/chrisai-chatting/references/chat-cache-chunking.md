# Chat Cache Chunking

Chunk by retrieval intent. A chunk should answer one natural future question.

## Topic File Template

```markdown
# topic-001: <short title>

## Summary

<One short paragraph.>

## Key Details

- <detail>

## Decisions

- `decision-001`: <short decision>

## Open Questions

- `question-001`: <short question>

## Related Context

- `decisions.md#decision-001`
- `evidence/evidence-001-<slug>.md`

## Retrieval Keywords

<comma-separated keywords>
```

## Evidence File Template

```markdown
# evidence-001: <short title>

Type: source-summary | command-output | repo-finding | transcript-excerpt
Date: YYYY-MM-DD
Source: <URL, command, file path, or transcript section>

## Summary

## Relevant Details

## Trust Notes

<Why this evidence is current, historical, incomplete, or lower-trust.>

## Related Context

- `topics/topic-001-<slug>.md`
```

## Splitting Rules

- Prefer 300-900 words per topic file.
- Split a topic around 1,200 words.
- Split when a future request would likely need only one half.
- Keep repeated context in `Related Context`, not duplicated prose.
- Use raw transcript excerpts only when exact wording matters.

## Stable IDs

Use stable IDs so future sessions can refer to cache entries precisely:

- `topic-001`
- `decision-001`
- `question-001`
- `evidence-001`

Do not renumber existing IDs during updates. Add new IDs instead.
