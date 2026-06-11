---
name: chrisai-planning-agent-spec-discovery
description: Use when starting an AI-readable agent spec from a prompt, product idea, or sparse greenfield description before implementation begins.
---

# ChrisAI Planning Agent Spec Discovery

Use this skill to create the first `.agent/specs/<spec-id>/` from a prompt or
early product idea.

This is the pure greenfield entry point for agent specs. It owns discovery,
requirements, first-pass architecture analysis, decision candidates, MVP scope,
acceptance criteria, non-goals, and readiness gaps in compact record form.

It does not create implementation code or active progress items.
It does not produce long planning documents by default.

## Output Boundary

This skill produces the initial AI-readable record set and stops before the
grill or adversarial readiness review.

For pure greenfield projects, create `generated/grill-session-brief.md` when the
records alone would not give a reviewer enough context for a productive Grill Me
With Docs-style session. This generated file is a review packet, not the source
of truth. It should summarize the objective, users, scope, non-goals, MVP,
provisional decisions, assumptions, risks, open questions, acceptance criteria,
and links back to record IDs.

Expected handoff:

```text
Agent spec discovery is ready for adversarial review.
Next, use `chrisai-planning-agent-spec-review` to run or import the Grill Me
With Docs-style pass and save results to `reviews/readiness-review.md` and
`reviews/findings.md`.
Do not freeze or create implementation tasks until review findings are resolved
or explicitly accepted.
```

## Intake Gate

Ask only enough to start responsibly:

1. What is being designed?
2. Who is it for?
3. What problem should it solve?
4. What capabilities should be considered?
5. What is out of scope?
6. Are there preferred or forbidden technologies?
7. What constraints or known unknowns already exist?

If enough information exists, proceed and mark uncertainty explicitly.

## Workflow

1. Choose one `<spec-id>` for the bounded initiative.
2. Create or update `.agent/specs/manifest.md`.
3. Create `.agent/specs/AGENTS.md` if missing.
4. Create the agent spec skeleton for the selected `<spec-id>`.
5. Write `brief.md`, `index.md`, and `status.md`.
6. Create grouped record files under `records/`.
7. Capture product goals, user groups, desired capabilities, constraints, and
   non-goals as records.
8. Draft requirements and functional behavior as compact `REQ` and `CAP`
   records, not long specifications.
9. Draft data, security, UX, integration, operational, and architecture
   considerations as records when they are relevant.
10. Challenge assumptions and create `ASM`, `Q`, and `RISK` records for
   unsupported claims, missing requirements, scaling concerns, security
   concerns, lock-in risks, migration risks, and ambiguous scope.
11. Create decision candidates as `DEC` records with status `provisional`,
   `accepted`, `deferred`, or `blocked`.
12. Create spike candidates as `TASK` records with type `spike` when evidence
   is needed before a decision can be trusted.
13. Define MVP scope, MVP journeys, MVP success measures, and validation needs
   as records and AI-readable indexes.
14. Generate MVP-relevant acceptance criteria as `AC` records.
15. Create minimal indexes for open questions, MVP, status, source, and
   traceability only when useful.
16. For pure greenfield specs, create or update
   `generated/grill-session-brief.md` when a grill session needs a
   human-readable packet to be productive.
17. Set `status.md` to `ready-for-review` only when blockers are explicit and
   the record set is coherent enough to challenge.
18. Stop before active implementation planning unless the user asks to freeze.

Read `chrisai-planning-agent-spec/references/agent-spec-structure.md` for layout
and `chrisai-planning-agent-spec/references/record-model.md` for record fields.

## Readiness Labels

Use these readiness labels in `status.md`:

- `intake`
- `needs-clarification`
- `ready-for-review`
- `needs-validation`
- `ready-to-freeze`

## Discovery Outputs

Create or update these files when warranted by scope:

- `brief.md`
- `index.md`
- `status.md`
- `records/requirements.md`
- `records/capabilities.md`
- `records/constraints.md`
- `records/assumptions.md`
- `records/questions.md`
- `records/decisions.md`
- `records/risks.md`
- `records/acceptance.md`
- `records/evidence.md`
- `records/tasks.md`
- `indexes/open-questions.md`
- `indexes/by-mvp.md`
- `indexes/by-status.md`
- `indexes/by-source.md`
- `indexes/traceability.md`
- `generated/grill-session-brief.md`, for pure greenfield review packets when
  useful

Do not create generated stakeholder, sprint, or implementation documents unless
the user asks for them. Those are views over records.

## Anti-Drift Rules

- Do not invent requirements.
- Do not treat assumptions as decisions.
- Do not create active implementation work packets.
- Do not create a sprint plan during discovery.
- Do not hide uncertainty in prose; create questions, assumptions, risks, or
  blocked decisions.
- Prefer compact records and indexes over long documents.

## Handoff

Before stopping, state:

- spec ID
- records created or updated
- blocking questions
- whether review is ready
- whether `generated/grill-session-brief.md` was created or updated
- next recommended skill: `chrisai-planning-agent-spec-review`
