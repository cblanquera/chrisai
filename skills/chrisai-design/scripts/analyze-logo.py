#!/usr/bin/env python3
"""Extract objective evidence from SVG or PNG logo files."""

from __future__ import annotations

import argparse
import binascii
import json
import re
import struct
import sys
import zlib
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree


HEX_RE = re.compile(r"#[0-9a-fA-F]{3,8}\b")
RGB_RE = re.compile(r"rgba?\([^)]+\)")


def normalize_hex(value: str) -> str:
    value = value.upper()
    if len(value) == 4:
        return "#" + "".join(char * 2 for char in value[1:])
    return value


def read_png(path: Path) -> dict[str, object]:
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("not a PNG file")

    offset = 8
    width = height = color_type = None
    idat = bytearray()
    palette: list[tuple[int, int, int]] = []
    transparency = False

    while offset < len(data):
        length = struct.unpack(">I", data[offset:offset + 4])[0]
        chunk_type = data[offset + 4:offset + 8]
        chunk = data[offset + 8:offset + 8 + length]
        offset += 12 + length

        if chunk_type == b"IHDR":
            width, height, _bit_depth, color_type, *_ = struct.unpack(">IIBBBBB", chunk)
            transparency = color_type in {4, 6}
        elif chunk_type == b"PLTE":
            palette = [
                tuple(chunk[index:index + 3])
                for index in range(0, len(chunk), 3)
                if len(chunk[index:index + 3]) == 3
            ]
        elif chunk_type == b"tRNS":
            transparency = True
        elif chunk_type == b"IDAT":
            idat.extend(chunk)
        elif chunk_type == b"IEND":
            break

    colors: Counter[str] = Counter()
    if width and height and idat:
        try:
            colors = sample_png_colors(bytes(idat), width, height, color_type, palette)
        except Exception:
            colors = Counter()

    return {
        "dominantColors": [
            {"color": color, "count": count}
            for color, count in colors.most_common(12)
        ],
        "format": "png",
        "hasTransparency": transparency,
        "height": height,
        "notes": infer_notes(width, height, transparency, [color for color, _ in colors.most_common(12)]),
        "width": width
    }


def paeth(left: int, above: int, upper_left: int) -> int:
    estimate = left + above - upper_left
    distances = [
        (abs(estimate - left), left),
        (abs(estimate - above), above),
        (abs(estimate - upper_left), upper_left)
    ]
    return min(distances, key=lambda item: item[0])[1]


