const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const T='La lluvia caía sobre el Distrito Colmillo mientras Sora ajustaba el visor. El módulo Áxis seguía caliente.';
 const pv=(i)=>({len:i,memory:'m',last:'u',turn:i,state:{},now:'',opts:[],fin:false,ls:0});
 const mk=(id,title)=>({id:id,title:title,syn:'Sinopsis de '+title,genre:'Misterio',genres:['Misterio'],scenes:[{t:T,m:{}},{t:'Nada relevante aquí.',m:{},a:'x',pv:pv(1)},{t:'El módulo vibró otra vez.',m:{},a:'y',pv:pv(2)}],
  lore:[{tipo:'personaje',nombre:'Sora',desc:'Netrunner de pelo plateado. Guarda el módulo Áxis.'},{tipo:'personaje',nombre:'Macro',desc:'Mecánico desconfiado.'},{tipo:'lugar',nombre:'Distrito Colmillo',desc:'Barrio bajo de neón.'},{tipo:'lugar',nombre:'Torre Axis',desc:'Sede corporativa.'},{tipo:'objeto',nombre:'Módulo',desc:'Núcleo robado a la corporación.'}],
  wl:[{id:'w1',h:'La Caída',t:'Hace cien años la corporación Axis compró la ciudad entera.'.repeat(4)+' Al final, el módulo original se perdió.',rev:1,on:true},{id:'w2',h:'Vampiros',t:'Los vampiros viven de sangre sintética.',rev:1,on:true},{id:'w3',h:'Clima',t:'Llueve ácido.',rev:1,on:true},{id:'w4',h:'Moneda',t:'Créditos.',rev:1,on:true}],
  sx:[{t:'Sora trabaja en secreto para Axis',on:true}],docs:[{id:'d1',tipo:'Carta',titulo:'Carta a Ian',t:'Querido Ian: el módulo ya es nuestro.',d:1}],
  rel:[{a:'Sora',b:'Macro',t:'aliados tensos'}],iv:{Sora:[{q:'¿Qué temes?',a:'Que Axis me encuentre.'}]},map:{pos:{},links:[['Distrito Colmillo','Torre Axis','túnel']]},
  turn:3,at:id==='a'?9:1,state:{},opts:[],premise:'p',prot:[{name:'Diroka',desc:'Vampiro mercenario que busca el módulo.'}],ce:[],memory:'mem'});
 LIB.length=0;LIB.push(mk('a','Neón y colmillos'));['La casa del faro','El último tren','Ceniza','Marea','Bajo el hielo'].forEach((t,i)=>{const x=mk('k'+i,t);x.lore=[];x.wl=[];LIB.push(x)});const s=LIB[0];
 renderLib();const lq=document.querySelector('#listq input');o.lib0=!!lq+'|'+document.querySelectorAll('#list .cc').length;lq.value='faro';lq.oninput();o.lib1=document.querySelectorAll('#list .cc:not(.fhide)').length+'|'+document.querySelector('#listq small').textContent;lq.value='';lq.oninput();
 openStory(s);o.fab=!!$('findfab')&&getComputedStyle($('findfab')).position+'|'+($('findfab').getBoundingClientRect().width>=44);
 // búsqueda global (sin tildes y con mayúsculas)
 const R=findAll(s,'MODULO');o.secs=R.map(x=>x.sec).filter((x,i,a)=>a.indexOf(x)===i).join('|');o.n=R.length+'|'+R.scenes;
 o.axis=findAll(s,'axis').map(x=>x.sec+':'+x.title).join(' / ');
 o.none=findAll(s,'zzzz').length+'|'+findAll(s,'a').length;
 // hoja
 $('findfab').click();const q=document.querySelector('#gsheet .findq');o.sheet=!!q;q.value='módulo';q.oninput();await wait(260);
 o.heads=[].slice.call(document.querySelectorAll('#gsheet .findres h3')).map(x=>x.textContent).join('|');o.marks=document.querySelectorAll('#gsheet .findres mark').length;
 // ir a una carta
 [].slice.call(document.querySelectorAll('#gsheet .findit')).filter(x=>/^Módulo · objeto/.test(x.textContent))[0].click();await wait(160);
 o.goLore=$('lorebox').open+'|'+$('pmenu').open+'|'+document.querySelectorAll('#lorebody .lore')[4].classList.contains('fflash')+'|'+$('gmodal').hidden;
 // filtro de cartas
 const lf=document.querySelector('#lorebody .hvfilt input');lf.value='lugar';lf.oninput();o.lf=document.querySelectorAll('#lorebody .lore:not(.fhide)').length+'|'+document.querySelector('#lorebody .hvfilt small').textContent;
 renderLore();o.keep=document.querySelector('#lorebody .hvfilt input').value+'|'+document.querySelectorAll('#lorebody .lore:not(.fhide)').length;
 const lf2=document.querySelector('#lorebody .hvfilt input');lf2.value='';lf2.oninput();
 // ir a una idea de lore (texto más allá de la vista previa)
 findSheet('se perdió');await wait(60);o.deep=[].slice.call(document.querySelectorAll('#gsheet .findit')).map(x=>x.textContent.slice(0,9)).join('|');document.querySelector('#gsheet .findit').click();await wait(160);
 o.goWl=$('wlbox').open+'|'+document.querySelector('#wlbody .wlit[data-id="w1"]').classList.contains('fflash');
 const wf=document.querySelector('#wlbody .hvfilt input');wf.value='sangre';wf.oninput();o.wf=document.querySelectorAll('#wlbody .wlit:not(.fhide)').length;wf.value='';wf.oninput();
 // documento, entrevista, escena, índice
 findSheet('querido');await wait(60);document.querySelector('#gsheet .findit').click();await wait(220);o.doc=/Documentos del mundo/.test($('gsheet').textContent)+'|'+document.querySelector('#gsheet details.docit').open;closeSheet();
 findSheet('vibró');await wait(60);document.querySelector('#gsheet .findit').click();await wait(200);o.scene=$('gmodal').hidden;
 for(let i=0;i<6;i++)s.scenes.push({t:'Otra vez el módulo '+i,m:{},a:'z',pv:pv(3+i)});findSheet('módulo');await wait(60);const more=[].slice.call(document.querySelectorAll('#gsheet button')).filter(x=>/^Ver las \d+ escenas en el índice$/.test(x.textContent))[0];o.more=more?more.textContent:'';more.click();await wait(260);
 o.idx=/Índice y buscador/.test($('gsheet').textContent)+'|'+document.querySelector('#gsheet input[type=search]').value;closeSheet();
 // sin historia rpg/novela distinta: nada roto
 return o});
