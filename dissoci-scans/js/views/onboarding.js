function vGostos() {
  const u = me();
  return `<div class="box" style="margin:6vh auto"><span class="lg">DISSOCI<span>-scans</span></span><h3>Quais são os seus gostos?</h3><p class="mu">Escolha os gêneros e formatos que você curte. Usamos isso para montar as suas recomendações. Você pode mudar depois em Config.</p><b>Gêneros</b><div class="ch">${chips(GEN, "lk", u.lk)}</div><b>Formatos</b><div class="ch">${chips(["Mangá", "HQ"], "ty", u.ty)}</div><button class="b" style="width:100%" data-a="ob">${u.lk.length || u.ty.length ? "Salvar e continuar" : "Pular por enquanto"}</button></div>`;
}
