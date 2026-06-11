# Handoff

Use this format before stopping, switching sessions, or delegating work.

```markdown
## Handoff: <date or session label>

Active Scope:
- <item IDs or batch ID>

Status:
- <item-id>: <status> - <short reason>

Files Changed:
- <path>

Verification:
- <check run and result>

Decisions Added:
- <DEC-ID or none>

Blockers:
- <blocker or none>

Next Recommended Step:
- <specific item ID, batch ID, or reconciliation step>
```

## Rules

- Keep handoffs concise.
- Put durable decisions in `decisions.md`; reference them here.
- Put long execution notes in the relevant log file.
- Do not claim verification unless the check was run.
