# Wireframing Library Inventory

Use this inventory to select source files from
[`../assets/wireframes/lib/`](../assets/wireframes/lib/).
Copy only files used by the current revision's `specs.md`. Do not copy
`samples/` into target project wireframes unless the user explicitly asks for
review samples.

HTML files beside component and layout CSS are canonical, copyable markup.
Adapt their content, IDs, links, and initial state to the revision. Sample HTML
files are complete review pages and are not source templates.

## Base

| Item | Source files | Sample | Dependencies | Copy when |
| --- | --- | --- | --- | --- |
| Tokens | `base/tokens.css` | `samples/index.html` | none | Any library CSS is copied. |
| Reset | `base/reset.css` | `samples/index.html` | `tokens.css` | Starting a standalone wireframe revision. |
| Base CSS | `base/base.css` | `samples/index.html` | `tokens.css`, `reset.css` | Any page uses library styles. |

## Layouts

| Item | Source files | Sample | Dependencies | Copy when |
| --- | --- | --- | --- | --- |
| Blank page | `layouts/blank-page.html`, `layouts/blank-page.css` | `samples/layouts/blank-page.html` | base files, buttons, icons | A page needs simple centered or stacked content. |
| Panel layout | `layouts/panel-layout.html`, `layouts/panel-layout.css`, `layouts/panel-layout.js` | `samples/layouts/panel-layout.html` | base files, buttons, icons, interactions | A screen uses absolute-positioned left, right, header, and scrollable center regions. |
| Resizable panel variant | `layouts/panel-layout-resizable.html`, `layouts/panel-layout.css`, `layouts/panel-layout.js` | `samples/layouts/panel-layout.html` | base files, buttons, icons, interactions | A wireframe needs horizontally resizable left and right panels across screen sizes. |
| Panel detail stack | `layouts/panel-detail-stack.html`, `layouts/panel-detail-stack.css`, `layouts/panel-detail-stack.js` | `samples/layouts/panel-detail-stack.html` | base files, panel layout, buttons, forms, icons, interactions | A contextual right panel needs root replacement, selected-source toggle closure, different-source replacement, nested detail screens, back navigation, and submit-and-return behavior. |
| Grid system | `layouts/grid-system.html`, `layouts/grid-system.css` | `samples/layouts/grid-system.html` | base files | A screen needs responsive columns or dashboard grids. |
| Mobile shell | `layouts/mobile-shell.html`, `layouts/mobile-shell.css` | `samples/layouts/mobile-shell.html` | base files, buttons, icons | A portrait native-style mobile prototype needs a viewport-filling app bar and scrollable screen. |
| Mobile shell tabs variant | `layouts/mobile-shell-tabs.html`, `layouts/mobile-shell.css` | `samples/layouts/mobile-shell.html` | base files, buttons, icons | A portrait mobile prototype needs persistent bottom tab navigation. |
| Mobile shell drawer variant | `layouts/mobile-shell-drawer.html`, `layouts/mobile-shell.css`, `layouts/mobile-shell.js` | `samples/layouts/mobile-shell.html` | base files, buttons, icons, interactions | A portrait mobile prototype needs overlay navigation that slides from the left. |
| Mobile shell interactions | `layouts/mobile-shell.js` | `samples/layouts/mobile-shell.html` | mobile shell CSS, interactions | A mobile prototype needs screen-stack transitions, root tab changes, or an optional slide-in drawer. |

## Icons

| Item | Source files | Sample | Dependencies | Copy when |
| --- | --- | --- | --- | --- |
| Lucide icons | `icons/icons.css`, `icons/icons.js`, `icons/inventory.md` | `samples/index.html` | base files | UI controls need familiar grayscale icons. |

## Components

