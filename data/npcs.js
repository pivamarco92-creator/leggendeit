/* NPC per mappa. frame = indice in assets/chars.png (8+).
   ev = evento storia gestito in src/story.js; altrimenti lines[] semplici. */
const NPCS = {
  lab: [
    { x:4, y:2, frame:8, name:'PROF.SSA BRAMBILLA', ev:'starter' }
  ],
  milano: [
    { x:16, y:11, frame:9, name:'NONNA PINA',
      lines:["Uè bagai! Ai miei tempi le\nLeggende si rispettavano, altro\nche imbottigliarle.",
             "Il Gatto Mammone dormiva sui\ntetti di Brera. Che tempi, taaac."] },
    { x:9, y:19, frame:10, name:'RAGAZZO AI NAVIGLI',
      lines:["Lo spritz qui costa come tre\nAmpolle. Milano, eh...",
             "Dicono che certa gente strana\ngiri vicino all'edicola. Occhio."] },
    { x:20, y:6, frame:11, name:'TIFOSO',
      lines:["Hanno visto un'Anguana nei\nNavigli! O era un sacco della\nspazzatura? Boh."] },
    { x:4, y:13, frame:15, name:'GIORNALAIO GINO', ev:'giornalaio' }
  ],
  parco: [
    { x:14, y:13, frame:12, name:'VECCHIETTO',
      lines:["Nell'erba alta vivono le\nLeggende, fioeu. Quelle vere.",
             "Pare ci sia anche un MUNACIELLO.\nRaro come un parcheggio gratis."] }
  ],
  gym: [
    { x:5, y:2, frame:13, name:'CARLETTO', ev:'gymLeader' },
    { x:3, y:5, frame:10, name:'ALLIEVO PIERO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymmi1', team:[['bigatto',7],['merlotta',8]],
        pre:["Per arrivare a Carletto devi\npassare da me. Regola della\npalestra, taaac!"],
        win:["Ahia. Vabbè, vai pure.\nMa con Carletto non è mica\ncosì facile, neh."],
        after:["Vai, vai. Carletto ti aspetta\nin fondo alla sala."] } },
    { x:8, y:7, frame:11, name:'ALLIEVA RACHELE', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymmi2', team:[['mazapegul',9]],
        pre:["Il mio Mazapégul è piccolo ma\ncattivissimo. Come me."],
        win:["Ok ok, sei forte. Però il Gatto\nMammone di Carletto graffia,\nti avviso."],
        after:["In bocca al lupo col capo!"] } }
  ],
  torino: [
    { x:10, y:6, frame:12, name:'BOGIANEN',
      lines:["Esageruma nen, giovnot.\nQui a Torino si fa tutto con\ncalma. Ma si fa bene.",
             "Il Valentino, oltre il Po, è\npieno di Leggende. Anche di\nMASCHE. Brr."] },
    { x:18, y:9, frame:10, name:'BARISTA',
      lines:["Un bicerin? Caffè, cioccolato\ne crema. Altro che il vostro\ncaffè milanese al volo.",
             "GIANDUIOTTO? Il capopalestra.\nTipo ACCIAIO, come le vecchie\nofficine. Tosto ma giusto."] },
    { x:8, y:13, frame:11, name:'TIFOSO GRANATA',
      lines:["Il Toro non si discute, si ama.\nE anche i Torét: hanno iniziato\na muoversi, sai?",
             "Acqua di montagna gratis da\ncent'anni. Prova a catturarne\nuno, se ci riesci."] },
    { x:24, y:6, frame:14, name:'UOMO IN GESSATO', ev:'coscaTorino' },
    { x:22, y:9, frame:9,  name:'NEGOZIANTE', ev:'negozio' }
  ],
  gymto: [
    { x:5, y:2, frame:13, name:'GIANDUIOTTO', ev:'gymLeader' },
    { x:3, y:5, frame:14, name:'OPERAIO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymto1', team:[['fusinot',12]],
        pre:["In questa palestra si suda,\ngiovnot. Il mio Fusinot esce\ndal turno di notte."],
        win:["Bogia... niente male.\nIl Ferroviere è più tosto di me."],
        after:["Avanti, avanti. E saluta il capo."] } },
    { x:8, y:7, frame:10, name:'FERROVIERE', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymto2', team:[['servanot',13],['fusinot',14]],
        pre:["Ho passato trent'anni sui binari.\nI miei colpi arrivano puntuali,\nmica come i treni."],
        win:["In orario e pure forte. Vai da\nGianduiotto, te lo sei meritato."],
        after:["Binario uno per Gianduiotto.\nSenza fermate intermedie."] } }
  ],
  ambmi: [
    { x:3, y:1, frame:8, name:'DOTTORESSA ROSSI', ev:'cura' }
  ],
  ambto: [
    { x:3, y:1, frame:8, name:'DOTTORESSA FERRERO', ev:'cura' }
  ],
  aosta: [
    { x:10, y:8, frame:12, name:'GUIDA ALPINA',
      lines:["Lassù, oltre i nevai, vive lo\nSTAMBÉCO bianco: il guardiano\ndel Gran Paradiso.",
             "Si mostra a uno solo, una volta\nsola. Il santuario è in cima,\ndove la roccia tocca il cielo."] },
    { x:20, y:8, frame:9, name:'MONTANARO',
      lines:["Cerea! Qui in Valle si parla\npoco e si cammina tanto.",
             "Quell'edificio con la porta scura?\nLo chiamano «archivio». Ci girano\ntipi con la spilla a forma di N."] },
    { x:8, y:11, frame:15, name:'NEGOZIANTE', ev:'negozio' }
  ],
  gymao: [
    { x:5, y:2, frame:13, name:'FELICINO', ev:'gymLeader' },
    { x:3, y:5, frame:12, name:'GUARDIAPARCO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymao1', team:[['neiot',17]],
        pre:["Su queste vette ci si tempra,\ngiovnot. Il mio NEIÒT non sente\nil freddo. E nemmeno la pietà."],
        win:["Brrr... battuto in casa mia.\nFelicino sarà un osso più duro."],
        after:["Avanti. Felicino ti aspetta\nin fondo, al gelo."] } },
    { x:8, y:7, frame:11, name:'SCIATORE', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymao2', team:[['civettona',17],['neiot',19]],
        pre:["Scendo a novanta all'ora e non\nsbaglio un palo. Vediamo se reggi\nil freddo, eh."],
        win:["Niente male! Vai dal capo. Ma\ncopriti: là dentro gela davvero."],
        after:["Il capo è in fondo. Porta\npazienza e maglione."] } }
  ],
  ambao: [
    { x:3, y:1, frame:8, name:'DOTTORESSA MENABREA', ev:'cura' }
  ],
  navigli: [
    { x:6, y:5, frame:14, name:'SCAGNOZZO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'cosca_nav1', team:[['bisso',5]],
        pre:["Aria che tira male, bagai.\nQuesto pezzo di Navigli adesso\nlo gestiamo noi."],
        win:["Tch. Vai pure. Ma la Cosca\nsegna tutto, eh."],
        after:["Cammina, cammina. Ti tengo\nd'occhio."] } },
    { x:17, y:7, frame:14, name:'PALO DELLA COSCA', ev:'trainer', look:'left', sight:7,
      trainer:{ id:'cosca_nav2', team:[['mazapegul',5],['bisso',6]],
        pre:["Faccio il palo da una vita.\nNiente passa senza che lo veda."],
        win:["Ho visto anche troppo, stavolta.\nVabbè, passa."],
        after:["Occhi aperti, eh. Sempre."] } },
    { x:8, y:11, frame:14, name:'BORSEGGIATRICE', ev:'trainer', look:'right', sight:5,
      trainer:{ id:'cosca_nav3', team:[['merlotta',6],['mazapegul',7]],
        pre:["Bella la tua Leggenda. Sai che\nprezzo fa, al mercato giusto?"],
        win:["Ok, ok! Non rubo più... per oggi."],
        after:["Tieni stretto lo zaino, bagai."] } },
    { x:4, y:8, frame:12, name:'PESCATORE', ev:'pescatore' }
  ],
  segreto: [
    { x:8, y:7, frame:9, name:'VECCHIA DEL NAVIGLIO',
      lines:["Sei arrivato fin qui, eh.\nIn pochi ci riescono.",
             "Quella sull'acqua non è nebbia.\nÈ la SCIGHÉRA. Se si mostra,\nsalutala con rispetto."] }
  ],
  shopmi: [
    { x:3, y:1, frame:15, name:'COMMESSO', ev:'negozio' },
    { x:2, y:3, frame:9, name:'CLIENTE',
      lines:["Quel laptop in fondo è il terminale\ndel DEPOSITO: ci tieni le Leggende\nche non porti con te.",
             "Avvicìnati e premi A. Da lì sposti\nchi vuoi tra squadra e deposito."] }
  ],
  murazzi: [
    { x:8, y:5, frame:14, name:'SGHERRO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'mur1', team:[['bisso',8],['mazapegul',9]],
        pre:["Bel posto tranquillo, i Murazzi.\nPeccato che adesso il pedaggio lo\nfacciamo noi."],
        win:["Uff. Passa pure. Ma ci rivediamo."],
        after:["La Cosca non scorda una faccia."] } },
    { x:8, y:10, frame:9, name:'BARCAIOLO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'mur2', team:[['borda',9],['anguanella',8]],
        pre:["Sul Po ci vivo da sempre, e so cosa\nsi muove sotto il pelo dell'acqua."],
        win:["Bravo, hai polso. Buona corrente!"],
        after:["Occhio alla nebbia, eh."] } },
    { x:8, y:13, frame:14, name:'BORSEGGIATORE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'mur3', team:[['merlotta',9],['masca',10]],
        pre:["Lavoro in coppia con una Masca:\nlei distrae, io alleggerisco."],
        win:["Ahó. Vada per stavolta."],
        after:["Tieni stretto il portafogli."] } },
    { x:2, y:2, frame:11, name:'CANOTTIERE',
      lines:["Sotto i Murazzi ci sono cunicoli\nvecchi come la città. Dicono ci\ndorma qualcosa di bronzo.",
             "Storie da torinesi, eh. Però di\nnotte, di là, io non ci vado."] }
  ],
  sotterranei: [
    { x:3, y:10, frame:12, name:'CUSTODE',
      lines:["Sei sceso fin qui? Allora hai fegato.\nO incoscienza.",
             "Quella mole di bronzo in fondo è il\nTAURIN, il toro di San Carlo. Di\ngiorno dorme. Adesso... vedi tu."] }
  ],
  gransanbernardo: [
    { x:8, y:4, frame:12, name:'ALPINISTA', ev:'trainer', look:'right', sight:7,
      trainer:{ id:'gsb1', team:[['neiot',15],['civettona',15]],
        pre:["A quest'altitudine o sei allenato\no torni a valle. Vediamo te."],
        win:["Bravo. Hai i polmoni giusti, vah."],
        after:["Su, ancora un tornante."] } },
    { x:15, y:8, frame:11, name:'GUIDA', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gsb2', team:[['brinassa',16],['neiot',15]],
        pre:["Conosco ogni crepaccio, e ogni\nLeggenda che ci vive dentro."],
        win:["Niente male, per uno di città."],
        after:["La grotta è più giù. Copriti."] } },
    { x:8, y:13, frame:14, name:'BRACCONIERE', ev:'trainer', look:'right', sight:7,
      trainer:{ id:'gsb3', team:[['lupomannaro',16],['neiot',16]],
        pre:["Caccio quassù da anni. Anche cose\nche non dovrei: la Cosca paga bene."],
        win:["Tch. Mi hai rovinato la battuta."],
        after:["Sparisci, prima che cambi idea."] } }
  ],
  gelo: [
    { x:3, y:10, frame:8, name:'MONACO',
      lines:["Pace, viandante. Questa grotta la\nconoscono in pochi.",
             "Su quel banco di ghiaccio si posa\nBARRY, il San Bernardo che salvò\ncento dispersi. Se si fida, ti seguirà."] }
  ],
  genova: [
    { x:9,  y:5,  frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:16, y:8,  frame:9,  name:'CAMALLO',
      lines:["Ohè! Faccio il camallo, scarico navi\nda trent'anni. Belin che schiena.",
             "Di notte, al porto, arrivano container\nche è meglio non vedere. Roba della\nCosca, dicono."] },
    { x:6,  y:11, frame:11, name:'PESCIVENDOLA',
      lines:["Acciughe fresche! E se ti serve,\ndavanti al molo l'Anguana abbocca,\nohè. Tira fuori la canna."] }
  ],
  gymge: [
    { x:5, y:2, frame:13, name:'BARBAGIALLA', ev:'gymLeader' },
    { x:3, y:5, frame:11, name:'MOZZO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymge1', team:[['anguanella',21]],
        pre:["Prima di Barbagialla passi da me,\nmussu. Ordini del capo."],
        win:["Uff. Va', va'. Ti aspetta in fondo."],
        after:["Il capo è là. Non farlo arrabbiare."] } },
    { x:8, y:7, frame:9, name:'OSTREGA', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymge2', team:[['borda',22],['anguanella',23]],
        pre:["Belin, un altro per la medaglia.\nVediamo se reggi l'onda."],
        win:["Brava gente. Vai dal vecchio."],
        after:["Barbagialla non perde spesso, eh."] } }
  ],
  ambge: [
    { x:3, y:1, frame:8, name:'DOTTORESSA SCIORBA', ev:'cura' }
  ],
  scogliera: [
    { x:8, y:5, frame:14, name:'CONTRABBANDIERE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'sco1', team:[['ratapignata',18],['borda',19]],
        pre:["Questo tratto di costa lo gestisce\nla Cosca. Tu qui non passi."],
        win:["Maledizione. Vada per stavolta."],
        after:["Ti tengo d'occhio, bagai."] } },
    { x:8, y:10, frame:11, name:'PESCATORE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'sco2', team:[['anguanella',19],['merlotta',19]],
        pre:["Pesco da prima che tu nascessi,\ne so anche lottare, ohè."],
        win:["Bè, hai polso. Buona pesca!"],
        after:["L'Anguana abbocca al largo, prova."] } },
    { x:8, y:14, frame:14, name:'GUARDIACOSTE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'sco3', team:[['borda',20],['ratapignata',20]],
        pre:["Dovrei fermare i contrabbandieri.\nMa la Cosca paga meglio dello Stato."],
        win:["Tch. Non hai visto niente, intesi?"],
        after:["Gira al largo, ragazzo."] } },
    { x:2, y:8, frame:9, name:'BAGNINO',
      lines:["Più giù c'è la vecchia LANTERNA.\nIn cima dicono si posi il GRIFONE,\nquello dello stemma di Genova.",
             "Si mostra a chi se lo merita. O a\nchi è abbastanza matto da salire."] }
  ],
  lanterna: [
    { x:3, y:9, frame:12, name:'GUARDIANO DEL FARO',
      lines:["La luce della Lanterna non si spegne\nda secoli. E non è solo la lampada\na vegliare.",
             "Lassù c'è il GRIFONE. Se dispiega le\nali, preparati: ti sta valutando."] }
  ],
  stradapo: [
    { x:7, y:6, frame:14, name:'PICCIOTTO', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'spo1', team:[['bisso',8],['mazapegul',9]],
        pre:["Questa strada è nostra, bagai.\nSi paga il pedaggio."], win:["Tch. Stavolta passa."], after:["Ci rivediamo, eh."] } },
    { x:14, y:13, frame:14, name:'PALO', ev:'trainer', look:'up', sight:6,
      trainer:{ id:'spo2', team:[['merlotta',9],['servanot',10]],
        pre:["Faccio il palo. Non passi senza\nsalutare la Cosca."], win:["Vada, vada."], after:["Occhio, eh."] } },
    { x:20, y:6, frame:14, name:'GREGARIO', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'spo3', team:[['mazapegul',10],['bisso',11]],
        pre:["L'ultimo prima di Torino sono io.\nE non sono gentile."], win:["Uff. Forte, il bagai."], after:["La Cosca ti aspetta avanti."] } }
  ],
  valico: [
    { x:7, y:6, frame:14, name:'SENTINELLA', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'val1', team:[['masca',13],['servanot',13]],
        pre:["Quassù si gela e si paga doppio.\nMani in alto, le Leggende."], win:["Brr... vada."], after:["Su, su."] } },
    { x:14, y:13, frame:14, name:'CONTRABBANDIERE', ev:'trainer', look:'up', sight:6,
      trainer:{ id:'val2', team:[['lupomannaro',14],['neiot',14]],
        pre:["Porto roba oltre il valico, roba che\nnon dovrei. Tu non hai visto niente."], win:["Maledizione al freddo e a te."], after:["Niente parole, intesi?"] } },
    { x:20, y:6, frame:14, name:'BRACCO', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'val3', team:[['neiot',15],['masca',15]],
        pre:["Fiuto i deboli a un miglio.\nE tu puzzi di pivello."], win:["Bah. Mi sbagliavo."], after:["Vai, vai."] } }
  ],
  appennino: [
    { x:7, y:6, frame:14, name:'SCAGNOZZO', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'app1', team:[['lupomannaro',17],['borda',17]],
        pre:["La strada per il mare la teniamo noi.\nPizzo o pugni."], win:["Tch. Passa, per stavolta."], after:["La Cosca scrive tutto."] } },
    { x:14, y:13, frame:14, name:'CORRIERE', ev:'trainer', look:'up', sight:6,
      trainer:{ id:'app2', team:[['ratapignata',18],['civettona',18]],
        pre:["Consegno pacchi per la Cosca,\ne tu mi rallenti."], win:["Sono in ritardo per colpa tua!"], after:["Spostati, bagai."] } },
    { x:20, y:6, frame:14, name:'LUOGOTENENTE', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'app3', team:[['borda',19],['ratapignata',20]],
        pre:["Sono un luogotenente della Cosca.\nE tu sei solo un fastidio."], win:["...Johnny aveva ragione su di te."], after:["Genova ti aspetta. E anche noi."] } }
  ],
  bolzano: [
    { x:9,  y:5, frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:16, y:8, frame:11, name:'SCHÜTZE',
      lines:["Servus! Bella Bolzano, eh? Due lingue,\nuna montagna sola.",
             "Sul Catinaccio, al tramonto, la roccia\ndiventa rossa: è l'enrosadira. Dicono\nsia la maledizione di Re Laurino."] },
    { x:6, y:11, frame:9, name:'NONNA SPECK',
      lines:["Mangia qualcosa, magrolino! Speck e\npane di segale. Poi vai pure a sfidare\nHans, ma copriti."] }
  ],
  gymtr: [
    { x:5, y:2, frame:13, name:'HANS', ev:'gymLeader' },
    { x:3, y:5, frame:12, name:'MAESTRO DI SCI', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymtr1', team:[['neiot',25],['croder',25]],
        pre:["Prima di Hans, una sciata con me.\nReggi la discesa?"], win:["Bravo, gambe buone. Vai dal capo."], after:["Hans è in fondo, ja."] } },
    { x:8, y:7, frame:11, name:'GUARDIA FORESTALE', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymtr2', team:[['croder',26],['brinassa',27]],
        pre:["Proteggo queste montagne. Anche da\nte, se serve."], win:["Bene. Hans ti aspetta."], after:["Rispetta la montagna, lassù."] } }
  ],
  ambtr: [
    { x:3, y:1, frame:8, name:'DOTTORESSA GRUBER', ev:'cura' }
  ],
  dolomiti: [
    { x:8, y:5, frame:14, name:'SCALATORE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'dol1', team:[['croder',24],['neiot',25]],
        pre:["Questo sentiero lo controlla la Cosca.\nTu paghi o scali altrove."], win:["Tch. Passa."], after:["Occhio ai sassi, eh."] } },
    { x:8, y:10, frame:14, name:'GUIDA', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'dol2', team:[['brinassa',26],['croder',26]],
        pre:["Conosco ogni croda. E ogni nascondiglio\ndella Cosca quassù."], win:["Niente male, valligiano."], after:["La grotta è più giù."] } },
    { x:8, y:13, frame:14, name:'BRACCONIERE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'dol3', team:[['lupomannaro',26],['crodon',27]],
        pre:["Caccio camosci e fastidi. Tu sei\nun fastidio."], win:["Bah. Sparisci."], after:["Re Laurino ti aspetta, se osi."] } }
  ],
  rosengarten: [
    { x:3, y:9, frame:12, name:'EREMITA',
      lines:["Sei salito fin qui, tra le rose di pietra.\nPochi osano.",
             "Re Laurino dorme nel suo giardino.\nSe lo svegli, che la montagna ti assista."] }
  ],
  valdadige: [
    { x:7, y:6, frame:14, name:'PICCIOTTO', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'vda1', team:[['civettona',20],['borda',21]],
        pre:["La Val d'Adige è zona nostra, bagai.\nPedaggio."], win:["Tch. Vai."], after:["Ci rivediamo."] } },
    { x:14, y:13, frame:14, name:'CORRIERE', ev:'trainer', look:'up', sight:6,
      trainer:{ id:'vda2', team:[['lupomannaro',21],['ratapignata',22]],
        pre:["Porto pacchi della Cosca su per la valle.\nTu non mi rallenti."], win:["In ritardo, per colpa tua!"], after:["Spostati."] } },
    { x:20, y:6, frame:14, name:'CAPOZONA', ev:'trainer', look:'down', sight:6,
      trainer:{ id:'vda3', team:[['borda',22],['croder',23]],
        pre:["Gestisco la valle per la Cosca.\nE tu non sei sulla lista degli ospiti."], win:["...forte, il bagai."], after:["Bolzano ti aspetta. E anche noi."] } }
  ],
  /* ---------- REGIONE 6 · VENETO ---------- */
  venezia: [
    { x:9,  y:5,  frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:18, y:5,  frame:9,  name:'GONDOLIERE',
      lines:["Benvenuto a Venezia, forestiero!\nIl Canal Grande divide la città\nin due: acqua da una parte, acqua dall'altra.",
             "Il LEON DE SAN MARCO veglia da\nsecoli. Dicono si nasconda in una\ncalle che non trovi sulle mappe."] },
    { x:8,  y:14, frame:11, name:'PESCATRICE',
      lines:["In laguna si pesca, si vive e si muore.\nE si incontrano creature che non\nexistono altrove.",
             "Prendi la canna e scendi in laguna,\nse hai coraggio. L'acqua là nasconde\ncose strane tra le canne."] },
    { x:18, y:16, frame:12, name:'VECCHIETTO',
      lines:["Sessant'anni che vivo qui. La laguna\ncambia ogni giorno. Il Leon, invece,\nnon cambia mai.",
             "C'è una calle che non trovi sulle\nmappe. L'acqua ci entra dentro.\nE qualcosa ci abita da sempre."] }
  ],
  gymve: [
    { x:5, y:2, frame:13, name:'BEPI', ev:'gymLeader' },
    { x:3, y:5, frame:10, name:'REMATORE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymve1', team:[['mazariol',30],['anguanella',30]],
        pre:["Per arrivare a Bepi si rema contro\ncorrente. Inizia con me, veh."],
        win:["Bè, sei in forma. Bepi ti aspetta\nin fondo alla palestra."],
        after:["Vai, vai. Non farlo aspettare."] } },
    { x:8, y:7, frame:11, name:'MURANERA', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymve2', team:[['mazarione',31],['borda',32]],
        pre:["Vengo da Murano: lavoro il vetro\ne l'acqua da vent'anni. Vediamo\nse sai lavorare te."],
        win:["Ostrega! Sei bravo davvero.\nBepi sarà contento, veh."],
        after:["Il capo è in fondo. Rispettalo."] } }
  ],
  ambve: [
    { x:3, y:1, frame:8, name:'DOTTORESSA MALIPIERO', ev:'cura' }
  ],
  laguna: [
    { x:2, y:5,  frame:14, name:'BARCAIOLO DELLA COSCA', ev:'trainer', look:'right', sight:9,
      trainer:{ id:'lag1', team:[['mazariol',28],['anguanella',28]],
        pre:["La laguna l'abbiamo privatizzata noi.\nSe vuoi passare, le tue Leggende\nparlano con le mie."],
        win:["Tch. Passa. Ma la Cosca ricorda."],
        after:["La nebbia copre tutto, laggiù."] } },
    { x:2, y:10, frame:14, name:'CONTRABBANDIERA', ev:'trainer', look:'right', sight:9,
      trainer:{ id:'lag2', team:[['mazariol',29],['borda',30]],
        pre:["Porto roba tra le barene di notte.\nTu mi rallenti. Non mi piace."],
        win:["Bah. Vada per stavolta."],
        after:["Questa zona è nostra. Non tornare."] } },
    { x:2, y:14, frame:14, name:'CAPOBARCA', ev:'trainer', look:'right', sight:9,
      trainer:{ id:'lag3', team:[['mazarione',30],['borda',31]],
        pre:["Controllo questo tratto di laguna\nper la Cosca. Ultimo guardiano\nprima della calle."],
        win:["...non ci siamo capiti. Hai vinto.\nPassarà."],
        after:["La calle è in fondo. Non dire\nche ti ho lasciato passare."] } }
  ],
  calle: [
    { x:3, y:9, frame:12, name:'CUSTODE DELLA CALLE',
      lines:["Ci abito da quando sono nato.\nQuesta calle non esiste sulle mappe\nufficiali. Per un motivo.",
             "Nell'acqua là sopra si posa il LEON\nDE SAN MARCO. Non disturbarlo,\nforestiero. Te lo chiedo per favore."] }
  ],
  brenta: [
    { x:7, y:6, frame:14, name:'PICCIOTTO', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'bre1', team:[['civettona',25],['borda',25]],
        pre:["Questo tratto del Brenta è zona Cosca.\nPaghi o ti bagni."],
        win:["Tch. Vada."], after:["La corrente è forte, laggiù."] } },
    { x:14, y:13, frame:14, name:'CORRIERE', ev:'trainer', look:'up', sight:4,
      trainer:{ id:'bre2', team:[['lupomannaro',26],['ratapignata',26]],
        pre:["Porto pacchi su per il fiume.\nTu sei un ostacolo."],
        win:["In ritardo, per tua colpa!"], after:["Sparisci."] } },
    { x:20, y:6, frame:14, name:'GUARDIANO', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'bre3', team:[['croder',27],['mazariol',27]],
        pre:["L'ultimo prima di Venezia sono io.\nE non sono gentile come i colleghi."],
        win:["...forte, il forestiero. Venezia\nti aspetta. E anche la Cosca."],
        after:["Laguna dritta, poi a destra."] } }
  ]
};
