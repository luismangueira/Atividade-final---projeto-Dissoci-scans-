const ped = () => {
  const e = $("#ped");
  if (e) e.innerHTML = pgEd();
};

document.addEventListener("change", (e) => {
  const el = e.target;
  const u = me();
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
