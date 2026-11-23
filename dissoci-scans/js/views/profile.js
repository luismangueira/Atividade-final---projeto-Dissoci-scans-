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
