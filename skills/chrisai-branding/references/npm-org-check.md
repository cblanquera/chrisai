# npm Org Check Script

Use `scripts/npm-org-check.py` when the user wants to bulk-check npm
organization or package-scope name candidates.

The script checks npm's public organization page first. If that page is blocked
or rate-limited, it tries npm registry search as a secondary signal for public
packages under the scope.

## Usage

```bash
python3 skills/chrisai-branding/scripts/npm-org-check.py \
  --names angular,mybrand,mybrandhq \
  --format md
```

Use a file for larger candidate sets:

```bash
python3 skills/chrisai-branding/scripts/npm-org-check.py \
  --names-file /tmp/npm-orgs.txt \
  --workers 3 \
  --format csv \
  --out /tmp/npm-org-checks.csv
```

## Valid Names

The script accepts a conservative npm org/scope format:

- lowercase letters, numbers, and hyphens
- no leading or trailing hyphen
- optional leading `@` is stripped before checking

## Output Statuses

- `taken`: npm returned an org page or registry search proved public packages
  under the scope.
- `possibly_available`: npm returned not found for the org page.
- `inconclusive`: npm blocked the request, rate-limited the request, or the
  fallback did not prove ownership.

## Operating Rules

- Treat `possibly_available` as a shortlist signal only.
- Verify final choices in npm organization creation.
- Some taken scopes may not expose public packages, so blocked org-page checks
  can remain inconclusive.
