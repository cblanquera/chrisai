# Greenfield Setup Workflow

Use this workflow when `.agents/` is being created from a prompt, product idea,
or sparse project before implementation begins.

## Read First

- user prompt or product brief
- existing README or project notes, if present
- `.agents/AGENTS.md`, if repairing an existing setup

## May Update

- `.agents/AGENTS.md`
- `.agents/workflows/`
- `.agents/plans/feature-goals.md`
- `.agents/specs/manifest.md`
- `.agents/specs/<spec-id>/`
- `.agents/references/`

## Intake

Ask only enough to start responsibly:

1. What is being designed?
2. Who is it for?
3. What problem should it solve?
4. What capabilities should be considered?
5. What is out of scope?
6. Are there preferred or forbidden technologies?
7. What constraints or known unknowns already exist?

If enough information exists, proceed and mark uncertainty explicitly.

## Process

1. Choose one `<spec-id>` for the bounded initiative. Keep the initial/root spec
   for the base product shell and overall architecture; create sibling specs
   later for bounded product streams.
2. Ensure `.agents/AGENTS.md`, `.agents/workflows/`, and
   `.agents/specs/manifest.md` exist.
3. Create the initial spec skeleton.
4. Write `brief.md`, `index.md`, and `status.md`.
5. Create compact grouped record files directly under the spec folder.
6. Capture goals, users, desired capabilities, constraints, and non-goals as
   records.
7. Capture high-level future feature goals in `.agents/plans/feature-goals.md`
   as planning input, not execution order.
8. Draft requirements and functional behavior as compact `REQ` and `CAP`
   records, not long specifications.
9. Create `ASM`, `Q`, and `RISK` records for unsupported claims and ambiguous
   scope.
10. Create provisional `DEC` records for early decision candidates.
11. Create POC or spike `TASK` records only when evidence is needed before a
    decision can be trusted.
12. Define POC path, MVP scope, customer-facing MVP journeys, success measures,
    and validation needs as records.
13. Create MVP-relevant `AC` records.
14. Create routing files for open questions, MVP, status, source, and
    traceability only when useful.
15. Create a review packet under `reviews/` or `.agents/references/` only when
    records alone would not support a productive review.

## Stop Conditions

- `status.md` says `ready-for-review`, `needs-clarification`, or
  `needs-validation`
- blockers are explicit
- review packet exists when needed
- no active implementation work has been created unless the user explicitly
  asked for execution
