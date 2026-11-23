function vLer(id, n) {
  const w = W(id), c = w && w.ch.find((x) => x.n == n), u = me();
  if (!c) return nf();
  u.pr[id] = n;
  if (!u.rd.includes(id) && !u.dn.includes(id)) u.rd.push(id);
  save();
  const pgs = c.p.length ? c.p : Array(c.np || 8).fill(0), pm = u.md == "p", nx = w.ch.find((x) => x.n > n), pv = [...w.ch].reverse().find((x) => x.n < n);
  const pg = (s, i) => s ? `<img class="pg" src="${s}" alt="Página ${i + 1}">` : `<div class="pg" style="background:linear-gradient(${150 + n * 25 + i * 8}deg,${w.c[0]},${w.c[1]})"><span>${E(w.t)}<br>Cap. ${n} · pág. ${i + 1}</span></div>`;
  const nav = `<div class="bar">${pv ? `<a class="b o" href="#ler-${id}-${pv.n}">‹ Anterior</a>` : "<span></span>"}<a class="b o" href="#obra-${id}">Capítulos</a>${nx ? `<a class="b" href="#ler-${id}-${nx.n}">Próximo ›</a>` : `<a class="b" data-a="st" data-v="dn" data-i="${id}" href="#obra-${id}">Concluir</a>`}</div>`;
  return `<div class="bar"><b>${E(w.t)} · Cap. ${n}</b><small>${pm ? `${PG + 1}/${pgs.length}` : ""}</small></div>` + (pm ? `<div data-a="np" data-v="${pgs.length}">${pg(pgs[PG], PG)}</div><div class="bar"><button class="b o" data-a="pp">‹ Pág.</button><button class="b o" data-a="np" data-v="${pgs.length}">Pág. ›</button></div>` : pgs.map(pg).join("")) + nav + cmts(`c${id}-${n}`);
}
