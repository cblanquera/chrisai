# Layouts

The renderer supports a fixed set of layouts. Layouts change page rhythm,
spacing, density, and component emphasis. They do not change Markdown semantics.

## `article`

Use for long-form written material:

- explanatory responses
- tutorials
- design notes
- architecture discussions

Characteristics:

- centered reading column
- generous line height
- prominent `h1`
- calm section spacing

## `brief`

Use for short decision-oriented documents:

- summaries
- recommendations
- meeting follow-ups
- release notes

Characteristics:

- compact width
- stronger lead paragraph
- tighter sections
- callouts receive extra emphasis

## `report`

Use for structured review material:

- code review reports
- audit findings
- implementation status
- tradeoff analysis

Characteristics:

- broader content column
- tables and lists get stronger framing
- code and diffs remain readable
- headings are optimized for scanning

## `dashboard`

Use for scannable status or comparison material:

- metrics summaries
- project snapshots
- option comparisons
- status reports

Characteristics:

- wider page
- sections may form responsive panels
- tables and task lists receive compact treatment
- best for shorter sections

## Selection Rule

Default to `report` when the output mixes findings, tables, code, and
recommendations.

Default to `article` when the output is primarily prose.
