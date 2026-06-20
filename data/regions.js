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
    team:[['mazapegul',9],['gattomammone',11]],
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
    team:[['fusinot',14],['toret',16]],
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
    team:[['neiot',18],['brinassa',21]],
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
    team:[['borda',24],['anguanaregina',27]],
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
    team:[['cjalcjut',34],['cjalcjutone',37]],
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
    team:[['mazarione',32],['borda',34],['anguanaregina',36]],
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
    team:[['croder',27],['brinassa',28],['crodon',30]],
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
    team:[['farfarello',40],['malebranca',41],['fogaron',43]],
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
    team:[['strio',43],['civettona',44],['strione',46]],
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
      footer:'Hai finito i contenuti disponibili!<br>Premi A: puoi continuare a esplorare<br>liberamente le 9 regioni.',
      goodAt:10, badAt:-9,
      verdict:{
        good:'Da Milano a Firenze, un nome che la\nCosca non può comprare a nessun prezzo.',
        bad:'La Cosca ti segue di regione in\nregione, e compra tutto tranne te.',
        neutral:'Nove medaglie. Mezza Italia conosce\nil tuo nome; l\'altra metà ti aspetta.'}
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
    maps:['firenze','gymfi','ambfi','chianti','ipogeo'],
    layout:[ { c:['firenze'] },
             { c:['gymfi','ambfi'] },
             { c:['chianti','ipogeo'], j:'->' } ],
    respawn:{ map:'firenze', x:14, y:5, dir:'down', lines:["Ti svegli su una panchina in piazza\ndella Signoria. Il David ti guarda\ndall'alto, impassibile.","La squadra è di nuovo in forze, o bischero."] },
    link:'ultima regione disponibile' }
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
  firenze:'Centro', gymfi:'Palestra', ambfi:'Ambul.', chianti:'Chianti', ipogeo:'Ipogeo'
};
const SECRET_AREAS = ['segreto', 'sotterranei', 'gelo', 'lanterna', 'rosengarten', 'calle', 'grotta_bora', 'torri', 'ipogeo'];

/* Il punto di risveglio dopo una sconfitta è ora in WORLD_MAP[regione].respawn,
   così rinasci sempre nella città della regione in cui ti trovi (vedi whiteout). */
