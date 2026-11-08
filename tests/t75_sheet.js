const {chromium}=require('playwright');const fs=require('fs');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
const IMG=require('path').join(__dirname,'fixtures','sample.png');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.__saved=[];window.claude={use:async(k)=>({save:async(o)=>{window.__saved.push({n:o.filename,d:Array.from(o.data)})}})};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
await p.evaluate(()=>{LIB.length=0;const s={id:String(Date.now()),title:'Neón y Colmillos',syn:'x',genre:'Ciberpunk',genres:[],fin:true,scenes:[{t:'Primera escena.',m:{}},{t:'Segunda.',m:{}}],lore:[{tipo:'protagonista',nombre:'Diroka',desc:'Tenebrio de 1200 años, reservado y astuto.'}],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.push(s);save();openStory(s);document.getElementById('lorebox').open=true;renderLore();[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='Editar').click()});
const inputs=await p.$$('#lorebody input[type=file]');await inputs[1].setInputFiles(IMG);await p.waitForTimeout(1500);
const r=await p.evaluate(async()=>{const s=cur;[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='Prompt de hoja de personaje').click();const pr=document.getElementById('ptxt').value.slice(0,160);
[...document.querySelectorAll('#lorebody button')].find(x=>x.textContent==='Guardar').click();
const o={sheetKB:Math.round((s.lore[0].sheet||'').length/1024),inc:appxCards(s).length,pr};
await exportAs('epub');await new Promise(r=>setTimeout(r,900));await exportAs('pdf');await new Promise(r=>setTimeout(r,1500));
o.saved=window.__saved.map(x=>x.n+':'+Math.round(x.d.length/1024)+'KB');o.fig=document.querySelectorAll('#book .appxs').length;return o});
fs.writeFileSync(SP+'saved3.json',JSON.stringify(await p.evaluate(()=>window.__saved)));
console.log(JSON.stringify(r),errs);await b.close()})()
