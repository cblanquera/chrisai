#!/usr/bin/env python3

"""Run preview commands with explicit localhost bindings and optional pre-steps."""

from pathlib import Path
import argparse
import os
import subprocess
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cwd", required=True)
    parser.add_argument("--command", required=True)
    parser.add_argument("--pre", action="append", default=[])
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default="4173")
    return parser.parse_args()


def run_command(command: str, cwd: Path, env: dict[str, str], wait: bool) -> int:
    process = subprocess.Popen(command, cwd=cwd, env=env, shell=True)
    if not wait:
        return 0
    try:
        return process.wait()
    except KeyboardInterrupt:
        process.terminate()
        process.wait()
        return 130


def main() -> int:
    args = parse_args()
    cwd = Path(args.cwd).resolve()
    env = os.environ.copy()
    env["HOST"] = args.host
    env["PORT"] = args.port

    for command in args.pre:
        code = run_command(command, cwd, env, wait=True)
        if code != 0:
            return code

    return run_command(args.command, cwd, env, wait=True)


if __name__ == "__main__":
    sys.exit(main())
