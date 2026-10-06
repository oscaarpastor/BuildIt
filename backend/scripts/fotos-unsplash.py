#!/usr/bin/env python3
"""Buscar y revisar fotos de Unsplash para el contenido de ejemplo de las plantillas.

  python3 scripts/fotos-unsplash.py buscar "hair salon" hoja.jpg [--n 24] [--orientacion landscape|portrait|squarish]
  python3 scripts/fotos-unsplash.py hoja hoja.jpg photo-1517248135467-4c7edcad34c4 photo-...

"buscar" lista las fotos gratuitas (licencia Unsplash) de una búsqueda con su
descripción y "hoja" comprueba que cada id existe (HTTP 200). Las dos generan una
hoja de contactos numerada para elegir a ojo; las que no existen salen en rojo.
Nunca se usan las fotos "premium_photo-…": son de pago (Unsplash+).

En la plantilla: https://images.unsplash.com/<id>?auto=format&fit=crop&q=75
(el render añade el ancho y el srcset).
Necesita Pillow (python3 -m pip install pillow).
"""
import io
import json
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image, ImageDraw

W, H, COLS = 300, 210, 4
# La búsqueda rechaza agentes de navegador sin sesión; con uno de línea de comandos responde
UA = {"User-Agent": "curl/8.4.0", "Accept": "*/*"}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=25) as r:
        return r.read()


def search(query, n, orientation):
    params = {"query": query, "per_page": min(n, 30)}
    if orientation:
        params["orientation"] = orientation
    data = json.loads(get("https://unsplash.com/napi/search/photos?" + urllib.parse.urlencode(params)))
    out = []
    for r in data.get("results", []):
        pid = r["urls"]["raw"].split("?")[0].rsplit("/", 1)[-1]
        if not pid.startswith("photo-") or r.get("premium") or r.get("plus"):
            continue  # de pago
        out.append((pid, (r.get("alt_description") or r.get("description") or "")[:90]))
    return out


def thumb(pid):
    url = f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w={W * 2}&h={H * 2}&q=50"
    try:
        return Image.open(io.BytesIO(get(url))).convert("RGB").resize((W, H))
    except Exception:  # noqa: BLE001
        return None


def sheet(out, ids):
    with ThreadPoolExecutor(8) as pool:
        images = list(pool.map(thumb, ids))
    rows = (len(ids) + COLS - 1) // COLS
    canvas = Image.new("RGB", (COLS * W, max(1, rows) * (H + 22)), "white")
    draw = ImageDraw.Draw(canvas)
    for i, (pid, im) in enumerate(zip(ids, images)):
        x, y = (i % COLS) * W, (i // COLS) * (H + 22)
        if im:
            canvas.paste(im, (x, y + 22))
        else:
            draw.rectangle([x, y + 22, x + W - 1, y + 22 + H - 1], fill="#c00")
        draw.text((x + 4, y + 4), f"{i}: {pid[6:32]}", fill="black")
    canvas.save(out, quality=80)
    return images


def main():
    if len(sys.argv) < 4 or sys.argv[1] not in ("buscar", "hoja"):
        print(__doc__)
        sys.exit(1)
    mode, a, b, rest = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
    if mode == "buscar":
        n = int(rest[rest.index("--n") + 1]) if "--n" in rest else 24
        orientation = rest[rest.index("--orientacion") + 1] if "--orientacion" in rest else ""
        found = search(a, n, orientation)
        sheet(b, [pid for pid, _ in found])
        for i, (pid, alt) in enumerate(found):
            print(f"{i}\t{pid}\t{alt}")
    else:
        ids = [b] + rest
        images = sheet(a, ids)
        for i, (pid, im) in enumerate(zip(ids, images)):
            print(f"{i}\t{'OK ' if im else 'NO EXISTE'}\t{pid}")


if __name__ == "__main__":
    main()
