# Monochrome Lucide Icon Inventory

The icon library is an intentionally small, dependency-free inventory of
[Lucide 1.27.0](https://github.com/lucide-icons/lucide/releases/tag/1.27.0)
SVG geometry. Its default contract is one foreground color plus negative space:
24×24 view boxes, 2-unit round strokes, no fill, and `currentColor`. Use icons
only when they make controls easier to scan.

Public names stay stable for wireframe compatibility. These local names map to
differently named Lucide masters: `add` → `plus`, `alert` → `triangle-alert`,
`close` → `x`, `edit` → `pencil`, `filter` → `funnel`, `grip` →
`grip-vertical`, `home` → `house`, `more` → `ellipsis`, `trash` → `trash-2`,
`undo` → `undo-2`, and `redo` → `redo-2`. All other names match their Lucide
source name.

## Names

- `add`
- `alert`
- `arrow-left`
- `arrow-right`
- `bell`
- `bold`
- `calendar`
- `check`
- `chevron-down`
- `chevron-left`
- `chevron-right`
- `chevron-up`
- `close`
- `clock`
- `copy`
- `download`
- `edit`
- `eye`
- `eye-off`
- `filter`
- `file`
- `folder`
- `grip`
- `home`
- `info`
- `italic`
- `link`
- `list`
- `list-ordered`
- `menu`
- `minus`
- `more`
- `search`
- `settings`
- `star`
- `trash`
- `upload`
- `underline`
- `undo`
- `redo`
- `user`

Use `icons.js` to render icons into elements with `data-wf-icon="name"` or call
`window.WireframeIcons.svg("name")`. Unknown names emit a console warning and
render nothing rather than silently substituting a misleading symbol.

Country flag emoji remain text content, and diagram connectors, ports, resize
handles, and switch geometry remain component primitives rather than registry
icons.
