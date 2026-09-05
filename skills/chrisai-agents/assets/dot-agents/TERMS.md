# Agent Workspace Terms

This file defines shared Agent Workspace terminology. Add project-specific terms outside the managed section.

<!-- agent-workspace-rules:start -->
## Managed Terms

- **Accepted Reusable Truth**: project knowledge approved or established enough to live in `.agents/context/`.
- **Agent Document**: the complete body of agent-consumable information represented by one Agent File or by an owner Agent File plus its linked Reference Files.
- **Agent Workspace**: everything inside a project root `.agents/` folder.
- **Agent Files**: markdown files under `.agents/` designed for AI-agent consumption unless explicitly excluded.
- **Complete Draft**: the full pre-split form of a new or updated Agent Document, with all in-scope information present before line thresholds are applied.
- **Context Demotion**: rerouting content out of `.agents/context/` when it is not Accepted Reusable Truth, is stale or contradicted, is too narrow for shared context, or belongs in a Spec File, Reference File, or Resource File. Demotion preserves useful material in the right lower-authority location; it is not deletion.
- **Context Files**: Agent Files under `.agents/context/`.
- **Context Promotion**: moving or copying accepted reusable truth from Source Material, Spec Files, Proofs, research findings, implementation evidence, or other Agent Files into `.agents/context/` so future agents can treat it as shared source-of-truth material.
- **Freeze/Frozen**: accepted planning state for a Spec File or spec package that should not be changed unless the user explicitly permits reopening it.
- **Gaps**: documented unknowns written as questions and based on the current Context Files plus the Agent Files in the relevant spec. Each Gap must be paired with an assumption, a decision, or an explicit unresolved status.
- **Intersection Scan**: review of Agent Files for overlaps, conflicts, answered gaps, new gaps, and affected records before updates.
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
<!-- agent-workspace-rules:end -->

## Project Terms

Add project-specific agent terminology below this heading.
