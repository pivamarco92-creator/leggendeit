#!/usr/bin/env python3
"""
DISABILITATO. Gli sprite "tiny-creatures" erano 16x16 scalati a 32x32: in battaglia
Phaser li ingrandisce ancora (scale 3), quindi apparivano sgranati (pixel 6x). Tutte le
creature sono ora coperte da Hexany (32x32 nativi) in import_hexany.py.

Questo file resta come no-op per non rompere eventuali script/pipeline che lo richiamano.
NON va incluso nella pipeline.
"""
print('import_tiny.py: DISABILITATO (creature ora da Hexany 32x32). Nessuna azione.')
