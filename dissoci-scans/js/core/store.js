function seed() {
  return {
    v: 2,
    works: [],
    users: [{ email: "mod@dissoci.com", pw: "mod123", name: "Moderador", role: "mod", lk: [], ty: [], ob: 0, rd: [], dn: [], fv: [], bl: [], pr: {}, th: "auto", md: "v" }],
    cm: {},
    me: null
  };
}

let db;

try {
  db = JSON.parse(localStorage.getItem("dsc"));
} catch (e) {
}

if (!db) db = seed();

db.users.forEach((x) => {
  x.lk = x.lk || [];
  x.ty = x.ty || [];
  x.seen = x.seen || Date.now();
});

db.tk = db.tk || [];

const batmanAbsoluto = () => ({
  sl: "batman-absoluto",
  id: Math.max(0, ...db.works.map((w) => w.id)) + 1,
  t: "Batman Absoluto",
  a: "Scott Snyder, Nick Dragotta",
  rt: "Scott Snyder",
  ar: "Nick Dragotta",
  ed: "DC Comics",
  pb: "9 de outubro de 2024",
  ty: "HQ",
  g: ["Ação", "Super-herói", "Mistério"],
  s: "Em lançamento",
  d: "Nesta estreia, o Cavaleiro das Trevas surge em uma realidade que muda as condições de sua origem. Bruce Wayne não conta com o dinheiro nem com os recursos normalmente associados ao personagem. Ainda assim, decide agir quando Gotham precisa de alguém disposto a enfrentar suas ameaças. A cidade e o herói são apresentados sob uma perspectiva mais dura, que estabelece o tom da nova série.\n\nA edição abre espaço para descobrir como esse Batman se prepara, quais limites estabelece para si e de que forma sua trajetória difere da versão mais conhecida. O primeiro capítulo funciona como ponto de entrada para novos leitores: apresenta o protagonista e o cenário sem exigir a leitura prévia das histórias tradicionais do personagem.",
  c: ["#111114", "#c9a227"],
  pop: 30,
  ch: [{ n: 1, v: 1, t: "Edição #1 (2024)", p: [], np: 8, dt: Date.UTC(2024, 9, 9) }]
});

if (!db.works.some((w) => w.sl == "batman-absoluto")) db.works.push(batmanAbsoluto());

if (!db.v) {
  db.v = 2;
  db.works = [];
  db.cm = {};
  db.users.forEach((x) => {
    x.rd = [];
    x.dn = [];
    x.fv = [];
    x.pr = {};
  });
}

const save = () => {
  try {
    localStorage.setItem("dsc", JSON.stringify(db));
    return 1;
  } catch (e) {
    toast("Armazenamento cheio: use imagens menores");
    return 0;
  }
};

const me = () => db.users.find((u) => u.email == db.me), W = (id) => db.works.find((w) => w.id == id);
