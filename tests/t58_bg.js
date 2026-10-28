const {chromium}=require('playwright');
const SP='/tmp/claude-0/-home-claude/5b267948-f4e1-5644-878a-b683b3903646/scratchpad/';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
const bad=[];p.on('response',r=>{if(r.status()>=400)bad.push(r.url())});p.on('requestfailed',r=>bad.push(r.url()));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{LIB.push({id:'v1',title:'T',syn:'x',genre:'Ciberpunk',genres:['Ciberpunk'],scenes:[{t:'a',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]});const s=LIB[LIB.length-1];openStory(s);
const out={};out.n0=achCount();out.unl0=BGLIB.filter(bgUnlocked).length;
// locked selection does not apply
s.bgid='fortaleza';out.lockedPath=realArtPath('Ciberpunk','x',storyVar(s));
bgGallery();out.cells=document.querySelectorAll('.bgcell').length;out.locked=document.querySelectorAll('.bgcell.lock').length;
// unlock 10 achievements
const g={};ACH.slice(0,9).forEach(a=>g[a[0]]=1);localStorage.setItem('hv:ach',JSON.stringify(g));
out.unl11=BGLIB.filter(bgUnlocked).length;s.bgid='fortaleza';out.okPath=realArtPath('Ciberpunk','x',storyVar(s));
bgGallery();[...document.querySelectorAll('.bgcell')].find(x=>/horizonte/i.test(x.getAttribute('aria-label'))).click();out.bgid=s.bgid;out.applied=document.getElementById('bgart').style.backgroundImage;
return out});
console.log(JSON.stringify(r));
await p.evaluate(()=>{bgGallery()});await p.waitForTimeout(600);await p.screenshot({path:SP+'bg_gallery.png'});
console.log('errs',errs,'bad',bad.length);await b.close()})();
