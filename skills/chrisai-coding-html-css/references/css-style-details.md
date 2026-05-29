# CSS Style Details

## Section Ownership

When a stylesheet is large enough to need structure, organize it as:

- Global
- Components
- Partials
- Pages

Use section comments when they improve scanning.

## Selector Rules

- Put comma-separated selectors on separate lines.
- Prefer class selectors over tag selectors.
- Keep selector depth shallow.
- Separate direct-child combinators `>` with spaces.
- Avoid unnecessary tag-and-class combinations.
- Keep ownership anchored to one clear top-level class when possible.

## Property And Value Rules

- Put each property on its own line.
- Order properties alphabetically.
- Use 6-character uppercase hex values.
- Use `rgba(...)` for alpha transparency.
- Avoid named colors.
- Avoid `!important` unless there is no cleaner option.
