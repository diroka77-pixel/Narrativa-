const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{const c=document.createElement('canvas');c.width=400;c.height=600;c.getContext('2d').fillRect(0,0,400,600);const u=c.toDataURL('image/jpeg');
LIB.push({id:'i1',title:'T',syn:'x',genre:'Ciberpunk',genres:[],scenes:[{t:'Hola.',m:{},img:u},{t:'Adiós.',m:{},img:u}],lore:[],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]});save();openStory(LIB[0]);
const out=[];const lab=()=>[...document.querySelectorAll('button')].filter(x=>x.textContent.startsWith('Formato:')).map(x=>x.textContent);
out.push(lab());document.querySelectorAll('button').forEach(x=>{if(x.textContent.startsWith('Formato:')&&!out.c){out.c=1;x.click()}});
out.push(lab(),document.querySelectorAll('.simg.v').length,localPrompt(LIB[0],'scene',0).slice(0,60));
[...document.querySelectorAll('button')].find(x=>x.textContent.startsWith('Formato:')).click();
out.push(document.querySelectorAll('.simg.p').length,localPrompt(LIB[0],'scene',0).slice(0,90));return out});
console.log(JSON.stringify(r),errs);await b.close()})()
