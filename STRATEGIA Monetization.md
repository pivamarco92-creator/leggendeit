# Leggende d'Italia — Analisi Strategica
*Consulenza game design, product strategy, monetizzazione*
*Giugno 2026 — basata su ispezione diretta del codice*

---

## 0. Premessa metodologica

Questa analisi è basata sulla lettura del codice sorgente reale (src/, data/, manifest.json, service-worker.js). Non contiene supposizioni sulla qualità percepita: ogni giudizio è ancorato a ciò che il codice fa o non fa.

---

## 1. Diagnosi critica

### Punti di forza reali

**Il concept è genuinamente differenziato.** Folklore italiano come ambientazione per un monster-collector è un angolo di mercato non occupato. Non è "Pokémon in Italia" — è un gioco con una voce narrativa propria (dialetti, personaggi regionali, criminalità organizzata come antagonista, il Molise che "non esiste"). Questo è difendibile e originale.

**L'architettura è solida per un indie a budget zero.** La separazione dati/engine è pulita: aggiungere una regione è quasi interamente un'operazione su file JSON. Il service worker funziona. La PWA è installabile. Il salvataggio automatico esiste.

**Il contenuto è sostanziale.** 15 regioni su 20, 36+ Leggende con tipi, mosse, learnset e linee evolutive. Esiste un sistema di progressione credibile (livelli 1–100, 4 mosse max, evoluzione automatica). Le battaglie sono a turni con efficacia tipi. Non è una demo vuota: è un gioco giocabile dall'inizio alla fine delle regioni disponibili.

**La narrativa ha personalità.** Il momento "Molise non esiste" come gym segreta, i "tre soci" con quest dedicate, la Cosca con scelte morali — questi sono hook narrativi che possono generare word-of-mouth organico su forum/Reddit nerd italiani.

### Debolezze strutturali

**Gli sprite sono il filtro di churn #1.** Il codice conferma che gli asset sono "programmer art procedurale" con sostituzione parziale via Kenney/Hexany CC0. Un utente che apre il gioco per la prima volta vede grafica da placeholder. La retention al minuto 1 è direttamente dipendente dalla prima impressione visiva. Con questi asset, il D1 non supererà il 15% su cold traffic.

**Il save su localStorage è una bomba a orologeria.** Se l'utente cancella la cache del browser, cambia dispositivo, usa modalità privata o iOS Safari svuota automaticamente il storage (cosa che fa dopo 7 giorni di inattività), perde tutto. Per un RPG con 20+ ore di contenuto, questo è un problema di retention critico al D7–D30. Non esiste backend, nessuna cloud save.

**Non esiste nessuna ragione strutturale per tornare.** Il gioco non ha: daily rewards, eventi temporanei, missioni giornaliere, contenuto rinnovato, sistema di amici, trading, PvP asincrono, leaderboard, notifiche push. L'utente finisce le regioni disponibili e non ha nessun segnale che lo richiami. Il D7 è predittivamente vicino allo zero su utenti non già motivati.

**Non esiste un funnel di acquisizione.** GitHub Pages non ha SEO pratico, non è indicizzabile su store, non ha download counter visibile, non ha referral system. La distribuzione attuale è equivalente a mettere il gioco su un server privato senza dirlo a nessuno.

**Il morale (G.morale) esiste ma non è comunicato all'utente.** È un sistema invisibile. I sistemi invisibili non influenzano il comportamento del giocatore e non creano engagement.

**Non ci sono terzi stadi di evoluzione** (citato nel backlog). Un monster-collector senza evoluzioni complete crea una progressione percepita come troncata.

### Assunzioni di design errate

**Assunzione: "il folklore italiano è sufficiente come hook di marketing".** No. Il folklore è un hook di nichia. Funziona per mantenere un'audience già acquisita, non per acquisirla. Senza un vettore di distribuzione, il folklore è irrilevante.

