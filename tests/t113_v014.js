const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1');window.__vib=[];navigator.vibrate=function(x){window.__vib.push(x);return true}});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const T='El velmor ardía en las venas de Diroka. Nadie en Colmillo hablaba de los Sin Pulso.\n\n—¿Tienes velmor? —preguntó Sora.\n\nMacro negó con la cabeza.';
 const pv=(i)=>({len:i,memory:'m',last:'u',turn:i,state:{},now:'',opts:[],fin:false,ls:0});
 const mk=(id,rp)=>({id:id,title:'Neón y colmillos',syn:'Sinopsis',genre:'Misterio',genres:['Misterio'],scenes:[{t:T,m:{}},{t:(T+'\n\n').repeat(10),m:{},a:'Sigo',pv:pv(1)}],lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner.'}],turn:2,at:1,state:{},opts:['[Arriesgado] Empujar','[Seguro] Esperar','[Temerario] Correr'],premise:'Un vampiro roba un módulo.',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'mem',rpg:rp?rpgNew('normal','Sangre'):undefined,sx:[{t:'Sora es una traidora',on:true}],glo:[{w:'velmor',d:'Sangre sintética de contrabando.'},{w:'Sin Pulso',d:'Vampiros expulsados del clan.'}]});
 LIB.length=0;LIB.push(mk('n',0));LIB.push(mk('r',1));const n=LIB[0],s=LIB[1];
 // --- glosario
 RD.type=false;openStory(n);const gl=document.querySelectorAll('#sc-0 .glo');o.glo=[].slice.call(gl).map(x=>x.textContent).join('|');o.p0=document.querySelector('#sc-0 p').textContent===T.split('\n\n')[0];
 gl[0].click();await wait(50);o.toast=/velmor: Sangre sintética/i.test(document.body.textContent);
 o.gctx=gloCtx(n,false);o.gbuild=/GLOSARIO DEL MUNDO/.test(build(n,'x','',null,false));
 gloSheet();document.querySelector('#gsheet input[type=text]').value='Axis';document.querySelector('#gsheet textarea').value='La corporación dueña de la ciudad.';btn('#gsheet','Añadir término').click();o.gadd=n.glo.map(x=>x.w).join(',');closeSheet();
 o.gfind=findAll(n,'contrabando').map(x=>x.sec+':'+x.title).join('|');
 renderLore();o.lbtn=!!btn('#lorebody','Glosario (3)')&&!!btn('#lorebody','Contraportada');
 // --- contraportada
 let asked='';sample=async(q)=>{asked=q;return {text:/tienda/.test(q)?'{"tienda":[{"nombre":"Ganzúa","precio":25,"para":"abrir cerraduras"},{"nombre":"Cuerda","precio":200,"para":"trepar"}]}':'En una ciudad que nunca duerme, Diroka roba lo que no debía.'}};
 blurbSheet();btn('#gsheet','Que la escriba El Cronista').click();await wait(150);o.blurb=n.blurb;o.bp=/CONTRAPORTADA/.test(asked)&&/NO cuentes el desenlace/.test(asked)&&/Sora es una traidora/.test(asked);
 btn('#gsheet','Usar como sinopsis').click();o.syn=n.syn;closeSheet();
 // --- portada en modo libro
 $('immp').onclick();await wait(300);const bc=document.querySelector('#book .bkcover');o.cov=!!bc+'|'+(document.querySelector('#book').firstElementChild===bc)+'|'+bc.textContent.replace(/\s+/g,' ').trim();
 const f=pgInfo();o.pg=f.i+'|'+(f.n>2)+'|'+$('pglab').textContent.split(' / ')[0];const cr=bc.getBoundingClientRect(),br=$('book').getBoundingClientRect();o.fit=(cr.left>=br.left-2&&cr.right<=br.right+2&&cr.height>300&&cr.bottom<=br.bottom+2);
 // la segunda página empieza con el texto, no comparte columna con la portada
 pgGo(1,true);await wait(80);const p1=document.querySelector('#sc-0 p, #sc-0 .ch').getBoundingClientRect();o.pg2=(p1.left>=br.left-2&&p1.left<br.right);
 pgGo(0,true);btn('#book','Seguir por donde ibas').click();await wait(80);o.resume=pgInfo().i>0;
 render(true);o.keep=!!document.querySelector('#book .bkcover');
 $('imx').click();await wait(120);o.gone=!document.querySelector('#book .bkcover')&&!document.body.classList.contains('imm');
 // --- vibración
 window.__vib.length=0;o.bz0=$('dbuzz').textContent;hvBuzz(30);$('dbuzz').click();hvBuzz(30);o.bz=$('dbuzz').textContent+'|'+window.__vib.length;$('dbuzz').click();
 // --- misiones y dinero
 openStory(s);o.fix=s.rpg.gold+'|'+s.rpg.coin+'|'+s.rpg.ms.length;o.mini=$('rpgmini').textContent;
 rpgRnd=()=>15;rpgPre(s,'[Arriesgado] Empujar','x');o.ctx=rpgCtx(s,false);let sn={};rpgApply(s,{rpg:{dinero:12,mision_nueva:'Encontrar al hermano de Sora'}},sn);o.a1=s.rpg.gold+'|'+JSON.stringify(s.rpg.ms)+'|'+rpgExtra(sn);
 rpgPre(s,'[Seguro] Esperar','x');o.ctx2=rpgCtx(s,false);const st0=rpgState(s.rpg);sn={};rpgApply(s,{rpg:{dinero:-500,mision_cumplida:'encontrar al hermano'}},sn);o.a2=s.rpg.gold+'|'+s.rpg.ms[0].st+'|'+rpgExtra(sn);
 rpgStateBack(s.rpg,st0);o.back=s.rpg.gold+'|'+s.rpg.ms[0].st;
 s.rpg.ms=[];for(let i=0;i<4;i++)s.rpg.ms.push({t:'Misión '+i,st:'open'});rpgPre(s,'[Seguro] Esperar','x');o.ctx3=/mision_nueva/.test(rpgCtx(s,false));sn={};rpgApply(s,{rpg:{mision_nueva:'Una quinta misión',mision_fallida:'Misión 2'}},sn);o.a3=s.rpg.ms.length+'|'+s.rpg.ms[2].st+'|'+sn.mq;
 // victoria da dinero y vibra
 window.__vib.length=0;s.rpg.en={n:'Dron',f:1,hp:5,mx:40};const g0=s.rpg.gold;rpgRnd=()=>19;rpgPre(s,'[Arriesgado] Golpear','x');sn={};rpgApply(s,{},sn);o.win=(s.rpg.gold-g0)+'|'+sn.gd+'|'+JSON.stringify(window.__vib);
 window.__vib.length=0;rpgRnd=()=>2;rpgPre(s,'[Temerario] Saltar','x');sn={};rpgApply(s,{},sn);o.hurt=JSON.stringify(window.__vib);
 // ficha: misión manual y moneda
 s.rpg.ms=[];rpgSheet(s);const mi=document.querySelector('#gsheet input[aria-label="Nueva misión"]');mi.value='Robar el módulo';btn('#gsheet','Añadir misión').click();o.m1=JSON.stringify(s.rpg.ms);
 const g1=s.rpg.gold;btn('#gsheet','Cumplida').click();o.m2=s.rpg.ms[0].st+'|'+(s.rpg.gold-g1);
 const cn=document.querySelector('#gsheet input[aria-label="Nombre de la moneda de tu mundo"]');cn.value='Cromos';cn.onchange();o.coin=s.rpg.coin;
 // tienda
 s.rpg.gold=50;s.rpg.hp=60;btn('#gsheet','Tienda').click();o.shop0=/Tienes 50 cromos/.test($('gsheet').textContent);
 [].slice.call(document.querySelectorAll('#gsheet .atrow')).filter(x=>/Curarte/.test(x.textContent))[0].querySelector('button').click();o.heal=s.rpg.gold+'|'+s.rpg.hp;
 btn('#gsheet','Ver qué se vende aquí').click();await wait(200);o.shop=JSON.stringify(s.rpg.shop.it)+'|'+s.rpg.shop.at;o.sp=/5 objetos/.test(asked)&&/cromos/.test(asked);
 const rows=[].slice.call(document.querySelectorAll('#gsheet .atrow'));const gz=rows.filter(x=>/Ganzúa/.test(x.textContent))[0].querySelector('button'),cu=rows.filter(x=>/Cuerda/.test(x.textContent))[0].querySelector('button');o.dis=gz.disabled+'|'+cu.disabled;gz.click();
 o.buy=s.rpg.gold+'|'+s.rpg.inv.join(',')+'|'+s.rpg.shop.it.length;closeSheet();
 o.mfind=findAll(s,'robar el módulo').map(x=>x.sec+':'+x.title).join('|');
 o.mic=hvMic(document.createElement('textarea'));window.hvDictate=function(cb){cb('hola mundo')};const ta=document.createElement('textarea');const mb=hvMic(ta);mb.click();o.mic2=ta.value;
 return o});
