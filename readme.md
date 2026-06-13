# Leggende d'Italia — Demo Milano (Phaser 3)

RPG open-world ispirato ai classici GameBoy, ambientato in un'Italia moderna dove le
creature del folklore italiano («Leggende») sono reali.
Demo: Regioni 1–3 di 20 (Milano, Torino e Valle d'Aosta, collegate da treno e bus).

Salvataggio automatico (localStorage): a ogni passo, battaglia ed evento.
Alla schermata del titolo: Continua / Nuova partita.

Menù di pausa (tasto B / ESC mentre cammini): SQUADRA (con riordino per scambio),
BORSA, PROGRESSI (medaglie, denaro, reputazione, conteggio Dex) e SALVA.
Negozio: a Milano c'è un NEGOZIO (edificio, porta a sud-est del centro) con il commesso e
il LAPTOP DEL DEPOSITO; in più l'edicola e i NEGOZIANTI di Torino/Aosta. Compri Ampolle e
curativi, e dalla voce «Laptop» (o dal laptop fisico) gestisci il DEPOSITO.
Le Leggende catturate oltre la 6a finiscono nel deposito (non si perdono): al laptop
sposti chi vuoi tra squadra e deposito.
Ogni battaglia frutta € (e Punti Esp.); in battaglia c'è la barra EXP sotto i PS.
Per arrivare al capopalestra devi prima battere tutti gli allievi della palestra.

Esplorazione: ogni regione ha lo stesso schema (route + area segreta + leggendario):
- MILANO: percorso dei NAVIGLI → DARSENA SEGRETA (leggendaria SCIGHÉRA).
- TORINO: MURAZZI DEL PO → SOTTERRANEI (leggendario TAURIN, il toro di bronzo).
- AOSTA: GRAN SAN BERNARDO → GROTTA DEL GELO (leggendario BARRY, il San Bernardo);
  più il santuario dello STAMBÉCO in città.
Le route hanno erba alta con incontri, allenatori «a vista» (line-of-sight) che ti
sfidano se incroci il loro sguardo, oggetti raccoglibili e punti di pesca nell'acqua.
Tutto è dati: `items[]`, `encounters[]`, `fish[]`, portali in data/maps.js; i leggendari
sono mappati in `LEGEND_SPOTS` (src/story.js) sul tile 'X'.

Sistema di crescita: livelli fino a 100, mosse apprese per livello (learnset,
max 4 — la più vecchia viene dimenticata), evoluzioni automatiche
(starter a 3 stadi). Ambulatori con cura gratuita a Milano e Torino (porta
con croce verde). Nelle palestre, allievi da battere prima del capopalestra.

Bestiario: 36 Leggende. Leggendari (incontro una-tantum al tile santuario): STAMBÉCO
(Gran Paradiso), SCIGHÉRA (Milano), TAURIN (Torino, Acciaio), BARRY (Aosta, Normale/Ghiaccio).
Tipo GHIACCIO con NEIÒT → BRINASSA. 6 specie usano sprite di Hexany's Monster Menagerie
(CC0). Attive negli incontri: CIVETTONA (Milano/Parco), BORDA e LUPOMANNARO
(Torino/Valentino; LUPOMANNARO anche ad Aosta). Riservate alle regioni future per
coerenza geografica: RATAPIGNATA (Liguria), SCULTONE (Sardegna), FARFARELLO (evento Cosca).

src/menu.js contiene il menù di pausa. I dialoghi dei capipalestra e le schermate di
fine-regione sono stati estratti in data/regions.js: aggiungere una palestra ora è solo
dati, non codice. In src/story.js restano gli eventi unici (Cosca, starter, archivio,
leggendario), che per natura non sono ripetitivi.

## Come si gioca

Doppio click su `index.html` (serve internet: Phaser arriva da CDN).
Se il browser blocca qualcosa, avvia un server locale dalla cartella del progetto:

    npx serve            # oppure: python3 -m http.server 8000

Controlli: frecce/WASD per muoversi · Z/INVIO/SPAZIO = A · X/ESC = B. Funziona anche touch.

## Struttura del progetto

    index.html        shell, CSS, UI overlay (dialoghi, scelte, battaglia), ordine script
    data/             SOLO dati — qui si aggiungono contenuti, niente codice
      assets.js       PNG in base64 (generato, non toccare a mano)
      types.js        tabella efficacia tipi
      moves.js        mosse
      creatures.js    le Leggende: stats, tipi, mosse, voce di bestiario
      items.js        oggetti
      maps.js         mappe ASCII + portali + incontri selvatici + oggetti (items[])
      npcs.js         NPC per mappa (posizione, sprite, dialoghi/eventi)
      regions.js      palestre (GYMS), schermate fine-regione e punti di respawn —
                      tutti i dialoghi dei capipalestra vivono qui, non nel codice
    src/              engine — di norma non serve toccarlo per aggiungere contenuti
      state.js        stato globale, exp/livelli, audio
      dialog.js       dialoghi e scelte (DOM)
      world.js        WorldScene: tilemap, movimento, NPC, erba alta
      battlescene.js  BattleScene: sprite e animazioni di battaglia
      battle.js       logica di battaglia a turni
      story.js        eventi narrativi: starter, Cosca, capipalestra, negozio, finali
      menu.js         menù di pausa (squadra/borsa/progressi/salva)
      box.js          laptop del deposito (sposta Leggende tra squadra e box)
      main.js         boot Phaser + input
    assets/           PNG sorgente (tileset, creature, personaggi) + _preview.png
    tools/
      gen_assets.py    rigenera i PNG ('programmer art' procedurale)
      import_kenney.py sovrappone i tile di Kenney Tiny Town (vendor/) ai procedurali
      import_hexany.py colorizza gli sprite di Hexany's Monster Menagerie (vendor/) e li
                       aggiunge in coda a creatures.png — l'ordine combacia con CREATURE_ORDER
      embed_assets.py  rigenera data/assets.js dai PNG
    vendor/            asset pack di terze parti, tutti CC0:
                       kenney_tiny-town/  · hexany/ (Monster Menagerie)

    Pipeline asset completa (eseguire SEMPRE in quest'ordine):
      python3 tools/gen_assets.py && python3 tools/import_kenney.py \
        && python3 tools/import_hexany.py && python3 tools/embed_assets.py

## Aggiungere una regione (Torino è il modello)

Torino è stata aggiunta toccando quasi solo dati — usala come riferimento:

1. `data/maps.js`: mappa ASCII + portali (con `lock`/`msg` per i blocchi narrativi,
   `heal`/`arriveMsg` per i viaggi) + tabella incontri
2. `data/npcs.js`: NPC della mappa. Il capopalestra usa `ev:'gymLeader'` (generico);
   gli allievi `ev:'trainer'` con `team`/`pre`/`win`/`after`
3. `data/regions.js`: voce in `GYMS['<mappa-palestra>']` (capopalestra, tipo, squadra,
   dialoghi, schermata fine-regione) + eventuale punto di respawn in `RESPAWN`
4. `data/creatures.js`: nuove Leggende in `SPECIES` + `CREATURE_ORDER`
5. `data/types.js` / `data/moves.js`: eventuali nuovi tipi e mosse (es. Ghiaccio)
6. `tools/gen_assets.py`: sprite delle nuove creature ed eventuali nuovi tile, poi
   la pipeline asset completa
7. `src/story.js`: SOLO per eventi narrativi unici (es. un evento Cosca, un leggendario).
   Palestre e fine-regione NON richiedono codice nuovo: bastano i dati al punto 3

## Migliorare la grafica (budget 0€)

Gli asset attuali sono generati proceduralmente. Per un salto di qualità sostituiscili
con pack gratuiti (licenza CC0) mantenendo dimensioni e ordine dei frame:

- `assets/tileset.png` — 18 tile da 16×16 in fila (vedi indici in `data/maps.js`)
- `assets/creatures.png` — griglia 32×32: riga 0 fronte, riga 1 retro, colonne = `CREATURE_ORDER`
- `assets/chars.png` — frame 16×16: 0–7 player (giù/su/sx/dx × 2), 8+ NPC

Fonti consigliate: kenney.nl, opengameart.org, itch.io (cerca "free 16x16 tileset rpg CC0").
Dopo ogni modifica: `python3 tools/embed_assets.py`.

## Passare a Tiled (mappe visuali)

Quando le mappe ASCII diventano strette: crea la mappa in [Tiled](https://www.mapeditor.org)
(gratuito) usando `assets/tileset.png`, esporta in JSON e caricala con
`this.load.tilemapTiledJSON(...)` al posto di `make.tilemap({data})` in `src/world.js`.
Conviene fare il salto quando inizi ad avere più layer (terreno/decorazioni/sopra-testa).

## Nota legale

Creature, nomi e storia sono originali (folklore italiano di pubblico dominio):
nessun asset o nome Nintendo/Game Freak. Il progetto è distribuibile.

## altre integrazioni

il menù dove salvare, vedere gli oggetti e le proprie creature dove ordinarle, vedere i progressi.
vedere i progressi di exp sotto la barra della vita durante i combattimenti. 
nn poter skippare direttamente al capo palestra senza prima affrontare gli altri scagnozzi presenti.
