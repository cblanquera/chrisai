#!/usr/bin/env python3
"""Create or inspect the deterministic DOCX used by Agent Workspace tests."""

from __future__ import annotations

import argparse
import html
import re
import zipfile
from pathlib import Path


CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>
  <Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>
</Types>
"""

PACKAGE_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
"""

DOCUMENT_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>
  <Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>
  <Relationship Id="rIdPortal" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="https://incident.example.test/report" TargetMode="External"/>
</Relationships>
"""

DOCUMENT_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t>Payroll Export Policy</w:t></w:r></w:p>
    <w:p><w:r><w:t>[DOC-CLAUSE-01] Contractors must delete exported payroll files within 24 hours.</w:t></w:r></w:p>
    <w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>[DOC-LIST-01] Obtain HR approval before downloading an export.</w:t></w:r></w:p>
    <w:p><w:pPr><w:numPr><w:ilvl w:val="1"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>Record the approving manager and ticket number.</w:t></w:r></w:p>
    <w:tbl>
      <w:tr><w:tc><w:p><w:r><w:t>Region</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>Retention</w:t></w:r></w:p></w:tc></w:tr>
      <w:tr><w:tc><w:p><w:r><w:t>[DOC-TABLE-01] APAC</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>Seven years</w:t></w:r></w:p></w:tc></w:tr>
    </w:tbl>
    <w:p><w:hyperlink r:id="rIdPortal"><w:r><w:t>[DOC-LINK-01] Incident reporting portal</w:t></w:r></w:hyperlink></w:p>
    <w:sectPr><w:headerReference w:type="default" r:id="rIdHeader"/><w:footerReference w:type="default" r:id="rIdFooter"/></w:sectPr>
  </w:body>
</w:document>
"""

HEADER_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>[DOC-HEADER-01] Confidential payroll operations</w:t></w:r></w:p></w:hdr>
"""

FOOTER_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:r><w:t>[DOC-FOOTER-01] Policy version 4.2</w:t></w:r></w:p></w:ftr>
"""


def write_part(archive: zipfile.ZipFile, name: str, content: str) -> None:
    info = zipfile.ZipInfo(name, date_time=(2024, 1, 1, 0, 0, 0))
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = 0o644 << 16
    archive.writestr(info, content.encode("utf-8"))


def create_docx(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path, "w") as archive:
        write_part(archive, "[Content_Types].xml", CONTENT_TYPES)
        write_part(archive, "_rels/.rels", PACKAGE_RELS)
        write_part(archive, "word/document.xml", DOCUMENT_XML)
        write_part(archive, "word/header1.xml", HEADER_XML)
        write_part(archive, "word/footer1.xml", FOOTER_XML)
        write_part(archive, "word/_rels/document.xml.rels", DOCUMENT_RELS)


def inspect_docx(path: Path) -> str:
    chunks: list[str] = []
    with zipfile.ZipFile(path) as archive:
        for name in sorted(archive.namelist()):
            if name.startswith("word/") and name.endswith(".xml"):
                xml = archive.read(name).decode("utf-8")
                text = re.sub(r"<[^>]+>", " ", xml)
                chunks.append(html.unescape(re.sub(r"\s+", " ", text)).strip())
        relationships = archive.read("word/_rels/document.xml.rels").decode("utf-8")
        chunks.extend(re.findall(r'Target="([^"]+)"', relationships))
    return "\n".join(chunks)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("create", "inspect"))
    parser.add_argument("path", type=Path)
    args = parser.parse_args()

    if args.mode == "create":
        create_docx(args.path)
    else:
        print(inspect_docx(args.path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
