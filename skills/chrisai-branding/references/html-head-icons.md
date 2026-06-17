# Favicon Vs PNG Icons In HTML Head

Use favicon and PNG icons for different jobs.

## Rule

- treat only `16x16` as favicon output in this workflow
- treat larger assets as PNG icons
- wire PNG icons in the HTML head with explicit `type="image/png"` links

## Typical Pattern

```html
<link rel="icon" href="/favicon.ico" sizes="16x16">
<link rel="icon" type="image/png" href="/icon-32.png">
<link rel="icon" type="image/png" href="/icon-180.png">
```

## Why

- favicon is the browser-tab fallback and should stay minimal
- larger icons are better handled as standalone PNG assets
- separating them avoids pretending every icon size belongs in favicon
