# Session Delegation

Use this reference when separate chat sessions may help complete an
`.agents/progress` progress bank.

## Ask First

Do not spawn or delegate to separate sessions without asking the user first.

Ask with concrete assignments:

```markdown
This task is now split into independent work packets. Separate sessions may
help because <reason>.

Suggested delegation:
- Session A: <item IDs or batch ID>
- Session B: <item IDs or batch ID>

Each session would read:
- .agents/progress/brief.md
- .agents/progress/conventions.md
- .agents/progress/decisions.md
- assigned item or batch files

Each session would write back:
- changed output files
- .agents/progress/logs/<assigned-id>.md
- manifest status updates for assigned IDs only

Risks:
- <shared file conflict or integration risk>

Do you want me to split this into separate sessions?
```

## Worker Instructions

Give each worker a narrow packet:

```markdown
You are working on <item IDs or batch ID> from the `.agents/progress` progress
bank.

Read only:
- .agents/progress/brief.md
- .agents/progress/conventions.md
- .agents/progress/decisions.md
- <assigned item or batch files>
- source files directly required by the assigned work

Do:
- complete only the assigned IDs
- update only the assigned item, log, and manifest rows
- record cross-item decisions in .agents/progress/decisions.md
- run the stated verification when possible

Do not:
- work on unassigned IDs
- load the full `.agents/progress` progress bank unless blocked
- overwrite unrelated user or worker changes

Return:
- files changed
- status per assigned ID
- verification performed
- blockers
- decisions added or needed
```

## Reconciliation Checklist

After delegated work returns:

- inspect changed files before accepting status updates
- check for overlapping edits
- verify manifest statuses match item logs
- merge durable decisions into `decisions.md`
- run integration-level verification when needed
- update `outputs.md` for completed artifacts
- choose the next ready item or batch
