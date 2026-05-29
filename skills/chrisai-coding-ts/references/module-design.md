# Module Design

Use this reference when the TypeScript task is not only about syntax or
formatting, but about where code should live and how the public surface should
be shaped.

## Split A File When

- the file serves more than one responsibility
- unrelated exports only happen to share imports
- one helper block is larger than the public entrypoint
- tests would be clearer if helpers were isolated
- types are reused across several modules

Do not split a file just to satisfy an aesthetic preference. Small local
helpers can stay local when extraction would hide the main flow.

## Keep Code Local When

- the helper is only used once
- extraction would force vague names like `utils.ts`
- the logic only makes sense in the parent module's context
- the file is still easy to scan top-to-bottom

## Public Boundary Rules

- Export the smallest stable surface that callers need.
- Keep parsing, coercion, and normalization near the boundary.
- Hide incidental helpers unless reuse or testing pressure justifies export.
- Prefer explicit types on exported functions when they improve API clarity.
- Prefer passing typed values inward instead of leaking raw boundary input deep
  into the module.

## Type Extraction Rules

- Extract a type when it is reused, named in docs, or important to the API.
- Keep throwaway shapes inline when naming them would add noise.
- Prefer `type` aliases for shared object shapes and unions.
- Use `interface` when a class contract is the main reason the shape exists.

## Review Questions

- Does each exported item belong in this module?
- Are callers forced to know too much about internal helpers?
- Would moving this code improve clarity for future edits, not only this one?
- Is the file still easy to scan without bouncing between too many modules?
