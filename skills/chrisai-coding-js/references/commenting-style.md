# JavaScript Commenting Style

Use this reference on the final style pass when the code already works and the
remaining job is to make the author's voice visible in the file.

## Core Rules

- Comments are expected by default.
- Minimum comment density is per logical block.
- Increase comment density toward line-by-line when the logic branches, carries
  state, or hides assumptions.
- Story-style comments are welcome, but they should still stay local to the
  code they narrate.
- When a control-flow step spans multiple lines, prefer separate comments for
  the condition and the consequence.
- When a control-flow step fits cleanly on one line, one combined comment is
  acceptable.
- The first line of a `//` comment block has no space after `//`.
- For single-sentence inline comments, start with lowercase after `//` and do
  not end with a period.
- For multi-sentence inline comments, sentence casing and punctuation are fine.
- Continuation lines in the same wrapped comment block do have a space after
  `//`.
- Do not leave commented-out code behind.

## Conditionals

```js
//if article has a pokemon
if (articleHasPokemon()) {
  //then extract a pokemon
  const pokemon = articleExtractPokemon();
}

//if article does not have a pokemon, then add a pokemon
if (!hasPokemon(article)) addPokemon(article);
```

## Loops

```js
//for each article
for (const article of articles) {
  //if article has a pokemon
  if (articleHasPokemon(article)) {
    //then save the pokemon name
    names.push(articleExtractPokemon(article));
  }
}

//for each article, collect the pokemon name
for (const article of articles) names.push(articleExtractPokemon(article));
```

## Inline And Multi-Line Callbacks

```js
//for each article, return the pokemon name
const names = articles.map(article => article.name);

const names = articles.map(article => {
  //if article has a pokemon
  if (articleHasPokemon(article)) {
    //then return the pokemon name
    return articleExtractPokemon(article);
  }

  //otherwise return unknown
  return 'unknown';
});
```

## Ternaries

```js
//if the column is a string, then use string
const type = columnType === 'String' ? 'string' : 'unknown';

//if column type is string
const type = columnType === 'String'
  //then string
  ? 'string'
  //if column type is strings
  : columnType === 'Strings'
  //then string array
  ? 'string[]'
  //otherwise unknown
  : 'unknown';
```

## Wrapped Comments

```js
//from here we can assume that it is okay to
// continue with processing the routes
// and try to trigger the route
```
