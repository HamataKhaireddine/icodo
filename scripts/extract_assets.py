import base64
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(os.path.dirname(ROOT), "codo_portfolio.html")
if not os.path.isfile(HTML):
    HTML = r"C:\Users\Aymen\Downloads\codo_portfolio.html"

s = open(HTML, encoding="utf-8", errors="replace").read()

m = re.search(r'data:image/jpeg;base64,([^"]+)', s)
if m:
    out = os.path.join(ROOT, "public", "codo-logo.png")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, "wb").write(base64.b64decode(m.group(1)))
    print("logo", out, os.path.getsize(out))

m2 = re.search(r"<svg[^>]*>\s*<defs>.*?</defs>\s*</svg>", s, re.DOTALL)
if m2:
    inner = os.path.join(ROOT, "src", "icon-sprite-raw.svg")
    open(inner, "w", encoding="utf-8").write(m2.group(0))
    print("sprite", inner, len(m2.group(0)))
