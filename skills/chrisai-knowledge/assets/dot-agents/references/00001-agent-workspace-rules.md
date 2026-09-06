# Agent Workspace Rules Reference

<!-- agent-workspace-rules:start -->
This Reference File expands the local `.agents/AGENTS.md` contract. Fidelity comes before file size in every Agent File creation, ingestion, update, and split.

## Folder Contract

`.agents/context/` is the only source-of-truth folder for agents. Add only Accepted Reusable Truth there, and route discovery through `.agents/context/index.md` when Context Files exist.

Promote accepted reusable truth into `.agents/context/` when future agents should inherit it. Demote content out of `.agents/context/` when it is not Accepted Reusable Truth, is stale or contradicted, is too narrow for shared context, or belongs in a Spec File, Reference File, or Resource File instead.

Context Demotion is not deletion. Preserve useful material in the correct lower-authority location and keep or add links when future agents need provenance. If the correct destination is unclear, ask the user where to demote the content before editing.

`.agents/references/` stores complete sections and supporting detail split from owner Agent Files. It must stay flat. An owner and its linked Reference Files collectively retain the complete Agent Document. References are deferred content, not disposable content, and should be loaded only when their Reference Link description matches the current task.

Reference Files may link to Context Files, Resource Files, or other Reference Files.

`.agents/resources/` stores Raw Source and other Resource Files. Resource Files may be unlinked.

`.agents/skills/` stores independently installed reusable skill packages. Those packages are tooling rather than project Agent Files, so this contract's Agent File line caps, local-link checks, Reference Link rules, and Intersection Scans do not apply to them. Use the skill package's own validator instead.

`.agents/workflows/` stores repeatable Agent Workspace maintenance workflows.

`.agents/scripts/` stores deterministic helper scripts for Agent Workspace checks.

## Complete Then Split

Create the Complete Draft before applying line thresholds. Do not interrupt, shorten, or summarize drafting to satisfy a threshold. A working draft may temporarily exceed the thresholds; final Agent Files must comply at workflow closeout.

Prefer 200 lines or fewer for a final Agent File. A coherent 201-500 line file is allowed when another split would harm retrieval. Losslessly split any file over 500 lines.

Split by cohesive section or retrieval task, not arbitrary line ranges. Move complete examples, evidence, Source Provenance, variants, rationale, requirements, decisions, constraints, and edge cases into Reference Files. Keep the owner Agent File focused on immediately needed content and routing.

A concise owner or router may summarize what each Reference File contains, but that routing summary must not replace the complete detail in the reference.

## Source Preservation

Decide whether Source Material needs an independent archive before rewriting it. `.agents/resources/` is an evidence store, not a mirror of the project.

- For non-code Source Material, preserve an exact or faithfully extracted Resource copy when the source is external, pasted, attached, transient, scheduled for deletion, not reliably recoverable, or explicitly requested for archival.
- Keep source code in its authoritative location and record precise paths plus a commit, revision, or content hash when useful. Copy source code into `.agents/resources/` only when the user explicitly requests a source-code archive. Do not infer permission from the code being external, transient, scheduled for deletion, or difficult to recover; report the risk and ask.
- When a source-code archive is explicitly requested, archive only the requested scope. Do not add generated trees, dependencies, unrelated source folders, or the repository unless the request explicitly includes them.
- Do not bulk-copy non-code project folders merely because an agent inspected them. If a non-code directory needs archival, define the bounded scope and preserve its structure or manifest.
- If non-code project Source Material will be deleted or replaced without durable recoverability, preserve it before that change.

When archival is required, preserve the Raw Source before rewriting it. Do not use a summary as a substitute for the archive.

Source preservation and Agent Document completeness are independent requirements. Whether a source is archived or referenced in place, the resulting Agent Document must retain all in-scope meaning rather than becoming a summary-only record.

## Updating Existing Agent Documents

Treat an existing owner Agent File and its relevant linked Reference Files as one Agent Document. Reconstruct that document, merge the accepted update into a Complete Draft, and only then repartition it.

Preserve all unaffected information. Remove or replace content only when it is explicitly corrected, superseded, rejected, demoted, or authorized for removal. Check inbound links before changing a shared Reference File, and preserve history or provenance when future agents may need it.

## Reference File Naming

Use `.agents/references/00001-meta-title.md`.

Start with `00001`, increment for each new Reference File, and replace `meta-title` with a lowercase hyphenated name that helps an agent infer the file contents.

## Link Quality

Use the correct relative path from the linking Agent File.

Examples in non-link notation:

- From `.agents/context/product-specs.md`: `Detailed checkout constraints -> ../references/00002-checkout-constraints.md`
- From `.agents/AGENTS.md`: `Agent workspace rules -> references/00001-agent-workspace-rules.md`

The link description should summarize what the Reference File contains and state when to load it, not merely repeat the filename.

The deterministic link check ignores fenced code examples and does not report
link errors or warnings from `.agents/workflows/` or `.agents/skills/`. Valid
workflow links may still establish inbound ownership for Reference Files.

## Coverage Review

Before partitioning, inventory the headings, identifiers, citations, tables, examples, edge cases, and other details that must survive. After creation, ingestion, update, or splitting, compare the Complete Draft and inventory with the final owner and Reference Files. Confirm every in-scope detail remains present or has an explicit recorded disposition. Line-count compliance without this coverage review is not completion.

## Zombie Reference Repair

Every Reference File needs an inbound link from another Agent File.

When a Reference File has no owner, scan Context Files and Reference Files for matching headings, terms, IDs, and topic overlap. Add a Reference Link from the most specific owner when the match is clear. If no owner is clear, notify the user and do not delete the file without explicit approval.

## Next-Step Router

Use this router after setup and after each workflow pass. Recommend one next step, and include up to two alternatives only when they are genuinely useful.

- If no Context Files exist and the project has accepted reusable truth to seed, use the Context Initialization Workflow.
- If the user has Source Material to preserve or convert, use the Agent File Ingestion Workflow.
- If a new Agent Document needs drafting, splitting, or better Reference Links, use the Agent File Creation Workflow.
- If an existing Agent Document needs revision or repartitioning, use the Agent File Update Workflow.
- If validator output reports zombie Reference Files, use the Zombie Reference File Repair Workflow.
- If bounded planning, Gaps, research, Proofs, or Freeze are needed, use the Spec Driven Development Workflow.
- If a spec has unresolved questions, fuzzy terms, or interrupted Q/A, use the Spec Grill Session Workflow.
- If a spec has user-facing behavior, actors, permissions, lifecycle states, integrations, or step sequencing, use the Spec User Journeys Workflow.
- If a Frozen spec is ready for technical planning or implementation, use the Spec Task Implementation Workflow.
- If the user delegates acceptance of one or more implemented spec tasks to an agent, use the Spec Task Acceptance Workflow after verification.
- If validation passes and there is no useful follow-up, say no next step is needed.
<!-- agent-workspace-rules:end -->
