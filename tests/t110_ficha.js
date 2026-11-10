const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const T='La compuerta cede.\n\n—¡Dentro! —gritó Sora—. Rápido.\n\nMacro cerró la marcha.';
 const old={on:true,diff:'normal',cred:3,hp:100,b2:100,b2n:'Sangre',pr:null,cp:null,nr:'Arriesgado'}; // partida antigua sin ficha
 const s={id:'w',title:'Neón',syn:'x',genre:'Misterio',genres:['Misterio'],scenes:[{t:T,m:{}}],lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner sarcástica.'}],turn:1,at:0,state:{},opts:['[Arriesgado][Ingenio] Forzar la cerradura','[Seguro · Carisma] Hablar','[Temerario] Correr'],premise:'p',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'mem',rpg:old,sx:[{t:'Sora es una traidora',on:true}]};
 LIB.length=0;LIB.push(s);openStory(s);
 // etiquetas
 const g=rpgTag('[Arriesgado][Ingenio] Forzar');const g2=rpgTag('[Seguro · Carisma] Hablar');const g3=rpgTag('[Temerario] Correr');
 o.tag=[g.risk,g.at,g.text,g2.risk,g2.at,g2.text,g3.risk,g3.at].join('|');
 o.fix=JSON.stringify(s.rpg.at)+s.rpg.pts+JSON.stringify(s.rpg.inv);
 o.ficha=$('rpgficha').textContent;
 // ficha: repartir
 rpgSheet(s);let plus=[].slice.call(document.querySelectorAll('#gsheet .atrow button')).filter(x=>x.textContent==='+');plus[2].click();
 plus=[].slice.call(document.querySelectorAll('#gsheet .atrow button')).filter(x=>x.textContent==='+');plus[2].click();
 o.at=s.rpg.at.i+'/'+s.rpg.pts;
 const inp=document.querySelector('#gsheet input[type=text]');inp.value='Ganzúa';[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent==='Añadir objeto')[0].click();
 o.inv=s.rpg.inv.join(',');
 [].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent==='Usar')[0].click();o.use=s.rpg.use;
 o.label=[].slice.call(document.querySelectorAll('#opts button')).map(x=>x.textContent).join(' / ');
 // tirada con modificadores (dado fijo)
 let D=10;rpgRnd=()=>D;
 rpgPre(s,'[Arriesgado][Ingenio] Forzar la cerradura','x');o.pr=JSON.stringify(s.rpg.pr);  // 10+2+2=14>=12 pleno
 o.ctx=rpgCtx(s,false);
 // aplicar: gana objeto y empieza combate
 let sn={};rpgApply(s,{rpg:{gana:['Tarjeta de acceso'],pierde:['ganzua inexistente'],enemigo:{nombre:'Centinela',fuerza:2}}},sn);
 o.ap1=JSON.stringify(sn);o.inv2=s.rpg.inv.join(',');o.en=JSON.stringify(s.rpg.en);o.use2=s.rpg.use;
 // combate: ataque con éxito
 D=15;rpgPre(s,'[Arriesgado][Fuerza] Golpear al centinela','x');o.eh=s.rpg.pr.eh;o.ctx2=rpgCtx(s,false);
 sn={};rpgApply(s,{rpg:{enemigo:{nombre:'Otro',fuerza:1}}},sn);o.ap2=JSON.stringify(sn.cb);o.en2=s.rpg.en.hp;
 // fallo: sin daño al enemigo, más daño al jugador
 D=2;const hp0=s.rpg.hp;rpgPre(s,'[Arriesgado] Atacar otra vez','x');o.eh3=s.rpg.pr.eh;sn={};rpgApply(s,{},sn);o.hpdown=s.rpg.hp<hp0;
 // victoria
 s.rpg.en.hp=10;D=19;const pts0=s.rpg.pts;rpgPre(s,'[Temerario] Rematar','x');o.ctx3=rpgCtx(s,false);sn={};rpgApply(s,{rpg:{pierde:['Ganzúa']}},sn);o.win=JSON.stringify(sn.cb)+'|'+!!s.rpg.en+'|'+(s.rpg.pts-pts0)+'|'+JSON.stringify(sn.il);
 // huida
 s.rpg.en={n:'Dron',f:1,hp:40,mx:40};D=18;rpgPre(s,'Huyo por el conducto','x');o.flee=s.rpg.pr.flee+'|'+s.rpg.pr.at;sn={};rpgApply(s,{},sn);o.flee2=JSON.stringify(sn.cb)+!!s.rpg.en;
 // estado y vuelta atrás
 const st=rpgState(s.rpg);s.rpg.inv.push('X');s.rpg.en={n:'Z',f:1,hp:1,mx:40};s.rpg.at.f=4;rpgStateBack(s.rpg,st);o.back=s.rpg.inv.indexOf('X')+'|'+!!s.rpg.en+'|'+s.rpg.at.f;
 // pintado
 s.rpg.en={n:'Centinela',f:2,hp:35,mx:70};s.scenes.push({t:T,m:{},a:'Golpeo',roll:{d:15,dc:12,risk:'Arriesgado',tier:'pleno',at:'Fuerza',mod:1,ub:2,use:'Ganzúa'},cb:{n:'Centinela',hp:35,mx:70},ig:['Llave']});render(true);
 o.mini=$('rpgmini').textContent;o.cvs=(document.querySelector('#sc-1 .cvs')||{}).textContent;
 s.comic=false;render(true);o.roll=(document.querySelector('#sc-1 .rollline')||{}).textContent;s.comic=true;
 // entrevista
 let asked='';sample=async(p)=>{asked=p;return {text:'«No confío en nadie, y menos en ti.»'}};
 interviewSheet('Sora');const ta=document.querySelector('#gsheet textarea');ta.value='¿En quién confías?';[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>x.textContent==='Preguntar')[0].click();await wait(200);
 o.iv=JSON.stringify(s.iv.Sora);o.ivp=/Eres Sora/.test(asked)&&/Netrunner sarcástica/.test(asked)&&/Sora es una traidora/.test(asked)&&/¿En quién confías\?/.test(asked)&&/no los reveles/.test(asked);
 o.ivlog=document.querySelectorAll('#gsheet .ivlog p').length;o.scenes=s.scenes.length;closeSheet();
 faceSheet('Sora');o.fbtn=[].slice.call(document.querySelectorAll('#gsheet button')).some(x=>x.textContent==='🎙 Entrevistar a Sora');closeSheet();
 renderLore();o.lbtn=[].slice.call(document.querySelectorAll('#lorebody button')).some(x=>x.textContent==='🎙 Entrevistar');
 // novela sin rpg: sin ficha
 const n=JSON.parse(JSON.stringify(s));n.id='n';delete n.rpg;LIB.push(n);openStory(n);o.nov=$('rpgmini').hidden;
 return o});
