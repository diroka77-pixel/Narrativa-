const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:360,height:780},colorScheme:'light'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};
 const pv=(i)=>({len:i,memory:'m',last:'u',turn:i,state:{},now:'',opts:[],fin:false,ls:0});
 const T='La compuerta cede.\n\n—¡Dentro! —gritó Sora—. Rápido.\n\nMacro cerró la marcha.';
 const mk=(id,r)=>({id:id,title:'Neón',syn:'x',genre:'Misterio',genres:[],scenes:[{t:T,m:{}},{t:T,m:{},a:'Fuerzo',pv:pv(1),tn:'Misterio',img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='}],lore:[{tipo:'personaje',nombre:'Sora',desc:''}],turn:2,at:1,state:{},opts:['[Seguro] Esperar','[Temerario] Correr','[Arriesgado] Mirar'],premise:'p',prot:[{name:'Diroka',desc:''}],ce:[],memory:'m',rpg:r?rpgNew('normal','Sangre'):undefined});
 localStorage.removeItem('hv:goal');LIB.length=0;LIB.push(mk('a',1));LIB.push(mk('b',0));renderLib();
 // meta
 const gc=$('goalcard');o.g0=!gc.hidden&&/Hoy: 0 palabras nuevas/.test(gc.textContent);
 goalAdd('una dos tres cuatro');goalCard();o.g1=/Hoy: 4 palabras/.test(gc.textContent);
 gc.click();const inp=document.querySelector('#gsheet input[type=number]');o.gs=!!inp;inp.value='3';[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent==='Guardar meta')[0].click();
 o.g2=/Hoy: 4 \/ 3 palabras/.test(gc.textContent)&&/1 día seguido/.test(gc.textContent);
 const g=goalGet();const d=new Date();d.setDate(d.getDate()-1);g.days[goalKey(d)]=10;d.setDate(d.getDate()-1);g.days[goalKey(d)]=2;goalSet(g);o.streak=goalStreak(goalGet());
 o.cover=getComputedStyle(document.querySelector('#lib button.cover')).color;
 sample=async()=>({text:'{}'});
 // novela
 openStory(LIB[1]);const ctrl=$('ctrl');const kids=[].slice.call(ctrl.children).map(e=>e.id||e.tagName);
 o.novOrder=kids.indexOf('sug')>kids.indexOf('do');o.q=$('ctrlq').firstChild.textContent.trim();
 o.wopts=!$('wopts').open&&$('wopts').contains($('longsc'))&&!!$('wopts').querySelector('.tonerow');
 o.lab0=$('wopts').firstElementChild.textContent;
 [].slice.call($('wopts').querySelectorAll('.tonerow button')).filter(x=>x.textContent==='Calma')[0].click();await new Promise(r=>setTimeout(r,30));
 $('longsc').click();o.lab1=$('wopts').firstElementChild.textContent;o.tone=cur.nextTone;$('longsc').click();
 o.rd=[].slice.call($('rdbar').children).map(e=>e.id).join(',');o.rdw=getComputedStyle($('rdbar')).flexWrap;
 const ob=document.querySelector('#sc-1 .simg .row button');o.optTxt=ob.textContent;o.optFs=getComputedStyle(ob).fontSize;ob.click();o.optOpen=!document.querySelector('#sc-1 .scm').hidden;
 const act=document.querySelector('#sc-1 p.act');o.act0=act.textContent;act.click();o.act1=act.textContent+'|'+act.classList.contains('op');
 // rpg
 openStory(LIB[0]);const k2=[].slice.call($('ctrl').children).map(e=>e.id||e.tagName);o.rpgOrder=k2.indexOf('sug')<k2.indexOf('own')&&k2.indexOf('sug')>k2.indexOf('rpgmini');o.q2=$('ctrlq').firstChild.textContent.trim();
 const pan=document.querySelector('#sc-1 .cpanel');o.pan=pan.className;o.bg=!!pan.querySelector('.cbg')&&/url\(/.test(pan.querySelector('.cbg').style.backgroundImage);o.simgHidden=getComputedStyle(document.querySelector('#sc-1 .simg>img')).display;
 o.p0=document.querySelector('#sc-0 .cpanel').className;
 o.border=getComputedStyle(document.querySelector('#opts button.r2')).borderLeftColor;
 return o});
console.log(JSON.stringify(r));
if(!r.g0||!r.g1||!r.gs||!r.g2)fail('meta');if(r.streak!==2)fail('racha '+r.streak);
if(r.cover!=='rgb(255, 255, 255)')fail('cover '+r.cover);
if(!r.novOrder||r.q!=='¿Qué ocurre ahora?')fail('orden novela');
if(!r.wopts||r.lab0!=='Tono y longitud (opcional)'||r.lab1!=='Opciones: Tono: Calma · Escena larga'||r.tone!=='Calma')fail('wopts '+r.lab1);
if(r.rd.indexOf('immp,listen')!==0||r.rdw!=='nowrap')fail('rdbar '+r.rd);
if(r.optTxt!=='Opciones de la escena'||r.optFs!=='0px'||!r.optOpen)fail('opciones escena');
if(r.act0!=='▸ Tu acción (toca para ver)'||r.act1!=='▾ Fuerzo|true')fail('accion '+r.act1);
if(!r.rpgOrder||r.q2!=='O escribe tu propia acción:')fail('orden rpg');
if(!/cimg/.test(r.pan)||!/t5/.test(r.pan)||!r.bg||r.simgHidden!=='none'||/cimg|t5/.test(r.p0))fail('fondo '+r.pan);
if(r.border!=='rgb(255, 77, 94)')fail('borde '+r.border);
if(errs.length)fail('err');console.log('OK pantalla limpia');await b.close()})()
