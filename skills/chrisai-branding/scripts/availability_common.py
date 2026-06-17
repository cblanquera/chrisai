"""Shared helpers for ChrisAI branding availability scripts."""

from __future__ import annotations

import argparse
import csv
import json
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable, Iterable
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


USER_AGENT = "chrisai-branding-availability/0.1"


@dataclass(frozen=True)
class NameResult:
    name: str
    platform: str
    status: str
    confidence: str
    source: str
    url: str
    http_status: int | None
    checked_at: str
    note: str


def checked_at() -> str:
    return datetime.now(timezone.utc).isoformat()


def split_items(value: str | None) -> list[str]:
    if not value:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


def read_lines(path: Path | None) -> list[str]:
    if path is None:
        return []
    return [
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]


def parse_common_args(description: str) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=description)
    input_group = parser.add_argument_group("input")
    input_group.add_argument(
        "--names",
        help="Comma-separated names to check.",
    )
    input_group.add_argument(
        "--names-file",
        type=Path,
        help="File containing one name per line.",
    )
    parser.add_argument(
        "--format",
        choices=("json", "csv", "md"),
        default="md",
        help="Output format. Defaults to markdown.",
    )
    parser.add_argument(
        "--out",
        type=Path,
        help="Write results to this file instead of stdout.",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=4,
        help="Maximum concurrent requests. Defaults to 4.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="HTTP timeout in seconds. Defaults to 10.",
    )
    return parser.parse_args()


def collect_names(args: argparse.Namespace, normalize: Callable[[str], str]) -> list[str]:
    names = split_items(args.names) + read_lines(args.names_file)
    if not names:
        raise SystemExit("Provide --names or --names-file.")

    normalized: list[str] = []
    errors: list[str] = []
    for name in names:
        try:
            normalized.append(normalize(name))
        except ValueError as error:
            errors.append(str(error))

    if errors:
        raise SystemExit("Input error:\n- " + "\n- ".join(errors))
    return sorted(set(normalized))


def fetch_status(
    url: str,
    timeout: float,
    headers: dict[str, str] | None = None,
    method: str = "GET",
) -> tuple[int, bytes]:
    request_headers = {
        "Accept": "application/json, text/html;q=0.9, */*;q=0.8",
        "User-Agent": USER_AGENT,
    }
    if headers:
        request_headers.update(headers)
    request = Request(url, headers=request_headers, method=method)
    try:
        with urlopen(request, timeout=timeout) as response:
            return response.status, response.read()
    except HTTPError as error:
        return error.code, error.read()
    except (TimeoutError, URLError) as error:
        raise RuntimeError(str(error)) from error


def fetch_json(
    url: str,
    timeout: float,
    headers: dict[str, str] | None = None,
) -> tuple[int, dict]:
    status, body = fetch_status(url, timeout, headers=headers)
    if not body:
        return status, {}
    try:
        return status, json.loads(body.decode("utf-8"))
    except json.JSONDecodeError:
        return status, {}


def check_names(
    names: Iterable[str],
    args: argparse.Namespace,
    checker: Callable[[str, float], NameResult],
) -> list[NameResult]:
    workers = max(1, args.workers)
    results: list[NameResult] = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {
            executor.submit(checker, name, args.timeout): name
            for name in names
        }
        for future in as_completed(futures):
            results.append(future.result())
    return sorted(results, key=lambda result: result.name)


def render_json(results: list[NameResult]) -> str:
    payload = {
        "checkedAt": checked_at(),
        "results": [asdict(result) for result in results],
    }
    return json.dumps(payload, indent=2, sort_keys=True) + "\n"


def render_csv(results: list[NameResult]) -> str:
    fieldnames = list(asdict(results[0]).keys()) if results else list(NameResult.__annotations__)
    from io import StringIO

    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    for result in results:
        writer.writerow(asdict(result))
    return output.getvalue()


def render_markdown(results: list[NameResult]) -> str:
    lines = [
        "| Name | Platform | Status | Confidence | HTTP | Note |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for result in results:
        http_status = "" if result.http_status is None else str(result.http_status)
        note = result.note.replace("|", "\\|")
        lines.append(
            f"| `{result.name}` | `{result.platform}` | `{result.status}` | "
            f"`{result.confidence}` | {http_status} | {note} |"
        )
    return "\n".join(lines) + "\n"


def render_results(results: list[NameResult], output_format: str) -> str:
    if output_format == "json":
        return render_json(results)
    if output_format == "csv":
        return render_csv(results)
    return render_markdown(results)


def run(
    description: str,
    normalize: Callable[[str], str],
    checker: Callable[[str, float], NameResult],
) -> int:
    args = parse_common_args(description)
    start = time.monotonic()
    names = collect_names(args, normalize)
    results = check_names(names, args, checker)
    rendered = render_results(results, args.format)

    if args.out:
        args.out.write_text(rendered, encoding="utf-8")
    else:
        sys.stdout.write(rendered)

    elapsed = time.monotonic() - start
    print(f"Checked {len(results)} names in {elapsed:.2f}s.", file=sys.stderr)
    return 0
