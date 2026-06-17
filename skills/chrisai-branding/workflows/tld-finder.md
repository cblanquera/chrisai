# TLD Finder

Use this workflow when the main problem is finding, comparing, or
shortlisting top-level domains for a brand, product, project, campaign, or
company name.

This workflow produces domain research signals. It does not guarantee purchase
availability, trademark clearance, corporate-name clearance, or social-handle
availability.

## Ownership

This workflow owns:

- domain and TLD intake
- bulk RDAP checks
- interpreting `registered`, `possibly_available`, and `inconclusive` results
- shortlisting domain options for naming work
- routing adjacent platform-name checks

This workflow does not own:

- trademark or legal clearance
- registrar purchase decisions
- final brand naming decisions
- GitHub, npm, or X availability checks beyond routing to the bundled scripts

## Workflow

Work through these steps in order:

1. Clarify names and TLDs.
2. Choose lookup mode.
3. Run RDAP checks when requested and network access is available.
4. Interpret results conservatively.
5. Hand off adjacent checks when needed.

## Step 1: Clarify Names And TLDs

Capture or infer:

- exact names or second-level domain candidates
- TLD list, such as `.com`, `.ai`, `.io`, `.dev`, `.app`, or regional TLDs
- whether the user already has fully qualified domains
- desired output format: markdown, JSON, CSV, or saved file
- whether social/platform names also matter

When the user has no TLD preference, suggest a small, relevant set instead of
checking every possible TLD.

## Step 2: Choose Lookup Mode

Use `scripts/tld-finder.py` for dependency-free RDAP checks.

Use fully qualified domains:

```bash
python3 skills/chrisai-branding/scripts/tld-finder.py \
  --domains example.com,example.ai \
  --format md
```

Or combine names and TLDs:

```bash
python3 skills/chrisai-branding/scripts/tld-finder.py \
  --names mybrand,getmybrand \
  --tlds com,ai,io,dev \
  --format csv
```

Use `references/tld-finder.md` for detailed command examples and status
interpretation.

## Step 3: Run Checks

If live network access is available and the user wants current results, run
the script. Keep concurrency modest because RDAP services rate-limit
differently.

If network access is unavailable or blocked, state that live checks were not
run and provide the command to run in an unrestricted environment.

## Step 4: Interpret Conservatively

Use these statuses:

- `registered`: RDAP returned a domain record.
- `possibly_available`: RDAP returned not found.
- `inconclusive`: RDAP bootstrap, server lookup, timeout, rate limit, or
  request behavior did not prove a result.

Do not report RDAP `404` as definitely available. For purchase decisions,
verify shortlisted names with the registrar the user plans to use.

## Step 5: Handoff

End with the next useful step:

- use `scripts/github-name-check.py` for GitHub name checks
- use `scripts/npm-org-check.py` for npm org/scope checks
- use `scripts/x-name-check.py` for X handle checks
- use `workflows/brand-strategy.md` or `workflows/brand-messaging.md` when the
  domain shortlist should influence naming or positioning
