#!/usr/bin/env python3
"""
Incorpora i PNG di assets/ in data/assets.js come data-URI base64.
Serve per giocare aprendo index.html direttamente (file://), senza server.
Esegui dopo ogni modifica agli asset:  python3 tools/embed_assets.py
"""
import base64, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')

def b64(name):
    with open(os.path.join(ROOT, 'assets', name), 'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode()

out = ("/* GENERATO da tools/embed_assets.py — non modificare a mano. */\n"
       "const ASSETS_B64 = {\n"
       f"  tileset: '{b64('tileset.png')}',\n"
       f"  creatures: '{b64('creatures.png')}',\n"
       f"  chars: '{b64('chars.png')}'\n"
       "};\n")
with open(os.path.join(ROOT, 'data', 'assets.js'), 'w') as f:
    f.write(out)
print('OK: data/assets.js aggiornato')
