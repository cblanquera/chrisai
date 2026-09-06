# Agent Workspace Terms

This file defines shared Agent Workspace terminology. Add project-specific terms outside the managed section.

<!-- agent-workspace-rules:start -->
## Managed Terms

- **Acceptance Control**: a stable identifier combining a Task Control and a three-digit criterion sequence, such as `00001-001`.
- **Acceptance Evidence**: screenshots, recordings, logs, reports, observations, or other artifacts that support the recorded result of an Acceptance Criterion.
- **Accepted Reusable Truth**: project knowledge approved or established enough to live in `.agents/context/`.
- **Actor**: a human user or human-operated role whose goals, permissions, actions, or outcomes matter to a spec. External systems and automated processes are dependencies or handoffs, not Actors.
- **Actor State**: a condition of an Actor, such as unverified, signed out, signed in, or suspended, that materially changes available behavior, permissions, system response, destination, or recovery.
- **Agent Document**: the complete body of agent-consumable information represented by one Agent File or by an owner Agent File plus its linked Reference Files.
- **Agent Workspace**: everything inside a project root `.agents/` folder.
- **Agent Files**: markdown files under `.agents/` designed as project Agent Documents unless explicitly excluded. Raw Source under `.agents/resources/` and installed skill packages under `.agents/skills/` are excluded.
- **Complete Draft**: the full pre-split form of a new or updated Agent Document, with all in-scope information present before line thresholds are applied.
- **Context Demotion**: rerouting content out of `.agents/context/` when it is not Accepted Reusable Truth, is stale or contradicted, is too narrow for shared context, or belongs in a Spec File, Reference File, or Resource File. Demotion preserves useful material in the right lower-authority location; it is not deletion.
- **Context Files**: Agent Files under `.agents/context/`.
- **Context Promotion**: moving or copying accepted reusable truth from Source Material, Spec Files, Proofs, research findings, implementation evidence, or other Agent Files into `.agents/context/` so future agents can treat it as shared source-of-truth material.
- **Delegated Acceptance**: explicit permission for an agent to decide whether named task implementations meet their Acceptance Criteria on the user's behalf. Delegation does not permit criteria to be waived or changed.
- **Freeze/Frozen**: accepted planning state for a Spec File or spec package that should not be changed unless the user explicitly permits reopening it.
- **Gaps**: documented unknowns written as questions and based on the current Context Files plus the Agent Files in the relevant spec. Each Gap must be paired with an assumption, a decision, or an explicit unresolved status.
- **Intersection Scan**: review of Agent Files for overlaps, conflicts, answered gaps, new gaps, and affected records before updates.
- **Installed Skill Packages**: independently reusable tooling under `.agents/skills/`; these files are not project Agent Files and follow their own skill-package validation rules.
- **Journey Coverage Complete**: every in-scope feature, materially distinct Actor and Actor State, actor-feature intersection, applicable Use Case, and material journey scenario has been assessed, with every unclear or conflicting behavior linked to a Gap.
- **Knowledge Base (KB)**: `.agents/context/`, the Agent Workspace source-of-truth folder containing Accepted Reusable Truth.
- **Lossless Split**: partitioning a Complete Draft into cohesive Agent Files without summarizing, omitting, or deleting information or data.
- **Proofs**: technical prototypes, experiments, or verification artifacts created to address Gaps before a spec is trusted for implementation.
- **Raw Source**: verbatim or faithfully extracted source data stored under `.agents/resources/` when an independent archive is required. Canonical project files referenced in place remain Source Material; they do not become Resource Files merely because an agent ingests them. Source code becomes Raw Source only when the user explicitly requests a source-code archive.
- **Reference Files**: Agent Files under `.agents/references/`.
- **Reference Links**: markdown links from Agent Files to Reference Files with enough description for an agent to decide whether to load them.
- **Resource Files**: files under `.agents/resources/` that store Raw Source and other non-agent supporting material.
- **Resource Links**: markdown links from Agent Files to Resource Files.
- **Source Material**: import input such as files, URLs, screenshots with text, raw resources, pasted text, or ad hoc prompt text.
- **Source Provenance**: source path, URL, repository revision or content hash when useful, capture source, extraction limits, and access date when known.
- **Spec Files**: Agent Files found under `.agents/specs/*/`.
- **Use Case**: one Actor's goal involving an in-scope feature, including its trigger, preconditions, expected outcome, applicable scenarios, evidence, journeys, and Gaps.
- **User Journey**: one materially distinct path through a Use Case from trigger to outcome or explicit boundary, including actor actions, system responses, state transitions, permissions, feedback, dependencies, recovery, evidence, and Gaps.
<!-- agent-workspace-rules:end -->

## Project Terms

Add project-specific agent terminology below this heading.
