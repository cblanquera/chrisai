# Revision Workflow

Use this reference when creating or updating project-root wireframe revisions.

## Contents

- [Target Folder](#target-folder)
- [Revision Numbering](#revision-numbering)
- [When To Create A New Revision](#when-to-create-a-new-revision)
- [Copy-Forward Rules](#copy-forward-rules)
- [Required Files](#required-files)

## Target Folder

Create wireframes under the target project root:

```text
wireframes/
  r001-meta-title/
    specs.md
    notes.md
    workflows.html
```

Do not create wireframes under `.agents/`. The `.agents` folder may contain planning or operating instructions, but rendered wireframes are project artifacts.

## Revision Numbering

- Use exactly `r001`, `r002`, `r003`, and so on.
- Determine the next number by listing existing `wireframes/r[0-9][0-9][0-9]-*/` folders.
- If no prior revision exists, use `r001`.
- If prior revisions exist, use the next highest number unless the user asks to edit a specific revision.
- Use a short lowercase hyphenated `meta-title` that describes the wireframe scope, such as `checkout-flow`, `admin-dashboard`, or `onboarding`.

## When To Create A New Revision

A review round is one feedback cycle within a revision. A revision is a major
folder-level artifact version. Minor feedback creates a new entry in the
current revision's `notes.md`; it does not create a new folder.

Create a new revision when:

- The user explicitly asks for a new revision.
- Scope changes materially.
- The screen inventory changes materially.
- The layout system or navigation model changes materially.
- Interaction behavior or state management changes materially.
- The previous revision is already approved or should remain available for comparison.

Update the current revision when:

- Fixing a small visual defect.
- Repairing a broken link or interaction.
- Filling a small omission that does not change the intended flow.
- The user asks to continue the same draft.

When in doubt, preserve the previous revision and create the next numbered folder.

## Copy-Forward Rules

For `r002` and later:

1. Copy the previous revision's `specs.md` into the new revision first.
2. Update the copied spec to explain the new revision intent, source changes, changed screens, changed components, and changed interactions.
3. Use prior HTML/CSS/JS as reference material, but copy only files that remain used by the updated spec.
4. Do not blindly copy a prior `lib/` folder. Include only the library files needed by the current revision.
5. Keep document-relative links working after files move.

For `r001`, create `specs.md` directly from source documents, user instructions, and current project truth.

## Required Files

Every revision must include:

- `specs.md`: complete enough for another agent to rebuild the revision without chat history.
- `notes.md`: the review-round log for changes made within this revision.
- `workflows.html`: a separate starting-points page for user workflows.
- One HTML file per screen unless the user requests a single page app.
- CSS and JS files needed by the implemented pages.

Use a folder structure that fits the revision. A typical structure is:

```text
wireframes/r001-meta-title/
  specs.md
  notes.md
  workflows.html
  pages/
    dashboard.html
    settings.html
  lib/
    base/
      tokens.css
      reset.css
      base.css
    layouts/
      panel-layout.css
      panel-layout.js
    components/
      buttons.css
      dialog.css
      dialog.js
    icons/
      icons.css
      icons.js
    utilities/
      state.js
      interactions.js
```

This mirrors the bundled library structure, but the revision should include
only the selected files. Do not create empty folders or unused files just to
match this example.
