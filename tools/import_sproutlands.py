#!/usr/bin/env python3
"""
Sovrascrive i tile "da città/natura" del tileset con Sprout Lands (CC0, Cup Nooble):
suolo, erba, erba alta, alberi, acqua, edificio, porte, sentiero. Aggiunge anche 3 tile
decorativi nuovi (22 fiori, 23 cespuglio, 24 girasole).

Lascia intatti i tile NON coperti da Sprout (monumenti italiani: duomo 8, edicola 11,
Mole 16, portici 17; uscita 12; interni 13/14; neve 19; montagna 20; laptop 21) — quelli
restano come da gen_assets / import_kenney.

Va eseguito DOPO gen_assets.py e import_kenney.py (sovrascrive i tile città di Kenney),
PRIMA di import_hexany/import_tiny/embed.

Pipeline: gen_assets -> import_kenney -> import_sproutlands -> import_hexany -> import_tiny -> embed
"""
import os
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')
SP = os.path.join(ROOT, 'vendor', 'Sprout Lands')
OUT = os.path.join(ROOT, 'assets', 'tileset.png')
T = 16
NEW_MAX = 25   # estende il tileset a 25 tile (0..24): 22-24 = decorazioni nuove

if not os.path.isdir(SP):
    raise SystemExit('Pack Sprout Lands non trovato: ' + SP)

_cache = {}
def sheet(rel):
    if rel not in _cache:
        _cache[rel] = Image.open(os.path.join(SP, rel)).convert('RGBA')
    return _cache[rel]

def G(rel, col, row):
    return sheet(rel).crop((col*T, row*T, col*T + T, row*T + T))

def over(bg, top):
    out = bg.copy(); out.alpha_composite(top); return out

def tint(im, mul):
    out = Image.new('RGBA', im.size)
    px, opx = im.load(), out.load()
    for y in range(T):
        for x in range(T):
            r, g, b, a = px[x, y]
            opx[x, y] = (min(255,int(r*mul[0])), min(255,int(g*mul[1])), min(255,int(b*mul[2])), a)
    return out

GRASS   = G('Tilesets/Grass.png', 6, 1)            # erba piena
TALL    = G('Tilesets/Grass.png', 3, 5)            # erba con ciuffi (erba alta)
FLOWERS = G('Tilesets/Grass.png', 5, 5)            # erba fiorita
WATER_A = G('Tilesets/Water.png', 0, 0)
WATER_B = G('Tilesets/Water.png', 2, 0)
DIRT    = G('Tilesets/Tilled_Dirt.png', 1, 5)      # terra battuta piena
DIRT2   = G('Tilesets/Tilled_Dirt.png', 0, 5)
DIRT3   = G('Tilesets/Tilled_Dirt.png', 2, 5)
ROOF    = G('Tilesets/Wooden_House_Roof_Tilset.png', 4, 2)   # tetto/edificio pieno
WALLW   = G('Tilesets/Wooden_House_Walls_Tilset.png', 1, 0)  # muro in legno
DOOR    = G('Tilesets/Doors.png', 0, 0)            # porta chiusa
TREE    = G('Objects/Basic_Grass_Biom_things.png', 1, 1)     # albero compatto
BUSH    = G('Objects/Basic_Grass_Biom_things.png', 0, 0)     # cespuglio
SUN     = G('Objects/Basic_Grass_Biom_things.png', 8, 2)     # girasole

def amb_door():
    d_im = over(WALLW, DOOR).copy()
    d = ImageDraw.Draw(d_im)
    d.rectangle([6, 1, 9, 2], fill=(40, 150, 70, 255))   # croce verde
    d.rectangle([7, 0, 8, 3], fill=(40, 150, 70, 255))
    return d_im

TILES = {
    0:  DIRT,                       # strada
    1:  DIRT2,                      # piazza
    2:  GRASS,                      # prato
    3:  TALL,                       # erba alta
    4:  over(GRASS, TREE),          # albero
    5:  WATER_A,                    # acqua A
    6:  WATER_B,                    # acqua B
    7:  ROOF,                       # palazzo/edificio
    9:  over(WALLW, DOOR),          # porta lab
    10: tint(over(WALLW, DOOR), (1.2, 1.02, 0.55)),  # porta palestra (dorata)
    15: DIRT3,                      # sentiero
    18: amb_door(),                 # porta ambulatorio (+ croce verde)
    22: over(GRASS, FLOWERS),       # NEW: fiori
    23: over(GRASS, BUSH),          # NEW: cespuglio
    24: over(GRASS, SUN),           # NEW: girasole
}

base = Image.open(OUT).convert('RGBA')
if base.width < NEW_MAX * T:
    nb = Image.new('RGBA', (NEW_MAX * T, T), (0, 0, 0, 0))
    nb.alpha_composite(base, (0, 0)); base = nb

for idx, tile in TILES.items():
    base.paste((0, 0, 0, 0), (idx*T, 0, idx*T + T, T))
    base.alpha_composite(tile.convert('RGBA'), (idx*T, 0))

base.save(OUT)
print('OK: tileset Sprout Lands applicato (%d tile, +3 decorazioni 22-24)' % (base.width // T))
