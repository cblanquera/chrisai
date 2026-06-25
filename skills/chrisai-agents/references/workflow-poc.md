# POC Workflow

Use this workflow when a feasibility question must be answered before trusting
MVP scope, architecture, integration, or sequencing.

## Use POC When

- a technical path may not work
- an integration, API, model, platform, or runtime behavior is uncertain
- two or more architecture options need evidence
- a workflow must be proven in principle before product commitments
- security, performance, persistence, permissions, or deployment risk may
  change the MVP plan
- imported or brownfield material describes a prototype that must be separated
  from intended product behavior

Skip POC when the uncertainty is only implementation effort, routine CRUD,
minor UI polish, known library usage, or work that can be specified and built
directly as MVP.

## Read First

- `.agents/AGENTS.md`
- `.agents/context/index.md`
- relevant spec brief, questions, assumptions, risks, decisions, and evidence
- relevant source docs or code only for the feasibility question

## May Update

- root `proofs/<proof-slug>/`
- root `proofs/<proof-slug>/README.md`
- root `proofs/<proof-slug>/proof.md`
- root `proofs/<proof-slug>/results.md`
- root `proofs/<proof-slug>/src/` and `tests/`, only when proof
  implementation is requested
- `.agents/context/`, when accepted POC learning should be inherited by future
  specs
- `.agents/references/`, when proof provenance or implementation evidence needs
  a pointer outside `.agents/context/`
- parent spec `questions.md`, `assumptions.md`, `risks.md`, `decisions.md`,
  `evidence.md`, and `tasks.md` records with `Phase: poc`
- `.agents/development/progress/`, only when active POC execution tracking is requested

## Branch Policy

Each POC should have its own branch named `poc-<short-name>`. Keep prototype
code for that proof under root `proofs/<proof-slug>/` on its POC branch. Do
not combine multiple unrelated POCs on one branch.

Do not switch branches or create a POC branch unless the user explicitly asks
for implementation or branch work. Before switching or creating a branch, check
`git status`. If unrelated dirty changes exist, stop and ask the user how to
proceed.

When a POC is accepted, promote only the accepted learning or reusable code into
the target product/spec branch through an explicit merge, cherry-pick, or
reimplementation decision. Do not treat the whole POC branch as product code by
default.

## Process

1. Name the feasibility question.
2. Define the expected proof and what would count as failure or inconclusive
   evidence.
3. Create or update root `proofs/<proof-slug>/proof.md` for the proof. Link it
   from the spec it is trying to prove. Do not create duplicate grouped record
   files inside `proofs/`, create a shared POC spec, or fill the target spec
   with unproven product scope.
4. Keep the proof narrow and disposable unless the user asks to harden it.
5. If a developer must prototype the proof, create or route to a progress item
   that names the feasibility question, `poc-<short-name>` branch, expected
   evidence, failure signal, root `proofs/<proof-slug>/` path, and files or
   systems that may be touched.
6. Record what was tested, what the proof did, how the test proves or fails the
   feasibility question, what worked, what failed, and what remains unknown.
7. Decide whether the result should be promoted, replaced, discarded, or
   continued.
8. Write the proof outcome and promotion decision in
   root `proofs/<proof-slug>/results.md`.
9. Promote accepted proof documents and learning into `.agents/context/` and
   MVP/customer-facing records. If provenance or implementation evidence must
   point to root `proofs/<proof-slug>/`, put that pointer in
   `.agents/references/` and link context only to the reference file.
10. Reconcile rejected or inconclusive proof results into risks, questions,
   fallback decisions, or follow-up POC items.
11. Do not create MVP progress items directly from raw POC artifacts.

## Proof Document Contents

`proof.md` should describe the proof before or during execution:

- feasibility question and why it matters
- hypothesis or expected result
- scope and non-goals
- systems, integrations, APIs, models, permissions, data, or runtime behavior
  being tested
- implementation approach and files or services touched
- setup, commands, fixtures, inputs, and test data
- expected proof signal, failure signal, and inconclusive signal
- safety, security, cost, performance, deployment, or cleanup concerns
- links to related spec records and `.agents/references/` provenance notes with
  purpose and `Load when:` guidance

Use this structure:

```markdown
# <Proof Name>

Status:
Branch:
Owner:
Created:

## Feasibility Question

## Why This Matters

## Hypothesis

## Scope

## Non-Goals

## Systems And Dependencies

## Implementation Plan

## Files, Services, Or APIs Touched

## Setup And Commands

## Fixtures, Inputs, And Test Data

## Expected Proof Signal

## Failure Signal

## Inconclusive Signal

## Safety, Security, Cost, Performance, And Cleanup Notes

## Related Records And Provenance

Link to spec records as needed. Put source, root artifact, external, or
implementation provenance in `.agents/references/`. Every `.agents/references/`
link must state why it exists and when to load it.

Use this shape for provenance references:

- `.agents/references/<reference>.md`
  Load when: <specific proof detail, artifact provenance, or evidence is needed>.
  Skip when: <the proof document already answers the feasibility question>.
```

`results.md` should describe what happened after execution:

- result status: `proved`, `failed`, `inconclusive`, or `needs-follow-up`
- what was built or tested
- commands, tests, observations, screenshots, logs, or evidence gathered
- what the proof did to prove or fail the question
- what worked, what failed, and what remains unknown
- accepted learning, rejected assumptions, risks, and follow-up questions
- promotion decision: promote, replace, discard, continue, or defer
- reusable code decision: merge, cherry-pick, reimplement, archive, or discard
- `.agents/context/` promotion summary and `.agents/references/` provenance with
  purpose and `Load when:` guidance

Use this structure:

```markdown
# <Proof Name> Results

Status: proved | failed | inconclusive | needs-follow-up
Branch:
Completed:

## Summary

## What Was Built Or Tested

## Evidence

Include commands, tests, observations, screenshots, logs, payloads, or other
evidence gathered.

## Result Against Feasibility Question

Explain exactly how the proof did or did not answer the question.

## What Worked

## What Failed

## What Remains Unknown

## Accepted Learning

## Rejected Assumptions

## Risks And Follow-Up Questions

## Promotion Decision

promote | replace | discard | continue | defer

## Reusable Code Decision

merge | cherry-pick | reimplement | archive | discard

## Context Promotion

Summarize what was promoted into `.agents/context/` and which
`.agents/references/` files carry provenance. Include purpose and `Load when:`
guidance for each reference link.
```

## Stop Conditions

- POC result is `proved`, `failed`, `inconclusive`, or `needs-follow-up`
- promotion decision is recorded
- reusable accepted learning is promoted or explicitly not promoted to
  `.agents/context/`
- proof document and result document exist under root `proofs/<proof-slug>/`
- POC branch is recorded when the proof required implementation
- developer/progress handoff is linked when the proof required implementation
- MVP records are updated only for accepted learning
- unresolved viability gaps are explicit

## Handoff

State the feasibility question, root proof folder, POC branch if any, proof
implementation target if any, evidence needed, result status, promotion
decision, changed records, `.agents/context/` promotion, and recommended next
step: validation, MVP, freeze, progress, another POC, or no follow-up.
