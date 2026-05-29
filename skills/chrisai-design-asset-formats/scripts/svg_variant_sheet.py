#!/usr/bin/env python3
"""Create a simple HTML comparison sheet for multiple SVG logo variants."""

from __future__ import annotations

import argparse
import html
from pathlib import Path


HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <style>
    :root {{
      color-scheme: light;
      --bg: #f3f5f7;
      --panel: #ffffff;
      --ink: #111111;
      --muted: #5b6470;
      --line: #d8dde3;
      --accent: #111827;
    }}
    * {{
      box-sizing: border-box;
    }}
    body {{
      margin: 0;
      padding: 32px;
      background:
        radial-gradient(circle at top left, #ffffff 0, #f3f5f7 40%, #e8edf2 100%);
      color: var(--ink);
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: 30px;
      line-height: 1.1;
    }}
    p {{
      margin: 0 0 24px;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.5;
      max-width: 760px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }}
    .card {{
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 12px 30px rgba(17, 24, 39, 0.06);
    }}
    .preview {{
      display: grid;
      place-items: center;
      min-height: 240px;
      padding: 24px;
      border-bottom: 1px solid var(--line);
      background:
        linear-gradient(45deg, #eef2f6 25%, transparent 25%, transparent 75%, #eef2f6 75%, #eef2f6),
        linear-gradient(45deg, #eef2f6 25%, #ffffff 25%, #ffffff 75%, #eef2f6 75%, #eef2f6);
      background-position: 0 0, 16px 16px;
      background-size: 32px 32px;
    }}
    .preview svg {{
      width: min(180px, 100%);
      height: auto;
      color: var(--accent);
    }}
    .meta {{
      padding: 18px 18px 16px;
    }}
    .name {{
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 700;
    }}
    .path {{
      margin: 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
      word-break: break-all;
    }}
  </style>
</head>
<body>
  <h1>{title}</h1>
  <p>{subtitle}</p>
  <section class="grid">
    {cards}
  </section>
</body>
</html>
"""


def build_card(path: Path) -> str:
    svg = path.read_text(encoding="utf-8")
    return f"""
    <article class="card">
      <div class="preview">{svg}</div>
      <div class="meta">
        <h2 class="name">{html.escape(path.stem)}</h2>
        <p class="path">{html.escape(str(path))}</p>
      </div>
    </article>
    """


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", help="Output HTML path")
    parser.add_argument("inputs", nargs="+", help="Input SVG files")
    parser.add_argument("--title", default="SVG Variant Review")
    parser.add_argument(
        "--subtitle",
        default="Compare silhouette, balance, and small-mark readiness before choosing a direction.",
    )
    args = parser.parse_args()

    cards = "\n".join(build_card(Path(value)) for value in args.inputs)
    document = HTML_TEMPLATE.format(
        title=html.escape(args.title),
        subtitle=html.escape(args.subtitle),
        cards=cards,
    )

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8")
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
