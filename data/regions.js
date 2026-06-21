/* Dati di regione — palestre, schermata fine-regione, intro di palestra e respawn.
   Aggiungere una regione/palestra = aggiungere UNA voce qui (più maps/npcs/creatures):
   nessuna nuova funzione in src/story.js. La logica generica è evGymLeader/showRegionEnd.

   Chiave = id della mappa-palestra (gym, gymto, gymao, ...). Campi:
     leader, type, badge (nome flag), team [[id,lv]], challenge (riga di sfida),
     intro (testo all'ingresso), done (dialogo a medaglia già presa),
     openers {good,bad,neutral} (in base alla reputazione/morale),
     win (righe dopo la vittoria), loseMsg (dopo la sconfitta),
     endAfterWin (default true; false = la fine regione la fa un altro evento),
     end { title, medal, region, next(html), footer(html), verdict{good,bad,neutral},
           goodAt/badAt (soglie morale, default +2/-2) }. */
const GYMS = {
  gym: {
    leader:'CARLETTO', type:'Normale', badge:'badge', region:1,
    team:[['mazapegul',9],['bisso',10],['gattomammone',12]],
    challenge:"Regola della casa: chi vince piglia\nla MEDAGLIA MADONNINA. Si va!",
    intro:[
      "La palestra del Duomo.\nPavimento in marmo, eco solenne.",
      "In fondo alla sala, un tizio in\ntuta firmata ti sta aspettando."],
    done:[
      "Taaac! Il mio campione preferito.\nVai a Torino, da GIANDUIOTTO.",
      "E occhio alla Cosca, neh.\nQui a Milano ci penso io."],
    openers:{
      good:[
        "Uè! Tu sei quello dell'edicola!\nTutta Milano ne parla, taaac.",
        "Mi piace chi difende il quartiere.\nVediamo se sai anche lottare!"],
      bad:[
        "Uè. Girano voci strane su di te.\nAmicizie... particolari.",
        "A Milano si lavora, non si\ntrafficano favori. Dimostrami\nchi sei davvero!"],
      neutral:[
        "Benvenuto! Io sono CARLETTO,\ncapopalestra di Milano.",
        "Tipo NORMALE. Come il quartiere:\nniente fronzoli, solo sostanza."]
    },
    win:[
      "Carletto richiama il suo GATTO\nMAMMONE e... applaude.",
      "«Taaac! Niente da dire, bagai.\nHai stoffa da vendere.»",
      "Hai ottenuto la MEDAGLIA MADONNINA!\n(1 di 20)",
      "«Senti... ti devo dire una cosa.\nIn privato.»",
      "«La Cosca è arrivata anche da me.\nVogliono che perda gli incontri.\nScommesse truccate.»",
      "«Io ho detto no. Ma altri\ncapipalestra... non so.»",
      "«Vai a TORINO, da Gianduiotto.\nIl treno parte dalla STAZIONE\nCENTRALE, a nord-est.»",
      "«E fidati di pochi, neh.»"],
    loseMsg:"Carletto ti aspetta in palestra.\n«Riposati e torna, neh!»",
    end:{
      title:'★ FINE DELLA DEMO ★',
      medal:'MEDAGLIA MADONNINA ottenuta!', region:'Regione 1 di 20 completata',
      next:'PROSSIMA FERMATA: TORINO<br>Gianduiotto · Tipo Acciaio',
      footer:'Premi A per continuare.<br>Il treno parte dalla STAZIONE CENTRALE,<br>a nord-est di Milano.',
      verdict:{
        good:'Milano ti chiama «il bagai\ndell’edicola». Un eroe di quartiere.',
        bad:'Una N dorata è apparsa sul tuo\nzaino. La Cosca ti considera\nun amico. Per ora.',
        neutral:'Milano non ti ha ancora\ngiudicato. Le scelte pesano,\nprima o poi.'}
    }
  },

  gymto: {
    leader:'GIANDUIOTTO', type:'Acciaio', badge:'badge2', region:2,
    team:[['servanot',14],['fusinot',15],['masca',16],['toret',18]],
    challenge:"«Chi vince piglia la MEDAGLIA\nDELLA MOLE. Bogia!»",
    intro:[
      "La palestra di Torino: una vecchia\nofficina riconvertita.",
      "Odore di metallo e cioccolato.\nDal fondo, un tintinnio di\ningranaggi."],
    done:[
      "«Cerea, campione. La Medaglia\ndella Mole sta bene su di te.»",
      "«Vai in VALLE D'AOSTA, da Felicino.\nE trova quei registri.»"],
    openers:{
      good:[
        "«Cerea. Carletto mi ha scritto\ndi te. Solo cose buone.»",
        "«Qui però l'acciaio non si piega\ncon la simpatia. Vediamo cosa\nsai fare.»"],
      bad:[
        "«Cerea. Si dice che a Milano\nhai... stretto mani sbagliate.»",
        "«L'acciaio non mente, giovnot.\nIn pedana si vede chi sei.»"],
      neutral:[
        "«Cerea! Io sono GIANDUIOTTO,\ncapopalestra di Torino.»",
        "«Tipo ACCIAIO: come le officine\nche hanno fatto grande questa\ncittà. Esageruma nen... ma quasi.»"]
    },
    win:[
      "Gianduiotto richiama il suo TORET\ne si toglie il cappello.",
      "«Bogia. Niente male, giovnot.»",
      "Hai ottenuto la MEDAGLIA DELLA MOLE!\n(2 di 20)",
      "«Senti. Carletto ti ha parlato\ndella Cosca, vero? Ti dico una\ncosa che lui non sa.»",
      "«Anni fa l'officina stava\nfallendo. Loro mi hanno offerto\naiuto. E io l'ho accettato.»",
      "«Ho restituito tutto, fino\nall'ultimo centesimo. Ma il mio\nnome è ancora nei loro registri.»",
      "«Quei registri stanno in un\narchivio, da qualche parte sotto\nuna montagna, in VALLE D'AOSTA.»",
      "«Trovali, e mezza Italia respira.\nVai da FELICINO, ad Aosta.\nE copriti, lassù fa freddo.»"],
    loseMsg:"Gianduiotto ti aspetta in palestra.\n«Tempra il metallo e torna.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DELLA MOLE ottenuta!', region:'Regione 2 di 20 completata',
      next:'PROSSIMA TAPPA: VALLE D’AOSTA<br>Felicino · Tipo Ghiaccio · I registri della Cosca',
      footer:'Premi A per continuare a esplorare.<br>Grazie per aver giocato la demo!',
      verdict:{
        good:'Da Milano a Torino, la voce gira:\nc’è un bagai che non si compra.',
        bad:'La Cosca ti osserva con interesse.\nI loro registri hanno una pagina\nanche per te.',
        neutral:'Due medaglie, nessun padrone.\nPer ora cammini sul filo.'}
    }
  },

  gymao: {
    leader:'FELICINO', type:'Ghiaccio', badge:'badge3', region:3,
    team:[['neiot',18],['merlona',19],['brinassa',21],['brinassa',24]],
    challenge:"«Chi vince piglia la MEDAGLIA DEL\nMONTE BIANCO. Forza, vah!»",
    intro:[
      "La palestra di Aosta: una baita\ndi pietra, ghiaccioli al soffitto.",
      "Il respiro si condensa. In fondo,\nuna figura in piumino ti aspetta\nsenza fretta."],
    done:[
      "«La Medaglia del Monte Bianco ti\ndona, vah. Ora scendi in LIGURIA,\nda BARBAGIALLA, a Genova.»",
      "«E grazie. Per l'archivio.\nLa Valle non lo scorda.»"],
    openers:{
      good:[
        "«Cerea! Sei tu il bagai che non\nsi vende. Buon sangue.»",
        "«Quassù però il ghiaccio non fa\nsconti. Vediamo la tua scorza.»"],
      bad:[
        "«So che a valle hai stretto certe\nmani. Quassù le mani gelano, neh.»",
        "«Il ghiaccio mette tutti a nudo.\nVediamo chi sei davvero.»"],
      neutral:[
        "«Cerea! Io sono FELICINO,\ncapopalestra di Aosta.»",
        "«Tipo GHIACCIO, come le nostre vette:\nbelle da lontano, severe da vicino.»"]
    },
    win:[
      "Felicino richiama il suo BRINASSA\ne ti porge una mano gelata.",
      "Hai ottenuto la MEDAGLIA DEL\nMONTE BIANCO! (3 di 20)",
      "«Bravo davvero. Ma non sei salito\nfin quassù solo per la medaglia,\nvero?»",
      "«L'ARCHIVIO della Cosca è qui, sotto\nla Becca: la porta scura, a destra\nin paese.»",
      "«Stanotte le guardie non ci sono.\nÈ adesso o mai più. Vai: io copro\nl'ingresso.»",
      "«E se trovi i registri... fa' la cosa\ngiusta. O quella che riesci a\nguardare allo specchio.»"],
    loseMsg:"Felicino ti aspetta in palestra.\n«Riscaldati e torna, vah.»",
    endAfterWin:false,   // la fine-regione la fa l'evento archivio (scelta morale)
    end:{
      title:'★ REGIONE 3 · VALLE D\'AOSTA ★',
      medal:'MEDAGLIA DEL MONTE BIANCO ottenuta!', region:'Regione 3 di 20 completata',
      next:'PROSSIMA TAPPA: LIGURIA<br>Barbagialla · Tipo Acqua · Genova',
      footer:'Premi A: prosegui per GENOVA<br>(bus da Aosta, serve questa medaglia).',
      goodAt:4, badAt:-3,
      verdict:{
        good:'Da Milano alle Alpi, un nome corre\npiù veloce della Cosca: il tuo.',
        bad:'La Cosca ti chiama «socio».\nDormi al caldo — ma con un occhio\naperto.',
        neutral:'Tre medaglie, mani ancora pulite.\nL’Italia comincia a guardarti.'}
    }
  },

  gymge: {
    leader:'BARBAGIALLA', type:'Acqua', badge:'badge4', region:4,
    team:[['toron',24],['borda',25],['anguana',26],['anguanaregina',29]],
    challenge:'«Chi vince si piglia la MEDAGLIA\nDELLA LANTERNA. Forza, belin!»',
    intro:[
      "La palestra di Genova: una darsena\ncoperta, odore di salsedine e catrame.",
      "In fondo, un vecchio lupo di mare\nti aspetta con le braccia conserte."],
    done:[
      "«Ohè, campione. Va' in TRENTINO, da\nHans, a Bolzano. E porta una giacca\npesante.»",
      "«E grazie: il porto ti deve un favore.»"],
    openers:{
      good:[
        "«Belin, sei tu quello che gira l'Italia\nsenza farsi comprare. Mi piaci.»",
        "«Ma qui comanda il mare. Vediamo se\nsai nuotare controcorrente.»"],
      bad:[
        "«Ho sentito che a valle hai stretto\nmani bagnate.»",
        "«Il mare lava tutto, ma non i conti.\nIn acqua si vede chi sei.»"],
      neutral:[
        "«Ohè! Mi ciammo BARBAGIALLA,\ncapopalestra di Genova.»",
        "«Tipo ACQUA: come il porto, profondo\ne pieno di sorprese.»"]
    },
    win:[
      "Barbagialla richiama la sua ANGUANA\ne si gratta la barba gialla.",
      "«Belin che lotta. Te la sei\nguadagnata.»",
      "Hai ottenuto la MEDAGLIA DELLA\nLANTERNA! (4 di 20)",
      "«Senti: la Cosca ha le mani anche sul\nporto. Container che vanno e vengono\ndi notte.»",
      "«Ma è un'altra storia. Tu va' in\nTRENTINO, da Hans. E occhio al gelo,\nlassù.»"],
    loseMsg:"Barbagialla ti aspetta in palestra.\n«Riprenditi e torna, mussu.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DELLA LANTERNA ottenuta!', region:'Regione 4 di 20 completata',
      next:'PROSSIMA TAPPA: TRENTINO-A.A.<br>Hans · Ghiaccio/Roccia · Bolzano',
      footer:'Hai finito i contenuti della demo!<br>Premi A: puoi continuare a esplorare<br>liberamente le 4 regioni.',
      goodAt:5, badAt:-4,
      verdict:{
        good:'Da Milano al mare, un nome solo:\nil bagai che non si compra.',
        bad:'La Cosca ti conosce porto per porto.\nNaviga con un occhio alla scia.',
        neutral:'Quattro medaglie e mani pulite.\nMezza Italia, ormai, ti guarda.'}
    }
  },

  gymts: {
    leader:'GIGIO', type:'Vento', badge:'badge7', region:7,
    team:[['falchin',34],['ratavolora',35],['falchione',36],['cjalcjutone',39]],
    challenge:'«A Trieste si combatte con la BORA\nnei polmoni. Tieni duro!»',
    intro:[
      "La palestra di Trieste: una vecchia\nstazione della tramvia sul Carso,\npiena di correnti d'aria.",
      "In fondo, un uomo magro e nervoso\ncon gli occhi chiari ti osserva.\nDietro di lui, il vento fischia."],
    done:[
      "«Ben. Sei duro come il Carso.\nLa medaglia è tua.»",
      "«Il vento conosce la tua strada.\nSeguilo.»"],
    openers:{
      good:[
        "«Ho sentito di te. Un nome che la\nCosca non è riuscita a comprare.\nBen.»",
        "«Qui però decide la BORA. Vediamo\nse sai stare in piedi controvento.»"],
      bad:[
        "«Si dice che a valle tu abbia\nstretto mani che non si devono\nstringere.»",
        "«Il vento porta tutto. Anche le\nnotizie che non piacciono.»"],
      neutral:[
        "«Servito. Sono GIGIO, capopalestra\ndi Trieste.»",
        "«Tipo VENTO: come la BORA,\nveloce, freddo e imprevedibile.»"]
    },
    win:[
      "Gigio richiama il suo CJALCJUTONE\ne annuisce in silenzio.",
      "«Ben fatto. Ti sei guadagnato\nla Medaglia della Bora.»",
      "Hai ottenuto la MEDAGLIA DELLA BORA!\n(7 di 20)",
      "«La Cosca ha provato anche qui.\nIl vento ha portato via i loro piani.»",
      "«Vai avanti. L'Italia è lunga\ne il vento ti accompagna.»"],
    loseMsg:"Gigio ti aspetta in palestra.\n«Torna quando sei pronto al vento.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DELLA BORA ottenuta!', region:'Regione 7 di 20 completata',
      next:'PROSSIMA TAPPA: EMILIA-ROMAGNA<br>Dindo · Tipo Fuoco · Bologna',
      footer:'Premi A: prosegui verso l\'EMILIA<br>(percorso a sud da Trieste,<br>serve la Medaglia della Bora).',
      goodAt:8, badAt:-7,
      verdict:{
        good:'Da Milano a Trieste, un nome che\nla Cosca non riesce a fermare.',
        bad:'La Cosca ti segue passo per passo.\nPrima o poi il conto si paga.',
        neutral:'Sette medaglie. L\'Italia del nord\nconosce il tuo nome.'}
    }
  },

  gymve: {
    leader:'BEPI', type:'Acqua', badge:'badge6', region:6,
    team:[['mazarione',32],['bordona',33],['toron',35],['anguanaregina',38]],
    challenge:'«Chi vince piglia la MEDAGLIA DEL LEONE.\nVoga! Voga!»',
    intro:[
      "La palestra di Venezia: una vecchia\nrimessa per gondole, profumo di\nsalsedine e legno antico.",
      "In fondo, un omone sorridente con\nun remo tra le mani ti aspetta\nsenza fretta."],
    done:[
      "«Xè un piacere, forestiero. La medaglia\nla tieni bene.»",
      "«Gira, gira ancora. Il Veneto ha ancora\ncose da mostrarti.»"],
    openers:{
      good:[
        "«Ostrega! Sei tu il forestiero che gira\nl'Italia senza farsi comprare.\nMi piaci, veh.»",
        "«Qui però comanda la laguna. Vediamo\nse sai vogare controcorrente.»"],
      bad:[
        "«Ho sentito che a valle hai stretto\nmani sbagliate, xèlo?»",
        "«L'acqua non mente, forestiero.\nIn laguna si vede chi sei.»"],
      neutral:[
        "«Servito! Sono BEPI, capopalestra\ndi Venezia.»",
        "«Tipo ACQUA: come la laguna,\nprofonda e imprevedibile.»"]
    },
    win:[
      "Bepi richiama la sua ANGUANAREGINA\ne allarga le braccia.",
      "«Ostrega, bella lotta! Te lo sei\nguadagnato, forestiero.»",
      "Hai ottenuto la MEDAGLIA DEL LEONE!\n(6 di 20)",
      "«La Cosca ha provato anche qui.\nMa l'acqua della laguna non\nsi vende, cossa xèlo.»",
      "«Tu vai avanti. Il Friuli ti aspetta,\ne poi tutta l'Italia ancora.\nBuon viaggio, veh!»"],
    loseMsg:"Bepi ti aspetta in palestra.\n«Riscaldati e torna, veh!»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL LEONE ottenuta!', region:'Regione 6 di 20 completata',
      next:'PROSSIMA TAPPA: FRIULI-V.G.<br>Gigio · Tipo Vento · Trieste',
      footer:'Hai finito i contenuti disponibili!<br>Premi A: puoi continuare a esplorare<br>liberamente le 6 regioni.',
      goodAt:7, badAt:-6,
      verdict:{
        good:'Da Milano a Venezia, un nome che\nla Cosca non può comprare.',
        bad:'La Cosca ti segue di regione in\nregione. Prima o poi il conto si paga.',
        neutral:'Sei medaglie. Mezza Italia dietro,\nmezza ancora da fare.'}
    }
  },

  gymtr: {
    leader:'HANS', type:'Ghiaccio/Roccia', badge:'badge5', region:5,
    team:[['croder',27],['brinassa',28],['petrone',30],['crodon',32]],
    challenge:'«Chi vince prende la MEDAGLIA DELLE\nDOLOMITI. Auf geht\'s!»',
    intro:[
      "La palestra di Bolzano: legno di malga,\ntrofei di roccia e ghiaccio.",
      "In fondo, un omone biondo ti osserva\nsoffiandosi sulle mani."],
    done:[
      "«Bravo, hai vinto. La strada continua,\nma i miei contenuti finiscono qui.\nPer ora!»"],
    openers:{
      good:[
        "«Servus! Sei tu il ragazzo che non si\npiega alla Cosca. Mi piaci.»",
        "«Ma quassù decide la montagna.\nVediamo se reggi roccia e gelo.»"],
      bad:[
        "«Servus. Si dice che a valle tu abbia\nstretto mani sbagliate.»",
        "«La montagna non perdona i furbi.\nVediamo.»"],
      neutral:[
        "«Servus! Io sono HANS,\ncapopalestra di Bolzano.»",
        "«Tipo GHIACCIO e ROCCIA: come le\nDolomiti, dure e taglienti.»"]
    },
    win:[
      "Hans richiama il suo CRODÒN e ride\nforte. «Auf! Gran bella lotta!»",
      "Hai ottenuto la MEDAGLIA DELLE\nDOLOMITI! (5 di 20)",
      "«La Cosca ha provato a comprare anche\nme. Gli ho detto di sciare a valle.»",
      "«Tu continua così. L'Italia, pezzo per\npezzo, comincia a respirare.»"],
    loseMsg:"Hans ti aspetta in palestra.\n«Riscaldati e torna, ja?»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DELLE DOLOMITI ottenuta!', region:'Regione 5 di 20 completata',
      next:'PROSSIMA TAPPA: VENETO<br>Bepi · Tipo Acqua · Venezia',
      footer:'Hai finito i contenuti della demo!<br>Premi A: puoi continuare a esplorare<br>liberamente le 5 regioni.',
      goodAt:6, badAt:-5,
      verdict:{
        good:'Da Milano alle Dolomiti, un nome che\nla Cosca non può comprare.',
        bad:'La Cosca ti segue di regione in\nregione, e aspetta il tuo passo falso.',
        neutral:'Cinque medaglie. Mezza Italia ti\nconosce, l\'altra metà ti cerca.'}
    }
  },

  gymbo: {
    leader:'DINDO', type:'Fuoco', badge:'badge8', region:8,
    team:[['vesuvione',39],['farfarello',41],['malebranca',42],['fogaron',45]],
    challenge:'«Chi vince piglia la MEDAGLIA DELLE\nDUE TORRI. Soccia, dai!»',
    intro:[
      "La palestra di Bologna: una vecchia\naula universitaria sotto i portici,\ncalda come un forno.",
      "In fondo, un omone rubicondo con un\ngrembiule da cuoco ti aspetta\nmescolando qualcosa che ribolle."],
    done:[
      "«Bèin, campione. La Medaglia delle\nDue Torri ti sta benissimo, ciò.»",
      "«Tira dritto: la Toscana ti aspetta,\na Firenze, da CHECCONE.»"],
    openers:{
      good:[
        "«Soccia, sei tu il forestiero che la\nCosca non riesce a comprare! Bèin.»",
        "«Ma qui comanda il fuoco. Vediamo\nse non ti scotti, ciò.»"],
      bad:[
        "«Ho sentito che a valle hai stretto\nmani sbagliate, veh.»",
        "«Il fuoco purifica tutto. Vediamo\nche cosa resta di te.»"],
      neutral:[
        "«Servito! A sòn DINDO, capopalestra\ndi Bologna.»",
        "«Tipo FUOCO: come i nostri forni e\nil nostro carattere. Caldo, ciò.»"]
    },
    win:[
      "Dindo richiama il suo FOGARÒN e si\nasciuga la fronte. «Soccia, che caldo!»",
      "«Bella lotta davvero, forestiero.»",
      "Hai ottenuto la MEDAGLIA DELLE\nDUE TORRI! (8 di 20)",
      "«La Cosca ha provato a comprare anche\nme, offrendomi un ristorante. Gli ho\ndetto di andare a quel paese, ciò.»",
      "«Tu va' avanti. Firenze ti aspetta,\ne poi tutta l'Italia ancora.\nBuon viaggio, veh!»"],
    loseMsg:"Dindo ti aspetta in palestra.\n«Riposati e mangia qualcosa, ciò.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DELLE DUE TORRI ottenuta!', region:'Regione 8 di 20 completata',
      next:'PROSSIMA TAPPA: TOSCANA<br>Checcone · Tipo Psico · Firenze',
      footer:'Premi A: prosegui verso la TOSCANA<br>(valico della Futa da Bologna,<br>serve la Medaglia delle Due Torri).',
      goodAt:9, badAt:-8,
      verdict:{
        good:'Da Milano a Bologna, un nome che la\nCosca non può comprare a nessun prezzo.',
        bad:'La Cosca ti segue di regione in\nregione. Il conto, prima o poi, arriva.',
        neutral:'Otto medaglie. Il nord e il centro\nItalia conoscono il tuo nome.'}
    }
  },

  gymfi: {
    leader:'CHECCONE', type:'Psico', badge:'badge9', region:9,
    team:[['jana',43],['civettona',44],['strigone',45],['strione',48]],
    challenge:'«Chi vince piglia la MEDAGLIA DEL\nGIGLIO. O bischero, fatti sotto!»',
    intro:[
      "La palestra di Firenze: una galleria\nrinascimentale, statue e affreschi\nche sembrano seguirti con lo sguardo.",
      "In fondo, un uomo elegante con un\ntaccuino ti studia come fossi\nun'opera da catalogare."],
    done:[
      "«La Medaglia del Giglio ti dona,\ndavvero. Icché aspetti? Vai in\nUMBRIA, da QUIRINO, a Perugia.»",
      "«E rifletti su quel che hai visto\nnell'ipogeo. Conta più di una medaglia.»"],
    openers:{
      good:[
        "«To'! Sei tu il forestiero che la\nCosca non riesce a comprare. La\nmente sgombra si vede, sai.»",
        "«Ma qui comanda la testa, non i\nmuscoli. Vediamo come ragioni.»"],
      bad:[
        "«Leggo nella gente come in un libro.\nE in te leggo certe... amicizie\nsbagliate, o bischero.»",
        "«La mente non mente. Vediamo.»"],
      neutral:[
        "«Bongiorno! Gli è che sono CHECCONE,\ncapopalestra di Firenze.»",
        "«Tipo PSICO: come questa città,\ntutta ingegno, arte e malizia.»"]
    },
    win:[
      "Checcone richiama il suo STRIONE e\nchiude il taccuino, soddisfatto.",
      "«O bischero, gli è stata una bella\nlotta. Te la sei meritata.»",
      "Hai ottenuto la MEDAGLIA DEL GIGLIO!\n(9 di 20)",
      "«La Cosca ha provato a comprarmi con\nun'intera collezione d'arte. Gli ho\nrisposto che la bellezza non si compra.»",
      "«Tu va' avanti. L'Umbria ti aspetta,\ne poi il cuore dell'Italia. Vai,\no bischero!»"],
    loseMsg:"Checcone ti aspetta in palestra.\n«Riordina le idee e torna.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL GIGLIO ottenuta!', region:'Regione 9 di 20 completata',
      next:'PROSSIMA TAPPA: UMBRIA<br>Quirino · Tipo Terra · Perugia',
      footer:'Premi A: prosegui verso l\'UMBRIA<br>(lungo il Trasimeno da Firenze,<br>serve la Medaglia del Giglio).',
      goodAt:10, badAt:-9,
      verdict:{
        good:'Da Milano a Firenze, un nome che la\nCosca non può comprare a nessun prezzo.',
        bad:'La Cosca ti segue di regione in\nregione, e compra tutto tranne te.',
        neutral:'Nove medaglie. Mezza Italia conosce\nil tuo nome; l\'altra metà ti aspetta.'}
    }
  },

  gympg: {
    leader:'QUIRINO', type:'Terra', badge:'badge10', region:10,
    team:[['zollin',47],['monachione',48],['lupomannaro',49],['mannarone',50],['zollone',53]],
    challenge:'«Chi vince si piglia la MEDAGLIA DEL\nGRIFO. Coraggio, su!»',
    intro:[
      "La palestra di Perugia: una cantina\nin pietra sotto l'acquedotto, odore\ndi terra umida e tartufo.",
      "In fondo, un omone tarchiato con gli\nscarponi infangati ti aspetta, calmo\ncome una collina."],
    done:[
      "«La Medaglia del Grifo è tua, e te la\nsei guadagnata con i piedi per terra.»",
      "«Ora scendi nelle MARCHE, da GUERRINO,\nad Ancona. E saluta il mare per me.»"],
    openers:{
      good:[
        "«Allora sei tu il ragazzo che la Cosca\nnon riesce a comprare. Buona terra,\nquella da cui vieni.»",
        "«Ma qui comanda il suolo. Vediamo se\nresti in piedi quando trema.»"],
      bad:[
        "«Si dice che a valle tu abbia stretto\nmani sbagliate, ragazzo.»",
        "«La terra ricopre tutto, col tempo.\nVediamo cosa resta di te.»"],
      neutral:[
        "«Benvenuto! Sono QUIRINO,\ncapopalestra di Perugia.»",
        "«Tipo TERRA: come queste colline,\npaziente, solida e più forte di\nquanto sembri.»"]
    },
    win:[
      "Quirino richiama il suo ZOLLÒNE e si\npulisce gli scarponi, soddisfatto.",
      "«Bella lotta. Hai radici robuste,\nragazzo.»",
      "Hai ottenuto la MEDAGLIA DEL GRIFO!\n(10 di 20)",
      "«La Cosca ha provato a comprarsi mezza\nUmbria. Ma la terra non si vende:\nsi lavora.»",
      "«Tu continua. Le Marche ti aspettano,\ne il mare. Sei a metà dell'Italia\normai. Tieni duro.»"],
    loseMsg:"Quirino ti aspetta in palestra.\n«Rimettiti in piedi e torna.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL GRIFO ottenuta!', region:'Regione 10 di 20 completata',
      next:'PROSSIMA TAPPA: MARCHE<br>Guerrino · Tipo Volante · Ancona',
      footer:'Premi A: prosegui verso le MARCHE<br>(Gola del Furlo da Perugia,<br>serve la Medaglia del Grifo).',
      goodAt:11, badAt:-10,
      verdict:{
        good:'Da Milano a Perugia, metà Italia: un\nnome che la Cosca non può comprare.',
        bad:'La Cosca ti segue di regione in\nregione. La terra ha memoria lunga.',
        neutral:'Dieci medaglie, metà del cammino.\nL\'Italia intera ormai ti osserva.'}
    }
  },

  gyman: {
    leader:'GUERRINO', type:'Volante', badge:'badge11', region:11,
    team:[['falchin',50],['strigone',51],['ratavolora',52],['civettona',53],['falchione',56]],
    challenge:'«Chi vince si piglia la MEDAGLIA DEL\nCONERO. Su, prendi il volo!»',
    intro:[
      "La palestra di Ancona: una vecchia\ntorre del porto aperta sul mare,\npiena di trespoli e di falchi.",
      "In cima, un uomo asciutto con un\nguanto da falconiere ti osserva,\nun rapace fermo sul braccio."],
    done:[
      "«La Medaglia del Conero ti sta bene.\nOra punta a ROMA, da SOR ALVARO. E\nocchio: laggiù volano i draghi.»",
      "«Buon vento, bardascio.»"],
    openers:{
      good:[
        "«Sei tu il ragazzo che la Cosca non\nriesce a comprare. Vola alto, mi\npiace.»",
        "«Ma quassù decide il vento. Vediamo\nse reggi la raffica del Conero.»"],
      bad:[
        "«Si dice che a valle tu abbia stretto\nmani sbagliate, bardascio.»",
        "«Il vento porta via tutto. Anche\ni furbi. Vediamo.»"],
      neutral:[
        "«Benvenuto! Sono GUERRINO,\ncapopalestra di Ancona.»",
        "«Tipo VOLANTE: come i falchi del\nConero. Liberi, rapidi e senza\npadroni.»"]
    },
    win:[
      "Guerrino richiama il suo FALCHIÒNE\nsul guanto e annuisce, soddisfatto.",
      "«Gran bel volo, bardascio.»",
      "Hai ottenuto la MEDAGLIA DEL CONERO!\n(11 di 20)",
      "«La Cosca ha provato a tarpare le ali\nanche a me. Ma un falco in gabbia\nnon serve a nessuno.»",
      "«Tu vola avanti. Roma t'aspetta, e\nlì la partita si fa grossa. Tieni\ngli occhi aperti, ragazzo.»"],
    loseMsg:"Guerrino ti aspetta in palestra.\n«Riprendi quota e torna.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL CONERO ottenuta!', region:'Regione 11 di 20 completata',
      next:'PROSSIMA TAPPA: LAZIO<br>Sor Alvaro · Tipo Drago · Roma',
      footer:'Premi A: prosegui verso il LAZIO<br>(Via Salaria da Ancona,<br>serve la Medaglia del Conero).',
      goodAt:12, badAt:-11,
      verdict:{
        good:'Da Milano ad Ancona, un nome che vola\npiù in alto della Cosca.',
        bad:'La Cosca ti segue di regione in\nregione. Ma il vento è dalla tua.',
        neutral:'Undici medaglie. Il tuo nome corre\nsul vento dell\'Adriatico.'}
    }
  },

  gymrm: {
    leader:'SOR ALVARO', type:'Drago', badge:'badge12', region:12,
    team:[['ruderin',53],['lupomannaro',54],['mannarone',55],['strigone',56],['ruderone',59]],
    challenge:'«Chi vince se piglia la MEDAGLIA DER\nCOLOSSEO. Daje, ahò!»',
    intro:[
      "La palestra di Roma: un'arena di\ntravertino sotto il livello della\nstrada, torce alle pareti.",
      "In fondo, un omone in tunica con una\nsigaretta spenta in bocca ti squadra,\ncalmo come un imperatore."],
    done:[
      "«La Medaglia der Colosseo è tua, ahò.\nMo' scegni in ABRUZZO, da CARMINE,\na L'Aquila. E occhio a quello che t'ho detto.»"],
    openers:{
      good:[
        "«Aò, sei tu quello che la Cosca nun\nriesce a comprà. Me piaci, daje.»",
        "«Ma qua a Roma comanna er drago.\nVedemo se nun te bruci, ahò.»"],
      bad:[
        "«Se dice che a monte hai stretto certe\nmani, ahò. Brutte mani.»",
        "«Er drago nun perdona i furbi.\nVedemo.»"],
      neutral:[
        "«Aò! So' SOR ALVARO, capopalestra\nde Roma, Caput Mundi.»",
        "«Tipo DRAGO: come 'sta città. Antico,\nfiero e che nun more mai.»"]
    },
    win:[
      "Sor Alvaro richiama er RUDERÒNE e\naccenne finalmente la sigaretta.",
      "«Ammazza che lotta. Te la sei\nguadagnata, ahò.»",
      "Hai ottenuto la MEDAGLIA DER COLOSSEO!\n(12 di 20)",
      "«Mo' te dico 'na cosa seria, ahò.\nLa Cosca c'ha er quartier generale\nproprio qua a Roma.»",
      "«Sotto er Parlamento, a Montecitorio.\nProprio lì, sotto le istituzioni, c'hanno\ner covo. De lì comannano tutta l'Italia.»",
      "«Tu fatte tutte e venti le Medaglie.\nQuanno le hai tutte, torna a Roma: in\npiazza c'è 'n tombino co' la N dorata.\nSe te se apre, è lì che se chiude 'sta storia.»"],
    loseMsg:"Sor Alvaro t'aspetta in palestra.\n«Rifiatate e torna, ahò.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DER COLOSSEO ottenuta!', region:'Regione 12 di 20 completata',
      next:'PROSSIMA TAPPA: ABRUZZO<br>Carmine · Tipo Roccia · L\'Aquila',
      footer:'Premi A: prosegui verso l\'ABRUZZO<br>(Via Valeria da Roma,<br>serve la Medaglia der Colosseo).',
      goodAt:13, badAt:-12,
      verdict:{
        good:'Da Milano a Roma, capitale: un nome\nche la Cosca non può comprare.\nE ora sai dove si nascondono.',
        bad:'La Cosca ti osserva dal suo covo\nromano. Conosci la loro tana, ma\nloro conoscono te.',
        neutral:'Dodici medaglie, e un segreto:\nil cuore della Cosca batte sotto\nRoma. Prima o poi, ci tornerai.'}
    }
  },

  gymaq: {
    leader:'CARMINE', type:'Roccia', badge:'badge13', region:13,
    team:[['petrin',55],['crodon',56],['mannarone',57],['lupomannaro',58],['petrone',61]],
    challenge:'«Chi vince si piglia la MEDAGLIA DEL\nGRAN SASSO. Dai, uagliò!»',
    intro:[
      "La palestra di L'Aquila: un cortile\ndi pietra tra i 99 castelli, blocchi\ndi roccia ovunque.",
      "In fondo, un omone con le mani callose\nspacca un masso a mani nude e ti\nguarda, calmo come la montagna."],
    done:[
      "«La Medaglia del Gran Sasso è tua,\nuagliò. Mo' scendi nel MOLISE... se\nlo trovi. Dicono che non esista.»"],
    openers:{
      good:[
        "«Allora sei tu che la Cosca non riesce\na comprare. Duro come la roccia,\nmi piace.»",
        "«Ma qui comanda la montagna. Vediamo\nse reggi quando ti casca addosso.»"],
      bad:[
        "«Si dice che a valle tu abbia stretto\nmani sbagliate, uagliò.»",
        "«La roccia seppellisce tutto, col\ntempo. Vediamo te.»"],
      neutral:[
        "«Benvenuto! So' CARMINE,\ncapopalestra de L'Aquila.»",
        "«Tipo ROCCIA: come il Gran Sasso e\ncome noi aquilani. Ci spaccano, ma\nnon ci piegano.»"]
    },
    win:[
      "Carmine richiama il suo PETRÒNE e si\nspolvera le mani, soddisfatto.",
      "«Gran bella lotta, uagliò. Dura come\nla nostra pietra.»",
      "Hai ottenuto la MEDAGLIA DEL GRAN SASSO!\n(13 di 20)",
      "«La Cosca ha provato a comprarsi mezzo\nAbruzzo dopo il terremoto. Ma noi\nrinasciamo, non ci vendiamo.»",
      "«Tu va' avanti. E ricordati di Roma,\nde quello che t'ha detto Sor Alvaro.\nLa resa dei conti è là.»"],
    loseMsg:"Carmine ti aspetta in palestra.\n«Rialzati e torna, uagliò.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL GRAN SASSO ottenuta!', region:'Regione 13 di 20 completata',
      next:'PROSSIMA TAPPA: CAMPANIA<br>Ciruzzo · Tipo Fuoco · Napoli',
      footer:'Premi A: scendi in CAMPANIA (monti del<br>Sannio). E c\'è un certo TONINO, qui a<br>L\'Aquila, che giura esista il Molise...',
      goodAt:14, badAt:-13,
      verdict:{
        good:'Da Milano al Gran Sasso, un nome duro\ncome la roccia: la Cosca non lo piega.',
        bad:'La Cosca ti segue di regione in\nregione. Ma la montagna è dalla tua.',
        neutral:'Tredici medaglie. Forte come la\npietra degli Appennini, ormai.'}
    }
  },

  gymcb: {
    leader:'TONINO', type:'Spettro', badge:'badge14', region:14,
    team:[['svanin',58],['mascagna',59],['lupomannaro',60],['bordona',61],['svanone',64]],
    challenge:'«Chi vince piglia la MEDAGLIA\nINESISTENTE. Esiste solo se vinci!»',
    intro:[
      "La palestra di Campobasso: una sala\nche sulle piantine non c'è. Eppure\neccola, con tanto di tabellone.",
      "In fondo, TONINO ti aspetta sorridendo.\n«Sapevo che ce l'avresti fatta a\ntrovarmi.»"],
    done:[
      "«La Medaglia Inesistente è tua! Una\ndelle poche cose molisane che la gente\nammette di aver visto, ahah.»",
      "«Mo' scendi in CAMPANIA, da CIRUZZO,\na Napoli. E grazie d'esserci creduto.»"],
    openers:{
      good:[
        "«Sei tu quello che la Cosca non può\ncomprare! E pure uno che crede nel\nMolise. Doppio rispetto.»",
        "«Ma qui comanda lo Spettro: ci vediamo\ne non ci vediamo. Vediamo te.»"],
      bad:[
        "«So che a valle hai stretto mani\nsbagliate. Pure quaggiù arrivano\nle voci, sai?»",
        "«Lo Spettro smaschera tutti. Vediamo.»"],
      neutral:[
        "«Servito! Sono TONINO, capopalestra\ndel Molise. Sì, esiste. Sei qui, no?»",
        "«Tipo SPETTRO: noi molisani siamo\nmaestri nel non farci vedere. Per\nforza, con la pubblicità che abbiamo.»"]
    },
    win:[
      "Tonino richiama il suo SVANÒNE, che\nsvanisce con un sorriso.",
      "«Gran bella lotta! E grazie: oggi il\nMolise è esistito un po' di più.»",
      "Hai ottenuto la MEDAGLIA INESISTENTE!\n(14 di 20)",
      "«La Cosca? Ci ha provato pure qui.\nMa come fai a ricattare una regione\nche ufficialmente non c'è? Ahah.»",
      "«Tu va' avanti, scendi a Sud. E ogni\ntanto, sulla cartina, cercaci.\nNoi ci siamo.»"],
    loseMsg:"Tonino ti aspetta in palestra.\n«Riprenditi e torna. Noi non\nspariamo... o quasi.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA INESISTENTE ottenuta!', region:'Regione 14 di 20 completata',
      next:'PROSSIMA TAPPA: CAMPANIA<br>Ciruzzo · Tipo Fuoco · Napoli',
      footer:'Hai sbloccato la regione SEGRETA!<br>Premi A: puoi esplorare liberamente<br>le 14 regioni. (Sì, Molise incluso.)',
      goodAt:15, badAt:-14,
      verdict:{
        good:'Hai dato al Molise ciò che nessuno gli\ndà: di esistere. Un eroe, dentro e\nfuori dalle cartine.',
        bad:'Persino il Molise dimenticato ha\nsentito parlare delle tue amicizie\nsbagliate. Non è un bel segno.',
        neutral:'Quattordici medaglie, una segreta.\nHai trovato la regione che non c\'è.'}
    }
  },

  gymna: {
    leader:'CIRUZZO', type:'Fuoco', badge:'badge15', region:15,
    team:[['vesuvin',60],['malebranca',61],['farfarello',62],['fogaron',63],['vesuvione',66]],
    challenge:'«Chi vince se piglia \'a MEDAGLIA D\'\'O\nVESUVIO. Jamm, uagliò!»',
    intro:[
      "La palestra di Napoli: un cortile di\ntufo coi panni stesi sopra, caldo\ncome il fianco del Vesuvio.",
      "In fondo, un omone in canottiera con\nun ventaglio ti squadra. «Te staje\nsudanno già? E mo' viene 'o bello.»"],
    done:[
      "«'A Medaglia d'o Vesuvio è 'a toia,\nuagliò. Mo' va' in PUGLIA, da MIMMO,\na Bari. E statte accuorto.»"],
    openers:{
      good:[
        "«Ué, sì tu chillo ca 'a Cosca nun\nriesce a accattà! Me piaci, uagliò.»",
        "«Ma cca cumanna 'o fuoco. Vedimm'\nsi nun te struje.»"],
      bad:[
        "«Se dice ca a monte hê stretto mane\nstorte, uagliò.»",
        "«'O fuoco purifica tutto. Vedimmo\nche resta 'e te.»"],
      neutral:[
        "«Servito! Songo CIRUZZO, capopalestra\n'e Napule.»",
        "«Tipo FUOCO: comm'o Vesuvio e comm'a\nnuje. Ce putimmo arrabbià, ma\npo' se fa pace cu 'na pizza.»"]
    },
    win:[
      "Ciruzzo richiama 'o VESUVIÒNE e\ns'asciuga 'a fronte cu 'o ventaglio.",
      "«Uà, che bella lotta! Te la sì\nguadagnata, uagliò.»",
      "Hai ottenuto la MEDAGLIA DEL VESUVIO!\n(15 di 20)",
      "«'A Cosca? Ha pruvato pure cca. Ma\nNapule nun se vénne: se regala, e\nsolo a chi se 'o merita.»",
      "«Tu va' avanti, scinni 'o tacco e 'a\npunta d'o Stivale. E ricuordate 'e\nRoma: è lla ca fernesce 'a storia.»"],
    loseMsg:"Ciruzzo t'aspetta in palestra.\n«Pìgliate 'o cafè e torna, uagliò.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL VESUVIO ottenuta!', region:'Regione 15 di 20 completata',
      next:'PROSSIMA TAPPA: PUGLIA<br>Mimmo · Tipo Luce · Bari',
      footer:'Premi A: prosegui verso la PUGLIA<br>(il Tavoliere da Napoli,<br>serve la Medaglia del Vesuvio).',
      goodAt:16, badAt:-15,
      verdict:{
        good:'Da Milano a Napoli, tutto il Tirreno:\nun nome che la Cosca non può comprare.',
        bad:'La Cosca ti segue fin sotto il Vesuvio.\nMa il fuoco, certe cose, le purifica.',
        neutral:'Quindici medaglie. Mezzo Stivale\nconosce il tuo nome, ormai.'}
    }
  },

  gymba: {
    leader:'MIMMO', type:'Luce', badge:'badge16', region:16,
    team:[['lumin',64],['mannarone',65],['strigone',66],['gattore',67],['luminone',69]],
    challenge:"«Cce vince se pìghe 'a MEDAGLIA D''U\nSOLE. Forze, uagnò!»",
    intro:[
      "La palestra di Bari: una corte della\ncittà vecchia, bianca di calce e\naccecante di sole a mezzogiorno.",
      "In fondo, un omone abbronzato con\ngli occhiali da sole ti aspetta.\n«Uagnò, ccà se vede chiare.»"],
    done:[
      "«'A Medaglia d'u Sole è 'a toje, uagnò.\nMò vatte in BASILICATA, da ROCCHINO,\na Potenza. E pìghete 'nu sole pure llà.»"],
    openers:{
      good:[
        "«Sì tu 'u uagnone ca 'a Cosca nan po'\naccattà! Brave, me piesce.»",
        "«Ma ccà cumanne 'a luce. Vedime si\nnan t'accìeche, uagnò.»"],
      bad:[
        "«Dìcene ca a monte hè strètte mane\nstuerte, uagnò.»",
        "«'A luce smaschere tutte. Vedime.»"],
      neutral:[
        "«Servite! Sò MIMMO, capopalestre de Bari.»",
        "«Tipe LUCE: cumme 'u sole nuestre,\nche acceche e scalde. Nan se po'\nguardà in facce, uagnò.»"]
    },
    win:[
      "Mimmo richiame 'u LUMINÒNE e s'aggiuste\ngli occhiali da sole, soddisfatte.",
      "«Uagnò, ce bella lotte! Te la sì\nguadagnate.»",
      "Hai ottenuto la MEDAGLIA DEL SOLE!\n(16 di 20)",
      "«'A Cosca? Ha pruvate pure ccà. Ma 'u\nsole de Puglia nan se cumbre: se\ngode, e basta.»",
      "«Tu vatte 'nnanze, scinne 'a punta\nd'u Stivale. E ricuordete de Roma:\nè llà ca fernesce tutte.»"],
    loseMsg:"Mimmo t'aspette in palestre.\n«Pìghete 'nu spritz e tuerne, uagnò.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL SOLE ottenuta!', region:'Regione 16 di 20 completata',
      next:'PROSSIMA TAPPA: BASILICATA<br>Rocchino · Tipo Terra · Potenza',
      footer:'Premi A: prosegui verso la BASILICATA<br>(valle del Bradano da Bari,<br>serve la Medaglia del Sole).',
      goodAt:17, badAt:-16,
      verdict:{
        good:'Da Milano a Bari, da un mare all\'altro:\nun nome che brilla più della Cosca.',
        bad:'La Cosca ti insegue fino al tacco\ndello Stivale. Ma la luce, certe ombre,\nle scaccia.',
        neutral:'Sedici medaglie. Lo Stivale quasi\ntutto conosce il tuo nome, ormai.'}
    }
  },

  gympz: {
    leader:'ROCCHINO', type:'Terra', badge:'badge17', region:17,
    team:[['monachin',66],['zollone',67],['mannarone',68],['petrone',69],['monachione',71]],
    challenge:'«Chi vince si piglia la MEDAGLIA DEI\nSASSI. Forza, e tieni duro!»',
    intro:[
      "La palestra di Potenza: una grotta\nscavata nel tufo, fresca e silenziosa,\nilluminata da poche torce.",
      "In fondo, un uomo asciutto e nodoso\ncome una radice ti aspetta, seduto\nsu un masso. «Salito fin qua, eh.»"],
    done:[
      "«La Medaglia dei Sassi è tua, e te la\nsei guadagnata con le mani. Ora scendi\nin CALABRIA, da CARMELO, a Reggio.»"],
    openers:{
      good:[
        "«Sei tu quello che la Cosca non riesce\na comprare. In Lucania la gente come te\nla rispettiamo.»",
        "«Ma qui comanda la terra. Vediamo se\nreggi quando si fa dura.»"],
      bad:[
        "«Dicono che a monte hai stretto mani\nsbagliate, figliolo.»",
        "«La terra lucana non perdona i furbi.\nVediamo.»"],
      neutral:[
        "«Benvenuto! Sono ROCCHINO,\ncapopalestra di Potenza.»",
        "«Tipo TERRA: come la nostra Lucania,\npovera di tutto tranne che di\ncarattere e di pietra.»"]
    },
    win:[
      "Rocchino richiama il suo MONACHIÒNE e\nannuisce lentamente, come la montagna.",
      "«Gran bella lotta. Hai la testa dura\ngiusta, figliolo.»",
      "Hai ottenuto la MEDAGLIA DEI SASSI!\n(17 di 20)",
      "«La Cosca ha provato a comprarsi mezza\nLucania a prezzo di saldo. Ma certe\nterre non hanno prezzo: hanno radici.»",
      "«Tu va' avanti, fino alla punta. E\nricordati di Roma: è là che tutto\nquesto deve finire.»"],
    loseMsg:"Rocchino ti aspetta in palestra.\n«Rifiata e torna, figliolo.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEI SASSI ottenuta!', region:'Regione 17 di 20 completata',
      next:'PROSSIMA TAPPA: CALABRIA<br>Carmelo · Tipo Veleno · Reggio Calabria',
      footer:'Hai finito i contenuti disponibili!<br>Premi A: puoi continuare a esplorare<br>liberamente le 17 regioni.',
      goodAt:18, badAt:-17,
      verdict:{
        good:'Da Milano alla Lucania: un nome con\nradici che la Cosca non può strappare.',
        bad:'La Cosca ti insegue anche tra i Sassi.\nMa questa terra antica sta dalla tua.',
        neutral:'Diciassette medaglie. Manca poco alla\npunta dello Stivale, ormai.'}
    }
  },

  gymrc: {
    leader:'CARMELO', type:'Veleno', badge:'badge18', region:18,
    team:[['scursune',72],['ratavolora',73],['basilisso',74],['basiliscu',75],['lupomannaro',76],['scursone',77]],
    challenge:"«Cu vinci si pìglia 'a MEDAGLIA DU\nBERGAMOTTO. Forza, e nun ti scantari!»",
    intro:[
      "La palestra di Reggio: un giardino di\nbergamotto sul lungomare, l'aria dolce\ne pungente, lo Stretto che luccica.",
      "In fondo, all'ombra di un albero, un\nuomo magro dagli occhi calmi ti talìa.\n«Arrivasti 'nfunne allu Stivale, eh.»"],
    done:[
      "«'A Medaglia du Bergamotto è 'a toja, e\nt'a guadagnasti. Mò passa u Stretto e\nvattini 'n SICILIA, da TOTÒ, a Palermo.»"],
    openers:{
      good:[
        "«Si tu chiddu ca 'a Cosca nun po'\naccattari. Ccà 'n Calabria genti accussì\n'a rispettamu.»",
        "«Ma ccà cumannu u veleno. Vidìmu si\nrièggi quannu mùzzica.»"],
      bad:[
        "«Dìcinu ca a munti strincisti mani\nstorti, figghiu.»",
        "«U veleno nun perdona i furbi. Vidìmu.»"],
      neutral:[
        "«Servutu! Sugnu CARMELO, capupalestra\ndi Reggio.»",
        "«Tipu VELENO: comu u scurzune tra i\npetri. Nun fa rumuri, ma quannu mùzzica\nt'addùni ca è troppu tardu.»"]
    },
    win:[
      "Carmelo richiama u so SCURSÒNE e\nannuisce calmu, comu u mari fermu.",
      "«Gran bella lotta, figghiu. Tieni u\nvelenu giustu 'nta li vini.»",
      "Hai ottenuto la MEDAGLIA DEL BERGAMOTTO!\n(18 di 20)",
      "«'A Cosca s'arrampica fina a ccà, allu\nStretto. Ma 'a punta du Stivale è dura,\ne nuàtri cchiù ancora.»",
      "«Tu passa u mari, vattini 'n Sicilia.\nE ricòrdati di Roma: è ddà ca tuttu\nchistu havi a finiri.»"],
    loseMsg:"Carmelo t'aspetta in palestra.\n«Pìgliati 'nu bergamotto e torna, figghiu.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL BERGAMOTTO ottenuta!', region:'Regione 18 di 20 completata',
      next:'PROSSIMA TAPPA: SICILIA<br>Totò · Tipo Oscurità · Palermo',
      footer:'Hai finito i contenuti disponibili!<br>Premi A: puoi continuare a esplorare<br>liberamente le 18 regioni.',
      goodAt:19, badAt:-18,
      verdict:{
        good:'Da Milano alla punta dello Stivale:\nun nome che la Cosca non è mai riuscita\na comprare, da un mare all\'altro.',
        bad:'La Cosca ti insegue fino allo Stretto.\nMa di qua dal mare, certe radici non\nsi strappano.',
        neutral:'Diciotto medaglie. Oltre lo Stretto\nc\'è solo il mare, e due isole.'}
    }
  },

  gympa: {
    leader:'TOTÒ', type:'Oscurità', badge:'badge19', region:19,
    team:[['mammucca',76],['lupomannaro',77],['mascaria',78],['farfarello',79],['malebranca',80],['mammadraga',81]],
    challenge:"«Cu vinci si pìglia 'a MEDAGLIA DU\nGATTOPARDO. Amunì, e nun ti scantari!»",
    intro:[
      "La palestra di Palermo: un palazzo\nbarocco dalle persiane chiuse, fresco\ne in penombra anche a mezzogiorno.",
      "In fondo, su una poltrona logora, un\nuomo elegante dagli occhi scuri ti\ntalìa. «Arrivasti 'nsìnu a ccà, eh.»"],
    done:[
      "«'A Medaglia du Gattopardo è 'a toja, e\nt'a guadagnasti. Mò resta sulu 'a\nSARDEGNA, da ANTIOGU, a Cagliari.»"],
    openers:{
      good:[
        "«Si tu chiddu ca 'a Cosca nun arrinèsci\na accattari. 'N Sicilia genti accussì 'a\ntenìmu cara, picciottu.»",
        "«Ma ccà cumanna u scuru. Vidìmu si nun\nti perdi 'nta l'ùmmira.»"],
      bad:[
        "«Dìcinu ca a munti strincisti 'a manu\nsbagghiata, carusu.»",
        "«U scuru sapi tutti cosi. Vidìmu.»"],
      neutral:[
        "«Servutu! Sugnu TOTÒ, capupalestra\ndi Palermu.»",
        "«Tipu OSCURITÀ: comu 'a notti siciliana.\nNun grida, nun s'affaccia. Ti talìa di\nlatu, e quannu t'addùni è troppu tardu.»"]
    },
    win:[
      "Totò richiama 'a so MAMMADRAGA e si\nsistema 'a giacca, calmu comu l'ùmmira.",
      "«Gran bella lotta, carusu. Tieni u\nscuru giustu 'nta l'occhi.»",
      "Hai ottenuto la MEDAGLIA DEL GATTOPARDO!\n(19 di 20)",
      "«'A Cosca cumannava ccà quannu manco\ntu eri natu. Ma 'u scuru veru nun s'accatta:\ns'eredita, o nun si tene affattu.»",
      "«Resta sulu un mari di traversari, e 'na\nterra antica. E poi Roma: è ddà ca tuttu\nchistu havi a finiri, ricòrdatillu.»"],
    loseMsg:"Totò t'aspetta in palestra.\n«Pìgliati 'na granita e torna, carusu.»",
    end:{
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL GATTOPARDO ottenuta!', region:'Regione 19 di 20 completata',
      next:'PROSSIMA TAPPA: SARDEGNA<br>Antiogu · Tipo Psico/Roccia · Cagliari',
      footer:'Hai finito i contenuti disponibili!<br>Premi A: puoi continuare a esplorare<br>liberamente le 19 regioni.',
      goodAt:20, badAt:-19,
      verdict:{
        good:'Da Milano alla Sicilia: un nome che la\nCosca non è riuscita a comprare in tutto\nlo Stivale, e nemmeno di là dal mare.',
        bad:'La Cosca ti insegue fin oltre lo Stretto.\nMa quest\'isola antica sa tenersi i suoi\nsegreti, e qualcuno dei tuoi.',
        neutral:'Diciannove medaglie. Resta solo un mare\nda attraversare: la Sardegna, e poi il\nritorno a Roma.'}
    }
  },

  gymca: {
    leader:'ANTIOGU', type:'Psico/Roccia', badge:'badge20', region:20,
    team:[['janedda',80],['crodon',81],['striastrale',82],['jana',83],['petrone',84],['prama',86]],
    challenge:"«Chie bincit si leat sa MEDAGLIA DE\nSU NURAGHE. Forza, e no ti assustes!»",
    intro:[
      "La palestra di Cagliari: una camera\nnuragica di pietra a secco, fresca e\nin penombra, con un'unica feritoia di luce.",
      "In fondo, seduto su un trono di basalto,\nun uomo anziano dagli occhi chiari ti\nfissa immobile. «Sett'arribbadu a s'ùrtimu, eh.»"],
    done:[
      "«Sa Medaglia de su Nuraghe est sa tua,\ne ti l'as bòddida. Las as totus, como:\nbinti medàglias. Torra a Roma, fìgiu.»"],
    openers:{
      good:[
        "«Ses tue cussu chi sa Cosca non podet\ncomporare. In Sardìnnia gente gasi la\ntenimus a contu, fìgiu.»",
        "«Ma inoghe cumandat sa pedra e su sognu.\nApproemus si abbarras sàvviu.»"],
      bad:[
        "«Narant chi a susu as istrintu manos\nistortas, fìgiu.»",
        "«Sa pedra antiga no perdonat sos abbistos.\nApproemus.»"],
      neutral:[
        "«Bénnidu! Seo ANTIOGU, mere 'e palestra\nde Casteddu.»",
        "«Tipu PSICO e ROCCIA: comente sas janas\ne sos nuraghes. Sognu e pedra, su chi\nsi bidet e su chi abarrat. Inoghe, totu duos.»"]
    },
    win:[
      "Antiogu pesat su GIGANTE DE PRAMA e\nannuit abbellu, fritu comente sa pedra.",
      "«Bella gherra, fìgiu. Tenes su sognu\ne sa pedra giustos in coro.»",
      "Hai ottenuto la MEDAGLIA DEL NURAGHE!\n(20 di 20 — LE HAI TUTTE!)",
      "«Sa Cosca creiat de comporare finas\ns'ùrtima ìsula. Ma custa terra antiga\nnon si bendet: si bardat, e basta.»",
      "«As fatu totu su Stivale e sas duas\nìsulas. Como torra a Roma: est inìe\nchi totu custu depet acabbare.»"],
    loseMsg:"Antiogu t'isettat in palestra.\n«Léadi una pàrdula e torra, fìgiu.»",
    end:{
      title:'★ COMPLIMENTI! 20/20 MEDAGLIE ★',
      medal:'MEDAGLIA DEL NURAGHE ottenuta!', region:'Tutte le 20 regioni completate!',
      next:'Hai conquistato tutte le 20 Medaglie<br>d\'Italia! Ora la resa dei conti con la<br>Cosca ti aspetta a Roma.',
      footer:'★ HAI FINITO IL VIAGGIO! ★<br>Premi A: continua a esplorare<br>liberamente tutte le 20 regioni.',
      goodAt:21, badAt:-20,
      verdict:{
        good:'Da Milano a Cagliari, da un mare all\'altro:\nun nome che la Cosca non è mai riuscita a\ncomprare. L\'Italia intera lo conosce.',
        bad:'La Cosca ti ha inseguito fino all\'ultima\nisola. Ma non ti ha mai piegato: venti\nmedaglie lo gridano da Nord a Sud.',
        neutral:'Venti medaglie su venti. Il viaggio è\ncompiuto: dalle Alpi alla Sardegna, tutta\nl\'Italia ha imparato il tuo nome.'}
    }
  }
};

