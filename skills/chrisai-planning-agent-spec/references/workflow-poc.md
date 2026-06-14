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
- relevant spec brief, questions, assumptions, risks, decisions, and evidence
- relevant source docs or code only for the feasibility question

## May Update

- `.agents/poc/`
- `questions.md`
- `assumptions.md`
- `risks.md`
- `decisions.md`
- `evidence.md`
- `tasks.md`
- `.agents/progress/`, only when active POC execution tracking is requested

## Process

1. Name the feasibility question.
2. Define the expected proof and what would count as failure or inconclusive
   evidence.
3. Keep the proof narrow and disposable unless the user asks to harden it.
4. Record what was tested, what worked, what failed, and what remains unknown.
5. Decide whether the result should be promoted, replaced, discarded, or
   continued.
6. Promote only accepted learning into MVP/customer-facing records.
7. Do not create MVP progress items directly from raw POC artifacts.

## Stop Conditions

- POC result is `proved`, `failed`, `inconclusive`, or `needs-follow-up`
- promotion decision is recorded
- MVP records are updated only for accepted learning
- unresolved viability gaps are explicit