| Item | Source files | Sample | Dependencies | Copy when |
| --- | --- | --- | --- | --- |
| Accordion | `components/accordion.html`, `components/accordion.css`, `components/accordion.js` | `samples/components/accordion.html` | base files, icons | Content expands or collapses in sections. |
| Alert | `components/alert.html`, `components/alert.css` | `samples/components/alert.html` | base files | Inline status, warning, error, empty, or success messaging is needed. |
| Badge | `components/badge.html`, `components/badge.css` | `samples/components/badge.html` | base files | Compact labels, counts, or status markers are needed. |
| Breadcrumbs | `components/breadcrumbs.html`, `components/breadcrumbs.css` | `samples/components/breadcrumbs.html` | base files, icons | A screen needs hierarchy or back-path context. |
| Buttons | `components/buttons.html`, `components/buttons.css` | `samples/components/buttons.html` | base files | Any page uses actions, icon buttons, or button groups. |
| Cards | `components/cards.html`, `components/cards.css` | `samples/components/cards.html` | base files, buttons, badges | Repeated content blocks or summary panels are needed. |
| Carousel | `components/carousel.html`, `components/carousel.css`, `components/carousel.js` | `samples/components/carousel.html` | base files, icons, buttons | A revision explicitly needs slide navigation. |
| Dialog | `components/dialog.html`, `components/dialog.css`, `components/dialog.js` | `samples/components/dialog.html` | base files, icons, buttons | Modal confirmation, create/edit, or blocking decision flows are needed. |
| Bottom sheet dialog | `components/dialog-sheet-bottom.html`, `components/dialog.css`, `components/dialog.js` | `samples/layouts/mobile-shell.html` | base files, icons, buttons | A mobile flow needs contextual actions or short forms that slide up from the bottom. |
| Top sheet dialog | `components/dialog-sheet-top.html`, `components/dialog.css`, `components/dialog.js` | `samples/layouts/mobile-shell.html` | base files, icons, buttons | A mobile flow needs notifications or compact content that slides down from the top. |
| Dropdown/popover | `components/dropdown.html`, `components/dropdown.css`, `components/dropdown.js` | `samples/components/dropdown-popover.html` | base files, icons, buttons | Menus, popovers, or contextual command panels are needed. |
| Forms | `components/forms.html`, `components/forms.css` | `samples/components/forms.html` | base files, buttons | Inputs, selects, textareas, validation, or field groups are needed. |
| Switch | `components/switch.html`, `components/switch.css` | `samples/components/switch.html` | base files | A binary setting needs an explicit on/off control. |
| Phone field | `components/phone-field.html`, `components/phone-field.css` | `samples/components/phone-field.html` | base files, forms | A phone number needs a flag and calling-code selector. |
| Country dropdown | `components/country-select.html`, `components/country-select.css` | `samples/components/country-select.html` | base files, forms | A form needs a compact country selector with native flag emoji. |
| Password field | `components/password-field.html`, `components/password-field.css`, `components/password-field.js` | `samples/components/password-field.html` | base files, forms, buttons, icons, interactions | A password input needs a mask reveal control. |
| Five star rating | `components/rating.html`, `components/rating.css`, `components/rating.js` | `samples/components/rating.html` | base files, forms, icons, interactions | A workflow needs an interactive one-to-five rating. |
| Range slider | `components/range-slider.html`, `components/range-slider.css`, `components/range-slider.js` | `samples/components/range-slider.html` | base files, forms, interactions | A numeric setting is best expressed as a bounded range. |
| Tags input | `components/tags-input.html`, `components/tags-input.css`, `components/tags-input.js` | `samples/components/tags-input.html` | base files, forms, icons, interactions | A form accepts multiple removable short labels. |
| Date and time fields | `components/date-time-field.html`, `components/date-time-field.css`, `components/date-time-field.js` | `samples/components/date-time-field.html` | base files, forms, buttons, icons, interactions | A form needs date, time, or combined date-time picker affordances. |
| Date range picker | `components/date-range-picker.html`, `components/date-range-picker.css`, `components/date-range-picker.js` | `samples/components/date-range-picker.html` | base files, forms, buttons, icons, interactions | A workflow needs a start and end date selected from one calendar popover. |
| WYSIWYG editor | `components/wysiwyg.html`, `components/wysiwyg.css`, `components/wysiwyg.js` | `samples/components/wysiwyg.html` | base files, forms, icons, interactions | Rich text structure and formatting controls need to be expressed in a prototype. |
| Hero | `components/hero.html`, `components/hero.css` | `samples/components/hero.html` | base files, buttons | A product or onboarding screen needs a clear lead area. |
| Loader | `components/loader.html`, `components/loader.css` | `samples/components/loader.html` | base files | Loading, skeleton, or progress states are needed. |
| Notifier | `components/notifier.html`, `components/notifier.css`, `components/notifier.js` | `samples/components/notifier.html` | base files, icons, buttons | Toasts or notification stacks are needed. |
| Pagination | `components/pagination.html`, `components/pagination.css` | `samples/components/pagination.html` | base files, icons | Lists or tables need page navigation. |
| Table | `components/table.html`, `components/table.css` | `samples/components/table.html` | base files, badges | Structured row data is needed. |
| Tabs | `components/tabs.html`, `components/tabs.css`, `components/tabs.js` | `samples/components/tabs.html` | base files | A view switches between panels without changing pages. |
| Tree | `components/tree.html`, `components/tree.css`, `components/tree.js` | `samples/components/tree.html` | base files, icons | Nested navigation, file trees, or hierarchical records are needed. |
| Tooltip | `components/tooltip.html`, `components/tooltip.css`, `components/tooltip.js` | `samples/components/tooltip.html` | base files, buttons | Small hover or focus help is needed. |

## Utilities

| Item | Source files | Sample | Dependencies | Copy when |
| --- | --- | --- | --- | --- |
| State helpers | `utilities/state.js` | component samples | none | Shared state toggles or class-state helpers are useful across pages. |
| Templates | `utilities/templates.js` | component samples | none | Repeated static markup benefits from tiny HTML template helpers. |
| Interactions | `utilities/interactions.js` | component samples | component JS files as used | A page includes several component initializers and needs one bootstrap call. |
