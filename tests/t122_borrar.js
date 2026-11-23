const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const s={id:'b',title:'N',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Escena cero.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:['a','b','c'],premise:'p',prot:[{name:'Diroka',desc:''}],ce:[],memory:'mem0'};LIB.length=0;LIB.push(s);openStory(s);
 let calls=0;sample=async()=>{calls++;return {text:JSON.stringify({escena:'Escena '+calls+' de la IA.',opciones:['x','y','z'],memoria:'mem'+calls})}};
 $('own').value='Diroka abre la puerta';$('do').click();await wait(300);$('own').value='Diroka huye';$('do').click();await wait(300);
 o.n0=s.scenes.length+'|'+calls+'|'+s.scenes[1].a;
 o.btn=!!btn('#sc-2 .scm','Borrar desde aquí y escribir otra cosa')+'|'+(!btn('#sc-1 .scm','Borrar desde aquí y escribir otra cosa')&&!btn('#sc-0 .scm','Borrar desde aquí y escribir otra cosa'));
 btn('#sc-2 .scm','Borrar desde aquí y escribir otra cosa').click();o.sheet=!/siguientes/.test($('gsheet').textContent);btn('#gsheet','Borrar escena').click();await wait(300);
 o.mid=s.scenes.length+'|'+$('own').value;
 btn('#sc-1 .scm','Borrar desde aquí y escribir otra cosa').click();btn('#gsheet','Borrar escena').click();await wait(300);
 o.after=s.scenes.length+'|'+calls+'|'+JSON.stringify($('own').value)+'|'+s.memory;
 // escena del autor: vuelve el texto y el modo
 [].slice.call(document.querySelectorAll('#modes button')).filter(x=>x.textContent==='Texto completo sin modificar')[0].click();$('own').value='Mi escena propia.';$('do').click();await wait(300);
 [].slice.call(document.querySelectorAll('#modes button')).filter(x=>x.textContent==='Idea para la historia')[0].click();
 btn('#sc-1 .scm','Borrar desde aquí y escribir otra cosa').click();btn('#gsheet','Borrar escena').click();await wait(300);
 o.own=s.scenes.length+'|'+$('own').value+'|'+[].slice.call(document.querySelectorAll('#modes button.on')).map(x=>x.textContent).join();
 return o});
console.log(JSON.stringify(r));
const c0=r.n0.split('|')[1];if(!/^3\|\d+\|Diroka abre la puerta$/.test(r.n0)||r.btn!=='true|true'||!r.sheet)fail('antes');
if(r.after!=='1|'+c0+'|"Diroka abre la puerta"|mem0')fail('borrar '+r.after);
if(r.own!=='1|Mi escena propia.|Texto completo sin modificar')fail('propia '+r.own);
if(r.mid!=='2|Diroka huye')fail('medio '+r.mid);
if(errs.length)fail('err');console.log('OK borrar escena');await b.close()})()
