#!/usr/bin/env python3
"""Validate structured data and essential generated homepage behavior."""

from html.parser import HTMLParser
import json
import os
from pathlib import Path
import sys
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"
ERRORS = []


class HtmlAudit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.duplicate_ids = set()
        self.links = []
        self.images_without_alt = []
        self.unnamed_links = []
        self.title = ""
        self.title_depth = 0
        self.language = None
        self.main_count = 0
        self.h1_count = 0
        self.canonicals = []
        self.jsonld_blocks = []
        self.jsonld_buffer = None
        self.anchor_stack = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "html":
            self.language = attrs.get("lang")
        if tag == "main":
            self.main_count += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_depth += 1
        if "id" in attrs:
            if attrs["id"] in self.ids:
                self.duplicate_ids.add(attrs["id"])
            self.ids.add(attrs["id"])
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonicals.append(attrs.get("href", ""))
        if tag in ("a", "link", "img", "script"):
            attribute = "src" if tag in ("img", "script") else "href"
            value = attrs.get(attribute)
            if value:
                self.links.append((tag, value))
        if tag == "img" and "alt" not in attrs:
            self.images_without_alt.append(attrs.get("src", "(unknown image)"))
        if tag == "a":
            self.anchor_stack.append(
                {
                    "hidden": attrs.get("aria-hidden") == "true",
                    "named": bool(attrs.get("aria-label") or attrs.get("title")),
                    "text": [],
                    "image_name": False,
                }
            )
        elif tag == "img" and attrs.get("alt"):
            for anchor in self.anchor_stack:
                anchor["image_name"] = True
        if tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self.jsonld_buffer = []

    def handle_startendtag(self, tag, attributes):
        self.handle_starttag(tag, attributes)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.title_depth:
            self.title += data
        for anchor in self.anchor_stack:
            anchor["text"].append(data)
        if self.jsonld_buffer is not None:
            self.jsonld_buffer.append(data)

    def handle_endtag(self, tag):
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
        if tag == "a" and self.anchor_stack:
            anchor = self.anchor_stack.pop()
            if (
                not anchor["hidden"]
                and not anchor["named"]
                and not anchor["image_name"]
                and not "".join(anchor["text"]).strip()
            ):
                self.unnamed_links.append("anchor without an accessible name")
        if tag == "script" and self.jsonld_buffer is not None:
            self.jsonld_blocks.append("".join(self.jsonld_buffer))
            self.jsonld_buffer = None


def report(message):
    ERRORS.append(message)


def resolve_local_target(source_file, href):
    parsed = urlsplit(href)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if path.startswith("/"):
        candidate = SITE / path.lstrip("/")
    elif path:
        candidate = source_file.parent / path
    else:
        candidate = source_file

    candidates = [candidate]
    if candidate.is_dir() or not candidate.suffix:
        candidates.extend((candidate / "index.html", candidate.with_suffix(".html")))
    return next((item for item in candidates if item.exists()), None)


def validate_json_sources():
    excluded = {".git", "_site", "node_modules", ".jekyll-cache", ".sass-cache"}
    for directory, subdirectories, filenames in os.walk(ROOT):
        subdirectories[:] = [name for name in subdirectories if name not in excluded]
        for filename in filenames:
            if not filename.endswith(".json"):
                continue
            path = Path(directory) / filename
            try:
                json.loads(path.read_text(encoding="utf-8"))
            except (OSError, UnicodeError, json.JSONDecodeError) as error:
                report(f"{path.relative_to(ROOT)}: invalid JSON ({error})")


def validate_generated_html():
    html_files = list(SITE.rglob("*.html"))
    if not html_files:
        report("No generated HTML files found; run the Jekyll build first.")
        return

    for path in html_files:
        try:
            audit = HtmlAudit()
            audit.feed(path.read_text(encoding="utf-8"))
            audit.close()
        except (OSError, UnicodeError) as error:
            report(f"{path.relative_to(SITE)}: could not read HTML ({error})")
            continue
        relative_path = path.relative_to(SITE)
        if not audit.title.strip():
            report(f"{relative_path}: no document title.")
        if not audit.language:
            report(f"{relative_path}: no document language.")
        if audit.duplicate_ids:
            report(f"{relative_path}: duplicate IDs {sorted(audit.duplicate_ids)}")
        if audit.images_without_alt:
            report(f"{relative_path}: images missing alt attributes {audit.images_without_alt}")
        if audit.unnamed_links:
            report(f"{relative_path}: unnamed links {audit.unnamed_links}")
        for block in audit.jsonld_blocks:
            try:
                json.loads(block)
            except json.JSONDecodeError as error:
                report(f"{path.relative_to(SITE)}: invalid JSON-LD ({error})")

    homepage = SITE / "index.html"
    if not homepage.is_file():
        report("Generated homepage _site/index.html is missing.")
        return

    audit = HtmlAudit()
    audit.feed(homepage.read_text(encoding="utf-8"))
    audit.close()
    if not audit.title.strip():
        report("Generated homepage has no document title.")
    if not audit.language:
        report("Generated homepage does not declare a document language.")
    if audit.main_count != 1:
        report(f"Generated homepage should have one main landmark, found {audit.main_count}.")
    if audit.h1_count != 1:
        report(f"Generated homepage should have one h1, found {audit.h1_count}.")
    if len(audit.canonicals) != 1 or not audit.canonicals[0].startswith("https://"):
        report("Generated homepage must have one HTTPS canonical URL.")
    for tag, href in audit.links:
        target = resolve_local_target(homepage, href)
        if target is None:
            continue
        if not target.exists():
            report(f"Homepage {tag} target does not exist: {href}")
            continue
        fragment = urlsplit(href).fragment
        if fragment and target == homepage and unquote(fragment) not in audit.ids:
            report(f"Homepage fragment target does not exist: {href}")


def main():
    if not SITE.is_dir():
        report("Generated site directory _site is missing; run the Jekyll build first.")
    else:
        validate_json_sources()
        validate_generated_html()

    if ERRORS:
        print("\n".join(f"ERROR: {error}" for error in ERRORS), file=sys.stderr)
        return 1
    print("Site validation passed: JSON, JSON-LD, homepage semantics, and local targets.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
