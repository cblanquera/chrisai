# X Name Check Script

Use `scripts/x-name-check.py` when the user wants to bulk-check X/Twitter
handle candidates.

The script uses `X_BEARER_TOKEN` when that environment variable is set. Without
that token, it falls back to public profile URL checks, which are lower
confidence because X web responses can be blocked, redirected, or rate-limited.

## Usage Without API Token

```bash
python3 skills/chrisai-branding/scripts/x-name-check.py \
  --names x,mybrand,mybrandhq \
  --format md
```

## Usage With API Token

```bash
export X_BEARER_TOKEN="..."

python3 skills/chrisai-branding/scripts/x-name-check.py \
  --names mybrand,mybrandhq \
  --format json \
  --out /tmp/x-name-checks.json
```

## Valid Handles

The script accepts X/Twitter-style handles:

- 1 to 15 characters
- letters, numbers, and underscores
- optional leading `@` is stripped before checking

## Output Statuses

- `taken`: X API returned a user, or the public profile URL returned OK.
- `possibly_available`: X API or public profile URL returned not found.
- `inconclusive`: request failed, authentication failed, was rate-limited, or
  returned an unexpected status.

## Operating Rules

- Prefer the API-token path for higher-confidence checks.
- Treat no-token public profile checks as best-effort.
- Verify final choices during X signup or handle change because handles can be
  reserved, restricted, or unavailable despite lookup results.
