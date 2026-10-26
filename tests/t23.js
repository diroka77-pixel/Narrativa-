const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);
  if(q.includes('archivista de una novela')){return{text:JSON.stringify({mem:{eventos:[{que:'Reparado: Marta cruza el río',donde:'río',quien:['Marta']}],personajes:[{nombre:'la Marta',ubicacion:'río'}]}})}}
  const i=cur.scenes.length+1;
  const mem=i===2?{}:{eventos:[{que:'Suceso '+i,donde:'x',quien:['Marta']}],personajes:[{nombre:i%2?'Marta':'la Marta',ubicacion:'p'+i,relaciones:[{con:'Joaquín',confianza:i<4?2:-5,nota:'n'+i}]},{nombre:'Joaquín'}]};
  return{text:JSON.stringify({escena:'Escena '+i+'.',opciones:['a','b','c'],mem,estado:{}})}}:null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
await p.evaluate(()=>{RD.type=false;const s={id:'88',title:'T',syn:'s',genre:'Misterio',genres:['Misterio'],premise:'p',lore:[{tipo:'protagonista',nombre:'Marta',desc:'d'}],prot:[{name:'Marta'}],memory:'',last:'',turn:0,state:{},scenes:[],opts:[],fin:false,prev:null,review:false,rules:['La magia cuesta un recuerdo']};LIB.push(s);openStory(s)});
await p.waitForTimeout(300);
for(let i=0;i<6;i++)await p.evaluate(async i=>{await turn('[ACCIÓN] a'+i,'x'+i)},i);
await p.waitForTimeout(1500);
const r=await p.evaluate(async()=>{const m=cur.mem,o={};
 o.chars=Object.keys(m.chars);o.miss=m.miss;o.repaired=m.ev.some(e=>e.what.startsWith('Reparado'));
 o.rhist=m.chars.marta.rhist.map(h=>h.sc+':'+h.from+'>'+h.to);
 const last=__prompts.filter(q=>q.includes('ESTADO OCULTO')).pop();o.rules=last.includes('REGLAS INAMOVIBLES')&&last.includes('La magia cuesta');o.names=last.includes('NOMBRES YA USADOS');
 // duplicado manual y fusión
 m.chars['marta ruiz del norte']={name:'Marta Ruiz del Norte',desc:'x',loc:'',body:'',mood:'',goal:'',objs:['llave'],rel:{},know:[],prom:[],first:1,last:2,hist:[],rhist:[],alias:[]};
 mergeChars(m,'marta ruiz del norte','marta');o.after=Object.keys(m.chars);o.alias=m.chars.marta.alias;o.objs=m.chars.marta.objs;
 ATL.tab='chars';document.getElementById('atlbox').open=true;renderAtlas();o.charsUI=document.getElementById('atlbody').innerText.includes('Fusionar')||document.querySelectorAll('#atlbody select').length;
 ATL.tab='rules';renderAtlas();o.rulesUI=document.getElementById('atlbody').innerText.includes('magia');
 ATL.tab='stats';renderAtlas();o.stats=document.getElementById('atlbody').innerText.includes('Salud de la memoria');
 for(const t of ['items','world','pend']){ATL.tab=t;renderAtlas();}
 return o});
console.log(JSON.stringify(r,null,1));console.log('errores',errs);await b.close()})();
