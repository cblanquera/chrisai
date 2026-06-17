# Logo Analysis

Use this reference when an existing SVG or PNG logo should be inspected for
objective evidence before generating, refining, or documenting brand assets.

## Script

Use `scripts/analyze-logo.py` for local SVG or PNG files:

```bash
python3 skills/chrisai-branding/scripts/analyze-logo.py path/to/logo.svg
```

Save JSON output when useful:

```bash
python3 skills/chrisai-branding/scripts/analyze-logo.py \
  path/to/logo.png \
  --out /tmp/logo-analysis.json
```

The script supports SVG and PNG files only.

## Useful Outputs

- file format
- width, height, and aspect-ratio hints
- transparency signal
- dominant sampled colors
- SVG viewBox
- SVG shape counts
- gradient count
- flat, gradient, square, wide, or tall treatment hints
- JSON summary for repeatable review

## Use Cases

Use logo analysis when:

- an existing logo should inform brand visual guidelines
- a logo needs a favicon-safe or simplified variant
- the agent needs objective color or geometry evidence
- the user provides a logo but no formal brand guide
- a brand kit should cite existing logo facts instead of guessing

## Limits

The script extracts measurable evidence. It does not decide the final design
direction, prove originality, evaluate trademark risk, or replace visual
judgment.

Treat findings as inputs to:

- `workflows/logo-generation.md`
- `workflows/brand-visual-guidelines.md`
- `workflows/brand-kit-generation.md`
- `references/svg-readiness.md`
- `references/png-transparency-validation.md`
