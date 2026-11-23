function vBuscar() {
  return `<div class="p"><input id="q" type="search" placeholder="Buscar título, autor ou gênero" value="${E(Q)}"><div class="ch">${chips(GEN, "gf", GF)}</div><div id="res" class="grid"></div></div>`;
}

function res() {
  const q = Q.toLowerCase(), r = db.works.filter((w) => (!q || (w.t + w.a + (w.ed || "") + w.g.join()).toLowerCase().includes(q)) && GF.every((g) => w.g.includes(g)));
  $("#res").innerHTML = r.map(card).join("") || (db.works.length ? '<p class="mu">Nada encontrado.</p>' : EMPTY);
}
