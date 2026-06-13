#!/usr/bin/env python3
"""
Compone assets/tileset.png mescolando Kenney Tiny Town (CC0) con i tile
procedurali per ciò che il pack non copre (acqua, erba alta, landmark italiani).

Uso:
  1. metti il pack estratto in vendor/kenney_tiny-town/
  2. python3 tools/gen_assets.py        (genera la base procedurale)
  3. python3 tools/import_kenney.py     (sovrascrive i tile coperti da Kenney)
  4. python3 tools/embed_assets.py
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
SHEET = os.path.join(ROOT, 'vendor', 'kenney_tiny-town', 'Tilemap', 'tilemap_packed.png')
OUT = os.path.join(ROOT, 'assets', 'tileset.png')
T = 16

if not os.path.exists(SHEET):
    raise SystemExit('Pack non trovato: ' + SHEET)

kt = Image.open(SHEET).convert('RGBA')
def K(i):
    r, c = divmod(i, 12)
    return kt.crop((c*T, r*T, c*T + T, r*T + T))

def on(base, top):
    out = base.copy(); out.alpha_composite(top); return out

def tint(im, mul):
    out = Image.new('RGBA', im.size)
    for y in range(T):
        for x in range(T):
            r, g, b, a = im.getpixel((x, y))
            out.putpixel((x, y), (min(255, int(r*mul[0])), min(255, int(g*mul[1])),
                                  min(255, int(b*mul[2])), a))
    return out

GRASS = K(0)

# nostro indice -> tile Kenney composto
def build():
    tiles = {}
    tiles[0]  = K(109)                 # strada: lastricato grigio
    tiles[1]  = K(25)                  # piazza: terra battuta chiara
    tiles[2]  = GRASS                  # prato
    tiles[4]  = on(GRASS, K(5))        # albero tondo su prato
    tiles[7]  = K(73)                  # palazzo: muro con finestra
    tiles[9]  = K(85)                  # porta lab (legno)
    tiles[10] = tint(K(85), (1.25, 1.05, 0.45))   # porta palestra dorata
    tiles[14] = K(77)                  # muro interno con finestra
    tiles[15] = on(GRASS, K(40))       # sentiero su prato
    tiles[17] = K(113)                 # portici: arcata in pietra
    # porta ambulatorio: porta Kenney + croce verde
    amb = K(85).copy()
    d = ImageDraw.Draw(amb)
    d.rectangle([6, 1, 9, 2], fill=(40, 150, 70, 255))
    d.rectangle([7, 0, 8, 3], fill=(40, 150, 70, 255))
    tiles[18] = amb
    return tiles

base = Image.open(OUT).convert('RGBA')
n = base.width // T
for idx, tile in build().items():
    if idx < n:
        base.paste((0, 0, 0, 0), (idx*T, 0, idx*T + T, T))
        base.alpha_composite(tile, (idx*T, 0))
base.save(OUT)
print('OK: tileset ibrido Kenney+procedurale salvato (%d tile)' % n)
