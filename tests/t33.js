const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.__prompts=[];
 window.claude={use:async k=>k==='sample'?async q=>{__prompts.push(q);
  if(/editor literario profesional/.test(q)){const parts=q.split(/<<<E(\d+)>>>/);let o='';for(let i=1;i+1<parts.length;i+=2){o+='<<<E'+parts[i]+'>>>\n'+parts[i+1].trim().replace('palabra','palabra,')+'\n\n'}return{text:o}}
  const i=cur.scenes.length+1;
  return{text:JSON.stringify({escena:'Escena '+i+'. La compuerta cedió con un chirrido. El aire frío entró despacio por la rendija.'+' palabra'.repeat(60),opciones:['a','b','c'],mem:{eventos:[{que:'e'+i}]},estado:{}})}}:null,
  downloads:null};
 window.hvCurModel=()=> 'gemini-test';});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const o={};
// creación simple/avanzada
await p.evaluate(()=>startCreate(''));
o.simple=await p.evaluate(()=>({cls:$('create').className,advVisible:getComputedStyle($('ttl0')).display,quick:getComputedStyle($('quick')).display,rows:[...document.querySelectorAll('#rows>details')].filter(d=>getComputedStyle(d).display!=='none').length}));
await p.evaluate(()=>setCMode('adv'));
o.adv=await p.evaluate(()=>({cls:$('create').className,advVisible:getComputedStyle($('ttl0')).display,quick:getComputedStyle($('quick')).display,rows:[...document.querySelectorAll('#rows>details')].filter(d=>getComputedStyle(d).display!=='none').length}));
// historia con 12 escenas
await p.evaluate(async()=>{
 const sc=[];for(let i=0;i<12;i++)sc.push({t:'Primera frase de la escena '+i+', larga y con palabra rara. Segunda frase algo más extensa para poder compartir como cita en imagen.',m:{},o:[],mt:'',st:{}});
 const st={id:'p1',title:'Novela',syn:'s',premise:'p',genre:'Aventura',genres:['Aventura'],scenes:sc,lore:[],mem:null,ce:[5,10],turn:12,state:{},opts:[],bible:'Nadie muere.',pmode:'relajado',plan:{on:false,pts:[],total:120}};
 LIB.push(st);openStory(st);await new Promise(r=>setTimeout(r,300));});
// prompt
o.prompt=await p.evaluate(()=>{const q=build(cur,'abre','',false);return {craft:/REFERENCIA DE OFICIO/.test(q),est:/ESTRUCTURA:/.test(q),bible:/BIBLIA DE LA HISTORIA/.test(q),relajado:/RELAJADO/.test(q),recurso:/RECURSO NARRATIVO/.test(q)||'turno par'}});
// pulido
await p.evaluate(()=>{polishSheet()});
await p.evaluate(()=>{[...document.querySelectorAll('#gsheet button')].find(b=>/Empezar la revisión/.test(b.textContent)).click()});
await p.waitForTimeout(1500);
o.polishList=await p.evaluate(()=>$('gsheet').innerText.slice(0,500));
await p.evaluate(()=>{[...document.querySelectorAll('#gsheet button')].find(b=>/Ver cambios/.test(b.textContent)).click()});
o.diff=await p.evaluate(()=>$('gsheet').innerText.slice(0,260));
await p.evaluate(()=>{[...document.querySelectorAll('#gsheet button')].find(b=>/Aceptar este/.test(b.textContent)).click()});
await p.waitForTimeout(300);
o.afterAccept=await p.evaluate(()=>({t0:cur.scenes[0].t0!=null,changed:/palabra,/.test(cur.scenes[0].t),state:cur.rev.ch[1].state}));
await p.evaluate(()=>closeSheet());
// export no incluye t0
o.epubOk=await p.evaluate(()=>{const f=buildEpubFiles(cur);return /palabra,/.test(String(f['OEBPS/c1.xhtml']))});
// Atlas hilo/logros
await p.evaluate(()=>{ATL.tab='thread';renderAtlas()});
o.thread=await p.evaluate(()=>$('atlbody').innerText.slice(0,300));
await p.evaluate(()=>{ATL.tab='ach';renderAtlas()});
await p.waitForTimeout(1800);
o.ach=await p.evaluate(()=>({txt:$('atlbody').innerText.slice(0,160),toast:document.getElementById('toast')&&document.getElementById('toast').textContent}));
// frase
await p.evaluate(()=>quoteSheet(0));
o.quote=await p.evaluate(()=>[...document.querySelectorAll('#gsheet button')].length);
await p.evaluate(()=>closeSheet());
// rama
o.fork=await p.evaluate(()=>{cur.endIn=2;const f=forkStory(cur,6);return {endIn:f.endIn,fork:f.fork,scenes:f.scenes.length,bible:f.bible,lib:(LIB.push(f),renderLib(),[...document.querySelectorAll('.chip')].map(c=>c.textContent).join('|'))}});
// ambiente
o.amb=await p.evaluate(()=>{RD.amb='rain';ambPlay('rain');const a=AMB.kind;const n=AMB.nodes.length;ambStop();ambPlay('fire');const b=AMB.kind;ambStop();return {a,n,b,state:AMB.ctx&&AMB.ctx.state}});
// modos de juego UI
o.pmodeUI=await p.evaluate(()=>{renderRead();return $('rdbody').innerText.includes('Sonido ambiente')});
console.log(JSON.stringify(o,null,1));console.log('errores',errs);
await b.close()})();
