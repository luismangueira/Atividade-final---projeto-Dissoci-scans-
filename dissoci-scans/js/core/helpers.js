const $ = (s) => document.querySelector(s);
const app = $("#app");

const GEN = ["Ação", "Aventura", "Comédia", "Drama", "Fantasia", "Terror", "Romance", "Sci-Fi", "Slice of Life", "Esporte", "Super-herói", "Mistério"];

const E = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const fd = (t) => new Date(t).toLocaleDateString("pt-BR");

function toast(m) {
  const t = $("#t");
  t.textContent = m;
  t.style.display = "block";
  setTimeout(() => t.style.display = "none", 2500);
}

const tg = (a, v) => {
  const i = a.indexOf(v);
  i < 0 ? a.push(v) : a.splice(i, 1);
};

const img = (f, mx = 800) => new Promise((r) => {
  const fr = new FileReader();
  fr.onload = () => {
    const i = new Image();
    i.onload = () => {
      const k = Math.min(1, mx / i.width);
      const c = document.createElement("canvas");
      c.width = i.width * k;
      c.height = i.height * k;
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      r(c.toDataURL("image/jpeg", 0.6));
    };
    i.onerror = () => r(null);
    i.src = fr.result;
  };
  fr.readAsDataURL(f);
});
