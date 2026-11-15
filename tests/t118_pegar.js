const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');window.__clip='';window.Native={paste:function(){return window.__clip}}});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const s={id:'w',title:'Neón',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'m',wl:[]};LIB.length=0;LIB.push(s);openStory(s);renderWl();
 const bulk=$('wlbulk');o.bulk=!!bulk+'|'+(bulk&&bulk.maxLength);
 const LONG='LAS RAZAS\n\n'+'Los vampiros mestizos nacieron tras la Caída. '.repeat(60)+'\n\nLA CIUDAD\n\nNeón Colmillo se levanta sobre ruinas antiguas.';
 window.__clip=LONG;btn('#wlbody','📋 Pegar lo copiado').click();await wait(50);o.pasted=bulk.value.length===LONG.length;
 btn('#wlbody','Solo guardarlo en el lore').click();await wait(50);o.saved=s.wl.length+'|'+s.wl.map(x=>x.h).join(',')+'|'+($('wlbulk').value==='');
 // pegar en la idea suelta (añade al final)
 const ta=[].slice.call(document.querySelectorAll('#wlbody textarea')).filter(x=>/forme parte del universo/.test(x.placeholder))[0];ta.value='Inicio';window.__clip='resto copiado';
 const pb=[].slice.call(document.querySelectorAll('#wlbody button')).filter(x=>x.textContent==='📋 Pegar lo copiado');o.npb=pb.length;pb[1].click();await wait(50);o.idea=JSON.stringify(ta.value);
 // nada copiado
 window.__clip='';pb[1].click();await wait(50);o.emptyToast=/No hay nada copiado/.test(document.body.textContent);
 // con IA: pegar y leer
 let calls=0;sample=async(q)=>{calls++;return {text:'Resumen del lore.'}};window.__clip='Otra idea larga sobre la Torre Axis y su historia antigua.';btn('#wlbody','📋 Pegar lo copiado').click();await wait(30);
 btn('#wlbody','Que El Cronista lo lea ahora').click();await wait(400);o.read=s.wl.length+'|'+calls+'|'+(s.wlsum&&s.wlsum.t);
 // otros cuadros
 o.own=!!$('own').nextSibling&&/Pegar lo copiado/.test($('own').nextSibling.textContent);o.imp=/Pegar lo copiado/.test($('imptxt').nextSibling.textContent);
 cardsSheet();await wait(30);o.cards=!!btn('#gsheet','📋 Pegar lo copiado');closeSheet();
 return o});
console.log(JSON.stringify(r,null,1));
if(r.bulk!=='true|-1'||!r.pasted)fail('bulk');
if(!/^3\|LAS RAZAS,LAS RAZAS,LA CIUDAD\|true$/.test(r.saved)&&!/^\d+\|LAS RAZAS.*LA CIUDAD\|true$/.test(r.saved))fail('guardar '+r.saved);
if(r.npb!==2||r.idea!=='"Inicio\\n\\nresto copiado"'||!r.emptyToast)fail('idea '+r.idea);
const n0=+r.saved.split('|')[0];if(r.read!==(n0+1)+'|1|Resumen del lore.')fail('leer '+r.read);
if(!r.own||!r.imp||!r.cards)fail('otros');
if(errs.length)fail('err');console.log('OK pegar');await b.close()})()
