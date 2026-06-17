#!/usr/bin/env python3
"""Inspect an SVG logo master and emit export-prep guidance."""

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path


def strip_ns(tag: str) -> str:
    return tag.split("}", 1)[-1]


def parse_number(value: str | None) -> float | None:
    if not value:
        return None
    match = re.match(r"^\s*([0-9]+(?:\.[0-9]+)?)", value)
    if not match:
        return None
    return float(match.group(1))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input SVG path")
    args = parser.parse_args()

    path = Path(args.input)
    root = ET.fromstring(path.read_text(encoding="utf-8"))

    width = parse_number(root.attrib.get("width"))
    height = parse_number(root.attrib.get("height"))
    view_box = root.attrib.get("viewBox", "")
    vb = [float(part) for part in view_box.replace(",", " ").split() if part][:4]
    has_square_viewbox = len(vb) == 4 and abs(vb[2] - vb[3]) < 0.001

    counts: dict[str, int] = {}
    for node in root.iter():
        tag = strip_ns(node.tag)
        counts[tag] = counts.get(tag, 0) + 1

    guidance: list[str] = []
    if not view_box:
        guidance.append("Add a viewBox before export.")
    if view_box and not has_square_viewbox:
        guidance.append("Consider a square viewBox for logo and favicon workflows.")
    if width and height and abs(width - height) > 0.001:
        guidance.append("Non-square width/height may need padded export variants.")
    if counts.get("text", 0):
        guidance.append("Text nodes detected. Create a text-free favicon-safe variant if needed.")
    if counts.get("image", 0):
        guidance.append("Embedded raster content detected. Confirm SVG is a real master before export.")
    if sum(counts.get(tag, 0) for tag in ("path", "polygon", "rect", "circle", "ellipse")) > 24:
        guidance.append("High shape count. Check whether the mark is too detailed for favicon use.")

    print(json.dumps({
        "path": str(path),
        "width": width,
        "height": height,
        "viewBox": view_box,
        "has_square_viewbox": has_square_viewbox,
        "element_counts": counts,
        "guidance": guidance,
    }, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
