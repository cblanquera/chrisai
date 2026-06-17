#!/usr/bin/env python3
"""Render a chat response from Markdown-ish text into a self-contained HTML page."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import re
import sys
import tempfile
from pathlib import Path
from typing import Iterable


KEYWORDS: dict[str, set[str]] = {
    "python": {
        "and",
        "as",
        "assert",
        "break",
        "class",
        "continue",
        "def",
        "elif",
        "else",
        "except",
        "False",
        "finally",
        "for",
        "from",
        "if",
        "import",
        "in",
        "is",
        "lambda",
        "None",
        "not",
        "or",
        "pass",
        "raise",
        "return",
        "True",
        "try",
        "while",
        "with",
        "yield",
    },
    "javascript": {
        "await",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "default",
        "else",
        "export",
        "false",
        "for",
        "from",
        "function",
        "if",
        "import",
        "let",
        "new",
        "null",
        "return",
        "switch",
        "this",
        "throw",
        "true",
        "try",
        "typeof",
        "undefined",
        "while",
    },
    "typescript": {
        "abstract",
        "any",
        "as",
        "await",
        "boolean",
        "class",
        "const",
        "else",
        "enum",
        "export",
        "extends",
        "false",
        "function",
        "if",
        "implements",
        "import",
        "interface",
        "let",
        "new",
        "null",
        "number",
        "private",
        "protected",
        "public",
        "readonly",
        "return",
        "string",
        "true",
        "type",
        "undefined",
        "void",
    },
    "css": {
        "align-items",
        "background",
        "border",
        "color",
        "display",
        "flex",
        "font",
        "gap",
        "grid",
        "height",
        "margin",
        "padding",
        "position",
        "width",
    },
    "html": {
        "article",
        "body",
        "button",
        "div",
        "footer",
        "form",
        "head",
        "header",
        "html",
        "input",
        "label",
        "main",
        "meta",
        "script",
        "section",
        "style",
        "title",
    },
}

LANGUAGE_ALIASES = {
    "js": "javascript",
    "jsx": "javascript",
    "mjs": "javascript",
    "cjs": "javascript",
    "ts": "typescript",
    "tsx": "typescript",
    "py": "python",
    "html": "html",
    "xml": "html",
    "css": "css",
}

SAFE_LINK_RE = re.compile(r"^(https?://|mailto:|#|/|\./|\../)", re.IGNORECASE)


def slugify(value: str, used: set[str]) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "section"
    base = slug
    count = 2
    while slug in used:
        slug = f"{base}-{count}"
        count += 1
    used.add(slug)
    return slug


def normalize_language(language: str) -> str:
    cleaned = (language or "text").strip().lower().split()[0]
    return LANGUAGE_ALIASES.get(cleaned, cleaned or "text")


def highlight_code(code: str, language: str) -> str:
    language = normalize_language(language)
    keywords = KEYWORDS.get(language, set())
    escaped = html.escape(code)

    if keywords:
        pattern = r"\b(" + "|".join(re.escape(word) for word in sorted(keywords, key=len, reverse=True)) + r")\b"
        escaped = re.sub(pattern, r'<span class="token keyword">\1</span>', escaped)

    escaped = re.sub(r"(&quot;.*?&quot;|&#x27;.*?&#x27;|`.*?`)", r'<span class="token string">\1</span>', escaped)
    escaped = re.sub(r"\b(\d+(?:\.\d+)?)\b", r'<span class="token number">\1</span>', escaped)

    if language in {"javascript", "typescript", "css"}:
        escaped = re.sub(r"(//.*)$", r'<span class="token comment">\1</span>', escaped, flags=re.MULTILINE)
        escaped = re.sub(r"(/\*.*?\*/)", r'<span class="token comment">\1</span>', escaped, flags=re.DOTALL)
    elif language == "python":
        escaped = re.sub(r"(#.*)$", r'<span class="token comment">\1</span>', escaped, flags=re.MULTILINE)
    elif language == "html":
        escaped = re.sub(r"(&lt;!--.*?--&gt;)", r'<span class="token comment">\1</span>', escaped, flags=re.DOTALL)

    return escaped


def render_inline(value: str) -> str:
    placeholders: list[str] = []

    def stash(match: re.Match[str]) -> str:
        placeholders.append(f"<code>{html.escape(match.group(1))}</code>")
        return f"\u0000{len(placeholders) - 1}\u0000"

    value = re.sub(r"`([^`]+)`", stash, value)
    escaped = html.escape(value)

    def link(match: re.Match[str]) -> str:
        label = html.escape(match.group(1))
        href = match.group(2).strip()
        if not SAFE_LINK_RE.search(href):
            return label
        return f'<a href="{html.escape(href, quote=True)}">{label}</a>'

    escaped = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", link, escaped)
    escaped = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", escaped)
    escaped = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", escaped)

    for index, replacement in enumerate(placeholders):
        escaped = escaped.replace(f"\u0000{index}\u0000", replacement)
    return escaped


def close_lists(parts: list[str], list_stack: list[str]) -> None:
    while list_stack:
        parts.append(f"</{list_stack.pop()}>")


def render_card(marker: str, body: str) -> str:
    kind = marker.lower()
    titles = {
        "note": "Note",
        "tip": "Tip",
        "warning": "Warning",
        "decision": "Decision",
        "caution": "Caution",
        "important": "Important",
    }
    title = titles.get(kind, marker.title())
    return (
        f'<section class="callout callout-{html.escape(kind)}">'
        f'<div class="callout-title">{html.escape(title)}</div>'
        f"<p>{render_inline(body)}</p>"
        "</section>"
    )


def render_code_block(language: str, code: str) -> str:
    language = normalize_language(language)
    if language == "mermaid":
        return (
            '<section class="diagram-card">'
            '<div class="diagram-title">Mermaid diagram source</div>'
            '<pre class="mermaid" data-diagram="mermaid"><code>'
            f"{html.escape(code)}"
            "</code></pre>"
            "</section>"
        )
    highlighted = highlight_code(code, language)
    label = "" if language == "text" else f'<div class="code-label">{html.escape(language)}</div>'
    return (
        '<div class="code-frame">'
        f"{label}"
        f'<pre><code class="language-{html.escape(language)}">{highlighted}</code></pre>'
        "</div>"
    )


def render_markdown(source: str) -> str:
    lines = source.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    parts: list[str] = []
    list_stack: list[str] = []
    paragraph: list[str] = []
    heading_ids: set[str] = set()
    in_code = False
    code_language = "text"
    code_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            close_lists(parts, list_stack)
            parts.append(f"<p>{render_inline(' '.join(line.strip() for line in paragraph))}</p>")
            paragraph = []

    for raw_line in lines:
        line = raw_line.rstrip()

        fence = re.match(r"^```(.*)$", line)
        if fence:
            if in_code:
                parts.append(render_code_block(code_language, "\n".join(code_lines)))
                code_lines = []
                in_code = False
                code_language = "text"
            else:
                flush_paragraph()
                close_lists(parts, list_stack)
                in_code = True
                code_language = fence.group(1).strip() or "text"
            continue

        if in_code:
            code_lines.append(raw_line)
            continue

        if not line.strip():
            flush_paragraph()
            close_lists(parts, list_stack)
            continue

        heading = re.match(r"^(#{1,4})\s+(.+)$", line)
        if heading:
            flush_paragraph()
            close_lists(parts, list_stack)
            level = len(heading.group(1))
            text = heading.group(2).strip()
            slug = slugify(re.sub(r"`([^`]+)`", r"\1", text), heading_ids)
            parts.append(f'<h{level} id="{slug}">{render_inline(text)}</h{level}>')
            continue

        if re.match(r"^\s*---+\s*$", line):
            flush_paragraph()
            close_lists(parts, list_stack)
            parts.append("<hr>")
            continue

        callout = re.match(r"^>\s*\[!(NOTE|TIP|WARNING|DECISION|CAUTION|IMPORTANT)\]\s*(.*)$", line, re.IGNORECASE)
        if not callout:
            callout = re.match(r"^\[!(NOTE|TIP|WARNING|DECISION|CAUTION|IMPORTANT)\]\s*(.*)$", line, re.IGNORECASE)
        if callout:
            flush_paragraph()
            close_lists(parts, list_stack)
            parts.append(render_card(callout.group(1), callout.group(2).strip()))
            continue

        quote = re.match(r"^>\s?(.*)$", line)
        if quote:
            flush_paragraph()
            close_lists(parts, list_stack)
            parts.append(f"<blockquote>{render_inline(quote.group(1).strip())}</blockquote>")
            continue

        unordered = re.match(r"^\s*[-*]\s+(.+)$", line)
        ordered = re.match(r"^\s*\d+[.)]\s+(.+)$", line)
        if unordered or ordered:
            flush_paragraph()
            desired = "ul" if unordered else "ol"
            if not list_stack or list_stack[-1] != desired:
                close_lists(parts, list_stack)
                parts.append(f"<{desired}>")
                list_stack.append(desired)
            content = (unordered or ordered).group(1)
            parts.append(f"<li>{render_inline(content.strip())}</li>")
            continue

        paragraph.append(line)

    if in_code:
        parts.append(render_code_block(code_language, "\n".join(code_lines)))
    flush_paragraph()
    close_lists(parts, list_stack)
    return "\n".join(parts)


def build_document(title: str, body_html: str) -> str:
    generated = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    safe_title = html.escape(title)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{safe_title}</title>
  <style>
    :root {{
      color-scheme: light;
      --bg: #f6f8fb;
      --surface: #ffffff;
      --text: #172033;
      --muted: #5b6475;
      --line: #d8dee8;
      --accent: #2563eb;
      --accent-soft: #eaf1ff;
      --code-bg: #101827;
      --code-text: #d7e0f0;
      --note: #eef6ff;
      --tip: #edfdf4;
      --warning: #fff7e6;
      --decision: #f2efff;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
    }}
    main {{
      width: min(100%, 920px);
      margin: 0 auto;
      padding: 40px 24px 56px;
    }}
    article {{
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: clamp(24px, 4vw, 48px);
      box-shadow: 0 16px 40px rgba(23, 32, 51, 0.08);
    }}
    header {{
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--line);
    }}
    .eyebrow {{
      margin: 0 0 8px;
      color: var(--muted);
      font-size: 0.875rem;
    }}
    h1, h2, h3, h4 {{
      margin: 1.4em 0 0.45em;
      line-height: 1.2;
      letter-spacing: 0;
    }}
    header h1 {{ margin-top: 0; font-size: clamp(1.8rem, 3vw, 2.6rem); }}
    h1 {{ font-size: 2rem; }}
    h2 {{ font-size: 1.45rem; border-top: 1px solid var(--line); padding-top: 1em; }}
    h3 {{ font-size: 1.2rem; }}
    h4 {{ font-size: 1rem; }}
    p {{ margin: 0.85em 0; }}
    a {{ color: var(--accent); text-decoration-thickness: 0.08em; text-underline-offset: 0.18em; }}
    ul, ol {{ padding-left: 1.35rem; margin: 0.85em 0; }}
    li + li {{ margin-top: 0.3em; }}
    blockquote {{
      margin: 1rem 0;
      padding: 0.2rem 0 0.2rem 1rem;
      border-left: 4px solid var(--line);
      color: var(--muted);
    }}
    hr {{ border: 0; border-top: 1px solid var(--line); margin: 2rem 0; }}
    code {{
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.92em;
    }}
    p code, li code {{
      background: var(--accent-soft);
      border: 1px solid #d6e4ff;
      border-radius: 5px;
      color: #174ea6;
      padding: 0.1rem 0.3rem;
    }}
    .code-frame {{
      margin: 1.2rem 0;
      overflow: hidden;
      border: 1px solid #26334d;
      border-radius: 8px;
      background: var(--code-bg);
    }}
    .code-label {{
      border-bottom: 1px solid #26334d;
      color: #9fb0ca;
      font-size: 0.78rem;
      padding: 0.45rem 0.75rem;
      text-transform: uppercase;
    }}
    pre {{
      margin: 0;
      overflow-x: auto;
      padding: 1rem;
      white-space: pre;
    }}
    pre code {{ color: var(--code-text); font-size: 0.9rem; }}
    .token.keyword {{ color: #93c5fd; }}
    .token.string {{ color: #fde68a; }}
    .token.number {{ color: #fca5a5; }}
    .token.comment {{ color: #94a3b8; font-style: italic; }}
    .callout, .diagram-card {{
      margin: 1.2rem 0;
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 1rem;
    }}
    .callout-title, .diagram-title {{
      margin-bottom: 0.35rem;
      font-weight: 700;
    }}
    .callout-note {{ background: var(--note); }}
    .callout-tip {{ background: var(--tip); }}
    .callout-warning, .callout-caution {{ background: var(--warning); }}
    .callout-decision, .callout-important {{ background: var(--decision); }}
    .diagram-card {{ background: #fbfcff; }}
    .diagram-card pre {{
      border: 1px dashed var(--line);
      border-radius: 6px;
      background: #ffffff;
    }}
    .diagram-card code {{ color: #24324b; }}
    @media (max-width: 720px) {{
      main {{ padding: 16px 12px 32px; }}
      article {{ padding: 20px 16px; }}
      header h1 {{ font-size: 1.7rem; }}
      h1 {{ font-size: 1.55rem; }}
      h2 {{ font-size: 1.25rem; }}
      pre {{ padding: 0.85rem; }}
    }}
  </style>
</head>
<body>
  <main>
    <article>
      <header>
        <p class="eyebrow">Rendered response · {generated}</p>
        <h1>{safe_title}</h1>
      </header>
      {body_html}
    </article>
  </main>
</body>
</html>
"""


