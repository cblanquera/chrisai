# ChrisAI Docs Copy Editing

This workflow is an editorial pass for existing developer-facing documentation.

Use it after the main content already exists, or when the task is specifically
about proofreading, clarity, tone, consistency, or wording cleanup.

Its role is editorial, not authorial. Improve clarity, sequencing,
terminology, and teaching value while preserving API meaning, behavioral
claims, code identifiers, and documented constraints.

## Ownership

Use this workflow for:

- proofreading and copy editing
- simplifying dense technical prose without changing meaning
- clarifying assumptions, terminology, and transitions
- improving consistency, readability, and junior-developer comprehension
- tightening existing explanations that are already supported by the local
  source

Do not use this workflow as the primary owner for:

- docs-from-scratch information architecture
- guided-learning flow design
- API reference schema or lookup structure
- formatting-only cleanup
- default multi-skill routing

Use this internal guidance instead:

- `references/guided-learning.md` for quick starts, tutorials, conceptual
  guides, and junior-developer learning flow
- `references/api-reference.md` for module/class/function/config reference
  pages and structured lookup material
- `references/formatting.md` for markdown normalization, outline cleanup,
  TOC decisions, and style-guide conformance

## Task Intake

Before editing, identify:

1. the document type: reference, guide, walkthrough, README, explanation, or mixed page
2. the intended reader task: evaluating, integrating, debugging, or learning
3. whether the problem is wording, local structure, missing context, or technical ambiguity
4. whether the request needs a light edit, standard edit, or substantive edit
5. whether another documentation skill should own the page first

If the task is mainly about guided-learning flow, quick starts, or developer
learning sequence, use `references/guided-learning.md` first.

If the task is mainly about API lookup structure, use
`references/api-reference.md` first.

If the task is mainly about headings, TOC, outline numbering, spacing, code
fences, or markdown normalization, use `references/formatting.md` instead.

## Audience Model

Assume the reader is a junior developer who:

- can read code and follow examples
- may not know framework jargon or project-specific shorthand
- benefits from explicit definitions and visible cause-and-effect
- needs assumptions stated clearly
- needs help understanding both what to do and why it works

Do not write down to the reader. Be direct, concrete, and technically
respectful.

## Editing Priorities

Apply these priorities in order:

1. Preserve technical truth.
2. Improve comprehension for junior developers.
3. Remove ambiguity, vagueness, and unexplained assumptions.
4. Improve local flow, consistency, and transitions.
5. Fix grammar, punctuation, and style.

## Core Rules

- Preserve API names, type names, file names, commands, and code identifiers exactly unless the source clearly shows they are wrong.
- Preserve semantics. Do not silently change behavior, requirements, defaults, side effects, guarantees, or limitations.
- Prefer plain language over expert shorthand.
- Define unfamiliar terms near first use.
- Expand vague statements into concrete ones when the source supports it.
- Make prerequisites and assumptions explicit.
- Prefer active voice and direct sentence structure.
- Prefer short paragraphs and example-led explanation when useful.
- Keep warnings, caveats, and constraints intact.
- If a technical claim cannot be verified from the local source, flag it instead of strengthening it.

## What To Improve

Improve:

- grammar, punctuation, spelling, and syntax
- dense or compressed explanations
- missing transitions
- undefined terminology
- inconsistent naming
- over-abstract phrasing
- explanations that assume too much prior knowledge
- explanations that describe mechanics without user meaning
- sections that bury the main point or sequence

## What To Protect

Do not:

- invent features, guarantees, or limitations
- smooth away important distinctions
- replace precise terms with looser ones when precision matters
- rewrite code examples unless needed for correctness or clarity
- remove caveats that affect correct usage
- present guesses as facts
- redefine the document's information architecture when a content-owner skill
  should do that work first

## Preferred Editorial Moves

When useful:

- add one short framing sentence before deep detail
- convert abstract wording into concrete outcomes
- explain a concept before listing its edge cases
- add brief "why this matters" context when it improves understanding
- distinguish similar concepts explicitly
- make sequencing and dependency visible
- break overloaded paragraphs into smaller units
- use examples to anchor behavior claims

## Edit Modes

Choose the lightest mode that fits the request.

### Light Edit

Use for small cleanup passes.

- fix grammar, punctuation, wording, and obvious clarity issues
- preserve the existing structure

### Standard Edit

Use for most documentation passes.

- improve wording, transitions, local flow, consistency, and readability
- reorganize locally when needed
- keep the overall document shape unless it is actively harmful

### Substantive Edit

Use when the draft is technically correct but still hard to learn from.

- restructure sections locally for clarity
- rewrite framing and sequencing within an existing section
- improve teaching flow without redefining the document's information
  architecture
- preserve meaning and technical claims

## Workflow

1. Determine whether another documentation skill should own the page first.
2. Read the full local context before editing so behavior claims are not changed casually.
3. Identify the target reader task and the main source of confusion.
4. Decide whether the page needs light, standard, or substantive editing.
5. Clarify the main idea of each section before rewriting sentences.
6. Rewrite for junior-developer comprehension while preserving precise meaning.
7. Check terminology, identifiers, defaults, and constraints against the local source.
8. Flag technical uncertainties instead of guessing.
9. Apply `references/formatting.md` last when final markdown or structure cleanup is needed.

## Output Expectations

When editing, return:

- the revised text
- a short summary of the main improvements
- any flagged technical uncertainties or open questions

When reviewing without rewriting, return:

- specific clarity issues
- specific accuracy risks
- concrete revision recommendations

## Review Gate

Do not consider the output complete unless the answer to all of these is yes:

- Was this an editorial task instead of a guided-learning, reference, or
  formatting-ownership task?
- Can a junior developer understand the main point of the page?
- Are terms defined before they are used heavily?
- Are claims precise and not overstated?
- Are assumptions and prerequisites explicit?
- Did code identifiers and technical behavior remain accurate?
- Is the revised version clearer without becoming less correct?
