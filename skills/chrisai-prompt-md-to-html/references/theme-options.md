# Theme Options

The renderer accepts a small validated theme surface.

## Allowed Options

- `--theme light|dark|auto`
- `--accent #RRGGBB`
- `--background #RRGGBB`
- `--text #RRGGBB`
- `--density comfortable|compact`
- `--title "Artifact Title"`

## Color Rules

Only six-digit hex colors are accepted.

Valid:

```text
#2563eb
#0f172a
#ffffff
```

Invalid:

```text
blue
rgb(0, 0, 255)
var(--brand)
url(...)
```

If the user gives an invalid color, choose the nearest safe default and mention
the fallback.

## Theme Defaults

`auto` is the default theme. It uses light colors by default and includes a
dark-mode media query.

Use custom `background` and `text` only when the user requests them. Otherwise
set only `accent`.

## Density

Use `comfortable` by default.

Use `compact` for dashboards, status summaries, and reports with many tables or
short sections.
