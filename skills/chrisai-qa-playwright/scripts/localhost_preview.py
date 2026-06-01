#!/usr/bin/env python3

"""Run preview commands with explicit localhost bindings and optional pre-steps."""

from pathlib import Path
import argparse
import os
import signal
import subprocess
import sys


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cwd", required=True)
    parser.add_argument("--command", required=True)
    parser.add_argument("--pre", action="append", default=[])
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default="4173")
    parser.add_argument("--timeout-minutes", type=float, default=15.0)
    return parser.parse_args()


def terminate_process(process: subprocess.Popen) -> None:
    if process.poll() is not None:
        return

    if os.name == "nt":
        process.terminate()
    else:
        os.killpg(process.pid, signal.SIGTERM)

    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        if os.name == "nt":
            process.kill()
        else:
            os.killpg(process.pid, signal.SIGKILL)
        process.wait()


def run_command(command: str, cwd: Path, env: dict[str, str], wait: bool) -> int:
    process = subprocess.Popen(
        command,
        cwd=cwd,
        env=env,
        shell=True,
        start_new_session=os.name != "nt",
    )
    if not wait:
        return 0
    try:
        return process.wait()
    except KeyboardInterrupt:
        terminate_process(process)
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

    process = subprocess.Popen(
        args.command,
        cwd=cwd,
        env=env,
        shell=True,
        start_new_session=os.name != "nt",
    )
    try:
        return process.wait(timeout=args.timeout_minutes * 60)
    except subprocess.TimeoutExpired:
        terminate_process(process)
        print(
            f"Preview timeout reached after {args.timeout_minutes:g} minutes; "
            "stopped agent-owned server.",
            file=sys.stderr,
        )
        return 124
    except KeyboardInterrupt:
        terminate_process(process)
        return 130


if __name__ == "__main__":
    sys.exit(main())
