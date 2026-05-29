---
name: local-environment
description: Use as a personal, machine-local overlay for executable paths, runtime preferences, verification commands, and other host-specific notes that should not be committed to shared project repositories.
---

# Local Environment

Use this skill to describe runtime and executable preferences that are true on
this computer but should not become shared repo instructions.

This file is a template. Copy it to the agent's local skills directory, then
customize the installed copy for the machine.

## Purpose

Record host-specific details such as:

- preferred `node`, `npm`, `yarn`, `pnpm`, or `bun` paths
- preferred `python`, `pip`, `uv`, or virtualenv paths
- preferred `rustup`, `cargo`, or Rust toolchain paths
- browser or Playwright-related executable paths
- helper CLI locations
- commands that verify a resolved executable is correct
- notes about commands that only apply in specific local workspaces

Keep this skill open-ended. Add only details that help resolve commands on
this machine.

## Suggested Sections

Use any sections that help:

- Runtimes
- Package Managers
- Python
- Rust
- Browser Tooling
- Other Executables
- Verification Commands
- Workspace Notes

## Recording New Discoveries

When a task discovers a command or executable path that works and is likely to
be useful later, record:

- the command or absolute executable path
- when to prefer it
- a short verification command when available
- any workspace or project constraints

Do not record secrets, credentials, tokens, private URLs, or one-off temporary
commands.

## Example Entries

Replace these examples with real machine-local values:

```markdown
## Runtimes

- Node.js: `/absolute/path/to/node`
  - Use when project scripts require the preferred local Node runtime.
  - Verify with `/absolute/path/to/node --version`.

## Package Managers

- Yarn: `/absolute/path/to/yarn`
  - Use for repos that have `yarn.lock`.
  - Verify with `/absolute/path/to/yarn --version`.

## Python

- Python: `/absolute/path/to/python3`
  - Use for repository maintenance scripts unless a project virtualenv is
    active.
  - Verify with `/absolute/path/to/python3 --version`.

## Rust

- Cargo: `/absolute/path/to/cargo`
  - Use for Rust projects when `cargo` is not found on PATH.
  - Verify with `/absolute/path/to/cargo --version`.
```
