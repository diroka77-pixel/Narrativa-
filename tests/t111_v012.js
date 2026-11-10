const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark',hasTouch:true})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const T='La compuerta cede con un chasquido y el pasillo del Distrito Colmillo queda a oscuras.\n\n—¡Dentro! —gritó Sora—. Rápido.\n\n—¿Seguro que es por aquí?\n\nMacro cerró la marcha.';
 const IMG='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
 const pv=(i)=>({len:i,memory:'m',last:'u',turn:i,state:{},now:'',opts:[],fin:false,ls:0});
 const mk=(id,rp)=>({id:id,title:'Neón',syn:'Sinopsis',genre:'Misterio',genres:['Misterio'],scenes:[{t:T,m:{},img:IMG},{t:(T+'\n\n').repeat(8),m:{},a:'Sigo',pv:pv(1)}],lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner.'},{tipo:'personaje',nombre:'Macro',desc:'Mecánico.'},{tipo:'lugar',nombre:'Distrito Colmillo',desc:'Barrio.'},{tipo:'lugar',nombre:'Torre Axis',desc:'Sede.'},{tipo:'lugar',nombre:'Puerto Viejo',desc:'Muelles.'}],turn:2,at:1,state:{},opts:['[Arriesgado][Fuerza] Empujar','[Seguro] Esperar','[Temerario] Correr'],premise:'p',prot:[{name:'Diroka',desc:'Vampiro'}],ce:[],memory:'mem',rpg:rp?rpgNew('normal','Sangre'):undefined,sx:[{t:'Sora es una traidora',on:true}]});
 LIB.length=0;LIB.push(mk('a',1));LIB.push(mk('b',0));const s=LIB[0],n=LIB[1];
 // --- ajustes
 const dn=document.querySelector('.dnav');o.grp=[].slice.call(dn.querySelectorAll('.dgrp')).map(x=>x.textContent).join('|');o.dbtn=dn.querySelectorAll('button').length;
 o.order=[].slice.call(dn.children).map(x=>x.id||x.className).join(',');
 // --- acento
 openStory(n);const acc0=document.documentElement.style.getPropertyValue('--acc');$('dacc').click();o.acc1=$('dacc').textContent+'|'+document.documentElement.style.getPropertyValue('--acc');
 for(let k=0;k<5;k++)$('dacc').click();o.acc2=$('dacc').textContent+'|'+(document.documentElement.style.getPropertyValue('--acc')===acc0)+'|'+localStorage.getItem('hv:accent');
 // --- capítulo
 const ch=document.querySelector('#sc-0 .ch');o.ch=ch.textContent+'|'+ch.className+'|'+/url\(/.test(ch.style.backgroundImage)+'|'+getComputedStyle(document.querySelector('#sc-0 .simg>img')).display;
 // --- barras
 o.bars0=$('dbars').textContent;window.scrollTo(0,700);await wait(120);window.scrollTo(0,900);await wait(160);o.hide=document.body.classList.contains('hidebars');
 window.scrollTo(0,820);await wait(160);o.show=!document.body.classList.contains('hidebars');
 window.scrollTo(0,900);await wait(120);window.scrollTo(0,1000);await wait(160);$('dbars').click();o.bars1=$('dbars').textContent+'|'+document.body.classList.contains('hidebars');
 window.scrollTo(0,1200);await wait(160);o.off=!document.body.classList.contains('hidebars');$('dbars').click();window.scrollTo(0,0);
 // --- otro punto de vista + documentos
 let asked='';sample=async(q)=>{asked=q;return {text:/Reescribe la ESCENA/.test(q)?'Sora vio caer la compuerta.':'Carta a mi hermano\n\nQuerido Ian: mañana entramos.'}};
 o.povbtn=!!btn('#sc-0 .scm','Otro punto de vista');povSheet(0);o.povsel=[].slice.call(document.querySelectorAll('#gsheet select option')).map(x=>x.value).join(',');
 document.querySelector('#gsheet select').value='Sora';btn('#gsheet','Reescribir desde su mirada').click();await wait(150);
 o.pov=/punto de vista de Sora/.test(asked)&&/La compuerta cede/.test(asked)&&/Sora es una traidora/.test(asked);o.povout=document.querySelector('#gsheet textarea').value;
 btn('#gsheet','Guardar en Documentos').click();o.doc1=JSON.stringify(n.docs.map(d=>[d.tipo,d.titulo,d.t,d.on]));o.sc=n.scenes[0].t===T;
 docsSheet();document.querySelector('#gsheet select').value='Carta';document.querySelector('#gsheet textarea').value='carta de Sora a su hermano';btn('#gsheet','Que lo escriba El Cronista').click();await wait(200);
 o.doc2=JSON.stringify(n.docs.map(d=>[d.tipo,d.titulo,d.t]));o.docp=/carta/.test(asked)&&/carta de Sora a su hermano/.test(asked)&&/no los reveles/.test(asked);
 o.docctx=docCtx(n,false);o.docctxc=docCtx(n,true);o.inbuild=/DOCUMENTOS DEL MUNDO/.test(build(n,'x','',null,false));
 btn('#gsheet','Escribirlo yo').click();o.doc3=n.docs.length;closeSheet();
 // --- mapa
 o.map0=mapCtx(n,false);mapSheet();const sels=document.querySelectorAll('#gsheet select');sels[0].value='Distrito Colmillo';sels[1].value='Torre Axis';document.querySelector('#gsheet input[type=text]').value='túnel';btn('#gsheet','Conectar lugares').click();
 o.map1=JSON.stringify(n.map.links)+'|'+document.querySelectorAll('#gsheet .mnode').length+'|'+document.querySelectorAll('#gsheet .mlink').length+'|'+document.querySelectorAll('#gsheet .mnode.here').length;
 o.mapctx=mapCtx(n,false);o.mapbuild=/GEOGRAFÍA FIJADA/.test(build(n,'x','',null,false));closeSheet();
 renderLore();o.lorebtns=!!btn('#lorebody','Mapa de lugares')&&!!btn('#lorebody','Documentos del mundo (3)');
 // --- hablante
 openStory(s);let names=[].slice.call(document.querySelectorAll('#sc-0 button.cname')).map(x=>x.textContent);o.names0=names.join(',');
 document.querySelectorAll('#sc-0 button.cname')[1].click();o.whosheet=/¿Quién dice esto\?/.test($('gsheet').textContent);btn('#gsheet','Macro').click();
 o.names1=[].slice.call(document.querySelectorAll('#sc-0 button.cname')).map(x=>x.textContent).join(',');o.sp=JSON.stringify(s.scenes[0].sp);
 document.querySelectorAll('#sc-0 button.cname')[1].click();btn('#gsheet','Volver a deducirlo solo').click();o.sp2=String(s.scenes[0].sp);
 // --- compañeros
 rpgSheet(s);o.cosel=[].slice.call(document.querySelectorAll('#gsheet select option')).map(x=>x.value).join(',');btn('#gsheet','Añadir compañero').click();btn('#gsheet','Pedir ayuda').click();
 o.co=JSON.stringify(s.rpg.co)+'|'+s.rpg.help;o.mini=$('rpgmini').textContent;
 rpgRnd=()=>5;rpgPre(s,'[Arriesgado] Saltar','x');o.pr=s.rpg.pr.hb+'|'+s.rpg.pr.tier+'|'+s.rpg.pr.help;o.ctx=rpgCtx(s,false);
 const st0=rpgState(s.rpg);let sn={};const hp0=s.rpg.hp;rpgApply(s,{rpg:{se_une:'Macro'}},sn);o.ap=JSON.stringify(sn.roll)+'|'+JSON.stringify(s.rpg.co)+'|'+(hp0-s.rpg.hp)+'|'+sn.cj+'|'+s.rpg.help;
 rpgStateBack(s.rpg,st0);o.back=JSON.stringify(s.rpg.co);
 s.rpg.co=[{n:'Sora',hp:20}];s.rpg.help='Sora';rpgRnd=()=>2;rpgPre(s,'[Arriesgado] Otra','x');sn={};rpgApply(s,{rpg:{se_va:'nadie'}},sn);o.down=sn.cod+'|'+s.rpg.co[0].hp+'|'+rpgExtra(sn);
 s.rpg.help='Sora';rpgRnd=()=>15;rpgPre(s,'[Arriesgado] Otra más','x');o.nohelp=s.rpg.pr.hb;sn={};rpgApply(s,{rpg:{recupera:true}},sn);o.rec=s.rpg.co[0].hp;
 sn={};rpgPre(s,'[Seguro] Fin','x');rpgApply(s,{rpg:{se_va:'sora'}},sn);o.leave=sn.cl+'|'+s.rpg.co.length;
 // --- copia con meta
 localStorage.setItem('hv:goal',JSON.stringify({goal:300,days:{'2026-11-01':500}}));const bk=backupData();o.bk=!!bk.data['hv:goal'];o.bkkeys=Object.keys(bk.data).filter(k=>/key|clave|api/i.test(k)).length;
 return o});
console.log(JSON.stringify(r,null,1));
if(r.grp!=='Historias|Apariencia|Copias y datos|Ayuda'||r.dbtn!==16)fail('ajustes');
if(r.order.indexOf('dgrp,dhome,dchars,dlib,dgrp,dtheme,dacc,dhcov,dczoom,dbars,dbuzz,dgoal,dgrp,dbackup,dvers,dstor,dgrp,dtut,dhelp,dlic')!==0)fail('orden '+r.order);
if(r.acc1!=='Color de acento: ámbar|#f6b93b'||!/^Color de acento: del género\|true\|null$/.test(r.acc2))fail('acento '+r.acc1+' '+r.acc2);
if(r.ch!=='Capítulo 1|ch chx chimg|true|none')fail('capitulo '+r.ch);
if(r.bars0!=='Ocultar barras al leer: sí'||!r.hide||!r.show||r.bars1!=='Ocultar barras al leer: no|false'||!r.off)fail('barras');
if(!r.povbtn||r.povsel!=='Diroka,Sora,Macro'||!r.pov||r.povout!=='Sora vio caer la compuerta.'||!r.sc)fail('pov');
if(r.doc1!=='[["Otro punto de vista","Escena 1 según Sora","Sora vio caer la compuerta.",false]]')fail('doc1 '+r.doc1);
if(!/\["Carta","Carta a mi hermano","Querido Ian: mañana entramos."\]/.test(r.doc2)||!r.docp)fail('doc2 '+r.doc2);
if(!/Carta «Carta a mi hermano»: Querido Ian/.test(r.docctx)||/Otro punto de vista/.test(r.docctx)||r.docctxc!==''||!r.inbuild||r.doc3!==3)fail('docctx');
if(r.map0!==''||r.map1!=='[["Distrito Colmillo","Torre Axis","túnel"]]|3|1|1'||!/Distrito Colmillo ↔ Torre Axis \(túnel\)/.test(r.mapctx)||!r.mapbuild||!r.lorebtns)fail('mapa '+r.map1);
if(r.names0!=='Sora,¿quién?'||!r.whosheet||r.names1!=='Sora,Macro'||r.sp!=='{"1":"Macro"}'||r.sp2!=='undefined')fail('hablante '+r.names0+' '+r.names1+' '+r.sp2);
if(r.cosel!=='Sora,Macro'||r.co!=='[{"n":"Sora","hp":100}]|Sora'||!/🤝 Sora 100 · ayuda/.test(r.mini))fail('co '+r.co);
if(r.pr!=='3|coste|Sora'||!/COMPAÑEROS que van con el protagonista.*Sora/.test(r.ctx)||!/Sora ayuda activamente al protagonista y sale mal parado/.test(r.ctx)||!/"se_une"/.test(r.ctx))fail('co pr '+r.pr);
if(!/"hb":3,"help":"Sora"/.test(r.ap)||!/\{"n":"Sora","hp":90\},\{"n":"Macro","hp":100\}/.test(r.ap)||!/\|4\|Macro\|undefined$/.test(r.ap))fail('co apply '+r.ap);
if(r.back!=='[{"n":"Sora","hp":100}]')fail('co back');
if(r.down!=='Sora|0| · 🤝 Sora cae'||r.nohelp!==0||r.rec!==40||r.leave!=='sora|0')fail('co fin '+r.down+' '+r.nohelp+' '+r.rec+' '+r.leave);
if(!r.bk||r.bkkeys!==0)fail('copia');
if(process.env.SHOT){const S=process.env.SHOT;await p.evaluate(()=>{openStory(LIB[1]);window.scrollTo(0,0)});await p.waitForTimeout(500);await p.evaluate(()=>{const e=document.querySelector('#sc-0 .ch');window.scrollTo(0,e.getBoundingClientRect().top+scrollY-150)});await p.waitForTimeout(300);await p.screenshot({path:S+'_cap.png'});
 await p.evaluate(()=>{window.scrollTo(0,0);mapSheet()});await p.waitForTimeout(500);await p.screenshot({path:S+'_mapa.png'});await p.evaluate(()=>{closeSheet();docsSheet();document.querySelector('#gsheet details.docit').open=true});await p.waitForTimeout(500);await p.screenshot({path:S+'_docs.png'});
 await p.evaluate(()=>{closeSheet();document.getElementById('drawer').hidden=false});await p.waitForTimeout(400);await p.screenshot({path:S+'_ajustes.png'})}
if(errs.length)fail('err');console.log('OK v0.12');await b.close()})()
