#!/usr/bin/env python3
"""Package a PNG into a 16x16 ICO when Pillow is available locally."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

FAVICON_SIZE = 16


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Input PNG path")
    parser.add_argument("output", help="Output ICO path")
    args = parser.parse_args()

    try:
        from PIL import Image
    except ImportError:
        print(
            "Pillow is not installed. Install it locally to use this script.",
            file=sys.stderr,
        )
        return 2

    image = Image.open(args.input).convert("RGBA")
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, format="ICO", sizes=[(FAVICON_SIZE, FAVICON_SIZE)])
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
