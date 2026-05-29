#!/usr/bin/env python3
"""Create a lightweight SVG artifact for design-oriented prompt workflows."""

from __future__ import annotations

import argparse
import html
import textwrap
from pathlib import Path


def _wrap_lines(text: str, width: int) -> list[str]:
    return textwrap.wrap(text.strip(), width=width) if text.strip() else []


def _pill(x: int, y: int, label: str, fill: str) -> str:
    label = html.escape(label)
    width = max(72, 18 + len(label) * 7)
    return (
        f'<rect x="{x}" y="{y}" width="{width}" height="28" rx="14" '
        f'fill="{fill}" />'
        f'<text x="{x + 14}" y="{y + 19}" font-family="Helvetica, Arial, sans-serif" '
        f'font-size="13" fill="#111111">{label}</text>'
    )


def build_svg(
    width: int,
    height: int,
    title: str,
    subtitle: str,
    prompt: str,
    palette: list[str],
    keywords: list[str],
    background: str,
    transparent: bool,
) -> str:
    bg = "none" if transparent else background
    parts: list[str] = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">',
        f"<title>{html.escape(title)}</title>",
        f"<desc>{html.escape(prompt or subtitle or title)}</desc>",
        f'<rect width="{width}" height="{height}" fill="{bg}" />',
        f'<rect x="24" y="24" width="{width - 48}" height="{height - 48}" rx="28" '
        'fill="#FFFFFF" stroke="#D0D7DE" stroke-width="2" />',
        f'<text x="48" y="76" font-family="Helvetica, Arial, sans-serif" '
        f'font-size="28" font-weight="700" fill="#111111">{html.escape(title)}</text>',
    ]
    if subtitle:
        parts.append(
            f'<text x="48" y="108" font-family="Helvetica, Arial, sans-serif" '
            f'font-size="16" fill="#4B5563">{html.escape(subtitle)}</text>'
        )

    y = 148
    for line in _wrap_lines(prompt, 56)[:6]:
        parts.append(
            f'<text x="48" y="{y}" font-family="Helvetica, Arial, sans-serif" '
            f'font-size="16" fill="#1F2937">{html.escape(line)}</text>'
        )
        y += 24

    parts.extend(
        [
            f'<rect x="{width - 284}" y="48" width="212" height="212" rx="24" '
            'fill="#F4F7FB" stroke="#D0D7DE" stroke-width="2" />',
            f'<circle cx="{width - 178}" cy="124" r="42" fill="#E5E7EB" />',
            f'<rect x="{width - 230}" y="178" width="104" height="24" rx="12" fill="#E5E7EB" />',
            f'<rect x="{width - 248}" y="216" width="140" height="14" rx="7" fill="#E5E7EB" />',
        ]
    )

    if palette:
        parts.append(
            f'<text x="48" y="{height - 128}" font-family="Helvetica, Arial, sans-serif" '
            'font-size="15" font-weight="700" fill="#111111">Palette</text>'
        )
        x = 48
        for color in palette[:6]:
            safe = html.escape(color)
            parts.append(
                f'<rect x="{x}" y="{height - 108}" width="40" height="40" rx="10" '
                f'fill="{safe}" stroke="#D0D7DE" stroke-width="1" />'
            )
            parts.append(
                f'<text x="{x}" y="{height - 54}" font-family="Helvetica, Arial, sans-serif" '
                f'font-size="11" fill="#4B5563">{safe}</text>'
            )
            x += 72

    if keywords:
        parts.append(
            f'<text x="{48}" y="{height - 24}" font-family="Helvetica, Arial, sans-serif" '
            'font-size="15" font-weight="700" fill="#111111">Keywords</text>'
        )
        x = 140
        pill_y = height - 44
        fills = ["#DFF4FF", "#FDE68A", "#DCFCE7", "#FBCFE8", "#E9D5FF"]
        for idx, keyword in enumerate(keywords[:6]):
            parts.append(_pill(x, pill_y, keyword, fills[idx % len(fills)]))
            x += max(90, 36 + len(keyword) * 8)

    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", help="Output SVG path")
    parser.add_argument("--width", type=int, default=1200)
    parser.add_argument("--height", type=int, default=900)
    parser.add_argument("--title", default="Design Artifact")
    parser.add_argument("--subtitle", default="")
    parser.add_argument("--prompt", default="")
    parser.add_argument("--palette", default="")
    parser.add_argument("--keywords", default="")
    parser.add_argument("--background", default="#EEF2F7")
    parser.add_argument("--transparent", action="store_true")
    args = parser.parse_args()

    palette = [value.strip() for value in args.palette.split(",") if value.strip()]
    keywords = [value.strip() for value in args.keywords.split(",") if value.strip()]

    svg = build_svg(
        width=args.width,
        height=args.height,
        title=args.title,
        subtitle=args.subtitle,
        prompt=args.prompt,
        palette=palette,
        keywords=keywords,
        background=args.background,
        transparent=args.transparent,
    )

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(svg, encoding="utf-8")
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
