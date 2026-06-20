/* Storia della demo: starter, evento Cosca (scelta morale), palestra di Carletto. */

/* Schermata titolo: Continua / Nuova partita se esiste un salvataggio. */
function titleConfirm() {
  $('titleScr').style.display = 'none';
  const sv = loadSave();
  if (!sv) { startGame(); return; }
  G.mode = 'walk';
  ask(['Continua', 'Nuova partita'], sel => {
    if (sel === 0) continueGame(sv);
    else {
      ask(['Sì, ricomincia da zero', 'No, torna indietro'], ok => {
        if (ok === 0) { clearSave(); startGame(); }
        else { $('titleScr').style.display = 'block'; G.mode = 'title'; }
      });
    }
  });
}
function continueGame(sv) {
  Object.assign(G, { mapId: sv.mapId, px: sv.px, py: sv.py, dir: sv.dir,
    party: sv.party, box: sv.box || [], items: sv.items,
    money: sv.money ?? 0,
    dex: sv.dex || { seen: [], caught: [] },
    flags: sv.flags, morale: sv.morale });
  G.mode = 'walk';
  WORLD.loadMap(G.mapId);
  beep(659, .1); beep(784, .2);
  const lead = activeMon();
  say(['Bentornato, bagai!' +
       (lead ? '\n' + lead.name + ' ti aspettava.' : ''), 'Si riparte. Taaac.']);
}

function startGame() {
  G.mode = 'walk';
  beep(523, .1); beep(659, .1); beep(784, .2);
  say(["MILANO. Nebbia leggera, tram che\nsferragliano, profumo di brioche.",
       "Sei nato qui, cresciuto qui.\nMilanese DOC, di quelli veri.",
       "In Italia, le creature del folklore\nsono REALI. Le chiamano Leggende.",
       "Oggi la Prof.ssa Brambilla ti ha\nconvocato nel suo laboratorio.",
       "Dice che è importante.\nCon lei lo è sempre. Taaac."]);
}

/* Intro di palestra: testo in data/regions.js (GYMS[map].intro). */
function onEnterMap(map) {
  const g = GYMS[map];
  if (g && g.intro && !G.flags[g.badge]) say(g.intro);
}

/* Sconfitta: ci si risveglia nella città della regione corrente (più vicina),
   non più sempre a Milano. Punto definito in WORLD_MAP[regione].respawn. */
function whiteout(cb) {
  healParty();
  const reg = (typeof WORLD_MAP !== 'undefined' && WORLD_MAP.find(w => w.maps.includes(G.mapId))) || WORLD_MAP[0];
  const r = reg.respawn;
  G.px = r.x; G.py = r.y; G.dir = r.dir;
  WORLD.loadMap(r.map);
  saveGame();
  say(r.lines, cb);
}

/* ---------------- EVENTI NPC ---------------- */
const STORY_EVENTS = {
  starter: evStarter,
  giornalaio: evGiornalaio,
  coscaTorino: evCoscaTorino,
  gymLeader: evGymLeader,   // generico: la config è in data/regions.js (GYMS[mapId])
  trainer: evTrainer,
  cura: evCura,
  negozio: evNegozio,
  pescatore: evPescatore,
  piva: evPiva, pivanota: evPivanota,
  licata: evLicata, licatamed: evLicatamed,
  facci: evFacci
};

/* Una palestra è bloccata finché restano allievi da battere. */
function gymStudentsLeft(mapId) {
  return (NPCS[mapId] || []).filter(n =>
    n.ev === 'trainer' && n.trainer && !G.flags['tr_' + n.trainer.id]);
}
function gymGate(mapId, leaderName) {
  const left = gymStudentsLeft(mapId);
  if (!left.length) return false;
  say(["«Eh no, bagai. Prima ti fai gli\nallievi, poi viene il bello.»",
       'Allievi ancora da battere: ' + left.length + '.'], null, leaderName);
  return true;
}

/* ---------------- NEGOZIO ---------------- */
function evNegozio(n) { shop(n && n.name ? n.name : 'NEGOZIO'); }
function shop(name) {
  say(['«Cosa ti serve, neh?»\nIn cassa hai ' + G.money + '€.'], () => shopMenu(name), name);
}
function shopMenu(name) {
  // dalla 2a regione in poi il negozio vende anche la Canna da Pesca
  const reg = (typeof WORLD_MAP !== 'undefined') ? WORLD_MAP.findIndex(w => w.maps.includes(G.mapId)) : 0;
  const stock = reg >= 1 ? SHOP_STOCK.concat('canna') : SHOP_STOCK;
  const opts = stock.map(k => ITEMS[k].n + ' — ' + ITEMS[k].price + '€')
    .concat('LAPTOP (deposito)', 'Esci');
  ask(opts, sel => {
    if (sel === stock.length) { openLaptop(); return; }            // laptop del deposito
    if (sel > stock.length)   { say('«Torna quando vuoi.»', null, name); return; }
    const key = stock[sel], price = ITEMS[key].price;
    if (G.money < price) {
      say(['«Eh, no. Prima i danè.»\nServono ' + price + '€, ne hai ' + G.money + '.'],
          () => shopMenu(name), name);
      return;
    }
    G.money -= price;
    G.items[key] = (G.items[key] || 0) + 1;
    saveGame();
    beep(880, .07); beep(1100, .1);
    say(['Comprato 1 ' + ITEMS[key].n + '!\nIn cassa restano ' + G.money + '€.'],
        () => shopMenu(name), name);
  });
}

/* Allenatore generico (una sola sfida, definito in data/npcs.js). */
function evTrainer(n) {
  const t = n.trainer;
  const rematch = (typeof ROUTE_MAPS !== 'undefined') && ROUTE_MAPS.includes(G.mapId);
  if (rematch) {
    if (BEATEN_VISIT.has(t.id)) { say(t.after, null, n.name); return; }
    const rc = G.flags['rc_' + t.id] || 0;                 // quante volte già battuto
    const team = t.team.map(([id, lv]) => makeMon(id, Math.min(MAX_LEVEL, lv + rc * 3)));
    const pre = rc > 0 ? ["«Ancora tu? Stavolta non te la cavi\ncosì facile, bagai.»"] : t.pre;
    say(pre, () => {
      startBattle(team[0], { name: n.name, team, idx: 0,
        winCb: () => { BEATEN_VISIT.add(t.id); G.flags['rc_' + t.id] = rc + 1; saveGame(); say(t.win, null, n.name); },
        loseCb: () => whiteout() });
    }, n.name);
    return;
  }
  if (G.flags['tr_' + t.id]) { say(t.after, null, n.name); return; }
  say(t.pre, () => {
    const team = t.team.map(([id, lv]) => makeMon(id, lv));
    startBattle(team[0], { name: n.name, team, idx: 0,
      winCb: () => { G.flags['tr_' + t.id] = true; saveGame(); say(t.win, null, n.name); },
      loseCb: () => whiteout() });
  }, n.name);
}