console.log(JSON.stringify(r,null,1));
if(r.glo!=='velmor|Sin Pulso|velmor'||!r.p0||!r.toast)fail('glosario '+r.glo);
if(!/velmor = Sangre sintética/.test(r.gctx)||!r.gbuild||r.gadd!=='Axis,Sin Pulso,velmor'||r.gfind!=='Glosario:velmor'||!r.lbtn)fail('glo2 '+r.gadd+' '+r.gfind);
if(r.blurb!=='En una ciudad que nunca duerme, Diroka roba lo que no debía.'||!r.bp||r.syn!==r.blurb)fail('contraportada');
if(r.cov!=='true|true|Neón y colmillos Misterio Seguir por donde ibas'&&!/^true\|true\|Neón y colmillos/.test(r.cov))fail('portada '+r.cov);
if(r.pg!=='0|true|1'||!r.fit||!r.pg2||!r.resume||!r.keep||!r.gone)fail('portada pag '+r.pg+' '+r.fit+' '+r.pg2+' '+r.resume+' '+r.keep+' '+r.gone);
if(r.bz0!=='Vibración: sí'||r.bz!=='Vibración: no|1')fail('vibra '+r.bz);
if(r.fix!=='30|monedas|0'||!/🪙 30/.test(r.mini))fail('fix '+r.fix);
if(!/DINERO: 30 monedas/.test(r.ctx)||!/"dinero"/.test(r.ctx)||!/mision_nueva/.test(r.ctx)||/mision_cumplida/.test(r.ctx))fail('ctx');
if(r.a1!=='42|[{"t":"Encontrar al hermano de Sora","st":"open"}]| · 🪙 +12 · 📜 Nueva misión: Encontrar al hermano de Sora')fail('a1 '+r.a1);
if(!/MISIONES ABIERTAS.*«Encontrar al hermano de Sora»/.test(r.ctx2)||!/mision_cumplida/.test(r.ctx2))fail('ctx2');
if(r.a2!=='20|done| · 🪙 −22 · 📜 Cumplida: Encontrar al hermano de Sora')fail('a2 '+r.a2);
if(r.back!=='42|open')fail('back '+r.back);if(r.ctx3||r.a3!=='5|fail|Una quinta misión')fail('a3 '+r.a3);
if(!/^15\|15\|/.test(r.win)||!/160/.test(r.win)||!/\[70,50,70\]/.test(r.hurt))fail('win/hurt '+r.win+' '+r.hurt);
if(r.m1!=='[{"t":"Robar el módulo","st":"open"}]'||r.m2!=='done|20'||r.coin!=='cromos')fail('ficha '+r.m1+r.m2+r.coin);
if(!r.shop0||r.heal!=='30|85'||!/"n":"Ganzúa","p":25,"f":"abrir cerraduras"/.test(r.shop)||!r.sp||r.dis!=='false|true'||r.buy!=='5|Ganzúa|1')fail('tienda '+r.heal+' '+r.shop+' '+r.dis+' '+r.buy);
if(r.mfind!=='Misiones:Cumplida')fail('mfind '+r.mfind);if(r.mic!==null||r.mic2!=='hola mundo')fail('mic');
if(process.env.SHOT){const S=process.env.SHOT;await p.evaluate(()=>{openStory(LIB[0]);$('immp').onclick()});await p.waitForTimeout(500);await p.screenshot({path:S+'_portada.png'});await p.evaluate(()=>{$('imx').click();gloSheet()});await p.waitForTimeout(500);await p.screenshot({path:S+'_glosario.png'});await p.evaluate(()=>{closeSheet();openStory(LIB[1]);LIB[1].rpg.ms.push({t:'Encontrar al hermano de Sora',st:'open'});rpgSheet(LIB[1]);});await p.waitForTimeout(500);await p.evaluate(()=>{const h=[].slice.call(document.querySelectorAll('#gsheet h3')).filter(x=>x.textContent==='Dinero')[0];h.scrollIntoView()});await p.waitForTimeout(300);await p.screenshot({path:S+'_ficha.png'})}
if(errs.length)fail('err');console.log('OK v0.14');await b.close()})()
