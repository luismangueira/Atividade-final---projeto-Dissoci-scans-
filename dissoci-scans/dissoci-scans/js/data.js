const $=s=>document.querySelector(s),app=$('#app');
const GEN=['Ação','Aventura','Comédia','Drama','Fantasia','Terror','Romance','Sci-Fi','Slice of Life','Esporte','Super-herói','Mistério'];
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fd=t=>new Date(t).toLocaleDateString('pt-BR');
function toast(m){const t=$('#t');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',2500)}
function seed(){
 return{v:2,works:[],
 users:[{email:'mod@dissoci.com',pw:'mod123',name:'Moderador',role:'mod',rd:[],dn:[],fv:[],bl:[],pr:{},th:'auto',md:'v'}],cm:{},me:null}}
let db;try{db=JSON.parse(localStorage.getItem('dsc'))}catch(e){}
if(!db)db=seed();
if(!db.v){db.v=2;db.works=[];db.cm={};db.users.forEach(x=>{x.rd=[];x.dn=[];x.fv=[];x.pr={}})}
const save=()=>{try{localStorage.setItem('dsc',JSON.stringify(db));return 1}catch(e){toast('Armazenamento cheio: use imagens menores');return 0}};
const me=()=>db.users.find(u=>u.email==db.me),W=id=>db.works.find(w=>w.id==id);
let REG=0,Q='',GF=[],PT='rd',PG=0;
