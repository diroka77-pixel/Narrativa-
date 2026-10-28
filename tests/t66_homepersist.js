const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.setItem('hv:welcome','1')}catch(e){}});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const mk=(id,at,c)=>`{id:'${id}',title:'${id}',syn:'x',genre:'Ciberpunk',genres:[],cover:'data:image/jpeg;base64,${c}',scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:${at},state:{},opts:[],premise:'p',prot:[],ce:[]}`;
await p.evaluate(()=>{LIB.length=0;LIB.push({id:'a',title:'A',syn:'x',genre:'Ciberpunk',genres:[],cover:'data:image/jpeg;base64,AAAA',scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:5,state:{},opts:[],premise:'p',prot:[],ce:[]},{id:'b',title:'B',syn:'x',genre:'Ciberpunk',genres:[],cover:'data:image/jpeg;base64,BBBB',scenes:[{t:'Hola.',m:{}}],lore:[],turn:1,at:9,state:{},opts:[],premise:'p',prot:[],ce:[]});save();localStorage.setItem('hv:homecover','1');openStory(LIB[0]);goHome()});
console.log('tras volver:',await p.evaluate(()=>document.getElementById('bgart').style.backgroundImage.slice(0,40)));
await p.reload();await p.waitForTimeout(600);
await p.waitForFunction(()=>typeof lastStory==='function'&&!!lastStory(),null,{timeout:5000});
console.log('tras reabrir:',await p.evaluate(()=>[document.getElementById('bgart').style.backgroundImage.slice(0,40),lastStory().id,document.getElementById('dhcov').textContent]));
await p.evaluate(()=>{localStorage.setItem('hv:homecover','0');renderLib()});console.log('desactivado:',await p.evaluate(()=>document.getElementById('bgart').style.backgroundImage.slice(0,40)),errs);await b.close()})()
