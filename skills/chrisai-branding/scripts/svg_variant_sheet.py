#!/usr/bin/env python3
"""Create an HTML QA sheet for multiple SVG logo variants."""

from __future__ import annotations

import argparse
import html
import re
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
      --bg: #f6f7f9;
      --panel: #ffffff;
      --ink: #111111;
      --muted: #5b6470;
      --line: #d8dde3;
      --accent: #111827;
      --dark: #111827;
      --dark-ink: #f8fafc;
    }}
    * {{
      box-sizing: border-box;
    }}
    body {{
      margin: 0;
      padding: 32px;
      background: var(--bg);
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
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
    }}
    .card {{
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
    }}
    .hero {{
      display: grid;
      place-items: center;
      min-height: 220px;
      padding: 24px;
      border-bottom: 1px solid var(--line);
    }}
    .hero svg {{
      width: min(180px, 100%);
      height: auto;
      color: var(--accent);
    }}
    .checks {{
      display: grid;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid var(--line);
    }}
    .row {{
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: 12px;
      align-items: center;
    }}
    .label {{
      color: var(--muted);
      font-size: 12px;
      line-height: 1.3;
    }}
    .samples {{
      display: flex;
      gap: 14px;
      align-items: center;
      min-height: 44px;
    }}
    .sample {{
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      background: #ffffff;
      color: var(--accent);
    }}
    .sample.dark {{
      background: var(--dark);
      color: var(--dark-ink);
      border-color: var(--dark);
    }}
    .sample svg {{
      display: block;
      width: 100%;
      height: 100%;
    }}
    .s16 {{
      width: 16px;
      height: 16px;
    }}
    .s32 {{
      width: 32px;
      height: 32px;
    }}
    .s64 {{
      width: 64px;
      height: 64px;
    }}
    .favicon {{
      display: flex;
      align-items: center;
      width: 180px;
      height: 32px;
      padding: 0 10px;
      border: 1px solid var(--line);
      border-radius: 8px 8px 0 0;
      background: #ffffff;
      gap: 8px;
      color: var(--accent);
      font-size: 12px;
    }}
    .favicon svg {{
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
    }}
    .nav {{
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 44px;
      padding: 0 12px;
      border: 1px solid var(--line);
      background: #ffffff;
      color: var(--accent);
      gap: 10px;
      font-size: 14px;
      font-weight: 700;
    }}
    .nav.dark {{
      background: var(--dark);
      color: var(--dark-ink);
      border-color: var(--dark);
    }}
    .nav svg {{
      flex: 0 0 24px;
      width: 24px;
      height: 24px;
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
    @media (max-width: 520px) {{
      body {{
        padding: 18px;
      }}
      .grid {{
        grid-template-columns: 1fr;
      }}
      .row {{
        grid-template-columns: 1fr;
      }}
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


def scoped_svg(svg: str, scope: str) -> str:
    """Scope SVG ids so repeated inline previews do not collide."""
    ids = re.findall(r'\bid="([^"]+)"', svg)
    if not ids:
        return svg

    result = svg
    for original in ids:
        scoped = f"{scope}-{original}"
        result = result.replace(f'id="{original}"', f'id="{scoped}"')
        result = result.replace(f"url(#{original})", f"url(#{scoped})")
        result = result.replace(f'href="#{original}"', f'href="#{scoped}"')
        result = result.replace(f'xlink:href="#{original}"', f'xlink:href="#{scoped}"')

    labelledby_match = re.search(r'aria-labelledby="([^"]+)"', result)
    if labelledby_match:
        labels = labelledby_match.group(1).split()
        scoped_labels = " ".join(f"{scope}-{label}" if label in ids else label for label in labels)
        result = result.replace(
            labelledby_match.group(0),
            f'aria-labelledby="{scoped_labels}"',
            1,
        )

    return result


def build_card(path: Path) -> str:
    svg = path.read_text(encoding="utf-8")
    name = html.escape(path.stem)
    path_label = html.escape(str(path))
    hero = scoped_svg(svg, f"{path.stem}-hero")
    size_16 = scoped_svg(svg, f"{path.stem}-size-16")
    size_32 = scoped_svg(svg, f"{path.stem}-size-32")
    size_64 = scoped_svg(svg, f"{path.stem}-size-64")
    dark_16 = scoped_svg(svg, f"{path.stem}-dark-16")
    dark_32 = scoped_svg(svg, f"{path.stem}-dark-32")
    dark_64 = scoped_svg(svg, f"{path.stem}-dark-64")
    favicon = scoped_svg(svg, f"{path.stem}-favicon")
    nav = scoped_svg(svg, f"{path.stem}-nav")
    nav_dark = scoped_svg(svg, f"{path.stem}-nav-dark")
    return f"""
    <article class="card">
      <div class="hero">{hero}</div>
      <div class="checks">
        <div class="row">
          <div class="label">Size ramp</div>
          <div class="samples">
            <div class="sample s16">{size_16}</div>
            <div class="sample s32">{size_32}</div>
            <div class="sample s64">{size_64}</div>
          </div>
        </div>
        <div class="row">
          <div class="label">Dark surface</div>
          <div class="samples">
            <div class="sample dark s16">{dark_16}</div>
            <div class="sample dark s32">{dark_32}</div>
            <div class="sample dark s64">{dark_64}</div>
          </div>
        </div>
        <div class="row">
          <div class="label">Favicon tab</div>
          <div class="favicon">{favicon}<span>{name}</span></div>
        </div>
        <div class="row">
          <div class="label">Nav mockup</div>
          <div>
            <div class="nav">{nav}<span>{name}</span></div>
            <div class="nav dark">{nav_dark}<span>{name}</span></div>
          </div>
        </div>
      </div>
      <div class="meta">
        <h2 class="name">{name}</h2>
        <p class="path">{path_label}</p>
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
        default=(
            "Compare silhouette, balance, small-size legibility, dark-surface "
            "behavior, favicon use, and nav fit before choosing a direction."
        ),
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
