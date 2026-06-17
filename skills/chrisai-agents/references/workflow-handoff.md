# Handoff Workflow

Use this workflow before stopping, switching sessions, delegating work, or
leaving a large task for a future agent.

## Read First

- `.agents/AGENTS.md`
- active progress item or batch
- relevant `status.md`, manifest, or release readiness file

## May Update

- `.agents/development/progress/logs/<id>.md`
- `.agents/development/progress/items/<id>.md`
- `.agents/development/progress/batches/<id>.md`
- `.agents/development/progress/manifest.md`
- relevant `status.md`

## Handoff Template

```markdown
## Handoff: <date or session label>

Active Scope:
- <item IDs, batch ID, spec ID, or release ID>

Loop Phase:
- <intake | grill-review | gap-reconciliation | poc | design | freeze | implementation | qa-feedback | fix-reconciliation | closeout>

Status:
- <id>: <status> - <short reason>

Files Changed:
- <path>

Verification:
- <check run and result>

Decisions Added:
- <DEC-ID or none>

Blockers:
- <blocker or none>

Next Recommended Step:
- <specific workflow, item ID, batch ID, or reconciliation step>
```

## Rules

- Keep handoffs concise.
- Put durable decisions in records or `decisions.md`; reference them here.
- Put long execution notes in the relevant log file.
- Do not claim verification unless the check was run.
