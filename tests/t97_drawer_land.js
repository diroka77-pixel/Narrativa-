const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const out=[];
for(const [W,H] of [[390,844],[360,640],[844,390],[740,360]]){
const p=await b.newPage({viewport:{width:W,height:H}});p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{try{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')}catch(e){}});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(600);
const r=await p.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const o={};
const fab=document.querySelector('.fab'),tabs=document.getElementById('tabs');
if(fab&&fab.offsetParent!==null){const f=fab.getBoundingClientRect(),t=tabs.getBoundingClientRect();o.fabInside=f.left>=0&&f.right<=innerWidth;o.fabAboveTabs=f.bottom<=t.top-4;o.fabGap=Math.round(t.top-f.bottom)}
$("tAjus").click();await w(300);const n=document.querySelector('.dnav');const bs=[...n.querySelectorAll('button')];
o.scrollable=n.scrollHeight>n.clientHeight||n.scrollHeight<=n.clientHeight;o.overflowY=getComputedStyle(n).overflowY;o.minBtn=Math.min(...bs.map(b=>Math.round(b.getBoundingClientRect().height)));
const gaps=[];for(let i=1;i<bs.length;i++)gaps.push(Math.round(bs[i].getBoundingClientRect().top-bs[i-1].getBoundingClientRect().bottom));o.minGap=Math.min(...gaps);
n.scrollTop=n.scrollHeight;await w(100);const last=n.lastElementChild.getBoundingClientRect();o.lastVisible=last.bottom<=innerHeight+1;o.needsScroll=n.scrollHeight>n.clientHeight+1;return o});
out.push(W+'x'+H+' '+JSON.stringify(r));
if(W===844){await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/land_drawer.png'});await p.evaluate(()=>{document.getElementById('dov').click()});await p.waitForTimeout(300);await p.screenshot({path:'/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/land_fab.png'})}
await p.close()}
console.log(out.join('\n'),errs);await b.close()})()
