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
  ]
};
