function cmts(k) {
  const u = me();
  const l = db.cm[k] || [];
  return (`<section class="cm"><h3>Comentários (${l.length})</h3>` +
    `<form data-f="cm" data-k="${k}"><textarea name="t" required maxlength="500" placeholder="Escreva um comentário">` +
    `</textarea><button class="b">Comentar</button></form>${l.map((c, i) => (`<div class="c"><b>${E(c.u)}</b>${c.r == "mod" ? ' <i class="bg">MOD</i>' : ""} <small>${fd(c.t)}</small>` +
    `<p>${E(c.x)}</p>${u.role == "mod" || c.e == u.email ? `<a data-a="dc" data-k="${k}" data-i="${i}">excluir</a>` : ""}</div>`)).join("")}</section>`);
}
