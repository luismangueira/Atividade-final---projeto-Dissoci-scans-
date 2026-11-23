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
