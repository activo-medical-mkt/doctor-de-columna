"""Inline the CSS the first screen needs and load the full stylesheets without blocking the first paint.

For each page below, every render-blocking /Assets/css/ stylesheet in <head> becomes
    <link rel="stylesheet" href="..." media="print" onload="__cssIn()" onerror="__cssIn()" data-critical-async />
(a tiny inline loader switches them all to media="all" together once the last one has loaded)
and a <style id="critical-css"> block placed before them holds the rules that can match the first screen:
everything in <body> before <main> (header, mobile menu), the first two sections of <main> (hero and the
section under it), the WhatsApp widget, class names the page's own scripts add at runtime, and every rule
without a class, id or tag (:root variables, *, html/body). @font-face is always kept, @keyframes only when used.

The full stylesheets keep their original positions, so once they load the cascade is exactly what it was
before: the inline block only decides what the first paint looks like. A <noscript> copy of the links covers
visitors without JavaScript.

Selector matching is deliberately loose (attribute selectors and :is()/:not()/:has() contents are ignored),
so it can include too much but not too little. Re-run after changing CSS or the head of these pages; the
pre-commit hook does it automatically. Standard library only.

    python tools/build_critical_css.py            # rebuild the default pages
    python tools/build_critical_css.py --check    # exit 1 if any page is out of date
"""
from __future__ import annotations

import html.parser
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "doctor-de-columna"
PAGES = ["index.html", "tijuana/index.html", "guadalajara/index.html", "rosarito/index.html"]
# Class names written by the page's own scripts (header menus, reveal/3D states...) count as first-screen
# classes, since a script can add them before the full stylesheets arrive.
SCRIPT_RE = re.compile(r'<script[^>]*src="/(Assets/js/[^"?]+\.js)')
MAIN_SECTIONS = 2

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
LINK_RE = re.compile(r'(?<!<noscript>)<link rel="stylesheet" href="(/Assets/css/[^"]+)"(?: media="print" onload="[^"]*"(?: onerror="[^"]*")? data-critical-async)? ?/?>\n?')
LOADER_RE = re.compile(r'<script id="critical-css-loader">.*?</script>\n?', re.S)
# Switch every deferred stylesheet on in the same frame once the last one has arrived (or after 3 s), so the
# page is restyled once instead of once per file: each restyle of this page is a long main-thread task.
LOADER = ('<script id="critical-css-loader">(function(){var n=%d,d=0;function on(){if(d)return;d=1;'
          'document.querySelectorAll("link[data-critical-async]").forEach(function(l){l.media="all"})}'
          'window.__cssIn=function(){if(--n<=0)on()};setTimeout(on,3000)})();</script>\n')
STYLE_RE = re.compile(r'<style id="critical-css">.*?</style>\n?', re.S)
NOSCRIPT_RE = re.compile(r'<noscript id="critical-css-noscript">.*?</noscript>\n?', re.S)


