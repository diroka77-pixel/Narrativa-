const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:740}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const h=document.getElementById('hlbar');h.hidden=false;document.getElementById('hldef').hidden=false;const bs=[...h.querySelectorAll('button')].map(x=>{const r=x.getBoundingClientRect();return [x.textContent.trim(),Math.round(r.left),Math.round(r.right),Math.round(r.height)]});const hr=h.getBoundingClientRect();return {bar:[Math.round(hr.left),Math.round(hr.right),Math.round(hr.height)],bs,vw:innerWidth}});
console.log(JSON.stringify(r));await p.screenshot({path:SP+'hlbar.png'});console.log('errs',errs);await b.close()})();
