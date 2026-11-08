const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();for(const th of ['dark','light']){const p=await b.newPage({viewport:{width:360,height:740}});
await p.addInitScript(t=>{try{localStorage.setItem('hv:theme',t)}catch(e){}},th);
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(1500);
await p.evaluate(t=>{if(t==='light')document.documentElement.dataset.theme='light'},th);
await p.evaluate(()=>{document.getElementById('drawer').hidden=false;const d=document.getElementById('dhcov');if(d)d.textContent='Fondo de inicio: portada de mi última historia'});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>[...document.querySelectorAll('#drawer .dnav button')].filter(x=>x.offsetParent).map(x=>({t:x.textContent.trim().slice(0,40),over:x.scrollWidth>x.clientWidth+1||x.scrollHeight>x.clientHeight+1,al:getComputedStyle(x).textAlign})));
console.log(th,r.length,JSON.stringify(r.filter(x=>x.over)));
await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/drawer_'+th+'.png'});await p.close()}
await b.close()})()