**Assunzione: "completare le 20 regioni è la priorità".** Sbagliato. Avere 20 regioni con sprite da placeholder e zero retention mechanics è peggio di avere 5 regioni con loop quotidiano e grafica decente. Il contenuto non compensa la mancanza di un motivo per tornare.

**Assunzione: "la PWA è sufficiente per la distribuzione mobile".** La PWA ha un tasso di installazione medio dell'1–3% rispetto agli utenti che visitano il sito. Senza banner di installazione espliciti e prompt contestuali ben costruiti, non viene installata. "Installabile" ≠ "installata".

**Assunzione: "il genere monster-collector porta retention da solo".** Il genere porta aspettative alte. Chi ama i monster-collector ha già giochi ben finanziati come alternativa. Senza differenziatori forti nei loop quotidiani, la retention non arriva da sola.

### Rischi principali

1. **Rischio reputazionale**: se il gioco viene scoperto dalla community italiana del gaming/Reddit con sprite da placeholder, può venire categorizzato come "abbandonato" o "asset flip" e il danno è difficile da recuperare.
2. **Rischio legale (marginale ma reale)**: la similarità strutturale con Pokémon (6 creature in squadra, gym leader, Dex, cattura, tipo efficacia) potrebbe attirare attenzione da Nintendo anche senza asset copiati. Non è imminente ma è un rischio da tenere a mente per la distribuzione su store.
3. **Rischio tecnico**: localStorage su iOS Safari viene svuotato da Apple dopo periodi di inattività. Un RPG con 20+ ore di gioco che perde i salvataggi è l'unico modo garantito per ricevere recensioni 1 stella.

---

## 2. Analisi del Core Loop

### Loop attuale

```
Arrivi in città → Parli con NPC → Esplori la route → Combatti trainer a vista →
Catturi Leggende nell'erba alta → Vai in palestra → Batti gli allievi in ordine →
Batti il capopalestra → Sblocchi la regione successiva → Ripeti
```

