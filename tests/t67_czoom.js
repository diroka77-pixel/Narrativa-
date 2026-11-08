const {chromium}=require('playwright');
const path=require('path');
const os=require('os');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
await p.evaluate(()=>{const c=document.createElement('canvas');c.width=400;c.height=600;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,600);g.addColorStop(0,'#123');g.addColorStop(1,'#c63');x.fillStyle=g;x.fillRect(0,0,400,600);
LIB.length=0;LIB.push({id:'z1',title:'Con portada',syn:'x',genre:'Ciberpunk',genres:[],cover:c.toDataURL('image/jpeg'),scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:5,state:{},opts:[],premise:'p',prot:[],ce:[]},{id:'z2',title:'Sin portada',syn:'y',genre:'Fantasía Épica',genres:[],scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:3,state:{},opts:[],premise:'p',prot:[],ce:[]});save();renderLib()});
const o=[];
await p.evaluate(()=>document.querySelector('#list .cover').click());o.push(await p.evaluate(()=>[!!document.getElementById('czoom'),document.getElementById('play').hidden]));
await p.screenshot({path:path.join(os.tmpdir(),'historias-vivas-cover-zoom.png')});
o.push(await p.evaluate(()=>[hvBack(),!document.getElementById('czoom')]));
await p.evaluate(()=>document.querySelector('#list .cover').click());
await p.waitForTimeout(500);await p.mouse.click(10,10);await p.waitForTimeout(100);o.push(await p.evaluate(()=>[!!document.getElementById('czoom'),document.getElementById('play').hidden]));
await p.evaluate(()=>document.querySelector('#list .cover').click());await p.evaluate(()=>document.querySelector('#czoom .czbig').click());o.push(await p.evaluate(()=>[!!document.getElementById('czoom'),document.getElementById('play').hidden]));
await p.evaluate(()=>{goHome();document.getElementById('dczoom').click();document.querySelector('#list .cover').click()});o.push(await p.evaluate(()=>[!!document.getElementById('czoom'),document.getElementById('play').hidden,document.getElementById('dczoom').textContent]));
console.log(JSON.stringify(o),errs);await b.close()})()