console.log(JSON.stringify(r,null,1));
if(r.tag!=='Arriesgado|Ingenio|Forzar|Seguro|Carisma|Hablar|Temerario|')fail('tag');
if(r.fix!=='{"f":0,"a":0,"i":0,"c":0}4[]')fail('fix');if(r.ficha!=='🎒 Ficha (+4)')fail('ficha');
if(r.at!=='2/2'||r.inv!=='Ganzúa'||r.use!=='Ganzúa')fail('ficha datos');
if(!/Arriesgado · Ingenio \+2 · Forzar la cerradura/.test(r.label)||!/Seguro · Carisma · Hablar/.test(r.label))fail('label');
const pr=JSON.parse(r.pr);if(pr.tier!=='pleno'||pr.mod!==2||pr.ub!==2||pr.at!=='Ingenio')fail('pr');
if(!/ATRIBUTOS DEL PROTAGONISTA.*Ingenio 2/.test(r.ctx)||!/INVENTARIO.*Ganzúa/.test(r.ctx)||!/usa «Ganzúa»/.test(r.ctx)||!/"enemigo"/.test(r.ctx)||!/\[Fuerza\], \[Agilidad\]/.test(r.ctx))fail('ctx');
if(r.inv2!=='Ganzúa,Tarjeta de acceso'||!/"n":"Centinela","f":2,"hp":70,"mx":70/.test(r.en)||r.use2!==undefined||!/"start":1/.test(r.ap1)||!/"ig":\["Tarjeta de acceso"\]/.test(r.ap1)||/"il"/.test(r.ap1))fail('apply1');
if(r.eh!==70-22||!/COMBATE EN CURSO contra Centinela/.test(r.ctx2)||!/SIGUE EN PIE/.test(r.ctx2)||/"enemigo"/.test(r.ctx2))fail('combate '+r.eh);
if(r.ap2!=='{"n":"Centinela","hp":48,"mx":70}'||r.en2!==48)fail('ap2 '+r.ap2);
if(r.eh3!==48||!r.hpdown)fail('fallo');
if(!/QUEDA FUERA DE COMBATE/.test(r.ctx3)||r.win!=='{"n":"Centinela","end":"victoria","pt":1}|false|1|["Ganzúa"]')fail('win '+r.win);
if(r.flee!=='true|Agilidad'||r.flee2!=='{"n":"Dron","end":"huida"}false')fail('huida '+r.flee+r.flee2);
if(r.back!=='-1|false|0')fail('back '+r.back);
if(!/⚔ Centinela 35\/70/.test(r.mini)||!/Ficha/.test(r.mini))fail('mini');if(!/Centinela/.test(r.cvs)||!/\+Llave/.test(r.cvs))fail('cvs '+r.cvs);
if(!/🎲 15 \+1 Fuerza \+2 Ganzúa · 🟠 Arriesgado \(12\) → Éxito · ⚔ Centinela 35\/70 · 🎒 \+Llave/.test(r.roll))fail('roll '+r.roll);
if(r.iv!=='[{"q":"¿En quién confías?","a":"No confío en nadie, y menos en ti."}]'||!r.ivp||r.ivlog!==2||r.scenes!==2)fail('entrevista');
if(!r.fbtn||!r.lbtn||!r.nov)fail('botones');
if(process.env.SHOT){await p.evaluate(()=>{openStory(LIB[0]);});await p.waitForTimeout(500);await p.evaluate(()=>{const e=document.getElementById('rpgmini');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-330)});await p.waitForTimeout(300);await p.screenshot({path:process.env.SHOT+'_a.png'});await p.evaluate(()=>rpgSheet(cur));await p.waitForTimeout(500);await p.screenshot({path:process.env.SHOT+'_b.png'});await p.evaluate(()=>{closeSheet();interviewSheet('Sora')});await p.waitForTimeout(500);await p.screenshot({path:process.env.SHOT+'_c.png'})}
if(errs.length)fail('err');console.log('OK ficha RPG y entrevista');await b.close()})()
