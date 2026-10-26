const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];window.__snap={};
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);
  if(q.includes('editor de novelas'))return{text:'{"hitos":["Llega","Traición","Clímax","Final"]}'};
  const i=cur.scenes.length+1;
  const L=i===3?[{tipo:'personaje',nombre:'Nuevo'+i,desc:'x'}]:null;
  return{text:JSON.stringify({escena:'Escena '+i+' Marta.',opciones:['o'+i],memoria:'mem'+i,mem:{eventos:[{que:'Suceso '+i,donde:'x',quien:['Marta']}],personajes:[{nombre:'Marta',ubicacion:'p'+i}],objetos:i===4?[{nombre:'llave',dueno:'Marta'}]:[],pendientes:i===8?[{id:'pz',texto:'Pendiente tardío',accion:'abre'}]:[]},estado:{salud:100-i},lore_nuevo:L,fin:false})}}:null}});
await p.goto('file:///tmp/apk91/x/assets/index.html'.replace('/tmp/apk91/x/assets','/home/claude/v091/assets'));await p.waitForTimeout(400);
await p.evaluate(()=>{RD.type=false;const s={id:'5',title:'T',syn:'s',genre:'Misterio',genres:['Misterio'],premise:'p',lore:[{tipo:'protagonista',nombre:'Marta',desc:'d'}],prot:[{name:'Marta'}],memory:'',last:'',turn:0,state:{},scenes:[],opts:[],fin:false,prev:null,review:false,plan:{on:true,pts:['A','B','C','D'],total:20},at:Date.now()-9*3600e3};LIB.push(s);openStory(s)});
await p.waitForTimeout(300);
for(let i=0;i<11;i++){await p.evaluate(async i=>{await turn('[ACCIÓN] a'+i,'x'+i);if(cur.scenes.length===6)__snap.ev6=cur.mem.ev.length+'|'+Object.keys(cur.mem.chars).length+'|'+cur.mem.pend.length+'|'+Object.keys(cur.mem.items).length},i)}
const r=await p.evaluate(async()=>{const o={};const src=cur;o.scenes=src.scenes.length;
 const last=__prompts.filter(q=>q.includes('ESTADO OCULTO')).pop();o.plan=(last.match(/PLAN DE LA NOVELA[^\n]*/)||[''])[0].slice(0,200);
 o.canFork=canFork(src,6);
 const f=forkStory(src,6);o.fork={scenes:f.scenes.length,title:f.title,ev:f.mem.ev.length+'|'+Object.keys(f.mem.chars).length+'|'+f.mem.pend.length+'|'+Object.keys(f.mem.items).length,snap:__snap.ev6,lore:f.lore.map(c=>c.nombre),opts:f.opts,state:f.state,pendTardio:f.mem.pend.some(x=>x.text==='Pendiente tardío'),loreSrcHasNuevo3:src.lore.some(c=>c.nombre==='Nuevo3'),srcUntouched:src.scenes.length};
 o.use=useGet();
 // límite y aviso
 const u=useGet();u.lim=13;u.warned=0;useSave(u);return o});
await p.evaluate(()=>{window.__e=[];const o=emsg;window.emsg=function(t){__e.push(t);o(t)}});
await p.evaluate(async()=>{await turn('[ACCIÓN] z','z')});
console.log(JSON.stringify(r,null,1));
console.log('aviso',await p.evaluate(()=>__e));
// abrir historia tras horas -> recap
await p.evaluate(()=>{cur.at=Date.now()-9*3600e3;save();view('lib');openStory(cur)});await p.waitForTimeout(600);
console.log('recap',await p.evaluate(()=>document.body.innerText.includes('Anteriormente en')));
await p.evaluate(()=>closeSheet());
// rama UI
await p.evaluate(()=>{OPEN_SC=2;render(true)});
console.log('btn',await p.evaluate(()=>[...document.querySelectorAll('button')].some(b=>b.textContent==='Crear rama desde aquí')));
await p.evaluate(()=>{[...document.querySelectorAll('button')].find(b=>b.textContent==='Crear rama desde aquí').click()});await p.waitForTimeout(300);
await p.evaluate(()=>{[...document.querySelectorAll('button')].find(b=>b.textContent==='Crear rama').click()});await p.waitForTimeout(500);
console.log('nueva',await p.evaluate(()=>({t:cur.title,n:cur.scenes.length,lib:LIB.length})));
await p.evaluate(()=>{cur.plan.pts=[];cur.plan.on=false;save();renderSet()});await p.evaluate(()=>{[...document.querySelectorAll('button')].find(b=>b.textContent==='Proponer plan con la IA').click()});await p.waitForTimeout(600);console.log('planIA',await p.evaluate(()=>JSON.stringify(cur.plan)));
await p.evaluate(()=>{document.getElementById('setbox')&&(document.getElementById('setbox').open=true)});
console.log('errores',errs);await b.close()})();
