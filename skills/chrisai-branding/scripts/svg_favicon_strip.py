#!/usr/bin/env python3
"""Create an HTML strip for 16x16 SVG/PNG favicon review."""

from __future__ import annotations

import argparse
import html
from pathlib import Path

FAVICON_SIZE = 16


HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <style>
    body {{
      margin: 0;
      padding: 24px;
      background: #f4f6f8;
      color: #111111;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }}
    h1 {{
      margin: 0 0 8px;
      font-size: 28px;
    }}
    p {{
      margin: 0 0 20px;
      color: #5b6470;
      max-width: 760px;
    }}
    .card {{
      margin-bottom: 18px;
      background: #ffffff;
      border: 1px solid #d8dde3;
      border-radius: 18px;
      overflow: hidden;
    }}
    .meta {{
      padding: 14px 16px;
      border-bottom: 1px solid #d8dde3;
    }}
    .name {{
      margin: 0 0 4px;
      font-size: 16px;
      font-weight: 700;
    }}
    .path {{
      margin: 0;
      font-size: 12px;
      color: #5b6470;
      word-break: break-all;
    }}
    .sizes {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 16px;
      align-items: flex-end;
    }}
    .tile {{
      width: 96px;
      text-align: center;
    }}
    .label {{
      margin-bottom: 8px;
      font-size: 12px;
      color: #5b6470;
    }}
    .frame {{
      display: grid;
      place-items: center;
      width: 96px;
      height: 96px;
      margin: 0 auto;
      border: 1px solid #d8dde3;
      background:
        linear-gradient(45deg, #eef2f6 25%, transparent 25%, transparent 75%, #eef2f6 75%, #eef2f6),
        linear-gradient(45deg, #eef2f6 25%, #ffffff 25%, #ffffff 75%, #eef2f6 75%, #eef2f6);
      background-position: 0 0, 12px 12px;
      background-size: 24px 24px;
    }}
  </style>
</head>
<body>
  <h1>{title}</h1>
  <p>{subtitle}</p>
  {cards}
</body>
</html>
"""


def render_svg_tile(source: str, size: int) -> str:
    sized_source = source.replace("<svg", f'<svg width="{size}" height="{size}"', 1)
    return (
        f'<div class="tile"><div class="label">{size}x{size}</div>'
        f'<div class="frame">{sized_source}</div></div>'
    )


def render_png_tile(data_uri: str, size: int) -> str:
    return (
        f'<div class="tile"><div class="label">{size}x{size}</div>'
        f'<div class="frame"><img src="{data_uri}" width="{size}" height="{size}" alt="" /></div></div>'
    )


def png_to_data_uri(path: Path) -> str:
    import base64
    payload = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/png;base64,{payload}"


def build_card(path: Path) -> str:
    suffix = path.suffix.lower()
    tiles: list[str] = []
    if suffix == ".svg":
        source = path.read_text(encoding="utf-8")
        tiles = [render_svg_tile(source, FAVICON_SIZE)]
    elif suffix == ".png":
        data_uri = png_to_data_uri(path)
        tiles = [render_png_tile(data_uri, FAVICON_SIZE)]
    else:
        raise ValueError(f"Unsupported file type: {path}")

    return f"""
    <section class="card">
      <div class="meta">
        <h2 class="name">{html.escape(path.stem)}</h2>
        <p class="path">{html.escape(str(path))}</p>
      </div>
      <div class="sizes">
        {''.join(tiles)}
      </div>
    </section>
    """


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", help="Output HTML path")
    parser.add_argument("inputs", nargs="+", help="Input SVG or PNG files")
    parser.add_argument("--title", default="Favicon Strip Review")
    parser.add_argument(
        "--subtitle",
        default="Review the 16x16 favicon before ICO packaging or final icon export.",
    )
    args = parser.parse_args()

    cards = []
    for value in args.inputs:
        cards.append(build_card(Path(value)))

    document = HTML_TEMPLATE.format(
        title=html.escape(args.title),
        subtitle=html.escape(args.subtitle),
        cards="\n".join(cards),
    )

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8")
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