/* ---------------- ALLENATORI A VISTA (line-of-sight) ----------------
   Un NPC trainer con `look` (direzione) sfida il giocatore quando entra nella
   sua linea di vista (entro `sight` tile, percorso libero). Chiamato da afterStep. */
const OPP = { up:'down', down:'up', left:'right', right:'left' };
function checkTrainerSight() {
  if (G.mode !== 'walk' || !WORLD) return false;
  const rematchMap = (typeof ROUTE_MAPS !== 'undefined') && ROUTE_MAPS.includes(G.mapId);
  for (const n of (NPCS[G.mapId] || [])) {
    if (n.ev !== 'trainer' || !n.look || !n.trainer) continue;
    const beaten = rematchMap ? BEATEN_VISIT.has(n.trainer.id) : G.flags['tr_' + n.trainer.id];
    if (beaten) continue;
    if (trainerSees(n)) { triggerTrainerSight(n); return true; }
  }
  return false;
}
function trainerSees(n) {
  const [dx, dy] = DELTA[n.look];
  const range = n.sight || 4;
  for (let s = 1; s <= range; s++) {
    const tx = n.x + dx * s, ty = n.y + dy * s;
    if (tx === G.px && ty === G.py) return true;
    if (SOLID.has(WORLD.tileChar(tx, ty))) return false;
    if (WORLD.npcAt(tx, ty)) return false;
  }
  return false;
}
function triggerTrainerSight(n) {
  const [dx, dy] = DELTA[n.look];
  n.x = G.px - dx; n.y = G.py - dy;          // avanza fino ad essere adiacente al giocatore
  WORLD.repositionNpc(n);
  G.dir = OPP[n.look];                        // il giocatore si gira verso l'allenatore
  WORLD.player.setFrame(IDLE_FRAME[G.dir]);
  beep(700, .1); beep(520, .12);
  say('! ' + n.name + ' ti ha adocchiato!', () => evTrainer(n));
}

/* Ambulatorio delle Leggende: cura gratuita. */
function evCura(n) {
  say(["«Benvenuto all'Ambulatorio delle\nLeggende! Le rimetto in sesto?»"], () => {
    ask(['Sì, grazie', 'No, solo un saluto'], sel => {
      if (sel === 0) {
        healParty(); saveGame();
        beep(880, .1); beep(1100, .15);
        say(["Le tue Leggende sono in piena\nforma!",
             "«Torna quando vuoi. E mangia\nqualcosa anche tu, che sei\npallido.»"], null, n.name);
      } else {
        say("«Salutame a casa, neh.»", null, n.name);
      }
    });
  }, n.name);
}

function evStarter() {
  if (G.flags.starter) {
    say(["Allora, com'è la tua Leggenda?\nTrattala bene, neh.",
         "Ho sentito voci brutte in giro.\nGente che sfrutta le Leggende...",
         "La chiamano «Cosca Nazionale».\nSe vedi qualcosa di strano, occhio."],
        null, 'PROF.SSA BRAMBILLA');
    return;
  }
  say(["Oh, eccoti! Il bagai dei Navigli.\nPuntuale come un Frecciarossa...\nehm.",
       "Da secoli studiamo le Leggende:\nfolletti, draghi, ninfe. L'Italia\nne è piena, regione per regione.",
       "Venti regioni, venti palestre.\nE qualcosa di marcio sotto, temo.",
       "Ti affido una Leggenda. Scegli\nbene: è come scegliere il\nquartiere."], chooseStarter, 'PROF.SSA BRAMBILLA');
}
function chooseStarter() {
  ask(['SALVANELLO (Erba)', 'TARANTASINO (Fuoco)', 'ANGUANELLA (Acqua)'], sel => {
    const ids = ['salvanello', 'tarantasino', 'anguanella'];
    const flavor = [
      'Il folletto dei boschi alpini.\nTranquillo e affidabile.',
      'Cucciolo del drago Tarantasio —\nsì, QUEL biscione. Fumantino.',
      "Ninfa delle acque. Elegante e\ngelida come la nebbia d'inverno."
    ];
    say([flavor[sel], 'Confermi ' + SPECIES[ids[sel]].n + '?'], () => {
      ask(['Sì, taaac!', 'No, ripensiamoci'], ok => {
        if (ok === 1) { chooseStarter(); return; }
        const mon = makeMon(ids[sel], 5);
        G.party.push(mon);
        dexCatch(mon.id);
        G.flags.starter = true;
        G.money = 500;
        saveGame();
        beep(880, .1); beep(1175, .2);
        say(['Hai ricevuto ' + mon.name + '!',
             "Tieni 5 AMPOLLE e due PANZEROTTI\ndi Luini. E 500€ di mancia: al\nnegozio servono sempre.",
             "Vai al PARCO SEMPIONE, a nord:\nlì vivono Leggende selvatiche.",
             "Quando sei pronto, sfida CARLETTO\nalla palestra del Duomo.\nIn bocca al lupo, fioeu!"],
            null, 'PROF.SSA BRAMBILLA');
      });
    });
  });
}

/* ---------------- EVENTO COSCA ---------------- */
function checkTriggers() {
  if (G.mapId === 'milano' && G.flags.starter && !G.flags.cosca &&
      G.px >= 3 && G.px <= 7 && G.py >= 11 && G.py <= 13) {
    evCosca();
    return;
  }
  // Johnny Lametta sbarra la strada alla prima visita di ogni città
  if (typeof JL_TOWNS !== 'undefined' && JL_TOWNS[G.mapId] &&
      G.flags.starter && G.party.length && !G.flags['jl_' + G.mapId]) {
    evJohnny(G.mapId);
  }
}

