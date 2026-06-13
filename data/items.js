/* Oggetti. heal: PS recuperati · ball: true = strumento di cattura.
   price: costo in € al negozio (assente = non acquistabile). */
const ITEMS = {
  panzerotto: { n:'Panzerotto',       heal:20,   price:100, desc:'Cura 20 PS. Caldo di Luini.' },
  pizza:      { n:'Pizza Margherita', heal:50,   price:300, desc:'Cura 50 PS. Vera, napoletana.' },
  ampolla:    { n:'Ampolla',          ball:true, price:200, desc:'Imbottiglia le Leggende selvatiche.' },
  canna:      { n:'Canna da Pesca',   rod:true,             desc:'Davanti all\'acqua, premi A per pescare.' }
};

/* Cosa vende il negozio (in ordine). */
const SHOP_STOCK = ['ampolla', 'panzerotto', 'pizza'];
