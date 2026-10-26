const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];window.__req=[];const FILL=' palabra'.repeat(70);
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);
  if(q.startsWith('Resume este capítulo'))return{text:'{"titulo":"Capítulo 9: El puente","resumen":"Resumen manual del capítulo"}'};
  const i=cur.scenes.length+1;const mem={eventos:[{que:'e'+i}]};
  // la IA pide cerrar en la escena 2 (muy pronto), 6, 9 y 14
  if([2,6,9,14].includes(i)){mem.cierra_capitulo=true;mem.titulo_capitulo='Título '+i;mem.resumen_capitulo='Res '+i}
  return{text:JSON.stringify({escena:'Escena '+i+'.'+FILL,opciones:['a'],mem,estado:{}})}}:null}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
await p.evaluate(()=>{RD.type=false;const s={id:'4',title:'T',syn:'s',genre:'Misterio',genres:['Misterio'],premise:'p',lore:[],prot:[{name:'M'}],memory:'',last:'',turn:0,state:{},scenes:[],opts:[],fin:false,prev:null,review:false};LIB.push(s);openStory(s)});
await p.waitForTimeout(300);
for(let i=0;i<15;i++)await p.evaluate(async i=>{await turn('[ACCIÓN] a'+i,'x'+i)},i);
const o=await p.evaluate(()=>{const s=cur,r={};r.scenes=s.scenes.length;r.ce=s.ce;r.ctit=s.mem.ctit;r.chapKeys=Object.keys(s.mem.chap);
 r.heads=[...document.querySelectorAll('#book .ch')].map(x=>x.textContent);r.pages=pagesOf(s);r.cur=chCur(s);
 r.note=chapNote(s).slice(0,160);return r});
console.log(JSON.stringify(o,null,1));
// cierre manual
await p.evaluate(async()=>{await turn('[ACCIÓN] m','m');await turn('[ACCIÓN] m2','m2')});
await p.evaluate(()=>{OPEN_SC=cur.scenes.length-1;render(true)});
console.log('btn',await p.evaluate(()=>!![...document.querySelectorAll('.scm button')].find(b=>b.textContent==='Cerrar el capítulo aquí')));
await p.evaluate(()=>{[...document.querySelectorAll('.scm button')].find(b=>b.textContent==='Cerrar el capítulo aquí').click()});await p.waitForTimeout(300);
await p.evaluate(()=>{[...document.querySelectorAll('button')].find(b=>b.textContent==='Cerrar el capítulo').click()});await p.waitForTimeout(600);
console.log('manual',await p.evaluate(()=>({ce:cur.ce,t:cur.mem.ctit,res:cur.mem.chap[String(chCur(cur)-1)]})));
// siguiente escena empieza capítulo nuevo + undo
await p.evaluate(async()=>{await turn('[ACCIÓN] n','n')});
console.log('tras',await p.evaluate(()=>({ce:cur.ce,heads:[...document.querySelectorAll('#book .ch')].slice(-2).map(x=>x.textContent)})));
await p.evaluate(()=>undoTurn());console.log('undo',await p.evaluate(()=>cur.ce));
console.log('epub',await p.evaluate(()=>Object.keys(buildEpubFiles(cur)).filter(k=>/c\d+\.xhtml/.test(k)).length));
// parse
const P=await p.evaluate(()=>{const T=[ '```json\n{"escena":"a\nb","opciones":["x",],}\n```', '{"escena":"dijo "hola" y se fue","opciones":["a"]}', '{"escena":"corta","opciones":["a","b"', 'Aquí va: {"escena":"ok"} gracias', '{"escena":"x","mem":{"eventos":[{"que":"y"},]}}'];return T.map(t=>{try{const d=parse(t);return d.escena}catch(e){return 'ERR '+e.message}})});
console.log('parse',JSON.stringify(P));
console.log('errores',errs);await b.close()})();
