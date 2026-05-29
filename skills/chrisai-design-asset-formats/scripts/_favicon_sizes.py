"""Shared favicon-size validation for asset-format scripts."""

from __future__ import annotations

VALID_FAVICON_SIZES = (16,)


def parse_favicon_sizes(value: str) -> list[int]:
    sizes: list[int] = []
    for raw in value.split(","):
        raw = raw.strip()
        if not raw:
            continue
        size = int(raw)
        if size not in VALID_FAVICON_SIZES:
            allowed = ", ".join(str(item) for item in VALID_FAVICON_SIZES)
            raise ValueError(f"Invalid favicon size {size}. Allowed sizes: {allowed}")
        sizes.append(size)
    return sizes
