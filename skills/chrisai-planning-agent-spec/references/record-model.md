# Agent Spec Record Model

Use stable record IDs inside grouped Markdown files. Keep records short and
link them explicitly.

## Record Types

| Prefix | Type | Purpose |
| --- | --- | --- |
| `REQ` | requirement | Durable product, user, system, or operational requirement |
| `CAP` | capability | User-visible or system capability that may group requirements |
| `CON` | constraint | Technical, business, platform, compliance, or timeline constraint |
| `ASM` | assumption | Unverified claim that may need evidence |
| `Q` | question | Open question that blocks or may change decisions |
| `DEC` | decision | Accepted, rejected, provisional, or deferred decision |
| `RISK` | risk | Known threat to success, quality, security, scope, or delivery |
| `AC` | acceptance | Objective completion or readiness criterion |
| `EVD` | evidence | Source, observation, command result, code finding, or research note |
| `TASK` | task | Proposed work item before it becomes active progress |

## Source Confidence

Use these confidence labels:

- `proposed`: from prompt or brainstorming
- `imported`: extracted from human documentation
- `inferred`: derived from code, file structure, behavior, or tests
- `evidence-backed`: supported by explicit evidence records
- `conflicting`: contradicted by another source
- `stale`: likely outdated compared with current code or later decisions

## Record Template

```markdown
## REQ-001: <short title>

Status: proposed | accepted | blocked | deferred | superseded
Confidence: proposed | imported | inferred | evidence-backed | conflicting | stale
MVP: yes | no | unknown
Source:
Related:
- CAP-001
- AC-001

### Statement

### Rationale

### Acceptance Links

### Open Questions

### Notes
```

## Brownfield Records

Brownfield records must distinguish:

- current state: what the code or product appears to do now
- intended state: what the user or docs say it should do
- gap: the difference that must be resolved

Use `Current State`, `Intended State`, and `Gap` headings where confusion is
likely.

## Index Rules

Indexes summarize and route. They do not replace records.

Good indexes:

- traceability from requirement to acceptance and task
- open questions by blocking impact
- MVP record list
- records by source confidence

Avoid narrative indexes that repeat whole record bodies.

## Split Rules

Start with grouped files under `records/`. Split into folders or one-file
records only when:

- a grouped file approaches 500 lines
- multiple agents must edit independent records concurrently
- a record requires a large evidence trail
- a record needs separate ownership or review