/* ---------------- JOHNNY LAMETTA (boss della Cosca, una città alla volta) ----------------
   Inevitabile alla prima visita; squadra scalata sul livello medio della tua. */
const JL_TOWNS = { torino:true, aosta:true, genova:true, bolzano:true, venezia:true, trieste:true, bologna:true, firenze:true, perugia:true, ancona:true };
function evJohnny(town) {
  const avg = Math.max(5, Math.round(G.party.reduce((s, m) => s + m.lv, 0) / G.party.length));
  const lv = avg + 2;
  const teams = {
    torino:  [['bisso', lv], ['mazapegul', lv], ['gattomammone', lv + 1]],
    aosta:   [['masca', lv], ['lupomannaro', lv], ['bisso', lv + 2]],
    genova:  [['borda', lv], ['ratapignata', lv + 1], ['bissone', lv + 2]],
    bolzano: [['croder', lv], ['lupomannaro', lv], ['crodon', lv + 2]],
    venezia: [['mazariol', lv], ['borda', lv + 1], ['mazarione', lv + 2]],
    trieste: [['cjalcjut', lv], ['ratapignata', lv + 1], ['cjalcjutone', lv + 2]],
    bologna: [['foghin', lv], ['farfarello', lv + 1], ['fogaron', lv + 2]],
    firenze: [['strio', lv], ['civettona', lv + 1], ['strione', lv + 2]],
    perugia: [['zollin', lv], ['lupomannaro', lv + 1], ['zollone', lv + 2]],
    ancona: [['falchin', lv], ['ratapignata', lv + 1], ['falchione', lv + 2]]
  };
  const team = teams[town].map(([id, l]) => makeMon(id, Math.min(MAX_LEVEL, l)));
  say(["Un tizio magro in gessato, un rasoio\ntra le dita, ti taglia la strada.",
       "«Johnny Lametta. La Cosca mi manda a\nfarti un... ritocchino, bagai.»",
       "«Da queste parti il pizzo si paga.\nO si lotta. Indovina un po'.»"], () => {
    const t = team.map(m => m);
    startBattle(t[0], { name: 'JOHNNY LAMETTA', team: t, idx: 0,
      winCb: () => {
        G.flags['jl_' + town] = true; saveGame();
        say(["Johnny si liscia la giacca, storto.\n«Niente male... per ora.»",
             "«Ma la Cosca ha pazienza. E memoria.\nCi rivediamo, bagai.»"], null, 'JOHNNY LAMETTA');
      },
      loseCb: () => whiteout(() => say("Johnny ride mentre vai giù.\n«Ripassa quando sai lottare, pivello.»")) });
  }, 'JOHNNY LAMETTA');
}
function evCosca() {
  say(["Vicino all'edicola, due tizi in\ngessato stringono il giornalaio.",
       "«Allora, Gino. Il 30% sugli\nincassi. O l'edicola brucia.»",
       "Al guinzaglio del più grosso, un\nBISSO: il biscione di Milano,\ncon una N dorata sul collare.",
       "LA COSCA NAZIONALE. Corrompono\npersino le Leggende. Qui.\nA casa tua.",
       "Gino ti guarda.\nOcchi che chiedono aiuto.\n\nChe fai?"], () => {
    ask(['Intervieni e sfidali', 'Fai finta di niente', 'Chiedi la tua parte'], sel => {
      if (sel === 0) coscaFight();
      else if (sel === 1) coscaIgnore();
      else coscaBribe();
    });
  });
}
function coscaFight() {
  G.morale += 2; G.flags.coscaChoice = 'fight';
  say(["«Uè! Giù le mani dall'edicola,\npirla. Qui siamo a Milano.»",
       "Lo scagnozzo sorride storto.\n«Un eroe. Che tenerezza.»",
       "«Sai cosa facciamo agli eroi,\nnoi della Cosca?»"], () => {
    const team = [makeMon('bisso', 6), makeMon('mazapegul', 6)];
    startBattle(team[0], { name:'SCAGNOZZO DELLA COSCA', team, idx:0,
      winCb: coscaWin, loseCb: coscaLose });
  });
}
function coscaWin() {
  G.flags.cosca = true;
  G.items.panzerotto += 2;
  say(["Lo scagnozzo richiama il BISSO\ne sputa per terra.",
       "«Questa ce la segniamo, bagai.\nLa Cosca non dimentica.»",
       "Se ne vanno. Gino ti abbraccia,\nquasi piangendo.",
       "«Grazie neh! Tieni: due PANZEROTTI.\nE... sta' attento. Quelli tornano.»",
       "Hai ottenuto 2 PANZEROTTI!",
       "(La tua reputazione migliora.\nQualcuno, nell'ombra, prende nota.)"]);
}
function coscaLose() {
  G.flags.cosca = true;
  whiteout(() => {
    say(["Hai perso, ma il quartiere ha\nvisto che ci hai provato.",
         "Gino ha chiamato i vigili: gli\nscagnozzi sono spariti... per ora."]);
  });
}
function coscaIgnore() {
  G.flags.cosca = true; G.morale -= 1; G.flags.coscaChoice = 'ignore';
  say(["Abbassi lo sguardo e tiri dritto.\nNon sono affari tuoi.",
       "Dietro di te, il rumore di una\nsaracinesca che si chiude.",
       "Gino non ti guarda più.\nNessuno, in zona, ti guarda più.",
       "(Qualcosa ti pesa sullo stomaco.\nE non è il panzerotto.)"]);
}
function coscaBribe() {
  G.flags.cosca = true; G.morale -= 2; G.flags.coscaChoice = 'bribe';
  G.items.pizza += 2;
  say(["Ti avvicini. «Bel biscione.\nQuanto per il mio silenzio?»",
       "Lo scagnozzo ride. «Milanese DOC,\neh? Sangue freddo. Mi piaci.»",
       "Ti allunga un pacchetto: due PIZZE\ne un biglietto con una N dorata.",
       "«La Cosca paga sempre i suoi amici.\nCi rivedremo, bagai.»",
       "Hai ottenuto 2 PIZZE MARGHERITA!",
       "(Gino ti fissa. Ricorderà la tua\nfaccia. Anche la Cosca.)"]);
}
function evGiornalaio() {
  if (!G.flags.cosca) { say("«Gazzetta? Ampolle? Gratta e\nvinci?»", null, 'GIORNALAIO GINO'); return; }
  const c = G.flags.coscaChoice;
  if (c === 'fight')
    say(["«Il mio eroe! Per te il caffè è\nsempre pagato, parola di Gino.»"], null, 'GIORNALAIO GINO');
  else if (c === 'bribe')
    say(["«...»", "Gino gira la Gazzetta dall'altra\nparte e finge di non vederti."], null, 'GIORNALAIO GINO');
  else
    say(["«Ah, sei tu. Quel giorno c'eri\nanche tu, vero? Già. C'eri.»"], null, 'GIORNALAIO GINO');
}

