# Spec Task Acceptance Workflow

<!-- agent-workspace-rules:start -->
Use this workflow when the user asks an agent to accept one or more implemented tasks on their behalf. It may be invoked directly or from the Spec Task Implementation Workflow after the user explicitly delegates acceptance.

Delegation applies only to the named task or task set. It does not authorize the agent to change Acceptance Criteria, waive a failed or unavailable check, or expand testing into unrelated tasks or live-system mutations.

## Read First

1. `.agents/AGENTS.md`
2. `.agents/TERMS.md`
3. `.agents/context/index.md`, when Context Files exist
4. `.agents/specs/<spec-id>/index.md`
5. `.agents/specs/<spec-id>/status.md`
6. `.agents/specs/<spec-id>/tasks/status.md`
7. `.agents/specs/<spec-id>/tasks/<task-id>.md`
8. relevant project files, deployment instructions, and user instructions

Whenever this workflow creates an Agent Document, apply the [Agent File Creation Workflow](agent-file-creation.md). Whenever it changes one, apply the [Agent File Update Workflow](agent-file-update.md).

## 1. Wait For Task Details

Do not plan or run acceptance until the task file exists at `.agents/specs/<spec-id>/tasks/<task-id>.md` and contains the current task details. When implementation is still producing that file, use available task coordination to wait and resume after it becomes available. Do not guess the criteria or busy-poll. If no waiting mechanism is available, report what is missing and stop at a resumable boundary.

Acceptance normally begins after implementation verification passes. If the task is not `verified`, report its current state and wait unless the user explicitly asks only for an early acceptance plan.

## 2. Identify The Deployment Target And Execution Mode

Identify each applicable deployment target before choosing how to accept it:

- `web`: deployed site, local web server, or browser-rendered application;
- `desktop`: installed application, packaged build, or desktop development runtime;
- `mobile`: device build, emulator, simulator, or mobile web application; or
- `multiple`: more than one target with materially different acceptance steps.

Record the concrete target when known, including its URL, application or build identity, device or simulator, environment, revision, prerequisites, and test data. Ask when the target is ambiguous or unavailable.

Choose the execution mode in this order:

1. Use an acceptance library explicitly chosen by the user.
2. For web work without an explicit choice, propose Playwright as the default and ask the user whether to use it.
3. Otherwise inspect the current agent environment for an applicable in-app browser-control or computer/app-control capability. Ask the user to enable, authorize, or use it when user action is required.
4. If Playwright is unavailable or unsuitable for web work, offer an available browser-control capability before falling back to manual acceptance.
5. If no suitable library or agent capability is available, use `manual` or `none` and document what a human must do.

Record one of these execution modes for each acceptance: `library`, `agent-tool`, `manual`, or `none`. Do not represent an agent-tool or manual procedure as a standalone executable script.

## 3. Inspect Acceptance Criteria And Initialize The Ledger

Read the complete Acceptance Criteria section in the task file. Preserve each criterion as written and in its original order. Do not convert verification steps into Acceptance Criteria or weaken a criterion because it is difficult to execute.

Create `.agents/specs/<spec-id>/acceptance/` when the workflow evaluates its first task. Maintain these files in that folder:

- `status.md`: the latest status of every evaluated task and acceptance;
- `evidence.md`: the inventory of acceptance evidence stored as Resource Files; and
- one Agent File for each actual Acceptance Criterion.

If the task says `Acceptance criteria: none` or has no criteria, create no criterion file. Add a task-level `not-applicable` entry to `status.md`, keep the task at `verified`, and report that acceptance was skipped.

For actual criteria, derive the Task Control from the task filename, including
any side-quest suffix such as `00001A`. Assign acceptance controls in criterion
order and name the flat files:

```text
.agents/specs/<spec-id>/acceptance/<task-control>-001.md
.agents/specs/<spec-id>/acceptance/<task-control>-002.md
```

Retain established acceptance controls across later runs. Do not renumber existing records merely because a criterion is removed or reordered. If a Frozen task's criteria appear to have changed without authorization, record the conflict and ask whether the spec should reopen.

## 4. Write Each Acceptance Record

Each acceptance Agent File must contain:

- acceptance control, task control, and a link to the task file;
- the original Acceptance Criterion without loss of meaning;
- delegated scope and who authorized agent acceptance;
- deployment target and concrete environment;
- execution mode and selected library or capability;
- prerequisites, dummy test data, and initial state;
- ordered steps the agent can perform;
- expected observable result for each material step;
- evidence to capture;
- human-assisted steps and the exact help required;
- steps the agent cannot perform alone and why;
- cleanup or teardown steps;
- current result and attempt history; and
- links to corresponding JSON configuration and evidence when they exist.

