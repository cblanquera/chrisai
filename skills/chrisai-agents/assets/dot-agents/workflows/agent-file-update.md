# Agent File Update Workflow

<!-- agent-workspace-rules:start -->
Use this workflow when revising an existing Agent Document, including one distributed across an owner Agent File and linked Reference Files.

If the update comes from Source Material, first use the [Agent File Ingestion Workflow](agent-file-ingestion.md), then return here for each existing Agent Document in scope.

## Governing Rule

Fidelity comes before file size. Reconstruct the complete current Agent Document, merge the accepted update into a Complete Draft, and only then repartition it. Do not summarize, omit, or delete unaffected information to satisfy line thresholds.

## Reconstruct The Current Document

1. Confirm the owner Agent File and update scope.
2. Read the owner and every directly or transitively linked Reference File whose described contents intersect the update. Do not load unrelated references merely because they exist.
3. Inventory the current sections, requirements, decisions, constraints, examples, edge cases, identifiers, citations, tables, and other meaning-bearing details.
4. Check inbound links before changing a Reference File. If it serves another owner, treat that owner as affected and preserve unrelated shared content.
5. Resolve missing or ambiguous ownership before editing. Use the [Zombie Reference File Repair Workflow](repair-zombie-reference-files.md) when needed.

## Create The Updated Complete Draft

1. Merge the current Agent Document and the accepted update before applying line thresholds.
2. Preserve all unaffected information.
3. Remove or replace information only when it is explicitly corrected, superseded, rejected, demoted, or authorized for removal. Preserve history or provenance when future agents may need to understand the change.
4. If new material conflicts with current content, stop and report the conflict before treating either version as accepted.
5. Keep imported claims distinct from agent-added clarification when that distinction matters.
6. Extend the coverage inventory with every accepted new detail and every explicit disposition for changed or removed content.
7. The working draft may temporarily exceed the line thresholds.

## Repartition After Updating

1. Apply [Partition After Completion](agent-file-creation.md#partition-after-completion) only after the updated Complete Draft is complete.
2. Reuse coherent existing Reference Files when their retrieval purpose remains accurate.
3. Split by cohesive section or retrieval task, not arbitrary line ranges.
4. Update each affected Reference Link so it summarizes what the reference contains and states when to load it.
5. Do not leave duplicated, stale, contradictory, or unowned partitions. Do not delete a Reference File without explicit user approval.

## Coverage Check And Validate

1. Compare the prior Agent Document, accepted update, and coverage inventory with the final owner and Reference Files.
2. Confirm every unaffected prior detail and every accepted new detail remains present, except content with an explicit recorded disposition.
3. Confirm an agent can reach each deferred section from a task-informative Reference Link.
4. Run the Agent Workspace validator. Treat line-count output as a routing signal, never as permission to shorten content.

## Handoff

End each update pass by stating the Agent Documents updated, Reference Files created, reused, or rerouted, information explicitly superseded or removed, coverage-check result, validation result, blocker or user decision still needed, recommended next step, and any useful alternatives.

## Reference

- [Detailed Agent Workspace fidelity, size, naming, and linking rules](../references/00001-agent-workspace-rules.md)
<!-- agent-workspace-rules:end -->
