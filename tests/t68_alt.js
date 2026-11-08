const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
LIB.length=0;const s={id:'a1',title:'T',syn:'x',genre:'Ciberpunk',genres:[],scenes:[{t:'Uno.',m:{}},{t:'Versión ORIGINAL.',m:{}}],lore:[],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[],lastAct:['Abro la puerta',''],prev:{len:1,memory:'',last:'',turn:1,state:{},now:'',opts:[],fin:false}};LIB.push(s);save();openStory(s);
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
// simular regen: capturar, deshacer y añadir escena nueva
const old=JSON.parse(JSON.stringify(s.scenes[1]));
window.turn=function(a,b,c){s.scenes.push({t:'Versión NUEVA.',m:{}});save();render(true)};
document.getElementById('regen').click();await wait(200);
o.push(s.alt&&s.alt.sc.t,s.scenes.map(x=>x.t).join('|'),altOk(s,1));
o.push([...document.querySelectorAll('button')].some(b=>b.textContent==='Comparar con la otra versión'));
altSheet(1);await wait(100);o.push(document.body.textContent.includes('Versión anterior'));
[...document.querySelectorAll('button')].find(b=>b.textContent==='Usar la versión anterior').click();await wait(100);
o.push(s.scenes[1].t,s.alt.sc.t);
s.scenes.push({t:'Dos.',m:{}});o.push(altOk(s,1));
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
