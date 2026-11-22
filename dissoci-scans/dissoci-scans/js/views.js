const cover = (w) => `<div class="cv" style="background:${w.img ? `url(${w.img}) center/cover` : `linear-gradient(160deg,${w.c[0]},${w.c[1]})`}">${w.img ? "" : E(w.t)}</div>`;
const card = (w) => `<a class="cd" href="#obra-${w.id}">${cover(w)}<small>${E(w.t)}</small></a>`;
const last = (w) => Math.max(...w.ch.map((c) => c.dt), 0);
const chips = (l, a, s) => l.map((g) => `<span class="chip ${s.includes(g) ? "on" : ""}" data-a="${a}" data-v="${E(g)}">${E(g)}</span>`).join("");
function vLogin() {
  return `<form class="box" data-f="lg"><span class="lg">DISSOCI<span>-scans</span></span><h3>${REG ? "Criar conta" : "Entrar"}</h3>${REG ? '<input name="name" placeholder="Nome de usuário" required>' : ""}<input name="email" type="email" placeholder="E-mail" required><input name="pw" type="password" placeholder="Senha" minlength="4" required><button class="b" style="width:100%">${REG ? "Cadastrar" : "Entrar"}</button><p class="mu" style="text-align:center"><a data-a="reg">${REG ? "Já tenho conta" : "Criar uma conta"}</a></p><p class="mu" style="text-align:center;font-size:12px">Moderador de teste: mod@dissoci.com / mod123</p></form>`;
}
function vHome() {
  const u = me();
  if (!db.works.length) return EMPTY;
  const H = db.works.filter((w) => !w.g.some((g) => u.bl.includes(g)) && (!u.ff || w.ty == u.ff));
  const fg = new Set(db.works.filter((w) => u.fv.includes(w.id) || u.dn.includes(w.id)).flatMap((w) => w.g)), sc = (w) => w.g.filter((g) => u.lk.includes(g)).length * 2 + w.g.filter((g) => fg.has(g)).length + (u.ty.includes(w.ty) ? 1 : 0);
  const up = [...H].sort((a, b) => last(b) - last(a)), rec = H.filter((w) => !u.rd.includes(w.id) && !u.dn.includes(w.id)).sort((a, b) => sc(b) - sc(a)), rk = [...H].sort((a, b) => b.pop + db.users.filter((x) => x.fv.includes(b.id)).length * 5 - a.pop - db.users.filter((x) => x.fv.includes(a.id)).length * 5).slice(0, 5), cont = u.rd.map(W).filter(Boolean);
  const f = up[0];
  const nw = u.nt !== 0 ? db.works.filter((w) => (u.rd.includes(w.id) || u.fv.includes(w.id)) && w.ch.some((c) => c.dt > (u.seen || 0))) : [];
  const bn = nw.length ? `<div class="p" style="padding-bottom:0"><div style="background:var(--cd);border:1px solid var(--bd);border-radius:10px;padding:12px"><b>🔔 Novos capítulos</b>${nw.map((w) => `<a class="li" style="padding:8px 0" href="#obra-${w.id}"><span>${E(w.t)}</span><small>${w.ch.filter((c) => c.dt > (u.seen || 0)).length} novo(s)</small></a>`).join("")}<button class="b o" data-a="seen">Marcar como vistas</button></div></div>` : "";
  return bn + (f ? `<div class="hero" style="margin-top:16px;background:linear-gradient(160deg,${f.c[0]},${f.c[1]})"><small style="color:#fffc">NOVO CAPÍTULO · ${f.ty}</small><h1>${E(f.t)}</h1><p>${E(f.d.split("\n")[0])}</p><a class="b" style="background:#fff;color:#000;text-shadow:none" href="#obra-${f.id}">Ver obra</a></div>` : "") + (cont.length ? `<h2>Continuar lendo</h2><div class="row">${cont.map(card).join("")}</div>` : "") + `<h2>Atualizados recentemente</h2><div class="row">${up.map(card).join("")}</div><h2>Recomendados para você</h2><div class="row">${rec.map(card).join("") || '<p class="mu">Nada por aqui ainda.</p>'}</div><h2>Ranking</h2>${rk.map((w, i) => `<a class="rk" href="#obra-${w.id}"><i>${i + 1}</i>${cover({ ...w, t: "" })}<div><b>${E(w.t)}</b><br><small>${E(w.a)} · ${w.g.join(", ")}</small></div></a>`).join("")}<p class="mu" style="text-align:center;margin-top:30px;font-size:12px">© luis mangueira · Dissoci-scans</p>`;
}
function vBuscar() {
  return `<div class="p"><input id="q" type="search" placeholder="Buscar título, autor ou gênero" value="${E(Q)}"><div class="ch">${chips(GEN, "gf", GF)}</div><div id="res" class="grid"></div></div>`;
}
function res() {
  const q = Q.toLowerCase(), r = db.works.filter((w) => (!q || (w.t + w.a + (w.ed || "") + w.g.join()).toLowerCase().includes(q)) && GF.every((g) => w.g.includes(g)));
  $("#res").innerHTML = r.map(card).join("") || (db.works.length ? '<p class="mu">Nada encontrado.</p>' : EMPTY);
}
function cmts(k) {
  const u = me(), l = db.cm[k] || [];
  return `<section class="cm"><h3>Comentários (${l.length})</h3><form data-f="cm" data-k="${k}"><textarea name="t" required maxlength="500" placeholder="Escreva um comentário"></textarea><button class="b">Comentar</button></form>${l.map((c, i) => `<div class="c"><b>${E(c.u)}</b>${c.r == "mod" ? ' <i class="bg">MOD</i>' : ""} <small>${fd(c.t)}</small><p>${E(c.x)}</p>${u.role == "mod" || c.e == u.email ? `<a data-a="dc" data-k="${k}" data-i="${i}">excluir</a>` : ""}</div>`).join("")}</section>`;
}
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
function vPerfil() {
  const u = me(), l = u[PT].map(W).filter(Boolean);
  const av = u.av
    ? `<img class="av" src="${u.av}" alt="">`
    : `<div class="av" style="background:${u.col || "var(--ac)"}">${E(u.name[0] || "?").toUpperCase()}</div>`;
  const head = `<div class="p top" style="align-items:center">${av}<div><h2 style="margin:0">${E(u.name)} ${u.role == "mod" ? '<i class="bg">MOD</i>' : ""}</h2><small>${E(u.email)}</small><br><small>${u.rd.length} lendo · ${u.dn.length} lidos · ${u.fv.length} favoritos</small>${u.bio ? `<p style="margin:6px 0 0">${E(u.bio)}</p>` : ""}</div></div>`;
  const edit = EP
    ? `<form class="p" data-f="pf" style="padding-top:0"><h3>Editar perfil</h3>
      <label class="mu">Foto de perfil<input name="f" type="file" accept="image/*"></label>
      ${u.av ? '<label class="chip"><input type="checkbox" name="rm">Remover foto atual</label>' : ""}
      <label class="mu">Cor do avatar<input name="col" type="color" value="${u.col || "#e5202e"}" style="height:44px;padding:4px"></label>
      <label class="mu">Nome<input name="name" value="${E(u.name)}" maxlength="30" required></label>
      <label class="mu">Bio<textarea name="bio" maxlength="160" placeholder="Fale um pouco sobre você">${E(u.bio || "")}</textarea></label>
      <label class="mu">E-mail<input name="email" type="email" value="${E(u.email)}" required></label>
      <label class="mu">Nova senha (deixe em branco para manter)<input name="pw" type="password" minlength="4"></label>
      <button class="b">Salvar</button><button type="button" class="b o" data-a="ep">Cancelar</button></form>`
    : `<div class="p" style="padding-top:0"><button class="b o" data-a="ep">Editar perfil</button></div>`;
  return head + edit + `<div class="tabs">${[["rd", "Lendo"], ["dn", "Lidos"], ["fv", "Favoritos"]].map((t) => `<a class="${PT == t[0] ? "on" : ""}" data-a="pt" data-v="${t[0]}">${t[1]}</a>`).join("")}</div><div class="p grid">${l.map(card).join("") || '<p class="mu">Nada aqui ainda.</p>'}</div>`;
}
function vGostos() {
  const u = me();
  return `<div class="box" style="margin:6vh auto"><span class="lg">DISSOCI<span>-scans</span></span><h3>Quais são os seus gostos?</h3><p class="mu">Escolha os gêneros e formatos que você curte. Usamos isso para montar as suas recomendações. Você pode mudar depois em Config.</p><b>Gêneros</b><div class="ch">${chips(GEN, "lk", u.lk)}</div><b>Formatos</b><div class="ch">${chips(["Mangá", "HQ"], "ty", u.ty)}</div><button class="b" style="width:100%" data-a="ob">${u.lk.length || u.ty.length ? "Salvar e continuar" : "Pular por enquanto"}</button></div>`;
}
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
function pgEd() {
  const w = PE && W(PE.w), st = w ? `Editando: ${E(w.t)} — Cap. ${PE.n}` : "Novo capítulo (ainda não publicado)";
  return `<small class="mu" style="display:block;margin:6px 0">${st} · ${PF.length} página(s)</small><div class="grid">${PF.map((s, i) => `<div><img src="${s}" alt="Página ${i + 1}" style="width:100%;border-radius:6px;display:block"><div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px"><small>${i + 1}</small><span class="ct"><a data-a="pm" data-i="${i}" data-v="-1">‹</a><a data-a="pm" data-i="${i}" data-v="1">›</a><a data-a="pd" data-i="${i}">✕</a></span></div></div>`).join("")}</div><div style="margin-top:8px"><button class="b o" data-a="clp">Limpar</button>${w ? '<button class="b" data-a="svp">Salvar alterações no capítulo</button>' : ""}</div>`;
}
function vMod() {
  const u = me();
  if (u.role != "mod") return '<p class="p mu">Acesso restrito a moderadores.</p>';
  const tks = (db.tk || []).filter((t) => !t.ok).map((t) => `<div class="c"><b>${E(t.u)}</b> <small>${E(t.s)} · ${fd(t.t)} · ${E(t.e)}</small><p>${E(t.x)}</p><a data-a="tkr" data-v="${t.id}">marcar como resolvido</a></div>`).join("") || '<p class="mu">Nenhum chamado aberto.</p>';
  return `<div class="p"><p class="mu" style="margin-top:0">Publique apenas conteúdo que você tem direito de distribuir.</p><h3>Páginas do capítulo</h3><div style="display:flex;gap:6px"><select id="ecs">${db.works.flatMap((w) => w.ch.map((c) => `<option value="${w.id}-${c.n}">${E(w.t)} — Cap. ${c.n}</option>`)).join("") || "<option value=''>Nenhum capítulo publicado</option>"}</select><button class="b o" data-a="ldp" style="white-space:nowrap">Carregar</button></div><label class="mu">Adicionar imagens (ordenadas pelo nome do arquivo)<input type="file" accept="image/*" multiple data-a="addp"></label><div id="ped">${pgEd()}</div><h3 style="margin-top:24px">Publicar novo capítulo / volume</h3><form data-f="nc"><select name="w">${db.works.map((w) => `<option value="${w.id}">${E(w.t)}</option>`).join("")}</select><input name="n" type="number" step="any" min="0" placeholder="Nº do capítulo" required><input name="v" type="number" min="0" placeholder="Nº do volume (opcional)"><input name="t" placeholder="Título do capítulo"><p class="mu" style="margin:6px 0">As páginas são as do editor acima, na ordem mostrada. Sem imagens, o capítulo usa páginas de teste.</p><button class="b">Publicar capítulo</button></form>
 <h3 style="margin-top:28px">Capa da obra</h3><form data-f="cv"><select name="w">${db.works.map((w) => `<option value="${w.id}">${E(w.t)}</option>`).join("")}</select><label class="mu">Imagem da capa<input name="f" type="file" accept="image/*"></label><label class="chip"><input type="checkbox" name="rm">Remover capa atual (voltar ao gradiente)</label><br><button class="b">Salvar capa</button></form><h3 style="margin-top:28px">Nova obra</h3><form data-f="nw"><input name="t" placeholder="Título" required><input name="a" placeholder="Autor" required><input name="rt" placeholder="Roteirista"><input name="ar" placeholder="Artista"><input name="ed" placeholder="Editora"><input name="pb" placeholder="Publicação original (ex.: 9 de outubro de 2024)"><select name="ty"><option>Mangá</option><option>HQ</option></select><select name="s"><option>Em lançamento</option><option>Completo</option><option>Hiato</option></select><textarea name="d" placeholder="Sinopse"></textarea><div class="ch">${GEN.map((g) => `<label class="chip"><input type="checkbox" name="g" value="${g}">${g}</label>`).join("")}</div><button class="b">Criar obra</button></form><h3 style="margin-top:28px">Chamados de suporte</h3>${tks}</div>`;
}
const EMPTY = '<div class="p" style="text-align:center;margin-top:20vh"><h2 style="margin:0">Adicionando novas histórias</h2><p class="mu">Volte em breve!</p></div>';
const nf = () => '<p class="p mu">Página não encontrada.</p>';
