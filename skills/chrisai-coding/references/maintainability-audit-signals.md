# Maintainability Audit Signals

Use this reference from `workflows/maintainability-audit.md` when reviewing
whether existing code is organized so a human can maintain it after AI-generated
work lands.

The goal is not to force patterns. The goal is to reduce tedious mental mapping
by making code easier to locate, understand, reuse, test, and change in
isolation.

## Strong Signals To Audit

### Code Stuffed Into One File

Flag a file when it owns several unrelated concerns such as:

- user interaction or routing
- state mutation
- data access or transport calls
- validation
- formatting
- rendering
- persistence
- side effects
- domain rules
- tests or fixtures embedded beside production behavior

Recommend splitting only when the current file makes future work harder to
locate or change.

### No Centered Owner

Flag code when behavior for one centered thing is scattered across unrelated
places.

The centered thing may be a:

- feature
- entity
- model
- domain
- route
- page
- command
- service
- workflow
- component
- state object

Recommend moving code toward the centered thing when doing so makes ownership
and future edits easier to predict.

### Unclear Export Homes

Flag exportable code when it is hard to tell where future changes should go.

Preferred shape:

- meaningful exported classes usually get their own files
- file names follow the project convention
- if no convention is clear, prefer the class name as the file name
- small exportable functions, constants, and utilities live in nearby helper
  modules scoped to the relevant feature, entity, model, or domain

Do not imply one naming style across all projects. Respect existing conventions
such as class-name files, kebab-case files, snake_case files, or extension
choices.

### Helper Dumping Grounds

Flag helper files that mix unrelated utilities from different areas.

Better alternatives:

- move feature-specific helpers near the feature
- move model-specific helpers near the model
- move domain-specific constants near the domain
- keep a shared helper module only for truly cross-cutting utilities

### Hidden Workflow Coupling

Flag code when a caller must understand unrelated internals to use or change a
module.

Examples:

- an entry point has to know the details of several unrelated subsystems
- a public function requires callers to construct internal state manually
- tests must mock deep internals because no stable boundary exists
- a small change in one feature forces edits in unrelated files

Recommend a clearer boundary only when it reduces coupling rather than merely
renaming it.

### Over-Splitting

Do not recommend splitting when:

- the file is small and cohesive
- behavior is private to one local flow
- a split would create thin files with no meaningful ownership
- the project already has a local convention that intentionally keeps this
  code together
- the new structure would make readers jump between files without reducing
  complexity

Maintainability can mean keeping code together when it has one clear owner.

## Recommendation Heuristics

When proposing a restructuring, prefer the smallest move that improves
findability.

Good recommendations answer:

- Where would a human naturally look for this behavior?
- What centered thing owns this code?
- Which file should become thinner?
- Which new or existing file would receive the moved behavior?
- What imports, tests, or public calls prove the move preserved behavior?
- What should stay in place because moving it would add ceremony?

Avoid recommendations that only say:

- "follow existing patterns"
- "separate concerns"
- "use better abstractions"
- "clean this up"

Name the responsibility that should move and the reason it should have a more
predictable home.
