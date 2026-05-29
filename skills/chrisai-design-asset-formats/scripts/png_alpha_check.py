#!/usr/bin/env python3
"""Inspect a PNG for alpha-channel presence and simple transparency signals."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input PNG path")
    args = parser.parse_args()

    try:
        from PIL import Image
    except ImportError:
        print("Pillow is not installed. Install it locally to use this script.", file=sys.stderr)
        return 2

    path = Path(args.input)
    image = Image.open(path)
    rgba = image.convert("RGBA")
    width, height = rgba.size

    alpha_values = list(rgba.getchannel("A").getdata())
    has_alpha = "A" in rgba.getbands()
    min_alpha = min(alpha_values)
    max_alpha = max(alpha_values)
    transparent_pixels = sum(1 for value in alpha_values if value == 0)
    semi_transparent_pixels = sum(1 for value in alpha_values if 0 < value < 255)
    opaque_pixels = sum(1 for value in alpha_values if value == 255)

    corners = {
        "top_left": rgba.getpixel((0, 0))[3],
        "top_right": rgba.getpixel((width - 1, 0))[3],
        "bottom_left": rgba.getpixel((0, height - 1))[3],
        "bottom_right": rgba.getpixel((width - 1, height - 1))[3],
    }

    result = {
        "path": str(path),
        "size": {"width": width, "height": height},
        "has_alpha_channel": has_alpha,
        "alpha_range": {"min": min_alpha, "max": max_alpha},
        "pixel_summary": {
            "transparent": transparent_pixels,
            "semi_transparent": semi_transparent_pixels,
            "opaque": opaque_pixels,
        },
        "corner_alpha": corners,
        "looks_fully_opaque": min_alpha == 255,
        "has_any_transparency": min_alpha < 255,
        "has_binary_transparency_only": semi_transparent_pixels == 0 and min_alpha < 255,
    }

    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
