const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.addInitScript(()=>{window.claude={use:async k=>k==='sample'?async q=>({text:'{}'}):null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const o=await p.evaluate(()=>({a:cleanScene('- No hay tiempo.\nElla corrió por por toda la cavidad.\n\n¿Qué decides hacer?'),b:cleanScene('Texto normal. ¿Qué quieres que haga ella con eso, si nadie lo sabe?'),c:cleanScene('—Hola —dijo.\n- Adiós.')}));
console.log(JSON.stringify(o),errs);await b.close()})();
