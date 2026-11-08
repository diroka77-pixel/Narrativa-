const {chromium}=require('playwright');
const path=require('path');
const {pathToFileURL}=require('url');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
const appUrl=pathToFileURL(path.join(__dirname,'..','app','src','main','assets','index.html')).href;
await p.goto(appUrl);await p.waitForTimeout(400);
const r=await p.evaluate(async()=>{
LIB.length=0;const s={id:'w2',title:'T',syn:'x',genre:'Fantasía Épica',genres:[],scenes:[{t:'Hola tenebrio.',m:{}}],lore:[],turn:1,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.push(s);save();openStory(s);
const o=[];const wait=ms=>new Promise(r=>setTimeout(r,ms));
let calls=0;sample=async(q)=>{calls++;return {text:'RESUMEN '+calls+': los tenebrios y los elfos.',via:{}}};
let txt='';for(let i=0;i<30;i++){txt+='Capítulo del mundo '+i+'\n\n'+('Los tenebrios y los elfos vivieron la era número '+i+' con guerras y pactos. ').repeat(14)+'\n\n'}
o.push(txt.length);
const d=document.querySelector('#wlbody details');const ta=d.querySelector('textarea');ta.value=txt;
[...d.querySelectorAll('button')].find(b=>b.textContent==='Dividir y guardar').click();await wait(100);
o.push(s.wl.length);
[...document.querySelectorAll('#wlbody button')].find(b=>/lea ahora/.test(b.textContent)).click();await wait(600);
o.push(calls,!!s.wlsum,s.wlsum&&s.wlsum.t);
const c=wlCtx(s,'Hablo con el tenebrio',false);o.push(c.includes('RESUMEN DEL UNIVERSO'),c.length);
o.push(document.querySelectorAll('#wlbody textarea').length);
return o});
console.log(JSON.stringify(r),errs);await b.close()})()
