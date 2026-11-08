const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(700);
const r=await p.evaluate(async()=>{const o=[];const w=ms=>new Promise(r=>setTimeout(r,ms));
o.push('hq',!!$("hq"),'dtut',!!$("dtut"));
$("hq").click();await w(300);let t=document.body.innerText;o.push('libGuide',t.includes('Tutorial y ayuda'),t.includes('En progreso'),t.includes('Ideas para empezar'));closeSheet();await w(200);
$("menu").click();await w(300);$("dtut").click();await w(300);t=document.body.innerText;o.push('tut1',/Paso 1 de \d+/.test(t));
[...document.querySelectorAll('button')].find(x=>x.textContent.startsWith('Siguiente')).click();await w(100);o.push('tut2',/Paso 2 de \d+/.test(document.body.innerText));
[...document.querySelectorAll('button')].find(x=>x.textContent==='Guía de pantallas').click();await w(100);o.push('guide',document.body.innerText.includes('Ideas para empezar'));
[...document.querySelectorAll('button')].find(x=>x.textContent==='Herramientas de ⋯ Más').click();await w(100);o.push('more',document.body.innerText.includes('Esto no cuadra'));
closeSheet();await w(200);startCreate("");await w(200);$("hq").click();await w(300);o.push('createGuide',document.body.innerText.includes('Plantillas'));
// every guide item mentions an existing button text? coverage check of main ids
const need=['Continuar','Deshacer último turno','Otra versión','Sorpréndeme','Esto no cuadra','Exportar para leer','Preparar el libro','Volver a una escena'];
o.push('coverage',need.every(n=>JSON.stringify(GUIDE).includes(n)));return o});
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/help.png'});
console.log(JSON.stringify(r),errs);await b.close()})()
