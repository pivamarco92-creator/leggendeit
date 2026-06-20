/* Le Leggende — creature originali del folklore italiano.
   - learnset: [livello, mossa] — apprese salendo di livello (max 4 mosse,
     la più vecchia viene dimenticata). Livello massimo: 100.
   - evolve: { lv, to } — evoluzione automatica al raggiungimento del livello.
   L'ordine di CREATURE_ORDER deve combaciare con le colonne di assets/creatures.png
   (frame fronte = indice, retro = indice + CREATURE_ORDER.length). */
const CREATURE_ORDER = ['salvanello','tarantasino','anguanella','merlotta','mazapegul',
                        'bigatto','linchetto','munaciello','gattomammone','bisso',
                        'servanot','masca','fusinot','toret',
                        'salvan','gransalvan','tarantas','tarantasio',
                        'anguana','anguanaregina','merlona','mazapegon',
                        'bombice','buffardello',
                        /* Valle d'Aosta — tipo Ghiaccio (sprite procedurali, vedi gen_assets.py) */
                        'neiot','brinassa','stambeco',
                        /* Milano — leggendaria dell'area segreta dei Navigli */
                        'scighera',
                        /* Torino & Aosta — leggendarie delle aree segrete */
                        'taurin','barry',
                        /* evoluzioni — blocco 1 (Gatto Mammone, Bisso, Munaciello) */
                        'gattore','bissone','munacione',
                        /* evoluzioni — blocco 2 (Piemonte) */
                        'granservan','mascagna','fusinon','toron',
                        /* evoluzioni — blocco 3 (Hexany A) + blocco 4 (Hexany B) */
                        'strigone','bordona','mannarone','ratavolora','malebranca','basiliscu',
                        /* Liguria — leggendario */
                        'grifone',
                        /* Trentino-A.A. — linea di Roccia + leggendario */
                        'croder','crodon','laurino',
                        /* Friuli-V.G. — linea del Cjalcjut + leggendario */
                        'cjalcjut','cjalcjutone','bora',
                        /* Veneto — linea del Mazariol + leggendario
                           (NB: l'ordine Friuli->Veneto qui DEVE combaciare con gen_assets.py) */
                        'mazariol','mazarione','leon',
                        /* Emilia-Romagna — linea del Fuoco Fatuo + leggendario */
                        'foghin','fogaron','aldial',
                        /* Toscana — linea della stregoneria + leggendario */
                        'strio','strione','aruspice',
                        /* "I tre soci" — Leggende speciali dedicate agli amici (quest dedicate) */
                        'pivot','pivarol','pivon',
                        'faccin','facciotto','faccion',
                        'licat','licatone','licatass',
                        /* Umbria — linea di Terra + leggendario */
                        'zollin','zollone','lupogubbio',
                        /* sprite dal pack Hexany (CC0) — vedi tools/import_hexany.py */
                        'ratapignata','farfarello','civettona','borda',
                        'lupomannaro','scultone'];

