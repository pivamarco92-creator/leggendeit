# CLAUDE.md — Leggende d'Italia

RPG stile Pokémon Rosso ambientato in un'Italia moderna, con creature originali dal
**folklore italiano** (niente IP Nintendo). Phaser 3 via CDN, dati separati dal codice,
asset pixel-art procedurali. Tutto il testo di gioco è in **italiano**.

Stato attuale: **4 regioni** (Milano, Torino, Valle d'Aosta, Genova/Liguria), **26 mappe**,
**50 creature**. Si gioca aprendo `index.html` (serve internet per Phaser; asset in base64).

## Preferenze di lavoro (Marco)
- Partner critico: sfida le premesse, proponi alternative, dì se qualcosa è debole. (Vedi
  CLAUDE.md globale: approccio socratico per scelte complesse, esecuzione secca per task meccanici.)
- Risposte **concise**, in italiano. Niente preamboli inutili.
- Feature grosse: una alla volta; per blocchi onerosi proporre l'ordine e farsi confermare.
- **Verificare sempre** prima di dire "fatto" (vedi sezione Verifica).

## Architettura
```
index.html        shell, CSS, overlay UI, ordine degli <script>
data/   (SOLO dati: qui si aggiungono contenuti, niente logica)
  assets.js       PNG in base64 (GENERATO, non toccare a mano)
  types.js        TYPE_EFF (tabella efficacia) + typeMult()
  moves.js        MOVES (pow:0 + fx = mossa di stato)
  creatures.js    SPECIES, CREATURE_ORDER, makeMon/applyExp helpers, MAX_LEVEL=100
  items.js        ITEMS (heal | ball | rod | price) + SHOP_STOCK
  maps.js         MAPS (t2i + tiles ASCII + encounters/fish/items), SOLID, DELTA, PORTALS
  npcs.js         NPCS per mappa (x,y,frame,name, ev|lines, trainer, look/sight)
  regions.js      GYMS (palestre+fine-regione), WORLD_MAP (mappa+respawn+layout), AREA_LABELS, SECRET_AREAS
src/    (engine: di norma non si tocca per aggiungere contenuti)
  state.js        G (stato globale), save/load, dex, LEGENDARY_FLAG, BEATEN_VISIT, ROUTE_MAPS
  dialog.js       say()/ask() (overlay DOM), scrollSelIntoView
  world.js        WorldScene: tilemap, movimento, portali, NPC, item, interact, afterStep
  battlescene.js  BattleScene: solo presentazione (sprite/animazioni)
  battle.js       logica turni; B = stato battaglia; promptSwitch; cattura→deposito/box
  story.js        eventi: starter, Cosca, capipalestra (evGymLeader), trainer (LoS+rivincita),
                  negozio/laptop, pesca, leggendari, Johnny Lametta, whiteout, fine-regione
  menu.js         menù di pausa (SQUADRA/BORSA/MAPPA/PIVADEX/PROGRESSI/SALVA)
  box.js          laptop del deposito (sposta tra squadra e box)
  main.js         boot Phaser + input globale (dispatch per G.mode)
tools/  gen_assets.py · import_kenney.py · import_hexany.py · embed_assets.py
vendor/ pack CC0: kenney_tiny-town/ · hexany/ (Monster Menagerie)
```

`G.mode`: title | walk | dialog | choice | menu | laptop | battle | end. L'input globale
(onA/onB/onDir in main.js) smista in base a G.mode.

## Pipeline asset (eseguire SEMPRE in quest'ordine)
```
python3 tools/gen_assets.py && python3 tools/import_kenney.py \
  && python3 tools/import_hexany.py && python3 tools/embed_assets.py
```
- `gen_assets.py` genera tileset/creatures/chars e scrive `assets/.proc_count` (n. creature procedurali).
- `import_kenney.py` sovrappone i tile di Kenney (lascia intatti gli indici non coperti).
- `import_hexany.py` è **idempotente** grazie a `.proc_count` (riparte sempre dalle procedurali).
- `embed_assets.py` rigenera `data/assets.js`. Serve solo dopo modifiche AGLI ASSET (sprite/tile).
  Modifiche a sola logica/dati JS: nessuna pipeline.

### Regole sprite/tile (gotcha)
- Sprite creatura = 16×16 char-grid; **ogni riga ESATTAMENTE 16 char** (righe >16 fanno crashare PIL).
- `CREATURE_ORDER` (creatures.js) deve combaciare con `ORDER` di gen_assets: prima le procedurali
  nello stesso ordine, poi il blocco Hexany (6) in coda. Le nuove specie procedurali vanno
  aggiunte in coda alle procedurali (prima del blocco Hexany) in ENTRAMBI i file.
- `creatureFrame(id,back)` = indice in CREATURE_ORDER (+len se retro). Frame creatura ok se < CREATURE_ORDER.length.
- Tileset: indici in commento in cima a maps.js (0–21). chars.png: 0–7 player, 8–15 NPC, 16 item.

## Sistemi data-driven (come aggiungere contenuti)
- **Mappa**: voce in MAPS con `t2i` (char→indice tile), `tiles` (righe ASCII di **uguale lunghezza**),
  opz. `encounters`/`fish`/`items`. Char solidi in `SOLID`. Tutte le righe devono avere la stessa larghezza.
- **Portale**: `PORTALS[mapId][char] = {map,x,y,dir, lock?, msg?, heal?, arriveMsg?}`. Il punto di
  arrivo (x,y) **non deve essere SOLID** (sennò spawni in un muro — controllato nella verifica).
- **NPC**: `{x,y,frame:8-16,name, ev|lines}`. `ev` deve essere in STORY_EVENTS. Allenatori:
  `ev:'trainer'` + `trainer:{id,team:[[specie,lv]],pre,win,after}`. `look`+`sight` = line-of-sight
  (ti vede e ti sfida). Frame NPC 8–15.
- **Palestra**: `GYMS[mapId]` (leader, type, badge, region, team, challenge, intro, done, openers
  {good/bad/neutral}, win, loseMsg, end{...}, endAfterWin?). Capo = NPC `ev:'gymLeader'`; allievi
  `ev:'trainer'` (bloccano il capo finché non battuti, via flag `tr_<id>`). La schermata fine-regione
  (showRegionEnd) appare solo nella regione con `region` massimo.
- **Leggendario**: tile `'X'` nella mappa segreta + voce in `LEGEND_SPOTS` (story.js) map→funzione ev.
  Il flag "preso" (LEGENDARY_FLAG in state.js) scatta **solo alla cattura** (battle.js): se non lo
  catturi, torna disponibile.
- **Regione nuova** (schema consolidato): città + palestra(gymLeader) + ambulatorio (ev:'cura') +
  route (erba/incontri/allenatori a vista/oggetti/pesca) + area segreta (leggendario su 'X') +
  collegamento dalla regione precedente (in PORTALS, `lock` sul badge precedente). Aggiungere voci
  in WORLD_MAP (con `maps`, `respawn`, `layout`, `link`) e AREA_LABELS; le aree segrete in SECRET_AREAS.
- **Percorsi inter-regione** (stradapo/valico/appennino): mappe a piedi al posto del teletrasporto;
  i loro allenatori sono in `ROUTE_MAPS` → fanno **rivincita** crescente (BEATEN_VISIT azzerato al
  cambio mappa; livelli +3 per `rc_<id>`).
- **Evoluzione**: `evolve:{lv,to}` sulla base + nuova specie in SPECIES + sprite + voce CREATURE_ORDER + pipeline.

## Personaggi/eventi chiave già presenti
- Cosca Nazionale (organizzazione criminale, scelte morali). Edicola Milano = evento Cosca.
- **Johnny Lametta**: boss Cosca inevitabile alla 1ª visita di Torino/Aosta/Genova (JL_TOWNS in story.js),
  squadra scalata sul lv medio della tua (+2), flag `jl_<town>` solo su vittoria.
- Leggendari: STAMBÉCO (Aosta), SCIGHÉRA (Milano), TAURIN (Torino), BARRY (Aosta), GRIFONE (Genova).

## Verifica (sandbox, senza browser)
Sintassi: `for f in data/*.js src/*.js; do node --check "$f"; done`.
Logica/dati: caricare tutti gli script in un contesto `vm` con stub di document/window/Phaser/
localStorage (vedi pattern usato nelle sessioni: heredoc `cat > tools/_v.js <<'EOF' ... EOF` poi
`node tools/_v.js; rm`). Controlli tipici: larghezza mappe uniforme; ogni char in t2i; tile<22;
encounters/fish/items con specie/oggetti validi; **arrivi portali non SOLID**; ev NPC in STORY_EVENTS;
frame NPC 8–16; team allenatori con specie valide; CREATURE_ORDER allineato; evolve target esistenti;
LEGEND_SPOTS/flag. I file `tools/_*.js` sono temporanei: cancellarli a fine verifica
(se `rm` dà "Operation not permitted", usare il permesso di cancellazione della cartella).

## Note legali / stile
Creature, nomi e storia originali (folklore di pubblico dominio). Niente asset/nomi Nintendo:
il progetto è distribuibile. Pack di terze parti tutti CC0 (Kenney, Hexany).

## Backlog / prossime regioni
Fatte 5/20 regioni. La pipeline delle prossime (regioni 6–20: città, capopalestra, tipo,
proposte di leggendario/linea/tipi-nuovi, e la checklist passo-passo) è in **`ROADMAP.md`**.
La prossima è la **6 — Veneto / Venezia (Bepi, Acqua)**.
Altro: terzi stadi per le linee a 2 stadi; bilanciamento Johnny Lametta/palestre da testare giocando.
