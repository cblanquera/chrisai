# TLD Finder Script

Use `scripts/tld-finder.py` when the user wants to bulk-check domain and TLD
combinations using public RDAP data.

RDAP is a registration lookup signal, not a registrar purchase API. Treat
`possibly_available` as a research result that still needs registrar
confirmation before purchase.

## Inputs

Use fully qualified domains:

```bash
python3 skills/chrisai-branding/scripts/tld-finder.py \
  --domains example.com,example.ai \
  --format md
```

Or combine second-level names with TLDs:

```bash
python3 skills/chrisai-branding/scripts/tld-finder.py \
  --names mybrand,getmybrand \
  --tlds com,ai,io,dev \
  --format csv \
  --out /tmp/domain-checks.csv
```

Use files for larger lists:

```bash
python3 skills/chrisai-branding/scripts/tld-finder.py \
  --names-file /tmp/names.txt \
  --tlds-file /tmp/tlds.txt \
  --workers 4 \
  --format json
```

## Output Statuses

- `registered`: RDAP returned a domain record.
- `possibly_available`: RDAP returned not found.
- `inconclusive`: RDAP bootstrap, server lookup, timeout, rate limit, or
  request behavior did not prove a result.

## Operating Rules

- Do not report RDAP `404` as definitely available.
- Keep concurrency modest because RDAP services rate-limit differently.
- For purchase decisions, verify shortlisted names with the registrar the user
  plans to use.
- Do not treat domain availability as trademark, corporate-name, or social
  handle clearance.
