function vBuscar() {
  return (`<div class="p"><input id="q" type="search" placeholder="Buscar título, autor ou gênero" value="${E(Q)}">` +
    `<select data-a="so">${opt([["", "Ordenar: mais recentes"], ["nt", "Ordenar: melhor avaliadas"]], me().so || "")}</select>` +
    `<div class="ch">${chips(GEN, "gf", GF)}</div><div id="res" class="grid"></div></div>`);
}

function res() {
  const q = Q.toLowerCase();
  const r = db.works.filter((w) => (!q || (w.t + w.a + (w.ed || "") + w.g.join()).toLowerCase().includes(q)) && GF.every((g) => w.g.includes(g)));
  if (me().so == "nt") r.sort((a, b) => rating(b).avg - rating(a).avg || rating(b).n - rating(a).n);
  $("#res").innerHTML = r.map(card).join("") || (db.works.length ? '<p class="mu">Nada encontrado.</p>' : EMPTY);
}
