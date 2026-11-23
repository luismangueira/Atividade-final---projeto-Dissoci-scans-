function vLogin() {
  return (`<form class="box" data-f="lg"><span class="lg">DISSOCI<span>-scans</span>` +
    `</span><h3>${REG ? "Criar conta" : "Entrar"}</h3>${REG ? '<input name="name" placeholder="Nome de usuário" required>' : ""}<input name="email" type="email" placeholder="E-mail" required>` +
    `<input name="pw" type="password" placeholder="Senha" minlength="4" required>` +
    `<button class="b" style="width:100%">${REG ? "Cadastrar" : "Entrar"}</button>` +
    `<p class="mu" style="text-align:center"><a data-a="reg">${REG ? "Já tenho conta" : "Criar uma conta"}</a>` +
    `</p><p class="mu" style="text-align:center;font-size:12px">Moderador de teste: mod@dissoci.com / mod123</p></form>`);
}
