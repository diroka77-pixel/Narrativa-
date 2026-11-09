const {chromium}=require('playwright');const path=require('path');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(()=>{
 const T='La lluvia ácida tamborileaba sobre los neones del Distrito Colmillo. Diroka apretó el módulo contra el pecho.\n\n—Los refuerzos llegan en dos minutos —dijo Sora sin apartar la vista del visor—. Si el módulo sigue en tu mano, estamos muertos.\n\n—Venid a por mí —murmuró Diroka—. Os enseñaré cómo se abre una puerta de verdad.\n\n—¿Y si es una trampa?\n\nMacro negó con la cabeza:\n\n—No pienso entrar ahí.\n\nEl pasillo olía a ozono.';
 const s={id:'w',title:'Neón y colmillos',syn:'x',genre:'Ciencia ficción',genres:[],scenes:[{t:T,m:{}},{t:T,m:{},a:'Fuerzo la compuerta',roll:{d:17,risk:'Arriesgado',dc:12,tier:'pleno'}}],lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner.'},{tipo:'personaje',nombre:'Macro',desc:'Mecánico.'}],turn:2,at:1,state:{},opts:['[Arriesgado] Forzar la compuerta','[Seguro] Convencer a Macro','[Temerario] Provocar a los refuerzos'],premise:'p',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'mem',rpg:rpgNew('normal','Sangre')};
 LIB.length=0;LIB.push(s);sample=async()=>({text:'{}'});openStory(s);
 const o={};const it=comicParse(s,T);
 o.kinds=it.map(x=>x.k).join('');o.who=it.filter(x=>x.k==='d').map(x=>x.who?x.who.name:'?').join(',');
 o.sp1=it[1].t;o.inc1=it[1].inc;
 // no se pierde texto: todas las palabras de la escena están en las viñetas
 const sc1=document.querySelector('#sc-1 .comic');const shown=sc1?sc1.textContent.replace(/[^a-záéíóúñ]/gi,''):'';
 o.lost=T.replace(/[—–]/g,' ').split(/\s+/).map(w=>w.replace(/[^a-záéíóúñ]/gi,'')).filter(w=>w.length>3&&shown.indexOf(w)<0);
 o.panels=document.querySelectorAll('#sc-1 .cpanel').length;o.bubs=document.querySelectorAll('#sc-1 .cbub').length;o.me=document.querySelectorAll('#sc-1 .crow.me').length;
 o.stamp=(document.querySelector('#sc-1 .cstamp')||{}).textContent;o.stamp0=!!document.querySelector('#sc-0 .cstamp');
 o.bar=[].slice.call(document.querySelectorAll('#cmxbar button')).map(x=>x.textContent+(x.classList.contains('on')?'*':'')).join('|');
 o.mini=!$('rpgmini').hidden&&/Salud 100/.test($('rpgmini').textContent)&&/Sangre 100/.test($('rpgmini').textContent);
 o.ropt=[].slice.call(document.querySelectorAll('#opts button')).map(x=>x.className).join(',');
 // cara
 faceSheet('Sora');o.sheet=/Cara de Sora/.test($('gsheet').textContent);closeSheet();
 s.lore[0].img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';render(true);
 o.img=document.querySelectorAll('#sc-1 .cface img').length;
 // texto normal
 [].slice.call(document.querySelectorAll('#cmxbar button')).filter(x=>x.textContent==='Texto')[0].click();
 o.off=document.querySelectorAll('#book .cpanel').length;o.ps=document.querySelectorAll('#sc-1 > p:not(.act):not(.rollline)').length;o.comic=s.comic;o.roll=!!document.querySelector('#sc-1 .rollline');
 [].slice.call(document.querySelectorAll('#cmxbar button')).filter(x=>x.textContent==='Viñetas')[0].click();o.on2=document.querySelectorAll('#book .cpanel').length>0;
 // modo novela (sin RPG): nada cambia
 const n=JSON.parse(JSON.stringify(s));n.id='n';delete n.rpg;LIB.push(n);openStory(n);o.nov=document.querySelectorAll('#book .cpanel').length;o.novbar=$('cmxbar').hidden;o.novmini=$('rpgmini').hidden;
 openStory(s);return o});
console.log(JSON.stringify(r));
if(r.kinds!=='ndddndn')fail('kinds '+r.kinds);
if(r.who!=='Sora,Diroka,Sora,Macro')fail('who '+r.who);
if(!/^Los refuerzos llegan en dos minutos\. Si el módulo/.test(r.sp1)||!/dijo Sora/.test(r.inc1))fail('split');
if(r.lost.length)fail('texto perdido '+r.lost.join(','));
if(r.panels<2||r.bubs!==4||r.me!==1)fail('paneles '+r.panels+' '+r.bubs+' '+r.me);
if(!/17/.test(r.stamp)||!/Éxito/.test(r.stamp)||r.stamp0)fail('sello');
if(r.bar!=='Viñetas*|Texto')fail('barra '+r.bar);if(!r.mini)fail('mini');
if(r.ropt!=='ropt r1,ropt r0,ropt r2')fail('ropt '+r.ropt);
if(!r.sheet)fail('hoja cara');if(r.img!==2)fail('img '+r.img);
if(r.off!==0||r.ps<5||r.comic!==false||!r.roll)fail('texto');if(!r.on2)fail('volver');
if(r.nov!==0||!r.novbar||!r.novmini)fail('novela');
if(process.env.SHOT){await p.evaluate(()=>document.getElementById('sc-1').scrollIntoView());await p.waitForTimeout(700);await p.screenshot({path:process.env.SHOT+'_1.png'});await p.evaluate(()=>window.scrollTo(0,9e5));await p.waitForTimeout(400);await p.screenshot({path:process.env.SHOT+'_2.png'})}
if(errs.length)fail('err');console.log('OK viñetas');await b.close()})()
