const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=20;c.height=30;c.getContext('2d').fillRect(0,0,20,30);const u=c.toDataURL('image/jpeg');
LIB.push({id:'h1',title:'T',syn:'x',genre:'Ciberpunk',genres:[],cover:u,scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:5,state:{},opts:[],premise:'p',prot:[],ce:[]});save();renderLib();
const bg=()=>document.getElementById('bgart').style.backgroundImage.slice(0,30);const o=[bg()];
document.getElementById('dhcov').click();o.push(bg(),document.getElementById('dhcov').textContent);
document.getElementById('dhcov').click();o.push(bg());return o});
console.log(JSON.stringify(r),errs);await b.close()})()