/* ---------------- CAPOPALESTRA (generico, data-driven) ----------------
   Una sola funzione per tutti i capipalestra: legge la config da GYMS[mapId]
   (data/regions.js). Per aggiungerne uno non si tocca questo codice. */
function evGymLeader(n) {
  const g = GYMS[G.mapId];
  if (!g) { say(n.lines, null, n.name); return; }
  if (G.flags[g.badge]) { say(g.done, null, g.leader); return; }
  if (gymGate(G.mapId, g.leader)) return;
  const opener = G.morale >= 2 ? g.openers.good
               : G.morale <= -2 ? g.openers.bad : g.openers.neutral;
  say([...opener, g.challenge], () => {
    const team = g.team.map(([id, lv]) => makeMon(id, lv));
    startBattle(team[0], { name:'CAPOPALESTRA ' + g.leader, team, idx:0,
      winCb: gymLeaderWin,
      loseCb: () => whiteout(() => say(g.loseMsg)) });
  }, g.leader);
}
function gymLeaderWin() {
  const g = GYMS[G.mapId];
  G.flags[g.badge] = true;
  saveGame();
  beep(659, .12); beep(784, .12); beep(1047, .25);
  // La schermata "fine contenuti" appare SOLO all'ultima regione implementata.
  const maxRegion = Math.max(...Object.values(GYMS).map(x => x.region || 0));
  const isFinal = g.region === maxRegion;
  if (g.endAfterWin === false) say(g.win, null, g.leader);         // un evento dedicato (es. archivio) conclude
  else if (isFinal) say(g.win, () => showRegionEnd(g.end), g.leader);
  else say(g.win, () => badgeProgress(g), g.leader);               // medaglia intermedia: si continua
}
const BADGE_ORD = ['prima','seconda','terza','quarta','quinta','sesta','settima','ottava','nona','decima',
  'undicesima','dodicesima','tredicesima','quattordicesima','quindicesima','sedicesima','diciassettesima',
  'diciottesima','diciannovesima','ventesima'];
/* Medaglia non finale: messaggio breve di progresso, poi si torna a giocare. */
function badgeProgress(g) {
  const earned = Object.keys(G.flags).filter(k => /^badge\d*$/.test(k) && G.flags[k]).length;
  const ord = BADGE_ORD[earned - 1] || (earned + 'ª');
  const next = (g.end && g.end.next) ? g.end.next.replace(/<br>/g, '\n') + '\n\n' : '';
  say(['Hai conquistato la ' + ord + ' MEDAGLIA!\nTe ne mancano ' + (20 - earned) + ' alle 20.',
       next + 'La demo continua: esplora pure!'], null, g.leader);
}
/* Schermata di fine regione, costruita dai dati di GYMS[mapId].end. */
function showRegionEnd(end) {
  saveGame();
  const v = G.morale >= (end.goodAt ?? 2) ? end.verdict.good
          : G.morale <= (end.badAt ?? -2) ? end.verdict.bad
          : end.verdict.neutral;
  $('endScr').innerHTML =
    '<h1>' + end.title + '</h1>' +
    end.medal + '<br>' + end.region + '<br><br>' +
    '— REPUTAZIONE —<br>' + v.replace(/\n/g, '<br>') + '<br><br>' +
    end.next + '<br><br>' +
    '<span style="font-size:11px">' + end.footer + '</span>';
  $('endScr').style.display = 'block';
  const prevA = onA;
  onA = () => { $('endScr').style.display = 'none'; onA = prevA; G.mode = 'walk'; };
  G.mode = 'end';
}

/* ---------------- TORINO ---------------- */
function evCoscaTorino() {
  if (G.flags.coscaChoice === 'bribe')
    say(["«Uè! L'amico di Milano.»\nL'uomo si tocca la spilla:\nuna N dorata.",
         "«La Cosca ha uffici anche qui,\nalla Mole. Legalmente, eh.»",
         "«Continua così e farai strada.\nO almeno... la farai intera.»"], null, 'UOMO IN GESSATO');
  else if (G.flags.coscaChoice === 'fight')
    say(["L'uomo in gessato ti squadra.\nSulla giacca, una N dorata.",
         "«Il bagai dell'edicola. Sì, ti\nconosciamo. La Cosca ha memoria\nlunga e gambe ovunque.»",
         "«Goditi Torino. Finché puoi.»"], null, 'UOMO IN GESSATO');
  else
    say(["«La Mole? Bella, vero? Da\nquest'anno è piena di uffici...\nnostri.»",
         "Sulla giacca, una N dorata.\nLa stessa dell'edicola di Milano.",
         "«Gira al largo, giovnot.\nQui si lavora.»"], null, 'UOMO IN GESSATO');
}

/* Gianduiotto (Torino) e Felicino (Aosta) sono ora gestiti da evGymLeader +
   GYMS['gymto'] / GYMS['gymao'] in data/regions.js. */

