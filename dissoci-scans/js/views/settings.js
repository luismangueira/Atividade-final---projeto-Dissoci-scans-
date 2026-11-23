const ACS = [["#e5202e", "Vermelho"], ["#2f6fed", "Azul"], ["#1f9d63", "Verde"], ["#8e44ad", "Roxo"], ["#f08c00", "Laranja"]];

const FAQ = [
  ["Como funcionam as recomendações?", "Usamos os gêneros e formatos que você escolheu em Meus gostos, mais o que você favoritou ou já leu. Gêneros bloqueados nunca aparecem nas recomendações."],
  ["Como sigo uma obra?", "Abra a obra e toque em Favoritar. Obras que você está lendo ou favoritou geram aviso quando saem capítulos novos."],
  ["Esqueci minha senha. E agora?", "Se você ainda está logado, troque a senha em Config > Conta e segurança. Se não está, abra um chamado pela tela de um moderador ou peça a ele a ajuda com a conta."],
  ["Onde ficam meus dados?", "Neste navegador (localStorage). Use Gerar backup em Config > Seus dados para guardar uma cópia e restaurá-la em outro lugar."],
  ["Como os moderadores publicam capítulos?", "Pela aba Mod: escolha a obra, informe número, volume e as imagens das páginas, que são ordenadas pelo nome do arquivo."],
  ["Vi um erro ou conteúdo indevido.", "Envie um chamado em Suporte abaixo, escolhendo o assunto e descrevendo o que aconteceu. Um moderador responde na lista de chamados."]
];

const opt = (list, cur) => list.map((o) => `<option value="${o[0]}" ${String(cur) == String(o[0]) ? "selected" : ""}>${o[1]}</option>`).join("");

function vConfig() {
  const u = me(), tk = (db.tk || []).filter((t) => t.e == u.email);
  const clr = (k, label) => `<button class="b o" data-a="clr" data-v="${k}">${CF == k ? "Clique de novo para confirmar" : label}</button>`;
  return `<div class="p">
  <h3>Aparência</h3>
  <label>Tema<select data-a="th">${opt([["auto", "Automático"], ["light", "Claro"], ["dark", "Escuro"]], u.th)}</select></label>
  <label>Tamanho do texto<select data-a="fs">${opt([[0, "Pequeno"], [1, "Médio"], [2, "Grande"]], u.fs == null ? 1 : u.fs)}</select></label>
  <label>Cor de destaque<select data-a="ac">${opt(ACS, u.ac || ACS[0][0])}</select></label>
  <h3 style="margin-top:24px">Leitura</h3>
  <label>Modo de leitura<select data-a="md">${opt([["v", "Rolagem vertical"], ["p", "Página por página"]], u.md)}</select></label>
  <label>Largura das páginas<select data-a="wd">${opt([[0, "Padrão"], [1, "Ampla"]], u.wd || 0)}</select></label>
  <label>Lista de capítulos<select data-a="co">${opt([[0, "Mais recentes primeiro"], [1, "Do primeiro ao último"]], u.co || 0)}</select></label>
  <h3 style="margin-top:24px">Conteúdo e recomendações</h3>
  <label>Formato preferido<select data-a="ff">${opt([["", "Mangás e HQs"], ["Mangá", "Só mangás"], ["HQ", "Só HQs"]], u.ff || "")}</select></label>
  <p class="mu" style="margin-bottom:0">Não recomendar estes gêneros</p><div class="ch">${chips(GEN, "bl", u.bl)}</div>
  <p class="mu" style="margin-bottom:0">Meus gostos: ${u.lk.length ? u.lk.join(", ") : "nenhum gênero escolhido"}</p>
  <a class="b o" href="#gostos">Editar gostos</a>
  <h3 style="margin-top:24px">Notificações</h3>
  <label class="chip"><input type="checkbox" data-a="nt" ${u.nt !== 0 ? "checked" : ""}>Avisar sobre novos capítulos das obras que sigo</label>
  <h3 style="margin-top:24px">Conta e segurança</h3>
  <p class="mu" style="margin:0">${E(u.name)} · ${E(u.email)}</p>
  <button class="b o" data-a="gp">Editar perfil</button>
  <form data-f="pw"><h4 style="margin:14px 0 0">Alterar senha</h4>
    <input name="cur" type="password" placeholder="Senha atual" required>
    <input name="nw" type="password" placeholder="Nova senha" minlength="4" required>
    <input name="cf" type="password" placeholder="Confirmar nova senha" required>
    <button class="b">Alterar senha</button></form>
  <button class="b o" data-a="out">Sair</button>
  <h3 style="margin-top:24px">Seus dados</h3>
  <p class="mu" style="margin:0">Gere um backup das suas listas e preferências, ou cole um backup para restaurar.</p>
  <textarea id="bkt" rows="4" placeholder="O backup aparece aqui. Para restaurar, cole um backup e toque em Restaurar."></textarea>
  <button class="b o" data-a="bk">Gerar backup</button><button class="b o" data-a="rs">Restaurar</button><br>
  ${clr("pr", "Limpar progresso de leitura")}${clr("lib", "Limpar biblioteca")}
  <form data-f="del"><h4 style="margin:14px 0 0">Excluir conta</h4><p class="mu" style="margin:0">Remove sua conta, seus comentários e seus chamados. Não dá para desfazer.</p>
    <input name="pw" type="password" placeholder="Digite sua senha para confirmar" required>
    <button class="b dg">Excluir minha conta</button></form>
  <h3 style="margin-top:24px">Suporte</h3>
  ${FAQ.map((f) => `<details><summary>${f[0]}</summary><p class="mu">${f[1]}</p></details>`).join("")}
  <form data-f="tk"><h4 style="margin:14px 0 0">Abrir um chamado</h4>
    <select name="s"><option>Problema técnico</option><option>Conteúdo indevido</option><option>Problema na conta</option><option>Sugestão</option></select>
    <textarea name="x" required maxlength="500" placeholder="Descreva o que aconteceu"></textarea>
    <button class="b">Enviar chamado</button></form>
  ${tk.map((t) => `<div class="c"><b>${E(t.s)}</b> <small>${fd(t.t)} · ${t.ok ? "Resolvido" : "Aberto"}</small><p>${E(t.x)}</p></div>`).join("")}
  <p class="mu" style="text-align:center;margin-top:28px;font-size:12px">Dissoci-scans · versão 1.0 · © luis mangueira</p></div>`;
}

const BKEYS = ["name", "bio", "col", "lk", "ty", "bl", "rd", "dn", "fv", "pr", "th", "md", "fs", "wd", "ac", "nt", "ff", "co"];
