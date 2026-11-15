const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const s={id:'t',title:'Neón',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Inicio de la historia.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:['a','b','c'],premise:'p',prot:[{name:'Diroka',desc:''}],ce:[],memory:'m'};
 LIB.length=0;LIB.push(s);openStory(s);
 o.modes=[].slice.call(document.querySelectorAll('#modes button')).map(x=>x.textContent).join('|');
 const ph0=$('own').placeholder;btn('#modes','Texto completo sin modificar').click();o.ui=!$('verbh').hidden+'|'+($('own').placeholder!==ph0)+'|'+$('wopts').hidden;
 const TXT='La lluvia caía  sobre Colmillo -y nadie miraba-.\n\n- ¿Vienes? —dijo Sora.\n\nDiroka no contestó; sonrió.';
 let asked='';sample=async(q)=>{asked=q;return {text:JSON.stringify({escena:'ESTO NO DEBE APARECER',opciones:['Seguir a Sora','Quedarse','Huir'],memoria:'Sora invita a Diroka.',mem:{eventos:[{que:'Sora invita a Diroka'}]}})}};
 $('own').value=TXT;$('longsc').checked=true;$('do').click();await wait(400);
 const last=s.scenes[s.scenes.length-1];o.scene=(JSON.stringify(last.t)===JSON.stringify(TXT))+'|'+last.own+'|'+last.a;o.opts=s.opts.join(',');o.mem=s.memory;
 o.prompt=/MODO TEXTO DEL AUTOR/.test(asked)&&/ESCENA COMPLETA ESCRITA POR EL AUTOR/.test(asked)&&/nadie miraba/.test(asked);o.long=s.lastLong;
 o.shown=/La lluvia caía  sobre Colmillo/.test(document.getElementById('sc-1').textContent)||/La lluvia caía sobre Colmillo/.test(document.getElementById('sc-1').textContent);
 o.undo=!!last.pv||!!s.prev;
 // volver a otro modo
 btn('#modes','Mi personaje hace').click();o.back=$('verbh').hidden+'|'+($('own').placeholder===ph0)+'|'+!$('wopts').hidden;
 // sin IA: se añade tal cual
 btn('#modes','Texto completo sin modificar').click();sample=null;$('own').value='Texto sin IA.';$('do').click();await wait(100);o.noai=s.scenes[s.scenes.length-1].t+'|'+s.scenes.length+'|'+$('own').value;
 // RPG: no tira dado
 const r2={id:'r',title:'R',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Ini.',m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'m',rpg:rpgNew('normal','Sangre')};LIB.push(r2);openStory(r2);
 sample=async()=>({text:'{"escena":"-","opciones":["[Seguro] a","[Arriesgado] b","[Temerario] c"]}'});btn('#modes','Texto completo sin modificar').click();$('own').value='[Temerario] Salto al vacío.';$('do').click();await wait(400);
 const l2=r2.scenes[r2.scenes.length-1];o.rpg=l2.t+'|'+!!l2.roll+'|'+r2.rpg.hp;
 return o});
console.log(JSON.stringify(r,null,1));
if(r.modes!=='Idea para la historia|Mi personaje hace|Texto completo sin modificar'||r.ui!=='true|true|true')fail('ui');
if(r.scene!=='true|1|✍ Escena escrita por el autor'||r.opts!=='Seguir a Sora,Quedarse,Huir'||r.mem!=='Sora invita a Diroka.'||!r.prompt||r.long!==false||!r.shown||!r.undo)fail('escena '+r.scene);
if(r.back!=='true|true|true')fail('back '+r.back);if(r.noai!=='Texto sin IA.|3|')fail('noai '+r.noai);
if(r.rpg!=='[Temerario] Salto al vacío.|false|100')fail('rpg '+r.rpg);
if(errs.length)fail('err');console.log('OK texto del autor');await b.close()})()