/* Archivio della Cosca: climax morale della regione (Valle d'Aosta). */
function evArchivioCosca() {
  if (!G.flags.badge3) {
    say(["Porta blindata, una N dorata sopra\nil campanello. Sigillata.",
         "Forse il capopalestra sa come si\napre."]);
    return;
  }
  if (G.flags.archivioDone) {
    say(["L'archivio è vuoto ormai. Resta\nl'eco dei tuoi passi e una N\ngraffiata sul muro."]);
    return;
  }
  say(["Dentro: scaffali di faldoni fino al\nsoffitto. I REGISTRI della Cosca.\nNomi, ricatti, mazzette.",
       "Tutta Italia, regione per regione.\nC'è anche Gianduiotto. E tanti,\ntanti altri.",
       "Su un tavolo, una chiavetta coi dati.\nE un numero con una N dorata.",
       "Hai pochi minuti. Che fai?"], () => {
    ask(['Consegna tutto alla stampa', 'Brucia i registri', 'Chiama la Cosca, tratta'], sel => {
      if (sel === 0) archivioEspone();
      else if (sel === 1) archivioBrucia();
      else archivioVende();
    });
  });
}
function archivioEspone() {
  G.flags.archivioDone = true; G.flags.coscaChoice = 'fight'; G.morale += 3;
  say(["Fotografi tutto e mandi la chiavetta\na tre redazioni diverse. Poi chiami\nFelicino: «È fatta.»",
       "All'alba mezza Italia apre con la\nstessa notizia. La Cosca, per la\nprima volta, ha paura.",
       "(La tua reputazione vola. Ma ora\nhai un bersaglio dipinto sulla\nschiena.)"], () => showRegionEnd(GYMS.gymao.end));
}
function archivioBrucia() {
  G.flags.archivioDone = true; G.morale += 1;
  say(["Dai fuoco a tutto. I nomi dei\nricattati — Gianduiotto compreso —\nbruciano con le loro colpe.",
       "Nessuno saprà. Né i buoni né i\ncattivi. Forse è vigliaccheria.\nForse è pietà.",
       "(La Cosca perde il ricatto.\nMa la verità va in cenere con la\ncarta.)"], () => showRegionEnd(GYMS.gymao.end));
}
function archivioVende() {
  G.flags.archivioDone = true; G.flags.coscaChoice = 'bribe'; G.morale -= 3; G.money += 3000;
  say(["Chiami il numero. Voce calma:\n«Bravo. Sapevamo di poter contare\nsu un milanese con la testa.»",
       "Un bonifico. La chiavetta resta a\nloro. Felicino non saprà mai chi\nl'ha fregato.",
       "Hai ottenuto 3000€.",
       "(Una N dorata, adesso, è cucita\ndentro la tua giacca.)"], () => showRegionEnd(GYMS.gymao.end));
}

/* Leggendario: lo Stambéco bianco del Gran Paradiso. */
function evStambeco() {
  if (G.flags.stamboCaught) {
    say(["Il santuario è silenzioso. Lo\nSTAMBÉCO si è già mostrato a te.\nUna volta sola."]);
    return;
  }
  if (!activeMon()) { say("Ti serve una Leggenda in forze per\navvicinarti al santuario."); return; }
  say(["In cima, sulla neve intatta, uno\nSTAMBÉCO BIANCO ti fissa. Enorme.\nLe corna come due lune.",
       "Non scappa: ti studia. È una prova,\nnon un agguato.",
       "Lo STAMBÉCO scalpita!"], () => {
    saveGame();
    beep(160, .2, 'triangle'); beep(120, .25, 'triangle');
    startBattle(makeMon('stambeco', 20), null);
  });
}

