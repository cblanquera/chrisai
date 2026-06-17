# JavaScript Module Systems

Use this reference when the main JavaScript decision is about `.js`, `.mjs`,
`.cjs`, ESM, CommonJS, or interop.

## Discovery Order

Check module mode in this order:

1. the file extension
2. nearby sibling files
3. `package.json`
4. the package's current import or require style

Do not assume plain `.js` means ESM or CommonJS without checking local context.

## `.mjs`

- Treat `.mjs` as ESM.
- Use `import` and `export`.
- Preserve explicit local file extensions when the package already uses them.
- Prefer `node:` prefixes for Node builtins when the local pattern is unclear.

```js
//node
import { readFile } from 'node:fs/promises';

//modules
import matter from 'gray-matter';

//client
import { normalizePost } from './normalize-post.js';
```

## `.cjs`

- Treat `.cjs` as CommonJS.
- Use `require()` and `module.exports` or `exports.name`.
- Keep the file in CommonJS unless the task is explicitly about migration.
- Preserve the local export shape used by nearby files.

```js
const fs = require('node:fs');
const matter = require('gray-matter');

function normalizePost(post) {
  return post.trim();
}

module.exports = {
  normalizePost
};
```

## Plain `.js`

- Inspect `package.json` before changing syntax.
- If the package uses `"type": "module"`, prefer ESM unless nearby files prove
  otherwise.
- If the package does not use `"type": "module"`, inspect nearby files before
  assuming CommonJS.
- Preserve the established local style when the package mixes historical files.

## Interop Rules

- Do not convert module systems unless the user asks.
- Do not mix `import` and `require()` casually inside the same file.
- When interop is unavoidable, use the smallest change that matches the package
  runtime.
- Keep export syntax consistent within the file.
- If a migration would ripple through many files, stop and make that boundary
  explicit instead of partially converting one file.
