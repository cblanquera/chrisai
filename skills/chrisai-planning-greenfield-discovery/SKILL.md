---
name: chrisai-planning-greenfield-discovery
description: Use when planning a large unbuilt app from intake through research, requirements, specifications, ADR candidates, spikes, MVP scope, acceptance criteria, and non-goals before a grill review.
---

# ChrisAI Planning Greenfield Discovery

Use this skill for the first planning phase of a large app that has not been
built yet.

The objective is not to implement the application. The objective is to perform
research, requirements gathering, standards discovery, architectural analysis,
and specification drafting before coding begins.

Do not use this skill for existing app features, bugfixes, refactors, small
tools, or implementation work.

## Output Boundary

This skill produces a greenfield planning corpus and stops before the final
grill review.

The expected handoff is:

```text
Discovery package is ready for grill review.
Next, use `chrisai-planning-greenfield-grill-review` to run the Grill Me With
Docs pass when that skill is available, and save the final review to
`plans/reviews/final-implementation-readiness-review.md`.
Do not begin implementation planning until grill findings are resolved or the
user explicitly skips grill review.
```

## Intake Questions

Ask only enough questions to determine whether planning can begin:

1. What large app or product is being designed?
2. Who is it for?
3. What problem should it solve?
4. What capabilities should be considered?
5. Is it web, desktop, mobile, CLI, service, library, or multi-surface?
6. Are there preferred or forbidden technologies?
7. What assumptions, constraints, or known unknowns already exist?

Avoid long questionnaires. If enough information exists to create a useful
pre-plan brief, proceed and mark uncertainty explicitly.

## Readiness Classification

Classify intake before writing the planning corpus:

- `NOT READY`: cannot describe what is being designed.
- `PARTIALLY READY`: can describe the project, but goals, capabilities, or
  constraints are too incomplete for useful specifications.
- `READY FOR SPEC BRIEF`: enough information exists to generate the pre-plan
  brief and identify follow-up research.
- `READY FOR DISCOVERY`: enough information exists to begin research and
  specification generation.

Do not create specs from vague product ideas. Ask focused questions instead.

## Workflow

1. Confirm the request is for a large unbuilt app.
2. Create or update `plans/preplan-brief.md`.
3. Create or update `plans/AGENTS.md` to explain the planning corpus rules,
   folder purposes, phase gates, and non-implementation boundary.
4. Create the needed discovery and specification artifacts under `plans/`.
5. Challenge assumptions with a first architecture review.
6. Identify ADR candidates without inventing unsupported decisions.
7. Identify readiness gaps and research spikes.
8. Consolidate decisions into finalized, unresolved, and deferred summaries.
9. Define MVP scope, MVP journeys, success metrics, and validation plan.
10. Generate MVP-relevant acceptance criteria.
11. Generate non-goals to control scope.
12. Stop before grill review.

Read [artifact-map](references/artifact-map.md) for expected paths and
[document-templates](references/document-templates.md) for concise document
structures.

## Anti-Drift Rules

- Do not invent requirements.
- Do not assume the architecture.
- Do not treat assumptions as decisions.
- Do not generate implementation tasks.
- Do not create a sprint plan.
- Do not skip intake.
- Prefer questions over fake completeness.
- Prefer small, linked documents over bloated documents.
- Mark uncertainty clearly.
- Keep explicit non-implementation language in the pre-plan brief.

## Handoff

Before stopping, state:

- readiness classification
- generated or updated planning artifacts
- unresolved blockers or high-risk questions
- whether grill review is ready
- the next recommended skill: `chrisai-planning-greenfield-grill-review`
- that the next skill should run the Grill Me With Docs pass when available
- that the final review must be saved to
  `plans/reviews/final-implementation-readiness-review.md`
