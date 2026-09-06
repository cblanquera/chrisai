# Agent File Ingestion Workflow

<!-- agent-workspace-rules:start -->
Use this workflow when importing Source Material into a new or existing Agent Document.

Source preservation and Agent Document completeness are separate requirements. Archiving a source or referencing it in place does not permit a summary-only Agent Document.

## Destination

1. If the user does not specify a destination, use `.agents/context/` as the proposed destination.
2. Before writing to `.agents/context/`, confirm the import is Accepted Reusable Truth through explicit user direction, the source request, or the Intersection Scan.
3. Do not treat an unspecified destination by itself as permission to promote arbitrary, transient, speculative, or purely raw material into `.agents/context/`.
4. If the Intersection Scan strongly suggests the import is not Accepted Reusable Truth, explain why and ask before demoting or rerouting it.
5. Confirm the target Agent File path before writing when the destination is ambiguous.

## Decide And Preserve Source

1. Classify each input as source code or non-code Source Material, then decide whether it is already durable or needs an independent archive.
2. Keep source code in its authoritative location. Do not copy source-code files, source folders, generated trees, dependencies, or the repository into `.agents/resources/` unless the user explicitly requests a source-code archive. Being external, transient, scheduled for deletion, not reliably recoverable, or otherwise at risk does not grant permission; report the risk and ask the user.
3. For source code retained in place, record precise repository-relative paths and, when useful, a commit, revision, or content hash as Source Provenance.
4. When the user explicitly requests a source-code archive, preserve only the requested scope. If the scope is ambiguous, confirm it before copying. Do not add dependencies, generated output, unrelated folders, or the repository unless explicitly included.
5. For non-code Source Material, preserve an exact or faithfully extracted copy under `.agents/resources/` before rewriting when it is external, pasted, attached, transient, scheduled for deletion, not reliably recoverable, or explicitly requested for archival.
6. When only part of a non-code directory is in scope, archive only those bounded inputs. Preserve the directory structure or a manifest when relationships between archived files carry meaning.
7. Create `.agents/resources/` if absent when preserving the first Raw Source. Preserve all available material within the authorized archive scope; a summary is not a substitute for the archived source.
8. Markdown Raw Source remains a Resource File, not an Agent File.
9. Record Source Provenance in the resulting Agent File or a linked Reference File whether the source is archived or retained in place.
10. If text extraction is partial or uncertain, state the limitation and link the preserved Resource File or source location.
11. Record a temporary source coverage inventory of sections, identifiers, citations, tables, examples, edge cases, and other details that the Agent Document must retain.

## Draft Agent File

1. Convert Source Material into a Complete Draft for future agents before applying line thresholds.
2. Preserve all available meaning, requirements, decisions, constraints, examples, edge cases, identifiers, citations, tables, and other meaning-bearing details. Do not reduce the import to a summary-only record.
3. Add a summary when it improves routing, but never use it as a substitute for the complete documented detail.
4. Reword, label, group, and add short connective context when needed so future agents can understand how the import fits the project.
5. Separate imported claims from agent-added clarification when that distinction matters.

## Scan Intersections

Run an Intersection Scan across all Agent Files under `.agents/**/*.md`, excluding Resource Files under `.agents/resources/` and installed skill packages under `.agents/skills/`. Classify matches before deciding whether to update anything.

Load [Intersection Points](../references/00002-intersection-points.md) for the starting scan list. For each relevant intersection, identify matching headings, IDs, names, links, repeated concepts, answered gaps, new gaps, open questions, duplicate facts, and conflicting claims.

## Resolve Updates

1. Treat each intersecting owner Agent File and its relevant linked Reference Files as one Agent Document.
2. If the import closes previous gaps or answers open questions, update the intersecting Agent Documents after confirming they are in scope.
3. Use the [Agent File Update Workflow](agent-file-update.md) for every existing Agent Document changed by the import. Merge the current document and accepted imported material before repartitioning.
4. If the import introduces new gaps or open questions, add explicit sections for them in the new or updated Agent Document.
5. If the import contradicts existing Agent Files, stop before editing those existing files. Tell the user which files intersect, what conflicts, and what updates the import would drive. Ask for confirmation before applying those updates.
6. If the import shows content in `.agents/context/` should be demoted, preserve useful material in the right Spec File, Reference File, or Resource File. If the correct destination is unclear, ask the user where to demote it before editing.
7. Do not require unrelated unresolved questions to be answered before accepting an import.
8. Create `.agents/context/index.md` if absent when the first Context File is created.
9. Update `.agents/context/index.md` when a Context File is added, renamed, split, or materially rerouted.

## Split And Validate

1. Use the [Agent File Creation Workflow](agent-file-creation.md) for a new Agent Document and the [Agent File Update Workflow](agent-file-update.md) for an existing one.
2. Partition only after the new or updated Complete Draft contains all in-scope information.
3. Use Resource Links for archived Raw Source. For canonical project sources retained in place, link or cite their authoritative paths through Source Provenance.
4. Use descriptive Reference Links for losslessly split markdown under `.agents/references/`.
5. Compare the source coverage inventory with the final routed Agent Document before treating line-count compliance as success.
6. Run the Agent Workspace validator after ingestion and repair required issues.

## Handoff

End each ingestion pass by stating sources processed, which sources were archived or retained in place, Agent Files created or updated, intersections or conflicts found, validation result, blocker or user decision still needed, recommended next step, and any useful alternatives.

## Reference

- [Detailed Agent Workspace folder, naming, and linking rules](../references/00001-agent-workspace-rules.md)
- [Intersection Points](../references/00002-intersection-points.md)
<!-- agent-workspace-rules:end -->
