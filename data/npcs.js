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
    { x:4, y:13, frame:15, name:'GIORNALAIO GINO', ev:'giornalaio' },
    { x:10, y:6, frame:9, name:'PIVA', ev:'piva' }
  ],
  parco: [
    { x:14, y:13, frame:12, name:'VECCHIETTO',
      lines:["Nell'erba alta vivono le\nLeggende, fioeu. Quelle vere.",
             "Pare ci sia anche un MUNACIELLO.\nRaro come un parcheggio gratis."] },
    { x:5, y:5, frame:16, name:'NOTA SMARRITA', ev:'pivanota', note:1 }
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
    { x:4, y:8, frame:12, name:'PESCATORE', ev:'pescatore' },
    { x:12, y:8, frame:16, name:'NOTA SMARRITA', ev:'pivanota', note:2 }
  ],
  segreto: [
    { x:8, y:7, frame:9, name:'VECCHIA DEL NAVIGLIO',
      lines:["Sei arrivato fin qui, eh.\nIn pochi ci riescono.",
             "Quella sull'acqua non è nebbia.\nÈ la SCIGHÉRA. Se si mostra,\nsalutala con rispetto."] },
    { x:5, y:10, frame:16, name:'NOTA SMARRITA', ev:'pivanota', note:3 }
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
      lines:["Acciughe fresche! E se ti serve,\ndavanti al molo l'Anguana abbocca,\nohè. Tira fuori la canna."] },
    { x:20, y:5, frame:11, name:'LICATA', ev:'licata' }
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
             "Si mostra a chi se lo merita. O a\nchi è abbastanza matto da salire."] },
    { x:11, y:8, frame:16, name:'RIFLESSO NELL\'ACQUA', ev:'licatamed' }
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
  ],
  isonzo: [
    { x:7,  y:2,  frame:14, name:'PICCIOTTO DELL\'ISONZO', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'iso1', team:[['cjalcjut',30],['borda',30]],
        pre:["Frontiera del Friuli. Si paga dazio.\nAnche in Leggende."],
        win:["Niente da fare..."], after:["Continua a est."] } },
    { x:20, y:7,  frame:14, name:'CORRIERE DEL FRIULI', ev:'trainer', look:'up', sight:5,
      trainer:{ id:'iso2', team:[['mazariol',31],['ratapignata',31]],
        pre:["Sto consegnando qualcosa alla Cosca\ndi Trieste. Non farti i cazzi miei."],
        win:["Maledetto ritardo."], after:["Sbrigati, si alza il vento."] } },
    { x:14, y:11, frame:14, name:'BATTITORE LIBERO', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'iso3', team:[['cjalcjutone',32],['borda',32]],
        pre:["Il CJALCJUTONE mi ha insegnato\na non aver paura del buio.\nE neanche di te."],
        win:["...ti stimo."], after:["Trieste è là. Attento alla BORA."] } }
  ],
  trieste: [
    { x:9,  y:5,  frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:18, y:5,  frame:9,  name:'BARCAIOLO',
      lines:["Il vento! Fa saltare tutto, porco\ncane. La BORA è la nostra signora\ne la nostra maledizione.",
             "Mio nonno diceva: 'Se la BORA\nnon ti spaventa, non hai ancora\npassato un inverno a Trieste.'"] },
    { x:8,  y:10, frame:11, name:'PENSIONATA',
      lines:["Di notte, quando soffia la BORA,\nsi sentono voci nelle pietre.\nI vecchi dicono che è lei.",
             "La grotta sul Carso... ci andava\nmio padre. Non tornò allegro.\nDisse solo: 'È viva.'"] },
    { x:18, y:10, frame:12, name:'STUDENTE',
      lines:["Sto studiando meteorologia.\nLa BORA è un vento catabatico\nda nord-est, freddissimo.",
             "C'è una grotta sul Carso.\nDicono che lì dentro il vento\nnon si ferma mai. Mai."] },
    { x:13, y:6, frame:10, name:'FACCI', ev:'facci' }
  ],
  gymts: [
    { x:5, y:2, frame:13, name:'GIGIO', ev:'gymLeader' },
    { x:3, y:5, frame:10, name:'BORESANO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymts1', team:[['cjalcjut',34],['ratapignata',34]],
        pre:["Ho vissuto quarant'anni a Trieste.\nSo cos'è il vento. E sa combattere."],
        win:["Eh... il vento non è sempre\ndalla nostra parte."],
        after:["GIGIO è là. Non si batte facilmente."] } },
    { x:8, y:7, frame:11, name:'TRIESTINA', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymts2', team:[['cjalcjutone',35],['borda',35]],
        pre:["La BORA mi ha insegnato la forza.\nNon mi passi davanti così."],
        win:["Buono a sapersi. Sei degno\ndi sfidare GIGIO."],
        after:["Tieni duro là dentro."] } }
  ],
  ambts: [
    { x:3, y:1, frame:8, name:'DOTTOR SVEVO', ev:'cura' }
  ],
  carso: [
    { x:7,  y:6,  frame:14, name:'SCAGNOZZO DEL CARSO', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'car1', team:[['cjalcjut',32],['ratapignata',33]],
        pre:["Il Carso è nostro. Ogni sasso,\nogni grotta. Paga il pedaggio."],
        win:["Tch. Vada."], after:["Non avvicinarti alla grotta."] } },
    { x:14, y:13, frame:14, name:'CONTRABBANDIERA', ev:'trainer', look:'up', sight:4,
      trainer:{ id:'car2', team:[['lupomannaro',33],['cjalcjut',33]],
        pre:["Porto roba che non si chiede\ne non si dice. Fuori dai piedi."],
        win:["Bene. Potresti lavorare per noi."],
        after:["Ignorami e vai per la tua strada."] } },
    { x:20, y:6,  frame:14, name:'CAPOMANDRIA', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'car3', team:[['cjalcjutone',34],['borda',34]],
        pre:["Il CJALCJUTONE del Carso non teme\nniente. Nemmeno i forestieri armati\ndi Leggende."],
        win:["...sei migliore di quanto pensassi.\nLa grotta è a nord. Se ci tieni\nla pelle, stai lontano."],
        after:["Vai. Il vento ti guiderà."] } }
  ],
  grotta_bora: [
    { x:12, y:8, frame:12, name:'GUARDIANO DEL VENTO',
      lines:["Shhh...",
             "La BORA dorme qui dentro.\nDopo secoli, dorme.\nNon svegliarla.",
             "Se la svegli... beh.\nSarà colpa tua. Io te l'ho detto."] }
  ],

  /* ========== EMILIA-ROMAGNA (Bologna) ========== */
  pianurapo: [
    { x:7,  y:2,  frame:14, name:'PICCIOTTO DELLA PIANURA', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'pia1', team:[['foghin',37],['borda',37]],
        pre:["Pianura Padana, zona Cosca.\nQui la nebbia copre tutto.\nAnche te, se non paghi."],
        win:["Tch. Passa, va'."], after:["Sparisci nella nebbia."] } },
    { x:20, y:7,  frame:14, name:'CONTRABBANDIERE', ev:'trainer', look:'up', sight:5,
      trainer:{ id:'pia2', team:[['lupomannaro',38],['civettona',38]],
        pre:["Porto roba lungo la Via Emilia\nda anni. Tu non sei previsto."],
        win:["Maledetto ritardo."], after:["Tira dritto verso Bologna."] } },
    { x:14, y:13, frame:14, name:'CAPOZONA', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'pia3', team:[['foghin',38],['ratapignata',39]],
        pre:["Ultimo prima di Bologna.\nE non sono gentile come i\ncolleghi della pianura."],
        win:["...soccia, sei forte.\nBologna ti aspetta."],
        after:["Le Due Torri si vedono di là."] } }
  ],
  bologna: [
    { x:9,  y:5,  frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:18, y:5,  frame:9,  name:'STUDENTE FUORISEDE',
      lines:["Soccia, benvenuto a Bologna!\nLa Dotta, la Grassa, la Rossa.\nUniversità più antica del mondo.",
             "Le Due Torri pendono da secoli.\nDicono che la Garisenda l'abbia\ntirata su il diavolo in persona."] },
    { x:8,  y:14, frame:11, name:'AZDORA',
      lines:["Ciò, mangia qualcosa che sei secco!\nQui si fanno tortellini, tagliatelle\ne ragù. Mica come al nord, neh.",
             "Di notte, lungo il Reno, si vedono\nfiammelle che ballano. Fuochi fatui,\nli chiamano. O qualcosa di peggio."] },
    { x:18, y:16, frame:12, name:'PROFESSORE',
      lines:["Studio le leggende bolognesi da\nquarant'anni. La più oscura?\nIL DIÂL. Il diavolo delle Torri.",
             "Si dice abiti ancora lassù, in cima\nalla Garisenda. Ride, quando il\nvento fischia tra i mattoni."] }
  ],
  gymbo: [
    { x:5, y:2, frame:13, name:'DINDO', ev:'gymLeader' },
    { x:3, y:5, frame:10, name:'GOLIARDO', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymbo1', team:[['foghin',38],['civettona',38]],
        pre:["Per arrivare a Dindo devi passare\nl'esame. E io sono severo, matricola."],
        win:["Promosso! Dindo ti aspetta\nin fondo all'aula."],
        after:["Vai, vai. È in cattedra."] } },
    { x:8, y:7, frame:11, name:'CUOCA', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymbo2', team:[['fogaron',39],['farfarello',39]],
        pre:["Il fuoco lo conosco: ci cucino\nda trent'anni. Vediamo se reggi\nil calore."],
        win:["Soccia, che lotta! Sei degno\ndi sfidare Dindo."],
        after:["Il capo è là. Non bruciarti."] } }
  ],
  ambbo: [
    { x:3, y:1, frame:8, name:'DOTTORESSA MORANDI', ev:'cura' }
  ],
  viaemilia: [
    { x:7,  y:6,  frame:14, name:'SCAGNOZZO DELLA VIA', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'vem1', team:[['foghin',36],['borda',36]],
        pre:["La Via Emilia è nostra, dalla\nprima all'ultima pietra romana.\nPaga il pedaggio."],
        win:["Tch. Passa."], after:["Non avvicinarti alle Torri."] } },
    { x:14, y:13, frame:14, name:'CORRIERE NOTTURNO', ev:'trainer', look:'up', sight:4,
      trainer:{ id:'vem2', team:[['lupomannaro',37],['foghin',37]],
        pre:["Consegno roba che non si dichiara.\nLevati di mezzo, forestiero."],
        win:["Bene. Potresti servirci."],
        after:["Tira dritto e zitto."] } },
    { x:20, y:6,  frame:14, name:'GUARDIANO DELLE TORRI', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'vem3', team:[['fogaron',38],['farfarello',38]],
        pre:["L'ultimo prima delle Due Torri\nsono io. E lassù non ci sali\nsenza il mio permesso."],
        win:["...va bene, va bene. Sali pure.\nMa quello che c'è in cima\nnon l'ho svegliato io."],
        after:["La scala è in fondo. Buona\nfortuna, ti servirà."] } }
  ],
  torri: [
    { x:3, y:9, frame:12, name:'CUSTODE DELLA GARISENDA',
      lines:["Ci salgo ogni notte da quando ero\nragazzo. Questa torre pende per un\nmotivo, sai? Non è solo geometria.",
             "Lassù in cima si posa IL DIÂL.\nIl diavolo che, dice la leggenda,\naiutò a costruirla. Non disturbarlo."] }
  ],

  /* ========== TOSCANA (Firenze) ========== */
  futa: [
    { x:7,  y:2,  frame:14, name:'PICCIOTTO DEL VALICO', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'fut1', team:[['strio',41],['borda',41]],
        pre:["Il valico è nostro, o bischero.\nDi qua non si passa senza\nlasciare qualcosa alla Cosca."],
        win:["Uffa. Passa, va'."], after:["Tira dritto verso Firenze."] } },
    { x:20, y:7,  frame:14, name:'CORRIERE TOSCO-EMILIANO', ev:'trainer', look:'up', sight:5,
      trainer:{ id:'fut2', team:[['lupomannaro',42],['civettona',42]],
        pre:["Porto roba su e giù per l'Appennino\nda anni. Tu non eri in programma."],
        win:["Maledetti tornanti e maledetto te."], after:["Scendi, scendi in Toscana."] } },
    { x:14, y:13, frame:14, name:'CAPOVALICO', ev:'trainer', look:'down', sight:4,
      trainer:{ id:'fut3', team:[['strio',42],['farfarello',43]],
        pre:["Ultimo prima di Firenze.\nE non sono gentile come quelli\ndi pianura, te lo dico."],
        win:["...o bischero, sei forte davvero.\nFirenze ti aspetta."],
        after:["Il Duomo si vede di là."] } }
  ],
  firenze: [
    { x:9,  y:5,  frame:15, name:'NEGOZIANTE', ev:'negozio' },
    { x:18, y:5,  frame:9,  name:'GUIDA TURISTICA',
      lines:["Benvenuto a Firenze, culla del\nRinascimento! Il Duomo, gli Uffizi,\nil Ponte Vecchio... e il giglio.",
             "Ma c'è una Firenze più antica,\nsotto. Gli Etruschi. E le loro\ntombe nascondono cose che vegliano."] },
    { x:8,  y:14, frame:11, name:'ANTIQUARIA',
      lines:["Vendo reperti etruschi, tutti veri\n(quasi). Gli Etruschi leggevano il\nfuturo nelle viscere degli animali.",
             "Dicono che L'ARÙSPICE, il più grande\nindovino, dorma ancora in un ipogeo\ntra le colline del Chianti."] },
    { x:18, y:16, frame:12, name:'STUDENTE DI STORIA',
      lines:["Icché ti dico: Firenze è bella ma\nguardati le spalle. La Cosca compra\npalazzi e gallerie come noccioline.",
             "L'ipogeo etrusco? Gli è tra le viti\ndel Chianti. Ma quel che c'è dentro\nti legge nel pensiero. Stai attento."] }
  ],
  gymfi: [
    { x:5, y:2, frame:13, name:'CHECCONE', ev:'gymLeader' },
    { x:3, y:5, frame:10, name:'RESTAURATORE', ev:'trainer', look:'right', sight:6,
      trainer:{ id:'gymfi1', team:[['strio',43],['civettona',43]],
        pre:["Per arrivare a Checcone passi\nl'esame d'arte e di mente.\nComincia da me, o bischero."],
        win:["Bravo! Checcone ti aspetta\nin fondo alla galleria."],
        after:["Vai, gli è là che t'aspetta."] } },
    { x:8, y:7, frame:11, name:'CARTOMANTE', ev:'trainer', look:'left', sight:6,
      trainer:{ id:'gymfi2', team:[['strione',44],['farfarello',44]],
        pre:["Leggo la mente e le carte da\ntrent'anni. So già come finisce\nquesta sfida. Ma facciamola lo stesso."],
        win:["Le carte... mentivano. Sei degno\ndi Checcone."],
        after:["Il capo è là. Concentrati."] } }
  ],
  ambfi: [
    { x:3, y:1, frame:8, name:'DOTTORESSA VESPUCCI', ev:'cura' }
  ],
  chianti: [
    { x:7,  y:6,  frame:14, name:'SCAGNOZZO DEL CHIANTI', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'chi1', team:[['strio',40],['borda',40]],
        pre:["Queste colline le controlliamo noi.\nVino, ulivi e pizzo. Paga, forestiero."],
        win:["Uffa. Passa."], after:["Non avvicinarti all'ipogeo."] } },
    { x:14, y:13, frame:14, name:'CONTRABBANDIERA', ev:'trainer', look:'up', sight:4,
      trainer:{ id:'chi2', team:[['lupomannaro',41],['strio',41]],
        pre:["Porto bottiglie che non hanno\netichetta. Levati, o bischero."],
        win:["Bah. Vada per stavolta."],
        after:["Fatti i fatti tuoi e tira dritto."] } },
    { x:20, y:6,  frame:14, name:'GUARDIANO DELL\'IPOGEO', ev:'trainer', look:'down', sight:5,
      trainer:{ id:'chi3', team:[['strione',42],['farfarello',42]],
        pre:["L'ultimo prima della tomba etrusca\nsono io. E quel che dorme là sotto\nè meglio lasciarlo dormire."],
        win:["...va bene, scendi pure. Ma non\ndire che non ti avevo avvisato."],
        after:["La tomba è in fondo. In bocca al lupo."] } }
  ],
  ipogeo: [
    { x:3, y:9, frame:12, name:'GUARDIANO ETRUSCO',
      lines:["Parla piano, forestiero.\nQuesto ipogeo ha tremila anni e\nchi vi dorme è più vecchio ancora.",
             "L'ARÙSPICE legge il futuro e il\npensiero. Se lo svegli, saprà ogni\ntua mossa prima di te. Buona fortuna."] }
  ]
};
