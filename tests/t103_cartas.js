const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(()=>{
 const s={id:'c',title:'T',syn:'x',genre:'Fantasía',genres:[],scenes:[{t:'Llegas.',m:{}}],lore:[{tipo:'lugar',nombre:'Brumal',desc:'ciudad'}],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};
 LIB.length=0;LIB.push(s);openStory(s);
 const o={};
 const t1='Lira Voss\nProtagonista. Cazadora de reliquias con una cicatriz en la mano.\n\nLugar: Faro Hueco. Un faro sin luz en la isla.\n\nBrumal: ciudad portuaria de tres puertas.\n\nEspada del Alba - arma antigua que brilla con la luna';
 o.auto=cardsSplit(t1,'auto','').map(b=>cardParse(b,'personaje'));
 const t2='Kael: el herrero ciego\n---\nTipo: objeto\nNombre: Llave de hueso\nDescripción: abre la cripta\n---\n# Gremio Gris\nFacción de espías';
 o.raya=cardsSplit(t2,'auto','').map(b=>cardParse(b,'personaje'));
 o.sep=cardsSplit('Uno: a;;Dos: b;;Tres: c','sep',';;').length;
 o.lin=cardsSplit('Ana: la tabernera\nLuis: el guardia','auto','').length;
 const r=cardsAdd(s,o.auto.concat(o.raya));o.add=r;o.n=s.lore.length;
 // loreTxt prioriza por foco
 for(let i=0;i<40;i++)s.lore.push({tipo:'personaje',nombre:'Relleno'+i,desc:'x'});
 s.lore.push({tipo:'personaje',nombre:'Zorvak',desc:'importante'});
 o.focus=/Zorvak/.test(loreTxt(s,'hablo con Zorvak'))&&!/Zorvak/.test(loreTxt(s,''));
 cardsSheet();o.sheet=!!document.querySelector('#gsheet textarea')&&!!document.querySelector('#gsheet input[type=file]');
 const ta=document.querySelector('#gsheet textarea');ta.value=t2;ta.oninput();o.pv=/He encontrado 3 cartas/.test(document.getElementById('gsheet').textContent);
 closeSheet();
 renderSet();o.more=/Añadir más material del autor/.test(document.body.textContent);
 return o});
console.log(JSON.stringify(r));
const A=r.auto;
if(A.length!==4||A[0].nombre!=='Lira Voss'||A[1].tipo!=='lugar'||A[1].nombre!=='Faro Hueco'||A[2].nombre!=='Brumal'||A[3].nombre!=='Espada del Alba')fail('auto '+JSON.stringify(A));
const R=r.raya;if(R.length!==3||R[1].tipo!=='objeto'||R[1].nombre!=='Llave de hueso'||R[2].nombre!=='Gremio Gris'||R[0].nombre!=='Kael')fail('raya '+JSON.stringify(R));
if(r.sep!==3||r.lin!==2)fail('sep');if(r.add.add<5||r.add.skip<1)fail('add '+JSON.stringify(r.add));
if(!r.focus)fail('foco');if(!r.sheet||!r.pv)fail('hoja');if(!r.more)fail('añadir material');
if(errs.length)fail('errores');console.log('OK cartas');await b.close()})()