def unfilter_scanline(filter_type: int, row: bytearray, previous: bytearray, bpp: int) -> bytearray:
    result = bytearray(row)
    for index, value in enumerate(result):
        left = result[index - bpp] if index >= bpp else 0
        above = previous[index] if previous else 0
        upper_left = previous[index - bpp] if previous and index >= bpp else 0

        if filter_type == 1:
            result[index] = (value + left) & 0xFF
        elif filter_type == 2:
            result[index] = (value + above) & 0xFF
        elif filter_type == 3:
            result[index] = (value + ((left + above) // 2)) & 0xFF
        elif filter_type == 4:
            result[index] = (value + paeth(left, above, upper_left)) & 0xFF
    return result


def sample_png_colors(
    compressed: bytes,
    width: int,
    height: int,
    color_type: int | None,
    palette: list[tuple[int, int, int]]
) -> Counter[str]:
    raw = zlib.decompress(compressed)
    channels_by_type = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}
    channels = channels_by_type.get(color_type or -1)
    if not channels:
        return Counter()

    row_bytes = width * channels
    offset = 0
    previous = bytearray(row_bytes)
    colors: Counter[str] = Counter()
    stride = max(1, min(width, height) // 80)

    for y in range(height):
        filter_type = raw[offset]
        offset += 1
        row = unfilter_scanline(filter_type, bytearray(raw[offset:offset + row_bytes]), previous, channels)
        offset += row_bytes
        previous = row

        if y % stride != 0:
            continue

        for x in range(0, width, stride):
            pixel = row[x * channels:(x + 1) * channels]
            rgb = pixel_to_rgb(pixel, color_type, palette)
            if rgb:
                colors["#{:02X}{:02X}{:02X}".format(*rgb)] += 1

    return colors


def pixel_to_rgb(
    pixel: bytearray,
    color_type: int | None,
    palette: list[tuple[int, int, int]]
) -> tuple[int, int, int] | None:
    if color_type == 0 and pixel:
        return (pixel[0], pixel[0], pixel[0])
    if color_type == 2 and len(pixel) >= 3:
        return (pixel[0], pixel[1], pixel[2])
    if color_type == 3 and pixel and pixel[0] < len(palette):
        return palette[pixel[0]]
    if color_type == 4 and len(pixel) >= 2:
        return (pixel[0], pixel[0], pixel[0])
    if color_type == 6 and len(pixel) >= 4:
        if pixel[3] == 0:
            return None
        return (pixel[0], pixel[1], pixel[2])
    return None


def read_svg(path: Path) -> dict[str, object]:
    text = path.read_text(encoding="utf-8")
    colors = Counter(normalize_hex(match.group(0)) for match in HEX_RE.finditer(text))
    colors.update(match.group(0).replace(" ", "") for match in RGB_RE.finditer(text))

    width = height = view_box = None
    shape_counts: Counter[str] = Counter()

    try:
        root = ElementTree.fromstring(text)
        width = root.attrib.get("width")
        height = root.attrib.get("height")
        view_box = root.attrib.get("viewBox")
        for element in root.iter():
            tag = element.tag.split("}")[-1]
            shape_counts[tag] += 1
    except ElementTree.ParseError:
        pass

    gradient_count = len(re.findall(r"<(?:linearGradient|radialGradient)\b", text))

    return {
        "dominantColors": [
            {"color": color, "count": count}
            for color, count in colors.most_common(16)
        ],
        "format": "svg",
        "hasTransparency": "opacity" in text or "rgba(" in text or "fill=\"none\"" in text,
        "height": height,
        "notes": {
            "gradientCount": gradient_count,
            "shapeCounts": dict(shape_counts.most_common(12)),
            "treatment": "gradient" if gradient_count else "flat-or-unknown"
        },
        "viewBox": view_box,
        "width": width
    }


def infer_notes(width: int | None, height: int | None, transparency: bool, colors: list[str]) -> dict[str, object]:
    aspect = None
    if width and height:
        aspect = round(width / height, 3)

    return {
        "aspectRatio": aspect,
        "colorCountSample": len(colors),
        "shapeHint": infer_shape_hint(aspect),
        "transparencyHint": "has alpha or transparent chunk" if transparency else "no alpha detected"
    }


def infer_shape_hint(aspect: float | None) -> str:
    if aspect is None:
        return "unknown"
    if aspect >= 2.5:
        return "wide horizontal mark"
    if aspect <= 0.6:
        return "tall vertical mark"
    if 0.85 <= aspect <= 1.15:
        return "near-square mark"
    return "moderate rectangular mark"


def analyze(path: Path) -> dict[str, object]:
    suffix = path.suffix.lower()
    if suffix == ".svg":
        result = read_svg(path)
    elif suffix == ".png":
        result = read_png(path)
    else:
        raise ValueError("only SVG and PNG logos are supported")

    result["file"] = str(path)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("logo", help="Path to an SVG or PNG logo")
    parser.add_argument("--out", help="Write JSON output to this path")
    args = parser.parse_args()

    path = Path(args.logo).resolve()
    if not path.exists():
        print(f"Logo file does not exist: {path}", file=sys.stderr)
        return 1

    try:
        result = analyze(path)
    except (OSError, ValueError, binascii.Error) as error:
        print(f"Could not analyze logo: {error}", file=sys.stderr)
        return 1

    output = json.dumps(result, indent=2) + "\n"
    if args.out:
        Path(args.out).write_text(output, encoding="utf-8")
    else:
        sys.stdout.write(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
