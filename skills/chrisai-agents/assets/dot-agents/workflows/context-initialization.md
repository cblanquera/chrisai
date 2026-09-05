# Context Initialization Workflow

<!-- agent-workspace-rules:start -->
Use this workflow when bootstrapping or substantially rebuilding `.agents/context/` from mixed Source Material such as chat prompts, attachments, existing documentation, code, existing `.agents` files, or prior planning records.

Do not use this workflow to replace the [Spec Driven Development Workflow](spec-driven-development.md). Use specs for bounded planning, implementation contracts, research queues, Proofs, and Freeze. Use this workflow to establish the reusable source-of-truth layer that future specs should read first.

If the task is only importing one known source into one known Agent Document, use the [Agent File Ingestion Workflow](agent-file-ingestion.md) directly.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/TERMS.md`
3. `.agents/context/index.md`, when Context Files exist
4. `.agents/workflows/agent-file-ingestion.md`
5. `.agents/workflows/agent-file-creation.md`
6. `.agents/workflows/agent-file-update.md`, when existing Agent Documents may change
7. `.agents/workflows/spec-driven-development.md`, when a bounded spec may be needed
8. relevant Source Material, project documentation, code, and user instructions

Do not load unrelated Source Material just because it exists. Start from the user's stated inputs, then expand only when the initial scan shows an intersection or conflict.

## 1. Inventory Sources

1. List each input source, including prompt text, attachment name, file path, URL, repository area, existing Agent File, or code path.
2. Record Source Provenance when known: path, URL, capture source, extraction limits, and access date when useful.
3. For non-code Source Material, preserve Raw Source under `.agents/resources/` before rewriting it when the source is pasted text, extracted attachment text, external material, transient, scheduled for deletion, or otherwise not already durable in the repository.
4. Keep source code in place and record precise paths plus a revision or content hash when useful. Copy source code into `.agents/resources/` only when the user explicitly requests a source-code archive; do not infer permission from source location, durability, or deletion risk.
5. If source code is at risk and archival was not explicitly requested, report the risk and ask before copying it.
6. If extraction is partial, lossy, or uncertain, record the limitation next to the Resource Link, source location, or in a linked Reference File.

## 2. Classify Material

Classify meaningful claims, requirements, constraints, terms, examples, decisions, workflows, and technical facts before writing context:

- `accepted-reusable-truth`: stable enough for `.agents/context/`.
- `needs-confirmation`: plausible but not accepted; ask the user, research, or route to a spec Gap.
- `source-detail`: useful provenance, long examples, rationale, or raw evidence; keep in `.agents/resources/` or `.agents/references/`.
- `spec-scope`: bounded implementation, feature planning, Proof, task, or Freeze material; route to `.agents/specs/`.
- `conflict`: contradicts existing Context Files, Source Material, code, or user direction; stop and report before editing the conflicting truth.

Do not treat volume, repetition, or an unspecified destination as proof that content is Accepted Reusable Truth.

## 3. Propose Context Shape

Before writing the first Context File or rebuilding several Context Files, propose the intended `.agents/context/` shape:

1. Create only files backed by real accepted material. Do not create placeholder Context Files.
2. Choose topic files that future agents can route from `.agents/context/index.md`.
3. Keep `.agents/context/index.md` as the read-first router, not a summary substitute for the Context Files.
4. Add `Load when:` guidance for each context link when it helps future agents choose the right file.
5. Plan likely Reference Links for long provenance, detailed examples, and extracted support material, but do not partition or summarize the material before completing the draft.

If the best taxonomy is unclear, ask for confirmation before creating multiple Context Files. For a small first pass, prefer one focused Context File plus `index.md` over a broad empty taxonomy.

## 4. Draft Context Files

Use the [Agent File Ingestion Workflow](agent-file-ingestion.md) for Source Material imports, the [Agent File Creation Workflow](agent-file-creation.md) for new Agent Documents, and the [Agent File Update Workflow](agent-file-update.md) for existing Agent Documents.

When drafting Context Files:

1. Finish a Complete Draft with all in-scope meaning, requirements, decisions, constraints, examples, edge cases, identifiers, citations, tables, and other meaning-bearing detail. Do not reduce context to a summary-only record.
2. Separate accepted truth from agent-added clarification when that distinction matters.
3. Keep temporary assumptions, raw research notes, one-spec tasks, and implementation sequencing out of `.agents/context/`.
4. Add or update `.agents/context/index.md` when a Context File is added, renamed, split, or materially rerouted.
5. Only after the draft is complete, losslessly split it into cohesive flat numbered Reference Files and link them with descriptions that state what they contain and when to load them.

## 5. Route Gaps And Specs

Initial context population does not require every unknown to be resolved.

1. Ask the user only when an unresolved issue blocks deciding whether content is Accepted Reusable Truth.
2. Route bounded implementation or planning uncertainty into the [Spec Driven Development Workflow](spec-driven-development.md).
3. Use the [Spec Grill Session Workflow](spec-grill-session.md) when exact user answers, pressure-testing, or resumable Q/A are needed for a spec.
4. Promote accepted reusable truth from a Frozen spec back into `.agents/context/`; do not make future specs depend on sibling specs for shared truth.
5. Leave speculative, temporary, or one-spec details out of context until they are accepted and reusable.

## 6. Validate And Handoff

Run the Agent Workspace validator after context initialization or rebuild:

```bash
python .agents/scripts/validate-agent-workspace.py
```

Use `python3` instead of `python` on systems where that is the Python 3 executable.

End each context initialization pass by stating sources processed, Raw Source preserved, Context Files created or updated, Reference Files created or updated, conflicts found, Gaps or specs routed, validation result, recommended next step, and any useful alternatives.
<!-- agent-workspace-rules:end -->
