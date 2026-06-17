#!/usr/bin/env python3
"""Bulk-check npm organization/scope name availability.

This uses the public npm organization page as a best-effort signal. A 404 is
reported as "possibly_available" because npm may reserve or restrict names
outside the public page state.
"""

from __future__ import annotations

import re
from urllib.parse import quote

from availability_common import NameResult, checked_at, fetch_json, fetch_status, run


NPM_ORG_RE = re.compile(r"^[a-z0-9](?:[a-z0-9-]{0,212}[a-z0-9])?$")


def normalize_npm_org(value: str) -> str:
    name = value.strip().lower().removeprefix("@")
    if not NPM_ORG_RE.fullmatch(name):
        raise ValueError(
            f"{value!r} is not a conservative npm org/scope name "
            "(lowercase letters, numbers, hyphens, no leading/trailing hyphen)."
        )
    return name


def check_npm_org(name: str, timeout: float) -> NameResult:
    url = f"https://www.npmjs.com/org/{quote(name)}"
    try:
        status, _body = fetch_status(
            url,
            timeout,
            headers={"Accept": "text/html, */*;q=0.8"},
        )
    except RuntimeError as error:
        return NameResult(
            name=name,
            platform="npm",
            status="inconclusive",
            confidence="low",
            source="npm-web",
            url=url,
            http_status=None,
            checked_at=checked_at(),
            note=f"npm request failed: {error}",
        )

    if status == 200:
        return NameResult(
            name=name,
            platform="npm",
            status="taken",
            confidence="medium",
            source="npm-web",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="npm returned an organization page.",
        )
    if status == 404:
        return NameResult(
            name=name,
            platform="npm",
            status="possibly_available",
            confidence="medium",
            source="npm-web",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="npm returned not found; verify during org creation.",
        )
    if status in {403, 429}:
        fallback = check_npm_scope_search(name, timeout)
        if fallback.status == "taken":
            return fallback
        note = "npm rate-limited or blocked the org page request."
    else:
        note = f"npm returned HTTP {status}."
    return NameResult(
        name=name,
        platform="npm",
        status="inconclusive",
        confidence="low",
        source="npm-web",
        url=url,
        http_status=status,
        checked_at=checked_at(),
        note=note,
    )


def check_npm_scope_search(name: str, timeout: float) -> NameResult:
    url = f"https://registry.npmjs.org/-/v1/search?text=scope:{quote(name)}&size=1"
    try:
        status, data = fetch_json(url, timeout)
    except RuntimeError as error:
        return NameResult(
            name=name,
            platform="npm",
            status="inconclusive",
            confidence="low",
            source="npm-registry-search",
            url=url,
            http_status=None,
            checked_at=checked_at(),
            note=f"npm registry search failed: {error}",
        )

    if status == 200 and isinstance(data, dict) and data.get("total", 0) > 0:
        return NameResult(
            name=name,
            platform="npm",
            status="taken",
            confidence="medium",
            source="npm-registry-search",
            url=url,
            http_status=status,
            checked_at=checked_at(),
            note="npm registry search found public packages under this scope.",
        )

    return NameResult(
        name=name,
        platform="npm",
        status="inconclusive",
        confidence="low",
        source="npm-registry-search",
        url=url,
        http_status=status,
        checked_at=checked_at(),
        note="npm org page was blocked and registry search did not prove ownership.",
    )


def main() -> int:
    return run(
        "Bulk-check npm organization/scope name availability.",
        normalize_npm_org,
        check_npm_org,
    )


if __name__ == "__main__":
    raise SystemExit(main())
