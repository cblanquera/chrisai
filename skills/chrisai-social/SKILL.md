---
name: chrisai-social
description: Use when creating or improving articles, social posts, X/Twitter posts and threads, LinkedIn posts, or repurposing existing content into those formats.
license: MIT
---

# ChrisAI Social

Use this skill to turn technical ideas and rough thoughts into clear, natural,
engaging writing for readers who may not share the author's technical
background. Preserve the original insight and personality while making the
idea easier to understand, discuss, and remember.

Do not default to social-media strategy, scheduling, publishing, analytics,
campaign planning, or community management. This skill owns content creation
for articles and text-first social posts.

## Core Writing Contract

- Turn rough thoughts into natural posts.
- Translate technical ideas without flattening their meaning.
- Write for intelligent readers who may not know the jargon, architecture, or
  historical context.
- Use concrete examples, analogies, consequences, tension, and stories when
  they make the idea easier to grasp.
- Preserve evidence, uncertainty, trade-offs, and important limitations.
- Keep the author's point of view present throughout the piece.
- Make engagement devices feel like a natural continuation of the
  conversation, not a disguised sales pitch.
- Never invent facts, experience, metrics, quotations, or credibility.

## Internal Guidance

- Use `workflows/article-writing.md` for articles, blog posts, essays,
  technical explainers, tutorials intended for a broad audience, and
  long-form LinkedIn articles.
- Use `workflows/social-posts.md` for original short posts, X/Twitter posts or
  threads, LinkedIn feed posts, and improving an existing social draft.
- Use `workflows/content-repurposing.md` when adapting an article, transcript,
  note, or existing post into one or more platform-native derivatives.

## Supporting References

- Use `references/accessible-technical-voice.md` whenever the source idea is
  technical, dense, abstract, jargon-heavy, or difficult for a general reader
  to enter.
- Use `references/platform-formats.md` when the destination format affects the
  opening, length, pacing, paragraph structure, or closing. Verify current
  platform limits from authoritative sources when exact counts matter.

## Input Discipline

Use material the user already supplied before asking questions. Ask only for a
missing answer that would materially change the draft, normally the audience,
the main idea, the destination format, or a required source.

If the user provides a rough thought and names a format, start drafting. Make
reasonable editorial choices and state only consequential assumptions.

## Sequencing

Use one primary workflow by default:

1. Use article writing for a new long-form piece.
2. Use social posts for a new platform-native post or thread.
3. Use content repurposing when a source piece already exists.
4. Apply the accessible technical voice and platform format references only as
   needed by that primary workflow.

Do not run all workflows automatically.

## Decision Rules

- If the requested output develops one argument across sections, use article
  writing.
- If the requested output is a feed post, short post, or thread, use social
  posts.
- If the request begins with existing content and asks to transform, adapt, or
  extract from it, use content repurposing.
- Treat developer-facing documentation whose primary purpose is API lookup,
  onboarding, or technical instruction as outside this skill's normal scope
  unless the user asks to adapt it into an article or social post.
- If the writing would benefit from a visual, use an available graphics or
  rendering capability when one exists. Otherwise, note the visual need or
  provide a concise visual brief without blocking the writing task.

## Boundaries

- Do not schedule or publish posts unless the user explicitly invokes another
  capability that owns that action.
- Do not create content calendars, performance reports, or channel strategies
  as part of normal use.
- Do not make technical writing accessible by deleting the mechanism,
  evidence, caveats, or trade-offs that make the idea true.
- Do not force inspiration, vulnerability, controversy, or a closing question
  when the source idea does not support it.
