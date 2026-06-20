# ROADMAP — Leggende d'Italia

Stato: **11 / 20 regioni** fatte. Schema, pipeline e verifica sono in `CLAUDE.md` (leggerlo prima).
Questa roadmap dice **cosa** costruire; CLAUDE.md dice **come**.
Prossima da fare: **12 — Lazio / Roma (Sor Alvaro, Drago — tipo NEW)**.
Tipi già implementati: Normale, Fuoco, Acqua, Erba, Elettro, Volante, Coleottero, Veleno,
Acciaio, Ghiaccio, Roccia, Spettro, Vento, Psico, **Terra**. Ancora da fare: Drago, Luce, Oscurità.
Extra fatto: **"I tre soci"** (Pivòt/Faccìn/Licàt) — 3 linee speciali con quest dedicate.

## Le 20 regioni (dal concept originale)
✓ = fatta. Tipi tra parentesi; (NEW) = tipo da implementare la prima volta che serve.

| # | Regione | Città | Capopalestra | Tipo | Stato |
|---|---------|-------|--------------|------|-------|
| 1 | Lombardia | Milano | Carletto | Normale | ✓ |
| 2 | Piemonte | Torino | Gianduiotto | Acciaio | ✓ |
| 3 | Valle d'Aosta | Aosta | Felicino | Ghiaccio | ✓ |
| 4 | Liguria | Genova | Barbagialla | Acqua | ✓ |
| 5 | Trentino-A.A. | Bolzano | Hans | Ghiaccio/Roccia | ✓ |
| 6 | Veneto | Venezia | Bepi | Acqua | ✓ |
| 7 | Friuli-V.G. | Trieste | Gigio | Vento | ✓ |
| 8 | Emilia-Romagna | Bologna | Dindo | Fuoco | ✓ |
| 9 | Toscana | Firenze | Checcone | Psico | ✓ |
| 10 | Umbria | Perugia | Quirino | Terra | ✓ |
| 11 | Marche | Ancona | Guerrino | Volante | ✓ |
| 12 | Lazio | Roma | Sor Alvaro | Drago (NEW) | da fare |
| 13 | Abruzzo | L'Aquila | Carmine | Roccia | da fare |
| 14 | Molise | Campobasso | ??? | Spettro | da fare (gym nascosta) |
| 15 | Campania | Napoli | Ciruzzo | Fuoco | da fare |
| 16 | Puglia | Bari | Mimmo | Luce (NEW) | da fare |
| 17 | Basilicata | Potenza | Rocchino | Terra | da fare |
| 18 | Calabria | Reggio C. | Carmelo | Veleno | da fare |
| 19 | Sicilia | Palermo | Totò | Oscurità (NEW) | da fare |
| 20 | Sardegna | Cagliari | Antiogu | Psico/Roccia | da fare |

L'ultima regione costruita è sempre quella "finale" (mostra la schermata fine-contenuti);
le precedenti diventano intermedie in automatico (logica in `gymLeaderWin`/`showRegionEnd`).

## Proposte di folklore per regione (leggendario + linea + collegamento)
Una alla volta. Connettere SEMPRE dalla regione precedente (lock sul badge precedente).
Nomi/idee modificabili; sono suggerimenti per restare nel folklore italiano.

- **6 Veneto / Venezia (Bepi, Acqua)** — leggendario: **LEON DE SAN MARCO** (il leone alato, Acqua/Volante).
  Linea nuova: **MAZARIOL** (folletto rosso veneto) → evo. Route: laguna/barene. Segreta: i sotterranei di una calle.
- **7 Friuli / Trieste (Gigio, Vento NEW)** — leggendario: **BORA** (lo spirito del vento di Trieste, Vento).
  Tipo Vento: super-eff. vs Erba/Coleottero/Lotta(assente); resistito da Acciaio/Roccia/Elettro. Mosse: raffica, ciclone.
  Linea nuova: **CJALCJUT** (incubo friulano) → evo.
- **8 Emilia-Romagna / Bologna (Dindo, Fuoco)** — leggendario: **AL DIÂL** (il diavolo delle torri, Fuoco/Spettro).
  Linea: riusa Fuoco esistente o **BORDA/MAZAPÉGUL** (già romagnoli). Route: via Emilia, portici.
- **9 Toscana / Firenze (Checcone, Psico NEW)** — leggendario: **BUFFARDELLO** è già toscano; meglio **LA BERTA** o uno spirito etrusco (Psico).
  Tipo Psico: super-eff. vs Veleno/Lotta(assente); debole a Spettro/Coleottero. Mosse: psicoraggio, ipnosi.
- **10 Umbria / Perugia (Quirino, Terra NEW)** — leggendario: **LUPO DI GUBBIO** (Terra/Normale, San Francesco).
  Tipo Terra: super-eff. vs Fuoco/Elettro/Veleno/Roccia/Acciaio; immune a Elettro; debole a Acqua/Erba/Ghiaccio. Mosse: terremoto, fango.
