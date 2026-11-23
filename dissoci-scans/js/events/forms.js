document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target;
  const k = f.dataset.f;
  const d = new FormData(f);
  const u = me();
  // Entrada e cadastro.
  if (k == "lg") {
    const em = d.get("email").trim().toLowerCase();
    const pw = d.get("pw");
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
  // Conta, suporte e perfil.
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
    Object.values(db.rt).forEach((o) => delete o[u.email]);
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
    const em = d.get("email").trim().toLowerCase();
    const old = u.email;
    if (em != old && db.users.some((x) => x.email == em)) return toast("E-mail já cadastrado");
    const nm = d.get("name").trim() || u.name;
    const fl = f.f.files[0];
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
    Object.values(db.rt).forEach((o) => {
      if (old in o) {
        o[em] = o[old];
        delete o[old];
      }
    });
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
  // Comentários de obras e capítulos.
  if (k == "cm") {
    const key = f.dataset.k;
    (db.cm[key] = db.cm[key] || []).unshift({ u: u.name, e: u.email, r: u.role, x: d.get("t").trim(), t: Date.now() });
    save();
    return go(1);
  }
  // Formulários exclusivos da moderação.
  if (u.role != "mod") return;
  if (k == "cv") {
    const w = W(d.get("w"));
    const fl = f.f.files[0];
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
    const p = [...PF];
    const n = +d.get("n");
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
