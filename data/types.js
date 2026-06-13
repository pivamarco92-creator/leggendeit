/* Tabella efficacia tipi. Moltiplicatore di default: 1. */
const TYPE_EFF = {
  Fuoco:      { Erba:2, Coleottero:2, Acciaio:2, Ghiaccio:2, Acqua:.5, Fuoco:.5 },
  Acqua:      { Fuoco:2, Acqua:.5, Erba:.5, Ghiaccio:.5 },
  Erba:       { Acqua:2, Fuoco:.5, Erba:.5, Volante:.5, Veleno:.5, Coleottero:.5, Acciaio:.5 },
  Elettro:    { Acqua:2, Volante:2, Erba:.5 },
  Volante:    { Erba:2, Coleottero:2, Elettro:.5, Acciaio:.5 },
  Coleottero: { Erba:2, Fuoco:.5, Volante:.5, Veleno:.5, Acciaio:.5 },
  Veleno:     { Erba:2, Veleno:.5, Acciaio:.5 },
  Acciaio:    { Spettro:.5, Ghiaccio:2 },
  Ghiaccio:   { Erba:2, Volante:2, Acqua:.5, Fuoco:.5, Ghiaccio:.5, Acciaio:.5 },
  Spettro:    { Spettro:2, Normale:.5 },
  Normale:    { Spettro:.5, Acciaio:.5 }
};
function typeMult(atkType, defTypes) {
  let m = 1;
  for (const t of defTypes) m *= (TYPE_EFF[atkType] && TYPE_EFF[atkType][t]) ?? 1;
  return m;
}