- **11 Marche / Ancona (Guerrino, Volante)** — leggendario: **SIBILLA APPENNINICA** (Volante/Psico).
- **12 Lazio / Roma (Sor Alvaro, Drago NEW)** — leggendario: **DRAGO DELLE CATACOMBE** (Drago).
  Tipo Drago: super-eff. vs Drago; debole a Ghiaccio/Drago. Mosse: dragobotta, furiadrago. **HQ finale Cosca: sotto un monumento romano** (per la trama).
- **13 Abruzzo / L'Aquila (Carmine, Roccia)** — leggendario: **MAZZAMURELLO** o il gigante del Gran Sasso (Roccia).
- **14 Molise / Campobasso (Spettro)** — **gym NASCOSTA**: si sblocca con una catena di missioni («il Molise non esiste»). Leggendario fantasma.
- **15 Campania / Napoli (Ciruzzo, Fuoco)** — leggendario: del Vesuvio/Campi Flegrei (Fuoco). **MUNACIELLO** è già napoletano (riusa la linea).
- **16 Puglia / Bari (Mimmo, Luce NEW)** — leggendario: **SOLE DI LECCE** o **SCAZZAMURIELLO** (Luce).
  Tipo Luce: super-eff. vs Spettro/Oscurità; debole a... (definire). Mosse: bagliore, raggio.
- **17 Basilicata / Potenza (Rocchino, Terra)** — leggendario: **MONACHICCHIO** (folletto lucano) o spirito dei Sassi.
- **18 Calabria / Reggio C. (Carmelo, Veleno)** — leggendario: **FATA MORGANA** (il miraggio dello Stretto, Acqua/Spettro o Veleno).
- **19 Sicilia / Palermo (Totò, Oscurità NEW)** — leggendario: **COLAPESCE** (regge la Sicilia sott'acqua, Acqua/Oscurità).
  Tipo Oscurità: super-eff. vs Spettro/Psico; debole a Coleottero/Luce. Mosse: sgambetto, boccone.
- **20 Sardegna / Cagliari (Antiogu, Psico/Roccia)** — leggendario: **JANAS** (le fate dei nuraghi) o **MAIMONE**. **SCULTONE/BASILISCU** sono già sardi (riusa).

## Tipi ancora da implementare (alla prima regione che li usa)
Vento, Psico, Terra, Drago, Luce, Oscurità. Per ognuno: aggiungere la riga in `TYPE_EFF`
(attaccante) + le voci difensive negli altri tipi, e 2 mosse in `moves.js`. (Vedi come è stato
fatto Roccia per il Trentino: una riga attaccante + `Roccia:val` sparse negli altri + 2 mosse.)

## Checklist per aggiungere UNA regione (ordine consigliato)
1. (se serve un tipo nuovo) `data/types.js`: riga attaccante + voci difensive; `data/moves.js`: 2 mosse.
2. `data/creatures.js`: 1 linea comune (2 stadi, con `evolve`) + 1 leggendario; aggiungere gli id a
   `CREATURE_ORDER` **nel blocco procedurale** (prima del blocco Hexany).
3. `tools/gen_assets.py`: gli sprite delle nuove creature (righe 16×16, ESATTAMENTE 16 char),
   **nello stesso ordine** di CREATURE_ORDER. Poi pipeline completa (gen→kenney→hexany→embed).
4. `data/maps.js`: 5 mappe — città, gym (interno), ambulatorio (interno), 1 route, 1 area segreta
   con tile `'X'` per il leggendario — + 1 route inter-regione dalla regione precedente. Righe ASCII
   tutte di **uguale lunghezza** (generarle con uno script python come in passato). Aggiungere i
   `PORTALS` (arrivi NON su tile SOLID; lock sul badge precedente sulla route in avanti).
5. `data/npcs.js`: capo `ev:'gymLeader'` + 2 allievi `ev:'trainer'` (look/sight); commesso `ev:'negozio'`;
   dottoressa `ev:'cura'`; 3 grunt Cosca a vista per ogni route; flavor + custode dell'area segreta.
6. `data/regions.js`: voce `GYMS['<gym>']` (region = n+1, team, dialoghi, end con next→regione dopo);
   voce `WORLD_MAP` (maps, layout, respawn, link); `AREA_LABELS`; `SECRET_AREAS` += area segreta.
   La route inter-regione va nei `maps` della regione PRECEDENTE (per il whiteout).
7. `src/story.js`: `ev<Leggendario>` + `LEGEND_SPOTS[<segreta>] = ev<Leggendario>`; aggiungere la città a
   `JL_TOWNS` + la sua squadra in `evJohnny.teams`.
8. `src/state.js`: flag `badge<n>` e `<leggendario>Caught`; `LEGENDARY_FLAG[<id>]`; route in `ROUTE_MAPS`.
9. Pipeline asset (se nuovi sprite/tile) + **verifica sandbox** (vedi CLAUDE.md): larghezze mappe,
   t2i, tile<22, encounters/fish, **arrivi portali calpestabili**, ev NPC, frame, team, catena
   percorribile in entrambi i sensi, GYMS region max = nuova regione, LEGEND_SPOTS, flag.

## Backlog non-regioni
Terzi stadi per le linee a 2 stadi; bilanciamento Johnny Lametta/palestre da testare giocando;
sostituire gli sprite "programmer art" con pack CC0 migliori.