/* Mappa del mondo (schermata MAPPA del menù): regioni implementate e collegamenti.
   maps = mappe che appartengono alla regione (per evidenziare "sei qui"). */
const WORLD_MAP = [
  { city:'MILANO', region:'Lombardia', leader:'Carletto', type:'Normale', badge:'badge',
    maps:['milano','lab','parco','gym','ambmi','shopmi','navigli','segreto','stradapo'],
    layout:[ { c:['lab','milano','parco'] },
             { c:['shopmi','gym','ambmi'] },
             { c:['navigli','segreto'], j:'->' } ],
    respawn:{ map:'lab', x:4, y:5, dir:'down', lines:["Ti svegli nel laboratorio.\nLa Prof.ssa Brambilla scuote la testa.","«Ti ho rimesso in sesto io.\nLa prossima volta occhio, neh.»"] },
    link:'treno -> Torino (con Medaglia Madonnina)' },
  { city:'TORINO', region:'Piemonte', leader:'Gianduiotto', type:'Acciaio', badge:'badge2',
    maps:['torino','gymto','ambto','murazzi','sotterranei','valico'],
    layout:[ { c:['torino'] },
             { c:['gymto','ambto'] },
             { c:['murazzi','sotterranei'], j:'->' } ],
    respawn:{ map:'torino', x:25, y:18, dir:'down', lines:["Ti svegli su una panchina di\nPorta Nuova. Un piccione ti fissa.","«Esageruma nen», dice qualcuno.\nLa squadra è di nuovo in piedi."] },
    link:'bus -> Aosta (con Medaglia della Mole)' },
  { city:'AOSTA', region:"Valle d'Aosta", leader:'Felicino', type:'Ghiaccio', badge:'badge3',
    maps:['aosta','gymao','ambao','gransanbernardo','gelo','appennino'],
    layout:[ { c:['aosta'] },
             { c:['gymao','ambao'] },
             { c:['gransanbernardo','gelo'], j:'->' } ],
    respawn:{ map:'aosta', x:13, y:15, dir:'up', lines:["Ti svegli su una panchina gelata.\nUn San Bernardo ti lecca la faccia.","«Tutto a posto, giovnot?»\nLa squadra è di nuovo in forze."] },
    link:'bus -> Genova (con Medaglia del Monte Bianco)' },
  { city:'GENOVA', region:'Liguria', leader:'Barbagialla', type:'Acqua', badge:'badge4',
    maps:['genova','gymge','ambge','scogliera','lanterna','valdadige'],
    layout:[ { c:['genova'] },
             { c:['gymge','ambge'] },
             { c:['scogliera','lanterna'], j:'->' } ],
    respawn:{ map:'genova', x:14, y:4, dir:'down', lines:["Ti svegli su una panchina del porto.\nUn gabbiano ti fissa, impassibile.","«Tutto ben, mussu?»\nLa squadra è di nuovo in sesto."] },
    link:'bus -> Bolzano (con Medaglia della Lanterna)' },
  { city:'BOLZANO', region:'Trentino-A.A.', leader:'Hans', type:'Ghiaccio/Roccia', badge:'badge5',
    maps:['bolzano','gymtr','ambtr','dolomiti','rosengarten','brenta'],
    layout:[ { c:['bolzano'] },
             { c:['gymtr','ambtr'] },
             { c:['dolomiti','rosengarten'], j:'->' } ],
    respawn:{ map:'bolzano', x:13, y:2, dir:'down', lines:["Ti svegli in una malga, accanto a una\nstufa. Una nonna ti porge dello speck.","La squadra è di nuovo in forze, ja."] },
    link:'percorso lungo il Brenta -> Venezia (con Medaglia delle Dolomiti)' },
  { city:'VENEZIA', region:'Veneto', leader:'Bepi', type:'Acqua', badge:'badge6',
    maps:['venezia','gymve','ambve','laguna','calle','isonzo'],
    layout:[ { c:['venezia'] },
             { c:['gymve','ambve'] },
             { c:['laguna','calle'], j:'->' } ],
    respawn:{ map:'venezia', x:14, y:5, dir:'down', lines:["Ti svegli su una riva del Canal Grande.\nUn gabbiano ti fissa con superiorità.","La squadra è di nuovo in forze, veh."] },
    link:'percorso lungo l\'Isonzo -> Trieste (con Medaglia del Leone)' },
  { city:'TRIESTE', region:'Friuli-V.G.', leader:'Gigio', type:'Vento', badge:'badge7',
    maps:['trieste','gymts','ambts','carso','grotta_bora','pianurapo'],
    layout:[ { c:['trieste'] },
             { c:['gymts','ambts'] },
             { c:['carso','grotta_bora'], j:'->' } ],
    respawn:{ map:'trieste', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina in piazza.\nLa BORA ti scompiglia i capelli.","La squadra è di nuovo in forze."] },
    link:'percorso lungo la Pianura Padana -> Bologna (con Medaglia della Bora)' },
  { city:'BOLOGNA', region:'Emilia-Romagna', leader:'Dindo', type:'Fuoco', badge:'badge8',
    maps:['bologna','gymbo','ambbo','viaemilia','torri','futa'],
    layout:[ { c:['bologna'] },
             { c:['gymbo','ambbo'] },
             { c:['viaemilia','torri'], j:'->' } ],
    respawn:{ map:'bologna', x:14, y:5, dir:'down', lines:["Ti svegli sotto un portico, all'ombra.\nUna AZDORA ti porge dei tortellini\nfumanti, scuotendo la testa.","La squadra è di nuovo in forze, ciò."] },
    link:'valico della Futa -> Firenze (con Medaglia delle Due Torri)' },
  { city:'FIRENZE', region:'Toscana', leader:'Checcone', type:'Psico', badge:'badge9',
    maps:['firenze','gymfi','ambfi','chianti','ipogeo','trasimeno'],
    layout:[ { c:['firenze'] },
             { c:['gymfi','ambfi'] },
             { c:['chianti','ipogeo'], j:'->' } ],
    respawn:{ map:'firenze', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina in piazza\ndella Signoria. Il David ti guarda\ndall'alto, impassibile.","La squadra è di nuovo in forze, o bischero."] },
    link:'sponde del Trasimeno -> Perugia (con Medaglia del Giglio)' },
  { city:'PERUGIA', region:'Umbria', leader:'Quirino', type:'Terra', badge:'badge10',
    maps:['perugia','gympg','ambpg','valnerina','gubbio','furlo'],
    layout:[ { c:['perugia'] },
             { c:['gympg','ambpg'] },
             { c:['valnerina','gubbio'], j:'->' } ],
    respawn:{ map:'perugia', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina lungo\nl'acquedotto. Un gatto ti fissa dai\nvicoli in salita.","La squadra è di nuovo in forze."] },
    link:'Gola del Furlo -> Ancona (con Medaglia del Grifo)' },
  { city:'ANCONA', region:'Marche', leader:'Guerrino', type:'Volante', badge:'badge11',
    maps:['ancona','gyman','amban','conero','sibillini','salaria'],
    layout:[ { c:['ancona'] },
             { c:['gyman','amban'] },
             { c:['conero','sibillini'], j:'->' } ],
    respawn:{ map:'ancona', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina del porto.\nUn falco plana in alto, lento.","La squadra è di nuovo in forze."] },
    link:'Via Salaria -> Roma (con Medaglia del Conero)' },
  { city:'ROMA', region:'Lazio', leader:'Sor Alvaro', type:'Drago', badge:'badge12',
    maps:['roma','gymrm','ambrm','appiaantica','catacombe','valeria','montecitorio','covo'],
    layout:[ { c:['roma'] },
             { c:['gymrm','ambrm'] },
             { c:['appiaantica','catacombe'], j:'->' } ],
    respawn:{ map:'roma', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina ai Fori.\nUn gatto romano ti fissa dall'alto\ndi una colonna, regale.","La squadra è di nuovo in forze, ahò."] },
    link:'Via Valeria -> L\'Aquila (con Medaglia der Colosseo)' },
  { city:'L\'AQUILA', region:'Abruzzo', leader:'Carmine', type:'Roccia', badge:'badge13',
    maps:['aquila','gymaq','ambaq','gransasso','corno','tratturo','sannio'],
    layout:[ { c:['aquila'] },
             { c:['gymaq','ambaq'] },
             { c:['gransasso','corno'], j:'->' } ],
    respawn:{ map:'aquila', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina in centro.\nIl Gran Sasso domina l'orizzonte,\nimmobile.","La squadra è di nuovo in forze, uagliò."] },
    link:'monti del Sannio -> Napoli (con Medaglia del Gran Sasso) · passaggio segreto -> Molise' },
  { city:'CAMPOBASSO', region:'Molise', leader:'Tonino', type:'Spettro', badge:'badge14',
    maps:['campobasso','gymcb','ambcb','matese','pietrabbondante'],
    layout:[ { c:['campobasso'] },
             { c:['gymcb','ambcb'] },
             { c:['matese','pietrabbondante'], j:'->' } ],
    respawn:{ map:'campobasso', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina a Campobasso.\nIl Molise esiste, e qui te lo ricordano\nvolentieri.","La squadra è di nuovo in forze."] },
    link:'regione segreta (torna al Gran Sasso)' },
  { city:'NAPOLI', region:'Campania', leader:'Ciruzzo', type:'Fuoco', badge:'badge15',
    maps:['napoli','gymna','ambna','vesuvio','castelovo','tavoliere'],
    layout:[ { c:['napoli'] },
             { c:['gymna','ambna'] },
             { c:['vesuvio','castelovo'], j:'->' } ],
    respawn:{ map:'napoli', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina sul lungomare.\nIl Vesuvio fuma piano all'orizzonte.","La squadra è di nuovo in forze, uagliò."] },
    link:'il Tavoliere -> Bari (con Medaglia del Vesuvio)' },
  { city:'BARI', region:'Puglia', leader:'Mimmo', type:'Luce', badge:'badge16',
    maps:['bari','gymba','ambba','murgia','castelmonte','bradano'],
    layout:[ { c:['bari'] },
             { c:['gymba','ambba'] },
             { c:['murgia','castelmonte'], j:'->' } ],
    respawn:{ map:'bari', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina sul lungomare\ndi Bari. Il sole acceca, il mare luccica.","La squadra è di nuovo in forze, uagnò."] },
    link:'valle del Bradano -> Potenza (con Medaglia del Sole)' },
  { city:'POTENZA', region:'Basilicata', leader:'Rocchino', type:'Terra', badge:'badge17',
    maps:['potenza','gympz','ambpz','calanchi','sassi','pollino'],
    layout:[ { c:['potenza'] },
             { c:['gympz','ambpz'] },
             { c:['calanchi','sassi'], j:'->' } ],
    respawn:{ map:'potenza', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina in salita.\nPotenza ti guarda dall'alto dei suoi monti.","La squadra è di nuovo in forze."] },
    link:'massiccio del Pollino -> Reggio (con Medaglia dei Sassi)' },
  { city:'REGGIO CALABRIA', region:'Calabria', leader:'Carmelo', type:'Veleno', badge:'badge18',
    maps:['reggio','gymrc','ambrc','aspromonte','stretto','traghetto'],
    layout:[ { c:['reggio'] },
             { c:['gymrc','ambrc'] },
             { c:['aspromonte','stretto'], j:'->' } ],
    respawn:{ map:'reggio', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina del lungomare.\nLo Stretto luccica, la Sicilia di fronte.","La squadra è di nuovo in forze, cumpà."] },
    link:'traghetto -> Palermo (con Medaglia del Bergamotto)' },
  { city:'PALERMO', region:'Sicilia', leader:'Totò', type:'Oscurità', badge:'badge19',
    maps:['palermo','gympa','ambpa','madonie','abisso','nave'],
    layout:[ { c:['palermo'] },
             { c:['gympa','ambpa'] },
             { c:['madonie','abisso'], j:'->' } ],
    respawn:{ map:'palermo', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina davanti al mare.\nMonte Pellegrino veglia su Palermo.","La squadra è di nuovo in forze, picciottu."] },
    link:'nave -> Cagliari (con Medaglia del Gattopardo)' },
  { city:'CAGLIARI', region:'Sardegna', leader:'Antiogu', type:'Psico/Roccia', badge:'badge20',
    maps:['cagliari','gymca','ambca','barbagia','prama'],
    layout:[ { c:['cagliari'] },
             { c:['gymca','ambca'] },
             { c:['barbagia','prama'], j:'->' } ],
    respawn:{ map:'cagliari', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina al porto di\nCagliari. I fenicotteri rosa ti osservano.","La squadra è di nuovo in forze, oh."] },
    link:'ultima regione — tutte e 20 le Medaglie!' }
];
/* Etichette brevi delle aree per la schermata MAPPA. */
const AREA_LABELS = {
  lab:'Lab', milano:'Centro', parco:'Parco', gym:'Palestra', ambmi:'Ambul.',
  shopmi:'Negozio', navigli:'Navigli', segreto:'Darsena',
  torino:'Centro', gymto:'Palestra', ambto:'Ambul.', murazzi:'Murazzi', sotterranei:'Sotterr.',
  aosta:'Centro', gymao:'Palestra', ambao:'Ambul.', gransanbernardo:'Passo', gelo:'Grotta',
  genova:'Centro', gymge:'Palestra', ambge:'Ambul.', scogliera:'Scogliera', lanterna:'Lanterna',
  stradapo:'Statale', valico:'Valico', appennino:'Strada',
  bolzano:'Centro', gymtr:'Palestra', ambtr:'Ambul.', dolomiti:'Dolomiti', rosengarten:'Rosengarten', valdadige:"Val d'Adige",
  brenta:'Brenta',
  venezia:'Centro', gymve:'Palestra', ambve:'Ambul.', laguna:'Laguna', calle:'Calle', isonzo:'Isonzo',
  trieste:'Centro', gymts:'Palestra', ambts:'Ambul.', carso:'Carso', grotta_bora:'Grotta',
  pianurapo:'Pianura',
  bologna:'Centro', gymbo:'Palestra', ambbo:'Ambul.', viaemilia:'Via Emilia', torri:'Due Torri',
  futa:'Futa',
  firenze:'Centro', gymfi:'Palestra', ambfi:'Ambul.', chianti:'Chianti', ipogeo:'Ipogeo',
  trasimeno:'Trasimeno',
  perugia:'Centro', gympg:'Palestra', ambpg:'Ambul.', valnerina:'Valnerina', gubbio:'Gubbio',
  furlo:'Furlo',
  ancona:'Centro', gyman:'Palestra', amban:'Ambul.', conero:'Conero', sibillini:'Sibillini',
  salaria:'Salaria',
  roma:'Centro', gymrm:'Palestra', ambrm:'Ambul.', appiaantica:'Appia', catacombe:'Catacombe',
  montecitorio:'Montecitorio', covo:'Covo Cosca',
  valeria:'Valeria',
  aquila:'Centro', gymaq:'Palestra', ambaq:'Ambul.', gransasso:'Gran Sasso', corno:'Corno Grande',
  tratturo:'Tratturo',
  campobasso:'Centro', gymcb:'Palestra', ambcb:'Ambul.', matese:'Matese', pietrabbondante:'Pietrabbondante',
  sannio:'Sannio',
  napoli:'Centro', gymna:'Palestra', ambna:'Ambul.', vesuvio:'Vesuvio', castelovo:"Castel dell'Ovo",
  tavoliere:'Tavoliere',
  bari:'Centro', gymba:'Palestra', ambba:'Ambul.', murgia:'Murgia', castelmonte:'Castel del Monte',
  bradano:'Bradano',
  potenza:'Centro', gympz:'Palestra', ambpz:'Ambul.', calanchi:'Calanchi', sassi:'Sassi di Matera',
  pollino:'Pollino',
  reggio:'Centro', gymrc:'Palestra', ambrc:'Ambul.', aspromonte:'Aspromonte', stretto:'Stretto',
  traghetto:'Traghetto',
  palermo:'Centro', gympa:'Palestra', ambpa:'Ambul.', madonie:'Madonie', abisso:'Abisso',
  nave:'Nave',
  cagliari:'Centro', gymca:'Palestra', ambca:'Ambul.', barbagia:'Barbagia', prama:"Mont'e Prama"
};
const SECRET_AREAS = ['segreto', 'sotterranei', 'gelo', 'lanterna', 'rosengarten', 'calle', 'grotta_bora', 'torri', 'ipogeo', 'gubbio', 'sibillini', 'catacombe', 'corno', 'pietrabbondante', 'castelovo', 'castelmonte', 'sassi', 'stretto', 'abisso', 'prama'];

/* Il punto di risveglio dopo una sconfitta è ora in WORLD_MAP[regione].respawn,
   così rinasci sempre nella città della regione in cui ti trovi (vedi whiteout). */
