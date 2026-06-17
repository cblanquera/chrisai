#!/usr/bin/env python3
"""Bulk domain/TLD checker using public RDAP lookups.

RDAP is a registration lookup protocol, not a registrar availability API.
This script reports a 404 RDAP response as "possibly_available" rather than
"available" because registry behavior and reservation rules vary by TLD.
"""

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
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


IANA_RDAP_BOOTSTRAP_URL = "https://data.iana.org/rdap/dns.json"
USER_AGENT = "chrisai-tld-finder/0.1"


@dataclass(frozen=True)
class DomainResult:
    domain: str
    tld: str
    status: str
    confidence: str
    source: str
    rdap_url: str
    http_status: int | None
    checked_at: str
    note: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Bulk-check domains across TLDs using public RDAP.",
    )
    input_group = parser.add_argument_group("input")
    input_group.add_argument(
        "--names",
        help="Comma-separated second-level names, such as acme,getacme,acmeai.",
    )
    input_group.add_argument(
        "--names-file",
        type=Path,
        help="File containing one second-level name per line.",
    )
    input_group.add_argument(
        "--tlds",
        help="Comma-separated TLDs, such as com,ai,io,dev.",
    )
    input_group.add_argument(
        "--tlds-file",
        type=Path,
        help="File containing one TLD per line.",
    )
    input_group.add_argument(
        "--domains",
        help="Comma-separated fully qualified domains to check directly.",
    )
    input_group.add_argument(
        "--domains-file",
        type=Path,
        help="File containing one fully qualified domain per line.",
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
        help="Maximum concurrent RDAP requests. Defaults to 4.",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="HTTP timeout in seconds. Defaults to 10.",
    )
    parser.add_argument(
        "--bootstrap-url",
        default=IANA_RDAP_BOOTSTRAP_URL,
        help="RDAP bootstrap JSON URL. Defaults to IANA's DNS bootstrap.",
    )
    return parser.parse_args()


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


def normalize_label(value: str) -> str:
    label = value.strip().lower()
    if label.startswith("."):
        label = label[1:]
    if not label:
        raise ValueError("empty label")
    return label.encode("idna").decode("ascii")


def normalize_domain(value: str) -> str:
    domain = value.strip().lower().rstrip(".")
    if "." not in domain:
        raise ValueError(f"{value!r} is not a fully qualified domain")
    labels = [normalize_label(label) for label in domain.split(".")]
    return ".".join(labels)


def build_domains(args: argparse.Namespace) -> list[str]:
    explicit_domains = split_items(args.domains) + read_lines(args.domains_file)
    names = split_items(args.names) + read_lines(args.names_file)
    tlds = split_items(args.tlds) + read_lines(args.tlds_file)

    domains: list[str] = []
    errors: list[str] = []

    for domain in explicit_domains:
        try:
            domains.append(normalize_domain(domain))
        except ValueError as error:
            errors.append(str(error))

    if names or tlds:
        if not names or not tlds:
            errors.append("--names/--names-file and --tlds/--tlds-file must be used together")
        for name in names:
            for tld in tlds:
                try:
                    domains.append(f"{normalize_label(name)}.{normalize_label(tld)}")
                except ValueError as error:
                    errors.append(str(error))

    if errors:
        raise SystemExit("Input error:\n- " + "\n- ".join(errors))
    if not domains:
        raise SystemExit("Provide --domains, --domains-file, or both --names and --tlds.")

    return sorted(set(domains))


def fetch_json(url: str, timeout: float) -> dict:
    request = Request(
        url,
        headers={
            "Accept": "application/json, application/rdap+json",
            "User-Agent": USER_AGENT,
        },
    )
    with urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def load_rdap_servers(bootstrap_url: str, timeout: float) -> dict[str, str]:
    data = fetch_json(bootstrap_url, timeout)
    servers: dict[str, str] = {}
    for service in data.get("services", []):
        if len(service) != 2:
            continue
        tlds, urls = service
        if not urls:
            continue
        for tld in tlds:
            servers[str(tld).lower()] = str(urls[0])
    return servers


def rdap_url_for(domain: str, servers: dict[str, str]) -> tuple[str, str | None]:
    tld = domain.rsplit(".", 1)[-1]
    base_url = servers.get(tld)
    if not base_url:
        return tld, None
    return tld, f"{base_url.rstrip('/')}/domain/{quote(domain)}"


