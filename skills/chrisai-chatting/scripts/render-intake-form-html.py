#!/usr/bin/env python3
"""Render a skill intake schema into a local HTML form artifact."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import sys
import tempfile
from pathlib import Path
from typing import Any, Iterable


FIELD_TYPES = {
    "text",
    "textarea",
    "radio",
    "select",
    "checkbox",
    "url",
    "date",
    "number",
    "email",
}


def slugify(value: str, fallback: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip()).strip("-").lower()
    return slug or fallback


def load_schema(path: str | None) -> dict[str, Any]:
    raw = Path(path).read_text(encoding="utf-8") if path else sys.stdin.read()
    schema = json.loads(raw)
    if not isinstance(schema, dict):
        raise ValueError("Schema must be a JSON object.")
    return normalize_schema(schema)


def normalize_options(options: Any) -> list[dict[str, str]]:
    if not isinstance(options, list):
        return []
    normalized: list[dict[str, str]] = []
    for index, option in enumerate(options, start=1):
        if isinstance(option, dict):
            label = str(option.get("label") or option.get("value") or f"Option {index}")
            value = str(option.get("value") or label)
        else:
            label = str(option)
            value = label
        normalized.append({"label": label, "value": value})
    return normalized


def normalize_schema(schema: dict[str, Any]) -> dict[str, Any]:
    title = str(schema.get("title") or "Intake Form")
    questions = schema.get("questions")
    if not isinstance(questions, list) or not questions:
        raise ValueError("Schema must include a non-empty questions array.")

    normalized_questions: list[dict[str, Any]] = []
    used_ids: set[str] = set()
    for index, question in enumerate(questions, start=1):
        if not isinstance(question, dict):
            raise ValueError(f"Question {index} must be an object.")

        label = str(question.get("label") or question.get("question") or f"Question {index}")
        field_id = slugify(str(question.get("id") or label), f"question-{index}")
        base_id = field_id
        suffix = 2
        while field_id in used_ids:
            field_id = f"{base_id}-{suffix}"
            suffix += 1
        used_ids.add(field_id)

        field_type = str(question.get("type") or "text").lower()
        if field_type not in FIELD_TYPES:
            field_type = "text"
        options = normalize_options(question.get("options"))
        if field_type in {"radio", "select", "checkbox"} and not options:
            field_type = "text"

        normalized_questions.append(
            {
                "id": field_id,
                "label": label,
                "type": field_type,
                "required": bool(question.get("required")),
                "help": str(question.get("help") or question.get("description") or ""),
                "placeholder": str(question.get("placeholder") or ""),
                "options": options,
            }
        )

    normalized = {
        "title": title,
        "source_skill": str(schema.get("source_skill") or ""),
        "source_workflow": str(schema.get("source_workflow") or ""),
        "description": str(schema.get("description") or ""),
        "questions": normalized_questions,
    }
    return normalized


def json_attr(value: Any) -> str:
    return html.escape(json.dumps(value, ensure_ascii=False), quote=True)


def render_input(question: dict[str, Any]) -> str:
    qid = html.escape(question["id"], quote=True)
    label = html.escape(question["label"])
    required = " required" if question["required"] else ""
    placeholder = html.escape(question["placeholder"], quote=True)
    help_text = html.escape(question["help"])
    field_type = question["type"]
    described_by = f' aria-describedby="{qid}-help"' if help_text else ""

    parts = [f'<section class="field" data-field="{qid}">']
    parts.append(f'<label class="field-label" for="{qid}">{label}</label>')
    if help_text:
        parts.append(f'<p class="field-help" id="{qid}-help">{help_text}</p>')

    if field_type == "textarea":
        parts.append(
            f'<textarea id="{qid}" name="{qid}" rows="5" placeholder="{placeholder}"'
            f"{required}{described_by}></textarea>"
        )
    elif field_type == "select":
        parts.append(f'<select id="{qid}" name="{qid}"{required}{described_by}>')
        parts.append('<option value="">Select an option</option>')
        for option in question["options"]:
            value = html.escape(option["value"], quote=True)
            option_label = html.escape(option["label"])
            parts.append(f'<option value="{value}">{option_label}</option>')
        parts.append("</select>")
    elif field_type in {"radio", "checkbox"}:
        parts.append(f'<div class="choice-group" role="group" aria-labelledby="{qid}-legend">')
        parts.append(f'<div class="sr-only" id="{qid}-legend">{label}</div>')
        for index, option in enumerate(question["options"], start=1):
            value = html.escape(option["value"], quote=True)
            option_label = html.escape(option["label"])
            input_id = f"{qid}-{index}"
            option_required = required if field_type == "radio" and index == 1 else ""
            parts.append(
                '<label class="choice">'
                f'<input id="{input_id}" type="{field_type}" name="{qid}" value="{value}"{option_required}>'
                f"<span>{option_label}</span>"
                "</label>"
            )
        parts.append("</div>")
    else:
        input_type = field_type if field_type in {"url", "date", "number", "email"} else "text"
        parts.append(
            f'<input id="{qid}" name="{qid}" type="{input_type}" placeholder="{placeholder}"'
            f"{required}{described_by}>"
        )

    parts.append("</section>")
    return "\n".join(parts)


def build_document(schema: dict[str, Any]) -> str:
    title = html.escape(schema["title"])
    description = html.escape(schema["description"])
    generated = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    source_bits = [value for value in [schema["source_skill"], schema["source_workflow"]] if value]
    source = html.escape(" / ".join(source_bits) or "Chat intake")
    fields_html = "\n".join(render_input(question) for question in schema["questions"])
    schema_json = json_attr(schema)

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <style>
    :root {{
      color-scheme: light;
      --bg: #f5f7fb;
      --surface: #ffffff;
      --text: #172033;
      --muted: #5f6878;
      --line: #d8dee8;
      --accent: #2563eb;
      --accent-soft: #eaf1ff;
      --danger: #b42318;
      --code-bg: #111827;
      --code-text: #e5edf8;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
    }}
    main {{
      width: min(100%, 980px);
      margin: 0 auto;
      padding: 32px 20px 48px;
    }}
    .shell {{
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 8px;
      box-shadow: 0 16px 40px rgba(23, 32, 51, 0.08);
      overflow: hidden;
    }}
    header {{
      padding: clamp(24px, 4vw, 40px);
      border-bottom: 1px solid var(--line);
    }}
    .eyebrow {{
      margin: 0 0 8px;
      color: var(--muted);
      font-size: 0.875rem;
    }}
    h1 {{
      margin: 0;
      font-size: clamp(1.7rem, 3vw, 2.5rem);
      line-height: 1.15;
      letter-spacing: 0;
    }}
    .description {{
      max-width: 70ch;
      margin: 12px 0 0;
      color: var(--muted);
    }}
    form, .result {{
      padding: clamp(20px, 4vw, 40px);
    }}
    .field {{
      margin: 0 0 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--line);
    }}
    .field-label {{
      display: block;
      margin-bottom: 8px;
      font-weight: 700;
    }}
    .field-help {{
      margin: 0 0 10px;
      color: var(--muted);
      font-size: 0.94rem;
    }}
    input[type="text"], input[type="url"], input[type="date"], input[type="number"], input[type="email"],
    select, textarea {{
      width: 100%;
      border: 1px solid #cbd5e1;
      border-radius: 7px;
      color: var(--text);
      font: inherit;
      padding: 10px 12px;
    }}
    textarea {{ resize: vertical; }}
    .choice-group {{
      display: grid;
      gap: 8px;
    }}
    .choice {{
      display: flex;
      align-items: flex-start;
      gap: 10px;
      border: 1px solid #d9e0eb;
      border-radius: 7px;
      padding: 10px 12px;
    }}
    .choice input {{ margin-top: 0.25rem; }}
    .actions {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
    }}
    button {{
      border: 0;
      border-radius: 7px;
      background: var(--accent);
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 10px 14px;
    }}
    button.secondary {{
      background: var(--accent-soft);
      color: #174ea6;
    }}
    .error {{
      color: var(--danger);
      font-weight: 700;
    }}
    .result {{
      display: none;
      border-top: 1px solid var(--line);
      background: #fbfcff;
    }}
    .result.active {{ display: block; }}
    .result h2 {{
      margin: 0 0 12px;
      font-size: 1.25rem;
    }}
    pre {{
      overflow-x: auto;
      margin: 12px 0 20px;
      border-radius: 8px;
      background: var(--code-bg);
      color: var(--code-text);
      padding: 16px;
      white-space: pre;
    }}
    .sr-only {{
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }}
    @media (max-width: 720px) {{
      main {{ padding: 12px; }}
      form, .result, header {{ padding: 20px 16px; }}
      .actions {{ align-items: stretch; flex-direction: column; }}
      button {{ width: 100%; }}
    }}
  </style>
</head>
<body>
  <main>
    <article class="shell">
      <header>
        <p class="eyebrow">{source} · Generated {generated}</p>
        <h1>{title}</h1>
        <p class="description">{description or "Complete this local intake form, then submit it to produce a copyable response."}</p>
      </header>
      <form id="intake-form" data-schema="{schema_json}">
        {fields_html}
        <div class="actions">
          <button type="submit">Submit intake</button>
          <button class="secondary" type="reset">Reset</button>
          <span class="error" id="form-error" role="alert"></span>
        </div>
      </form>
      <section class="result" id="result">
        <h2>Copy this response back into chat</h2>
        <div class="actions">
          <button class="secondary" type="button" id="copy-response">Copy Response</button>
          <span class="error" id="copy-status" role="status"></span>
        </div>
        <pre id="response-output"></pre>
      </section>
    </article>
  </main>
  <script>
    const form = document.getElementById("intake-form");
    const schema = JSON.parse(form.dataset.schema);
    const result = document.getElementById("result");
    const error = document.getElementById("form-error");
    const copyStatus = document.getElementById("copy-status");
    const responseOutput = document.getElementById("response-output");

    function valuesForQuestion(question, data) {{
      const values = data.getAll(question.id).filter((value) => String(value).trim() !== "");
      if (question.type === "checkbox") return values;
      return values.length ? values[0] : "";
    }}

    function collectResponse() {{
      const data = new FormData(form);
      const answers = {{}};
      const fields = [];
      for (const question of schema.questions) {{
        const value = valuesForQuestion(question, data);
        answers[question.id] = value;
        fields.push({{
          id: question.id,
          label: question.label,
          type: question.type,
          required: Boolean(question.required),
          value
        }});
      }}
      return {{
        title: schema.title,
        source_skill: schema.source_skill || "",
        source_workflow: schema.source_workflow || "",
        submitted_at: new Date().toISOString(),
        answers,
        fields
      }};
    }}

    function toRawText(response) {{
      const lines = [`Intake response: ${{response.title}}`, `Submitted: ${{response.submitted_at}}`, ""];
      for (const field of response.fields) {{
        const raw = Array.isArray(field.value) ? field.value.join(", ") : field.value;
        lines.push(field.label, raw || "No answer provided.", "");
      }}
      return lines.join("\\n").trim();
    }}

    async function showResponse(response) {{
      const rawText = toRawText(response);
      responseOutput.textContent = rawText;
      result.classList.add("active");
      result.scrollIntoView({{ behavior: "smooth", block: "start" }});
      if (await copyText(rawText, false)) {{
        copyStatus.textContent = "Copied. Paste it back into chat.";
      }} else {{
        copyStatus.textContent = "Copy failed. Select the text below and paste it back into chat.";
        selectResponseText();
      }}
    }}

    function selectResponseText() {{
      const range = document.createRange();
      range.selectNodeContents(responseOutput);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }}

    function fallbackCopy(text) {{
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-1000px";
      document.body.appendChild(textarea);
      textarea.select();
      let copied = false;
      try {{
        copied = document.execCommand("copy");
      }} catch (err) {{
        copied = false;
      }}
      document.body.removeChild(textarea);
      return copied;
    }}

    async function copyText(text, showPrompt = true) {{
      try {{
        if (navigator.clipboard && window.isSecureContext) {{
          await navigator.clipboard.writeText(text);
          return true;
        }}
      }} catch (err) {{
        // Fall through to the older copy path below.
      }}
      if (fallbackCopy(text)) return true;
      if (showPrompt) window.prompt("Copy this text:", text);
      return false;
    }}

    document.getElementById("copy-response").addEventListener("click", async () => {{
      if (await copyText(responseOutput.textContent)) {{
        copyStatus.textContent = "Copied. Paste it back into chat.";
      }} else {{
        copyStatus.textContent = "Copy failed. Select the text below and paste it back into chat.";
        selectResponseText();
      }}
    }});

    form.addEventListener("submit", (event) => {{
      event.preventDefault();
      error.textContent = "";
      if (!form.reportValidity()) return;
      showResponse(collectResponse());
    }});
  </script>
</body>
</html>
"""


