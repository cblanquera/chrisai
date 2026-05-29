#!/usr/bin/env python3
"""Package a PNG into a multi-size ICO when Pillow is available locally."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from _favicon_sizes import parse_favicon_sizes


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input PNG path")
    parser.add_argument("output", help="Output ICO path")
    parser.add_argument(
        "--sizes",
        default="16",
        help="Comma-separated favicon sizes, default: 16",
    )
    args = parser.parse_args()

    try:
        from PIL import Image
    except ImportError:
        print(
            "Pillow is not installed. Install it locally to use this script.",
            file=sys.stderr,
        )
        return 2

    try:
        sizes = [(size, size) for size in parse_favicon_sizes(args.sizes)]
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2

    image = Image.open(args.input).convert("RGBA")
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, format="ICO", sizes=sizes)
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
