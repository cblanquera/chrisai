# GitHub Name Check Script

Use `scripts/github-name-check.py` when the user wants to bulk-check GitHub
account or organization name candidates.

The script uses GitHub's public users API. A `404` response means GitHub did
not return a public account for that name; it does not guarantee the name can
be claimed because GitHub can reserve or restrict names.

## Usage

```bash
python3 skills/chrisai-branding/scripts/github-name-check.py \
  --names github,mybrand,mybrandhq \
  --format md
```

Use a file for larger candidate sets:

```bash
python3 skills/chrisai-branding/scripts/github-name-check.py \
  --names-file /tmp/github-names.txt \
  --workers 4 \
  --format json \
  --out /tmp/github-name-checks.json
```

## Valid Names

The script accepts conservative GitHub-style account names:

- 1 to 39 characters
- letters, numbers, and hyphens
- no leading or trailing hyphen

## Output Statuses

- `taken`: GitHub returned an existing account.
- `possibly_available`: GitHub returned not found.
- `inconclusive`: request failed, was rate-limited, or returned an unexpected
  status.

## Operating Rules

- Treat `possibly_available` as a shortlist signal only.
- Verify final choices in GitHub signup or organization creation.
- Do not treat GitHub name availability as domain, trademark, npm, or social
  handle availability.
