const cover = (w) => `<div class="cv" style="background:${w.img ? `url(${w.img}) center/cover` : `linear-gradient(160deg,${w.c[0]},${w.c[1]})`}">${w.img ? "" : E(w.t)}</div>`;

const rating = (w) => {
  const v = Object.values(db.rt[w.id] || {});
  const n = v.length;
  return { n, avg: n ? v.reduce((a, b) => a + b, 0) / n : 0 };
};

const fmt = (x) => x.toFixed(1).replace(".", ",");

const stars = (x) => "★".repeat(Math.round(x)) + "☆".repeat(5 - Math.round(x));

const card = (w) => {
  const r = rating(w);
  return `<a class="cd" href="#obra-${w.id}">${cover(w)}<small>${E(w.t)}</small>${r.n ? `<span class="mu" style="font-size:12px">★ ${fmt(r.avg)}</span>` : ""}</a>`;
};

const last = (w) => Math.max(...w.ch.map((c) => c.dt), 0);

const chips = (l, a, s) => l.map((g) => `<span class="chip ${s.includes(g) ? "on" : ""}" data-a="${a}" data-v="${E(g)}">${E(g)}</span>`).join("");

const EMPTY = '<div class="p" style="text-align:center;margin-top:20vh"><h2 style="margin:0">Adicionando novas histórias</h2><p class="mu">Volte em breve!</p></div>';

const nf = () => '<p class="p mu">Página não encontrada.</p>';
