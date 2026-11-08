const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.addInitScript(()=>{window.claude={use:async()=>null};localStorage.setItem('hv:welcome','1')});
await p.goto('file:///home/claude/v091/assets/index.html');await p.waitForTimeout(500);
const fail=m=>{console.log('FALLA',m,errs);process.exit(1)};
const r=await p.evaluate(()=>{const s={id:'z',title:'T',syn:'x',genre:'Misterio',genres:[],scenes:[{t:'Uno.\n\nDos.',m:{}},{t:'Tres.\n\nCuatro.',m:{}}],lore:[],turn:2,at:1,state:{},opts:[],premise:'p',prot:[],ce:[]};LIB.length=0;LIB.push(s);openStory(s);
 const bs=[].slice.call(document.querySelectorAll('button.lastread'));const sc=[].slice.call(document.querySelectorAll('#book .scene, #book > div'));
 return {n:bs.length,inbook:bs.every(x=>document.getElementById('book').contains(x)),pos:bs[0]?bs[0].getBoundingClientRect().top>document.getElementById('immp').getBoundingClientRect().top:false}});
console.log(JSON.stringify(r));if(r.n!==1||!r.inbook)fail('boton');
await p.click('button.lastread');await p.waitForTimeout(300);
if(!await p.evaluate(()=>document.body.classList.contains('imm')))fail('no entra en lectura');
if(errs.length)fail('err');console.log('OK leerfinal');await b.close()})()
