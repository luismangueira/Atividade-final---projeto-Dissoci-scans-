function vLer(obraId, numero) {
  const obra = W(obraId);
  const capitulo = obra && obra.ch.find((item) => item.n == numero);
  const usuario = me();
  if (!capitulo) return nf();
  // Ao abrir o capítulo, guarda o progresso e atualiza a Biblioteca.
  usuario.pr[obraId] = numero;
  if (!usuario.rd.includes(obraId) && !usuario.dn.includes(obraId)) usuario.rd.push(obraId);
  save();
  const paginas = capitulo.p.length ? capitulo.p : Array(capitulo.np || 8).fill(0);
  const modoPaginado = usuario.md == "p";
  const proximo = obra.ch.find((item) => item.n > numero);
  const anterior = [...obra.ch].reverse().find((item) => item.n < numero);
  const renderizarPagina = (imagem, indice) => imagem ? `<img class="pg" src="${imagem}" alt="Página ${indice + 1}">` : `<div class="pg" style="background:linear-gradient(${150 + numero * 25 + indice * 8}deg,${obra.c[0]},${obra.c[1]})"><span>${E(obra.t)}<br>Cap. ${numero} · pág. ${indice + 1}</span></div>`;
  const navegacao = `<div class="bar">${anterior ? `<a class="b o" href="#ler-${obraId}-${anterior.n}">‹ Anterior</a>` : "<span></span>"}<a class="b o" href="#obra-${obraId}">Capítulos</a>${proximo ? `<a class="b" href="#ler-${obraId}-${proximo.n}">Próximo ›</a>` : `<a class="b" data-a="st" data-v="dn" data-i="${obraId}" href="#obra-${obraId}">Concluir</a>`}</div>`;
  return `<div class="bar"><b>${E(obra.t)} · Cap. ${numero}</b><small>${modoPaginado ? `${PG + 1}/${paginas.length}` : ""}</small></div>` + (modoPaginado ? (`<div data-a="np" data-v="${paginas.length}">${renderizarPagina(paginas[PG], PG)}</div>` +
    `<div class="bar"><button class="b o" data-a="pp">‹ Pág.</button>` +
    `<button class="b o" data-a="np" data-v="${paginas.length}">Pág. ›</button></div>`) : paginas.map(renderizarPagina).join("")) + navegacao + cmts(`c${obraId}-${numero}`);
}
