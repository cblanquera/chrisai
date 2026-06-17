#!/usr/bin/env python3
"""Create a simple favicon preview sheet from a PNG when Pillow is available."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

FAVICON_SIZE = 16


def checkerboard(size: int, block: int = 8):
    from PIL import Image, ImageDraw

    image = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    draw = ImageDraw.Draw(image)
    a = (235, 235, 235, 255)
    b = (210, 210, 210, 255)
    for y in range(0, size, block):
        for x in range(0, size, block):
            color = a if ((x // block) + (y // block)) % 2 == 0 else b
            draw.rectangle((x, y, x + block - 1, y + block - 1), fill=color)
    return image


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input PNG path")
    parser.add_argument("output", help="Output preview PNG path")
    parser.add_argument("--tile", type=int, default=128, help="Tile size for each preview panel")
    args = parser.parse_args()

    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Pillow is not installed. Install it locally to use this script.", file=sys.stderr)
        return 2

    src = Image.open(args.input).convert("RGBA")
    tile = args.tile
    gap = 16
    header = 28
    width = tile + (2 * gap)
    height = tile + gap * 2 + header
    sheet = Image.new("RGBA", (width, height), (250, 250, 250, 255))
    draw = ImageDraw.Draw(sheet)

    x = gap
    y = gap + header
    panel = checkerboard(tile)
    icon = src.resize((FAVICON_SIZE, FAVICON_SIZE), Image.LANCZOS)
    pos = ((tile - FAVICON_SIZE) // 2, (tile - FAVICON_SIZE) // 2)
    panel.alpha_composite(icon, pos)
    sheet.alpha_composite(panel, (x, y))
    draw.rectangle((x, y, x + tile, y + tile), outline=(180, 180, 180, 255), width=1)
    draw.text((x, gap), f"{FAVICON_SIZE}x{FAVICON_SIZE}", fill=(30, 30, 30, 255))

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output)
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
