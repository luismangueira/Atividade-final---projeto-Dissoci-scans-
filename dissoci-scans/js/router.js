function go(manterRolagem) {
  let rota = location.hash.slice(1) || "inicio";
  const usuario = me();
  let parametros;
  let conteudo;
  document.documentElement.dataset.theme = usuario && usuario.th != "auto" ? usuario.th : "";
  const estiloRaiz = document.documentElement.style;
  estiloRaiz.setProperty("--ac", usuario && /^#[0-9a-f]{6}$/i.test(usuario.ac || "") ? usuario.ac : "#e5202e");
  estiloRaiz.setProperty("--pw", usuario && usuario.wd == 1 ? "900px" : "600px");
  document.body.style.fontSize = [14, 15, 17][usuario && usuario.fs != null ? +usuario.fs : 1] + "px";
  // Antes de liberar o menu, o leitor entra e escolhe suas preferências.
  if (!usuario) {
    app.innerHTML = vLogin();
    return;
  }
  if (!usuario.ob) rota = "gostos";
  if (rota == "gostos") {
    app.innerHTML = `<main>${vGostos()}</main>`;
    if (!manterRolagem) scrollTo(0, 0);
    return;
  }
  // O endereço após # indica a tela a exibir.
  if (rota == "inicio") conteudo = vHome();
  else if (rota == "buscar") conteudo = vBuscar();
  else if (rota == "perfil") conteudo = vPerfil();
  else if (rota == "config") conteudo = vConfig();
  else if (rota == "mod") conteudo = vMod();
  else if (parametros = rota.match(/^obra-(\d+)$/)) conteudo = vObra(+parametros[1]);
  else if (parametros = rota.match(/^ler-(\d+)-(\d+(?:\.\d+)?)$/)) conteudo = vLer(+parametros[1], +parametros[2]);
  else conteudo = nf();
  const itensDoMenu = [["inicio", "🏠", "Início"], ["buscar", "🔍", "Buscar"], ["perfil", "📚", "Biblioteca"], ["config", "⚙️", "Config"]];
  if (usuario.role == "mod") itensDoMenu.push(["mod", "🛠", "Mod"]);
  app.innerHTML = (`<header><a class="lg" href="#inicio">DISSOCI<span>-scans</span>` +
    `</a><a href="#buscar">🔍</a></header><main>${conteudo}</main>` +
    `<nav>${itensDoMenu.map((item) => `<a href="#${item[0]}" class="${rota == item[0] ? "on" : ""}"><b>${item[1]}</b>${item[2]}</a>`).join("")}</nav>`);
  if (rota == "buscar") res();
  if (!manterRolagem) scrollTo(0, 0);
}

addEventListener("hashchange", () => {
  PG = 0;
  go();
});