def read_source(input_path: str | None) -> str:
    if input_path:
        return Path(input_path).read_text(encoding="utf-8")
    return sys.stdin.read()


def write_output(output_path: str | None, document: str) -> None:
    if output_path:
        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(document, encoding="utf-8")
        return
    sys.stdout.write(document)


def preview_output_path(output_path: str | None, preview_dir: str, filename: str) -> Path:
    if output_path:
        return Path(output_path)
    safe_name = Path(filename).name or "response.html"
    if not safe_name.lower().endswith((".html", ".htm")):
        safe_name = f"{safe_name}.html"
    return Path(preview_dir) / safe_name


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--title", default="Response", help="HTML document title")
    parser.add_argument("--input", help="Markdown input path. Defaults to stdin.")
    parser.add_argument("--output", help="HTML output path. Defaults to stdout.")
    parser.add_argument(
        "--preview-file",
        action="store_true",
        help="Write HTML to a preview file, print its file:// URL, and exit.",
    )
    parser.add_argument(
        "--preview-dir",
        default=str(Path(tempfile.gettempdir()) / "chrisai-response-preview"),
        help="Directory used with --preview-file when --output is not provided.",
    )
    parser.add_argument(
        "--filename",
        default="response.html",
        help="Preview filename used with --preview-file when --output is not provided.",
    )
    args = parser.parse_args(argv)

    source = read_source(args.input)
    body_html = render_markdown(source)
    document = build_document(args.title, body_html)

    if args.preview_file:
        output = preview_output_path(args.output, args.preview_dir, args.filename)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(document, encoding="utf-8")
        print(output.resolve().as_uri())
        return 0

    write_output(args.output, document)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
