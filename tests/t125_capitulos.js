const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const sc=[];for(let i=0;i<8;i++)sc.push({t:'Escena '+i+'.',m:{}});
 const s={id:'k',title:'N',syn:'x',genre:'Misterio',genres:[],scenes:sc,lore:[],turn:8,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:undefined,memory:'m'};delete s.ce;
 LIB.length=0;LIB.push(s);openStory(s);
 o.noauto=chEnds(s).length+'|'+document.querySelectorAll('#book .ch').length;
 // la IA pide cerrar y hay muchas palabras: no se cierra
 sample=async()=>({text:JSON.stringify({escena:('Texto largo. ').repeat(400),opciones:['a','b','c'],memoria:'m',mem:{cierra_capitulo:true,resumen_capitulo:'r'}})});
 $('own').value='Sigo';$('do').click();await wait(400);o.aiclose=JSON.stringify(s.ce);
 // empezar capítulo en la escena 3
 const m=ensureMem(s);m.ctit={};m.chap={};
 btn('#sc-3 .scm','Empezar un capítulo nuevo en esta escena').click();await wait(50);o.c1=JSON.stringify(s.ce)+'|'+chOf(s,3)+'|'+chOf(s,2);
 btn('#sc-6 .scm','Empezar un capítulo nuevo en esta escena').click();await wait(50);m.ctit={'2':'Dos','3':'Tres'};m.chap={'2':'r2','3':'r3'};
 o.c2=JSON.stringify(s.ce)+'|'+chCount(s);
 // quitar el capítulo 2
 btn('#sc-3 .scm','Quitar el capítulo 2 (unir con el anterior)').click();await wait(50);o.ask=/Quitar este corte/.test($('gsheet').textContent);btn('#gsheet','Quitar el corte').click();await wait(80);
 o.c3=JSON.stringify(s.ce)+'|'+chCount(s)+'|'+JSON.stringify(m.ctit)+'|'+JSON.stringify(m.chap);
 // permitir al Cronista
 s.cmode='ia';o.allow=true;
 return o});
console.log(JSON.stringify(r));
if(r.noauto!=='0|1')fail('auto '+r.noauto);if(r.aiclose!=='[]'&&r.aiclose!==undefined&&r.aiclose!=='undefined')fail('ia cierra '+r.aiclose);
if(r.c1!=='[3]|2|1'||r.c2!=='[3,6]|3'||!r.ask||r.c3!=='[6]|2|{"2":"Tres"}|{"2":"r3"}')fail('cortes '+r.c1+' '+r.c2+' '+r.c3);
if(errs.length)fail('err');console.log('OK capítulos');await b.close()})()