# --------------------------------------------------------------------------- first-screen tokens
class Region(html.parser.HTMLParser):
    """Collects tags, classes and ids of the elements that can show on the first screen."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags, self.classes, self.ids = {"html", "body"}, set(), set()
        self.depth = 0
        self.in_body = self.main_started = self.main_done = False
        self.main_depth = None
        self.main_children = 0
        self.capture_until = None  # depth at which a captured subtree (e.g. #wa-widget) ends

    def _take(self, tag, attrs):
        self.tags.add(tag)
        a = dict(attrs)
        self.classes.update((a.get("class") or "").split())
        if a.get("id"):
            self.ids.add(a["id"])

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("html", "body"):
            self._take(tag, attrs)
            self.in_body = self.in_body or tag == "body"
            return
        void = tag in VOID
        depth = self.depth + (0 if void else 1)
        take = False
        if self.in_body and not self.main_started:
            take = tag != "main"
        if tag == "main" and not self.main_started:
            self.main_started, self.main_depth = True, depth
            self._take(tag, attrs)
        elif self.main_started and not self.main_done and self.main_depth is not None:
            if depth == self.main_depth + 1:
                self.main_children += 1
            if self.main_children and self.main_children <= MAIN_SECTIONS:
                take = True
        if a.get("id") == "wa-widget" and self.capture_until is None:
            self.capture_until = depth - 1
        if self.capture_until is not None:
            take = True
        if take:
            self._take(tag, attrs)
        if not void:
            self.depth = depth

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.depth -= 1

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        self.depth -= 1
        if tag == "main" and self.main_depth is not None and self.depth < self.main_depth:
            self.main_done = True
        if self.capture_until is not None and self.depth <= self.capture_until:
            self.capture_until = None


def runtime_classes(text: str) -> set[str]:
    found = set()
    for m in re.finditer(r'class=\\?"([^"\\]+)', text):
        found.update(m.group(1).split())
    for m in re.finditer(r"class=\\?'([^'\\]+)", text):
        found.update(m.group(1).split())
    for m in re.finditer(r"classList\.(?:add|toggle|remove)\('([\w-]+)'", text):
        found.add(m.group(1))
    for m in re.finditer(r"className\s*=\s*'([^']+)'", text):
        found.update(m.group(1).split())
    return {c for c in found if re.fullmatch(r"[\w-]+", c)}


# --------------------------------------------------------------------------- CSS parsing
def strip_comments(css: str) -> str:
    out, i, n = [], 0, len(css)
    while i < n:
        c = css[i]
        if c in "\"'":
            j = i + 1
            while j < n and css[j] != c:
                j += 2 if css[j] == "\\" else 1
            out.append(css[i:j + 1]); i = j + 1
        elif css.startswith("/*", i):
            j = css.find("*/", i + 2)
            i = n if j < 0 else j + 2
        else:
            out.append(c); i += 1
    return "".join(out)


def parse_blocks(css: str):
    """Yield (prelude, body) for each top-level block, or (statement, None) for `@x ...;`."""
    i, n = 0, len(css)
    while i < n:
        while i < n and css[i] in " \t\r\n;":
            i += 1
        if i >= n:
            break
        j = i
        quote = None
        while j < n:
            c = css[j]
            if quote:
                if c == "\\":
                    j += 1
                elif c == quote:
                    quote = None
            elif c in "\"'":
                quote = c
            elif c in "{;":
                break
            j += 1
        if j >= n:
            break
        prelude = css[i:j].strip()
        if css[j] == ";":
            yield prelude, None
            i = j + 1
            continue
        depth, k, quote = 1, j + 1, None
        while k < n and depth:
            c = css[k]
            if quote:
                if c == "\\":
                    k += 1
                elif c == quote:
                    quote = None
            elif c in "\"'":
                quote = c
            elif c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
            k += 1
        yield prelude, css[j + 1:k - 1]
        i = k


def split_top(text: str, sep: str = ",") -> list[str]:
    parts, depth, cur = [], 0, []
    for c in text:
        if c in "([":
            depth += 1
        elif c in ")]":
            depth -= 1
        if c == sep and depth == 0:
            parts.append("".join(cur)); cur = []
        else:
            cur.append(c)
    parts.append("".join(cur))
    return [p.strip() for p in parts if p.strip()]


def remove_functional(sel: str) -> str:
    """Drop [attr] selectors and :fn(...) pseudo-classes (contents included)."""
    out, i, n = [], 0, len(sel)
    while i < n:
        c = sel[i]
        if c == "[":
            depth = 1; i += 1
            while i < n and depth:
                depth += {"[": 1, "]": -1}.get(sel[i], 0); i += 1
            continue
        if c == ":":
            m = re.match(r"::?[\w-]+", sel[i:])
            if m:
                i += m.end()
                if i < n and sel[i] == "(":
                    depth = 1; i += 1
                    while i < n and depth:
                        depth += {"(": 1, ")": -1}.get(sel[i], 0); i += 1
                continue
        out.append(c); i += 1
    return "".join(out)


def selector_matches(sel: str, tags, classes, ids) -> bool:
    s = remove_functional(sel)
    for cls in re.findall(r"\.(-?[_a-zA-Z][\w-]*)", s):
        if cls not in classes:
            return False
    for i in re.findall(r"#(-?[_a-zA-Z][\w-]*)", s):
        if i not in ids:
            return False
    for compound in re.split(r"[\s>+~]+", s):
        m = re.match(r"([a-zA-Z][\w-]*)", compound)
        if m and m.group(1).lower() not in tags:
            return False
    return True


def minify(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s*([{};])\s*", r"\1", text)
    return text.replace(";}", "}")


def minify_body(body: str) -> str:
    body = minify(body)
    return re.sub(r"(^|;)\s*([-\w]+)\s*:\s*", r"\1\2:", body).rstrip(";")


def critical_rules(css: str, tags, classes, ids, keyframes_out: dict, used_names: set) -> str:
    out = []
    for prelude, body in parse_blocks(css):
        if body is None:
            continue  # @charset / @import: none in this project
        p = prelude.lower()
        if p.startswith(("@media", "@supports")):
            inner = critical_rules(body, tags, classes, ids, keyframes_out, used_names)
            if inner:
                out.append(minify(prelude) + "{" + inner + "}")
        elif p.startswith("@font-face"):
            out.append("@font-face{" + minify_body(body) + "}")
        elif p.startswith(("@keyframes", "@-webkit-keyframes")):
            name = prelude.split(None, 1)[1].strip()
            keyframes_out.setdefault(name, minify(prelude) + "{" + minify(body) + "}")
        elif p.startswith("@"):
            continue
        else:
            if any(selector_matches(s, tags, classes, ids) for s in split_top(prelude)):
                decl = minify_body(body)
                out.append(minify(prelude).replace(", ", ",") + "{" + decl + "}")
                for m in re.finditer(r"animation(?:-name)?\s*:([^;]+)", body):
                    used_names.update(re.findall(r"[-\w]+", m.group(1)))
    return "".join(out)


# --------------------------------------------------------------------------- page rewrite
def build(page: Path) -> str:
    src = page.read_text(encoding="utf-8")
    head_end = src.index("</head>")
    head = STYLE_RE.sub("", src[:head_end])
    head = NOSCRIPT_RE.sub("", head)
    head = LOADER_RE.sub("", head)
    links = LINK_RE.findall(head)
    if not links:
        raise SystemExit(f"{page}: no /Assets/css/ stylesheets found in <head>")

    region = Region()
    region.feed(src)
    classes = region.classes
    for rel in sorted(set(SCRIPT_RE.findall(src))):
        classes |= runtime_classes((ROOT / rel).read_text(encoding="utf-8"))

    parts, keyframes, used = [], {}, set()
    for href in links:
        path = ROOT / href.split("?")[0].lstrip("/")
        css = strip_comments(path.read_text(encoding="utf-8-sig"))  # some files start with a BOM
        parts.append(critical_rules(css, region.tags, classes, region.ids, keyframes, used))
    parts.append("".join(v for k, v in keyframes.items() if k in used))
    critical = "".join(parts)

    # Rebuild <head> (old block/noscript already dropped): re-emit the links as async in the same place.
    first = LINK_RE.search(head)
    before, rest = head[:first.start()], head[first.start():]
    m_last = None
    for m_last in LINK_RE.finditer(rest):
        pass
    links_block = rest[:m_last.end()]
    after = rest[m_last.end():]
    async_links = LINK_RE.sub(
        lambda m: f'<link rel="stylesheet" href="{m.group(1)}" media="print" onload="__cssIn()" onerror="__cssIn()" data-critical-async />\n',
        links_block)
    noscript = ('<noscript id="critical-css-noscript">'
                + "".join(f'<link rel="stylesheet" href="{h}" />' for h in links) + "</noscript>\n")
    style = f'<style id="critical-css">{critical}</style>\n'
    return before + style + LOADER % len(links) + async_links + noscript + after + src[head_end:]


def main(argv: list[str]) -> int:
    check = "--check" in argv
    stale = 0
    for rel in PAGES:
        page = ROOT / rel
        new = build(page)
        old = page.read_text(encoding="utf-8")
        if new != old:
            stale += 1
            if check:
                print(f"out of date: doctor-de-columna/{rel}")
            else:
                page.write_text(new, encoding="utf-8", newline="")
                print(f"changed: doctor-de-columna/{rel}")
    if check and stale:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
