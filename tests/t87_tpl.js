const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(700);
const r=await p.evaluate(async()=>{const o=[];const w=ms=>new Promise(r=>setTimeout(r,ms));
startCreate("");await w(200);o.push('allGenresValid',TPL.every(t=>t.g.every(g=>GENRES.indexOf(g)>=0)),TPL.length);
const btn=[...document.querySelectorAll('#ideas button')].find(x=>/Plantillas/.test(x.textContent));o.push('btn',!!btn);btn.click();await w(300);
const bs=[...document.querySelectorAll('button')].filter(x=>/ · /.test(x.textContent)&&/—/.test(x.textContent));o.push('cards',bs.length);bs[0].click();await w(300);
o.push('idea',$("idea").value.slice(0,30),'bible',$("bible0").value.length>10,'genres',JSON.stringify(C.genres));return o});
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/tpl.png'});
console.log(JSON.stringify(r),errs);await b.close()})()
