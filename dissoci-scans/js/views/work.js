const meta = (w) => {
  const m = [["Roteirista", w.rt], ["Artista", w.ar], ["Editora", w.ed], ["Publicação original", w.pb]].filter((x) => x[1]).map((x) => `<small style="display:block"><b>${x[0]}:</b> ${E(x[1])}</small>`).join("");
  return m ? `<div style="margin:0 0 12px">${m}</div>` : "";
};

function vObra(id) {
  const w = W(id), u = me();
  if (!w) return nf();
  const p = u.pr[id], st = u.rd.includes(id) ? "rd" : u.dn.includes(id) ? "dn" : "";
  return `<div class="p"><div class="top">${cover(w)}<div><h2 style="margin:0">${E(w.t)}</h2><p class="mu">${E(w.a)} · ${w.ty} · ${w.s}</p><div class="ch">${w.g.map((g) => `<span class="chip">${g}</span>`).join("")}</div></div></div>${meta(w)}<p style="white-space:pre-line">${E(w.d)}</p>
 ${w.ch.length ? `<a class="b" href="#ler-${id}-${p || w.ch[0].n}">${p ? "Continuar cap. " + p : "Ler agora"}</a>` : ""}<button class="b o" data-a="fv" data-v="${id}">${u.fv.includes(id) ? "♥ Favorito" : "♡ Favoritar"}</button><button class="b o" data-a="st" data-v="${st == "dn" ? "none" : "dn"}" data-i="${id}">${st == "dn" ? "✓ Lido" : "Marcar como lido"}</button></div>
 <h2>Capítulos (${w.ch.length})</h2>${(u.co == 1 ? [...w.ch] : [...w.ch].reverse()).map((c) => `<a class="li" href="#ler-${id}-${c.n}"><span>${c.v ? `<small>Vol. ${c.v} · </small>` : ""}Cap. ${c.n} — ${E(c.t)}</span><small>${fd(c.dt)}</small></a>`).join("") || '<p class="p mu">Nenhum capítulo ainda.</p>'}${cmts("o" + id)}`;
}
