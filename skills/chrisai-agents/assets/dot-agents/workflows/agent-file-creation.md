# Agent File Creation Workflow

<!-- agent-workspace-rules:start -->
Use this workflow when creating, splitting, or linking a new Agent Document. Use the [Agent File Update Workflow](agent-file-update.md) when revising an existing Agent Document.

If the file is being created from Source Material, first use the [Agent File Ingestion Workflow](agent-file-ingestion.md).

## Governing Rule

Fidelity comes before file size. Finish the Complete Draft before applying line thresholds. The working draft may temporarily exceed the thresholds; final Agent Files must comply after the Lossless Split and coverage check.

## Create The Complete Draft

1. Confirm the target Agent File path under `.agents/`.
2. Do not use this workflow for Raw Source under `.agents/resources/`.
3. Write the complete Agent Document before splitting. Preserve every in-scope requirement, decision, constraint, example, edge case, identifier, citation, table, and other meaning-bearing detail.
4. Do not shorten, summarize, or stop drafting to satisfy a line threshold.
5. Put only Accepted Reusable Truth in `.agents/context/`.
6. Create `.agents/context/index.md` if absent when the first Context File is created, and keep it as the read-first map.
7. Use Resource Links for Raw Source and other Resource Files.
8. Before partitioning, record a temporary coverage inventory of headings, identifiers, citations, tables, examples, edge cases, and other details that must survive the split.
9. Start partitioning only after the Complete Draft contains all in-scope information.

## Partition After Completion

1. Keep the document in one Agent File when it contains 200 lines or fewer and is coherent.
2. Review a 201-500 line Agent File for a useful split. Keep it intact when another split would harm coherence or retrieval.
3. Losslessly split any Agent File over 500 lines before workflow closeout.
4. Choose boundaries by cohesive section or retrieval task, not by arbitrary line ranges.
5. Keep immediately needed content and routing in the owner Agent File. Move complete sections and details into Reference Files without replacing them with condensed summaries.
6. Find the next available number under `.agents/references/`, starting at `00001`, and use a task-informative lowercase hyphenated meta title.
7. Add a Reference Link from the owner using the correct relative path. Its description must summarize what the reference contains and state when to load it.
8. Apply the same thresholds to Reference Files, splitting them further when needed.

## Coverage Check

1. Compare the Complete Draft and coverage inventory with the final owner Agent File and linked Reference Files.
2. Confirm every in-scope section and meaning-bearing detail remains present in the final routed files.
3. Confirm the owner routes an agent to each deferred section without requiring unrelated references to be loaded.
4. Do not treat a concise router or preserved Raw Source as a substitute for complete documented detail.

## Validate

Run the Agent Workspace validator after creation or split repair. Treat hard errors as required fixes and warnings as review prompts.

If validation reports a zombie Reference File, switch to the [Zombie Reference File Repair Workflow](repair-zombie-reference-files.md).

## Handoff

End each Agent File creation pass by stating the Agent Files created, Reference Files created or updated, coverage-check result, validation result, blocker or user decision still needed, recommended next step, and any useful alternatives.

## Reference

- [Detailed Agent Workspace folder, naming, and linking rules](../references/00001-agent-workspace-rules.md)
<!-- agent-workspace-rules:end -->
