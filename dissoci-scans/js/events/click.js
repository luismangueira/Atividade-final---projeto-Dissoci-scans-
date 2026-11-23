document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-a]");
  if (!el || el.tagName == "SELECT" || el.tagName == "INPUT") return;
  const a = el.dataset.a, v = el.dataset.v, u = me();
  if (a == "reg") {
    REG = !REG;
  } else if (a == "gf") {
    tg(GF, v);
  } else if (a == "bl") {
    tg(u.bl, v);
    save();
  } else if (a == "fv") {
    tg(u.fv, +v);
    save();
  } else if (a == "st") {
    const i = +el.dataset.i;
    u.rd = u.rd.filter((x) => x != i);
    u.dn = u.dn.filter((x) => x != i);
    if (v == "dn") u.dn.push(i);
    save();
    if (el.tagName == "A") return;
  } else if (a == "lk") {
    tg(u.lk, v);
    u.bl = u.bl.filter((x) => x != v);
    save();
  } else if (a == "ty") {
    tg(u.ty, v);
    save();
  } else if (a == "ob") {
    u.ob = 1;
    save();
    location.hash = "inicio";
  } else if (a == "pm") {
    const i = +el.dataset.i, j = i + +v;
    if (j >= 0 && j < PF.length) [PF[i], PF[j]] = [PF[j], PF[i]];
    ped();
    return;
  } else if (a == "pd") {
    PF.splice(+el.dataset.i, 1);
    ped();
    return;
  } else if (a == "clp") {
    PF = [];
    PE = null;
    ped();
    return;
  } else if (a == "ldp") {
    const [wi, n] = ($("#ecs").value || "").split("-"), w = W(wi), c = w && w.ch.find((x) => x.n == n);
    if (!c) return toast("Escolha um capítulo");
    PF = [...c.p];
    PE = { w: w.id, n: c.n };
    if (!PF.length) toast("Esse capítulo usa páginas de teste: adicione imagens");
    ped();
    return;
  } else if (a == "svp") {
    const w = PE && W(PE.w), c = w && w.ch.find((x) => x.n == PE.n);
    if (!c) return toast("Carregue um capítulo primeiro");
    c.p = [...PF];
    if (save()) {
      toast("Páginas salvas");
      PE = null;
      PF = [];
      ped();
    }
    return;
  } else if (a == "clr") {
    if (CF != v) CF = v;
    else {
      CF = "";
      if (v == "pr") u.pr = {};
      if (v == "lib") {
        u.rd = [];
        u.dn = [];
        u.fv = [];
      }
      save();
      toast("Feito");
    }
  } else if (a == "gp") {
    EP = 1;
    location.hash = "perfil";
  } else if (a == "seen") {
    u.seen = Date.now();
    save();
  } else if (a == "tkr") {
    const t = db.tk.find((x) => x.id == +v);
    if (t) t.ok = 1;
    save();
  } else if (a == "bk") {
    const o = {};
    BKEYS.forEach((k) => o[k] = u[k]);
    $("#bkt").value = JSON.stringify(o);
    return;
  } else if (a == "rs") {
    try {
      const o = JSON.parse($("#bkt").value);
      BKEYS.forEach((k) => {
        if (!(k in o) || Array.isArray(u[k]) != Array.isArray(o[k])) return;
        u[k] = o[k];
      });
      if (!["auto", "light", "dark"].includes(u.th)) u.th = "auto";
      if (!/^#[0-9a-f]{6}$/i.test(u.ac || "")) delete u.ac;
      save();
      toast("Backup restaurado");
    } catch (err) {
      toast("Backup inválido");
      return;
    }
  } else if (a == "ep") {
    EP = !EP;
  } else if (a == "pt") {
    PT = v;
  } else if (a == "np") {
    PG = Math.min(PG + 1, +v - 1);
  } else if (a == "pp") {
    PG = Math.max(PG - 1, 0);
  } else if (a == "dc") {
    db.cm[el.dataset.k].splice(+el.dataset.i, 1);
    save();
  } else if (a == "out") {
    db.me = null;
    save();
    location.hash = "inicio";
  } else if (a == "rst") {
    const n = seed();
    db.works = n.works;
    db.cm = {};
    db.users = db.users.filter((x) => x.role != "mod");
    db.users.push(n.users[0]);
    db.users.forEach((x) => {
      x.rd = [];
      x.dn = [];
      x.fv = [];
      x.pr = {};
    });
    save();
    toast("Dados restaurados");
  }
  go(a != "reg" && a != "out");
});
