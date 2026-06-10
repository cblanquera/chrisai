# Greenfield Discovery Artifact Map

Use these paths when the corresponding artifact is warranted by the project.
For large greenfield apps, most artifacts are usually warranted.

## Required

- `plans/preplan-brief.md`
- `plans/AGENTS.md`
- `plans/specs/requirements.md`
- `plans/specs/functional-specification.md`
- `plans/specs/architecture-specification.md`
- `plans/reviews/architecture-review.md`
- `plans/decisions/implementation-readiness-gaps.md`
- `plans/mvp/mvp-scope.md`
- `plans/mvp/mvp-user-journeys.md`
- `plans/mvp/mvp-success-metrics.md`
- `plans/mvp/mvp-validation-plan.md`
- `plans/non-goals.md`

## Conditional

- `plans/research/*.md`: external standards, domain research, competitor
  patterns, technical feasibility, integration constraints, or compliance
  research.
- `plans/specs/security-specification.md`: auth, permissions, secrets,
  sensitive data, multi-user access, payments, abuse risk, or compliance.
- `plans/specs/data-model-specification.md`: persisted entities, workflows,
  events, documents, analytics, or domain state.
- `plans/specs/ux-specification.md`: user-facing workflows, navigation,
  onboarding, settings, dashboards, or complex interaction states.
- `plans/adr/ADR-candidates.md`: any significant architectural, product,
  security, operational, or technical decision.
- `plans/adr/ADR-*.md`: high-priority decisions that need formal records.
- `plans/spikes/SPIKE-*.md`: unresolved risk or uncertainty that needs focused
  validation before implementation.
- `plans/acceptance/*.md`: MVP-relevant systems or workflows that need
  objective completion criteria.

## Decision Summaries

Always keep decision summary files current when decisions exist:

- `plans/decisions/finalized-decisions.md`
- `plans/decisions/unresolved-decisions.md`
- `plans/decisions/deferred-decisions.md`