/* Leggendario di Milano: la Scighéra, nella darsena segreta dei Navigli. */
function evScighera() {
  if (G.flags.scigheraCaught) {
    say(["L'acqua è ferma. La SCIGHÉRA si è già\nmostrata a te: non torna due volte\nnello stesso punto."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze la nebbia\nnon ti lascia avvicinare."); return; }
  say(["La nebbia sulla darsena si addensa\ne prende forma. Due occhi freddi si\naprono nel grigio.",
       "La SCIGHÉRA ti ha scelto. Tocca a te.",
       "La SCIGHÉRA emerge dall'acqua!"], () => {
    saveGame();
    beep(140, .25, 'triangle'); beep(180, .25, 'triangle');
    startBattle(makeMon('scighera', 14), null);
  });
}

/* ---------------- PESCA ---------------- */
function evPescatore(n) {
  if (!G.items.canna) {
    G.items.canna = 1; saveGame();
    beep(880, .1); beep(1100, .15);
    say(["«Peschi? Tieni, ti regalo una\nCANNA DA PESCA: a me ne avanzano.»",
         "Hai ricevuto la CANNA DA PESCA!",
         "«Mettiti davanti all'acqua e premi A.\nNei Navigli, ogni tanto, abbocca\nl'Anguana.»"], null, n.name);
  } else {
    say(["«Com'è la pesca? Davanti all'acqua,\npremi A. Polso e pazienza, neh.»"], null, n.name);
  }
}
/* Pesca davanti a una tile d'acqua: usa la tabella MAPS[mapId].fish. */
function fish() {
  const tbl = MAPS[G.mapId] && MAPS[G.mapId].fish;
  if (!tbl || !tbl.length) { say("Lanci la lenza...\nMa qui non abbocca niente."); return; }
  if (!activeMon()) { say("Ti serve una Leggenda in forze\nper pescare."); return; }
  beep(330, .1);
  say(["Lanci la lenza nell'acqua...", "Un guizzo... qualcosa abbocca?", "......"], () => {
    if (Math.random() < 0.6) {
      const tot = tbl.reduce((s, e) => s + e.w, 0);
      let r = Math.random() * tot, pick = tbl[0];
      for (const e of tbl) { r -= e.w; if (r <= 0) { pick = e; break; } }
      const lv = pick.min + Math.floor(Math.random() * (pick.max - pick.min + 1));
      G.mode = 'battle';
      if (WORLD) {
        WORLD.cameras.main.flash(250, 255, 255, 255);
        WORLD.time.delayedCall(280, () => startBattle(makeMon(pick.id, lv), null));
      } else startBattle(makeMon(pick.id, lv), null);
    } else {
      say("Niente... l'esca torna su spoglia.");
    }
  });
}

/* ---------------- LEGGENDARI DELLE AREE SEGRETE ---------------- */
function evTaurin() {
  if (G.flags.taurinCaught) { say(["Il bronzo è freddo e immobile.\nIl TAURIN si è già mostrato a te."]); return; }
  if (!activeMon()) { say("Senza una Leggenda in forze non ti\navvicini a quella mole."); return; }
  say(["Nel buio due occhi si accendono di\nrosso. La mole di bronzo SBUFFA.",
       "Il TAURIN di San Carlo si è svegliato.\nE ha scelto te.",
       "Il TAURIN carica!"], () => {
    saveGame();
    beep(120, .25, 'triangle'); beep(90, .3, 'triangle');
    startBattle(makeMon('taurin', 18), null);
  });
}
function evBarry() {
  if (G.flags.barryCaught) { say(["Il banco di ghiaccio è vuoto.\nBARRY si è già mostrato a te."]); return; }
  if (!activeMon()) { say("Senza una Leggenda in forze BARRY\nnon ti lascia avvicinare."); return; }
  say(["Sul ghiaccio un enorme San Bernardo\nti fissa con occhi buoni. Al collo,\nuna botticella.",
       "BARRY ti annusa, poi abbaia deciso:\nè una sfida, non un saluto.",
       "BARRY si lancia!"], () => {
    saveGame();
    beep(200, .2, 'triangle'); beep(150, .25, 'triangle');
    startBattle(makeMon('barry', 19), null);
  });
}
function evGrifone() {
  if (G.flags.grifoneCaught) { say(["La cima della Lanterna è quieta.\nIl GRIFONE si è già mostrato a te."]); return; }
  if (!activeMon()) { say("Senza una Leggenda in forze non osi\nsalire fin lassù."); return; }
  say(["In cima alla Lanterna un'ombra enorme\nsi staglia contro il faro. Becco, ali,\nartigli: il GRIFONE di Genova.",
       "Ti scruta dall'alto, poi piega le ali:\nti ha scelto come avversario.",
       "Il GRIFONE piomba in picchiata!"], () => {
    saveGame();
    beep(180, .2, 'triangle'); beep(140, .25, 'triangle');
    startBattle(makeMon('grifone', 24), null);
  });
}
function evLaurino() {
  if (G.flags.laurinoCaught) { say(["Il roseto è di pietra e silenzio.\nRE LAURINO si è già mostrato a te."]); return; }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nturbare il sonno del re."); return; }
  say(["Tra le rose pietrificate una sagoma\ndi roccia si erge: corona, barba, occhi\nche bruciano come il tramonto.",
       "RE LAURINO ti misura. «Chi disturba\nil mio giardino, che si batta.»",
       "RE LAURINO scatena la frana!"], () => {
    saveGame();
    beep(110, .25, 'triangle'); beep(80, .3, 'triangle');
    startBattle(makeMon('laurino', 28), null);
  });
}
/* Leggendario di Venezia: il Leon de San Marco, custode della calle dimenticata. */
function evLeon() {
  if (G.flags.leonCaught) {
    say(["La calle è silenziosa. Il LEON DE\nSAN MARCO si è già mostrato a te.\nUna volta sola."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nturbare le acque della calle."); return; }
  say(["Sull'acqua ferma compare un'ombra\nenorme: ali d'aquila, zampe di leone,\nocchi d'oro come la cupola.",
       "Il LEON DE SAN MARCO scende\ndall'alto, silenzioso. Il canal\nscintilla sotto di lui.",
       "«Chi viola la calle, si batta.»",
       "Il LEON DE SAN MARCO attacca!"], () => {
    saveGame();
    beep(200, .2, 'triangle'); beep(160, .25, 'triangle');
    startBattle(makeMon('leon', 32), null);
  });
}
/* Leggendario del Friuli: la BORA, spirito del vento di Trieste. */
function evBora() {
  if (G.flags.boraCaught) {
    say(["La grotta echeggia nel silenzio.\nIl vento non soffia più.\nLa BORA ha già scelto te."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nentrare nella grotta del vento."); return; }
  say(["In fondo alla grotta, un sibilo\nprofondo cresce fino a diventare\nun urlo.",
       "L'aria si condensa. Dal buio emerge\nuna forma fatta di vento e freddo.",
       "È la BORA. Lo spirito del vento\nche da secoli devasta Trieste.",
       "«Chi ferma il vento, si misuri\ncon lui.»",
       "La BORA attacca!"], () => {
    saveGame();
    beep(200, .2, 'triangle'); beep(160, .25, 'triangle');
    startBattle(makeMon('bora', 36), null);
  });
}
/* Leggendario dell'Emilia: Al Diâl, il diavolo delle Due Torri. */
function evAldial() {
  if (G.flags.aldialCaught) {
    say(["In cima alla Garisenda c'è solo\nvento e silenzio. AL DIÂL si è\ngià mostrato a te."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nosi salire in cima alla torre."); return; }
  say(["In cima alla Garisenda, tra i mattoni\nche pendono, due occhi gialli si\naprono nel buio.",
       "Una risata profonda riempie la torre.\nAL DIÂL, il diavolo che la costruì,\nsi alza tra fiamme e ombra.",
       "«Chi sale fin quassù, si diverta\ncon me. O bruci provandoci.»",
       "AL DIÂL attacca!"], () => {
    saveGame();
    beep(180, .2, 'triangle'); beep(120, .28, 'triangle');
    startBattle(makeMon('aldial', 40), null);
  });
}
/* Leggendario della Toscana: L'Arùspice, l'indovino etrusco dell'ipogeo. */
function evAruspice() {
  if (G.flags.aruspiceCaught) {
    say(["L'ipogeo è muto e immobile.\nL'ARÙSPICE ti ha già letto il\nfuturo. Una volta sola."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nturbare il sonno dell'indovino."); return; }
  say(["Nel buio dell'ipogeo, una figura\navvolta in bende si solleva tra gli\naffreschi etruschi.",
       "Tre occhi si aprono sul suo volto.\nÈ L'ARÙSPICE, il veggente che leggeva\nil futuro nelle viscere.",
       "«Ti aspettavo. Conosco già ogni tua\nmossa... ma battiti lo stesso.»",
       "L'ARÙSPICE attacca!"], () => {
    saveGame();
    beep(220, .2, 'triangle'); beep(170, .25, 'triangle'); beep(130, .3, 'triangle');
    startBattle(makeMon('aruspice', 44), null);
  });
}
/* ================= "I TRE SOCI" — Leggende dedicate (Piva / Facci / Licata) ================= */
/* Consegna una Leggenda speciale: in squadra se c'è posto, altrimenti nel deposito. */
function giveSocio(id, lv, doneFlag, name, lines) {
  const mon = makeMon(id, lv);
  const toBox = G.party.length >= 6;
  if (toBox) G.box.push(mon); else G.party.push(mon);
  dexCatch(mon.id);
  G.flags[doneFlag] = true;
  saveGame();
  beep(880, .1); beep(1175, .2);
  let out = lines.concat(['Hai ricevuto ' + mon.name + '!']);
  if (toBox) out = out.concat(['(Squadra piena: ' + mon.name + ' è\nfinito nel DEPOSITO.)']);
  out = out.concat(sociComplete());
  say(out, null, name);
}
/* Bonus una-tantum quando hai raccolto tutte e tre le Leggende dei soci. */
function sociComplete() {
  if (G.flags.piva_done && G.flags.facci_done && G.flags.licata_done && !G.flags.soci_reward) {
    G.flags.soci_reward = true; G.money += 2000; saveGame();
    return ['', '★ I TRE SOCI riuniti! ★',
      'Hai radunato le Leggende di Piva,\nFacci e Licata. I tre soci ti fanno\nun applauso da lontano.',
      'Ti lasciano 2000€ di mancia.\nGrandi i soci, neh.'];
  }
  return [];
}

/* --- PIVA (Milano): le tre note dei Navigli --- */
function evPiva(n) {
  if (G.flags.piva_done) {
    say(["«Taaac! Il mio PIVÒT è in gamba, eh.»",
         (G.flags.facci_done && G.flags.licata_done)
           ? "«Coi miei soci ci hai dato dentro.\nGrazie, bagai.»"
           : "«I miei soci FACCI (Trieste) e\nLICATA (Genova) t'aspettano ancora.»"], null, 'PIVA');
    return;
  }
  if (!G.flags.starter || !G.party.length) {
    say(["«Prima fatti dare una Leggenda dalla\nProf, poi parliamo di musica.»"], null, 'PIVA'); return;
  }
  const got = ['piva_n1','piva_n2','piva_n3'].filter(f => G.flags[f]).length;
  if (got < 3) {
    say(["«Uè! Sono PIVA, suono la piva — la\ncornamusa, mica la noia, neh.»",
         "«Ti do una mia Leggenda speciale se\nsuoni la mia ninnananna. Ma ho perso\n3 NOTE in giro per Milano.»",
         "«Una al PARCO, una ai NAVIGLI e una\nnella vecchia DARSENA segreta.\nTrovale e torna, bagai.»",
         "Note trovate finora: " + got + "/3."], null, 'PIVA');
    return;
  }
  say(["«Le hai tutte e tre! Adesso suonale\nnell'ORDINE giusto. Ricorda gli\nindizi scritti sopra ogni nota...»"], () => {
    ask(['Alba · Ponte · Sera', 'Sera · Ponte · Alba', 'Ponte · Alba · Sera', 'Alba · Sera · Ponte'], sel => {
      if (sel === 0) {
        say(["Suoni le note nell'ordine giusto.\nPiva chiude gli occhi e sorride."], () => {
          giveSocio('pivot', 8, 'piva_done', 'PIVA',
            ["«Taaac! Quella era la mia ninnananna.»",
             "«Tieni PIVÒT: cresce con te e diventa\nun fulmine. Letteralmente.»",
             "«Cerca i miei soci: FACCI a Trieste e\nLICATA a Genova.»"]);
        }, 'PIVA');
      } else {
        const fee = Math.min(G.money, 100); G.money -= fee; saveGame();
        beep(200, .15, 'sawtooth');
        say(["«STONATO! Così mi fai piangere la piva.»",
             fee > 0 ? ('«E sono ' + fee + '€ per il disturbo\nalle orecchie. Riprova, neh.»')
                     : "«Manco i danè per scusarti!\nRiprova quando vuoi.»"], null, 'PIVA');
      }
    });
  }, 'PIVA');
}
function evPivanota(n) {
  const f = 'piva_n' + n.note;
  const clue = {
    1: "Una NOTA di Piva!\nSopra c'è scritto: «Vengo per prima,\ncome l'ALBA.»",
    2: "Una NOTA di Piva!\nSopra c'è scritto: «Sto nel mezzo,\ncome il PONTE sul Naviglio.»",
    3: "Una NOTA di Piva!\nSopra c'è scritto: «Io chiudo, come\nla nebbia della SERA.»"
  };
  if (G.flags[f]) { say(["Questa NOTA ce l'hai già.\nRiportala a PIVA, in centro a Milano."]); return; }
  G.flags[f] = true; saveGame();
  beep(700, .08); beep(950, .12);
  say([clue[n.note], "(Riportala a PIVA quando le hai\ntrovate tutte e tre.)"]);
}

/* --- LICATA (Genova): il relitto, da pescare alla Scogliera --- */
function evLicata(n) {
  if (G.flags.licata_done) {
    say(["«Grazie ancora, picciotto. LICÀT ti\nporterà fortuna, in mare e in lotta.»",
         (G.flags.piva_done && G.flags.facci_done)
           ? "«Noi tre soci ti dobbiamo una cena.»"
           : "«Visti gli altri? PIVA a Milano,\nFACCI a Trieste.»"], null, 'LICATA');
    return;
  }
  if (!G.party.length) { say(["«Senza Leggende non si combina niente,\npicciotto.»"], null, 'LICATA'); return; }
  if (G.flags.licata_med) {
    say(["«Il mio MEDAGLIONE! L'hai ripescato\ndavvero. Sei uno di noi, picciotto.»"], () => {
      giveSocio('licat', 22, 'licata_done', 'LICATA',
        ["«Tieni LICÀT: creatura del mare del\nsud, testarda e fedele come un amico.»",
         "«Se non l'hai fatto, trova PIVA a\nMilano e FACCI a Trieste.»"]);
    }, 'LICATA');
    return;
  }
  say(["«Ahù! Sono LICATA, di Sicilia, ma il\nmare m'ha portato fin qui a Genova.»",
       "«Ti do una mia Leggenda speciale se mi\nrecuperi ciò che il mare m'ha preso:\nun vecchio MEDAGLIONE.»",
       "«L'indizio è questo: dove il FARO\nveglia e l'onda batte più forte,\ncala la lenza. E porta la CANNA.»"], null, 'LICATA');
}
function evLicatamed(n) {
  if (G.flags.licata_med) { say(["L'acqua qui è di nuovo calma.\nIl medaglione ce l'hai già."]); return; }
  if (!G.items.canna) { say(["Qualcosa luccica sul fondo... ma senza\nuna CANNA DA PESCA non lo tiri su."]); return; }
  beep(500, .1); beep(700, .12); beep(950, .15);
  G.flags.licata_med = true; saveGame();
  say(["Cali la lenza dove l'onda batte più\nforte e tiri su un vecchio MEDAGLIONE\nincrostato di sale!",
       "(Riportalo a LICATA, al porto di Genova.)"]);
}

/* --- FACCI (Trieste): quiz a trabocchetto + prova senza cure --- */
const FACCI_QUIZ = [
  { q:"«Primo: che vento gelido scende dal\nCarso e spazza Trieste?»", a:['La BORA','Lo Scirocco','Il Maestrale'], ok:0 },
  { q:"«Secondo: di quale impero faceva parte\nTrieste fino al 1918?»", a:['Austro-ungarico','Ottomano','Spagnolo'], ok:0 },
  { q:"«Terzo: quale scrittore irlandese visse\na Trieste e ha una statua di bronzo\nsul Canal Grande?»", a:['James Joyce','Oscar Wilde','Lord Byron'], ok:0 }
];
function evFacci(n) {
  if (G.flags.facci_done) {
    say(["«Faccia tosta come la mia, eh!\nFACCÌN è in buone mani.»",
         (G.flags.piva_done && G.flags.licata_done)
           ? "«Noi tre soci ti dobbiamo un favore.»"
           : "«Visti gli altri? PIVA a Milano,\nLICATA a Genova.»"], null, 'FACCI');
    return;
  }
  if (!G.party.length) { say(["«E con cosa la combatti la mia faccia\ntosta, senza Leggende?»"], null, 'FACCI'); return; }
  if (G.flags.facci_quiz) { facciChallenge(); return; }
  say(["«Uè! Sono FACCI, il più sfacciato di\nTrieste. Vedi 'ste statue di bronzo?\nIo ho la faccia uguale.»",
       "«Ti do una mia Leggenda speciale, ma\nprima dimostra di conoscere la mia\ncittà. Tre domande. Sbagli? Si paga.»"], () => facciQuiz(0), 'FACCI');
}
function facciQuiz(i) {
  if (i >= FACCI_QUIZ.length) {
    G.flags.facci_quiz = true; saveGame();
    say(["«Muso duro e testa fina. Mi piaci.»",
         "«Ora la prova vera: faccia tosta\ncontro faccia tosta. Le mie Leggende,\ntutte di fila e niente cure!»"], () => facciChallenge(), 'FACCI');
    return;
  }
  const Q = FACCI_QUIZ[i];
  say([Q.q], () => {
    ask(Q.a, sel => {
      if (sel === Q.ok) { beep(950, .1); facciQuiz(i + 1); }
      else {
        const fee = Math.min(G.money, 80); G.money -= fee; saveGame();
        beep(200, .15, 'sawtooth');
        say(["«SBAGLIATO! E giù multa.»",
             fee > 0 ? ('«' + fee + '€ per l\'ignoranza. Si\nricomincia da capo, dai.»')
                     : "«Manco i danè per la multa!\nSi ricomincia da capo.»"], () => facciQuiz(0), 'FACCI');
      }
    });
  }, 'FACCI');
}
function facciChallenge() {
  const team = [makeMon('faccin', 33), makeMon('civettona', 33), makeMon('ratapignata', 34)];
  say(["«Faccia tosta... VAI!»"], () => {
    startBattle(team[0], { name:'FACCI', team, idx:0,
      winCb: () => giveSocio('faccin', 35, 'facci_done', 'FACCI',
        ["«AAAH! Battuto in casa mia!\nFaccia tosta da vendere, ragazzo.»",
         "«Tieni FACCÌN: diventa un dragone\nsfacciato come me. Trattalo bene.»",
         "«Se non l'hai fatto, trova PIVA a\nMilano e LICATA a Genova.»"]),
      loseCb: () => whiteout(() => say("Facci ride. «Ripassa quando hai un po'\ndi faccia tosta in più, pivello!»")) });
  }, 'FACCI');
}

/* Leggendario dell'Umbria: il Lupo di Gubbio, ammansito da San Francesco. */
function evLupogubbio() {
  if (G.flags.lupogubbioCaught) {
    say(["La radura è quieta. Il LUPO DI\nGUBBIO ti ha già concesso la\nsua fiducia. Una volta sola."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nturbare il lupo nella radura."); return; }
  say(["Tra i faggi avanza un lupo enorme,\nil manto color terra, gli occhi\nantichi e calmi.",
       "È il LUPO DI GUBBIO. Ti studia, poi\nabbassa il capo: non è un attacco,\nè una sfida leale.",
       "«Misurati con me, se hai cuore puro.»",
       "Il LUPO DI GUBBIO carica!"], () => {
    saveGame();
    beep(160, .22, 'triangle'); beep(120, .26, 'triangle');
    startBattle(makeMon('lupogubbio', 46), null);
  });
}
/* Leggendario delle Marche: la Sibilla Appenninica, profetessa dei Sibillini. */
function evSibilla() {
  if (G.flags.sibillaCaught) {
    say(["La grotta è silenziosa. La SIBILLA\nha già letto il tuo destino.\nUna volta sola."]);
    return;
  }
  if (!activeMon()) { say("Senza una Leggenda in forze non\nentrare nella grotta della Sibilla."); return; }
  say(["In fondo alla grotta, tra ali e veli,\nsi leva una figura regale dagli occhi\nche brillano nel buio.",
       "È la SIBILLA APPENNINICA, profetessa\ndei monti. Le fate danzano intorno\na lei nell'ombra.",
       "«Conosco già l'esito di questo\nincontro... ma il vento vuole che\nci battiamo. E così sia.»",
       "La SIBILLA spicca il volo!"], () => {
    saveGame();
    beep(240, .2, 'triangle'); beep(180, .24, 'triangle'); beep(300, .2, 'triangle');
    startBattle(makeMon('sibilla', 48), null);
  });
}
/* Tile 'X' dei santuari: quale leggendario evoca, per mappa. */
const LEGEND_SPOTS = { aosta: evStambeco, segreto: evScighera, sotterranei: evTaurin, gelo: evBarry, lanterna: evGrifone, rosengarten: evLaurino, calle: evLeon, grotta_bora: evBora, torri: evAldial, ipogeo: evAruspice, gubbio: evLupogubbio, sibillini: evSibilla };

/* Le schermate di fine regione sono ora generate da showRegionEnd(GYMS[mapId].end). */
