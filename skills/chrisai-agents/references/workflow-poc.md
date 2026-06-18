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

- `.agents/specs/<spec-id>/poc/`
- `.agents/specs/<spec-id>/poc/brief.md`
- `.agents/specs/<spec-id>/poc/results.md`
- `.agents/specs/<spec-id>/poc/snippets/`, only for large proof notes,
  command output, or implementation excerpts
- `.agents/context/`, when accepted POC learning should be inherited by future
  specs
- parent spec `questions.md`, `assumptions.md`, `risks.md`, `decisions.md`,
  `evidence.md`, and `tasks.md` records with `Phase: poc`
- `.agents/development/progress/`, only when active POC execution tracking is requested

## Branch Policy

Each POC should have its own branch named `poc-<short-name>`. Keep prototype
code for that proof only on its POC branch. Do not combine multiple unrelated
POCs on one branch.

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
3. Create or update `.agents/specs/<spec-id>/poc/brief.md` for the proof inside
   the spec it is trying to prove. Do not create duplicate grouped record files
   inside `poc/`, create a shared POC folder directly under `.agents/specs/`, or
   fill the target spec with unproven product scope.
4. Keep the proof narrow and disposable unless the user asks to harden it.
5. If a developer must prototype the proof, create or route to a progress item
   that names the feasibility question, `poc-<short-name>` branch, expected
   evidence, failure signal, and files or systems that may be touched.
6. Record what was tested, what worked, what failed, and what remains unknown.
7. Decide whether the result should be promoted, replaced, discarded, or
   continued.
8. Write the proof outcome and promotion decision in
   `.agents/specs/<spec-id>/poc/results.md`.
9. Promote only accepted learning into `.agents/context/` and
   MVP/customer-facing records.
10. Reconcile rejected or inconclusive proof results into risks, questions,
   fallback decisions, or follow-up POC items.
11. Do not create MVP progress items directly from raw POC artifacts.

## Stop Conditions

- POC result is `proved`, `failed`, `inconclusive`, or `needs-follow-up`
- promotion decision is recorded
- reusable accepted learning is promoted or explicitly not promoted to
  `.agents/context/`
- POC branch is recorded when the proof required implementation
- developer/progress handoff is linked when the proof required implementation
- MVP records are updated only for accepted learning
- unresolved viability gaps are explicit

## Handoff

State the feasibility question, POC branch if any, proof implementation target
if any, evidence needed, result status, promotion decision, changed records, and
recommended next step: validation, MVP, freeze, progress, another POC, or no
follow-up.
