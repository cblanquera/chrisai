#!/usr/bin/env python3
"""Create an HTML QA sheet and source map for SVG logo variants."""

from __future__ import annotations

import argparse
import html
import os
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
    .description {{
      margin: 8px 0 0;
      color: var(--ink);
      font-size: 13px;
      line-height: 1.45;
    }}
    .terms {{
      margin: 8px 0 0;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
      word-break: break-word;
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
    identity, concept, description, components = svg_identity(path, svg)
    name = html.escape(f"{identity} — {concept}")
    description_label = html.escape(description)
    terms_label = html.escape(", ".join(components))
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
        <p class="description">{description_label}</p>
        <p class="terms">SVG terms: {terms_label}</p>
      </div>
    </article>
    """


def relative_path(path: Path, parent: Path) -> str:
    value = os.path.relpath(path.resolve(), start=parent.resolve())
    return value.replace(os.sep, "/")


def svg_text(svg: str, tag: str) -> str:
    match = re.search(
        rf"<{tag}(?:\s[^>]*)?>(.*?)</{tag}>",
        svg,
        re.DOTALL | re.IGNORECASE,
    )
    if not match:
        return ""
    value = re.sub(r"<[^>]+>", "", match.group(1))
    return html.unescape(" ".join(value.split()))


def svg_identity(path: Path, svg: str) -> tuple[str, str, str, list[str]]:
    fallback_id = path.stem.split("-", 1)[0].strip().upper()
    title = svg_text(svg, "title")
    description = svg_text(svg, "desc") or "No SVG construction description supplied."
    title_match = re.match(r"Candidate\s+([^\s—-]+)\s*[—-]\s*(.+)", title)
    if title_match:
        candidate = title_match.group(1).strip().upper()
        concept = title_match.group(2).strip()
    else:
        candidate = fallback_id
        concept = title or path.stem.split("-", 1)[-1].replace("-", " ").title()

    ignored = {"title", "desc", "svg"}
    components = [
        value
        for value in re.findall(r'\bid="([^"]+)"', svg)
        if value not in ignored
    ]
    if not components:
        components = ["unnamed geometry"]
    return candidate, concept, description, components


def markdown_cell(value: str) -> str:
    return " ".join(value.split()).replace("|", "\\|")


def build_map(
    title: str,
    board: Path,
    map_output: Path,
    inputs: list[Path],
    specs: list[Path | None],
    reference_contract: Path | None,
) -> str:
    rows = []
    for index, (visual, spec) in enumerate(zip(inputs, specs), start=1):
        visual_path = relative_path(visual, map_output.parent)
        svg = visual.read_text(encoding="utf-8")
        identity, concept, description, components = svg_identity(visual, svg)
        spec_path = (
            f"`{relative_path(spec, map_output.parent)}`" if spec is not None else "—"
        )
        component_label = ", ".join(f"`{value}`" for value in components)
        rows.append(
            f"| card {index} | {markdown_cell(identity)} | {markdown_cell(concept)} | "
            f"`{visual_path}` | {markdown_cell(description)} | {component_label} | "
            f"{spec_path} | proposed |"
        )

    board_path = relative_path(board, map_output.parent)
    contract_path = (
        f"`{relative_path(reference_contract, map_output.parent)}`"
        if reference_contract is not None
        else "not applicable"
    )
    return f"""# {title} Map

- Board artifact: `{board_path}`
- Board role: derived review surface
- Layout: responsive card grid in the display order below
- Selection authority: candidate files listed below
- Shared reference contract: {contract_path}

| Board position | Candidate ID | Concept name | Visual asset | Visible construction | SVG component IDs | Optional record | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
{chr(10).join(rows)}

## Selection Rule

A selection resolves through the matching row to the exact SVG visual asset.
Use its semantic component IDs for later edits. Do not edit or recreate the
board card while that source asset exists.
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
    parser.add_argument(
        "--specs",
        nargs="+",
        help=(
            "Optional legacy specification or durable record files in input order."
        ),
    )
    parser.add_argument(
        "--reference-contract",
        help="Optional shared reference-contract path recorded in the board map.",
    )
    parser.add_argument(
        "--map-output",
        help="Board-map output path. Defaults to <output-stem>.map.md.",
    )
    args = parser.parse_args()

    inputs = [Path(value) for value in args.inputs]
    if args.specs is not None and len(args.specs) != len(inputs):
        parser.error("--specs must provide exactly one file for every SVG input")

    specs: list[Path | None] = (
        [Path(value) for value in args.specs]
        if args.specs is not None
        else [None for _ in inputs]
    )
    missing_specs = [str(path) for path in specs if path is not None and not path.is_file()]
    if missing_specs:
        parser.error(
            "missing optional record file(s): " + ", ".join(missing_specs)
        )

    reference_contract = (
        Path(args.reference_contract) if args.reference_contract is not None else None
    )
    if reference_contract is not None and not reference_contract.is_file():
        parser.error(f"missing reference contract: {reference_contract}")

    cards = "\n".join(build_card(path) for path in inputs)
    document = HTML_TEMPLATE.format(
        title=html.escape(args.title),
        subtitle=html.escape(args.subtitle),
        cards=cards,
    )

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(document, encoding="utf-8")
    map_output = (
        Path(args.map_output)
        if args.map_output
        else output.with_suffix(".map.md")
    )
    map_output.parent.mkdir(parents=True, exist_ok=True)
    map_output.write_text(
        build_map(
            args.title,
            output,
            map_output,
            inputs,
            specs,
            reference_contract,
        ),
        encoding="utf-8",
    )
    print(output)
    print(map_output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
