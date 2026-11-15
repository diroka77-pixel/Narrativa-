const {chromium}=require('playwright');
const URL=process.env.HV_URL||'file:///home/claude/v091/assets/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,colorScheme:'dark'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto(URL);await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(async()=>{const o={};const wait=ms=>new Promise(r=>setTimeout(r,ms));const btn=(root,t)=>[].slice.call(document.querySelectorAll(root+' button')).filter(x=>x.textContent===t)[0];
 const c=document.createElement('canvas');c.width=60;c.height=90;c.getContext('2d').fillRect(0,0,60,90);const IMG=c.toDataURL('image/jpeg');
 const mk=(id,cv)=>({id:id,title:'Neón y Colmillos',syn:'x',genre:'Ciencia ficción',genres:[],cover:cv,scenes:[{t:'Hola. '.repeat(50),m:{}}],lore:[],turn:1,at:Date.now(),state:{},opts:[],premise:'p',prot:[],ce:[],memory:'m'});
 LIB.length=0;LIB.push(mk('a',IMG));LIB.push(mk('b',undefined));renderLib();
 o.l0=$('dbyl').textContent+'|'+document.querySelectorAll('.byl').length;
 $('dbyl').click();const ni=document.querySelector('#gsheet input[type=text]');ni.value='DJ Rodríguez';btn('#gsheet','Guardar').click();await wait(50);
 o.l1=$('dbyl').textContent+'|'+[].slice.call(document.querySelectorAll('#lib .byl, #list .byl, .cover .byl')).map(x=>x.textContent).join(',');
 o.hero=(document.querySelector('#hero .hbyl')||{}).textContent;o.vis=[].slice.call(document.querySelectorAll('.cover .byl')).map(x=>getComputedStyle(x).display).join(',');
 o.svg=/DJ Rodríguez/.test(coverSvg(LIB[1]));
 openStory(LIB[1]);$('immp').onclick();await wait(300);o.bk1=(document.querySelector('.bkcover .bka')||{}).textContent;$('imx').click();
 openStory(LIB[0]);$('immp').onclick();await wait(300);o.bk2=(document.querySelector('.bkcover .bkby')||{}).textContent;$('imx').click();
 const by=await fichaPdf(LIB[0]);o.pdfm=by.length>1000;
 // ocultar
 $('dbyl').click();document.querySelector('#gsheet label.chk input').checked=false;btn('#gsheet','Guardar').click();await wait(50);o.off=$('dbyl').textContent+'|'+document.querySelectorAll('.cover .byl').length+'|'+authGet().name;
 return o});
console.log(JSON.stringify(r,null,1));
if(r.hero!=='de DJ Rodríguez')fail('hero '+r.hero);if(r.l0!=='Nombre en las portadas: sin poner|0')fail('l0');
if(!/^Nombre en las portadas: DJ Rodríguez\|DJ Rodríguez,DJ Rodríguez/.test(r.l1)||/none/.test(r.vis))fail('lib '+r.l1+' '+r.vis);
if(!r.svg||r.bk1!=='DJ Rodríguez'||r.bk2!=='DJ Rodríguez'||!r.pdfm)fail('portadas');
if(r.off!=='Nombre en las portadas: sin poner|0|DJ Rodríguez')fail('off '+r.off);
if(process.env.SHOT){await p.evaluate(()=>{const a=authGet();a.cover=true;authSet(a);document.getElementById('tInicio').click();renderLib();window.scrollTo(0,0);try{document.querySelectorAll('.toast,#toast').forEach(x=>x.remove())}catch(e){}});await p.waitForTimeout(300);await p.screenshot({path:process.env.SHOT})}
if(errs.length)fail('err');console.log('OK autor');await b.close()})()
