# Greenfield Discovery Document Templates

Keep documents concise. Link to supporting artifacts instead of duplicating
long context.

## Pre-Plan Brief

```markdown
# Pre-Plan Brief

## Objective

The objective of this phase is NOT to implement the application. The objective
is to perform research, requirements gathering, standards discovery,
architectural analysis, and produce complete implementation specifications
before coding begins.

## Project Title

## What We Are Designing

## Research-First Instructions

## Product Goals

## Desired Capabilities

## Preferred Technical Direction

## Architectural Constraints

## Explicit Non-Implementation Instruction

## Recommendation Rules

## Known Unknowns

## Readiness Classification
```

## Planning Directory Guide

Create `plans/AGENTS.md` to keep future planning work coordinated.

```markdown
# Planning Directory Guide

This directory contains the planning corpus for a large greenfield app before
implementation begins.

## Lifecycle

Intake -> Discovery -> Specifications -> Architecture Review -> ADRs ->
Readiness Gaps -> Spikes -> Decision Consolidation -> MVP Definition ->
Acceptance Criteria -> Non-Goals -> Final Grill Review -> Readiness Resolution
-> MVP Freeze -> Implementation Planning.

## Folder Purposes

### `specs/`

### `research/`

### `reviews/`

### `adr/`

### `spikes/`

### `decisions/`

### `mvp/`

### `acceptance/`

### `roadmap/`

### `implementation/`

Create `implementation/` only after final readiness review findings are
resolved or explicitly deferred and `plans/mvp/mvp-freeze.md` exists.

## Working Rules

- Preserve the distinction between requirements, decisions, risks, and
  acceptance criteria.
- Do not silently promote future-scope features into MVP.
- When changing one planning artifact, check related specs, ADRs, decisions,
  reviews, spikes, MVP, roadmap, and acceptance criteria.
- Keep unresolved items explicit.
- Do not start implementation from this directory alone.
- Do not create implementation epics or tasks before MVP freeze.
```

## Architecture Review

```markdown
# Architecture Review

## Assumptions Challenged

## Missing Requirements

## Scaling Concerns

## Security Concerns

## Alternative Architectures

## Lock-In Risks

## Migration Risks

## Difficult Questions

## Required Follow-Up
```

## ADR Candidate

```markdown
# ADR Candidate: Title

## Status

Final | Provisional | Unresolved

## Context

## Decision

## Alternatives Considered

## Alternatives To Consider

## Tradeoffs

## Consequences

## Follow-Up Questions

## Recommendation
```

## Spike

```markdown
# SPIKE-000: Title

## Objective

## Context

## Questions To Answer

## Hypothesis

## Investigation Plan

## Success Criteria

## Decisions Unlocked

## Estimated Effort
```

## Acceptance Criteria

```markdown
# System Acceptance Criteria

## Overview

## Success Criteria

## Functional Acceptance Criteria

## Security Acceptance Criteria

## Performance Acceptance Criteria

## User Experience Acceptance Criteria

## Failure Conditions

## Out Of Scope
```

Use measurable and testable language. Format criteria as either `Given / When /
Then` or `Requirement / Expected Result`.