console.log(JSON.stringify(r,null,1));
if(r.lib0!=='true|6'||r.lib1!=='1|1 de 6')fail('lib');
if(r.fab!=='fixed|true')fail('fab');
if(r.secs!=='Cartas de lore|Lore del universo|Documentos del mundo|Protagonistas|Lo que recuerda El Cronista|Escenas'||r.n!=='8|2')fail('global '+r.secs+' '+r.n);
if(!/Cartas de lore:Sora/.test(r.axis)||!/Cartas de lore:Torre Axis/.test(r.axis)||!/Lore del universo:La Caída/.test(r.axis)||!/Secretos:/.test(r.axis)||!/Entrevistas:Sora/.test(r.axis)||!/Mapa de lugares:/.test(r.axis)||!/Escenas:/.test(r.axis))fail('axis '+r.axis);
if(r.none!=='0|0')fail('none');
if(!r.sheet||!/Cartas de lore \(2\)/.test(r.heads)||!/Escenas \(2\)/.test(r.heads)||r.marks<6)fail('hoja '+r.heads+' '+r.marks);
if(r.goLore!=='true|true|true|true')fail('goLore '+r.goLore);
if(r.lf!=='2|2 de 5'||r.keep!=='lugar|2')fail('filtro cartas '+r.lf+' '+r.keep);
if(r.deep!=='La Caída…'.slice(0,9)&&!/^La Caída/.test(r.deep))fail('deep '+r.deep);if(r.goWl!=='true|true'||r.wf!==1)fail('wl '+r.goWl+' '+r.wf);
if(r.doc!=='true|true'||!r.scene)fail('doc/escena '+r.doc);
if(r.more!=='Ver las 8 escenas en el índice'||r.idx!=='true|módulo')fail('indice '+r.more+' '+r.idx);
if(process.env.SHOT){const S=process.env.SHOT;await p.evaluate(()=>{closeSheet();window.scrollTo(0,300)});await p.waitForTimeout(400);await p.screenshot({path:S+'_fab.png'});await p.evaluate(()=>{findSheet('módulo')});await p.waitForTimeout(500);await p.evaluate(()=>document.activeElement&&document.activeElement.blur());await p.screenshot({path:S+'_find.png'})}
if(errs.length)fail('err');console.log('OK buscadores');await b.close()})()
