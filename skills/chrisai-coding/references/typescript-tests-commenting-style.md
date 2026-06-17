# Test Commenting Style

Use this reference on the final style pass when the tests already work and the
remaining job is to make the author's voice visible in the file.

## Core Rules

- Comments are expected by default.
- Minimum comment density is per logical block.
- Increase comment density toward line-by-line when the test branches, carries
  state, or hides why the scenario matters.
- Story-style comments are welcome, but they should stay local to the setup,
  action, or assertion they narrate.
- When a control-flow step spans multiple lines, prefer separate comments for
  the condition and the consequence.
- When a control-flow step fits cleanly on one line, one combined comment is
  acceptable.
- The first line of a `//` comment block has no space after `//`.
- Continuation lines in the same wrapped comment block do have a space after
  `//`.

## Setup And Assertions

```ts
//build a valid user first
const user = makeUser();

//if the email is missing
user.email = '';

//then the validator should reject the user
expect(validateUser(user).ok).to.equal(false);
```

## Callbacks And Ternaries

```ts
//for each invalid email, return the observed result
const results = emails.map(email => validateUser(makeUser({ email })));

//if the retry should happen, then expect one retry
const expected = shouldRetry ? 1 : 0;
```
