function go(k){const h=location.hash.slice(1)||'inicio',u=me();let m,v;
 document.documentElement.dataset.theme=u&&u.th!='auto'?u.th:'';
 if(!u){app.innerHTML=vLogin();return}
 if(h=='inicio')v=vHome();else if(h=='buscar')v=vBuscar();else if(h=='perfil')v=vPerfil();else if(h=='config')v=vConfig();else if(h=='mod')v=vMod();
 else if(m=h.match(/^obra-(\d+)$/))v=vObra(+m[1]);else if(m=h.match(/^ler-(\d+)-(\d+(?:\.\d+)?)$/))v=vLer(+m[1],+m[2]);else v=nf();
 const N=[['inicio','🏠','Início'],['buscar','🔍','Buscar'],['perfil','📚','Biblioteca'],['config','⚙️','Config']];if(u.role=='mod')N.push(['mod','🛠','Mod']);
 app.innerHTML=`<header><a class="lg" href="#inicio">DISSOCI<span>-scans</span></a><a href="#buscar">🔍</a></header><main>${v}</main><nav>${N.map(n=>`<a href="#${n[0]}" class="${h==n[0]?'on':''}"><b>${n[1]}</b>${n[2]}</a>`).join('')}</nav>`;
 if(h=='buscar')res();if(!k)scrollTo(0,0)}
addEventListener('hashchange',()=>{PG=0;go()});
const tg=(a,v)=>{const i=a.indexOf(v);i<0?a.push(v):a.splice(i,1)};
const img=f=>new Promise(r=>{const fr=new FileReader;fr.onload=()=>{const i=new Image;i.onload=()=>{const k=Math.min(1,800/i.width),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.6))};i.onerror=()=>r(null);i.src=fr.result};fr.readAsDataURL(f)});
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el||el.tagName=='SELECT')return;const a=el.dataset.a,v=el.dataset.v,u=me();
 if(a=='reg'){REG=!REG}
 else if(a=='gf'){tg(GF,v)}
 else if(a=='bl'){tg(u.bl,v);save()}
 else if(a=='fv'){tg(u.fv,+v);save()}
 else if(a=='st'){const i=+el.dataset.i;u.rd=u.rd.filter(x=>x!=i);u.dn=u.dn.filter(x=>x!=i);if(v=='dn')u.dn.push(i);save();if(el.tagName=='A')return}
 else if(a=='pt'){PT=v}
 else if(a=='np'){PG=Math.min(PG+1,+v-1)}
 else if(a=='pp'){PG=Math.max(PG-1,0)}
 else if(a=='dc'){db.cm[el.dataset.k].splice(+el.dataset.i,1);save()}
 else if(a=='out'){db.me=null;save();location.hash='inicio'}
 else if(a=='rst'){const n=seed();db.works=n.works;db.cm={};db.users=db.users.filter(x=>x.role!='mod');db.users.push(n.users[0]);db.users.forEach(x=>{x.rd=[];x.dn=[];x.fv=[];x.pr={}});save();toast('Dados restaurados')}
 go(a!='reg'&&a!='out')});
document.addEventListener('change',e=>{const el=e.target,u=me();if(!u||!el.dataset.a)return;u[el.dataset.a]=el.value;save();go(1)});
document.addEventListener('input',e=>{if(e.target.id=='q'){Q=e.target.value;res()}});
document.addEventListener('submit',async e=>{e.preventDefault();const f=e.target,k=f.dataset.f,d=new FormData(f),u=me();
 if(k=='lg'){const em=d.get('email').trim().toLowerCase(),pw=d.get('pw');
  if(REG){if(db.users.some(x=>x.email==em))return toast('E-mail já cadastrado');db.users.push({email:em,pw,name:(d.get('name')||em.split('@')[0]).trim(),role:'user',rd:[],dn:[],fv:[],bl:[],pr:{},th:'auto',md:'v'});db.me=em}
  else{if(!db.users.some(x=>x.email==em&&x.pw==pw))return toast('E-mail ou senha incorretos');db.me=em}
  save();location.hash='inicio';return go()}
 if(k=='cm'){const key=f.dataset.k;(db.cm[key]=db.cm[key]||[]).unshift({u:u.name,e:u.email,r:u.role,x:d.get('t').trim(),t:Date.now()});save();return go(1)}
 if(u.role!='mod')return;
 if(k=='nw'){const h=Math.random()*360|0;db.works.push({id:Math.max(0,...db.works.map(w=>w.id))+1,t:d.get('t'),a:d.get('a'),ty:d.get('ty'),s:d.get('s'),d:d.get('d'),g:d.getAll('g'),c:[`hsl(${h},70%,50%)`,`hsl(${h+40},60%,18%)`],pop:0,ch:[]});if(save()){toast('Obra criada');go(1)}}
 if(k=='nc'){const w=W(d.get('w'));if(!w)return toast('Crie uma obra primeiro');const fl=[...f.f.files].sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));toast('Publicando…');
  const p=(await Promise.all(fl.map(img))).filter(Boolean),n=+d.get('n');if(w.ch.some(c=>c.n==n))return toast('Esse capítulo já existe');
  w.ch.push({n,v:+d.get('v')||0,t:d.get('t')||'Capítulo '+n,p,np:8,dt:Date.now()});w.ch.sort((a,b)=>a.n-b.n);
  if(save()){toast('Capítulo publicado');go(1)}else{w.ch=w.ch.filter(c=>c.n!=n)}}});
go();
