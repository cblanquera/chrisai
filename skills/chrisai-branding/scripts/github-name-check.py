#!/usr/bin/env python3
"""Bulk-check GitHub account name availability.

This uses GitHub's public users endpoint. A 404 is reported as
"possibly_available" because names may still be reserved, restricted, or
temporarily unavailable during signup.
"""

from __future__ import annotations

import re
from urllib.parse import quote

from availability_common import NameResult, checked_at, fetch_json, run


GITHUB_NAME_RE = re.compile(r"^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$")


def normalize_github_name(value: str) -> str:
    name = value.strip().removeprefix("@")
    if not GITHUB_NAME_RE.fullmatch(name):
        raise ValueError(
            f"{value!r} is not a valid GitHub-style account name "
            "(1-39 chars, alphanumeric or hyphen, no leading/trailing hyphen)."
        )
    return name


def check_github_name(name: str, timeout: float) -> NameResult:
    url = f"https://api.github.com/users/{quote(name)}"
    try:
        status, data = fetch_json(
            url,
            timeout,
            headers={
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
            },
        )
    except RuntimeError as error:
        return NameResult(
            name=name,
            platform="github",
            status="inconclusive",
            confidence="low",
            source="github-api",
            url=url,
            http_status=None,
            checked_at=checked_at(),
            note=f"GitHub request failed: {error}",
        )

    if status == 200:
        account_type = data.get("type", "account") if isinstance(data, dict) else "account"
        return NameResult(
            name=name,
            platform="github",
            status="taken",
            confidence="high",
            source="github-api",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note=f"GitHub returned an existing {account_type}.",
        )
    if status == 404:
        return NameResult(
            name=name,
            platform="github",
            status="possibly_available",
            confidence="medium",
            source="github-api",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="GitHub returned not found; verify in signup because names can be reserved.",
        )
    if status in {403, 429}:
        note = "GitHub rate-limited or blocked the request."
    else:
        note = f"GitHub returned HTTP {status}."
    return NameResult(
        name=name,
        platform="github",
        status="inconclusive",
        confidence="low",
        source="github-api",
        url=url,
        http_status=status,
        checked_at=checked_at(),
        note=note,
    )


def main() -> int:
    return run(
        "Bulk-check GitHub account name availability.",
        normalize_github_name,
        check_github_name,
    )


if __name__ == "__main__":
    raise SystemExit(main())
