# Spec User Journeys Workflow

<!-- agent-workspace-rules:start -->
Use this optional workflow to audit every materially distinct human actor, actor state, feature, applicable use case, and journey scenario in a spec before Freeze. The goal is coverage: determine whether each applicable journey can be completed clearly from the current Context Files and current spec, and record every missing or conflicting behavior as a Gap.

Do not use this workflow for every spec. For pure backend cleanup, narrow migrations, technical proofs, or refactors with no meaningful human flow, record `User journey coverage: not applicable` in `status.md` with a reason instead of creating `journeys.md`.

`<spec-id>` follows the [Spec Folder Naming](spec-driven-development.md#spec-folder-naming) convention.

## Governing Rules

- Cover all materially distinct journeys implied by the accepted scope; do not select only representative happy paths.
- Bound completeness by known human actors, actor states, in-scope features, lifecycle transitions, permission boundaries, outcomes, and applicable failure or recovery conditions. Do not attempt meaningless permutations of inputs or steps.
- Treat external systems, APIs, queues, agents, scheduled jobs, and automated processes as dependencies or handoffs, not actors.
- Do not invent behavior to complete a journey. If the current Context Files and spec do not establish what happens, add a Gap.
- Finish the complete coverage audit and log all journey Gaps before handoff. Do not start the Spec Grill Session Workflow automatically; the user must explicitly invoke it.

## User Interaction

A direct request such as `Create or update user journeys for spec <spec-id>` authorizes the full coverage audit, Agent File updates, validation, and handoff described here.

If the user requests review-first work, propose the actor inventory, feature inventory, and coverage boundary before editing. Also pause before editing when the target spec or accepted scope cannot be determined without a material user choice. Otherwise perform the audit directly and present the resulting coverage and Gaps for review.

## Source Of Truth And Evidence

`.agents/specs/<spec-id>/journeys.md` is the spec-local coverage and journey record, not shared source of truth. Promote accepted reusable journey behavior into `.agents/context/` only when it is stable beyond the current spec.

`.agents/specs/<spec-id>/decisions.md` remains the canonical Gap and decision ledger. Journey records link to Gap IDs rather than duplicating the complete decision record.

Use evidence in this order:

1. Current Context Files for Accepted Reusable Truth.
2. The current spec brief, accepted decisions, and other current Spec Files.
3. Spec-local research and Source Material.
4. Wireframes, creative designs, and code as supporting evidence.

Code and wireframes may confirm behavior already consistent with the Context Files and current spec. If they introduce behavior that is missing from the spec, contradict the spec or Context Files, or leave product intent ambiguous, record a Gap instead of silently adopting that behavior.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/TERMS.md`
3. `.agents/workflows/spec-driven-development.md`
4. `.agents/context/index.md`, when Context Files exist
5. `.agents/specs/manifest.md`, when it exists
6. `.agents/specs/<spec-id>/index.md`
7. `.agents/specs/<spec-id>/brief.md`, `decisions.md`, `status.md`, and existing `journeys.md` when they exist
8. relevant current Spec Files, Context Files, Source Material, wireframes, creative designs, code, and user instructions

Whenever this workflow creates an Agent Document, apply the [Agent File Creation Workflow](agent-file-creation.md). Whenever it changes an existing Agent Document, apply the [Agent File Update Workflow](agent-file-update.md). Preserve the complete coverage inventory and every material journey step before applying line thresholds.

Do not load unrelated spec folders unless the current spec links to them or the user asks for cross-spec review.

## Applicability Gate

Create or update `journeys.md` when the spec includes any of:

- human-facing behavior
- multiple human users or roles
- materially different user states
- permission boundaries
- lifecycle state changes
- handoffs between humans, teams, or systems
- integration entry or exit points that affect a human journey
- step sequencing that affects implementation or acceptance

If none apply, update `status.md` with `User journey coverage: not applicable` and the reason.

## 1. Establish The Coverage Baseline

1. Confirm the current spec scope and the Context Files it inherits.
2. Record the sources used and any source conflict already known.
3. Inventory the accepted features and capabilities described by the current spec and inherited Context Files.
4. Give each feature a stable Feature ID or preserve its existing identifier.
5. Keep out-of-scope capabilities visible only when they affect an in-scope boundary; do not expand the spec merely to create journeys.

## 2. Inventory Human Actors And States

1. Identify every human user or role whose goal, permissions, available actions, or outcomes differ within the current scope.
2. Identify actor states that materially change behavior, such as visitor, registered but unverified user, verified signed-out user, signed-in user, suspended user, or administrator.
3. Treat a state as distinct only when it changes preconditions, permissions, system response, next destination, or recovery behavior.
4. Do not invent demographic personas or roles unsupported by the sources.
5. Record external systems and automated processes separately as dependencies or handoffs. Never list them as actors.

## 3. Build The Feature Coverage Matrix

Before drafting individual journeys, cross every in-scope Feature ID against every materially distinct human actor or actor state.

For each intersection, record:

- Feature ID and feature name
- Actor or actor state
- `Applicable`: `yes`, `no`, or `unknown`
- Use Case IDs when applicable
- Journey IDs when applicable
- Evidence links
- Specification clarity
- Gap IDs

Every intersection needs a disposition. `Applicable: no` requires a short reason. `Applicable: unknown` creates or links to a Gap. Do not omit a matrix row because the relationship seems obvious.

## 4. Derive Applicable Use Cases

A Use Case describes one human actor's goal involving an in-scope feature. Create a Use Case for every applicable actor-feature intersection, reusing one Use Case across actor states only when the goal, permissions, flow, and outcomes are materially the same.

Record:

- Use Case ID
- Feature ID
- Actor and relevant actor state
- Goal
- Trigger
- Preconditions
- Expected success outcome and postconditions
- Applicable scenario categories
- Evidence links
- Journey IDs
- Gap IDs

## 5. Expand Journey Scenarios

For each Use Case, document the main success journey and every applicable scenario whose behavior, permissions, state transition, outcome, or recovery path is materially different.

Check these categories and mark each `covered`, `not applicable`, or `gap`:

- successful completion
- invalid, incomplete, or conflicting input
- authentication or verification state
- authorization or role restriction
- lifecycle-state restriction
- first-use or empty state
- duplicate submission or idempotency
- cancellation, retry, timeout, or interrupted continuation
- external dependency failure
- stale or concurrently changed data
- failure feedback and recovery
- completion feedback, postconditions, and next destination

Do not create a separate journey for cosmetic or data-value variations that do not change behavior. Do not omit an applicable category merely because the spec is silent; silence is a Gap.

## 6. Walk Each Journey For Clarity

Walk every journey step from its trigger through completion, failure, or an explicit out-of-scope handoff. For every step, determine:

- the human actor and current actor state
- the actor action
- required inputs and preconditions
- the system response visible or relevant to the actor
- the resulting state transition
- feedback, error, or confirmation shown to the actor
- the next destination or available action
- the permission decision
- any external dependency or handoff
- failure and recovery behavior when applicable
- supporting Context or spec evidence

Classify each step independently on three dimensions:

- `Scope`: `in-scope`, `out-of-scope`, `deferred`, `external`, or `unknown`
- `Specification clarity`: `clear`, `partial`, `gap`, or `conflict`
- `Implementation readiness`: `implementable`, `not-implementable`, `blocked`, or `evidence-only`

A step is `clear` only when its behavior and outcome are supported by the current Context Files or current spec. Technical feasibility or existing code does not make unspecified product behavior clear.

## Journey Record Shape

Keep `journeys.md` as the owner and coverage ledger. Use concise records containing:

- Journey ID and Use Case ID
- Feature ID
- Actor and actor state
- Goal and scenario
- Trigger and preconditions
- Ordered steps with the three classifications
- Success, failure, and recovery outcomes
- Postconditions and next destination
- External dependencies or handoffs
- Evidence links
- Gaps created or resolved
- Acceptance impact

Use diagrams only when they materially clarify sequencing or branching. Text records are sufficient by default. If the Complete Draft exceeds the Agent File thresholds, losslessly split journey detail by cohesive actor, feature, or retrieval task and keep `journeys.md` as the descriptive router and coverage ledger.

## 7. Log And Reconcile Gaps

1. Add a Gap to `decisions.md` whenever an applicable journey cannot be completed clearly from the current Context Files and current spec.
2. Write the Gap as a neutral question. Link every affected Feature ID, Use Case ID, and Journey ID.
3. Reuse one Gap when the same missing decision affects multiple journeys; do not create duplicate questions for each occurrence.
4. Record contradictions among Context Files, the spec, wireframes, creative designs, or code as Gaps before treating any behavior as accepted.
5. Update journey steps and matrix rows with the related Gap IDs and clarity status.
6. Do not choose an agent-suggested default, silently resolve a Gap, or invoke the Grill Session Workflow.
7. Finish scanning all actors, features, use cases, and scenarios before handing the Gap inventory to the user.

## 8. Reconcile Coverage And Freeze Readiness

Update `index.md`, `decisions.md`, and `status.md` after the audit.

Mark `User journey coverage: complete` only when:

- every in-scope feature is inventoried
- every materially distinct human actor and actor state is inventoried
- every actor-feature intersection has an applicability disposition
- every applicable intersection has at least one Use Case
- every Use Case has a success journey and all applicable scenario categories have a disposition
- every journey is walked from trigger to outcome or explicit boundary
- every material step is evidence-backed or linked to a Gap
- every journey-created conflict or unknown is recorded in `decisions.md`

Coverage can be complete while specification behavior remains unresolved. Record `Specification behavior: incomplete` when journey Gaps remain. Those Gaps must be answered, accepted, deferred, or explicitly approved as unresolved under the Spec Driven Development Freeze rules before the spec can Freeze.

If coverage itself is incomplete, the spec is not ready to Freeze. Do not mark coverage complete merely because known journeys were documented.

Promote accepted reusable journey behavior into `.agents/context/` only when it should guide future specs. Keep one-spec journey detail in `journeys.md` and its linked Reference Files.

## Validate And Handoff

Run the Agent Workspace validator after creating or updating Spec Files:

```bash
python .agents/scripts/validate-agent-workspace.py
```

Use `python3` instead of `python` on systems where that is the Python 3 executable.

End each journey pass by stating the spec ID, applicability result, human actors and actor states found, features and actor-feature intersections assessed, Use Cases and journeys added or changed, scenario coverage, clear and unclear steps, new or reused Gaps, coverage status, specification-behavior status, Freeze impact, validation result, and recommended next step.

If unresolved journey Gaps remain, recommend that the user review them or explicitly invoke the Spec Grill Session Workflow. Do not start that workflow automatically.
<!-- agent-workspace-rules:end -->
