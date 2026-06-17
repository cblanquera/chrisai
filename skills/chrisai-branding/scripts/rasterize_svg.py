#!/usr/bin/env python3
"""Rasterize an SVG to PNG when cairosvg is available locally."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input SVG path")
    parser.add_argument("output", help="Output PNG path")
    parser.add_argument("--width", type=int)
    parser.add_argument("--height", type=int)
    args = parser.parse_args()

    try:
        import cairosvg
    except ImportError:
        print(
            "cairosvg is not installed. Install it locally to use this script "
            "or use another rasterization path.",
            file=sys.stderr,
        )
        return 2

    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    cairosvg.svg2png(
        url=str(Path(args.input).resolve()),
        write_to=str(output),
        output_width=args.width,
        output_height=args.height,
    )
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
