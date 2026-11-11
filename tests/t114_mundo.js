const {chromium}=require('playwright');const fs=require('fs');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=null;window.claude={use:async(k)=>k==='downloads'?{save:async(o)=>{window.__saved={name:o.filename,len:o.data.length}}}:null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(600);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};
 const cv=document.createElement('canvas');cv.width=120;cv.height=160;const g=cv.getContext('2d');g.fillStyle='#7a1030';g.fillRect(0,0,120,160);g.fillStyle='#35e0ff';g.beginPath();g.arc(60,70,34,0,7);g.fill();const JPG=cv.toDataURL('image/jpeg',.8),PNG=cv.toDataURL('image/png');
 const long='Sora creció en los niveles bajos del Distrito Colmillo, entre talleres clandestinos y mercados de implantes de segunda mano. '.repeat(40);
 const s={id:'m',title:'Neón y Colmillos: La Sangre de los Mestizos',syn:'Un vampiro mercenario roba un módulo.',genre:'Ciencia ficción',genres:['Ciencia ficción'],cover:JPG,scenes:[{t:'La lluvia caía sobre el distrito.',m:{}}],
  lore:[{tipo:'personaje',nombre:'Sora',desc:long,img:JPG},{tipo:'personaje',nombre:'Macro',desc:'Mecánico desconfiado; «nunca» se fía de nadie — ni de sí mismo.',img:PNG},{tipo:'lugar',nombre:'Distrito Colmillo',desc:'Barrio bajo de neón.'},{tipo:'objeto',nombre:'Módulo Áxis',desc:'Núcleo robado. 🔥'},{tipo:'protagonista',nombre:'Diroka',desc:'',img:PNG}],
  wl:[{id:'w1',h:'La Caída',t:'Hace cien años la corporación compró la ciudad.',rev:1,on:true}],bible:'La sangre siempre cobra su precio.',
  glo:[{w:'velmor',d:'Sangre sintética de contrabando.'}],map:{pos:{},links:[['Distrito Colmillo','Torre Axis','túnel']]},rel:[{a:'Sora',b:'Macro',t:'aliados tensos'},{a:'',b:'',t:''}],
  docs:[{id:'d1',tipo:'Carta',titulo:'Carta a Ian',t:'Querido Ian:\n\nMañana entramos en la torre.',d:1}],sx:[{t:'Sora trabaja para Axis',on:true}],iv:{Sora:[{q:'¿Qué temes?',a:'Que me encuentren.'}]},blurb:'En una ciudad que nunca duerme…',
  turn:1,at:0,state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'Vampiro mercenario, mestizo.'}],ce:[],memory:'Resumen.',rpg:rpgNew('normal','Sangre')};
 s.rpg.inv=['Ganzúa'];s.rpg.ms=[{t:'Robar el módulo',st:'open'}];LIB.length=0;LIB.push(s);openStory(s);
 const L=fichaLines(s);o.h1=L.filter(x=>x.k==='h1').map(x=>x.t).join('|');const cards=L.filter(x=>x.k==='card');o.cards=cards.map(x=>x.t+'/'+x.tag+'/'+(x.img?1:0)).join('|');
 const txt=fichaTxt(s);o.txt=/Sora  \[personaje\]/.test(txt)&&/velmor  \[término\]/.test(txt)&&/Querido Ian/.test(txt)&&/Distrito Colmillo <-> Torre Axis \(túnel\)/.test(txt)&&/Sora y Macro: aliados tensos/.test(txt)&&/P: ¿Qué temes\?/.test(txt)&&/Sora trabaja para Axis/.test(txt)&&/Misión abierta: Robar el módulo/.test(txt)&&/CONTRAPORTADA/.test(txt);
 const bytes=await fichaPdf(s);const doc=await PDFLib.PDFDocument.load(bytes);o.pages=doc.getPageCount();o.size=bytes.length;window.__pdf=Array.from(bytes);
 // sin extras: no revienta y no añade secciones vacías
 const s2={id:'z',title:'Vacía',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:0,state:{},opts:[],premise:'p',prot:[],ce:[],memory:''};LIB.push(s2);const L2=fichaLines(s2);o.empty=L2.filter(x=>x.k==='card').length+'|'+L2.filter(x=>x.k==='h1').map(x=>x.t).join('|');o.p2=(await PDFLib.PDFDocument.load(await fichaPdf(s2))).getPageCount();
 // botones
 o.b1=$('fichab').textContent;renderLore();const xb=[].slice.call(document.querySelectorAll('#lorebody button')).filter(x=>x.textContent==='Exportar el mundo (PDF)')[0];o.b2=!!xb;xb.click();await new Promise(r=>setTimeout(r,1500));o.saved=window.__saved&&window.__saved.name+'|'+(window.__saved.len>5000);
 return o});
const pdf=await p.evaluate(()=>window.__pdf);if(process.env.SHOT)fs.writeFileSync(process.env.SHOT,Buffer.from(pdf));
console.log(JSON.stringify(r,null,1));
for(const h of ['CONTRAPORTADA','LORE DEL UNIVERSO','BIBLIA, TONO Y REGLAS','PROTAGONISTAS','CARTAS DE LORE','GLOSARIO','MAPA: CONEXIONES ENTRE LUGARES','RELACIONES FIJADAS POR EL AUTOR','DOCUMENTOS DEL MUNDO','SECRETOS DEL AUTOR','ENTREVISTAS A PERSONAJES','FICHA DE AVENTURA (RPG)'])if(r.h1.split('|').indexOf(h)<0)fail('falta '+h);
if(!/^Diroka\/Protagonista\/1/.test(r.cards)||/Diroka\/protagonista/.test(r.cards)||!/Sora\/personaje\/1/.test(r.cards)||!/Distrito Colmillo\/lugar\/0/.test(r.cards)||!/velmor\/término\/0/.test(r.cards)||!/Carta a Ian\/Carta\/0/.test(r.cards))fail('cards '+r.cards);
if(!r.txt)fail('txt');if(r.pages<3||r.size<8000)fail('pdf '+r.pages);
if(!/^0\|/.test(r.empty)||/GLOSARIO|DOCUMENTOS|SECRETOS|ENTREVISTAS|MAPA|RELACIONES|RPG|CONTRAPORTADA|CARTAS/.test(r.empty)||r.p2<1)fail('vacia '+r.empty);
if(!/^📕 El mundo del libro en PDF/.test(r.b1)||!r.b2||r.saved!=='neon-y-colmillos-la-sangre-de-los-mestizos-mundo.pdf|true')fail('botones '+r.saved);
if(errs.length)fail('err');console.log('OK mundo en PDF');await b.close()})()
