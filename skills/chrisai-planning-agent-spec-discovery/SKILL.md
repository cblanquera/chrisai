---
name: chrisai-planning-agent-spec-discovery
description: Use when starting an AI-readable agent spec from a prompt, product idea, or sparse greenfield description before implementation begins.
---

# ChrisAI Planning Agent Spec Discovery

Use this skill to create the first `.agents/` planning structure and
`.agents/specs/<spec-id>/` from a prompt or early product idea.

This is the pure greenfield entry point for agent specs. It owns discovery,
requirements, first-pass architecture analysis, decision candidates, POC scope,
MVP scope, acceptance criteria, non-goals, and readiness gaps in compact record
form.

It does not create implementation code or active progress items.
It does not produce long planning documents by default.

## Output Boundary

This skill produces the initial AI-readable record set and stops before the
grill or adversarial readiness review.

For pure greenfield projects, create a review packet under the spec `reviews/`
folder or `.agents/references/` when the records alone would not give a
reviewer enough context for a productive Grill Me With Docs-style session. This
packet is not the source of truth. It should summarize the objective, users,
scope, non-goals, POC/MVP path, provisional decisions, assumptions, risks, open
questions, acceptance criteria, and links back to record IDs.

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
2. Create or update `.agents/AGENTS.md` and `.agents/specs/manifest.md`.
3. Create top-level `.agents/` folders when needed: `.agents/plans/`,
   `.agents/poc/`, `.agents/references/`, `.agents/specs/`,
   `.agents/sprints/`, `.agents/progress/`, and `.agents/releases/`.
4. Create the agent spec skeleton for the selected `<spec-id>`.
5. Write `brief.md`, `index.md`, and `status.md`.
6. Create compact grouped record files directly under the spec folder.
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
12. Create POC or spike candidates as `TASK` records when evidence is needed
   before a decision can be trusted.
13. Define the POC path, MVP scope, MVP journeys, MVP success measures, and
   validation needs as records and compact routing files.
14. Generate MVP-relevant acceptance criteria as `AC` records.
15. Create minimal routing files for open questions, MVP, status, source, and
   traceability only when useful.
16. For pure greenfield specs, create or update a review packet under
   `reviews/` or `.agents/references/` when a grill session needs a
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
- `requirements.md`
- `capabilities.md`
- `constraints.md`
- `assumptions.md`
- `questions.md`
- `decisions.md`
- `risks.md`
- `acceptance.md`
- `evidence.md`
- `tasks.md`
- `open-questions.md`
- `by-mvp.md`
- `by-status.md`
- `by-source.md`
- `traceability.md`
- `reviews/grill-session-brief.md` or a `.agents/references/` review packet,
  for pure greenfield review packets when useful

Do not create stakeholder, sprint, release, or implementation views unless the
user asks for them. Those are views over records.

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
- whether a review packet was created or updated
- next recommended skill: `chrisai-planning-agent-spec-review`
