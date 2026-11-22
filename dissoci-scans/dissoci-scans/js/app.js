function go(k) {
  let h = location.hash.slice(1) || "inicio";
  const u = me();
  let m, v;
  document.documentElement.dataset.theme = u && u.th != "auto" ? u.th : "";
  const R = document.documentElement.style;
  R.setProperty("--ac", u && /^#[0-9a-f]{6}$/i.test(u.ac || "") ? u.ac : "#e5202e");
  R.setProperty("--pw", u && u.wd == 1 ? "900px" : "600px");
  document.body.style.fontSize = [14, 15, 17][u && u.fs != null ? +u.fs : 1] + "px";
  if (!u) {
    app.innerHTML = vLogin();
    return;
  }
  if (!u.ob) h = "gostos";
  if (h == "gostos") {
    app.innerHTML = `<main>${vGostos()}</main>`;
    if (!k) scrollTo(0, 0);
    return;
  }
  if (h == "inicio") v = vHome();
  else if (h == "buscar") v = vBuscar();
  else if (h == "perfil") v = vPerfil();
  else if (h == "config") v = vConfig();
  else if (h == "mod") v = vMod();
  else if (m = h.match(/^obra-(\d+)$/)) v = vObra(+m[1]);
  else if (m = h.match(/^ler-(\d+)-(\d+(?:\.\d+)?)$/)) v = vLer(+m[1], +m[2]);
  else v = nf();
  const N = [["inicio", "🏠", "Início"], ["buscar", "🔍", "Buscar"], ["perfil", "📚", "Biblioteca"], ["config", "⚙️", "Config"]];
  if (u.role == "mod") N.push(["mod", "🛠", "Mod"]);
  app.innerHTML = `<header><a class="lg" href="#inicio">DISSOCI<span>-scans</span></a><a href="#buscar">🔍</a></header><main>${v}</main><nav>${N.map((n) => `<a href="#${n[0]}" class="${h == n[0] ? "on" : ""}"><b>${n[1]}</b>${n[2]}</a>`).join("")}</nav>`;
  if (h == "buscar") res();
  if (!k) scrollTo(0, 0);
}
addEventListener("hashchange", () => {
  PG = 0;
  go();
});
const tg = (a, v) => {
  const i = a.indexOf(v);
  i < 0 ? a.push(v) : a.splice(i, 1);
};
const BKEYS = ["name", "bio", "col", "lk", "ty", "bl", "rd", "dn", "fv", "pr", "th", "md", "fs", "wd", "ac", "nt", "ff", "co"];
const img = (f, mx = 800) => new Promise((r) => {
  const fr = new FileReader();
  fr.onload = () => {
    const i = new Image();
    i.onload = () => {
      const k = Math.min(1, mx / i.width), c = document.createElement("canvas");
      c.width = i.width * k;
      c.height = i.height * k;
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      r(c.toDataURL("image/jpeg", 0.6));
    };
    i.onerror = () => r(null);
    i.src = fr.result;
  };
  fr.readAsDataURL(f);
});
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
const ped = () => {
  const e = $("#ped");
  if (e) e.innerHTML = pgEd();
};
document.addEventListener("change", (e) => {
  const el = e.target, u = me();
  if (!u || !el.dataset.a) return;
  if (el.dataset.a == "addp") {
    Promise.all([...el.files].sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true })).map((x) => img(x))).then((r) => {
      PF.push(...r.filter(Boolean));
      el.value = "";
      ped();
    });
    return;
  }
  u[el.dataset.a] = el.type == "checkbox" ? (el.checked ? 1 : 0) : el.value;
  save();
  go(1);
});
document.addEventListener("input", (e) => {
  if (e.target.id == "q") {
    Q = e.target.value;
    res();
  }
});
document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target, k = f.dataset.f, d = new FormData(f), u = me();
  if (k == "lg") {
    const em = d.get("email").trim().toLowerCase(), pw = d.get("pw");
    if (REG) {
      if (db.users.some((x) => x.email == em)) return toast("E-mail já cadastrado");
      db.users.push({ email: em, pw, name: (d.get("name") || em.split("@")[0]).trim(), role: "user", seen: Date.now(), lk: [], ty: [], ob: 0, rd: [], dn: [], fv: [], bl: [], pr: {}, th: "auto", md: "v" });
      db.me = em;
    } else {
      if (!db.users.some((x) => x.email == em && x.pw == pw)) return toast("E-mail ou senha incorretos");
      db.me = em;
    }
    save();
    location.hash = "inicio";
    return go();
  }
  if (k == "pw") {
    if (u.pw != d.get("cur")) return toast("Senha atual incorreta");
    if (d.get("nw") != d.get("cf")) return toast("As senhas não coincidem");
    u.pw = d.get("nw");
    save();
    f.reset();
    return toast("Senha alterada");
  }
  if (k == "del") {
    if (u.pw != d.get("pw")) return toast("Senha incorreta");
    if (u.role == "mod" && db.users.filter((x) => x.role == "mod").length == 1) return toast("Você é o único moderador e não pode excluir a conta");
    db.users = db.users.filter((x) => x != u);
    Object.keys(db.cm).forEach((c) => db.cm[c] = db.cm[c].filter((m) => m.e != u.email));
    db.tk = db.tk.filter((t) => t.e != u.email);
    db.me = null;
    save();
    location.hash = "inicio";
    return go();
  }
  if (k == "tk") {
    db.tk.unshift({ id: Date.now(), e: u.email, u: u.name, s: d.get("s"), x: d.get("x").trim(), t: Date.now(), ok: 0 });
    save();
    toast("Chamado enviado");
    return go(1);
  }
  if (k == "pf") {
    const em = d.get("email").trim().toLowerCase(), old = u.email;
    if (em != old && db.users.some((x) => x.email == em)) return toast("E-mail já cadastrado");
    const nm = d.get("name").trim() || u.name, fl = f.f.files[0];
    if (fl) {
      const s = await img(fl, 200);
      if (s) u.av = s;
    } else if (d.get("rm")) delete u.av;
    u.name = nm;
    u.bio = d.get("bio").trim();
    u.col = d.get("col");
    if (d.get("pw")) u.pw = d.get("pw");
    if (em != old) {
      u.email = em;
      db.me = em;
    }
    Object.values(db.cm).flat().forEach((c) => {
      if (c.e == old) {
        c.e = em;
        c.u = nm;
      }
    });
    if (save()) {
      EP = 0;
      toast("Perfil atualizado");
      go(1);
    }
    return;
  }
  if (k == "cm") {
    const key = f.dataset.k;
    (db.cm[key] = db.cm[key] || []).unshift({ u: u.name, e: u.email, r: u.role, x: d.get("t").trim(), t: Date.now() });
    save();
    return go(1);
  }
  if (u.role != "mod") return;
  if (k == "cv") {
    const w = W(d.get("w")), fl = f.f.files[0];
    if (!w) return toast("Crie uma obra primeiro");
    if (d.get("rm")) delete w.img;
    else if (fl) {
      const s = await img(fl, 400);
      if (s) w.img = s;
    } else return toast("Escolha uma imagem");
    if (save()) {
      toast("Capa atualizada");
      go(1);
    }
    return;
  }
  if (k == "nw") {
    const h = Math.random() * 360 | 0;
    db.works.push({ id: Math.max(0, ...db.works.map((w) => w.id)) + 1, t: d.get("t"), a: d.get("a"), ty: d.get("ty"), s: d.get("s"), d: d.get("d"), rt: d.get("rt"), ar: d.get("ar"), ed: d.get("ed"), pb: d.get("pb"), g: d.getAll("g"), c: [`hsl(${h},70%,50%)`, `hsl(${h + 40},60%,18%)`], pop: 0, ch: [] });
    if (save()) {
      toast("Obra criada");
      go(1);
    }
  }
  if (k == "nc") {
    const w = W(d.get("w"));
    if (!w) return toast("Crie uma obra primeiro");
    if (PE) return toast("Limpe o editor: ele está editando um capítulo já publicado");
    toast("Publicando…");
    const p = [...PF], n = +d.get("n");
    if (w.ch.some((c) => c.n == n)) return toast("Esse capítulo já existe");
    w.ch.push({ n, v: +d.get("v") || 0, t: d.get("t") || "Capítulo " + n, p, np: 8, dt: Date.now() });
    w.ch.sort((a, b) => a.n - b.n);
    if (save()) {
      toast("Capítulo publicado");
      PF = [];
      PE = null;
      go(1);
    } else {
      w.ch = w.ch.filter((c) => c.n != n);
    }
  }
});
go();
