#!/usr/bin/env python3
"""Bulk-check X/Twitter handle availability.

If X_BEARER_TOKEN is set, this uses X API v2 user lookup. Without a token it
falls back to the public profile URL, which is less reliable and should be
treated as a best-effort signal.
"""

from __future__ import annotations

import os
import re
from urllib.parse import quote

from availability_common import NameResult, checked_at, fetch_json, fetch_status, run


X_HANDLE_RE = re.compile(r"^[A-Za-z0-9_]{1,15}$")


def normalize_x_name(value: str) -> str:
    name = value.strip().removeprefix("@")
    if not X_HANDLE_RE.fullmatch(name):
        raise ValueError(
            f"{value!r} is not a valid X/Twitter-style handle "
            "(1-15 chars, letters, numbers, underscores)."
        )
    return name


def check_with_x_api(name: str, timeout: float, token: str) -> NameResult:
    url = f"https://api.x.com/2/users/by/username/{quote(name)}"
    status, data = fetch_json(
        url,
        timeout,
        headers={"Authorization": f"Bearer {token}"},
    )
    errors = data.get("errors", []) if isinstance(data, dict) else []

    if status == 200 and isinstance(data, dict) and data.get("data"):
        return NameResult(
            name=name,
            platform="x",
            status="taken",
            confidence="high",
            source="x-api",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="X API returned an existing user.",
        )
    if status == 404 or any(error.get("title") == "Not Found Error" for error in errors):
        return NameResult(
            name=name,
            platform="x",
            status="possibly_available",
            confidence="medium",
            source="x-api",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="X API returned not found; verify during signup because handles can be reserved.",
        )
    if status in {401, 403}:
        note = "X API authentication failed or does not allow this lookup."
    elif status == 429:
        note = "X API rate-limited the request."
    else:
        note = f"X API returned HTTP {status}."
    return NameResult(
        name=name,
        platform="x",
        status="inconclusive",
        confidence="low",
        source="x-api",
        url=url,
        http_status=status,
        checked_at=checked_at(),
        note=note,
    )


def check_with_public_profile(name: str, timeout: float) -> NameResult:
    url = f"https://x.com/{quote(name)}"
    try:
        status, _body = fetch_status(
            url,
            timeout,
            headers={"Accept": "text/html, */*;q=0.8"},
        )
    except RuntimeError as error:
        return NameResult(
            name=name,
            platform="x",
            status="inconclusive",
            confidence="low",
            source="x-web",
            url=url,
            http_status=None,
            checked_at=checked_at(),
            note=f"X public profile request failed: {error}",
        )

    if status == 200:
        return NameResult(
            name=name,
            platform="x",
            status="taken",
            confidence="low",
            source="x-web",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="Public profile URL returned OK; X web responses can be noisy.",
        )
    if status == 404:
        return NameResult(
            name=name,
            platform="x",
            status="possibly_available",
            confidence="low",
            source="x-web",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="Public profile URL returned not found; verify in X signup.",
        )
    if status in {403, 429}:
        note = "X blocked or rate-limited the public profile request."
    else:
        note = f"X public profile URL returned HTTP {status}."
    return NameResult(
        name=name,
        platform="x",
        status="inconclusive",
        confidence="low",
        source="x-web",
        url=url,
        http_status=status,
        checked_at=checked_at(),
        note=note,
    )


def check_x_name(name: str, timeout: float) -> NameResult:
    token = os.environ.get("X_BEARER_TOKEN", "").strip()
    if token:
        try:
            return check_with_x_api(name, timeout, token)
        except RuntimeError as error:
            return NameResult(
                name=name,
                platform="x",
                status="inconclusive",
                confidence="low",
                source="x-api",
                url=f"https://api.x.com/2/users/by/username/{quote(name)}",
                http_status=None,
                checked_at=checked_at(),
                note=f"X API request failed: {error}",
            )
    return check_with_public_profile(name, timeout)


def main() -> int:
    return run(
        "Bulk-check X/Twitter handle availability.",
        normalize_x_name,
        check_x_name,
    )


if __name__ == "__main__":
    raise SystemExit(main())
