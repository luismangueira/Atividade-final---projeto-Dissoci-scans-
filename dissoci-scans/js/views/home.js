function vHome() {
  const usuario = me();
  if (!db.works.length) return EMPTY;
  // Aplica os filtros definidos pelo leitor.
  const catalogoVisivel = db.works.filter((w) =>
    !w.g.some((g) => usuario.bl.includes(g)) && (!usuario.ff || w.ty == usuario.ff)
  );

  // Usa gostos, favoritos e leituras concluídas para ordenar as sugestões.
  const generosDoHistorico = new Set(
    db.works
      .filter((w) => usuario.fv.includes(w.id) || usuario.dn.includes(w.id))
      .flatMap((w) => w.g)
  );
  const pontuarRecomendacao = (w) =>
    w.g.filter((g) => usuario.lk.includes(g)).length * 2 +
    w.g.filter((g) => generosDoHistorico.has(g)).length +
    (usuario.ty.includes(w.ty) ? 1 : 0);

  // Prepara as listas usadas na página inicial.
  const recentes = [...catalogoVisivel].sort((a, b) => last(b) - last(a));
  const recomendadas = catalogoVisivel
    .filter((w) => !usuario.rd.includes(w.id) && !usuario.dn.includes(w.id))
    .sort((a, b) => pontuarRecomendacao(b) - pontuarRecomendacao(a));
  const ranking = [...catalogoVisivel]
    .sort((a, b) =>
      b.pop + db.users.filter((x) => x.fv.includes(b.id)).length * 5 + rating(b).avg * 4 -
      a.pop - db.users.filter((x) => x.fv.includes(a.id)).length * 5 - rating(a).avg * 4
    )
    .slice(0, 5);
  const emLeitura = usuario.rd.map(W).filter(Boolean);
  const destaque = recentes[0];
  const novosCapitulos = usuario.nt !== 0 ? db.works.filter((w) => (usuario.rd.includes(w.id) || usuario.fv.includes(w.id)) && w.ch.some((c) => c.dt > (usuario.seen || 0))) : [];
  const avisoDeNovidades = novosCapitulos.length ? (`<div class="p" style="padding-bottom:0"><div style="background:var(--cd);border:1px solid var(--bd);border-radius:10px;padding:12px">` +
    `<b>🔔 Novos capítulos</b>${novosCapitulos.map((w) => `<a class="li" style="padding:8px 0" href="#obra-${w.id}"><span>${E(w.t)}</span><small>${w.ch.filter((c) => c.dt > (usuario.seen || 0)).length} novo(s)</small></a>`).join("")}<button class="b o" data-a="seen">Marcar como vistas</button></div></div>`) : "";
  return avisoDeNovidades + (destaque ? (`<div class="hero" style="margin-top:16px;background:linear-gradient(160deg,${destaque.c[0]},${destaque.c[1]})">` +
    `<small style="color:#fffc">NOVO CAPÍTULO · ${destaque.ty}</small>` +
    `<h1>${E(destaque.t)}</h1><p>${E(destaque.d.split("\n")[0])}</p>` +
    `<a class="b" style="background:#fff;color:#000;text-shadow:none" href="#obra-${destaque.id}">Ver obra</a></div>`) : "") + (emLeitura.length ? `<h2>Continuar lendo</h2><div class="row">${emLeitura.map(card).join("")}</div>` : "") + (`<h2>Atualizados recentemente</h2><div class="row">${recentes.map(card).join("")}</div>` +
    `<h2>Recomendados para você</h2><div class="row">${recomendadas.map(card).join("") || '<p class="mu">Nada por aqui ainda.</p>'}</div>` +
    `<h2>Ranking</h2>${ranking.map((w, i) => `<a class="rk" href="#obra-${w.id}"><i>${i + 1}</i>${cover({ ...w, t: "" })}<div><b>${E(w.t)}</b><br><small>${E(w.a)} · ${w.g.join(", ")}${rating(w).n ? ` · ★ ${fmt(rating(w).avg)}` : ""}</small></div></a>`).join("")}<p class="mu" style="text-align:center;margin-top:30px;font-size:12px">© luis mangueira · Dissoci-scans</p>`);
}