const SPECIES = {
  /* ---------- linee evolutive degli starter ---------- */
  salvanello: { n:'SALVANELLO', types:['Erba'], hp:45, atk:49, def:49, spd:45,
    evolve:{ lv:16, to:'salvan' },
    learnset:[[1,'botta'],[1,'dispetto'],[6,'sferzata'],[14,'morso'],[20,'fogliolame'],[38,'querciasacra']],
    dex:'Folletto dei boschi delle Alpi (il Salvanèl). Protegge chi rispetta gli alberi.' },
  salvan: { n:'SALVAN', types:['Erba'], hp:60, atk:63, def:63, spd:60,
    evolve:{ lv:32, to:'gransalvan' },
    learnset:[[1,'botta'],[1,'dispetto'],[1,'sferzata'],[16,'morso'],[24,'fogliolame'],[40,'querciasacra']],
    dex:'Salvanèl adulto. Conosce ogni sentiero del bosco e non perdona chi lo sporca.' },
  gransalvan: { n:'GRANSALVAN', types:['Erba'], hp:80, atk:83, def:83, spd:80,
    learnset:[[1,'sferzata'],[1,'morso'],[1,'fogliolame'],[44,'querciasacra'],[50,'sfondata']],
    dex:'Patriarca dei boschi. Gli alberi più antichi si inchinano al suo passaggio.' },

  tarantasino: { n:'TARANTASINO', types:['Fuoco'], hp:39, atk:52, def:43, spd:65,
    evolve:{ lv:16, to:'tarantas' },
    learnset:[[1,'graffio'],[1,'dispetto'],[7,'favilla'],[15,'morso'],[22,'vampata'],[40,'rogo']],
    dex:'Cucciolo del drago Tarantasio del lago Gerundo — la leggenda dietro il biscione milanese.' },
  tarantas: { n:'TARANTAS', types:['Fuoco'], hp:58, atk:66, def:58, spd:80,
    evolve:{ lv:36, to:'tarantasio' },
    learnset:[[1,'graffio'],[1,'dispetto'],[1,'favilla'],[16,'morso'],[24,'vampata'],[42,'rogo']],
    dex:'Giovane drago di palude. Il suo fiato fa bollire le acque del Gerundo.' },
  tarantasio: { n:'TARANTASIO', types:['Fuoco','Volante'], hp:78, atk:86, def:78, spd:100,
    learnset:[[1,'favilla'],[1,'morso'],[1,'vampata'],[46,'rogo'],[52,'tramontana']],
    dex:'Il drago della leggenda, tornato in cielo. I Visconti ne fecero uno stemma.' },

  anguanella: { n:'ANGUANELLA', types:['Acqua'], hp:44, atk:48, def:65, spd:43,
    evolve:{ lv:16, to:'anguana' },
    learnset:[[1,'botta'],[1,'codata'],[7,'zampillo'],[15,'morso'],[22,'ondata'],[40,'piena']],
    dex:'Giovane Anguana, ninfa delle acque alpine. Elegante, gelida, permalosa.' },
  anguana: { n:'ANGUANA', types:['Acqua'], hp:59, atk:63, def:82, spd:58,
    evolve:{ lv:34, to:'anguanaregina' },
    learnset:[[1,'botta'],[1,'codata'],[1,'zampillo'],[16,'morso'],[24,'ondata'],[42,'piena']],
    dex:'Ninfa adulta dei torrenti. Canta di notte; chi la segue non torna asciutto.' },
  anguanaregina: { n:'ANGUANA REGINA', types:['Acqua'], hp:79, atk:83, def:102, spd:78,
    learnset:[[1,'zampillo'],[1,'morso'],[1,'ondata'],[46,'piena'],[52,'maledizione']],
    dex:'Regina delle acque dolci. Le piene dei fiumi obbediscono al suo umore.' },

  /* ---------- linee selvatiche ---------- */
  merlotta: { n:'MERLOTTA', types:['Normale','Volante'], hp:40, atk:45, def:40, spd:56,
    evolve:{ lv:18, to:'merlona' },
    learnset:[[1,'botta'],[1,'dispetto'],[6,'beccata'],[16,'tramontana']],
    dex:'Merla resa grigia dalla fuliggine dei camini: i Giorni della Merla.' },
  merlona: { n:'MERLONA', types:['Normale','Volante'], hp:60, atk:65, def:55, spd:76,
    learnset:[[1,'botta'],[1,'beccata'],[1,'dispetto'],[20,'tramontana'],[34,'sfondata']],
    dex:'Ha covato tre inverni sul camino. Ora comanda lei, anche sul gelo di gennaio.' },

  mazapegul: { n:'MAZAPÉGUL', types:['Normale'], hp:30, atk:56, def:35, spd:72,
    evolve:{ lv:22, to:'mazapegon' },
    learnset:[[1,'botta'],[1,'codata'],[8,'morso'],[18,'dispetto'],[26,'sfondata']],
    dex:'Folletto dispettoso di Romagna. Di notte siede sul petto di chi dorme.' },
  mazapegon: { n:'MAZAPEGON', types:['Normale'], hp:50, atk:81, def:55, spd:97,
    learnset:[[1,'botta'],[1,'morso'],[1,'codata'],[24,'sfondata']],
    dex:'Mazapégul cresciuto male. I suoi scherzi lasciano lividi e porte scardinate.' },

  bigatto: { n:'BIGATTO', types:['Coleottero'], hp:45, atk:30, def:35, spd:45,
    evolve:{ lv:10, to:'bombice' },
    learnset:[[1,'botta'],[1,'filodiseta'],[8,'sciame']],
    dex:'Baco da seta gigante della tradizione lombarda (il bigatt). Tesse fili robustissimi.' },
  bombice: { n:'BOMBICE', types:['Coleottero','Volante'], hp:60, atk:45, def:50, spd:70,
    learnset:[[1,'sciame'],[1,'filodiseta'],[12,'beccata'],[16,'tramontana'],[30,'dispetto']],
    dex:'Falena regina della seta. Le sue ali lasciano nell’aria una polvere lucente.' },

  linchetto: { n:'LINCHETTO', types:['Erba','Veleno'], hp:45, atk:50, def:55, spd:30,
    evolve:{ lv:21, to:'buffardello' },
    learnset:[[1,'botta'],[6,'sferzata'],[14,'velenovivo'],[24,'fogliolame']],
    dex:'Folletto della Garfagnana. Annoda i capelli e nasconde gli oggetti di casa.' },
  buffardello: { n:'BUFFARDELLO', types:['Erba','Spettro'], hp:60, atk:70, def:70, spd:45,
    learnset:[[1,'sferzata'],[1,'malocchio'],[22,'fogliolame'],[30,'maledizione']],
    dex:'Spirito del vento di Garfagnana. Quando fischia tra i tetti, chiudi le finestre.' },

  munaciello: { n:'MUNACIELLO', types:['Elettro'], hp:35, atk:55, def:40, spd:90,
    evolve:{ lv:26, to:'munacione' },
    learnset:[[1,'scarica'],[1,'dispetto'],[10,'botta'],[20,'saetta'],[42,'fulmine']],
    dex:'Il monacello napoletano. Fa saltare la luce. A volte lascia monete, a volte guai.' },
  gattomammone: { n:'GATTO MAMMONE', types:['Normale'], hp:40, atk:45, def:35, spd:90,
    evolve:{ lv:30, to:'gattore' },
    learnset:[[1,'graffio'],[1,'dispetto'],[10,'morso'],[24,'sfondata']],
    dex:'Gatto mitologico enorme e permaloso. Non accarezzarlo contropelo.' },
  bisso: { n:'BISSO', types:['Veleno'], hp:35, atk:60, def:44, spd:55,
    evolve:{ lv:28, to:'bissone' },
    learnset:[[1,'botta'],[8,'morso'],[16,'velenovivo']],
    dex:'Discendente del biscione visconteo. La Cosca ne ha corrotto la stirpe.' },
  servanot: { n:'SERVANOT', types:['Normale'], hp:42, atk:55, def:40, spd:60,
    evolve:{ lv:24, to:'granservan' },
    learnset:[[1,'botta'],[1,'dispetto'],[9,'morso'],[22,'sfondata']],
    dex:'Il Servan piemontese, folletto delle stalle. Di notte fa le trecce ai cavalli.' },
  masca: { n:'MASCA', types:['Spettro'], hp:40, atk:60, def:45, spd:65,
    evolve:{ lv:28, to:'mascagna' },
    learnset:[[1,'malocchio'],[1,'dispetto'],[12,'morso'],[26,'maledizione']],
    dex:'Strega del folklore piemontese. Il suo sguardo pesa come la nebbia sul Po.' },
  fusinot: { n:'FUSINOT', types:['Acciaio','Fuoco'], hp:45, atk:58, def:60, spd:45,
    evolve:{ lv:30, to:'fusinon' },
    learnset:[[1,'graffio'],[1,'favilla'],[10,'lamiera'],[26,'pressa'],[36,'vampata']],
    dex:'Spiritello delle fucine, nato da scintille e ghisa nelle officine torinesi.' },
  toret: { n:'TORET', types:['Acciaio','Acqua'], hp:55, atk:50, def:70, spd:35,
    evolve:{ lv:30, to:'toron' },
    learnset:[[1,'zampillo'],[1,'codata'],[12,'lamiera'],[26,'ondata'],[40,'pressa']],
    dex:'Uno dei torelli verdi di Torino, animato. Sputa acqua freschissima di montagna.' },

  /* ---------- Valle d'Aosta — linea del gelo + leggendario ---------- */
  neiot: { n:'NEIÒT', types:['Ghiaccio'], hp:42, atk:48, def:48, spd:50,
    evolve:{ lv:30, to:'brinassa' },
    learnset:[[1,'botta'],[1,'dispetto'],[6,'brinata'],[16,'morso'],[26,'gelata'],[42,'bufera']],
    dex:'Spiritello della neve valdostana («neio» in patois). Gioca a seppellire i sentieri.' },
  brinassa: { n:'BRINASSA', types:['Ghiaccio'], hp:68, atk:70, def:74, spd:60,
    learnset:[[1,'brinata'],[1,'morso'],[1,'gelata'],[34,'sfondata'],[46,'bufera']],
    dex:'Strega della brina dei ghiacciai. Dove passa, le pozze diventano specchi.' },
  stambeco: { n:'STAMBÉCO', types:['Ghiaccio'], hp:90, atk:95, def:85, spd:80,
    learnset:[[1,'morso'],[1,'gelata'],[1,'sfondata'],[1,'brinata'],[50,'bufera']],
    dex:'Lo stambecco bianco del Gran Paradiso, guardiano sacro delle vette. Si vede una volta sola.' },

  /* ---------- Milano — leggendaria dell'area segreta ---------- */
  scighera: { n:'SCIGHÉRA', types:['Spettro','Acqua'], hp:78, atk:72, def:78, spd:72,
    learnset:[[1,'malocchio'],[1,'zampillo'],[1,'ondata'],[1,'maledizione'],[50,'piena']],
    dex:'La Scighéra: la nebbia di Milano fatta Leggenda. Inghiotte i Navigli all’alba e svanisce a mezzogiorno.' },

  /* ---------- Torino — il Toro di bronzo ---------- */
  taurin: { n:'TAURIN', types:['Acciaio'], hp:85, atk:100, def:95, spd:62,
    learnset:[[1,'morso'],[1,'lamiera'],[1,'sfondata'],[1,'pressa'],[50,'pressa']],
    dex:'Il toro di bronzo di piazza San Carlo. Si dice porti fortuna girargli sopra: di notte, però, è lui a girare.' },

  /* ---------- Valle d'Aosta — il San Bernardo del passo ---------- */
  barry: { n:'BARRY', types:['Normale','Ghiaccio'], hp:92, atk:80, def:82, spd:72,
    learnset:[[1,'morso'],[1,'brinata'],[1,'sfondata'],[1,'gelata'],[50,'bufera']],
    dex:'Il leggendario San Bernardo del Gran San Bernardo: ha tratto in salvo più alpinisti di chiunque. Fiuta i dispersi sotto la neve.' },

  /* ---------- EVOLUZIONI · blocco 1 ---------- */
  gattore: { n:'GATTORÈ', types:['Normale','Spettro'], hp:65, atk:75, def:55, spd:105,
    learnset:[[1,'graffio'],[1,'morso'],[1,'malocchio'],[1,'sfondata'],[40,'maledizione']],
    dex:'Il Re dei Gatti, sovrano dei tetti di Brera. Cammina anche dove non c’è più tetto.' },
  bissone: { n:'BISSONE', types:['Veleno'], hp:62, atk:88, def:66, spd:72,
    learnset:[[1,'morso'],[1,'velenovivo'],[1,'codata'],[1,'sfondata'],[42,'velenovivo']],
    dex:'Il biscione visconteo nella sua forma piena: come nello stemma, inghiotte un uomo intero.' },
  munacione: { n:'MUNACIÒNE', types:['Elettro'], hp:55, atk:78, def:58, spd:112,
    learnset:[[1,'scarica'],[1,'saetta'],[1,'dispetto'],[1,'morso'],[46,'fulmine']],
    dex:'Il Munaciello cresciuto: ora fa saltare la corrente di interi quartieri, per dispetto.' },

  /* ---------- EVOLUZIONI · blocco 2 (Piemonte) ---------- */
  granservan: { n:'GRAN SERVAN', types:['Normale'], hp:62, atk:78, def:58, spd:82,
    learnset:[[1,'morso'],[1,'sfondata'],[1,'dispetto'],[1,'codata']],
    dex:'Il Servan anziano, patriarca delle stalle. Decide lui quali cavalli avranno fortuna.' },
  mascagna: { n:'MASCAGNA', types:['Spettro'], hp:60, atk:85, def:65, spd:80,
    learnset:[[1,'malocchio'],[1,'morso'],[1,'maledizione'],[1,'dispetto']],
    dex:'Masca anziana e potentissima. Quando vola sul Po, la nebbia la segue.' },
  fusinon: { n:'FUSINÒN', types:['Acciaio','Fuoco'], hp:65, atk:82, def:85, spd:58,
    learnset:[[1,'favilla'],[1,'lamiera'],[1,'pressa'],[1,'vampata'],[46,'rogo']],
    dex:'Lo spirito della grande fucina: martello e fiamma, batte il ferro e la sfortuna.' },
  toron: { n:'TORÒN', types:['Acciaio','Acqua'], hp:78, atk:72, def:95, spd:50,
    learnset:[[1,'zampillo'],[1,'lamiera'],[1,'ondata'],[1,'pressa'],[46,'piena']],
    dex:'Il grande toro-fontana di ghisa. Dalle corna sgorga un fiume di montagna.' },

  /* ---------- EVOLUZIONI · blocco 3 (Hexany A) ---------- */
  strigone: { n:'STRIGÒNE', types:['Volante','Spettro'], hp:65, atk:72, def:62, spd:88,
    learnset:[[1,'beccata'],[1,'malocchio'],[1,'tramontana'],[1,'dispetto'],[44,'maledizione']],
    dex:'La strix delle leggende: civetta gigante del malaugurio. Il suo canto gela il sangue.' },
  bordona: { n:'BORDÒNA', types:['Acqua','Spettro'], hp:70, atk:82, def:70, spd:72,
    learnset:[[1,'zampillo'],[1,'malocchio'],[1,'ondata'],[1,'maledizione'],[46,'piena']],
    dex:'La Borda regina della nebbia: inghiotte interi argini del Po in un sospiro grigio.' },
  mannarone: { n:'MANNARÒNE', types:['Normale'], hp:85, atk:102, def:72, spd:92,
    learnset:[[1,'morso'],[1,'graffio'],[1,'sfondata'],[1,'dispetto']],
    dex:'Il lupo mannaro nella forma di luna piena: tutto zanne, muscoli e ululato.' },

  /* ---------- EVOLUZIONI · blocco 4 (Hexany B) ---------- */
  ratavolora: { n:'RATAVOLÒRA', types:['Volante','Veleno'], hp:60, atk:78, def:58, spd:102,
    learnset:[[1,'beccata'],[1,'velenovivo'],[1,'tramontana'],[1,'dispetto']],
    dex:'Il grande pipistrello del ponente. Le sue ali coprono la luna sopra Genova.' },
  malebranca: { n:'MALEBRANCA', types:['Fuoco','Spettro'], hp:65, atk:88, def:62, spd:96,
    learnset:[[1,'favilla'],[1,'malocchio'],[1,'vampata'],[1,'maledizione'],[46,'rogo']],
    dex:'Un diavolo della quinta bolgia dantesca. Ride mentre brucia: per lui è uno scherzo.' },
  basiliscu: { n:'BASILISCU', types:['Veleno'], hp:80, atk:90, def:80, spd:66,
    learnset:[[1,'morso'],[1,'velenovivo'],[1,'sfondata'],[1,'malocchio'],[48,'maledizione']],
    dex:'Il basilisco sardo, custode supremo dei nuraghi. Si dice che il suo sguardo pietrifichi.' },

  /* ---------- Liguria — il Grifone di Genova ---------- */
  grifone: { n:'GRIFONE', types:['Volante'], hp:85, atk:92, def:80, spd:96,
    learnset:[[1,'beccata'],[1,'morso'],[1,'sfondata'],[1,'tramontana'],[50,'tramontana']],
    dex:'Il Grifone di Genova, sceso dallo stemma della città. Sorveglia il porto dall’alto della Lanterna.' },

  /* ---------- Veneto — linea del Mazariol + leggendario ---------- */
  mazariol: { n:'MAZARIOL', types:['Erba'], hp:45, atk:52, def:45, spd:58,
    evolve:{ lv:28, to:'mazarione' },
    learnset:[[1,'botta'],[1,'dispetto'],[7,'sferzata'],[16,'morso'],[26,'fogliolame'],[42,'querciasacra']],
    dex:'Il folletto rosso dei boschi veneti. Sposta le pietre del sentiero e gioca scherzi agli escursionisti. Veloce e sfuggente.' },
  mazarione: { n:'MAZARIONE', types:['Erba','Acqua'], hp:68, atk:76, def:65, spd:72,
    learnset:[[1,'sferzata'],[1,'morso'],[1,'fogliolame'],[30,'ondata'],[44,'querciasacra'],[52,'piena']],
    dex:'Il Mazariol adulto, signore delle barene veneziane. Guida le maree della laguna a suo piacimento e affoga chi lo disturba.' },
  leon: { n:'LEON DE SAN MARCO', types:['Acqua','Volante'], hp:92, atk:100, def:90, spd:88,
    learnset:[[1,'beccata'],[1,'zampillo'],[1,'ondata'],[1,'tramontana'],[50,'piena']],
    dex:'Il leone alato dello stemma di Venezia. Custode del Canal Grande, sorveglia la Serenissima dall\'alto delle acque da secoli di secoli.' },

  /* ---------- Friuli-Venezia Giulia — linea del Cjalcjut + leggendario ---------- */
  cjalcjut: { n:'CJALCJUT', types:['Vento'], hp:42, atk:48, def:38, spd:68,
    evolve:{ lv:28, to:'cjalcjutone' },
    learnset:[[1,'botta'],[1,'dispetto'],[7,'raffica'],[16,'morso'],[26,'tramontana'],[40,'ciclone']],
    dex:'Folletto friulano che vaga nelle notti di vento e svia i viandanti dai sentieri. Imprendibile come una folata.' },
  cjalcjutone: { n:'CJALCJUTONE', types:['Vento'], hp:65, atk:76, def:56, spd:92,
    learnset:[[1,'raffica'],[1,'morso'],[1,'tramontana'],[30,'dispetto'],[44,'sfondata'],[52,'ciclone']],
    dex:'Il Cjalcjut cresciuto. Ha imparato a cavalcare la Bora: la sua velocità supera quella del vento e non lascia tracce nel carso.' },
  bora: { n:'BORA', types:['Vento'], hp:95, atk:105, def:80, spd:115,
    learnset:[[1,'botta'],[1,'raffica'],[1,'tramontana'],[1,'ciclone'],[50,'ciclone']],
    dex:'Lo spirito del vento che da secoli devasta Trieste. Vento catabatico del nord-est, scende dal Carso con una forza che piega gli alberi e rovina i cappelli.' },

  /* ---------- Trentino-Alto Adige — linea di Roccia + Re Laurino ---------- */
  croder: { n:'CRODÈR', types:['Roccia'], hp:50, atk:60, def:78, spd:30,
    evolve:{ lv:30, to:'crodon' },
    learnset:[[1,'botta'],[1,'sassata'],[14,'morso'],[30,'frana']],
    dex:'Spiritello di roccia dolomitica (la «croda»). Sembra un sasso, finché non si muove.' },
  crodon: { n:'CRODÒN', types:['Roccia'], hp:78, atk:88, def:102, spd:38,
    learnset:[[1,'sassata'],[1,'morso'],[1,'sfondata'],[44,'frana']],
    dex:'Golem delle Dolomiti. Quando cammina, dicono, è una frana che decide dove andare.' },
  laurino: { n:'RE LAURINO', types:['Roccia'], hp:90, atk:98, def:95, spd:62,
    learnset:[[1,'sassata'],[1,'morso'],[1,'sfondata'],[1,'maledizione'],[50,'frana']],
    dex:'Il re dei nani del Catinaccio. La sua maledizione tinge le Dolomiti di rosso al tramonto: l’enrosadira.' },

  /* ---------- Emilia-Romagna — linea del Fuoco Fatuo + Al Diâl ---------- */
  foghin: { n:'FOGHÌN', types:['Fuoco'], hp:44, atk:52, def:40, spd:62,
    evolve:{ lv:30, to:'fogaron' },
    learnset:[[1,'botta'],[1,'dispetto'],[7,'favilla'],[16,'morso'],[28,'vampata'],[42,'rogo']],
    dex:'Fuoco fatuo della pianura padana. Una fiammella vagante che di notte danza sugli argini del Reno e svia i viandanti.' },
  fogaron: { n:'FOGARÒN', types:['Fuoco'], hp:68, atk:84, def:58, spd:86,
    learnset:[[1,'favilla'],[1,'morso'],[1,'vampata'],[34,'sfondata'],[48,'rogo']],
    dex:'Lo spirito del grande falò emiliano. Cresciuto dal fuoco fatuo, arde come i roghi delle feste di paese e non si lascia spegnere.' },
  aldial: { n:'AL DIÂL', types:['Fuoco','Spettro'], hp:92, atk:104, def:85, spd:92,
    learnset:[[1,'favilla'],[1,'malocchio'],[1,'vampata'],[1,'maledizione'],[50,'rogo']],
    dex:'Il diavolo delle Due Torri. La leggenda narra che aiutò a costruire la Garisenda in cambio di un\'anima: da allora veglia, storto, sui tetti di Bologna.' },

  /* ---------- Toscana — linea della stregoneria + L'Arùspice ---------- */
  strio: { n:'STRÌO', types:['Psico'], hp:45, atk:50, def:48, spd:58,
    evolve:{ lv:30, to:'strione' },
    learnset:[[1,'botta'],[1,'dispetto'],[7,'psicobotta'],[16,'morso'],[38,'psicoonda']],
    dex:'Folletto-stregone delle campagne toscane. Legge nel pensiero dei viandanti e ne confonde la strada per gioco.' },
  strione: { n:'STRIÒNE', types:['Psico'], hp:70, atk:80, def:70, spd:80,
    learnset:[[1,'psicobotta'],[1,'morso'],[1,'sfondata'],[44,'psicoonda']],
    dex:'Lo strìo cresciuto in mago vero e proprio. Si dice tenga corte tra le colline del Chianti e pieghi le menti deboli al suo volere.' },
  aruspice: { n:'L\'ARÙSPICE', types:['Psico'], hp:90, atk:100, def:92, spd:96,
    learnset:[[1,'psicobotta'],[1,'morso'],[1,'sfondata'],[1,'dispetto'],[50,'psicoonda']],
    dex:'L\'indovino etrusco che leggeva il futuro nelle viscere e nel volo degli uccelli. Dorme da millenni in un ipogeo sotto Firenze, e vede già come finirà il tuo viaggio.' },

  /* ---------- "I TRE SOCI" — Leggende speciali (Piva / Facci / Licata) ----------
     Esclusive: non si trovano allo stato selvatico, si ottengono solo dalle quest
     dei tre soci. Statistiche sopra uno starter, sotto un leggendario. */
  pivot: { n:'PIVÒT', types:['Elettro'], hp:40, atk:45, def:40, spd:60,
    evolve:{ lv:18, to:'pivarol' },
    learnset:[[1,'scarica'],[1,'dispetto'],[8,'botta'],[18,'saetta']],
    dex:'La Leggenda del socio Piva. Folletto-suonatore di piva (cornamusa): le sue note caricano l\'aria di elettricità. Piccolo, sveglio e dispettoso.' },
  pivarol: { n:'PIVARÒL', types:['Elettro'], hp:55, atk:65, def:52, spd:82,
    evolve:{ lv:36, to:'pivon' },
    learnset:[[1,'scarica'],[1,'saetta'],[1,'dispetto'],[28,'morso'],[40,'fulmine']],
    dex:'Il Pivòt cresciuto. Quando gonfia la piva, scarica saette a tempo di musica. Veloce come una battuta a fine serata.' },
  pivon: { n:'PIVÓN', types:['Elettro'], hp:75, atk:88, def:68, spd:108,
    learnset:[[1,'saetta'],[1,'morso'],[1,'sfondata'],[1,'fulmine'],[44,'pivonata']],
    dex:'Lo stadio finale della Leggenda di Piva. Un fulmine con la cornamusa: la sua PIVONATA fa saltare i contatori di un quartiere intero.' },

  faccin: { n:'FACCÌN', types:['Fuoco','Volante'], hp:45, atk:50, def:48, spd:45,
    evolve:{ lv:40, to:'facciotto' },
    learnset:[[1,'graffio'],[1,'favilla'],[8,'beccata'],[20,'vampata']],
    dex:'La Leggenda del socio Facci. Draghetto sfacciato dalla faccia tosta: non arrossisce mai, neanche quando sbaglia. Sputa scintille per dispetto.' },
  facciotto: { n:'FACCIÒTTO', types:['Fuoco','Volante'], hp:62, atk:70, def:62, spd:60,
    evolve:{ lv:52, to:'faccion' },
    learnset:[[1,'favilla'],[1,'beccata'],[1,'vampata'],[30,'tramontana'],[44,'rogo']],
    dex:'Il Faccìn cresciuto. Ali robuste e faccia di bronzo: ti guarda dall\'alto e ti sfida con un ghigno. Difficile imbarazzarlo.' },
  faccion: { n:'FACCIÓN', types:['Fuoco','Volante'], hp:82, atk:100, def:80, spd:84,
    learnset:[[1,'vampata'],[1,'tramontana'],[1,'sfondata'],[1,'rogo'],[50,'facciata']],
    dex:'Lo stadio finale della Leggenda di Facci. Un drago tutto faccia tosta: la sua FACCIATA incenerisce gli avversari mentre lui sorride impassibile.' },

  licat: { n:'LICÀT', types:['Acqua'], hp:48, atk:48, def:52, spd:42,
    evolve:{ lv:30, to:'licatone' },
    learnset:[[1,'zampillo'],[1,'codata'],[8,'botta'],[20,'ondata']],
    dex:'La Leggenda del socio Licata. Creatura di mare del sud, calma e testarda. Resta a galla in qualsiasi tempesta, come un buon amico.' },
  licatone: { n:'LICATÒNE', types:['Acqua'], hp:64, atk:66, def:72, spd:56,
    evolve:{ lv:44, to:'licatass' },
    learnset:[[1,'zampillo'],[1,'ondata'],[1,'codata'],[30,'morso'],[44,'piena']],
    dex:'Il Licàt cresciuto. Solido come uno scoglio e affidabile come la bassa marea. Quando si arrabbia, però, monta l\'onda.' },
  licatass: { n:'LICATÀSS', types:['Acqua'], hp:86, atk:88, def:96, spd:70,
    learnset:[[1,'ondata'],[1,'morso'],[1,'sfondata'],[1,'piena'],[48,'licatonda']],
    dex:'Lo stadio finale della Leggenda di Licata. Un colosso del mare del sud: la sua LICATÒNDA spazza il molo. Lento ad arrabbiarsi, terribile quando lo fa.' },

  /* ---------- Umbria — linea di Terra + il Lupo di Gubbio ---------- */
  zollin: { n:'ZOLLÌN', types:['Terra'], hp:50, atk:55, def:58, spd:35,
    evolve:{ lv:32, to:'zollone' },
    learnset:[[1,'botta'],[1,'fango'],[14,'morso'],[32,'terremoto']],
    dex:'Spiritello di terra delle colline umbre, una zolla che ha preso vita. Profuma di tartufo e di pioggia. Lento ma cocciuto.' },
  zollone: { n:'ZOLLÒNE', types:['Terra'], hp:80, atk:88, def:95, spd:45,
    learnset:[[1,'fango'],[1,'morso'],[1,'sfondata'],[46,'terremoto']],
    dex:'Golem di terra e radici del cuore verde d\'Italia. Quando cammina nei campi, dicono, le zolle si rivoltano da sole.' },
  lupogubbio: { n:'LUPO DI GUBBIO', types:['Terra','Normale'], hp:92, atk:102, def:88, spd:86,
    learnset:[[1,'morso'],[1,'fango'],[1,'sfondata'],[1,'terremoto'],[50,'terremoto']],
    dex:'Il lupo feroce che terrorizzava Gubbio, ammansito da San Francesco. Da allora veglia sui colli umbri: forte come la terra, mite come un patto mai tradito.' },

  /* ---------- creature dal bestiario esteso (sprite Hexany, CC0) ----------
     Incontri attivi ora: civettona (Milano/Parco), borda + lupomannaro (Torino/Valentino).
     RISERVATE alle regioni future per coerenza geografica:
       ratapignata -> Liguria · scultone -> Sardegna · farfarello -> evento Cosca. */
  ratapignata: { n:'RATAPIGNATA', types:['Volante','Veleno'], hp:40, atk:55, def:40, spd:80,
    evolve:{ lv:24, to:'ratavolora' },
    learnset:[[1,'beccata'],[1,'dispetto'],[10,'velenovivo'],[24,'tramontana']],
    dex:'Il pipistrello leggendario del ponente ligure. Vola storto, morde dritto.' },
  farfarello: { n:'FARFARELLO', types:['Fuoco','Spettro'], hp:45, atk:65, def:45, spd:75,
    evolve:{ lv:28, to:'malebranca' },
    learnset:[[1,'favilla'],[1,'malocchio'],[14,'dispetto'],[26,'vampata'],[40,'maledizione']],
    dex:'Diavoletto dantesco, folletto di vento infernale. Dispettoso non rende l’idea.' },
  civettona: { n:'CIVETTONA', types:['Normale','Volante'], hp:45, atk:50, def:45, spd:65,
    evolve:{ lv:26, to:'strigone' },
    learnset:[[1,'beccata'],[1,'dispetto'],[12,'malocchio'],[22,'tramontana']],
    dex:'La civetta del malaugurio. Se canta tre volte sul tuo tetto, controlla l’oroscopo.' },
  borda: { n:'BORDA', types:['Acqua','Spettro'], hp:50, atk:60, def:50, spd:55,
    evolve:{ lv:28, to:'bordona' },
    learnset:[[1,'zampillo'],[1,'malocchio'],[16,'ondata'],[30,'maledizione']],
    dex:'Strega della nebbia padana. Abita argini e canali, e non gradisce visite.' },
  lupomannaro: { n:'LUPOMANNARO', types:['Normale'], hp:65, atk:80, def:55, spd:75,
    evolve:{ lv:30, to:'mannarone' },
    learnset:[[1,'graffio'],[1,'morso'],[18,'dispetto'],[30,'sfondata']],
    dex:'Il licantropo della tradizione. Nelle notti di luna piena è meglio cambiare strada.' },
  scultone: { n:'SCULTONE', types:['Veleno'], hp:60, atk:70, def:60, spd:50,
    evolve:{ lv:30, to:'basiliscu' },
    learnset:[[1,'botta'],[1,'morso'],[14,'velenovivo'],[28,'sfondata']],
    dex:'Serpente mortale della Sardegna, custode dei nuraghi. Lo si incontra una volta sola.' }
};

const MAX_LEVEL = 100;

function creatureFrame(id, back) {
  return CREATURE_ORDER.indexOf(id) + (back ? CREATURE_ORDER.length : 0);
}
function calcStats(sp, lv) {
  return {
    maxhp: Math.floor(2*sp.hp*lv/100) + lv + 10,
    atk:   Math.floor(2*sp.atk*lv/100) + 5,
    def:   Math.floor(2*sp.def*lv/100) + 5,
    spd:   Math.floor(2*sp.spd*lv/100) + 5
  };
}
function expToNext(lv) { return 15 + lv*10; }
function movesAtLevel(sp, lv) {
  const learned = sp.learnset.filter(([l]) => l <= lv).map(([, m]) => m);
  return [...new Set(learned)].slice(-4);
}
function makeMon(id, lv) {
  const sp = SPECIES[id], st = calcStats(sp, lv);
  return { id, name: sp.n, types: sp.types, lv, ...st, hp: st.maxhp,
    exp: 0, expNext: expToNext(lv),
    moves: movesAtLevel(sp, lv).map(m => ({ id: m, pp: MOVES[m].pp })),
    stages: { atk:0, def:0, spd:0 } };
}