def check_domain(domain: str, servers: dict[str, str], timeout: float) -> DomainResult:
    checked_at = datetime.now(timezone.utc).isoformat()
    tld, rdap_url = rdap_url_for(domain, servers)
    if not rdap_url:
        return DomainResult(
            domain=domain,
            tld=tld,
            status="inconclusive",
            confidence="low",
            source="rdap",
            rdap_url="",
            http_status=None,
            checked_at=checked_at,
            note="No RDAP server found for this TLD in the bootstrap data.",
        )

    request = Request(
        rdap_url,
        headers={
            "Accept": "application/rdap+json, application/json",
            "User-Agent": USER_AGENT,
        },
    )

    try:
        with urlopen(request, timeout=timeout) as response:
            response.read(1)
            return DomainResult(
                domain=domain,
                tld=tld,
                status="registered",
                confidence="high",
                source="rdap",
                rdap_url=rdap_url,
                http_status=response.status,
                checked_at=checked_at,
                note="RDAP returned a domain record.",
            )
    except HTTPError as error:
        if error.code == 404:
            return DomainResult(
                domain=domain,
                tld=tld,
                status="possibly_available",
                confidence="medium",
                source="rdap",
                rdap_url=rdap_url,
                http_status=error.code,
                checked_at=checked_at,
                note="RDAP returned not found; verify with a registrar before purchase.",
            )
        if error.code == 429:
            note = "RDAP server rate-limited the request."
        else:
            note = f"RDAP server returned HTTP {error.code}."
        return DomainResult(
            domain=domain,
            tld=tld,
            status="inconclusive",
            confidence="low",
            source="rdap",
            rdap_url=rdap_url,
            http_status=error.code,
            checked_at=checked_at,
            note=note,
        )
    except (TimeoutError, URLError) as error:
        return DomainResult(
            domain=domain,
            tld=tld,
            status="inconclusive",
            confidence="low",
            source="rdap",
            rdap_url=rdap_url,
            http_status=None,
            checked_at=checked_at,
            note=f"RDAP request failed: {error}",
        )


def check_domains(domains: Iterable[str], args: argparse.Namespace) -> list[DomainResult]:
    try:
        servers = load_rdap_servers(args.bootstrap_url, args.timeout)
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
        raise SystemExit(f"Unable to load RDAP bootstrap data: {error}") from error

    workers = max(1, args.workers)
    results: list[DomainResult] = []

    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {
            executor.submit(check_domain, domain, servers, args.timeout): domain
            for domain in domains
        }
        for future in as_completed(futures):
            results.append(future.result())

    return sorted(results, key=lambda result: result.domain)


def render_json(results: list[DomainResult]) -> str:
    payload = {
        "checkedAt": datetime.now(timezone.utc).isoformat(),
        "source": "rdap",
        "results": [asdict(result) for result in results],
    }
    return json.dumps(payload, indent=2, sort_keys=True) + "\n"


def render_csv(results: list[DomainResult]) -> str:
    fieldnames = list(asdict(results[0]).keys()) if results else list(DomainResult.__annotations__)
    from io import StringIO

    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    for result in results:
        writer.writerow(asdict(result))
    return output.getvalue()


def render_markdown(results: list[DomainResult]) -> str:
    lines = [
        "| Domain | Status | Confidence | HTTP | Note |",
        "| --- | --- | --- | --- | --- |",
    ]
    for result in results:
        http_status = "" if result.http_status is None else str(result.http_status)
        note = result.note.replace("|", "\\|")
        lines.append(
            f"| `{result.domain}` | `{result.status}` | `{result.confidence}` | "
            f"{http_status} | {note} |"
        )
    return "\n".join(lines) + "\n"


def render_results(results: list[DomainResult], output_format: str) -> str:
    if output_format == "json":
        return render_json(results)
    if output_format == "csv":
        return render_csv(results)
    return render_markdown(results)


def main() -> int:
    args = parse_args()
    start = time.monotonic()
    domains = build_domains(args)
    results = check_domains(domains, args)
    rendered = render_results(results, args.format)

    if args.out:
        args.out.write_text(rendered, encoding="utf-8")
    else:
        sys.stdout.write(rendered)

    elapsed = time.monotonic() - start
    print(f"Checked {len(results)} domains in {elapsed:.2f}s.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
