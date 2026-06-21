/* Oggetti. heal: PS recuperati · ball: true = strumento di cattura ·
   revive: frazione di PS max al risveglio di una Leggenda KO (0.5 = metà, 1 = piena).
   price: costo in € al negozio (assente = non acquistabile). */
const ITEMS = {
  panzerotto: { n:'Panzerotto',        heal:20,    price:100,  desc:'Cura 20 PS. Caldo di Luini.' },
  pizza:      { n:'Pizza Margherita',  heal:50,    price:300,  desc:'Cura 50 PS. Vera, napoletana.' },
  caffe:      { n:'Caffè Corretto',    revive:0.5, price:900,  desc:'Rianima una Leggenda KO a metà PS. Sveglia i morti.' },
  brodo:      { n:'Brodo della Nonna', revive:1,   price:1800, desc:'Rianima una Leggenda KO con tutti i PS. Miracoloso.' },
  ampolla:    { n:'Ampolla',           ball:true,  price:200,  desc:'Imbottiglia le Leggende selvatiche.' },
  canna:      { n:'Canna da Pesca',    rod:true,   price:300,  desc:'Davanti all\'acqua, premi A per pescare.' }
};

/* Cosa vende il negozio (in ordine). */
const SHOP_STOCK = ['ampolla', 'panzerotto', 'pizza', 'caffe', 'brodo'];
