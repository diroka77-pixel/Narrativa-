const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};try{const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const IMG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
 const sc=[];for(let i=0;i<12;i++)sc.push({t:'Escena '+i+'. Sora y Diroka huyen por el Distrito Colmillo.',m:{}});
 const s={id:'v1',title:'Neón y Colmillos',syn:'Un vampiro roba un módulo.',genre:'Ciencia ficción',genres:['Ciencia ficción'],cover:IMG,scenes:sc,lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner.',img:IMG},{tipo:'lugar',nombre:'Distrito Colmillo',desc:'Barrio.'}],wl:[{id:'w1',h:'La Caída',t:'Axis compró la ciudad.',rev:1,on:true}],glo:[{w:'velmor',d:'Sangre sintética.'}],docs:[{id:'d1',tipo:'Carta',titulo:'A Ian',t:'Querido Ian.',d:1}],map:{pos:{},links:[['A','B','']]},sx:[{t:'Sora trabaja para Axis',on:true}],bible:'La sangre cobra su precio.',rules:['Nada de magia'],
  turn:12,at:Date.now(),state:{salud:40},opts:['a','b'],premise:'Un vampiro mercenario roba un módulo.',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'Diroka escapa con el módulo; Macro muere.',rpg:rpgNew('normal','Sangre')};
 s.rpg.inv=['Ganzúa'];s.rpg.gold=77;s.rpg.hp=20;s.rpg.at.f=3;s.rpg.ms=[{t:'Encontrar a Ian',st:'open'},{t:'Robar el módulo',st:'done'}];s.rpg.co=[{n:'Sora',hp:10}];s.rpg.en={n:'Dron',f:1,hp:5,mx:40};
 LIB.length=0;LIB.push(s);openStory(s);const m=ensureMem(s);const c=getChar(m,'Sora',3);c.last=11;c.fix={canon:'Pelo plateado'};c.voice='Sarcástica';c.hist=[{sc:4,k:'mood',from:'a',to:'b'}];c.know=[{k:'hecho',t:'sabe lo del módulo',sc:9}];m.ev=[{sc:5,what:'Macro muere'},{sc:11,what:'Diroka escapa'}];m.chap={1:'Huida inicial.'};m.pend=[{id:'p1',text:'¿Dónde está Ian?',sc:7,open:true},{id:'p2',text:'Cerrado',sc:2,open:false}];
 // local
 o.local=sagaLocal(s);
 // menú
 storyMenu(s);o.mbtn=!!btn('#gsheet','📚 Construir el volumen 2');btn('#gsheet','📚 Construir el volumen 2').click();await wait(80);
 o.title=$('gsheet').querySelector('h2,h1')?$('gsheet').textContent.slice(0,40):'';const ins=document.querySelectorAll('#gsheet input[type=text]');o.name=ins[0].value;o.tt=ins[1].value;
 const tas=document.querySelectorAll('#gsheet textarea');o.sm0=/Diroka escapa/.test(tas[0].value);
 let asked='';sample=async(q)=>{asked=q;return {text:'{"resumen":"Diroka roba el módulo y escapa; Macro muere en la torre.","final":"Diroka vivo y herido; Sora desaparece.","abiertos":["¿Dónde está Ian?","El módulo late"]}'}};
 btn('#gsheet','Que El Cronista resuma este volumen').click();await wait(200);o.ai=tas[0].value;o.ap=/RESUMEN DEFINITIVO/.test(asked)&&/Macro muere/.test(asked)&&/¿Dónde está Ian\?/.test(asked)&&!/Cerrado/.test(asked);
 o.dbg=[].slice.call(document.querySelectorAll('#gsheet button')).map(x=>x.textContent).join('|')+' #'+tas.length+' '+$('gmodal').hidden;tas[1].value='Un año después, Diroka vuelve.';const chks=document.querySelectorAll('#gsheet label.chk input');o.chks=chks.length+'|'+(chks[0]&&chks[0].checked)+'|'+(chks[1]&&chks[1].checked)+'|'+[].slice.call(document.querySelectorAll('#gsheet label')).map(x=>x.className+':'+x.textContent.slice(0,20)).join(';');
 btn('#gsheet','📚 Construir el volumen 2').click();await wait(200);
 const v2=LIB[1];o.n=LIB.length;o.cur=cur===v2;o.v1=JSON.stringify({fin:s.fin,saga:s.saga&&{vol:s.saga.vol,next:s.saga.next===v2.id,name:s.saga.name}});
 o.v2=JSON.stringify({t:v2.title,syn:v2.syn,vol:v2.saga.vol,prev:v2.saga.prev.map(x=>[x.vol,x.title,x.id]),sc:v2.scenes.length,mem:v2.memory,fin:v2.fin,cover:!!v2.cover});
 o.copy=[v2.lore.length,v2.lore[0].img===IMG,v2.wl.length,v2.glo.length,v2.docs.length,v2.map.links.length,v2.sx.length,v2.bible,v2.rules.join(),v2.prot[0].name].join('|');
 const m2=v2.mem,c2=m2.chars[Object.keys(m2.chars).filter(k=>m2.chars[k].name==='Sora')[0]];o.mem=JSON.stringify({first:c2.first,last:c2.last,canon:c2.fix.canon,voice:c2.voice,hist:c2.hist,know:c2.know[0].sc,ev:m2.ev.length,chap:Object.keys(m2.chap).length,pend:m2.pend.map(x=>x.text+':'+x.sc)});
 o.memOld=m.ev.length+'|'+c.last;
 o.rpg=JSON.stringify({hp:v2.rpg.hp,gold:v2.rpg.gold,inv:v2.rpg.inv,f:v2.rpg.at.f,ms:v2.rpg.ms,co:v2.rpg.co,en:!!v2.rpg.en,parent:v2.rpg.parent});
 o.ctx=sagaCtx(v2,false);o.inb=/SAGA «Neón y Colmillos»: esta historia es el VOLUMEN 2/.test(build(v2,'x','',null,false))&&/SAGA/.test(build(v2,'x','',null,true));
 o.prem=v2.premise;
 // volumen 3 hereda 1 y 2
 v2.scenes=[{t:'Diroka vuelve a la ciudad.',m:{}},{t:'Encuentra a Ian.',m:{}}];v2.memory='Diroka encuentra a Ian.';
 const v3=sagaNext(v2,{sum:'Diroka vuelve y encuentra a Ian.',close:true,rpg:false});o.v3=JSON.stringify({t:v3.title,vol:v3.saga.vol,prev:v3.saga.prev.map(x=>x.vol+':'+x.title),rpgNew:v3.rpg.gold===30&&v3.rpg.inv.length===0,v2fin:v2.fin,v2next:v2.saga.next===v3.id,id:v3.saga.id});
 o.ctx3=sagaCtx(v3,false);o.ctx3c=sagaCtx(v3,true).length;
 // biblioteca, mundo, final
 renderLib();o.chip=[].slice.call(document.querySelectorAll('#list .chip')).map(x=>x.textContent).join('|');
 o.ficha=/SAGA «Neón y Colmillos»: VOLÚMENES ANTERIORES/.test(fichaTxt(v3))&&/Volumen 1 · Neón y Colmillos/.test(fichaTxt(v3));
 openStory(s);o.fin=!!btn('#book','📚 Ir al volumen 2');openStory(v3);storyMenu(v3);o.v3menu=!!btn('#gsheet','📖 Saga: volúmenes anteriores')+'|'+!!btn('#gsheet','📚 Construir el volumen 4')===false;
 btn('#gsheet','📖 Saga: volúmenes anteriores').click();o.prevs=document.querySelectorAll('#gsheet details').length;const ta=document.querySelector('#gsheet textarea');ta.value='Editado.';ta.onchange();o.edit=v3.saga.prev[0].sum;
 // sin escenas: no ofrece el volumen siguiente
 storyMenu(v3);o.v3menu=!!btn('#gsheet','📖 Saga: volúmenes anteriores')+'|'+!!btn('#gsheet','📚 Construir el volumen 4');closeSheet();
 // persistencia
 save();const L2=JSON.parse(localStorage.getItem('narrador:v1')||'[]');o.saved=Array.isArray(L2)?L2.length:(L2.lib||L2.stories||[]).length;
 }catch(e){o.EXC=String(e)+' | btns: '+[].slice.call(document.querySelectorAll('#gsheet button')).map(x=>x.textContent).join('|')+' | modal hidden '+$('gmodal').hidden+' | '+$('gsheet').textContent.slice(0,200)}
 return o});
