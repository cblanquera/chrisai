#!/usr/bin/env python3
"""Inspect a local SVG for quick format-readiness checks."""

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path


def strip_ns(tag: str) -> str:
    return tag.split("}", 1)[-1]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input SVG path")
    args = parser.parse_args()

    path = Path(args.input)
    root = ET.fromstring(path.read_text(encoding="utf-8"))

    counts: dict[str, int] = {}
    raster_embeds = 0
    href_values: list[str] = []
    text_nodes = 0

    for node in root.iter():
        tag = strip_ns(node.tag)
        counts[tag] = counts.get(tag, 0) + 1
        if tag == "image":
            raster_embeds += 1
            href = node.attrib.get("{http://www.w3.org/1999/xlink}href", "")
            href = href or node.attrib.get("href", "")
            if href:
                href_values.append(href[:120])
        if tag == "text":
            text_nodes += 1

    view_box = root.attrib.get("viewBox")
    width = root.attrib.get("width")
    height = root.attrib.get("height")

    result = {
        "path": str(path),
        "width": width,
        "height": height,
        "viewBox": view_box,
        "has_viewBox": bool(view_box),
        "counts": counts,
        "text_nodes": text_nodes,
        "raster_embeds": raster_embeds,
        "href_samples": href_values[:5],
        "suspicious_data_uri_embed": any(
            value.startswith("data:image/") for value in href_values
        ),
        "has_percent_dimensions": bool(
            (width and re.search(r"%$", width)) or (height and re.search(r"%$", height))
        ),
    }

    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
