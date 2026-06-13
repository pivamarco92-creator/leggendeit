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
    team:[['mazapegul',7],['gattomammone',9]],
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
    team:[['fusinot',11],['toret',13]],
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
    team:[['neiot',15],['brinassa',17]],
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
      title:'★ FINE DEI CONTENUTI ★',
      medal:'MEDAGLIA DEL MONTE BIANCO ottenuta!', region:'Regione 3 di 20 completata',
      next:'PROSSIMA TAPPA: LIGURIA<br>Barbagialla · Tipo Acqua · Genova',
      footer:'Hai finito i contenuti della demo!<br>Premi A: puoi continuare a giocare ed<br>esplorare liberamente le 3 regioni.',
      goodAt:4, badAt:-3,
      verdict:{
        good:'Da Milano alle Alpi, un nome corre\npiù veloce della Cosca: il tuo.',
        bad:'La Cosca ti chiama «socio».\nDormi al caldo — ma con un occhio\naperto.',
        neutral:'Tre medaglie, mani ancora pulite.\nL’Italia comincia a guardarti.'}
    }
  }
};

/* Mappa del mondo (schermata MAPPA del menù): regioni implementate e collegamenti.
   maps = mappe che appartengono alla regione (per evidenziare "sei qui"). */
const WORLD_MAP = [
  { city:'MILANO', region:'Lombardia', leader:'Carletto', type:'Normale', badge:'badge',
    maps:['milano','lab','parco','gym','ambmi','shopmi','navigli','segreto'],
    link:'| treno -> Torino (con Medaglia Madonnina)' },
  { city:'TORINO', region:'Piemonte', leader:'Gianduiotto', type:'Acciaio', badge:'badge2',
    maps:['torino','gymto','ambto','murazzi','sotterranei'],
    link:'| bus -> Aosta (con Medaglia della Mole)' },
  { city:'AOSTA', region:"Valle d'Aosta", leader:'Felicino', type:'Ghiaccio', badge:'badge3',
    maps:['aosta','gymao','ambao','gransanbernardo','gelo'],
    link:'| prossima: Liguria - Genova (in arrivo)' }
];

/* Risveglio dopo una sconfitta, per gruppo di mappe (def = fallback). */
const RESPAWN = [
  { maps:['aosta','gymao','ambao'], to:'aosta', x:13, y:15, dir:'up', lines:[
      "Ti svegli su una panchina gelata.\nUn San Bernardo ti lecca la faccia,\npreoccupato.",
      "«Tutto a posto, giovnot?»\nLa squadra è di nuovo in forze."] },
  { maps:['torino','gymto','ambto'], to:'torino', x:25, y:18, dir:'down', lines:[
      "Ti svegli su una panchina di\nPorta Nuova. Un piccione ti\nfissa, severo.",
      "«Esageruma nen», dice qualcuno.\nLa squadra è di nuovo in piedi."] },
  { def:true, to:'lab', x:4, y:5, dir:'down', lines:[
      "Ti svegli nel laboratorio.\nLa Prof.ssa Brambilla scuote la testa.",
      "«Ti ho rimesso in sesto io.\nFila a comprarti un caffè, va'.»"] }
];