console.log(JSON.stringify(r,null,1));
if(!/Un vampiro roba un módulo/.test(r.local)||!/Diroka escapa/.test(r.local))fail('local');
if(!r.mbtn||r.name!=='Neón y Colmillos'||r.tt!=='Neón y Colmillos · Volumen 2'||!r.sm0)fail('hoja '+r.name+' '+r.tt);
if(!/Diroka roba el módulo/.test(r.ai)||!/CÓMO QUEDA TODO: Diroka vivo/.test(r.ai)||!/HILOS ABIERTOS: ¿Dónde está Ian\?; El módulo late/.test(r.ai)||!r.ap)fail('ia '+r.ai);
if(r.chks.indexOf('2|true|true|')!==0||r.n!==2||!r.cur)fail('crear '+r.chks);
if(r.v1!=='{"fin":true,"saga":{"vol":1,"next":true,"name":"Neón y Colmillos"}}')fail('v1 '+r.v1);
const v2=JSON.parse(r.v2);if(v2.t!=='Neón y Colmillos · Volumen 2'||v2.syn!=='Un año después, Diroka vuelve.'||v2.vol!==2||JSON.stringify(v2.prev)!=='[[1,"Neón y Colmillos","v1"]]'||v2.sc!==0||v2.mem!==''||v2.fin||v2.cover)fail('v2 '+r.v2);
if(r.copy!=='2|true|1|1|1|1|1|La sangre cobra su precio.|Nada de magia|Diroka')fail('copia '+r.copy);
if(r.mem!=='{"first":0,"last":0,"canon":"Pelo plateado","voice":"Sarcástica","know":0,"ev":0,"chap":0,"pend":["¿Dónde está Ian?:0"]}'||r.memOld!=='2|11')fail('mem '+r.mem);
if(r.rpg!=='{"hp":100,"gold":77,"inv":["Ganzúa"],"f":3,"ms":[{"t":"Encontrar a Ian","st":"open"}],"co":[{"n":"Sora","hp":100}],"en":false}')fail('rpg '+r.rpg);
if(!/VOLUMEN 2/.test(r.ctx)||!/VOLUMEN 1 · «Neón y Colmillos»: Diroka roba el módulo/.test(r.ctx)||!r.inb||!/Arranque propuesto por el autor: Un año después/.test(r.prem))fail('ctx');
const v3=JSON.parse(r.v3);if(v3.t!=='Neón y Colmillos · Volumen 3'||v3.vol!==3||v3.prev.join()!=='1:Neón y Colmillos,2:Neón y Colmillos · Volumen 2'||!v3.rpgNew||!v3.v2fin||!v3.v2next||v3.id!=='v1')fail('v3 '+r.v3);
if(!/VOLUMEN 1 ·[\s\S]*VOLUMEN 2 ·/.test(r.ctx3)||r.ctx3c>2700)fail('ctx3');
if(!/VOL. 2/.test(r.chip)||!/VOL. 3/.test(r.chip)||!r.ficha||!r.fin)fail('ui '+r.chip+' '+r.fin);
if(r.prevs!==2||r.edit!=='Editado.'||r.v3menu!=='true|false')fail('prev '+r.prevs+' '+r.v3menu);
if(r.saved!==3)fail('guardado '+r.saved);
if(process.env.SHOT){await p.evaluate(()=>{sagaSheet(LIB[1])});await p.waitForTimeout(400);await p.screenshot({path:process.env.SHOT})}
if(errs.length)fail('err');console.log('OK saga');await b.close()})()
