---
name: chrisai-planning-agent-spec-brownfield
description: Use when creating or updating an AI-readable agent spec from an existing codebase, with or without existing documentation, while distinguishing current state, intended state, and gaps.
---

# ChrisAI Planning Agent Spec Brownfield

Use this skill when a project already exists and the agent spec must reflect
current code, current behavior, or gaps between documentation and code.

This skill creates planning records. It does not perform implementation work.

## Source Rules

- Code, tests, configuration, routes, schemas, UI, and runtime behavior are
  evidence for current state.
- Human documents are evidence for intended state unless the user says they are
  authoritative.
- When code and docs conflict, mark the conflict. Do not silently choose one.

## Workflow

1. Confirm the target project and whether docs should be treated as current
   truth or intended future state.
2. Choose or confirm one `<spec-id>`.
3. Create or update `.agents/specs/<spec-id>/`.
4. Inspect only the project files needed to infer the requested scope.
5. Create or update evidence records for observed code or docs.
6. Create or update requirement, capability, decision, risk, question, and
   acceptance records with `Current State`, `Intended State`, and `Gap` where
   useful.
7. Mark confidence as `inferred`, `evidence-backed`, `conflicting`, or `stale`
   as appropriate.
8. Update traceability, open question, source, and status indexes.
9. Stop before implementation unless the user asks to freeze or execute work.

Read `chrisai-planning-agent-spec/references/agent-spec-structure.md` for layout
and `chrisai-planning-agent-spec/references/record-model.md` for record fields.

## Guardrails

- Do not infer product intent from code alone without labeling it as inferred.
- Do not rewrite user documentation unless explicitly asked.
- Do not create active `.agents/progress/` items unless freeze or execution is
  requested.
- Keep generated summaries separate from records.

## Handoff

Before stopping, state:

- inspected sources
- spec ID
- current-state findings
- intended-state or documentation conflicts
- open gaps
- next recommended skill
