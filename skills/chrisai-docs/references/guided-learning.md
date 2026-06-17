# ChrisAI Docs Guided Learning

This reference is the editorial standard for learning-oriented developer
documentation aimed at junior developers.

Its job is to make the first experience obvious, fast, and low-friction. Do
not write docs as a knowledge dump. Optimize for successful learning and first
success.

This standard combines:

- a Diataxis-like separation of tutorial, how-to, explanation, and reference
- progressive disclosure
- very clear, concise documentation that gets to first success quickly

## Contents

- [Task Intake](#task-intake)
- [Scope](#scope)
- [Priority](#priority)
- [Non-Negotiable Rules](#non-negotiable-rules)
- [Editorial Model](#editorial-model)
- [Default Reader Flow](#default-reader-flow)
- [Section Standard](#section-standard)
- [Teaching Arc](#teaching-arc)
- [Walkthrough Standard](#walkthrough-standard)
- [Writing Standard](#writing-standard)
- [Opening Paragraph Pattern](#opening-paragraph-pattern)
- [Section Structure Rules](#section-structure-rules)
- [Example Explanation Standard](#example-explanation-standard)
- [Phrase Rotation](#phrase-rotation)
- [Compression Standard](#compression-standard)
- [Decision Rules](#decision-rules)
- [Restructuring Existing Docs](#restructuring-existing-docs)
- [Deliverables](#deliverables)
- [Anti-Patterns](#anti-patterns)
- [Review Gate](#review-gate)
- [Output Defaults](#output-defaults)

## Task Intake

Before drafting or restructuring, identify:

1. who the reader is
2. whether they are evaluating, trying, learning, or returning
3. the first visible success the page should create
4. what content is really reference material and should move out of the main
   flow
5. whether the result should be one page, a short guide set, or a landing page
   with follow-up links

If the request is mainly API lookup content, switch to
`references/api-reference.md`. If the flow is already sound and the task is
mostly cleanup, apply `references/formatting.md` after the content plan is
settled.

## Scope

Use this reference for:

- onboarding guides
- quick starts
- tutorials
- conceptual explanations
- guided learning pages
- teaching-style revisions
- restructuring developer docs for clarity and adoption

Do not use this reference as the primary rule set for API reference schema design
or markdown normalization.

For those cases, use:

- `references/formatting.md`
- `references/api-reference.md`

## Priority

When this reference is used with other documentation guidance:

1. `references/guided-learning.md` decides what content appears, in what order,
   and for which reader state.
2. `references/api-reference.md` decides the structure of pure API
   reference pages.
3. `references/formatting.md` standardizes presentation without overriding
   the intended reader flow.

Do not force guided-learning patterns onto pure API reference pages. Do not
let formatting rules override first-success sequencing.

## Non-Negotiable Rules

- Prioritize time to first success over feature completeness.
- Reduce cognitive load at every step.
- Introduce concepts only when the reader needs them.
- Keep onboarding, explanation, and reference material separate.
- Prefer one recommended path before presenting alternatives.
- Use clear, concise language.
- Remove anything that does not help the reader act or understand.

If the user asks for documentation that mixes tutorial, concept, and reference
content into a single dense page, restructure it unless they explicitly
require the mixed format.

## Editorial Model

Assume the reader is in one of four states:

1. Evaluating: "What is this and why would I use it?"
2. Trying: "Show me the fastest way to make it work."
3. Learning: "Explain how this system works."
4. Returning: "I need a specific detail now."

Write so the reader can move from one state to the next without being forced
to absorb later-stage detail too early.

## Default Reader Flow

Unless the user explicitly requests another structure, organize quick starts,
tutorials, and guided learning docs in this sequence:

1. `Start here`
2. `Quick start`
3. `What just happened`
4. `Core concepts`
5. `Common tasks`
6. `Next steps`
7. `Reference`

If the deliverable is only one page, compress this structure but preserve the
sequence.

## Section Standard

- `Start here` must answer what this is, who it is for, and what the reader
  will accomplish next.
- `Quick start` must be the shortest realistic path to a visible success
  state.
- `What just happened` must convert the quick start into understanding.
- `Core concepts` must explain the mental model after the reader has a concrete
  anchor.
- `Common tasks` must be organized by user intent, not implementation detail.
- `Next steps` must point to the most likely follow-up actions.
- `Reference` must stay lookup-oriented and not take over the page.

## Teaching Arc

For tutorials, lessons, and conceptual pages, teach like a guided
walkthrough instead of a manual.

Most learning-oriented docs should follow this arc, even when the actual
headings differ:

1. Motivate the topic with the ordinary developer problem before naming the
   framework, API, or internal concept.
2. Give the reader a small mental model, comparison, or story when the concept
   is not already familiar.
3. Start with the smallest useful case that produces a visible or verifiable
   result.
4. Walk through the first case in small changes, explaining what each change
   does before adding the next one.
5. Add subtopics, alternatives, tradeoffs, and edge cases only after the first
   working anchor is clear.
6. End with a short learning recap that names what changed, what behavior it
   revealed, and what the reader should recognize next.

Do not open a lesson by saying only what the page is "for." Start by framing
the real problem, why it matters, and what the lesson will make clear.

## Walkthrough Standard

Use guided walkthroughs for the first practical example in a guided-learning
page. These are not exercises or homework; they are the teaching path inside
the lesson.

The first walkthrough should:

1. point to the current file, command, screen, or idea
2. add or change one small thing
3. explain what that fragment does
4. add the next small thing
5. explain how behavior changed
6. repeat step 4 and 5 until example is complete
7. verify the result

Keep the first code or configuration example small. If a code block contains
more than one new idea, split it or explain the pieces immediately after the
block.

Every example needs an explanation before the next heading. Do not show code,
a file path, a command, a diagram, or a config snippet and then move on without
explaining what it demonstrates and which part matters.

After the first working anchor, subtopic examples can be shorter. Introduce
the detail, show one focused example, explain what the example demonstrates,
connect it back to the main concept, then move to the next detail.

Conceptual pages still need concrete anchors. Use a tiny code fragment, file
shape, command, diagram, or realistic scenario when a full walkthrough would
be too heavy.

## Writing Standard

- Teach the reason, show the action, explain the result, then add subtopics
  and variations.
- Lead with outcomes before internals.
- Explain why the topic matters before asking the reader to memorize terms or
  copy code.
- Use short sections and descriptive headings.
- Introduce one new idea at a time.
- Prefer concrete examples over abstraction.
- Prefer simple sentences over clever sentences.
- Prefer active voice.
- Use jargon only when necessary, and define it at first use.
- State tradeoffs only when the decision matters now.
- Use short metaphors, stories, or comparisons only when they clarify the
  concept, then connect them back to concrete code or behavior.
- Make transitions explain why the next idea follows from the previous one.
- Vary repeated instruction, explanation, transition, and recap phrasing so
  related pages do not sound like generated templates.

## Opening Paragraph Pattern

A good opening usually has three parts:

1. the real-world problem
2. why the topic matters
3. what the lesson will make clear

Avoid opening with `This page is for...`. That phrase describes the document,
not the reader's problem. Start by framing the idea in ordinary developer
terms, then connect it to the technical surface the page will teach.

## Section Structure Rules

Every heading must introduce content before it introduces another heading. Do
not place an H2 directly before an H3, or any heading directly before a lower
level heading.

If a parent section mostly groups subsections, add a real orientation
paragraph. The paragraph can summarize what the subsections cover, explain why
those details belong together, or tell the reader how to read the group.

Teaching paragraphs should usually contain more than one sentence. A
single-sentence prose line often reads like a label, note, or generated recap
instead of a lesson. Short labels, list items, commands, and code examples can
still be short.

## Example Explanation Standard

When explaining an example, answer at least two of these questions when
relevant:

- What does this example do?
- Which line, value, file, or command should the reader notice?
- Why is this the right surface, method, file, or workflow for this point?
- What behavior changed because of the example?
- How does this connect back to the current lesson?
- What would change if the reader used a different option?

Put caveats after the simple case unless the caveat prevents a dangerous,
destructive, or seriously misleading action.

## Phrase Rotation

Repeated instruction phrases make docs sound generated. Rotate wording across
actions, explanations, transitions, and recaps while preserving exact API names
and technical terms.

Use phrase banks as examples, not required templates.

Instruction starters can include:

- `Start by looking at...`
- `First, open...`
- `Now add...`
- `Next, change...`
- `After that, check...`
- `Once that is in place...`
- `Run it again and look for...`

Explanation starters can include:

- `What this does is...`
- `That matters because...`
- `The important part is...`
- `Behind that small line...`
- `In plain terms...`
- `The reason this works is...`

Transition starters can include:

- `That handles the simple case.`
- `The next question is...`
- `This is where the distinction matters.`
- `With the basic flow working...`
- `There is one detail worth slowing down for.`
- `From here, the pattern becomes...`

Recap starters can include:

- `You should now be able to...`
- `The main thing to remember is...`
- `In this lesson, the important shift was...`
- `What you changed was small, but it showed...`
- `This prepares you for...`

Do not use the same starter in neighboring paragraphs. When multiple files
teach related ideas, repeat the concept but vary the angle so the prose does
not become a template.

## Compression Standard

AI tends to over-explain. Do not do that.

Before finalizing, cut:

- repeated explanation
- throat-clearing introductions
- feature tours on guided-learning pages
- optional branches that do not matter yet
- background that does not help the next action
- examples that do not get explained
- metaphors that take longer to understand than the concept they explain

If a paragraph does not help the reader do something, verify something, or
understand a current concept, remove it.

## Decision Rules

When there is tension between completeness and usability:

1. Choose usability for the first page.
2. Move extra detail to a later section.
3. Keep the main path intact.

When there is tension between explaining and doing:

1. Let the reader succeed first.
2. Explain immediately after success.

When there is tension between many valid paths:

1. Recommend one path.
2. Mention alternatives briefly.
3. Move full comparison later.

## Restructuring Existing Docs

When rewriting existing documentation:

1. Identify the current first page for a new developer.
2. Remove or relocate content that blocks first success.
3. Create a shorter happy-path quick start.
4. Separate explanation from tutorial flow.
5. Separate tasks from reference.
6. Replace bare "this page is for..." openings with motivated overviews.
7. Check that headings introduce content before nesting into subheadings.
8. Verify that examples are explained before the next heading or example.
9. Verify that each page serves one reader stage well.

## Deliverables

A good output usually includes:

- one clear first page or entry point
- one happy-path quick start with a verification step
- explanation sections that follow success instead of blocking it
- task-oriented follow-up sections or separate pages when needed
- explicit links to reference material instead of embedding all details inline

## Anti-Patterns

Do not:

- start with architecture before the reader has done anything
- start every page with "this page is for..." instead of the reader's problem
- explain every feature before showing one useful outcome
- present many installation variants on the first page
- present a large code block without walking through the important pieces
- present examples without explaining what they demonstrate
- place a heading directly before a subheading without an orientation
  paragraph
- mix first-use learning flow with advanced operations
- mix tutorial content with exhaustive reference
- call guided walkthroughs homework, exercises, or practice tasks
- end only with a next-link when a learning checkpoint is needed
- use completeness as an excuse for poor sequencing
- use the same transition phrase repeatedly
- leave one-sentence teaching paragraphs as standalone lines

## Review Gate

Do not consider the output complete unless the answer to all of these is yes:

- Does the page create a clear first success?
- Is the order optimized for a junior developer?
- Does the opening explain the reader's problem and why the topic matters?
- Is there a mental model before heavy project-specific vocabulary?
- Is the first example small enough to understand?
- Are code, command, config, diagram, and file examples explained before the
  page moves on?
- Does every heading have orientation content before any nested subheading?
- Do transitions explain why the next section follows?
- Are repeated phrases rotated or rewritten?
- Does the ending summarize what the reader learned?
- Was dense reference material kept out of the early flow?
- Are follow-up tasks and next steps easy to find?
- Did the page avoid becoming a feature dump?

## Output Defaults

Default deliverables should be one of:

- a docs outline with section summaries
- a rewritten guided-learning page
- a quick start followed by explanation
- a reorganization plan split into tutorial, tasks, explanation, and reference

If the user asks for only one page, still preserve this internal order:

1. orientation
2. fast success path
3. explanation
4. next steps
