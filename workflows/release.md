# Release

Use this workflow when publishing, preparing, or reasoning about a ChrisAI
release. A publish flow means any operation that pushes, tags, or publishes a
GitHub skill release.

## Permission Boundary

When the user asks to publish a release, prefer handling the full local and
GitHub workflow after confirming they want an actual publish flow.

Do not leave release work as instructions for the user unless authentication,
permissions, or an explicit user preference blocks automation.

If the user is discussing release planning, sequencing, or a possible release,
do not assume permission to publish. Ask for explicit confirmation before
remote publication actions such as pushing, tagging, or publishing a GitHub
skill release.

Local commits are fine when they are part of the requested task or the accepted
release-prep work. Do not treat a local commit by itself as a publish action.

## Preflight

Before creating a release, confirm that `VERSION`, `package.json`,
`CHANGELOG.md`, validation status, branch, latest remote release, remote tags,
and remote state match the intended release.

Use remote state when deciding whether a release version is available. Do not
rely on local tags alone because the checkout may not have fetched every remote
tag.

Prefer these remote checks when GitHub and the remote are available:

```bash
gh release list
git ls-remote --tags origin 'v*'
```

Use `gh skill publish --tag v<TAG>` as the release publication command. Do not
use `gh release create` for normal ChrisAI skill publishing.

## Publish Sequence

After publish confirmation:

1. Pre-test locally with validation, tests, package checks, and a temporary
   install target when the installer changed.
2. Check remote release and tag state before deciding the release version.
3. Choose the release version from the remote state.
4. Update release metadata such as `VERSION`, `package.json`, and
   `CHANGELOG.md` so all three match the intended release version.
5. Commit and push the release changes.
6. Pre-test from GitHub using `#main` into a temporary target before tagging.
7. Publish the skill release:

   ```bash
   gh skill publish --tag v<TAG>
   ```

   Replace `v<TAG>` with the intended semver tag, such as `v0.2.5`. If the
   command prompts for tagging strategy, choose the semver tag that matches the
   checked-in `VERSION`, `package.json`, and `CHANGELOG.md`.

   If GitHub returns `HTTP 404` while enabling immutable releases, continue
   only if the publish itself succeeds. Report that immutable releases must be
   enabled manually in GitHub repository settings under Settings > General >
   Releases.
8. Install the tagged release into the user's requested local agent target and
   verify preserved local overlays or unrelated skills.

## Version Decision

If `VERSION` and `package.json` point to a version that already has a remote
release or remote tag, bump to the next appropriate semver version, usually the
next patch version for skill and documentation changes.

If the intended version has no remote release or tag, keep it and confirm it
matches the changelog.

Never move or overwrite an existing remote release tag unless the user
explicitly asks for tag repair and understands the risk.