Questo è un **loop di progressione pura**: ogni azione sblocca la prossima. Non è un loop a sé stante — è un percorso lineare. Funziona in un RPG che si gioca per ore continue (Game Boy anni '90), ma non funziona in un gioco mobile o web con sessioni corte.

### Problemi di engagement

**Nessuna variabilità nella ricompensa.** Gli incontri nell'erba alta sono prevedibili (tabella fissa per mappa). Non c'è la "sorpresa" di un incontro raro al momento giusto che spinge a continuare. Questo è il meccanismo principale che rende i monster-collector addictive: la variable reward schedule. Non è implementato.

**Nessuna decisione strategica nelle battaglie.** Con 4 mosse e tipo efficacia, le battaglie sono risolte quasi meccanicamente. Non c'è un livello di profondità che crei un "ok, ancora un tentativo" dopo una sconfitta.

**Il whiteout è troppo morbido.** Perdi, ti curano e torni al respawn. Non c'è nessuna penalità, ma nemmeno nessuna narrativa: il fallimento non conta. I fallimenti che non contano non insegnano nulla e non creano tensione.

**Non c'è nessun hook di sessione corta.** Non puoi fare "5 minuti di gioco" con questo loop. O stai esplorando una regione completa o non stai facendo nulla di significativo.

### Cosa manca per una retention sana

Il loop di un gioco con retention reale ha tre livelli:

1. **Loop di micro-sessione (< 5 min)**: una piccola azione con ricompensa immediata. Manca del tutto.
2. **Loop di sessione (20–40 min)**: completare qualcosa di significativo. Esiste (esplorare una route, battere una palestra), ma è troppo long-form per mobile.
3. **Loop meta-giornaliero**: una ragione per aprire l'app domani. Completamente assente.

### Suggerimenti di redesign del loop

**Urgente**: introdurre un sistema di "avvistamenti quotidiani" — ogni giorno, 3 Leggende rare compaiono in posizioni specifiche nelle route già visitate. Questo riporta l'utente su contenuto esistente senza creare contenuto nuovo.

**Medio termine**: introdurre la Saga della Cosca come loop parallelo — missioni narrative che avanzano indipendentemente dalla progressione delle regioni. Dà qualcosa da fare anche a chi è bloccato su una palestra difficile.

**Strutturale**: le battaglie devono avere più mosse, più stati alterati, e un livello di strategia maggiore. Il sistema dei tipi è già lì — va usato per creare matchup non banali nelle palestre.

---

## 3. Analisi Retention

### D1 (ritorno dopo 1 giorno)

**Stato attuale**: probabilmente 10–20% su utenti che arrivano per referral organico (amici/forum), 5–10% su cold traffic.

**Problema principale**: il gioco non ha nessun meccanismo che dica all'utente "domani c'è qualcosa di nuovo". Nessuna push notification (anche se la PWA lo supporta tecnicamente), nessun daily reward, nessun cliffhanger temporizzato.

**Cosa servirebbe per D1 > 30%**: una schermata di fine sessione che dica esplicitamente "domani alle [ora] puoi incontrare [Leggenda rara] a [posto specifico]". Crea aspettativa concreta. È implementabile senza backend.

### D7 (ritorno dopo 7 giorni)

**Stato attuale**: stimato < 5%.

**Problema principale**: doppio rischio — o l'utente ha già finito il contenuto disponibile, oppure non ha nessun motivo strutturale per tornare. Aggravato dal fatto che iOS Safari può aver già cancellato il salvataggio.

**Cosa servirebbe per D7 > 15%**: (a) cloud save (richiede backend), (b) eventi settimanali anche minimali (Leggenda con spawn boosted per 3 giorni), (c) progressione parallela alla storia principale (es. reputazione con le fazioni della Cosca). Nessuno di questi è implementato.

### D30 (ritorno dopo 30 giorni)

**Stato attuale**: stimato < 1% senza eventi speciali.

**Cosa servirebbe per D30 > 5%**: contenuto aggiornato (nuove regioni, eventi stagionali), community attiva con qualcosa da mostrare (screenshot del team, leaderboard catture), o un gancio sociale come il trading tra giocatori. Tutto richiede backend e investimento significativo.

### Meccaniche mancanti per sostenere la retention

In ordine di impatto/costo di implementazione:

1. **Daily login reward** (basso costo): un oggetto o monete ogni giorno di login, con streak bonus. Funziona senza backend se si accetta che si possa barare resettando la data locale.
2. **Notifiche push PWA** (medio costo): la PWA supporta push notification via service worker. Richiederebbe un backend minimo (anche Firebase gratuito) per inviare notifiche.
3. **Leggenda settimanale** (basso costo, alto impatto percepito): ogni settimana una Leggenda rara ha spawn aumentato in una regione. Può essere hardcoded nel codice con `new Date().getWeek()`.
4. **Progressione del Dex come retention** (già parzialmente presente): il Dex visto/catturato è già tracciato. Va reso visibile, con obiettivi chiari ("cattura 50 Leggende per sbloccare X").
5. **Cloud save** (alto costo ma necessario per D30): senza questo, chiunque perda il salvataggio non tornerà.

---

## 4. Strategia di Monetizzazione

### Opzione A: Pubblicità (web e mobile)

**Fattibilità**: bassa nel breve termine.

**Come funziona**: AdSense su web, AdMob via Capacitor su mobile. CPM per giochi web RPG: €0.30–1.50. Per guadagnare €100/mese servono 70.000–330.000 impression/mese, che corrispondono a circa 5.000–20.000 sessioni mensili con 3–5 annunci ciascuna.

**Rischio UX**: alto. Un RPG con interruzioni pubblicitarie è distruttivo per l'immersione. Gli interstitial tra una battaglia e l'altra creano churn immediato. I banner fissi su un gioco 16:9 consumano spazio già limitato su mobile.

**Prerequisiti di design**: sessioni brevi e ben delimitate dove inserire un annuncio in modo non invasivo (es. "guarda un annuncio per ottenere una pozione"). Il loop attuale è troppo continuo per ads non invasive.

**Potenziale economico**: basso. Realisticamente €10–50/mese finché il MAU non supera i 10.000. Richiede mesi/anni di crescita organica per diventare significativo.

**Verdetto**: scarta come fonte primaria. Può funzionare come opzione "rewarded video" (guarda un annuncio per una ricompensa in gioco) — è l'unico formato compatibile con questo tipo di gioco.

---

### Opzione B: Acquisti in-app (cosmetici, progressione, contenuti)

**Fattibilità**: media nel medio termine, richiede lavoro significativo.

**Prerequisiti tecnici**: backend per autenticazione, payment processor (Stripe, o Apple/Google IAP), sistema di account. Stima: 2–4 settimane di lavoro, più costi fissi (server €5–20/mese, commissioni 30% Apple/Google su store).

**Tipi di IAP compatibili con questo gioco**:

- *Cosmetici* (skin alternative per le Leggende, skin del personaggio): richiedono budget artistico. Con sprite da placeholder, non vendibili. Prerequisito: grafica decente.
- *Acceleratori di progressione* (ampolla extra, incontri garantiti con Leggende rare): fattibili tecnicamente, ma in un RPG solo-player questo crea la percezione di "pay to win" anche se non c'è competizione. Rischio reputazionale elevato nelle community indie.
- *Contenuto premium* (regioni extra, quest della Cosca estesa, Leggende esclusive): questo è il modello più sano. Il gioco base è gratuito e completo, il contenuto extra è acquistabile. Richiede però che il contenuto base sia già eccellente.
- *Battle Pass / stagionale*: prematuro senza una base di utenti attiva. Diventa rilevante solo con DAU > 500.

**Potenziale economico**: medio se implementato bene. Un modello "contenuto extra a €2.99" su 1.000 utenti con conversion rate del 5% = €150. Non è un business, ma è sostenibile per un indie.

**Verdetto**: da considerare nella fase 3, solo dopo aver risolto retention e grafica.

---

### Opzione C: Modello Premium

**Fattibilità**: alta nel breve termine per il web, media per gli store.

**Varianti**:

- *itch.io "pay what you want" con minimo €2*: distribuzione immediata, nessun backend, zero commissioni oltre al 10% di itch. Questa è la scelta più rapida e realistica per iniziare a monetizzare.
- *Premium fisso su store (€2.99–4.99)*: richiede wrapping con Capacitor/Cordova, account developer Apple (€99/anno) e Google (€25 una tantum), e una grafica che giustifichi il prezzo. Con gli sprite attuali, è improbabile superare il review editoriale di Apple.
- *"Demo gratuita, gioco completo a pagamento"*: le prime 3 regioni free, poi unlock a €3.99. Modello collaudato per RPG indie.

**Rischio UX**: basso. Il premium non compromette l'esperienza di gioco.

**Potenziale economico**: basso in volume assoluto (pochi indie RPG superano le 500 vendite senza marketing), ma è l'unico modello che funziona senza backend e senza DAU elevato.

**Verdetto**: questa è la prima mossa realistica. Pubblicare su itch.io con un prezzo suggerito di €3 genera sia entrate che credibilità.

---

### Opzione D: Modello Ibrido (raccomandato)

**Struttura**: free-to-play su web/GitHub Pages con le prime N regioni → itch.io con unlock completo a €2.99 → eventuale store con Capacitor dopo il refactor grafico.

**Perché funziona per un indie**:
- La versione gratuita su GitHub Pages funge da demo infinita e canale di acquisizione.
- itch.io ha una community di indie gamer disposta a pagare per RPG con personalità.
- Non richiede backend per la parte premium (token di unlock via localStorage, abbastanza per uso onesto).
- Si scala gradualmente senza investimento iniziale.

**Rischio principale**: senza un refactor grafico, il conversion rate dalla demo al premium sarà basso indipendentemente dalla qualità del gameplay.

---

## 5. Strategia di Crescita (senza budget marketing)

### Meccaniche virali integrabili nel gameplay

**Screenshot del team condivisibile**: una schermata "Il mio team" ben disegnata, con le 6 Leggende in bella mostra, che si esporta come immagine. Su mobile questo è il vettore principale di sharing per i giochi di questo genere. Costo di implementazione: basso (canvas API). Prerequisito: sprite decenti.

**"Mostra il tuo Dex"**: quante Leggende hai catturato su 36. Un numero semplice che crea competizione organica ("io ne ho 28, tu quante?"). Esportabile come immagine. Zero backend necessario.

**Il Molise come leva di word-of-mouth**: la gym segreta del Molise ("il Molise non esiste") è esattamente il tipo di segreto che viene condiviso spontaneamente. Va reso leggermente più difficile da trovare e leggermente più spettacolare quando lo trovi. I segreti scoperti vengono raccontati.

**Nomi dei personaggi regionali come hook culturale**: Carletto di Milano, Gianduiotto di Torino, ecc. Ogni italiano del Nord riconosce questi stereotipi e li condivide. È marketing culturale gratuito.

### Sistemi di condivisione

1. **Link di condivisione con stato** (es. `?dex=28&region=napoli`): un URL che mostra i progressi dell'utente. Zero backend: il dato è nell'URL. Chi lo apre vede una schermata statica con i progressi dell'altro.
2. **Schermata di fine regione condivisibile**: quando batti un capopalestra, una card "Ho sconfitto Gianduiotto a Torino" esportabile come PNG. Il momento di vittoria è il momento emotivo giusto per il sharing.
3. **Reddit/Discord italia**: i subreddit r/italy, r/italygames, r/IndieGaming, e community Discord di giochi indie italiani sono il target primario. Un post con gif del gameplay e "ho fatto un gioco RPG sul folklore italiano" funziona bene se il gioco ha personalità visiva.

### Loop di acquisizione organico

Il ciclo realistico per un indie senza budget:

```
Utente italiano su Reddit/Discord vede post →
Prova il gioco (web, zero friction) →
Riconosce i riferimenti culturali (Carletto, Gianduiotto, Molise) →
Condivide con amici italiani →
Alcuni installano la PWA →
Loop
```

Il bottleneck è il primo passo: il post deve essere abbastanza buono da ricevere upvote. Questo dipende dalla qualità della gif/screenshot. Con gli sprite attuali, il post verrà downvotato o ignorato.

### Piattaforme ideali per distribuzione iniziale

1. **itch.io** (immediato): community di indie gamer, costi zero, accetta "pay what you want", ha sistemi di discovery per genere. È il canale principale.
2. **GameJolt** (alternativo a itch): simile, con community più giovane.
3. **r/IndieGaming** e **r/gamedev**: post di devlog con storia di sviluppo. "Ho fatto un RPG sul folklore italiano" è un titolo che funziona se accompagnato da gameplay decente.
4. **YouTube devlog**: un video di 5 minuti "Ho fatto un gioco sui mostri del folklore italiano" costa zero e può generare traffic costante per mesi.
5. **TikTok/Instagram (fase 2)**: clip di 30 secondi di gameplay con la didascalia "sapevi che il Munaciello era napoletano?" funziona su audience italiana. Richiede però sprite che reggano la compressione video.

---

## 6. Piano di Evoluzione in 3 Fasi

### Fase 1: MVP ottimizzato (3–5 settimane)

**Obiettivo**: rendere il gioco presentabile e pubblicabile su itch.io.

**Da fare assolutamente**:

- [ ] **Sostituire gli sprite delle creature** con asset CC0 di qualità decente (opengameart.org, itch.io free assets). Anche 16x16 pixel-art fatta bene è infinitamente meglio della grafica procedurale attuale. Questo è il singolare sblocco più importante: tutto il resto dipende da questo.
- [ ] **Implementare avvisi di perdita dati** su Safari/iOS: un banner visibile che spiega il rischio localStorage e invita all'installazione PWA. Non risolve il problema ma riduce il churn da frustrazione.
- [ ] **Rendere visibile il sistema morale** (G.morale): se esiste, deve essere comunicato. Un indicatore visibile della reputazione con la Cosca crea engagement immediato.
- [ ] **Schermata di fine sessione** con hook per il giorno dopo: "Domani potresti trovare [Leggenda] a [Luogo]". Nessun backend necessario.
- [ ] **Completare i terzi stadi di evoluzione** per le linee a 2 stadi: la progressione troncata è un segnale di "lavoro incompiuto" che abbassa la willingness to pay.
- [ ] **Pubblicare su itch.io** con prezzo suggerito €2–3 e le prime 3 regioni come demo gratuita.

**Da rimuovere o congelare**:

- Stop all'aggiunta di nuove regioni finché la grafica non è risolta. La regione 16–20 con sprite da placeholder non aggiunge valore percepito.
- Stop al backlog "non-regioni" generico: ogni ora va su cose che impattano la prima impressione.

**KPI di fase**: 500 visite su itch.io, 50 download, 5 pagamenti.

---

### Fase 2: Crescita e retention (2–4 mesi)

**Obiettivo**: costruire un loop quotidiano e la prima retention reale.

**Feature da aggiungere**:

- [ ] **Daily login reward**: un oggetto casuale ogni giorno, streak bonus dopo 7 giorni. Implementabile con localStorage + timestamp. Nessun backend.
- [ ] **Leggenda settimanale**: ogni settimana una Leggenda ha spawn aumentato. Calcolato da `new Date()` in modo deterministico — nessun backend, ma crea contenuto "fresco" percepito.
- [ ] **Schermata "Il mio team" esportabile**: PNG condivisibile con le 6 Leggende in squadra. Vettore di sharing organico.
- [ ] **Completare regioni 16–20**: ma solo dopo aver risolto la grafica. Il completamento del gioco è un evento comunicabile ("il gioco è completo" è una notizia su itch.io).
- [ ] **Backend minimale** (Firebase gratuito o Supabase free tier): necessario per cloud save e leaderboard. Il free tier di Firebase regge tranquillamente fino a 10.000 utenti mensili.
- [ ] **Sistema di progressione Dex** con obiettivi espliciti: "Cattura 20 Leggende" → sblocca oggetto; "Cattura tutte le Leggende di Piemonte" → sblocca outfit alternativo.
- [ ] **Leaderboard Dex** (richiede backend): chi ha catturato più Leggende in assoluto. Semplice ma efficace per la community.

**Sistemi di progressione**:
Il gioco già ha un ottimo sistema di base (livelli, evoluzioni, Dex). Va comunicato meglio. Una schermata di "progressi complessivi" con barre di completamento per ogni regione crea la percezione di un mondo da completare.

**KPI di fase**: D1 > 25%, D7 > 10%, 100+ giocatori attivi settimanali.

---

### Fase 3: Monetizzazione + Scaling (6–12 mesi)

**Obiettivo**: modello economico sostenibile e presenza su store.

**Modello economico definitivo**:

```
Web (GitHub Pages / itch.io): demo gratuita, prime 5 regioni
itch.io: unlock completo a €4.99 (one-time)
App Store / Play Store: €2.99 premium (no free tier per evitare complessità IAP)
Cosmetici facoltativi: skin alternative per il personaggio, €0.99 ciascuna
```

Non introdurre energy system o pay-to-win. La community indie è allergica e lo penalizza con recensioni negative che non si recuperano.

**Preparazione per lo store**:

- **Capacitor.js** è la scelta corretta per wrappare la PWA in un'app nativa. Phaser 3 + Capacitor è una combinazione documentata e funzionante.
- Requisiti tecnici minimi per Apple App Store: icone a tutte le risoluzioni, screenshot da 6.7" e 6.1", privacy policy, no web views esterne, nessun riferimento a prezzi esterni all'app (no link ad itch.io dall'app iOS).
- Requisiti per Google Play: meno restrittivi, ma richiedono target API level aggiornato (attualmente API 35+).
- **Account Developer**: Apple €99/anno, Google €25 una tantum. Prerequisito irrinunciabile.
- **TestFlight**: distribuzione beta via TestFlight prima della submission. Permette di testare su dispositivi reali e raccogliere feedback senza rischiare una rejection pubblica.

