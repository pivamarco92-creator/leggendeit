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

/* Sconfitta: ci si risveglia nel punto sicuro della regione (data/regions.js → RESPAWN). */
function whiteout(cb) {
  healParty();
  const r = RESPAWN.find(e => e.maps && e.maps.includes(G.mapId)) || RESPAWN.find(e => e.def);
  G.px = r.x; G.py = r.y; G.dir = r.dir;
  WORLD.loadMap(r.to);
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
  pescatore: evPescatore
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
  const opts = SHOP_STOCK.map(k => ITEMS[k].n + ' — ' + ITEMS[k].price + '€')
    .concat('LAPTOP (deposito)', 'Esci');
  ask(opts, sel => {
    if (sel === SHOP_STOCK.length) { openLaptop(); return; }       // laptop del deposito
    if (sel > SHOP_STOCK.length)   { say('«Torna quando vuoi.»', null, name); return; }
    const key = SHOP_STOCK[sel], price = ITEMS[key].price;
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
  for (const n of (NPCS[G.mapId] || [])) {
    if (n.ev !== 'trainer' || !n.look || !n.trainer || G.flags['tr_' + n.trainer.id]) continue;
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
  }
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
    G.flags.stamboCaught = true;   // si mostra una volta sola, comunque vada
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
    G.flags.scigheraCaught = true;   // si mostra una volta sola, comunque vada
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
    G.flags.taurinCaught = true; saveGame();
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
    G.flags.barryCaught = true; saveGame();
    beep(200, .2, 'triangle'); beep(150, .25, 'triangle');
    startBattle(makeMon('barry', 19), null);
  });
}
/* Tile 'X' dei santuari: quale leggendario evoca, per mappa. */
const LEGEND_SPOTS = { aosta: evStambeco, segreto: evScighera, sotterranei: evTaurin, gelo: evBarry };

/* Le schermate di fine regione sono ora generate da showRegionEnd(GYMS[mapId].end). */
