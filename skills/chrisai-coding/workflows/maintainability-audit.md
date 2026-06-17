# ChrisAI Coding Maintainability Audit

Use this workflow only when the user explicitly asks for a maintainability,
structure, organization, responsibility-separation, or "code stuffed into one
file" audit of existing code.

Do not use this as a first-pass implementation workflow. Normal coding work can
stay focused on getting the requested behavior working. This workflow is a
deliberate second pass that reviews whether the resulting code will be easy for
a human to find, understand, and change later.

## Stop Rule

This workflow is review-only by default.

- Inspect the existing code.
- Recommend concrete organization changes.
- Explain why each recommendation improves future maintenance.
- Stop before editing.
- Apply changes only after the user explicitly approves the recommendations.

If the user says something like "yea lets do that", use the narrowest
language-specific workflow after this audit to make the approved changes.

## Task Intake

Before auditing, identify what the user wants reviewed:

- a specific file
- a feature, entity, model, route, page, command, service, component, or domain
- a recent change or branch
- a suspected large file or mixed-responsibility area
- a general code organization pass over the current workspace

If the target is unclear, inspect the smallest relevant surface first and state
what scope you used.

## Discovery Workflow

Inspect in this order:

1. entry points and files named by the user
2. files they import or call directly
3. neighboring files that already establish naming and folder conventions
4. tests that show the intended public boundary
5. local guidance such as `AGENTS.md`, ADRs, or README files

Do not recommend a structure until you understand the codebase's existing
conventions. Local conventions beat this workflow.

## Audit Principles

Optimize for human maintenance after AI-generated code lands.

- Prefer code grouped around a centered feature, entity, model, domain,
  workflow, route, page, service, command, state object, or component.
- Keep related behavior together, but separate unrelated responsibilities.
- Prefer obvious file locations over clever abstraction.
- Split only when it improves findability, independent change, testability, or
  reuse.
- Preserve a simple local implementation when splitting would create ceremony
  without reducing mental mapping.
- Avoid broad architecture recommendations when the maintenance problem is
  local and can be solved with a small move or extraction.

## What To Look For

Load `references/maintainability-audit-signals.md` for concrete examples when
you need deeper signals.

Flag code when:

- one file mixes unrelated responsibilities
- future edits require scanning unrelated code to find the right behavior
- a centered feature, entity, model, or domain has code scattered across
  surprising locations
- repeated logic should live near the thing it describes or mutates
- exportable classes, functions, constants, or helpers have no predictable home
- a helper or utility file has become a dumping ground
- tests reach through internals because no stable boundary exists

## Preferred File Shape

Use these as preferences, not universal rules:

- Prefer each meaningful exported class in its own file.
- Name files according to the codebase's existing convention.
- If the codebase has no clear convention, prefer the class name as the file
  name.
- Put small exportable functions, constants, and utility helpers in nearby
  helper modules scoped to the feature, entity, model, or domain.
- Avoid broad catch-all helper files unless the utilities are genuinely shared
  across the whole project.

## Recommendation Format

Report findings first, ordered by maintenance impact.

For each finding, include:

- Finding: what is hard to maintain
- Evidence: the file or code area that shows it
- Why it matters: how it increases mental mapping or change risk
- Recommendation: the concrete organization change
- Scope: files likely to move or change
- Risk: behavior, import, test, or convention risks to watch

End with a clear stop point:

> I have not edited files. If you approve this direction, I will apply the
> recommended restructuring in a separate pass.

## Approval Pass

When the user approves the recommendations:

1. Re-read the current files because the workspace may have changed.
2. Apply the smallest structural change that satisfies the approved plan.
3. Preserve behavior and public contracts unless the user approved a breaking
   change.
4. Update imports and tests that protect the moved boundary.
5. Run the smallest relevant validation command available.