Human-assisted and impossible steps must remain explicit. Provide enough plain-language detail for a person unfamiliar with the spec structure to complete them.

## 5. Maintain Status And Evidence

Use these acceptance statuses:

- `planned`: steps are documented but the target is not ready;
- `ready`: prerequisites and target are available;
- `running`: an acceptance attempt is in progress;
- `passed`: every required observation for that criterion succeeded;
- `failed`: the observed behavior did not meet the criterion;
- `blocked`: an environment, dependency, permission, or target prevents the attempt;
- `human-required`: a human action or observation is still needed; and
- `not-applicable`: the task has no Acceptance Criteria.

`status.md` is the latest-state rollup, not a replacement for the criterion
records. For each task or acceptance, record its control, task link, target,
mode, latest status, last attempt, evidence links, blocker or next action, and
whether delegated acceptance may update the task to `accepted`.

Store generated screenshots, recordings, and other evidence under:

```text
.agents/resources/acceptance/<spec-id>/<acceptance-control>/attempt-<number>/
```

Keep at most one finalized evidence folder per Acceptance Control. Capture a
new run in a fresh numbered folder without overwriting retained evidence, and
keep the previous folder while the new run is `planned`, `ready`, or `running`.
After the new attempt has a final status and its ledger links resolve, remove
older attempt folders before committing the replacement; deleting committed
artifacts later does not remove them from Git history.

Inventory only the retained artifacts in `evidence.md` with an evidence ID,
acceptance control, attempt, type, capture time, environment or build, Resource
Link, result, and useful notes. Do not retain links to removed artifacts. Keep
older attempt numbers, times, environments or builds, results, and notes as
text-only history in the acceptance record. Retain older evidence only when
the user explicitly requests it for debugging, audit, or compliance. Record a content hash when it materially helps integrity checks.

Use dummy accounts, keys, fixtures, and data by default. Do not impose extra
approval merely because ordinary dummy evidence is stored. If acceptance
requires or unexpectedly captures live credentials, personal data, customer
data, or other sensitive information, stop before retaining, committing, or
sharing it and ask the user how to handle that specific evidence.

## 6. Create Library-Backed Acceptance Automation

When a code acceptance library is selected, create `tests/acceptance/` at the
project root. For each criterion, create a human-editable JSON configuration
whose filename includes the spec ID and acceptance control. Include:

- schema version, spec ID, task control, and acceptance control;
- deployment target, environment, and selected library;
- prerequisites and dummy test data;
- ordered library-supported actions and assertions;
- evidence capture destinations;
- cleanup steps; and
- human-required or unsupported steps that the runner must not claim to run.

Create a small project-native runner for the chosen library. The runner must
accept a JSON configuration path, execute only recognized actions, fail on
unknown or malformed actions, return a nonzero result when an assertion fails,
and write generated evidence to the configured `.agents/resources` attempt
folder. Prefer one reusable runner per library over duplicated scripts for
every criterion.

Keep executable logic in the runner and editable values and steps in JSON. Do
not place secrets in JSON. Agent-tool, manual, and `none` modes do not receive
a pretend standalone runner; their steps remain in the acceptance Agent File.

## 7. Execute And Decide

For each attempt:

1. Confirm the implementation is verified and the intended target is running.
2. Confirm the acceptance scope and use dummy data unless the user directs
   otherwise.
3. Update the acceptance to `running` in its record and `status.md`.
4. Execute every agent-capable step and capture the required evidence.
5. Perform cleanup or teardown.
6. Record actual results without softening failed or inconclusive evidence.
7. Update the acceptance record, `status.md`, and `evidence.md`.
8. Update the task's acceptance notes with the overall result and links.

Use `passed` only when all required observations for that criterion succeed.
Use `human-required` when a human step remains, `blocked` when the attempt
cannot proceed, and `failed` when observed behavior contradicts the criterion.

When the user explicitly delegated acceptance, update the task to `accepted`
only after every Acceptance Criterion is `passed`. A human-assisted criterion
may pass only after the human supplies the required observation and the agent
records it. If any criterion is failed, blocked, human-required, or unrun, keep
the task at `verified` and state the next action. A task with no criteria also
finishes at `verified` with a `not-applicable` ledger entry.

## Acceptance Reports

When the user asks for an acceptance report, explain in simple terms what was
checked, what worked, what did not, what evidence exists, and what remains.
Avoid internal spec jargon in the user-facing explanation. When human action
is applicable, provide numbered, step-by-step instructions describing what to
open, what to do, what result to look for, and how to report the result back.

## Handoff

End each acceptance pass by reporting the spec and task, deployment target,
execution mode or library, latest criterion statuses, evidence captured,
human help still needed, task status, files created or updated, cleanup
performed, validation result, and recommended next step.
<!-- agent-workspace-rules:end -->