def preview_output_path(output_path: str | None, preview_dir: str, filename: str) -> Path:
    if output_path:
        return Path(output_path)
    safe_name = Path(filename).name or "intake-form.html"
    if not safe_name.lower().endswith((".html", ".htm")):
        safe_name = f"{safe_name}.html"
    return Path(preview_dir) / safe_name


def write_document(document: str, output_path: str | None) -> None:
    if output_path:
        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(document, encoding="utf-8")
        return
    sys.stdout.write(document)


def main(argv: Iterable[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--schema", help="Intake schema JSON path. Defaults to stdin.")
    parser.add_argument("--output", help="HTML output path. Defaults to stdout.")
    parser.add_argument("--preview-file", action="store_true", help="Write HTML to a preview file and print its file:// URL.")
    parser.add_argument(
        "--preview-dir",
        default=str(Path(tempfile.gettempdir()) / "chrisai-intake-form"),
        help="Directory used with --preview-file when --output is not provided.",
    )
    parser.add_argument("--filename", default="intake-form.html", help="Preview filename.")
    args = parser.parse_args(argv)

    schema = load_schema(args.schema)
    document = build_document(schema)
    if args.preview_file:
        output = preview_output_path(args.output, args.preview_dir, args.filename)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(document, encoding="utf-8")
        print(output.resolve().as_uri())
        return 0

    write_document(document, args.output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