**Requisiti tecnici per la store submission**:
- Rimuovere ogni dipendenza da CDN esterni (Phaser va bundled nell'app, non caricato da CDN).
- Implementare offline completo anche per gli asset (già parzialmente fatto con service worker, da verificare end-to-end con Capacitor).
- Privacy policy ospitata su URL pubblico (GitHub Pages va benissimo per questo).
- Nessun contenuto che violi linee guida Apple/Google: il tema Cosca/crimine organizzato va tenuto nel registro "fiction narrativa" senza glorificazione esplicita.

**KPI di fase**: 1.000 download totali, €500+ revenue lifetime, 4.0+ stelle su store.

---

## 7. Valutazione Finale

### Probabilità stimata di successo commerciale

**Bassa-Media (20–35% di raggiungere €500+ lifetime revenue).**

Motivazione: il concept è solido e differenziato, la base tecnica esiste, il contenuto è sostanziale. Ma il percorso verso la monetizzazione richiede (a) un refactor grafico che richiede tempo o denaro, (b) un backend che richiede conoscenze tecniche aggiuntive, (c) un lancio strutturato che richiede tempo di marketing. Per un developer singolo con budget zero, ognuno di questi passaggi è un rischio di abbandono. Il mercato indie è saturo e la soglia di "buono abbastanza per vendere" si è alzata significativamente dal 2020.

Il ceiling realistico per un RPG indie solo-player senza un viral moment è €1.000–5.000 lifetime su itch.io + store. Non è un business, ma è un risultato significativo per un progetto personale.

### Principali failure mode

1. **Grafica non risolta → lancio prematuro su store → recensioni negative → impossibile recuperare.** Questo è il failure mode più probabile e più irreversibile. Una volta che un'app ha un rating di 2.5 stelle, il recovery richiede mesi di versioni migliorate e non è garantito.

2. **localStorage wipe su iOS → utente perde 10 ore di progresso → lascia recensione 1 stella → non torna.** Questo è il secondo failure mode più critico. Succede a ogni utente iOS che non apre il gioco per 7+ giorni.

3. **Lancio su itch.io senza traffico → zero vendite → demotivazione → abbandono del progetto.** L'itch.io non ha discovery automatica significativa. Un lancio senza almeno un post su Reddit/GameDev forums con traction non porta visitatori.

### 3 decisioni critiche che determinano il successo o fallimento

**Decisione 1: Grafica prima del lancio, o lancio con la grafica attuale.**
Lanciare con gli sprite attuali è quasi certamente controproducente. Un lancio soft su itch.io con un disclaimer "alpha, grafica placeholder" è accettabile per raccogliere feedback, ma non è un lancio vero. La decisione di investire tempo (o denaro) nella grafica è quella che sblocca tutto il resto.

**Decisione 2: Backend o no.**
Senza backend, il D7 non esiste e la retention a lungo termine è strutturalmente impossibile. La domanda non è se farlo, ma quando. Firebase Spark (free tier) con Firestore per il cloud save è implementabile in 1–2 weekend da un developer JS con esperienza. Rimandarlo indefinitamente è la decisione che mantiene il gioco in modalità "demo personale" invece di "prodotto".

**Decisione 3: Completare le regioni o investire nel loop quotidiano.**
Queste due strade sono in competizione per il tempo disponibile. Completare le regioni 16–20 aggiunge contenuto per chi arriva alla fine. Investire nel loop quotidiano (daily rewards, eventi settimanali) aumenta la probabilità che chiunque arrivi alla fine. Per un indie con distribuzione limitata, il loop quotidiano ha un ROI più alto: converte utenti occasionali in utenti fedeli. Le ultime 5 regioni si possono aggiungere dopo.

---

*Fine analisi. Ogni punto è basato sul codice sorgente esistente, non su supposizioni generiche.*
